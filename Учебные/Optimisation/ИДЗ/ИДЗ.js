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
    for (i = a; i < b; i = i + 0.01) {
        console.log("i", i, f(i));
        if (f(i) != f(i)) { //проверка isNaN 
            console.log("зашел")
            document.getElementById("result").innerHTML = "Эта функция не подходит для вычисления минимума этим методом";
            return;
        }
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
        console.log("m", m)
        for (i = a; i < b; i = i + 0.01) {
            console.log("diff", diff(fun, i));
            if (diff(fun, i) > m) {
                m = diff(fun, i)
            }
            if (Math.abs(diff(fun, i)) > 1000) {
                console.log("ООШИИИЮБББКААААААА")
                document.getElementById("result").innerHTML = "Эта функция не подходит для вычисления минимума этим методом";
                return undefined;
            }
        }

        return m + 0.1;

    }

    L = MaxL(f, a, b);
    if (L == undefined) {
        return;
    }
    console.log("L", L)


    function min() {
        console.log("Зашел в минимум")
        var t = [];
        var xMain = 1 / (2 * L) * (f(a) - f(b) + L * (a + b));
        
        var pMain = 1 / 2 * (f(a) + f(b) + L * (a - b));
        if(xMain<a||xMain>b||Object.is(NaN, xMain)) {
            xMain = (b - a)/2;
            pMain = f(xMain);
        }
        list.push([xMain, pMain])
        //console.log(xMain, pMain);
        while (true) {
            t = 0;
            for (i = 0; i < list.length; i++) {
                //console.log("i", i)
                console.log("Проходим по всем точкам, i, xMain, pMain ", i, list[i][0], list[i][1])
                if ((list[i][1]) < (list[t][1])) {
                    t = i;
                    //console.log("t", t);
                }
            }
            //console.log("Минимум после прохождения всех точек", t, list[t][0], list[t][1])


            while (true) {
                var k = 0;
                console.log("после поиска минимума t, x, p", t, list[t][0], list[t][1]);
                pMain = list[t][1];
                xMain = list[t][0];
                //console.log("list", i, t, list);
                var del = 1 / (2 * L) * (f(xMain) - pMain);
                var x1 = xMain - del;
                var x2 = xMain + del;
                p = 1 / 2 * (f(xMain) + pMain)
                if ((x1 < a || x1 > b ||Object.is(NaN, x1)) && (x2 < a || x2 > b||Object.is(NaN, x2))) {
                    list.splice(t, 1);
                } else if ((x1 < a || x1 > b||Object.is(NaN, x1)) && x2 > a && x2 < b) {
                    list.splice(t, 1, [x2, p]);
                } else if ((x2 < a || x2 > b||Object.is(NaN, x2)) && x1 > a && x1 < b) {
                    list.splice(t, 1, [x1, p]);
                } else {
                    list.splice(t, 1, [x1, p], [x2, p]);
                }
                console.log("x", x1, x2, p);

                for (i = 0; i < list.length; i++) {
                    if ((list[i][1]) === (pMain)) {
                        t = i;
                        k++;
                    }

                }
                console.log("k", k);
                if (k == 0) {
                    break;
                }
                if (Math.abs(2 * L * del) < eps) {
                    break;
                }

                console.log(Math.abs(2 * L * del), 2 * L * del, eps, 2 * L * del < eps);

            }
            if (Math.abs(2 * L * del) < eps) {
                break;
            }

        }
        console.log("вышел из while")
        document.getElementById("result").innerHTML = "Минимум в точке: " + " " + xMain;
        return [xMain, pMain];
    }
    console.log("list=", list);
    console.log("min=", min());

    var trace0 = {
        x: [],
        y: [],
        name: 'График функции',
        mode: 'lines+markers',
        type: 'scatter'
    };
    var trace1 = {
        x: [],
        y: [],
        name: 'Поиск минимума',
        mode: 'markers',
        type: 'scatter'
    };
    var trace2 = {
        x: [],
        y: [],
        name: 'Минимум',
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 10
        }
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
        title: 'График',
        colorway: ["#383838", "#DBAB00", "#CC0605"]
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}