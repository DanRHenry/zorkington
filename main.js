// DOM Bindings
const stuff = document.getElementById("inventory");
const textInput = document.getElementById("inputText");
const look = document.getElementById("look");
const take = document.getElementById("take");
const helpBtn = document.getElementById("help-btn");
const displayText = document.getElementById("displayText");
const north = document.getElementById("North");
const south = document.getElementById("South");
const east = document.getElementById("East");
const west = document.getElementById("West");
const submit = document.getElementById("submit-btn");
const helpBox = document.getElementById("helpBox");

// Useful Links:
// https://mixkit.co/free-sound-effects/horror/
// https://groups.google.com/a/chromium.org/g/chromium-extensions/c/AzO_taH2b7U?pli=1 // Creating JSON from local storage

// Global Variables
let nameInput;
let input;
let item = [];
let directionalStatuses = [];
let inventory = ["keycard"];
let locationArray = []; // This will store all constructed location objects
let z = 0;
let x = 9;
let y = 9;
let playerLocation = [z, x, y];
let locationIndex = 0;
let response;
let inventoryList = "";

// Intro Welcome Message

const welcomeMessage = `<span>Welcome to the <br><br><strong>UprightEd <br>Zorkington Project!</strong> <br><br>Before we get started... Please enter your <strong>name.</strong></span>`;

function submitNameAndUnlockButtons() {
  nameInput = textInput.value;
  textInput.value = "";
  // Directions

  north.addEventListener("click", handleNorthClick);

  south.addEventListener("click", handleSouthClick);

  east.addEventListener("click", handleEastClick);

  west.addEventListener("click", handleWestClick);

  stuff.addEventListener("click", handleStuffClick);

  look.addEventListener("click", describe);
}

// Event Listeners

// Help Button
helpBtn.addEventListener("click", () => {
  helpBox.style.display = "flex";
  closeBox.addEventListener("click", () => {
    helpBox.style.display = "none";
  });
});

function handleNorthClick() {
  response = textInput.value.toLowerCase();
  go("north");
  describe();
}

function handleSouthClick() {
  response = textInput.value.toLowerCase();
  go("south");
  describe();
}

function handleEastClick() {
  response = textInput.value.toLowerCase();
  go("east");
  describe();
}

function handleWestClick() {
  response = textInput.value.toLowerCase();
  go("west");
  describe();
}

function handleStuffClick() {
  displayInventory();
}

displayText.innerHTML = `${welcomeMessage}`;

function submitTextNameCheck() {
  if (nameInput == undefined) {
    if (textInput.value == null || textInput.value < 1) {
      displayText.innerHTML = `I didn't understand that. <br> Please enter your <strong> name </strong>.`;
    } else {
      submitNameAndUnlockButtons();
      displayText.innerHTML = `Hi, <span><strong>${nameInput}</strong>! <br>We are happy that you have come to take a tour of our <span><strong>Zorkington project</strong>! <br><br>You're at the entrance to the <span><strong>PTSB January Cohort</strong>. <br><br>You see a <span><strong>magnetic stripe reader</strong>.`;
    }
  } else if (nameInput) {
    submitText();
  }
}

// ----------- Submit event listener, asks for name or redirects to other keywords -----------
textInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitTextNameCheck();
  }
});

