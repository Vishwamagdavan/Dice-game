// CLASSES

class User {
  score = 0;
  constructor(name) {
    this.name = name;
  }

  succesRoll() {
    this.score += 20;
  }

  failedRoll() {
    this.score -= 10;
  }
}

let currentUser;
let users;

// On PAGE RELOAD
document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (!localStorage.getItem("users")) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));

      // Display Users from Local Storage to usr-list list
      for (var i = 0; i < users.length; i++) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(users[i].name);
        node.appendChild(textnode);
        document.getElementById("usr-list").appendChild(node);
      }
    }
  },
  false
);

// VALIDATATION

function isValid(number) {
  if(!number)return false;
  return number >= 1 && number <= 6;
}

// USER UTILS
function userLogin() {
  var userName = document.querySelector("#username").value;
  if (!userName) {
    document.getElementById("error").innerHTML = "Username cannot be empty.";
    document.querySelector("#username").focus();
  } else {
    const result = users.filter((user) => user.name == userName);
    if (users.length == 0 || result.length == 0) {
      const user = new User(userName);
      users.push(user);
      currentUser = user;

      // CREATING NEW ELEMENT IN USERS
      const node = document.createElement("li");
      const textnode = document.createTextNode(currentUser.name);
      node.appendChild(textnode);
      document.getElementById("usr-list").appendChild(node);

      localStorage.setItem("users", JSON.stringify(users));
    } else {
      currentUser = result[0];
      console.log("User is present");
    }
    // SETTING THE USERNAME
    document.getElementById("user").innerHTML = currentUser.name;
    document.getElementById("score").innerHTML = currentUser.score;

    // SHOW THE DICE ROLL MENU
    let element = document.getElementById("playground");
    element.classList.remove("playground-wrapper");
    element.classList.add("playground-wrapper-on");
  }
}
// DICE UTILS
function rollDice() {
  const predictedval = document.getElementById("predictedval").value;
  if (isValid(predictedval) === false) {
    document.getElementById("rollerror").innerHTML = "Enter value from 1-6";
    document.getElementById("predictedval").focus();
    return;
  }
  const randomVal = Math.floor(Math.random() * 6) + 1;

  // GETTING USER LIST FROM LOCAL STORAGE FOR UPDATING VALUES
  let users = JSON.parse(localStorage.getItem("users"));
  let currScore;
  if (predictedval == randomVal) {
    for (var i = 0; i < users.length; i++) {
      if (currentUser.name === users[i].name) {
        users[i].score += 20;
        currScore = users[i].score;
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    for (var i = 0; i < users.length; i++) {
      if (currentUser.name === users[i].name) {
        users[i].score -= 10;
        currScore = users[i].score;
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  document.getElementById("randomnumber").innerHTML = randomVal;
  document.getElementById("score").innerHTML = currScore;
}


function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement; 
}

document.getElementById('usr-list').addEventListener('click',function(event) {
    let target=getEventTarget(event);
    alert("Changing to "+target.innerHTML);
    userIndex=target.innerHTML;
    changeUser(userIndex);
})

function changeUser(username) {
  let usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
  const result = usersFromLocalStorage.filter((user) => user.name == username);
  currentUser = result[0];
  console.log("User changed");
  document.getElementById("user").innerHTML = currentUser.name;
  document.getElementById("score").innerHTML = currentUser.score;
}