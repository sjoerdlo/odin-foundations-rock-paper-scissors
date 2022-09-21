function getComputerChoice() {
    // Create a list of choices
    const choices = ['Rock', 'Paper', 'Scissors'];

    // Randomly select and return one of the choices
    let randomNumber = Math.floor(Math.random() * 300 / 100);

    return choices[randomNumber];
}

function playRound(playerChoice, computerChoice) {
    // If we don't get a player's choice, stop the round
    console.log(playerChoice);
    if (playerChoice === null) return;

    // convert the choices to lowercase for clean comparison
    let playerChoiceLowerCase = playerChoice.toLowerCase();
    let computerChoiceLowerCase = computerChoice.toLowerCase();

    // If choices are the same return null
    if (playerChoiceLowerCase === computerChoiceLowerCase) {
        return null;
    }

    // If player's choice wins return true otherwise return false
    switch (playerChoiceLowerCase) {
        case 'rock':
            return (computerChoiceLowerCase === 'paper') ? false : true; 
            break;

        case 'paper':
            return (computerChoiceLowerCase === 'scissors') ? false : true; 
            break;

        case 'scissors':
            return (computerChoiceLowerCase === 'rock') ? false : true; 
            break;
    }
}

function game() {
    let scorePlayer = 0;
    let scoreComputer = 0;

    // Run the game 5 times
    for (let i = 1; i <= 5; i++) {
        // Prompt the user
        let playerChoice = prompt(`Game ${i}: Make your choice! Rock, Paper or Scissors?`);
        
        // Get Computer choice
        let computerChoice = getComputerChoice(); 

        // Set result messages
        const playerChoiceString = `You chose ${playerChoice}.`;
        const computerChoiceString = `The computer chose ${computerChoice}.`;
        const winMessage = `${playerChoiceString}\n${computerChoiceString}\n\nYou Win! ${playerChoice} beats ${computerChoice}`;
        const looseMessage = `${playerChoiceString}\n${computerChoiceString}\n\nYou Lose! ${computerChoice} beats ${playerChoice}`;
        const drawMessage = `${playerChoiceString}\n${computerChoiceString}\n\nTwo times ${playerChoice}, it's a draw!`;

        // Play a round
        let playerWon = playRound(playerChoice, computerChoice);
        switch (playerWon) {
            case null:
                alert(drawMessage);
                break;

            case true:
                // We won! Keep score
                scorePlayer++;

                alert(winMessage);
                break;

            case false:
                // Computer won... Keep score
                scoreComputer++;

                alert(looseMessage);
                break;
        }
        alert(`The score is: Player ${scorePlayer} vs Computer ${scoreComputer}`);
    };

    alert(`The Final score is: Player ${scorePlayer} vs Computer ${scoreComputer}`);
}

game();