//! Input Code Added Starting Here
function submitText() {
  response = textInput.value.toLowerCase();
  input = response.split(" ");
  response = textInput.value.toLowerCase();
  textInput.value = "";
  input.push(textInput);
  input = response.split(" ");
  input = input.map((item) => item.toLowerCase());

  //!------------------------------ Search input for keywords ------------------------------

  for (word of input) {
    if (word === "the") {
      input.splice(input.indexOf("the"), 1);
    }
  }
  if (input.length === 1 && input[0] === "") {
    return;
  }
  else if (input.includes("location")) {
    displayText.innerHTML = `${playerLocation}, ${locationArray}`;
  }

  //------------------------------------- Look command: ------------------------------------
  else if (input.includes("look") || input.includes("search")) {
    describe();
  }

  //-------------------------------------- Where am I? -------------------------------------
  //--Display Location coordinate (locationArray[locationIndex].coordinate), and Current Location (directionalStatuses)--
  // else if (input.includes("where")) {
  //   whereAmI();
  // }

  //-------------------------------------- Move north: -------------------------------------
  else if (
    (input.includes("go") && input.includes("north")) ||
    (input.includes("move") && input.includes("north")) ||
    (input.includes("walk") && input.includes("north")) ||
    (input.includes("go") && input.includes("forward")) ||
    (input.includes("move") && input.includes("forward")) ||
    (input.includes("walk") && input.includes("forward"))
  ) {
    go("north");
  }

  //--------------------------------------- Move south: ------------------------------------
  else if (
    (input.includes("go") && input.includes("south")) ||
    (input.includes("move") && input.includes("south")) ||
    (input.includes("walk") && input.includes("south")) ||
    (input.includes("go") && input.includes("backward")) ||
    (input.includes("move") && input.includes("backward")) ||
    (input.includes("walk") && input.includes("backward"))
  ) {
    go("south");
  }

  //--------------------------------------- Move east: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("east")) ||
    (input.includes("move") && input.includes("east")) ||
    (input.includes("walk") && input.includes("east")) ||
    (input.includes("go") && input.includes("right")) ||
    (input.includes("move") && input.includes("right")) ||
    (input.includes("walk") && input.includes("right"))
  ) {
    go("east");
  }

  // -------------------------------------- Move west: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("west")) ||
    (input.includes("move") && input.includes("west")) ||
    (input.includes("walk") && input.includes("west")) ||
    (input.includes("go") && input.includes("left")) ||
    (input.includes("move") && input.includes("left")) ||
    (input.includes("walk") && input.includes("left"))
  ) {
    go("west");
  }

  // --------------------------------------- Move up: --------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("up")) ||
    (input.includes("move") && input.includes("up")) ||
    (input.includes("walk") && input.includes("up"))
  ) {
    go("up");
  }

  // -------------------------------------- Move down: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("down")) ||
    (input.includes("move") && input.includes("down")) ||
    (input.includes("walk") && input.includes("down"))
  ) {
    go("down");
  }

  // ------------------------------------ Warp to start: -----------------------------------
  // else if (
  //   input.includes("warp")
  //   // input.includes("please") ||
  //   // input.includes("abracadabra") ||
  //   // input.includes("hocus")
  // ) {
  //   warp();
  // }

  // -------------------------------------- Exit game: -------------------------------------
  else if (input.includes("quit") || input.includes("exit")) {
    console.log("game over");
    warp(true);
  }

  // --------------------------------- Take/pick up items: ---------------------------------
  /* 
  Check to see if an item exists in the current location
  If it does, add it to the inventory and remove it from the current location object.
  */
  else if (input.includes("take") || input.includes("pick")) {
    let itemToTake;
    // console.log("Take here", input);
    if (input.includes("take")) {
      itemToTake = input[input.indexOf("take") + 1];
      takeItem(itemToTake);
    } else if (input.includes("pick")) {
      itemToTake = input[input.indexOf("pick") + 2];
      takeItem(itemToTake);
    } else {
      takeItem();
    }
  }

  // ------------------------------------- Drop Item: --------------------------------------
  // Use the splice command to remove the dropped item from the inventory
  else if (input.includes("drop") || input.includes("leave")) {
    let itemToDrop;
    if (input.includes("drop")) {
      itemToDrop = input[input.indexOf("drop") + 1];
      // console.log("itemtodrop:", itemToDrop);
      drop(itemToDrop);
    } else if (input.includes("leave")) {
      // console.log(input);
      let itemToDrop = input[input.indexOf("leave") + 1]; // Takes the next word in the input index to use as an item argument
      itemToDrop = input[indexOf("leave") + 1];
      // console.log("itemtoleave:", itemToDrop);
      drop(itemToDrop);
    }
  }

  // This works for unlocking doors, but doesn't work for detecting if there is nothing to unlock
  else if (input.includes("unlock") || input.includes("swipe")) {
    unlock();
  }

  //------------------------------------ View Inventory: -----------------------------------
  else if (
    input.includes("inventory") ||
    input.includes("items") ||
    input.includes("i")
  ) {
    displayInventory();
    setTimeout(() => {
      describe()
    }, 2000);
  }

  // ------------------------------------ Open the door ------------------------------------
  else if (input.includes("open") && locationArray[locationIndex].funct) {
    locationArray[locationIndex].funct();
    //?    start()
  } else if (input.includes("open") && !locationArray[locationIndex].funct) {
    displayText.innerHTML = `There's nothing to open here!`;
    //?    start()
  }  else if (searchLocationArrayForPlayerLocation().funct !== undefined) {
    if (input.includes(searchLocationArrayForPlayerLocation().funct.name)) {
      searchLocationArrayForPlayerLocation().funct();
    }
  } 

  // ------------------------------- Command not recognized: -------------------------------
  else {
    displayText.innerHTML = `I don't understand what you're saying.`;
    //?  start()
  }
}

// Functions

