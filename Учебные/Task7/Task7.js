n = 10;
x = [];
y = [];
a = [];
b = [];
c = [];
d = [];
b_ = [];
d_ = [];
h = 1 / n;

a[0] = 0;
b[0] = -1;
c[0] = 1;
d[0] = h * h / 2; // = 0
a[n - 1] = 0;
b[n - 1] = 1;
c[n - 1] = 0;
d[n - 1] = 1;
b_[0] = b[0];
d_[0] = d[0];

x[n - 1] = 1;
y[n - 1] = 1;

for (j = n - 1; j >= 0; j--) {
    x[j - 1] = x[j] - h;
}

for (j = 1; j < n - 1; j++) {
    a[j] = 2 - h;
    b[j] = -4;
    c[j] = 2 + h;
    d[j] = 2 * h * h;
}

for (i = 1; i < n; i++) {
    b_[i] = b[i] - a[i] * c[i - 1] / b_[i - 1];
    d_[i] = d[i] - a[i] * d_[i - 1] / b_[i - 1];
}


function f(x) {
    return x + Math.exp(-x) - Math.exp(-1);
};


function P() {
    console.log(n)
    for (i = n - 2; i >= 0; i--) {
        y[i] = (d_[i] - c[i] * y[i + 1]) / b_[i];
    }
    return y;
}

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


    for (let t = 0; t < n; t++) {
        trace0.x.push(x[t]);
        trace0.y.push(f(x[t]));
        trace1.x.push(x[t]);
        trace1.y.push(P()[t]);
    }

    var data = [trace0, trace1];
    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}