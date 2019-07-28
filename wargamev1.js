 // war game by two1

//Card variables
let suits = ['Hearts' , 'Clubs' , 'Diamonds' , 'Spades'];
let values = [ 'Ace' , 'King' , 'Queen' , 'Jack' , 'Ten' , 'Nine' , 'Eight' , 'Seven' , 'Six' , 'Five' , 'Four' , 'Three' , 'Two' ];

//DOM variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    checkButton = document.getElementById('check-button'),
    results = document.getElementById('results-area'),
    nextRound = document.getElementById('next-round');
    
//Game variables
let gameStarted = false,    
    gameOver = false,
    playerWon = false,
    computerCards = [],
    playerCards = [],
    computerScore = 0,
    playerScore = 0,
    deck=[];
    deck = createDeck();
    shuffleDeck(deck);
    checkButton.style.display = 'none';
    results.style.display = 'none';
    nextRound.style.display = 'none';
    showStatus();



//NEW GAME
newGameButton.addEventListener('click', function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false; 

    dealCards();
    computerCards = [ getNextCard() ];  
    playerCards =  [ getPlayerCard() ];

    newGameButton.style.display = 'none';
    checkButton.style.display = 'inline';
    results.style.display = 'none';
    nextRound.style.display = 'none';
    showStatus();
});

//Check button clicked
checkButton.addEventListener('click', function() {
    gameStarted = true;
  
    whoWins(); //sprawdza kto wygrał albo czy remis

    newGameButton.style.display = 'none';
    checkButton.style.display = 'none';
    textArea.style.display = 'none';
    results.style.display = 'inline';
    nextRound.style.display = 'inline';
    
  });


//poczatek next round ?

nextRound.addEventListener('click', function(){
gameStarted = true;
computerCards = [ getNextCard() ];  
playerCards =  [ getPlayerCard() ];
newGameButton.style.display = 'none';
results.style.display = 'none';
nextRound.style.display = 'none';
textArea.style.display = 'inline';
checkButton.style.display = 'inline';
showStatus();
});


//Tworzenie decka kart z wektorów kolorów i wartości
 function createDeck() {
  let deck = [];
  for (let suitIdx=0; suitIdx < suits.length; suitIdx++) {
      for(let valueIdx = 0; valueIdx < values.length; valueIdx++) {
          let card = {
              suit: suits[suitIdx],
              value: values[valueIdx]
          };
      deck.push( card );
      }
  }
  return deck;
}


//Tasowanie kart deck'a
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
      let swapIdx = Math.trunc(Math.random() * deck.length);
      let tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp;
  }
}

//Rozdawanie potasowanych kart decka na 2 talie graczy (trzeba to przerzucić potem do computerCards i playerCards po jednej sztuce do wyświetlania)
  let kupa=0,
      computerDeck = [],
      playerDeck = [];

  function dealCards() {
    for (let u=0; u < deck.length;){

        computerDeck[kupa] = deck.shift();
        playerDeck[kupa] = deck.shift();
        kupa++;
    }
  }

  //WhoWins próba1 powiedzmy ze póki co zawsze ktoś wygrywa (else jeśli inaczej?)
  //można zrobić case
  //
  //SDAOSDOASJDOIPASJDOIASJDOIJSAODIJASOIDJASOIDJAOSIDJAOSIDJAOSI
  //TEAHDIASDHOASDHIUASDAISDHIASDHOASDHOASIDJOSAIDEJASOIE
  
  
  let tempDeck = []; //tymczasowy array dla 2 wygranych kart
 
  function whoWins() {
    
    if (computerScore > playerScore) {
      
      tempDeck.push(computerCards);
      tempDeck.push(playerCards);
      computerDeck.push(tempDeck);
      computerCards = [];
      playerCards = [];
      playerWon = false;
    
      showResults(); }

      else if (playerScore > computerScore ) {
      tempDeck.push(computerCards);
      tempDeck.push(playerCards);
      playerDeck.push(tempDeck);
      computerCards = [];
      playerCards = [];
      playerWon = true;
      showResults();
      }
      else { isDraw();
      }

      }
    

  
