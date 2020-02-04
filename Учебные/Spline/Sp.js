function loadPage() {
    const pi = Math.PI;
    var n = 7;
    const X = [
        0,
        0.5 * pi / 7,
        1.5 * pi / 7,
        2.5 * pi / 7,
        4.5 * pi / 7,
        6.5 * pi / 7,
        pi
    ];

    function Func(x) {
        return Math.sin(x) * Math.sqrt(x) + 1;
    }


    var a = [];
    var b = [];
    var c = [];
    var d = [];
    var h = [];

    var r = []; //кси
    var q = []; //эта

    var F = [];

    for (let i = 0; i <= n - 1; i++) {
        F.push(Func(X[i]));
    }

    a[0] = 0;
    a[n - 1] = 0;
    b[0] = 1;
    b[n - 1] = 1;
    c[0] = 0;
    c[n - 1] = 0;
    d[0] = 0;
    d[n - 1] = 0;


    for (let i = 0; i <= n - 2; i++) {
        h.push(X[i + 1] - X[i]);
    }

    for (let i = 1; i <= n - 2; i++) {
        a[i] = h[i - 1] / 6;
        b[i] = (h[i - 1] + h[i]) / 3;
        c[i] = h[i] / 6;
        d[i] = (F[i + 1] - F[i]) / h[i] - (F[i] - F[i - 1]) / h[i - 1];
    }


    r[0] = 0;
    q[0] = 0;

    for (let i = 1; i <= n - 2; i++) {
        r[i] = c[i] / (b[i] - r[i - 1] * a[i]);
    }

    for (let i = 1; i <= n - 1; i++) {
        q[i] = (a[i] * q[i - 1] - d[i]) / (b[i] - r[i - 1] * a[i]);
    }

    var m = new Array(7);

    m[0] = 0;
    m[n - 1] = q[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        m[i] = -(r[i] * m[i + 1] + q[i]);
    }

    var gFuncs = [];

    for (let i = 0; i <= n - 2; i++) {
        gFuncs.push(function (x) {
            let res = m[i] * (X[i + 1] - x) **3 / (6 * h[i]) +
                m[i + 1] * (x - X[i]) ** 3 / (6 * h[i]) +
                (F[i] - m[i] * h[i] * h[i] / 6) * (X[i + 1] - x) / h[i] +
                (F[i + 1] - m[i + 1] * h[i] * h[i] / 6) * (x - X[i]) / h[i];
            return res;
        });
    }

    function g(x) {
        for (let i = 0; i <= n - 2; i++) {
            if (x >= X[i] && x < X[i + 1]) return gFuncs[i](x);
            if (x === X[6]) return 1;
        }
    }

    ///////////////////////////////
    var trace1 = {
        x: [],
        y: [],
        mode: 'lines',
        type: 'scatter'
    };

    var trace2 = {
        x: [],
        y: [],
        mode: 'lines',
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
    var trace7 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };
    var trace8 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };

    /*
        for (let t = 0; t < 60; t++) {
            i = t * (Math.PI) / 60;
            trace3.x.push(i);
            trace3.y.push(Spl(i, 1));
        }
        for (let t = 0; t < 60; t++) {
            i = t * (Math.PI) / 60;
            trace4.x.push(i);
            trace4.y.push(Spl(i, 2));
        }
        for (let t = 0; t < 60; t++) {
            i = t * (Math.PI) / 60;
            trace5.x.push(i);
            trace5.y.push(Spl(i, 3));
        }
        for (let t = 0; t < 60; t++) {
            i = t * (z) / 50;
            trace6.x.push(i);
            trace6.y.push(Spl(i, 4));
        }
        for (let t = 0; t < 60; t++) {
            i = t * (z) / 50;
            trace7.x.push(i);
            trace7.y.push(Spl(i, 5));
        }
        for (let t = 0; t < 60; t++) {
            i = t * (z) / 50;
            trace8.x.push(i);
            trace8.y.push(Spl(i, 5));
        }
    */
    for (let t = 0; t < 300; t++) {
        i = t * (Math.PI) / 300;
        trace1.x.push(i);
        trace1.y.push(Func(i));
        trace2.x.push(i);
        trace2.y.push(g(i));
    }

    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}