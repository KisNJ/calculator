let operatorCount = -1;
let numberPressed = -1;
let firstCalc = true;
let text="";
let finished = 0;
let parts = "";
let numpad = document.querySelectorAll(".num");
let currentCalc = document.querySelector("#current-calc");
let previousCalc = document.querySelector("#previous-calc");

let pageOperators = document.querySelectorAll(".operator");
const decimal=document.querySelector("#decimal");
decimal.addEventListener("click",displaydecimal);
function displaydecimal(e){
    if(currentCalc.textContent.includes(".")) return;
    else{currentCalc.textContent+=".";};
}
const clearButton=document.querySelector("#clear");
clearButton.addEventListener("click",clearBtn);
function clearBtn(e){
    previousCalc.textContent="";
    currentCalc.textContent = "";
    operatorCount = -1;
    numberPressed = -1;
    firstCalc=true;
    parts="";
    finished=0;
}
const deleteButton=document.querySelector("#delete");
deleteButton.addEventListener("click",deleteF)
function deleteF(){
    /*currentCalc.textContent=Array.from(currentCalc.textContent)//.pop());*/
    let arr=Array.from(currentCalc.textContent)
    if(arr.length>0){
        arr.pop();
    }
    else{
        return;
    }
    console.log((arr));
    currentCalc.textContent=arr.join("");
}
//numpad=Array.from(numpad);
const equalButton=document.querySelector("#equals");
equalButton.addEventListener('click',equalCalc);
function equalCalc(){
    if (firstCalc == true) {
        calculate(currentCalc.textContent);
    }
    else {
    let toFunction1 = previousCalc.textContent + currentCalc.textContent.substring(1);
    calculate(toFunction1);}
}

numpad.forEach((button) => {


    button.addEventListener("click", write)

});


pageOperators.forEach((operator) => {


    operator.addEventListener("click", operatorWrite(operator))

});

let separator = "";
function write(e) {
    currentCalc.textContent += this.getAttribute("data-value");
    
    numberPressed++;
    console.log("number pressed " + numberPressed);
    //operatorCount++;
}

function operatorWrite(e) {
    text = currentCalc.textContent.split("").join("");
    text = Array.from(text);
    console.log(text);
    if (numberPressed == -1 && firstCalc == true) {
        //console.log("vissza")
        console.log("menjél");
        return;
    }
    else {
        if (text[text.length - 1] == "+" || text[text.length - 1] == "-" || text[text.length - 1] == "*" || text[text.length - 1] == "/" ||  text[text.length - 1] == "=") {
            currentCalc.textContent = text.splice(0, (text.length - 1)).join("");
            currentCalc.textContent += e.getAttribute("data-value");//e helyett this volt
            console.log("szia")
            separator = e.getAttribute("id");
            operatorCount++;
        }
        else if (operatorCount >= 0) {
            if (firstCalc == true) {
                calculate(currentCalc.textContent);
            }
            else {
                console.log("fent: " + previousCalc.textContent);
                console.log("lent: " + currentCalc.textContent);
                separator = e.getAttribute("id");//e helyett this volt
                let toFunction = previousCalc.textContent + currentCalc.textContent.substring(1);
                console.log("egybe: " + toFunction);

                calculate(toFunction);
            }
            return;


        }
        else {
            
            currentCalc.textContent += e.getAttribute("data-value"); //e helyett this volt
            
            operatorCount++;
            separator = e.getAttribute("id");//e helyett this volt
        }
        console.log("menjél");
    }

}
function calculate(string) {
    parts = "";
    console.log("ez szep " + separator);
    if (string.includes("+")) {
        separator = "plus";
    }
    
    else if (string.includes("-")) { separator = "minus"; }
    else if (string.includes("/")) { separator = "divide"; }
    else if (string.includes("*")) { separator = "multiply"; }
    switch (separator) {
        case "plus":
            console.log("öszeadok")

            parts = string.split("+");
            console.log("rászek: " + parts);
            console.log(parts);
            finished = parseFloat(parts[0]) + parseFloat(parts[1]);


            previousCalc.textContent = finished;
            clearCurrent();
            break;


        case "minus":
            console.log("kivonok")
            parts = string.split("-");
            console.log("részek: " + parts);
            if (firstCalc) {
                finished = parseFloat(parts[0]) - parseFloat(parts[1]);
            }
            else {
                finished = (parseFloat(parts[0]) - parseFloat(parts[1]));
            }

            
                previousCalc.textContent = finished;
                clearCurrent();
                break;
            

        case "divide":
            parts = string.split("/");
            console.log(parts);
            if ((parseFloat(parts[1]) == 0)) {
                clearCurrent();
                return;
            }
            if (firstCalc) {
                finished = (parseFloat(parts[0]) / parseFloat(parts[1]));
                previousCalc.textContent = finished.toFixed(3);
            }
            else {
                finished = (parseFloat(parts[0]) / parseFloat(parts[1]));
                previousCalc.textContent = finished.toFixed(3);
            }
            
                //previousCalc.textContent = finished;
                clearCurrent();
                break;
            

        case "multiply":
            parts = string.split("*");
            console.log(parts);
            if (firstCalc) {
                finished = parseFloat(parts[0]) * parseFloat(parts[1]);
            }
            else {
                finished = parseFloat(parts[0]) * parseFloat(parts[1]);
            }
            
                previousCalc.textContent = finished;
                clearCurrent();
                break;
            
                default: 
                return;
    }
    
    firstCalc = false;
    return finished;
}

function clearCurrent() {
    currentCalc.textContent = " ";
    operatorCount = -1;
    numberPressed = -1;
}
window.addEventListener('keydown',keyPress)
function keyPress(e){
    console.log(e.key);

    if (e.key== "+" || e.key == "-" || e.key== "*" || e.key == "/") {
        console.log("kulcs it "+e.key)
        let goodBtn=document.querySelector(`button[data-value="${e.key}"]`)
        console.table("gfdg" +goodBtn);
        operatorWrite(goodBtn);
    }

    else if(e.key=="."){
            let hasoperator=false;
            if(currentCalc.textContent.includes("+")||currentCalc.textContent.includes("-")||currentCalc.textContent.includes("/")||currentCalc.textContent.includes("*")) {
                hasoperator=true;}
            if(currentCalc.textContent.includes(".")&&(!hasoperator)) return;
            else{currentCalc.textContent+=".";};

    }
    else if(e.key=="Enter"){
        equalCalc();
    }
    else if(e.key=="Backspace"){
        deleteF();
    }
    else{
        kbwrite(e.key);
    }
    
}

function kbwrite(e){
        if(!isNaN(e)) {
            currentCalc.textContent += e.toString();
            numberPressed++;}
        else return;
};
