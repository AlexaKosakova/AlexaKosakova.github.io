function calculate() {

    var a = Number(document.getElementById("a").value);
    var b = Number(document.getElementById("b").value);
    var eps = Number(document.getElementById("eps").value);
    var list = [];



    var func = document.getElementById("func").value
        .replace(/\^/g, "**")
        .replace(/([A-Za-wyz][A-Za-z]*)/g, "Math.$1");
    console.log(a, b, func);

    function f(x) {
        return eval(func);
    }

    function diff(fun, a) {
        h = 0.01;
        epsilon = 0.000001;
        f1 = (fun(a + h) - fun(a)) / h;
        while (true) {
            h = h / 5;
            f2 = (fun(a + h) - fun(a)) / h;
            dif = Math.abs(f2 - f1);
            f1 = f2;
            if (dif < epsilon) {
                break;
            }
        }
        return f1;
    }

    function MaxL(fun, a, b) {
        m = diff(fun, a)
        for (i = a; i < b; i = i + 0.01) {
            if (diff(fun, i) > m) {
                m = diff(fun, i)
            }
            if (diff(fun, i) === NaN /*|| diff(fun, i) === Infinity*/ ) {
                console.log(Error) //Надо будет поменять!!!!!!!!!!!!!!!!!
            }
        }
        return m + 0.03;
    }

    L = MaxL(f, a, b)


    function min() {
        var xMain = 1 / (2 * L) * (f(a) - f(b) + L * (a + b));
        var pMain = 1 / 2 * (f(a) + f(b) + L * (a - b));
        list.push([xMain, pMain])
        //console.log(xMain, pMain);
        var t = 0;
        while (true) {
            t = 0;
            for (i = 0; i < list.length; i++) {
                //console.log("i", i)
                console.log("i, xMain, pMain ", i, list[i][0], list[i][1])
                if (Math.abs(list[i][1]) < Math.abs(list[t][1])) {
                    t = i;
                    //console.log("t", t);
                }
            }
            console.log("после поиска минимума ",t, list[t][0], list[t][1]);
            pMain = list[t][1];
            xMain = list[t][0];
            //console.log("list", i, t, list);
            var del = 1 / (2 * L) * (f(xMain) - pMain);
            var x1 = xMain - del;
            var x2 = xMain + del;
            p = 1 / 2 * (f(xMain) + pMain)
            //console.log("x", x1, x2, p);
            list.splice(t, 1, [x1, p], [x2, p]);
            //console.log(Math.abs(2 * L * del), 2 * L * del, eps, 2 * L * del < eps);
            if (Math.abs(2 * L * del) < eps) {
                break;
            }
        }
        console.log("xMain")
        return [xMain, pMain];
    }
    console.log("list=", list);
    console.log("min=", min());

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
        mode: 'markers',
        type: 'scatter'
    };
    
    for (let t = a; t < b; t = t + 0.01) {
        trace0.x.push(t);
        trace0.y.push(f(t));
    }
    for (let t = 0; t < list.length; t++) {
        trace1.x.push(list[t][0]);
        trace1.y.push(list[t][1]);
    }
    trace2.x.push(min()[0]);
    trace2.y.push(min()[1]);


    var data = [trace0, trace1, trace2];

    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}
