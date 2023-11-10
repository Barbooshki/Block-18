// Sample data for initial players
const initialPlayers = [
    {
        name: "Puppy 1",
        breed: "Golden Retriever",
        team: "Team A",
        imageURL: "https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/golden-retriever-dog-breed-info.jpeg",
    },
    {
        name: "Puppy 2",
        breed: "Labrador Retriever",
        team: "Team B",
        imageURL: "https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/labrador-retriever-dog-breed-info.jpeg",
    },
];

const rosterList = document.getElementById("roster-list");
const playerDetails = document.getElementById("player-details");

// Function to display the roster
function displayRoster() {
    rosterList.innerHTML = "";
    for (const player of initialPlayers) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="player-info">
                <h3>${player.name}</h3>
                <p>Breed: ${player.breed}</p>
                <p>Team: ${player.team}</p>
                <img src="${player.imageURL}" alt="${player.name}'s Image" class="player-image">
            </div>
            <div class="player-buttons">
                <button class="details-button">See Details</button>
                <button class="remove-button">Remove</button>
            </div>
        `;

        const detailsButton = listItem.querySelector(".details-button");
        detailsButton.addEventListener("click", () => showPlayerDetails(player, listItem));

        const removeButton = listItem.querySelector(".remove-button");
        removeButton.addEventListener("click", () => removePlayer(player, listItem));

        rosterList.appendChild(listItem);
    }
}

// Function to show player details
function showPlayerDetails(player, listItem) {
    playerDetails.innerHTML = `
        <h2>${player.name}</h2>
        <p>Breed: ${player.breed}</p>
        <p>Team: ${player.team}</p>
        <img src="${player.imageURL}" alt="${player.name}'s Image" id="player-image">
        <button id="back-to-list">Back to Main List</button>
    `;

    const playerImage = document.getElementById("player-image");

    const backToListButton = document.getElementById("back-to-list");
    backToListButton.addEventListener("click", () => {
        playerDetails.innerHTML = "";
        playerImage.style.display = "none";
    });

    // Show the image when "See Details" is clicked
    playerImage.style.display = "block";
    // Hide the image in the roster
    const playerImageInRoster = listItem.querySelector(".player-image");
    playerImageInRoster.style.display = "none";
}

// Function to remove a player
function removePlayer(player, listItem) {
    const playerIndex = initialPlayers.indexOf(player);
    if (playerIndex !== -1) {
        initialPlayers.splice(playerIndex, 1);
        rosterList.removeChild(listItem);
        playerDetails.innerHTML = "";
    }
}

const addPlayerButton = document.getElementById("add-player");
const playerNameInput = document.getElementById("player-name");
const playerBreedInput = document.getElementById("player-breed");

addPlayerButton.addEventListener("click", () => {
    const playerName = playerNameInput.value;
    const playerBreed = playerBreedInput.value;

    // Ensure that the name and breed are not empty before adding a player
    if (playerName.trim() !== "" && playerBreed.trim() !== "") {
        // Create a new player object and push it to the initialPlayers array
        const newPlayer = {
            name: playerName,
            breed: playerBreed,
            team: "unassigned",
            imageURL: "default-image.jpg", // You can specify the default image URL
        };
        initialPlayers.push(newPlayer);

        // Clear the input fields
        playerNameInput.value = "";
        playerBreedInput.value = "";

        // Update the roster to reflect the added player
        displayRoster();
    }
});

// Initialize the roster
displayRoster();
