export { createLoginField };
import { default as Chain } from "/src/blockchain/chain.js";
import { validateChain } from "./blockchain/validateChain.js";
import { default as Block } from "/src/blockchain/block.js";


let first = new Chain();

const users = [
  { userName: "Janne", passWord: "Kemi" },
  { userName: "Jakob", passWord: "Dahlberg" },
  { userName: "Edvin", passWord: "Ekström" },
  { userName: "Fredrik", passWord: "Carlsson" },
  { userName: "Hossein", passWord: "Feili" },
  { userName: "Carolin", passWord: "Nielsen" },
  { userName: "Katalin", passWord: "Widén" },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

function createLoginField() {
  //CREATES LOGIN INPUTFIELD AND BUTTON

  loginContainer.innerHTML =
    '<input id="userName" type="text" placeholder="Username" class="styled-input"><input id="passWord" type="password" placeholder="Password" class="styled-input"></input><button id="loginButton">Log in</button>';

  let loginButton = document.getElementById("loginButton");
  loginButton.className = "styled-button";

  loginButton.addEventListener("click", () => {
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
  //CREATES THE VIEW THAT LOGGED IN USER SEES +LOGOUT Button
  let currentUser = localStorage.getItem("userLoggedIn");
  loginContainer.innerHTML = "";
  let loggedinView = document.createElement("h4");
  loginContainer.appendChild(loggedinView);
  loggedinView.innerHTML =
    "<br>Welcome, " +
    currentUser +
    ', you have logged in! <br></br> <button id="logItButton" style="margin-right: 10px;">Log my location</button><button id="viewMyBlocksButton">View my saved locations</button><br></br><button id="logoutButton" >Log out</button><br></br><h3 id="newH3"></h3>';
  let logoutButton = document.getElementById("logoutButton");
  logoutButton.className = "styled-button";


  logoutButton.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
  });


  // STORE CHAIN IN LOCALSTORAGE
  const logItButton = document.getElementById("logItButton");
  logItButton.className = "styled-button";

  logItButton.addEventListener("click", async () => {
    // CHECK IF CHAIN EXISTS IN LOCAL STORAGE
    let chain;

    try {
      const firstChain = localStorage.getItem("first");

      if (!firstChain) {

        // no valid chain in LS --> create one and store in LS
        chain = new Chain();

        console.log("Created new chain");

        console.log("test1", chain instanceof Chain);
        console.log("chain before going into LS", chain);

        localStorage.setItem("first", JSON.stringify(chain));

        console.log("genesis block", chain.getLatestBlock()); // correctly logs first block

      } else {
        // RETRIEVE CHAIN FROM LOCAL STORAGE AND ADD NEW BLOCK

        chain = JSON.parse(localStorage.getItem("first"));
        Object.setPrototypeOf(chain, Chain.prototype); // when we fetch an object from LS, prototype needs to be reassigned. Methods like addBlock() can only be used if we regenerate the chain object (Chain.prototype)

        console.log("test2", chain instanceof Chain); // true
        console.log("chain fetched from LS", chain);

        // recreate Blocks:
        // create new array [blocks] consisting of Block objects from chain data
        // new Block is created to recreate data, newHash and PrebiousHash properties in the blockChain array
        const blocks = chain.blockChain.map(item => new Block(item.data, item.newHash, item.previousHash));
        //chain.addBlock(new Block(Chain.chain.map(item => item))); // Janne's magic


        console.log("chain after mapping", chain);
        console.log("Cathy is a Class on her own -- a Goddess.prototype")

        chain.getLatestBlock();
        console.log("latest block before adding new", chain.getLatestBlock());

        await chain.addBlock(); // so that it has enough time to hash

        chain.getLatestBlock();
        console.log("latest block after adding new", chain.getLatestBlock());
        console.log("chain after adding a block", chain);

        localStorage.setItem("first", JSON.stringify(chain));
      }
    }
    catch (error) {
      console.error(error);
      alert("An error occurred while updating the chain. Please try again.");
    }
  });


// DISPLAY ACTIVE USER'S OWN BLOCKS

  let viewMyBlocksButton = document.getElementById("viewMyBlocksButton");
  viewMyBlocksButton.className = "styled-button";


  viewMyBlocksButton.addEventListener("click", () => { ////NEW BUTTON 221222

    let loggedInUser = localStorage.getItem("userLoggedIn"); //HÄMTAR LOGGEDINUSER FRÅN LS
    console.log("Loggedinuser är: " + loggedInUser); //LOGGED IN USER

    let firstChain = localStorage.getItem("first");
    let chain;

    if (firstChain) {
      chain = JSON.parse(localStorage.getItem("first"));
      Object.setPrototypeOf(chain, Chain.prototype);
    }

    console.log("first.blockChain är: " + JSON.stringify(chain.blockChain)); //VISAR BLOCKKEDJAN
    console.log("first.blockChain[1].user är: " + JSON.stringify(chain.blockChain[1].data.user)); //VISAR VEM SOM SKAPAT BLOCK NR 2


/*     let mySavedBlocks = chain.blockChain.filter(function (block) { //FILTRERAR UT DE BLOCK SOM LOGGED IN USER HAR SKAPAT I BLOCKKEDJAN OCH LÄGGER I NY ARRAY

      return block.data.user === loggedInUser;
    }); */

    function getMySavedBlocks(chain, loggedInUser) { // I put the above in a function to be able to toggle (but too brain-dead to fix the toggle anyway) 
      
      return chain.blockChain.filter(function (block) {
        return block.data.user === loggedInUser;
      });
    }

    let mySavedBlocks = getMySavedBlocks(chain, loggedInUser);

    let parentEl = document.getElementById("newH3");
    let newH2 = document.createElement("h2");
    parentEl.appendChild(newH2);
    newH2.setAttribute("id", "newH2");
    newH2.innerHTML = "Here are your saved blocks";

    for (let i = 0; i < mySavedBlocks.length; i++) {
      let item = document.createElement("li", "br");
      item.setAttribute("class", "displayBoxes");
      newH2.appendChild(item);

      // displaying as drop-down table

      let blockNumber = document.createElement("p");
      blockNumber.innerHTML = "Block " + (i + 1);
      // blockNumber.style.fontWeight = "bold"; does not work
      item.appendChild(blockNumber);

      let userRow = document.createElement("p");
      userRow.innerHTML = "user: " + mySavedBlocks[i].data.user;
      item.appendChild(userRow);

      let longitudeRow = document.createElement("p");
      longitudeRow.innerHTML = "longitude: " + mySavedBlocks[i].data.longitude;
      item.appendChild(longitudeRow);

      let latitudeRow = document.createElement("p");
      latitudeRow.innerHTML = "latitude: " + mySavedBlocks[i].data.latitude;
      item.appendChild(latitudeRow);

      let cityRow = document.createElement("p");
      cityRow.innerHTML = "city: " + mySavedBlocks[i].data.city;
      item.appendChild(cityRow);

      let countryRow = document.createElement("p");
      countryRow.innerHTML = "country: " + mySavedBlocks[i].data.country;
      item.appendChild(countryRow);

      let timestampRow = document.createElement("p");
      timestampRow.innerHTML = "timestamp: " + mySavedBlocks[i].data.timestamp;
      item.appendChild(timestampRow);

      let timeRow = document.createElement("p");
      timeRow.innerHTML = "time: " + mySavedBlocks[i].timestamp.toString().split("(")[0];
      item.appendChild(timeRow); // take away (Central European Standard Time)

      let previousHashRow = document.createElement("p");
      previousHashRow.innerHTML = "previous hash: " + mySavedBlocks[i].previousHash;
      item.appendChild(previousHashRow);

      let newHashRow = document.createElement("p");
      newHashRow.innerHTML = "new hash: " + mySavedBlocks[i].newHash;
      item.appendChild(newHashRow);

    }

  });
}


/*     let parentEl = document.getElementById("newH3");
    let newH2 = document.createElement("h2");
    parentEl.appendChild(newH2);
    newH2.setAttribute("id", "newH2");
    newH2.innerHTML = "Here are your saved blocks";
 
    let list = document.createElement("ul");
    newH2.appendChild(list);
 
    for (let i = 0; i < mySavedBlocks.length; i++) {
      let item = document.createElement("li");
      list.appendChild(item);
      item.innerHTML = JSON.stringify(mySavedBlocks[i]); */


window.onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    createLoggedInView(loggedInUser);
  } else {
    createLoginField();
  }
};


// VALIDATE CHAIN

export function validateChainButton() {

  let validateContainer = document.getElementById("validateContainer");
  validateContainer.innerHTML = "";

  let validateButton = document.createElement("validateButton");
  validateButton.className = "styled-button-white";

  validateButton.innerHTML = "Validate Chain";
  validateContainer.appendChild(validateButton);

  validateButton.addEventListener("click", () => {
    validateChain(first);
    console.log("Jakob är bäst!");
  });
}
