var MAX_VALUE = 100;
var MIN_VALUE = 0;

function setup() {
    var inputs = [
        "max", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"
    ];
    for (var i = 0; i < inputs.length; i++) {
        inputs[i] = document.getElementById(inputs[i]);
        inputs[i].setAttribute("data-previous", inputs[i].value);
    }
    for (var i = 0; i < inputs.length; i++) {

        var previousInput = null;
        var nextInput = null;
        if(i != 0)
        {
            previousInput = inputs[i-1];      
        }
        if(i != inputs.length-1)
        {
            nextInput = inputs[i+1];
        }
        var functionChange = hold(inputs[i], previousInput, nextInput);

        inputs[i].addEventListener("change", functionChange);
    }

}


function myFunction() {
    document.getElementById("demo").innerHTML = "You pushed the button!";
}

function change(inputBox, maxValue, minValue) {
    var y = parseFloat(inputBox.value);

    if (isNaN(y)) {
        // return to current value
        inputBox.value = inputBox.getAttribute("data-previous");
        return;
    }
    y = Math.round(y*100)/100;
    if (y > minValue && y < maxValue) {
        inputBox.value = y.toFixed(2);
        inputBox.setAttribute("data-previous", y.toFixed(2));
    }
    else {
        //return to current value
        inputBox.value = inputBox.getAttribute("data-previous");
    }
}

function hold(input, previousInput, nextInput) {
    return function () {     
        var min = MIN_VALUE;
        if(nextInput != null){
            min = parseFloat(nextInput.value); 
        }
        var max = MAX_VALUE;
        if(previousInput != null){
            max = parseFloat(previousInput.value);
        }
        change(input, max, min);
    }
}
