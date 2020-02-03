function loadPage() {
    const z = Math.PI / 7;
    const n = 7;

    let x = Array( 0, 0.5 * z, 1.5 * z, 2.5 * z, 4.5 * z, 6.5 * z, 7 * z);
    let y = new Array;
    let a = new Array;
    let b = new Array;
    let c = new Array;
    let d = new Array;
    let h = new Array;
    let k = new Array;
    let l = new Array;
    let r = new Array;
    let s = new Array;





    function f(x) {
        return Math.sin(x) * x + 1;
    }

   for (i = 0; i<n; i++) {
        y.push(f(x[i]));
        
   }
    
    for (i=2; i<n; i++) {
        k[1]=0;
        l[1]=0; 
        h[i-1]=x[i-1]-x[i-2]; 
        h[i]=x[i]-x[i-1];
        s[i]=2*(h[i]+h[i-1]);
        r[i]=3*((y[i]-y[i-1])/h[i]-(y[i-1]-y[i-2])/h[i-1]);
        k[i]=(r[i]-h[i-1]*k[i-1])/(s[i]-h[i-1]*k[i-1]);
        l[i]=h[i]/(s[i]-h[i-1]*l[i-1]);
    } 
    for (i=n-2; i>0; i--) {
        c[n-1]=k[n-1];
        c[i]=k[i]-l[i]*c[i+1];
        console.log(i,n-1,k[n-1], c[n-1]);
    }
    for (i=1; i<n; i++) {
        h[i]=x[i]-x[i-1];
        a[i]=y[i-1];
        b[i]=(y[i]-y[i-1])/h[i]-h[i]*(2*c[i]+c[i+1])/3;
        d[i]=(c[i+1]-c[i])/3*h[i];
    }
    console.log('проверка', y[1], y[1], h[1], c[1], c[2]);
    console.log('k', k);
    console.log('l', l);
    console.log('h', h);
    console.log('s', s);
    console.log('r', r);
    console.log('x', x);
    console.log('y', y);
    console.log('a', a);
    console.log('b', b);
    console.log('c', c);
    console.log('d', d);
    
    function Spl (x0, i) {

        while (x0>x[i] && x0<x[i+1]) {
            return a[i] + b[i]*(x0-x[i])+c[i]*(x0-x[i])**2+d[i]*(x0-x[i])**3;
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
    for (let t = 0; t < 60; t++) {
        i = t * (Math.PI) / 60;
        trace1.x.push(i);
        trace1.y.push(f(i));
        trace2.x.push(i);
        trace2.y.push(Spl(i, 0));
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

    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}