function isDraw() {
  computerCards = [ getNextCard() ];  
  playerCards =  [ getPlayerCard() ];
  tempDeck.push(computerCards);
  tempDeck.push(playerCards);
  computerCards = [];
  playerCards = [];
  computerCards = [ getNextCard() ];  
  playerCards =  [ getPlayerCard() ];
  updateScores();
  whoWins();
}

//Podaje pierwszą kartę z decka komputera  
  function getNextCard() {
    return computerDeck.shift();
}
 
//Podaje pierwszą kartę z decka playera  
function getPlayerCard() {
  return playerDeck.shift();
}

//Zwraca nazwę karty
function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

//Zwraca wartość karty - potrzebne do oszacowania wyniku wojny
function getCardNumericValue(card) {
    switch(card.value) {
      case 'Ace':
        return 14;
      case 'Two':
        return 2;
      case 'Three':
        return 3;
      case 'Four':
        return 4;
      case 'Five': 
        return 5;
      case 'Six':
        return 6;
      case 'Seven':
        return 7;
      case 'Eight':
        return 8;
      case 'Nine':
        return 9;
      case 'Ten' :
        return 10;
      case 'Jack':
        return 11;
      case 'Queen':
        return 12;
      case 'King':
        return 13;  

    }
  }

//TUTAJ JEST PRAWDOPODOBNIE BLAD - czym jest cardarray - nie dziala przez to program po wyczerpaniu decka. 
//albo brakuje funkcji ktora obsluguje koniec gry kiedy jest jeden pusty deck (bo sie konczy nie raz po 21 rozdaniach
function getScore(cardArray) {
    let score = 0;
    for (let i = 0; i < cardArray.length; i++) {
      let card = cardArray[i];
      score += getCardNumericValue(card);
    }
    return score;
  }

  function updateScores() {
    computerScore = getScore(computerCards);
    playerScore = getScore(playerCards);
  }

  /*
  function checkForEndOfGame() {
    
TEGO PROSZE NIE CZYTAĆ BO TO JST TYPOWO ROBOCZO COŚ POKLEJONE Z 5 POMYSŁÓW
OGARNĘ TO SOBIE JUTRO JAK ZROBIĆ endofgame handling

    updateScores();

    
    if (gameOver) {
      // draw ? tu trzeba dodać po dwie karty i wyrzucić poprzednie z arraya albo liczyć tylko ostatnią a wszystkie zrzucić do wygranego
      while(computerScore == playerScore ) {
        computerCards.push(getNextCard());
        playerCards.push(getNextCard());
        updateScores();
      }
    }
    
    if (playerScore > computerScore) {
      playerWon = true;
      gameOver = false; //sprecyzować co jest gameoverem
     }
    else if (computerScore > playerScore) {
      //stworzyć tymczasowy array dla 2 wygranych kart
      //przerzucić te karty przez function
      computerDeck.push(nowy array)
      computerCards.push(getNextCard());
      playerWon = false;
      gameOver = false; //to samo co wyżej
    }
    else if (gameOver) {
      
      if (playerScore > dealerScore) {
        playerWon = true;
      }
      else {
        playerWon = false;
      }
    }
  }
*/

  function showStatus() {
    if (!gameStarted) {
      textArea.innerText = 'Welcome to War Game!';
      return;
    }
    
    let computerCardString = ''; 
    for (let i=0; i < computerCards.length; i++) {
      computerCardString += getCardString(computerCards[i]) + '\n';
    }
    
    let playerCardString = '';
    for (let i=0; i < playerCards.length; i++) {
      playerCardString += getCardString(playerCards[i]) + '\n';
    }
    updateScores();
     
    textArea.innerText = 
      'Computer has:\n' +
      computerCardString + 
      '(score: '+ computerScore  + ')\n\n' +
      
      'Player has:\n' +
      playerCardString +
      '(score: '+ playerScore  + ')\n\n';

        
    }

    function showResults() {
      if (!playerWon) {
        results.innerText = "Computer win!";
        return;
      }
      else{
        results.innerText = "Player win!";
        return;
      }
    }
  
