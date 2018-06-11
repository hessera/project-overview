/**
 * Model
 * Demo content
 */
var test = new Array();
test = [
    ['112233', '10.000'],
    ['223344', '20.000'],
    ['445566', '30.000'],
    ['556677', '40.000'],
    ['667788', '50.000']
];

/**
 * Controller
 */
function readData() {
    //var test =  JSON.parse(localStorage.getItem("name"));
    var div = document.getElementById('app');
    test.forEach(element => {
        div.innerHTML += 'Input 1: ' + element[0] + 'Input 2: ' + element[1] + '<br>';
    });
}

/**
 * Views
 */
function homeView(){
    action = 'home';
    console.log('home')
    var div = document.getElementById('app');
    div.innerHTML = 'Hello from ' + action;
}

function formView(){
    console.log('form');
    var div = document.getElementById('app');
    var newLine = document.createElement("br");
    
    //Add Angebotnummer label
    var labelId = document.createElement("label");
    labelId.for = "id";
    var labelIdContent = document.createTextNode("Input 1: ");
    labelId.appendChild(labelIdContent);
    div.appendChild(labelId);
    
    //Add Angebotnummer input
    var inputId = document.createElement("input");
    inputId.type = "text";
    inputId.name = "id";
    inputId.id = "id";
    div.appendChild(inputId);
    div.appendChild(newLine);

    //Add Summe label
    var labelSum = document.createElement("label");
    labelSum.for = "sum";
    var labelSumContent = document.createTextNode("Input 2: ");
    labelSum.appendChild(labelSumContent);
    div.appendChild(labelSum);
    
    //Add Summe input
    var inputSum = document.createElement("input");
    inputSum.type = "text";
    inputSum.name = "sum";
    inputSum.id = "sum";
    div.appendChild(inputSum);

    //Add submit
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    div.appendChild(inputSubmit);
}

function listView(){
    console.log('list');
    var div = document.getElementById('app');

    div.innerHTML = 'Hello from ' + action + '<br>';
    readData();
}

/**
 * URL handling
 */

var url_string = window.location.href;
var url = new URL(url_string);
var action = url.searchParams.get("action");
console.log(url_string);
console.log(url);
console.log(action);

if (action=='list'){
    listView();
} else if (action=='form'){
    formView();
} else {
    homeView();
}