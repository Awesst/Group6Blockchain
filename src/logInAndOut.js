import { default as Chain } from "/src/blockchain/chain.js";

export { createLoginField };

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
  'Välkommen ' +currentUser + ', du är nu inloggad. <br></br><button id="saveLocationBtn">Save my location to the chain </button><button id="viewMyLocationsBtn" >View my saved Locations</button><br></br><button id="logoutBtn" >Log out</button> ';  
  
  let saveLocationBtn = document.getElementById("saveLocationBtn");
  let viewMyLocationsBtn = document.getElementById("viewMyLocationsBtn");
  let logoutBtn = document.getElementById("logoutBtn");

  saveLocationBtn.addEventListener("click", () => {
    //INSERT FUNCTION FOR CREATING A NEW BLOCK
  });

  viewMyLocationsBtn.addEventListener("click", () => {
    //INSERT FUNCTION FOR DISPLAYING CURRENTLY LOGGED IN USER'S SAVED BLOCKS
  });

  logoutBtn.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
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
