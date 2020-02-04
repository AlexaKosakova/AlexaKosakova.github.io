function loadPage() {
    const h1 = Math.PI / 10;
    const h2 = Math.PI / 20;
    a = 0;
    b = Math.PI;
    n = 1000;

    function fan(x) {
        return Math.sin(x);
    }

    function Int(f) {

        s = 0;
        d = (b - a) / n;
        xb = a;

        for (i = 0; i < n; i++) {
            xe = xb + d;
            xm = (xb + xe) / 2;
            s = s + d * Math.sin(xm);
            xb = xe;
        }
        return s;
    }

    console.log('Интеграл sin(x) = ', Int(fan));

    function Trap(f, h) {
        t = f(a) / 2 + f(b) / 2;
        min = a;
        max = b;
        while (min < max) {
            min += h
            t += f(min)
        }
        return h * t;
    }
    console.log('Интеграл по формуле трапеций (11 точек) sin(x) = ', Trap(fan, h1));
    console.log('Интеграл по формуле трапеций (21 точек) sin(x) = ', Trap(fan, h2));

    function Sim(f, h) {
        s = f(a) / 2 + f(b) / 2;
        min4 = a + h;
        min2 = a + 2 * h;
        max = b;

        while (min4 < max) {
            s += 4 * f(min4);
            min4 += 2 * h;
        }
        while (min2 < max) {
            s += 2 * f(min2);
            min2 += 2 * h;
        }
        return h / 3 * s;
    }
    console.log('Интеграл по формуле Симпсона (21 точек) sin(x) = ', Sim(fan, h2));

    function Ru() {
        return 4 / 3 * Trap(fan, h2) - 1 / 3 * Trap(fan, h1)
    }
    console.log('Интеграл по формуле Рунге sin(x) = ', Ru());
    console.log('Проверка ', Ru() - Sim(fan, h2));
    ///////////////////////////////
    var trace1 = {
        x: [],
        y: [],
        mode: 'lines+markers',
        type: 'scatter'
    };


    for (let t = 0; t < 50; t++) {
        i = t * (Math.PI) / 50;
        trace1.x.push(i);
        trace1.y.push(Math.sin(i));
    }

    var data = [trace1];
    var layout = {
        title: 'График'
    };

    Plotly.newPlot('myDiv', data, layout, {
        editable: true
    });
}