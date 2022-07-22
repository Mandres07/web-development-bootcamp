let p = document.querySelector('p');
let input = document.querySelector('input');

function changeParagraphText() {
   p.textContent = 'Clicked!';
   console.log('Paragraph clicked!');
}

function inputChanged(event) {
   console.log(event.target.value);
}

p.addEventListener('click', changeParagraphText);
input.addEventListener('input', inputChanged);