// function exitGame () {
//   console.log("Game Over")
//   warp()
// }
//!-------------------------------Location Class Constructor------------------------------
class Location {
  constructor(
    coordinate,
    name,
    description,
    north,
    east,
    south,
    west,
    up,
    down,
    item,
    lock,
    funct
  ) {
    this.coordinate = coordinate; // Location on map
    this.description = description; // wordy description from looking around
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
    this.up = up; // Default direction to closed
    this.down = down; // Default direction to closed
    this.name = name; // quick name of location
    this.item = item;
    this.lock = lock; // holds a string that matches a key used to unlock it
    this.funct = funct;
  }
}

//!-------------------------- Standard Location Creation Function ------------------------
function createLocation(newLocation) {
  // console.log("newLocation", newLocation);
  newLocation = new Location(
    newLocation.coordinate,
    newLocation.name,
    newLocation.description,
    newLocation.north,
    newLocation.east,
    newLocation.south,
    newLocation.west,
    newLocation.up,
    newLocation.down,
    newLocation.item,
    newLocation.lock,
    newLocation.funct
  );
  locationArray.push(newLocation);
  // console.log("locationArray:",locationArray)
}

//!------------------------ Locations to Populate locationArray---------------------------
// Create Start Location
const startingLocation = {
  coordinate: [0, 9, 9],
  name: "home",
  description:
    "You're at the entrance to the PTSB January Cohort. <br><br> You see a <span><strong>magnetic stripe reader.</strong></span>",
  north: "blocked",
  east: undefined,
  south: undefined,
  west: undefined,
  up: undefined,
  down: undefined,
  item: [`keycard`, `crayon`, `index`, `football`],
  lock: "keycard",
  funct: function jump() {
    console.log("jumping");
  },
};

createLocation(startingLocation);

// Create Hallway

