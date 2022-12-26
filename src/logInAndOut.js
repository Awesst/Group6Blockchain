export { createLoginField };
import { default as Chain } from "/src/blockchain/chain.js";
import { validateChain } from "./blockchain/validateChain.js";
import { default as Block } from "/src/blockchain/block.js";


let first = new Chain();

let users = [
  { userName: "Janne", passWord: "Kemi" },
  { userName: "Jakob", passWord: "Dahlberg" },
  { userName: "Edvin", passWord: "Ekström" },
  { userName: "Fredrik", passWord: "Carlsson" },
  { userName: "Hossein", passWord: "Feili" },
  { userName: "Carolin", passWord: "Nielsen" },
  { userName: "Katalin", passWord: "Widén" },
];

// SET UP AND STORE USERS IN LOCALSTORAGE

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

// CHECK IF THERE IS SOMEONE LOGGED IN AND GENERATE LOGGED-IN OR PUBLIC VIEW ACCORDINGLY

window.onload = () => {
  const loggedInUser = localStorage.getItem("userLoggedIn");
  if (loggedInUser) {
    createLoggedInView(loggedInUser);
  } else {
    createLoginField();
  }
};


// CREATES LOGIN INPUT FIELD AND BUTTON

function createLoginField() {

  loginContainer.innerHTML =
    '<input id="userName" type="text" placeholder="Username" class="styled-input"><input id="passWord" type="password" placeholder="Password" class="styled-input"></input><button id="loginButton" class="styled-button">Log in</button><br><br><br><p style="color: white; font-weight: bold">Public blockchain data</p><p style="color: white">We have worldwide coverage. Here, you can see a list of some of the most popular locations our system has been accessed from: <br><br><button id="frequentLocationsButton" class="styled-button">List locations</button><div id="newH3"></div><br><br>';

  let loginButton = document.getElementById("loginButton");

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


  // DISPLAY PUBLIC CHAIN DATA

  frequentLocationsButton.addEventListener("click", () => {

    const loggedInUser = localStorage.getItem("userLoggedIn");
    if (!loggedInUser) {
      let firstChain = localStorage.getItem("first");
      let chain;

      if (firstChain) {
        chain = JSON.parse(localStorage.getItem("first"));
      }

      // Get all the cities from the blocks in the chain
      let cities = chain.blockChain.map(block => block.data.city);

      // Count the frequency of each city
      let cityCounts = {};
      for (let city of cities) {
        if ((city !== "undefined") && city in cityCounts) { // exclude undefined cities: sometimes the API returns undefined
          cityCounts[city]++;
        } else if (city) {
          cityCounts[city] = 1;
        }
      }

      // Find country corresponding to cities with highest count
      let cityToCountry = {};
      chain.blockChain.forEach(block => {
        let city = block.data.city;
        let country = block.data.country;
        cityToCountry[city] = country;
      });

      // Sort according to city frequency
      let sortedCities = Object.keys(cityCounts).sort((a, b) => cityCounts[b] - cityCounts[a]);

      // Get the data for the newest block
      let newestBlock = chain.blockChain[chain.blockChain.length - 1];
      let newestBlockCity = newestBlock.data.city;
      let newestBlockCountry = newestBlock.data.country;
      let newestBlockTime = newestBlock.timestamp;

      // Convert the timestamp to a date object
      let date = new Date(newestBlockTime);

      // Get the local time in the format "hh:mm:ss"
      let localTime = date.toLocaleTimeString();

      // Display the top five cities
      let topThreeCities = sortedCities.slice(0, 3);
      let parentEl = document.getElementById("newH3");

      // Add an empty line before the header
      let emptyLine = document.createElement("br");
      parentEl.appendChild(emptyLine);

      // Add a header to the list
      let header = document.createElement("h3");
      header.innerHTML = "Top locations logged by our system";
      parentEl.appendChild(header);

      // Add an empty line after the header
      parentEl.appendChild(document.createElement("br"));

      // Create the list element
      let list = document.createElement("ul");
      parentEl.appendChild(list);

      // Loop through the top three cities and add them to the list along with the corresponding country and number of blocks logged from that city
      topThreeCities.forEach((city, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${city}, ${cityToCountry[city]} [logged ${cityCounts[city]} times]`;
        list.appendChild(item);

      });

      // Add an empty line before "Last block added from"
      list.appendChild(document.createElement("br"));

      // Create a header element for the latest block information
      let latestBlockHeader = document.createElement("h5");
      latestBlockHeader.innerHTML = "Last block added from";

      // Create a paragraph element for last block information
      let latestBlockParagraph = document.createElement("p");
      latestBlockParagraph.innerHTML = `${newestBlockCity}, ${newestBlockCountry}, ${localTime}`;

      let latestBlock = document.createElement("li");

      // Append the header and paragraph elements to the list item
      latestBlock.appendChild(latestBlockHeader);
      latestBlock.appendChild(latestBlockParagraph);

      // Append the list item to the list
      list.appendChild(latestBlock);

      // Add an empty line after the list item
      list.appendChild(document.createElement("br"));

    }

  });

}


// GENERATES LOGGED-IN VIEW 

function createLoggedInView() {

  //CREATES THE VIEW THAT LOGGED IN USER SEES + LOGOUT AND SAVED LOCATIONS BUTTON

  let currentUser = localStorage.getItem("userLoggedIn");
  loginContainer.innerHTML = "";
  let loggedinView = document.createElement("h4");
  loginContainer.appendChild(loggedinView);

  loggedinView.innerHTML =
    "<br>Welcome, " +
    currentUser +
    ', you have logged in! <br></br> <button id="logoutButton" class="styled-button">Log out</button> <span>&nbsp;</span> <button id="viewMyBlocksButton" class="styled-button">View my saved locations</button><br></br><h3 id="newH3"></h3>';

  let logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", () => {
    createLoginField();
    localStorage.removeItem("userLoggedIn");
  });

  // STORE CHAIN IN LOCALSTORAGE -- ONLY AVAILABLE FOR LOGGED-IN USERS

  let searchButton = document.getElementsByClassName("searchButton")[0];

  searchButton.addEventListener("click", async () => {

    // Check if user is logged in
    let currentUser = localStorage.getItem("userLoggedIn");
    if (currentUser === null || currentUser === '') {

      // Show alert
      alert("You must be logged in to add blocks to the chain!");

    } else {

      // User is logged in, so proceed with adding a new block to the chain
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
          console.log("Cathy is a Class of her own -- a Goddess.prototype")

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
    }
  });


  // DISPLAY ACTIVE USER'S OWN BLOCKS

  let viewMyBlocksButton = document.getElementById("viewMyBlocksButton");
  viewMyBlocksButton.className = "styled-button";

  viewMyBlocksButton.addEventListener("click", () => { ////NEW BUTTON 221222

    // GENERATE LIST FROM LS FETCHED DATA

    let loggedInUser = localStorage.getItem("userLoggedIn"); //HÄMTAR LOGGEDINUSER FRÅN LS
    console.log("Loggedinuser är: " + loggedInUser); //LOGGED IN USER

    let firstChain = localStorage.getItem("first");
    let chain;

    if (firstChain) {
      chain = JSON.parse(localStorage.getItem("first"));
    }

    console.log("first.blockChain är: " + JSON.stringify(chain.blockChain)); //VISAR BLOCKKEDJAN
    console.log("first.blockChain[1].user är: " + JSON.stringify(chain.blockChain[1].data.user)); //VISAR VEM SOM SKAPAT BLOCK NR 2


    /* let mySavedBlocks = chain.blockChain.filter(function (block) { //FILTRERAR UT DE BLOCK SOM LOGGED IN USER HAR SKAPAT I BLOCKKEDJAN OCH LÄGGER I NY ARRAY
    
    return block.data.user === loggedInUser;
    }); */

    // I put the above in a function to be able to toggle (but too brain-dead to fix the toggle anyway) 
    // I modified so that it displays actual block number in the chain, not necessarily starting from 1 for the current user
    function getMySavedBlocks(chain, loggedInUser) {
      return chain.blockChain.filter(function (block, index) {
        block.blockNumber = index + 1; // add blockNumber property to block
        return block.data.user === loggedInUser;
      });
    }

    let mySavedBlocks = getMySavedBlocks(chain, loggedInUser);

    let parentEl = document.getElementById("newH3");
    let newH2 = document.createElement("h2");
    parentEl.appendChild(newH2);
    newH2.setAttribute("id", "newH2");
    newH2.innerHTML = "Here are your saved blocks";

    // GENERATE AND FILL THE DROP-DOWN TABLE

    for (let i = 0; i < mySavedBlocks.length; i++) {
      let item = document.createElement("li", "br");
      item.setAttribute("class", "displayBoxes");
      newH2.appendChild(item);

      let blockNumber = document.createElement("p");
      blockNumber.innerHTML = "Block " + mySavedBlocks[i].blockNumber; // display true block index (blockNumber) instead of starting from 1 for the current user
      blockNumber.classList.add("bold-text");
      item.appendChild(blockNumber);

      let userRow = document.createElement("p");
      userRow.innerHTML = "User: " + mySavedBlocks[i].data.user;
      item.appendChild(userRow);

      let longitudeRow = document.createElement("p");
      longitudeRow.innerHTML = "Longitude: " + mySavedBlocks[i].data.longitude;
      item.appendChild(longitudeRow);

      let latitudeRow = document.createElement("p");
      latitudeRow.innerHTML = "Latitude: " + mySavedBlocks[i].data.latitude;
      item.appendChild(latitudeRow);

      let cityRow = document.createElement("p");
      cityRow.innerHTML = "City: " + mySavedBlocks[i].data.city;
      item.appendChild(cityRow);

      let countryRow = document.createElement("p");
      countryRow.innerHTML = "Country: " + mySavedBlocks[i].data.country;
      item.appendChild(countryRow);

      let timestampRow = document.createElement("p");
      timestampRow.innerHTML = "Timestamp: " + mySavedBlocks[i].data.timestamp;
      item.appendChild(timestampRow);

      let timeRow = document.createElement("p");
      timeRow.innerHTML = "Local Time: " + mySavedBlocks[i].timestamp.toString().split("(")[0]; // take away (Central European Standard Time)
      item.appendChild(timeRow);

      let previousHashRow = document.createElement("p");
      previousHashRow.innerHTML = "Previous hash: " + mySavedBlocks[i].previousHash;
      previousHashRow.setAttribute("data-hash", mySavedBlocks[i].previousHash);
      previousHashRow.classList.add("hash");
      item.appendChild(previousHashRow);

      let newHashRow = document.createElement("p");
      newHashRow.innerHTML = "New hash: " + mySavedBlocks[i].newHash;
      newHashRow.setAttribute("data-hash", mySavedBlocks[i].newHash);
      newHashRow.classList.add("hash");
      item.appendChild(newHashRow);

      // HIGHLIGHT MATCHING HASHES IN DROP-DOWN TABLE
      // Good for a quick check, user can see immediately that the chain is valid, not having to rely on just a button stating so

      let hashElements = document.querySelectorAll(".hash");

      hashElements.forEach(function (hashElement) {
        hashElement.addEventListener("mouseover", function (event) {
          let dataHash = event.target.getAttribute("data-hash");
          let hashSelector = `.hash[data-hash="${dataHash}"]`;
          let matchingElements = document.querySelectorAll(hashSelector);
          matchingElements.forEach(function (matchingElement) {
            matchingElement.style.backgroundColor = "lightgrey";
          });
        });

        hashElement.addEventListener("mouseout", function (event) {
          let dataHash = event.target.getAttribute("data-hash");
          let hashSelector = `.hash[data-hash="${dataHash}"]`;
          let matchingElements = document.querySelectorAll(hashSelector);
          matchingElements.forEach(function (matchingElement) {
            matchingElement.style.backgroundColor = "";
          });
        });
      });
    }
  });
}



// Can this be a separate module? Since it is generally available for both logged in- and public users

// VALIDATE CHAIN

export function validateChainButton() {

  let validateContainer = document.getElementById("validateContainer");
  validateContainer.innerHTML = "";

  let validateButton = document.createElement("validateButton");
  validateButton.className = "styled-button-white";

  validateButton.innerHTML = "Validate Chain";
  validateContainer.appendChild(validateButton);

  // add some visual cue to that the validation has been successful, other than just a console log --> green indicator
  const validationStatus = document.getElementById("validationStatus");

  validateButton.addEventListener("click", () => {
    if (validateChain(first)) {
      validationStatus.classList.add("green");
      console.log("Jakob är bäst!");
    } else {
      validationStatus.classList.add("red");
    }
  });
}