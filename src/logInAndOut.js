export { createLoginField };
import { default as Chain } from "/src/blockchain/chain.js";
import { validateChain } from "./blockchain/validateChain.js";

let first = new Chain();
const users = [
  { userName: "Janne", passWord: "Kemi" },
  { userName: "Jakob", passWord: "Dahlberg" },
  { userName: "Edvin", passWord: "Ekström" },
  { userName: "Fredrik", passWord: "Carlsson" },
  { userName: "Hossein", passWord: "Feili" },
  { userName: "Carolin", passWord: "Nielsen" },
  { userName: "Katalin", passWord: "Widen" },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

function createLoginField() {
  //CREATES LOGIN INPUTFIELD AND BUTTON

  loginContainer.innerHTML =
    '<input id="userName" type="text" placeholder="Username"><input id="passWord" type="password" placeholder="Password"></input><button id="loginBtn">Log in</button>';

  let loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("users"));
    const foundUser = users.find(
      (user) =>
        user.userName === userName.value && user.passWord === passWord.value
    );
    if (foundUser) {
      localStorage.setItem("userLoggedIn", foundUser.userName);
      createLoggedInView();
    } else {
      alert("Invalid!");
    }
  });
}

function createLoggedInView() {
  //CREATES THE VIEW THAT LOGGED IN USER SEES +LOGOUT BTN
  let currentUser = localStorage.getItem("userLoggedIn");
  loginContainer.innerHTML = "";
  let loggedinView = document.createElement("h4");
  loginContainer.appendChild(loggedinView);
  loggedinView.innerHTML =
    "Välkommen " +
    currentUser +
    ', du är nu inloggad <br></br> <button id="logoutBtn" >Log out</button><br><br><button id="logIt">Log my location</button>';
  let logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
  });
  let logIt = document.getElementById("logIt");
  logIt.addEventListener("click", () => {
    console.log("button works");
    first.addBlock();
    console.log(first);
  });
}

window.onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    createLoggedInView(loggedInUser);
  } else {
    createLoginField();
  }
};

export function validateChainBtn() {
  validateContainer.innerHTML = "";
  let validateBtn = document.createElement("button");
  validateBtn.id = "validateBtn";
  validateBtn.innerText = "Validate Button";
  validateContainer.appendChild(validateBtn);

  validateBtn.addEventListener("click", () => {
    validateChain();
    console.log("Jakob är bäst!");
  });
}
