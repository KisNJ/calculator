let operatorCount = -1;
let numberPressed = -1;
let firstCalc=true;

let finished=0;
let parts="";
let numpad = document.querySelectorAll(".num");
let currentCalc = document.querySelector("#current-calc");
let previousCalc = document.querySelector("#previous-calc");

let pageOperators = document.querySelectorAll(".operator");
//numpad=Array.from(numpad);

numpad.forEach((button) => {


    button.addEventListener("click", write)

});


pageOperators.forEach((operator) => {


    operator.addEventListener("click", operatorWrite)

});

let separator = "";
function write(e) {
    currentCalc.textContent += this.getAttribute("data-value");
    
    numberPressed++;
    console.log("number pressed " + numberPressed);
    //operatorCount++;
}

function operatorWrite(e) {
    let text = currentCalc.textContent.split("").join("");
    text = Array.from(text);
    console.log(text);
    if (numberPressed == -1&&firstCalc==true) {
        //console.log("vissza")
        return;
    }
    else {
        if (text[text.length - 1] == "+" || text[text.length - 1] == "-" || text[text.length - 1] == "*" || text[text.length - 1] == "/" || text[text.length - 1] == "." || text[text.length - 1] == "=") {
            currentCalc.textContent = text.splice(0, (text.length - 1)).join("");
            currentCalc.textContent += this.getAttribute("data-value");
            console.log("szia")
            separator = this.getAttribute("id");
            operatorCount++;
        }
        else if (operatorCount >= 0) {
            if(firstCalc==true){
                calculate(currentCalc.textContent);
            }
            else{
                console.log("fent: "+previousCalc.textContent);
                console.log("lent: "+currentCalc.textContent);
                
                let toFunction=previousCalc.textContent+currentCalc.textContent.substring(1);
                console.log("egybe: "+toFunction);
                separator = this.getAttribute("id");
                calculate(toFunction);
            }
            return;


        }
        else {
            currentCalc.textContent += this.getAttribute("data-value");
            operatorCount++;
            separator = this.getAttribute("id")
        }
    }

}
function calculate(string) {
    parts="";
    console.log("ez szep "+separator);
    switch (separator) {
        case "plus":
            console.log("öszeadok")

            parts = string.split("+");
            console.log("rászek: "+parts);
            console.log(parts);
            finished = parseFloat(parts[0]) + parseFloat(parts[1]);
            previousCalc.textContent = finished;
            clearCurrent();
            break;
        case "minus":
            console.log("kivonok")
            parts = string.split("-");
            console.log("részek: "+parts);
            if(firstCalc){
                finished = parseFloat(parts[0]) - parseFloat(parts[1]);
            }
            else{
                finished = (parseFloat(parts[0]) - parseFloat(parts[1]));
            }
            
            previousCalc.textContent = finished;
            clearCurrent();
            break;
        case "divide":
            parts = string.split("/");
            console.log(parts);
            if((parseFloat(parts[1])==0)){
                clearCurrent();
                return;
            }
            if(firstCalc){
                finished = (parseFloat(parts[0]) / parseFloat(parts[1]));
                previousCalc.textContent = finished.toFixed(3);
            }
            else{
                finished = (parseFloat(parts[0]) / parseFloat(parts[1]));
                previousCalc.textContent = finished.toFixed(3);
            }
            clearCurrent();
            break;
        
        case "multiply":
            parts = string.split("*");
            console.log(parts);
            if(firstCalc){
                finished = parseFloat(parts[0]) * parseFloat(parts[1]);
            }
            else{
                finished =parseFloat(parts[0]) * parseFloat(parts[1]);
            }
            
            previousCalc.textContent = finished;
            clearCurrent();
            break;
    }
    firstCalc=false;
    return finished;
}

function clearCurrent(){
    currentCalc.textContent=" ";
    operatorCount = -1;
    numberPressed = -1;
}
