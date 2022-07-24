function sum(event) {
   const userNumber = document.getElementById('user-number');
   const userValue = +userNumber.value;
   let result = 0;
   for (let i = 0; i <= userValue; i++) {
      result += i;
   }
   const resultP = document.getElementById('calculated-sum');
   resultP.textContent = result;
   resultP.style.display = 'block';
}

function highlightAnchors() {
   const anchorsArray = document.querySelectorAll('#highlight-links a');
   for (const anchor of anchorsArray) {
      anchor.classList.add('highlight');
   }
}

function displayUserData() {
   const ulElement = document.getElementById('output-user-data');
   ulElement.innerHTML = '';
   for (const key in dummyUserData) {
      const newUserDataItem = document.createElement('li');
      const outputText = `${key.toUpperCase()}: ${dummyUserData[key]}`;
      newUserDataItem.textContent = outputText;
      ulElement.append(newUserDataItem);
   }
}

function deriveNumberOfDiceRoll() {
   const userInput = document.getElementById('user-target-number');
   const ulElement = document.getElementById('dice-rolls');
   const totalRolls = document.getElementById('output-total-rolls');
   const targetNumber = document.getElementById('output-target-number');

   const enteredNumber = +userInput.value;

   if (enteredNumber > 6 || enteredNumber <= 0) {
      return alert('Invalid number, it should be between 0 and 6');
   }

   ulElement.innerHTML = '';


   let hasRolledTargetNumber = false;
   let rounds = 0;
   while (!hasRolledTargetNumber) {
      const rolledNumber = rollDice();
      rounds++;
      const newRollItem = document.createElement('li');
      const outputText = `Round ${rounds}: ${rolledNumber}`;
      newRollItem.textContent = outputText;
      ulElement.append(newRollItem);
      hasRolledTargetNumber = rolledNumber === enteredNumber;
   }
   totalRolls.textContent = rounds;
   targetNumber.textContent = enteredNumber;
}

function rollDice() {
   return Math.floor(Math.random() * 6) + 1;
}

const sumButton = document.querySelector('button');
sumButton.addEventListener('click', sum);

const highlightButton = document.getElementById('highlight-button');
highlightButton.addEventListener('click', highlightAnchors);

// Display user data
const dummyUserData = {
   firstName: 'Mario Andres',
   lastName: 'Morales',
   age: 30
};

const displayUserDataButton = document.querySelector('#user-data button');
displayUserDataButton.addEventListener('click', displayUserData);

const rollDiceButton = document.querySelector('#statistics button');
rollDiceButton.addEventListener('click', deriveNumberOfDiceRoll);