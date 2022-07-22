const inputEl = document.getElementById('name');
const remainingCharsSpan = document.getElementById('remaining-chars');
const maxAllowedChars = inputEl.maxLength;

function setClasses(remainingLength) {
   // CHANGING THE STYLE PROPERTY
   // if (remainingLength <= 10) {
   //    remainingCharsSpan.style.color = 'rgb(211, 109, 26)';
   //    return;
   // }
   // remainingCharsSpan.style.color = 'rgb(105, 101, 75)';

   // SETTING AND REMOVING CSS CLASSES
   if (remainingLength <= 15) {
      // inputEl.className = 'warning'; // Overrides the entire class attribute
      inputEl.classList.add('warning');
      remainingCharsSpan.classList.add('warning');
      return;
   }
   inputEl.classList.remove('warning');
   remainingCharsSpan.classList.remove('warning');
}

function inputChanged(event) {
   const inputLength = event.target.value.length;
   const remainingLength = maxAllowedChars - inputLength;
   remainingCharsSpan.textContent = remainingLength;
   setClasses(remainingLength);
}

inputEl.addEventListener('input', inputChanged);