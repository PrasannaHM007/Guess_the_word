document.addEventListener("DOMContentLoaded", function() {
    const categorySelection = document.getElementById("category-selection");
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-button");
    const categoryDropdown = document.getElementById("category");
    const wordDisplay = document.getElementById("word-display");
    const attemptsDisplay = document.getElementById("attempts-left");
    const messageDisplay = document.getElementById("message");
    const restartButton = document.getElementById("restart-button");
    const toggleThemeButton = document.getElementById("toggle-theme-button");
    const keyboard = document.getElementById("keyboard");

    let chosenCategory = null;
    let chosenWord = null;
    let guessedLetters = new Set();
    let attempts = 5;
    let darkTheme = false;

    // Event listener for the start button
    startButton.addEventListener("click", function() {
        chosenCategory = parseInt(categoryDropdown.value);
        if (chosenCategory) {
            categorySelection.style.display = "none";
            gameContainer.style.display = "block";
            startGame();
        } else {
            alert("Please select a category.");
        }
    });

    // Event listener for the toggle theme button
    toggleThemeButton.addEventListener("click", function() {
        toggleTheme();
    });

    // Function to toggle the theme
    function toggleTheme() {
        darkTheme = !darkTheme;
        document.body.classList.toggle("theme-dark", darkTheme);
    }

    // Function to start the game
    function startGame() {
        resetGame();
        chooseWord();
        updateWordDisplay();
        updateAttemptsDisplay();
        createKeyboard();
    }

    // Function to reset the game
    function resetGame() {
        guessedLetters.clear();
        attempts = 5;
        messageDisplay.textContent = "";
        restartButton.style.display = "none";
    }

    // Function to choose a word from the selected category
    function chooseWord() {
        const words = getWordsForCategory(chosenCategory);
        chosenWord = words[Math.floor(Math.random() * words.length)];
    }

    // Function to get words for the selected category
    function getWordsForCategory(category) {
        switch (category) {
            case 1:
                return ["tvs", "honda", "royalenfield", "bajaj", "harley", "yamaha", "ducati", "hero", "kawasaki", "ola", "ktm", "duke", "benelli", "bmw", "jawa", "mahindra", "vespa", "suzuki"];
            case 2:
                return ["tesla", "toyota", "ford", "honda", "bmw", "subaru", "hyundai", "audi", "jeep", "porsche", "dodge", "ferrari", "jaguar", "lamborghini", "bentley", "chevrolet", "mazda", "nissan", "bugatti", "lexus", "rollsroyce", "acura", "astonmartin", "kia", "mercedes", "volkswagen", "suzuki", "fiat", "mini"];
            case 3:
                return ["javascript", "python", "java", "php", "cobol"];
            case 4:
                return ["computer", "internet", "smartphone", "robot", "computing", "application", "software", "bandwidth", "cookies", "firewall", "cache", "modem", "bluetooth", "algorithm", "database", "browser", "digital", "ethernet"];
            default:
                return [];
        }
    }

    // Function to update the word display
    function updateWordDisplay() {
        let displayedWord = "";
        for (const letter of chosenWord) {
            if (guessedLetters.has(letter)) {
                displayedWord += letter + " ";
            } else {
                displayedWord += "_ ";
            }
        }
        wordDisplay.textContent = displayedWord;
    }

    // Function to update the attempts display
    function updateAttemptsDisplay() {
        attemptsDisplay.textContent = "Attempts left: " + attempts;
    }

    // Function to create the virtual keyboard
    function createKeyboard() {
        keyboard.innerHTML = "";
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        for (const letter of alphabet) {
            const button = document.createElement("button");
            button.textContent = letter.toUpperCase();
            button.classList.add("keyboard-button");
            button.addEventListener("click", function() {
                if (!guessedLetters.has(letter)) {
                    guessedLetters.add(letter);
                    if (!chosenWord.includes(letter
                        )) {
                            attempts--;
                        }
                        updateWordDisplay();
                        updateAttemptsDisplay();
                        checkGameStatus();
                    }
                });
                keyboard.appendChild(button);
            }
        }
    
        // Function to check the game status (win or lose)
        function checkGameStatus() {
            if (attempts === 0) {
                endGame("Game Over! The word was: " + chosenWord);
            } else if (guessedWord()) {
                endGame("Congratulations! You guessed the word!");
                createStars();
            }
        }
    
        function createStars() {
            const stars = document.getElementById('stars');
            for (let i = 0; i < 100; i++) { 
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = Math.random() * 100 + 'vw';
                star.style.animationDelay = Math.random() * 2 + 's';
                // Generate random HSL color
                const hue = Math.random() * 360;
                const saturation = '100%';
                const lightness = '50%';
                star.style.backgroundColor = `hsl(${hue}, ${saturation}, ${lightness})`;
                stars.appendChild(star);
            }
        }

        // Function to check if the word is guessed
        function guessedWord() {
            for (const letter of chosenWord) {
                if (!guessedLetters.has(letter)) {
                    return false;
                }
            }
            return true;
        }
    
        // Function to end the game
        function endGame(message) {
            messageDisplay.textContent = message;
            restartButton.style.display = "block";
        }
    
        let starAnimationId = null; // Variable to hold the animation ID
        
        // Function to start the star animation
        function startStarAnimation() {
            starAnimationId = setInterval(() => {
                // Code for falling stars animation
            }, 1000); // Adjust the interval as needed
        }
        
        // Function to stop the star animation
        function stopStarAnimation() {
            clearInterval(starAnimationId);
            // Remove existing stars
            const starsContainer = document.getElementById('stars');
            starsContainer.innerHTML = '';
        }
        
        // Event listener for the restart button
        restartButton.addEventListener("click", function() {
            categorySelection.style.display = "block";
            gameContainer.style.display = "none";
            stopStarAnimation(); // Stop the animation when restart button is clicked
        });
    });
        
    
