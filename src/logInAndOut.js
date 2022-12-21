export { createLoginField };
// import { validateChain } from "./blockchain/validateChain.js";

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
    '<input id="userName" type="text" placeholder="Username"><br><input id="passWord" type="password" placeholder="Password"></input><br><button id="loginBtn">Log in</button>';
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
  loggedinView.innerHTML = `Välkommen, du är nu inloggad som ${users.userName} <br></br>`;
  let logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Log Out";
  logoutBtn.id = "logoutBtn";

  logoutBtn.addEventListener("click", () => {
    loginBtn.remove(); /// nyaste sättet att plocka bort element!
    loginContainer.remove(); /// nyaste sättet att plocka bort element!
    localStorage.removeItem("userLoggedIn");
    loginFormButton(); // här kommer våran knapp fram (testing)
  });
  loggedinView.appendChild(logoutBtn);
}

window.onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    createLoggedInView(loggedInUser);
    loginFormBtn.remove();
  } else {
    loginFormButton();
  }
};


export function validateChainBtn() {
  validateContainer.innerHTML = "";
  let validateButton = document.createElement("button");
  validateContainer.appendChild(validateButton);
  validateButton.innerHTML =
    '<button id="validateBtn" >Validate Button</button>';
  let validateBtn = document.getElementById("validateBtn");

  validateBtn.addEventListener("click", () => {
    // validateChain();
    console.log("Jakob är bäst!");
  });

export function loginFormButton() {
  loginFormContainer.innerHTML = "";
  let formButton = document.createElement("button");
  formButton.innerText = "Login";
  formButton.id = "loginFormBtn";
  // loginFormContainer.innerHTML = '<button id="loginFormBtn" >Log in</button>';
  // let loginFormBtn = document.getElementById("loginFormBtn");

  formButton.addEventListener("click", () => {
    createLoginField();
    loginFormBtn.remove();
  });
  loginFormContainer.appendChild(formButton);
}
