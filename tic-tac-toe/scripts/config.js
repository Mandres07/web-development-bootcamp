function openPlayerConfig(event) {
   editedPlayer = +event.target.dataset.playerid;
   playerConfigOverlayElement.style.display = 'block';
   backdropElement.style.display = 'block';
}

function closePlayerConfig() {
   playerConfigOverlayElement.style.display = 'none';
   backdropElement.style.display = 'none';
   formElement.firstElementChild.classList.remove('error');
   errorsOutputElement.textContent = '';
   formElement.reset();
}

function savePlayerConfig(event) {
   event.preventDefault();
   const formData = new FormData(event.target); // -> instantiates an object based on the html form data
   const enteredPlayerName = formData.get('playername').trim(); // -> get the form input value from formData object
   if (!enteredPlayerName) {
      event.target.firstElementChild.classList.add('error');
      errorsOutputElement.textContent = 'Please enter a valid name';
      return;
   }
   const updatedPlayerDataElement = document.getElementById(`player-${editedPlayer}-data`);
   const playerNameElement = updatedPlayerDataElement.querySelector('h3');
   playerNameElement.textContent = enteredPlayerName;

   players[+editedPlayer - 1].name = enteredPlayerName;
   closePlayerConfig();
}