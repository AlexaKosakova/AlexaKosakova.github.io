function loadPage() {
    l = Math.PI / 2;
    n = 20;
    h = l / n;
    b = 1;
    t0 = new Array;

    for (j = 0; j < n; j++) {
        t0.push(j ** 2 * (l ** 2 / ((Math.PI ** 2) * b * 100)));
    }

    console.log(t0);

    function f(x) {
        if (0 <= x && x< l / 3) {
            return 3 * x / l;
        } else if (l / 3 < x < l) {
            return 1;
        }
    }

    function w(x) {
        return f(x) - x / l;
    }

    function w0(n0) {
        a = 0;
        for (i = 1; i < n; i++) {
            a += w(i * h) * Math.sin(Math.PI * n0 * (i * h) / l)
            //console.log('ai',i, a);
        }
        return 2 / n * a;
    }

    function u(x, t) {
        q = x / l;
        //console.log('q1', q);
        for (k = 1; k < n; k++) {
            //console.log('w0i',k, w0(k));
            //console.log('e',k, Math.exp(((-Math.PI*k/l)**2)*b*t));
            //console.log('bt',k, b*t);
            q += w0(k) * Math.exp(-((Math.PI * k / l) ** 2) * b * t) * Math.sin(Math.PI * k * x / l);
            //console.log('qi',k, q);
        }
        //console.log('q', q);
        return q;
    }


    ///////////////////////////////
    var trace1 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };

var trace = new Array;

    for (let j = 1; j < n; j++) {

        trace[j] = {
            x: [],
            y: [],
            mode: 'lines+markers',
            type: 'scatter'
        };
    }

    for (let t = 0; t < n; t++) {
        i = t * (l) / n;
        trace1.x.push(i);
        trace1.y.push(f(i));
    }

    for (let j = 1; j < n; j++) {

        for (let t = 0; t < n; t++) {
            i = t * (l) / n;
            trace[j].x.push(i);
            trace[j].y.push(u(i, t0[j]));

        }
    }

    var data = [trace1];
    for (let j = 1; j < n; j++) { 
        data.push(trace[j])
    }

    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}