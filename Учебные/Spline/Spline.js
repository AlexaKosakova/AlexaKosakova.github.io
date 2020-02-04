function loadPage() {
    const h = Math.PI / 7;
    const n = 7;

    let xj = Array(0, 0.5 * h, 1.5 * h, 2.5 * h, 4.5 * h, 6.5 * h, 7 * h);
    let c = new Array;
    let k = new Array;
    k[1] = 0;
    c[1] = 0;
    for (i = 2; i < n; i++) {

        b = xj[i - 1] - xj[i - 2];
        a = xj[i] - xj[i - 1];
        r = 2 * (a + b) - b * c[i - 1];
        c[i] = a / r;
        k[i] = (3 * ((f(xj[i]) - f(xj[i - 1])) / a - (f(xj[i - 1]) - f(xj[i - 2])) / b) - b * k[i - 1]) / r;
        console.log(k);
    }

    c[n] = k[n]
    for (i = n - 1; i > 7; i--) {
        c[i] = k[i] - c[i] * c[i + 1];
    }
    console.log(c);

    function f(x) {
        return Math.sin(x) * x + 1;
    }







    function Spl(x) {
i = 0;
        while (x>=xj[i] && i!=n) {
 i++;
            a = f(xj[i - 1]);
            b = xj[i - 1];
            q = xj[i] - b;
            r = x - b;
            p = c[i];
            d = c[i + 1];
            console.log(i, a, b, q, r, p, d);
            b = (f(xj[i]) - a) / q - (d + 2 * p) * q / 3;
            d = (d - p) / q * r;
            //Считаем значения сплайна и его производных:}
            p1 = b + r * (2 * p + d);
            p2 = 2 * (p + d);
            p = a + r * (b + r * (p + d / 3));
            console.log(b, d, p1, p2, p);
            return p;
        }

    }



    ///////////////////////////////
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





    for (let t = 0; t < 60; t++) {
        i = t * (Math.PI) / 60;
        trace1.x.push(i);
        trace1.y.push(f(i));
        trace2.x.push(i);
        trace2.y.push(Spl(i));
        trace3.x.push(i);
        trace3.y.push(Spl(i, 1));
        trace4.x.push(i);
        trace4.y.push(Spl(i, 2));
        trace5.x.push(i);
        trace5.y.push(Spl(i, 3));
        trace6.x.push(i);
        trace6.y.push(Spl(i, 4));
        trace7.x.push(i);
        trace7.y.push(Spl(i, 5));
        trace8.x.push(i);
        trace8.y.push(Spl(i, 6));
    }

    var data = [trace1, trace2, trace3, trace4,trace5,trace6, trace7, trace8];
    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}