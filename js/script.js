function getComputerChoice() {
    // Create the list of choices
    const choices = ['rock', 'paper', 'scissors'];

    // Randomly select one of the choices
    let randomNumber = Math.floor(Math.random() * 300 / 100);

    // Return the choice
    return choices[randomNumber];
}

function didPlayerWin() {
    // Get choices
    let playerChoice = document.querySelector('.finalChoice-player').getAttribute('data-choice');
    let computerChoice = document.querySelector('.finalChoice-computer').getAttribute('data-choice');

    // If choices are the same return null
    if (playerChoice === computerChoice) {
        return null;
    }

    // If player's choice wins return true otherwise return false
    switch (playerChoice) {
        case 'rock':
            return (computerChoice === 'paper') ? false : true; 

        case 'paper':
            return (computerChoice === 'scissors') ? false : true; 

        case 'scissors':
            return (computerChoice === 'rock') ? false : true; 
    }
}

function game() {
    const maxScore = 5;
    const playerChoiceButtons = document.querySelectorAll('.playerChoice');
    let gameHasStarted = 0;
    let scorePlayer = 0;
    let scoreComputer = 0;
    let playerChoice;
    let computerChoice;
    let playerWins;

    // Scale in fists
    const finalChoiceNodes = document.querySelectorAll('.finalChoice');
    finalChoiceNodes.forEach(finalChoiceNode => {
        finalChoiceNode.setAttribute('data-choice', 'rock');
    });

    // Let player choose
    playerChoiceButtons.forEach(playerChoiceButton => {
        playerChoiceButton.addEventListener('click', (e) => {
            // get Player's choice
            playerChoice = e.target.getAttribute('data-choice');
            // Get Computer's choice
            computerChoice = getComputerChoice();
            // Set Player's choice button to active
            e.target.classList.add('playerChoice-active');
            // Stop player choice buttons pulse
            playerChoiceButtons.forEach(playerChoiceButton => {
                playerChoiceButton.style.animation = 'none';
            });
            // Set a class to the final choices to signal that the player made a choice
            finalChoiceNodes.forEach(finalChoiceNode => {
                finalChoiceNode.classList.add('startRound');
                if (gameHasStarted) {
                    finalChoiceNodes.forEach(finalChoiceNode => {
                        finalChoiceNode.setAttribute('data-choice', 'rock');
                        finalChoiceNode.classList.add('shakeFists');
                    });
                }
            });
        });
    });

    // Play a round
    document.querySelector('.finalChoice-player').addEventListener('animationend', (event) => {
        // When Fists are scaled in
        if (event.animationName === 'scaleIn') {
            // Set a class to the final choices to signal that the fists are ready to shake
            finalChoiceNodes.forEach(finalChoiceNode => {
                finalChoiceNode.classList.add('shakeFists');
                gameHasStarted = 1;
            });
        }

        // When shaking fists animation ends, set final choices
        if (event.animationName === 'shakeFists-player') {
            document.querySelector('.finalChoice-player').setAttribute('data-choice', playerChoice);
            document.querySelector('.finalChoice-computer').setAttribute('data-choice', computerChoice);
            // Show winner
            playerWins = didPlayerWin();
            if (playerWins === null) {
                // It's a draw
            } else if (playerWins) {
                // Player won
                scorePlayer++;
                document.querySelector('.score-player > div').textContent = scorePlayer;
            } else {
                // Computer won
                scoreComputer++;
                document.querySelector('.score-computer > div').textContent = scoreComputer;
            }
            // Announce the winner and show New Game Button
            if (scorePlayer === maxScore || scoreComputer === maxScore) {
                document.querySelector('.newGame').style.display = 'block';
                document.querySelector('h1').classList.add('winner');
                if (scorePlayer === maxScore) {
                    document.querySelector('h1').classList.add('winner-player');
                    document.querySelector('h1').textContent = 'Player won the game!';
                } else if (scoreComputer === maxScore) {
                    document.querySelector('h1').classList.add('winner-computer');
                    document.querySelector('h1').textContent = 'Computer won the game!';
                }
            } else {
                // Reset classes to get ready for a new round
                playerChoiceButtons.forEach(playerChoiceButton => {
                    playerChoiceButton.classList.remove('playerChoice-active');
                });
                finalChoiceNodes.forEach(finalChoiceNode => {
                    finalChoiceNode.classList.remove('shakeFists', 'startRound');
                });
                // start player choice buttons pulse
                playerChoiceButtons.forEach(playerChoiceButton => {
                    playerChoiceButton.style.animation = 'pulse 2s infinite';
                });
            }
        }
    });

    // Start a new game
    document.querySelector('.newGame').addEventListener('click', (e) => {
        location.reload();
    });
    
}

game();