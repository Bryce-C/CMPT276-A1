var MAX_VALUE = 100.00001;
var MIN_VALUE = 0;
var MAX_HIST_WIDTH = 135;
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01,65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01, 50, 50, 50, 50, 50, 50, 50, 50, 50];
var SCALE_ADJUST = 1;

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
        var onSuccess = function(){
            drawHist(inputs, function(){

            });
        }
        drawHist(inputs);
        var functionChange = hold(inputs[i], previousInput, nextInput, onSuccess);

        inputs[i].addEventListener("change", functionChange);
    }

}

function change(inputBox, maxValue, minValue, onSuccess) {
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
        onSuccess();
    }
    else {
        //return to current value
        inputBox.value = inputBox.getAttribute("data-previous");
    }
}

function hold(input, previousInput, nextInput, onSuccess) {
    return function () {     
        var min = MIN_VALUE;
        if(nextInput != null){
            min = parseFloat(nextInput.value); 
        }
        var max = MAX_VALUE;
        if(previousInput != null){
            max = parseFloat(previousInput.value);
        }
        change(input, max, min, onSuccess);
    }
}

//Max width 190px
function drawHist(inputs) {
    var studentsInBuckets =  [0,0,0,0,0,0,0,0,0,0,0];
    var percentageInBucket = [0,0,0,0,0,0,0,0,0,0,0];
    var totalStudents = 0;

    for (var counter = 0; counter < grades.length; counter++){
            if (grades[counter] <= inputs[0].value && grades[counter] >= inputs[1].value)
                {
                    studentsInBuckets[0]++;
                    totalStudents++;
                }
                else if (grades[counter] < inputs[1].value && grades[counter] >= inputs[2].value)
                    {
                        studentsInBuckets[1]++;
                        totalStudents++;
                    }
                    else if (grades[counter] < inputs[2].value && grades[counter] >= inputs[3].value)
                        {
                            studentsInBuckets[2]++;
                            totalStudents++;
                        }
                        else if (grades[counter] < inputs[3].value && grades[counter] >= inputs[4].value)
                            {
                                studentsInBuckets[3]++;
                                totalStudents++;
                            }
                            else if (grades[counter] < inputs[4].value && grades[counter] >= inputs[5].value)
                                {
                                    studentsInBuckets[4]++;
                                    totalStudents++;
                                }
                                else if (grades[counter] < inputs[5].value && grades[counter] >= inputs[6].value)
                                    {
                                        studentsInBuckets[5]++;
                                        totalStudents++;
                                    }
                                    else if (grades[counter] < inputs[6].value && grades[counter] >= inputs[7].value)
                                        {
                                            studentsInBuckets[6]++;
                                            totalStudents++;
                                        }
                                        else if (grades[counter] < inputs[7].value && grades[counter] >= inputs[8].value)
                                            {
                                                studentsInBuckets[7]++;
                                                totalStudents++;
                                            }
                                            else if (grades[counter] < inputs[8].value && grades[counter] >= inputs[9].value)
                                                {
                                                    studentsInBuckets[8]++;
                                                    totalStudents++;
                                                }
                                                else if (grades[counter] < inputs[9].value && grades[counter] >= inputs[10].value)
                                                {
                                                    studentsInBuckets[9]++;
                                                    totalStudents++;
                                                }
                                                    else if (grades[counter] < inputs[10].value && grades[counter] >= inputs[11].value)
                                                    {
                                                    studentsInBuckets[10]++;
                                                    totalStudents++;
                                                    }
    }

    var max = studentsInBuckets.reduce(function(a,b){
        return Math.max(a,b);
    });
    if (max > totalStudents/2 )
        {
            if (max > totalStudents/1.5){
                    SCALE_ADJUST = 1
                }
            else{
                SCALE_ADJUST = 1.5;
            }
        }
        else{
            SCALE_ADJUST = 2;
        }

    for (var counter2 = 0; counter2 < percentageInBucket.length; counter2++){
        percentageInBucket[counter2] = studentsInBuckets[counter2]/totalStudents*SCALE_ADJUST*MAX_HIST_WIDTH;
            }
        
    
    document.getElementById("histA+").style.width = percentageInBucket[0]+"px";
    document.getElementById("histA+Num").innerHTML = studentsInBuckets[0];;

    document.getElementById("histA").style.width = percentageInBucket[1]+"px";
    document.getElementById("histANum").innerHTML = studentsInBuckets[1];

    document.getElementById("histA-").style.width = percentageInBucket[2]+"px";
    document.getElementById("histA-Num").innerHTML = studentsInBuckets[2];

    document.getElementById("histB+").style.width = percentageInBucket[3]+"px";
    document.getElementById("histB+Num").innerHTML = studentsInBuckets[3];

    document.getElementById("histB").style.width = percentageInBucket[4]+"px";
    document.getElementById("histBNum").innerHTML = studentsInBuckets[4];

    document.getElementById("histB-").style.width = percentageInBucket[5]+"px";
    document.getElementById("histB-Num").innerHTML = studentsInBuckets[5];

    document.getElementById("histC+").style.width = percentageInBucket[6]+"px";
    document.getElementById("histC+Num").innerHTML = studentsInBuckets[6];

    document.getElementById("histC").style.width = percentageInBucket[7]+"px";
    document.getElementById("histCNum").innerHTML = studentsInBuckets[7];

    document.getElementById("histC-").style.width = percentageInBucket[8]+"px";
    document.getElementById("histC-Num").innerHTML = studentsInBuckets[8];

    document.getElementById("histD").style.width = percentageInBucket[9]+"px";
    document.getElementById("histDNum").innerHTML = studentsInBuckets[9];
    
    document.getElementById("histF").style.width = percentageInBucket[10]+"px";
    document.getElementById("histFNum").innerHTML = studentsInBuckets[10];
    
}
