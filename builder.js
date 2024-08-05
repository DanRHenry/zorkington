
// DOM Bindings
let newLocation = document.getElementById("newLocation");
let coordinate = document.getElementById("coordinate");
let nameInput = document.getElementById("nameInput");
let description = document.getElementById("description");
let north = document.getElementById("north");
let east = document.getElementById("east");
let south = document.getElementById("south");
let west = document.getElementById("west");
let up = document.getElementById("up");
let down = document.getElementById("down");
let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");
let newLocationButton = document.getElementById("newLocationButton");
let coordinateButton = document.getElementById("coordinateButton");
let nameButton = document.getElementById("nameButton");
let descriptionButton = document.getElementById("descriptionButton");
let northButton = document.getElementById("northButton");
let eastButton = document.getElementById("eastButton");
let southButton = document.getElementById("southButton");
let westButton = document.getElementById("westButton")
let upButton = document.getElementById("upButton");
let downButton = document.getElementById("downButton");
let item1Button = document.getElementById("item1Button");
let item2Button = document.getElementById("item2Button");
let item3Button = document.getElementById("item3Button");
let finalSubmitButton = document.getElementById("finalSubmitButton");

// Event Listeners
newLocationButton.addEventListener("click", saveNewLocation);
coordinateButton.addEventListener("click", saveCoordinate);
nameButton.addEventListener("click", saveName);
descriptionButton.addEventListener("click", saveDescription);
northButton.addEventListener("click", saveNorth);
eastButton.addEventListener("click", saveEast);
westButton.addEventListener("click", saveWest);
upButton.addEventListener("click", saveUp);
downButton.addEventListener("click", saveDown);
item1Button.addEventListener("click", saveItem1);
item2Button.addEventListener("click", saveItem2);
item3Button.addEventListener("click", saveItem3);
finalSubmitButton.addEventListener("click", saveAll);
// Functions

function saveNewLocation() {
    localStorage.setItem(`${newLocation.value}_location`, newLocation.value);
}

function saveCoordinate() {
localStorage.setItem(`${newLocation.value}_coordinate`, coordinate.value);
}

function saveName() {
    localStorage.setItem(`${newLocation.value}_name`, nameInput.value);
    }

function saveDescription() {
    localStorage.setItem(`${newLocation.value}_description`, description.value);
}

function saveNorth() {
    localStorage.setItem(`${newLocation.value}_north`, north.value);
    }

function saveEast() {
    localStorage.setItem(`${newLocation.value}_east`, east.value);
    }

function saveSouth() {
    localStorage.setItem(`${newLocation.value}_south`, south.value);
    }

function saveWest() {
    localStorage.setItem(`${newLocation.value}_west`, west.value);
}

function saveUp() {
    localStorage.setItem(`${newLocation.value}_up`, up.value);
    }

function saveDown() {
    localStorage.setItem(`${newLocation.value}_down`, down.value);
    }

function saveItem1() {
    localStorage.setItem(`${newLocation.value}_item1`, item1.value);
    }
function saveItem2() {
    localStorage.setItem(`${newLocation.value}_item2`, item2.value);
    }
function saveItem3() {
    localStorage.setItem(`${newLocation.value}_item3`, item3.value);
    }

function saveAll() {
    saveNewLocation()
    saveCoordinate()
    saveName()
    saveDescription()
    saveNorth()
    saveEast()
    saveSouth()
    saveWest()
    saveUp()
    saveDown()
    saveItem1()
    saveItem2()
    saveItem3()
}

console.log(localStorage);