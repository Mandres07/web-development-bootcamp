let age = 30;
let userName = 'Mario Andres';
let hobbies = ['Sports', 'Workout', 'Music', 'Programming', 'Pets', 'Movies and Series'];
let job = {
   title: 'Software Developer',
   place: 'Panama',
   salary: 42000
};

let adultYears;

function calculateAdultYears(userAge) {
   return userAge - 18;
}

adultYears = calculateAdultYears(age);
console.log(adultYears);

let person = {
   name: 'Mario',
   greet() {
      console.log('hello');
   }
}

person.greet();