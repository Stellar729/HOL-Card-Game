// Game state
let playerHealth = 100;
let aiHealth = 100;
let playerHand = [];
let aiHand = [];
let gameLog = [];

// Simple deck for testing
let deck = [
    {name: "John Holleran", type: "Creature", power: 3, health: 5},
    {name: "Gaslight Beam", type: "Spell", power: 0, health: 0},
    {name: "Elie's Big Mac", type: "Item", power: 0, health: 0},
    {name: "Airsoft Gun", type: "Item", power: 0, health: 0}
];

// Setup the game
function setupGame() {
    playerHand = [deck[0], deck[1], deck[2]];  // Test cards
    aiHand = [deck[1], deck[2], deck[3]];      // AI's cards

    document.getElementById('playerHealth').innerText = `Player Health: ${playerHealth}`;
    document.getElementById('aiHealth').innerText = `AI Health: ${aiHealth}`;
    updatePlayerHand();
}

// Update the player's hand display
function updatePlayerHand() {
    let handDiv = document.getElementById('playerHand');
    handDiv.innerHTML = ''; // Clear current hand
    playerHand.forEach((card, index) => {
        let cardButton = document.createElement('button');
        cardButton.innerText = `${card.name} (${card.type})`;
        cardButton.classList.add('button');
        cardButton.onclick = () => playCard(index);
        handDiv.appendChild(cardButton);
    });
}

// Play a card
function playCard(cardIndex) {
    let card = playerHand[cardIndex];
    gameLog.push(`Played: ${card.name}`);
    document.getElementById('gameLog').innerText = gameLog.join("\n");

    // Apply card effect (for now just simple attack)
    if (card.type === "Creature") {
        aiHealth -= card.power;  // Deal damage to AI
    } else if (card.type === "Spell") {
        // Simple spell effect (damage AI)
        aiHealth -= 5;
    }

    updateGameState();
}

// End the player's turn
function endTurn() {
    // AI's simple turn (AI attacks randomly)
    let randomCard = aiHand[Math.floor(Math.random() * aiHand.length)];
    if (randomCard.type === "Creature") {
        playerHealth -= randomCard.power;
    }
    gameLog.push(`AI played: ${randomCard.name}`);
    document.getElementById('gameLog').innerText = gameLog.join("\n");

    updateGameState();
}

// Update the health and game UI
function updateGameState() {
    document.getElementById('playerHealth').innerText = `Player Health: ${playerHealth}`;
    document.getElementById('aiHealth').innerText = `AI Health: ${aiHealth}`;
    if (playerHealth <= 0 || aiHealth <= 0) {
        gameLog.push(playerHealth <= 0 ? "AI wins!" : "Player wins!");
        document.getElementById('gameLog').innerText = gameLog.join("\n");
        document.getElementById('endTurnBtn').disabled = true;  // Disable end turn button
    }
}

// Event Listeners for buttons
document.getElementById('startGameBtn').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    setupGame();
});

document.getElementById('endTurnBtn').addEventListener('click', endTurn);

// Instructions and Exit button
document.getElementById('instructionsBtn').addEventListener('click', () => {
    alert("Game Instructions:\n\n1. Play creatures or spells from your hand.\n2. Attack the AI or its creatures.\n3. Reduce the opponent's health to 0 to win.");
});

document.getElementById('exitBtn').addEventListener('click', () => {
    window.close();  // Close the browser window
});
