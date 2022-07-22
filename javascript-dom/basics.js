document.body.children[2].children[0].href = 'https://google.com';

let anchorElement = document.getElementById('external-link');
anchorElement.href = 'https://instagram.com';

let anotherAnchorElement = document.querySelector('p a');
anotherAnchorElement.href = 'https://wikipedia.com';


// ADD AN ELEMENT
// 1. Create the new element
let newAnchorEl = document.createElement('a');
newAnchorEl.href = 'https://google.com';
newAnchorEl.text = 'Click Here';

// 2. Get access to the parent element that should hold the new element
let firstP = document.querySelector('p');

// 3. Insert the new element into the parent element content
firstP.append(newAnchorEl);


// REMOVE ELEMENT
// 1. Select the element that should be removed
let firstH1El = document.querySelector('h1');

// 2. remove it
// this method does not work on older browsers
firstH1El.remove();

//For older browsers
// firstH1El.parentElement.removeChild(firstH1El);


// MOVE ELEMENTS - As the element already exist it only will be moved
firstP.parentElement.append(firstP);

//inneHTML
console.log(firstP.textContent);
console.log(firstP.innerHTML);
firstP.innerHTML = 'Hi! this is <strong>Important!</strong>';