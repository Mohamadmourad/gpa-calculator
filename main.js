document.getElementById('addCourse').addEventListener('click', () => {
let courseName = document.getElementById('courseName').value;
let grade = document.getElementById('grade').value;
if(courseName == '' || grade == ''){
    alert('Please fill out all the fields');
    return;
}
if(grade > 4 || grade < 0){
    alert('Please enter a valid grade between 0 and 4');
    return;
}

if(courseName in gpa){
    alert('Course already exists');
    return;
}

let item = document.createElement('div');
item.className = 'item';
item.classList.add('item');

document.getElementById('list').appendChild(item);


let textpart = document.createElement('div');
textpart.className = 'textpart';
item.appendChild(textpart);
let buttons = document.createElement('div');
buttons.className = 'buttons';
item.appendChild(buttons);

let course = document.createElement('p');
course.className = 'courseName';
course.innerText = courseName;
textpart.appendChild(course);

let gradePart = document.createElement('p');
gradePart.className = 'grade';
gradePart.innerText = grade;
textpart.appendChild(gradePart);

let letter = document.createElement('p');
letter.className = 'letter';
letter.innerText = letterCacl(grade);
textpart.appendChild(letter);

let deleteButton = document.createElement("button");
deleteButton.className = "deleteButton";
deleteButton.innerText = "Delete";
deleteButton.onclick = function() {
    item.remove();
    textpart.remove();
    deleteButton.remove();
    delete gpa[courseName];
    calculateGPA();
};

buttons.appendChild(deleteButton);

gpa[courseName]= grade;
calculateGPA();
});

let gpa = {};
function calculateGPA(){
    let total = 0;
    for (let key in gpa) {
        total += parseFloat(gpa[key]);
      }
      if(Object.keys(gpa).length == 0){
          document.getElementById('gpa').innerHTML = 0.00;
          return;
      }
    let GPA = total/Object.keys(gpa).length;
    document.getElementById('gpa').innerHTML = Math.floor(GPA * 100) / 100;
}

function letterCacl(grade){
if(grade == 4){
    return 'A';
}
else if(grade >= 3.5){
    return 'B+';
}
else if(grade >= 3.0){
    return 'B';
}
else if(grade >= 2.5){
    return 'C+';
}
else if(grade >= 2.0){
    return 'C';
}
else if(grade >= 1.5){
    return 'D+';
}
else if(grade >= 1.0){
    return 'D';
}
else{
    return 'F';
}
}