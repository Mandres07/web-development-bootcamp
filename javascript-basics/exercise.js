let courseName = 'Learning React Course';
let coursePrice = 9.99;
let courseGoals = ['Start learning React', 'Build some React projects', 'Improve web developer skills'];

alert(courseName);
alert(coursePrice)
alert(courseGoals);

const course = {
   name: courseName,
   price: coursePrice,
   goals: courseGoals
};

alert(course.name);
alert(course.price);
alert(course.goals);

alert(course.goals[1]);

function getItem(array, index) {
   return array[index];
}

alert(getItem(courseGoals, 0));