var interval;
var output;
var method;
var dots;
var myWorker = null;


function loadPage() {
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");
    interval = document.getElementById("interval");
    dots = document.getElementById("dots");
    output = document.getElementById("output");
    method = document.getElementById("method");
    start.addEventListener("click", function (event) {
        document.getElementById("method").disabled = true;
        var trace1 = {
            t: [],
            y: [],
            type: 'scatter',
        };
        var trace2 = {
            t: [],
            y: [],
            type: 'scatter'
        };
        // trace1.t = [];
        // trace1.y = [];
        // trace2.t = [];
        // trace2.y = [];
        if (myWorker === null && ckeck()) {
            myWorker = new Worker("Worker.js");
            var start = new Date;
            myWorker.onmessage = function (e) {
                if (e.data === "error") {
                    myWorker.terminate();
                    myWorker = null;
                    document.getElementById("method").disabled = false;
                }
                console.log('Message received from worker script');
                var values = JSON.parse(e.data);
                console.log(values);
                trace1.t.push(values.t_value);
                trace1.y.push(Math.sin(values.t_value));
                trace2.t.push(values.t_value);
                trace2.y.push(values.y_value);
                if (trace1.t.length > dots.value) {
                    trace1.t.shift();
                    trace1.y.shift();
                    trace2.t.shift();
                    trace2.y.shift();
                }
                output.innerHTML = values.errors;
                var graph = [trace1, trace2];
                Plotly.newPlot('myDiv', graph, {}, {
                    showSendToCloud: true
                });
                if (method.value === "2") {
                    myWorker.postMessage(['next', interval.value, start, method.value]);
                    console.log('Message 2 posted to myWorker');
                }
            }
            if (method.value === "1") {
                console.log('зашел1');
                myWorker.postMessage(['start', interval.value, start, method.value]);
                console.log('Message 1 posted to myWorker');
            }
            if (method.value === "2") {
                console.log('зашел2');
                myWorker.postMessage(['next', interval.value, start, method.value]);
                console.log('Message 2 posted to myWorker');
            }
        }
    });
    stop.addEventListener("click", function (event) {
        myWorker.terminate();
        myWorker = null;
        document.getElementById("method").disabled = false;
    });
}

function ckeck() {
    document.getElementById("method").disabled = false;
    console.log(interval.value);
    interval.style.backgroundColor = "";
    dots.style.backgroundColor = "";
    if (interval.value < 100 || interval.value > 800 || interval.value % 50 !== 0 ) {
        interval.style.backgroundColor = "red";
        output.innerHTML = "Введите число удовлетворяющее условию";
        return false;
    }
   if (dots.value / 1 <= 1 || isNaN(+dots.value.replace(",", "."))) {
        dots.style.backgroundColor = "red";
        output.innerHTML = "Введите правильное число точек";
        return false;
    }
    
    if (isNaN(+interval.value.replace(",", "."))) {
        interval.style.backgroundColor = "red";
        output.innerHTML = "Введите число";
        console.log('не правильно');
        return false;
    }
    return true;
}