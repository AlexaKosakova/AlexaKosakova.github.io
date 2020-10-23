//list.innerHTML = L;


function loadPage() {
    var x1;
    var x2;
    var i;
    var e = 0.1;
    var t = [];
    var x1 = [];
    var x2 = [];
    grad0 = [];
    x1[0] = 0.5;
    x2[0] = 0;
    t[0] = 0.5;

    function f(y1, y2) {
        return ((y2+1)*(y2+1)+y1*y1)*(y1*y1+(y2-1)*(y2-1));
    }

    var grad = [
        function grad1(y1, y2) {
            return y1*y1+2*y1*(y1+(y2+1)*(y2+1))+(y2-1)*(y2-1);
        },
        function grad2(y1, y2) {
            return (y1+(y2+1)*(y2+1))*(2*y2-2)+(y1*y1+(y2-1)*(y2-1))*(2*y2+2);
        }
    ]
    list.innerHTML = grad[0](x1[0], x2[0]) + "," + grad[1](x1[0], x2[0]);
    i = 0;
    while (i < 10) {
        i++;
        t[i] = t[i - 1]/2;
        x1[i] = x1[i - 1] - t[i - 1] * grad[0](x1[i - 1], x2[i - 1]);
        x2[i] = x2[i - 1] - t[i - 1] * grad[1](x1[i - 1], x2[i - 1]);
        console.log(i, t[i - 1], x1[i], x2[i], f(x1[i], x2[i]), f(x1[i - 1], x2[i - 1]), Math.sqrt(Math.pow(grad[0](x1[i], x2[i]), 2) + Math.pow(grad[1](x1[i], x2[i]), 2)));
        if (f(x1[i], x2[i]) > f(x1[i - 1], x2[i - 1])) {
            t[i - 1] = t[i - 1] / 2;
            continue;
        };
        if (Math.sqrt(Math.pow(grad[0](x1[i], x2[i]), 2) + Math.pow(grad[1](x1[i], x2[i]), 2)) < e) {
            break;
        };

    }
    //list.innerHTML = grad[0](x1[i+1], x2[i+1]) + "," + grad[1](x1[i+1], x2[i+1]);


}