const hallwayLocation = {
  coordinate: [0, 9, 10],
  name: "hallway",
  description:
    "\nThere are doors up and down the hallway. <br>Through a window to your <em>left</em>, you can see <strong>Morgan Walker</strong>. She appears to be meeting with a <em>student</em>. Best not disturb them. <br>To the <em>right</em> is a <strong>door</strong to an office.",
  north: undefined,
  east: undefined,
  south: undefined,
  west: "blocked",
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(hallwayLocation);

// Create topOfStairway

const topOfStairwayLocation = {
  coordinate: [0, 8, 11],
  name: "stairwell",
  description: "You stand at a stairwell going down",
  north: "blocked",
  east: undefined,
  south: "blocked",
  west: "blocked",
  up: undefined,
  down: "open",
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(topOfStairwayLocation);

// Create dungeon
const dungeonLocation = {
  coordinate: [-1, 8, 11],
  name: "dungeon",
  description:
    "You have stumbled on a dungeon. There is a narrow path to your right.",
  north: "blocked",
  east: undefined,
  south: "blocked",
  west: "blocked",
  up: "open",
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};
createLocation(dungeonLocation);

// Create Traproom
const trapRoomLocation = {
  coordinate: [-1, 9, 11],
  name: "trapRoom",
  description:
    "It's a trap! The door has closed and locked behind you! It isn't budging. You see a note that reads: Speak the magic word, and you may exit.",
  north: "blocked",
  east: "blocked",
  south: "blocked",
  west: "blocked",
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: function warp () {
    [z, x, y] = [0, 9, 9];
    playerLocation = [z, x, y];
    displayText.innerHTML = `You have warped home!`;
    setTimeout(() => {
      describe();
    }, 1000);
  },
};

createLocation(trapRoomLocation);

// Create Kate's Office
const katesOfficeLocation = {
  coordinate: [0, 9, 12],
  name: "katesOffice",
  description:
    "<strong>Kate</strong> is waiving hello. <br>There's a <strong>lamp</strong> on Kate's desk.",
  north: "blocked",
  east: "blocked",
  south: undefined,
  west: "blocked",
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(katesOfficeLocation);

// Create End of Hall

const endOfHallLocation = {
  coordinate: [0, 9, 11],
  name: "endOfHall",
  description:
    "You reach the end of the hall,\nthe door to <strong>Kate's office</strong> is ahead. <br>To the left is a <strong>stairwell</strong>.",
  north: undefined,
  east: "blocked",
  south: undefined,
  west: undefined,
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(endOfHallLocation);

// Create Ben's Office
const bensOfficeLocation = {
  coordinate: [0, 10, 10],
  name: "bensOffice",
  description:
    "<br><strong>Ben</strong> is sitting at his computer, leading a help session. <br>He offers you <em>sympathy</em>.<br>",
  north: "blocked",
  east: "blocked",
  south: "blocked",
  west: undefined,
  up: undefined,
  down: undefined,
  item: ["tissue"],
  lock: undefined,
  funct: function say() {
    displayText.innerHTML = "I've got a show tonight, gotta go!";
    setTimeout(() => {
      describe()
    }, 1000);
  },
};

createLocation(bensOfficeLocation);


function searchLocationArrayForPlayerLocation() {
  for (
    let locationIndex = 0;
    locationIndex < locationArray.length;
    locationIndex++
  ) {
    if (
      JSON.stringify(locationArray[locationIndex].coordinate) ===
      JSON.stringify(playerLocation)
    ) {
      return locationArray[locationIndex];
    }
  }
  onTheFlyLocation();
}

//?---------------------------------------------------------

//! Functions Section:

// ------------------- Creating a new location if none is present. -----------------------
function onTheFlyLocation() {
  let newLocation = `_${playerLocation}`;

  createLocation({
    coordinate: playerLocation,
    name: newLocation,
    description: "nothing special about this area",
    item: [],
  });
  searchLocationArrayForPlayerLocation();
  // }
}

// -------------------------------- Take Items function: ---------------------------------
function takeItem(itemToTake) {
  if (
    searchLocationArrayForPlayerLocation() == undefined ||
    searchLocationArrayForPlayerLocation().item.length == 0
  ) {
    displayText.innerHTML = `There's nothing to pick up.`;
    //?        start();
  } else {
    let localItem = searchLocationArrayForPlayerLocation().item;
    if (itemToTake != undefined && localItem[localItem.indexOf(itemToTake)]) {
      inventory.push(localItem[localItem.indexOf(itemToTake)]);
      localItem.splice(localItem.indexOf(itemToTake), 1);
      let itemMessage = `You pick up the <strong>${itemToTake}</strong>`;
      setTimeout(() => {
        displayText.innerHTML = itemMessage;
      }, 0);
      setTimeout(() => {
        describe();
      }, 2000);
      itemToTake = undefined;
      //?          start();
    } else if (
      itemToTake != undefined &&
      !localItem[localItem.indexOf(itemToTake)]
    ) {
      displayText.innerHTML = `You can't take that.`;
      itemToTake = undefined;
      //?          start();
    } else if (itemToTake == undefined) {
      displayText.innerHTML = `Can you be more specific?`;
    }
  }
}

// ---------------------------- Confirm Drop Items Function ------------------------------
function dropYN(item) {
  let itemMessage = `You set down the <strong>${item}</strong>.`;
  setTimeout(() => {
    displayText.innerHTML = itemMessage;
  }, 0);
  setTimeout(() => {
    describe();
  }, 2000);

  searchLocationArrayForPlayerLocation().item.push(item);
  inventory.splice([inventory.indexOf(item)], 1);
  //?          start();
}

// --------------------------------- Drop Items Function ---------------------------------
function drop(item) {

  // -------------------------------- Drop Inventory Check ---------------------------------

  if (!inventory.includes(item)) {
    displayText.innerHTML = `You can't drop what you don't have.`;
    //?        start();
  } else {
    dropYN(item);
  }
  //?          start();
}

// ---------------------------------- Movement Function ----------------------------------
async function go(text) {
  let blockedMessage = `The way is blocked.`;
  if (text == "north" || text == "forward") {
    if (searchLocationArrayForPlayerLocation().north == "blocked") {
      setTimeout(() => {
        blocked(blockedMessage);
      }, 1);
      playerLocation = searchLocationArrayForPlayerLocation().coordinate;
    } else {
      y++;
      playerLocation = [z, x, y];
      moveNotice(text);
    }
  } else if (text == "east" || text == "right") {
    if (searchLocationArrayForPlayerLocation().east == "blocked") {
      blocked(blockedMessage);
      playerLocation = searchLocationArrayForPlayerLocation().coordinate;
    } else {
      x++;
      playerLocation = [z, x, y];
      moveNotice(text);
    }
  } else if (text == "south" || text == "backward") {
    if (searchLocationArrayForPlayerLocation().south == "blocked") {
      blocked(blockedMessage);
      playerLocation = searchLocationArrayForPlayerLocation().coordinate;
    } else {
      y--;
      playerLocation = [z, x, y];
      moveNotice(text);
    }
  } else if (text == "west" || text == "left") {
    if (searchLocationArrayForPlayerLocation().west == "blocked") {
      setTimeout(() => {
        blocked(blockedMessage);
      }, 1);
      playerLocation = searchLocationArrayForPlayerLocation().coordinate;
    } else {
      x--;
      playerLocation = [z, x, y];
      moveNotice(text);
    }
  } else if (text == "up") {
    if (searchLocationArrayForPlayerLocation().up != "open") {
      setTimeout(() => {
        blocked(`You can't go up from here.`);
      }, 1);
      playerLocation = searchLocationArrayForPlayerLocation().coordinate;
    } else {
      z++;
      playerLocation = [z, x, y];
      const currentLocation = searchLocationArrayForPlayerLocation();
      moveNotice(text);
    }
  } else if (text == "down") {
    if (searchLocationArrayForPlayerLocation().down != "open") {
      setTimeout(() => {
        blocked(`You can't go down from here.`);
      }, 1);
      playerLocation = searchLocationArrayForPlayerLocation().coordinate;
    } else {
      z--;
      playerLocation = [z, x, y];
      moveNotice(text);
    }
  }
  describe();
}

// ----------------------------------- Looking around ------------------------------------
function describe() {
  searchLocationArrayForPlayerLocation();

  if (
    searchLocationArrayForPlayerLocation().item.length > 0 &&
    searchLocationArrayForPlayerLocation().description
  ) {

    let items = [];

    for (
      let c = 0;
      c < searchLocationArrayForPlayerLocation().item.length;
      c++
    ) {
      items.push(`${searchLocationArrayForPlayerLocation().item[c]},`);
    }

    let word = items[items.length - 1];
    word = word.slice(0, -1);
    let itemList = "";

    if (searchLocationArrayForPlayerLocation().item.length > 1) {
      items[items.length - 1] = `and a ` + word + `.`;
      for (item of items) {
        (itemList += item), (itemList += " ");
      }
      itemList = itemList.slice(0, -1);
    } else {
      itemList = items[0];
      itemList = itemList.slice(0, -1);
      0.0;
    }
    setTimeout(() => {
      displayText.innerHTML = `You look around and see... <br> ${
        searchLocationArrayForPlayerLocation().description
      } <br>You also see a <strong>${itemList}</strong>`;
    }, 0);
  }
  displayText.innerHTML = `<br><br>You look around and see... <br> ${
    searchLocationArrayForPlayerLocation().description
  }<br>`;
}

function moveNotice(message) {
  setTimeout(() => {
    displayText.innerHTML = `You move ${message}.`;
  }, 0);
  setTimeout(() => {
    describe();
  }, 1000);
}

function blocked(message) {
  displayText.innerHTML = message;
  setTimeout(() => {
    describe();
  }, 1000);
}

// ----------------------------- Unlocking doors function: -------------------------------
function unlock() {
  if (!locationArray[locationIndex]) {
    setTimeout(() => {
      displayText.innerHTML = "There's nothing to unlock.";
    }, 0);
    setTimeout(() => {
      describe();
    }, 2000);
  } else if (locationArray[locationIndex].lock == undefined) {
    setTimeout(() => {
      displayText.innerHTML = "There's nothing to unlock.";
    }, 0);
    setTimeout(() => {
      describe();
    }, 2000);
  } else if (inventory.includes(locationArray[locationIndex].lock)) {
    if (locationArray[locationIndex].north == "blocked") {
      locationArray[locationIndex].north = undefined;
    } else if (locationArray[locationIndex].east == "blocked") {
      locationArray[locationIndex].east = undefined;
    } else if (locationArray[locationIndex].south == "blocked") {
      locationArray[locationIndex].south = undefined;
    } else if (locationArray[locationIndex].west == "blocked") {
      locationArray[locationIndex].west = undefined;
    }
    setTimeout(() => {
      displayText.innerHTML = `You hear a <strong>mechanism <em>click</em></strong>.<br>The <strong>door</strong> swings open.`;
    }, 0);
    setTimeout(() => {
      describe();
    }, 2000);
    inventory.splice(inventory.indexOf(locationArray[locationIndex].lock), 1);
    locationArray[locationIndex].lock = undefined;
    directionalStatuses[directionalStatuses.indexOf("blocked")] = undefined;
    //?    start()
  }
}

// ---------------------------------- Inventory ----------------------------------------
function displayInventory() {
  if (inventory.length == 0) {
    displayText.innerHTML = `You have <strong>nothing</strong> in your inventory`;
  } else {
    inventoryList = "<ol>";
    inventory.forEach((item) => {
      inventoryList += `<li>`;
      inventoryList += item;
      inventoryList += `<br>`;
    });
    inventoryList += `</ol>`;
    displayText.innerHTML = `<strong>Inventory:</strong> <br>${inventoryList}`;
  }
}