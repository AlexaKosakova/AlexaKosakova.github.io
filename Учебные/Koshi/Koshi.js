n = 10;
x = [];
y = [];
y_ = [];
h = [];
k1 = [];
k2 = [];
k3 = [];
k4 = [];
x[n - 1] = 1;
h = x[n - 1] / n;
x[0] = 0;
y_[0] = NaN;
y[0] = -2;
for (j = 0; j < n - 1; j++) {
    x[j + 1] = x[j] + h;
}

function f(x, y) {
    return (3 * x * x / (x * x * x + y + 1));
};

function f1(x) {
    return -x * x * x - 2;
};

function E() {
    for (j = 0; j < n - 1; j++) {
        y[j + 1] = y[j] + f(x[j + 1], y[j]) * h;
    }
    return y;
};

function PK() {
    for (j = 0; j < n - 1; j++) {
        y_[j + 1] = y[j] + f(x[j], y[j]);
        y[j + 1] = y[j] + (f(x[j], y[j]) + f(x[j + 1], y_[j + 1])) * h / 2;
    }
    return y;
};

function R_K() {
    for (j = 0; j < n - 1; j++) {
        k1[j] = h * f(x[j], y[j]);
        k2[j] = h * f(x[j] + h / 2, y[j] + k1[j] / 2);
        k3[j] = h * f(x[j] + h / 2, y[j] + k2[j] / 2);
        k4[j] = h * f(x[j] + h, y[j] + k3[j]);
        y[j + 1] = y[j] + 1 / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]);
    }
    return y;
};


function loadPage() {
    var trace0 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };

    var trace1 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };

    var trace2 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };
    var trace3 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };
    var trace4 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };
    var trace5 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };
    var trace6 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };





    for (let t = 0; t < n; t++) {
        i = t * h;
        trace0.x.push(i);
        trace0.y.push(f1(x[t]));
        trace1.x.push(i);
        trace1.y.push(E()[t]);
        trace2.x.push(i);
        trace2.y.push(PK()[t]);
        trace3.x.push(i);
        trace3.y.push(R_K()[t]);

    }

    var data = [trace0, trace1, trace2, trace3, trace5, trace6];
    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}