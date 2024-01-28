document.getElementById('addCourse').addEventListener('click', () => {
let courseName = document.getElementById('courseName').value;
let grade = document.getElementById('grade').value;
if(courseName == '' || grade == ''){
    alert('Please fill out all the fields');
    return;
}
if(grade > 100 || grade < 0){
    alert('Please enter a valid grade between 0 and 4');
    return;
}

if(courseName in gpa){
    alert('Course already exists');
    return;
}

grade = gradeConverter(grade);

divCreation(courseName,grade);

gpa[courseName]= grade;
calculateGPA();

localStorage.setItem("grades", JSON.stringify(gpa));
console.log(localStorage.getItem("grades"));
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

function gradeConverter(grade){
    if(grade <= 4){
     return grade;
    }
    else if(grade <= 100 && grade >= 90){
        return 4;
    }
    else if(grade <= 89 && grade >= 80){
       return 3 + grade % 10 / 10;
    }
    else if(grade <= 79 && grade >= 70){
        return 2 + grade % 10 / 10;
     }
     else if(grade <= 69 && grade >= 60){
        return 1 + grade % 10 / 10;
     }
    else{
        return 0;
    }
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

function divCreation(courseName,grade){
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
        localStorage.setItem("grades", JSON.stringify(gpa));
    };
    
    buttons.appendChild(deleteButton);
}

function putAll(){
    let grades = JSON.parse(localStorage.getItem("grades"));
    for (let key in grades) {
        divCreation(key,grades[key]);
      }
      gpa = grades;
      calculateGPA();
}

window.onload = function() {
    putAll();
  };