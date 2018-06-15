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
    var test =  JSON.parse(localStorage.getItem("name"));
    var div = document.getElementById('app');
    test.forEach(element => {
        div.innerHTML += 'Input 1: ' + element[0] + 'Input 2: ' + element[1] + '<br>';
    });
}

//Write data to local storage
function writeData(data) {
    var dataTmp

    if (JSON.parse(localStorage.getItem("name"))) {
        dataTmp =  JSON.parse(localStorage.getItem("name"));
    } else {
        dataTmp = []
    }
    dataTmp.push(data);
    localStorage.setItem('name',JSON.stringify(dataTmp));
    console.log(JSON.parse(localStorage.getItem("name")));
}


function sumUpData() {
    var test =  JSON.parse(localStorage.getItem("name"));
    var sum = 0;
    var div = document.getElementById('app');
    test.forEach(element => {
        sum += Number(element[1][1]);  
    });
    div.innerHTML += 'Gesamtsumme ' + parseFloat(Math.round(sum * 100) / 100).toFixed(2) + '<br>';
    
}

//Add data to local browser storage
function validate() {
    var index, inputs, value;
    var valueTmp = [];
    inputs = document.getElementsByClassName('input');
    for (index = 0; index < inputs.length; ++index) {
        name = inputs[index].attributes["name"].value;
        value = inputs[index].value;
        if (value == '') {
            alert('Bitte füllen Sie alle benötigten Felder aus.')
            break;
        }
        valueTmp.push([name,value]);

    }
    writeData(valueTmp);
}

function navigation() {
    var div = document.getElementById('app');
    
    var home = document.createElement('a');
    var linkText = document.createTextNode("Home");
    home.appendChild(linkText);
    home.title = "Home";
    home.href = "?action=home";
    div.appendChild(home);

    var list = document.createElement('a');
    var linkText = document.createTextNode("List");
    list.appendChild(linkText);
    list.title = "List";
    list.href = "?action=list";
    div.appendChild(list);

    var form = document.createElement('a');
    var linkText = document.createTextNode("Form");
    form.appendChild(linkText);
    form.title = "Form";
    form.href = "?action=form";
    div.appendChild(form);

    var newLine = document.createElement('br');
    div.appendChild(newLine);
}


/**
 * Views
 */
function homeView(){

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
    inputId.className = "input";
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
    inputSum.className = "input";
    div.appendChild(inputSum);

    //Add Action input
    var inputAction = document.createElement("input");
    inputAction.type = "hidden";
    inputAction.name = "action";
    inputAction.id = "action";
    inputAction.value = "form"
    div.appendChild(inputAction);

    //Add submit
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    div.appendChild(inputSubmit);

    //Add form
    org_html = document.getElementById("app").innerHTML;
    new_html = "<form id='my-form'>" + org_html + "</form>";
    document.getElementById("app").innerHTML = new_html;
}

function listView(){
    readData();
    sumUpData();
}

//Load template file depending on action
function renderHTML(action='home'){
    var xhr= new XMLHttpRequest();
    xhr.open('GET', 'resources/template/'+action+'.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want
        document.getElementById('app').append(this.responseText);
    };
    xhr.send();
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
    navigation();
    listView();
    renderHTML(action);
} else if (action=='form'){
    navigation();
    formView();
    renderHTML(action);
} else {
    navigation();
    homeView();
    renderHTML();
}

//Interupt form submit and validate function
var ele = document.getElementById("my-form");
if(ele.addEventListener){
    ele.addEventListener("submit", validate, false);  //Modern browsers
}else if(ele.attachEvent){
    ele.attachEvent('onsubmit', validate);            //Old IE
}