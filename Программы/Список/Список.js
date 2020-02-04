function loadPage() {

    var ss = document.getElementById("ss"); //кнопка
    var cl = document.getElementById("cl"); //кнопка
    var del = document.getElementById("del");
    var d = document.getElementById("d"); //кнопка
    var ins = document.getElementById("ins");
    var el = document.getElementById("el");
    var inser = document.getElementById("inser"); //кнопка

    var line = [];

    function END(L) {
        return L.length;
    };

    function INSERT(obj, p, L) {
        if (p <= L.length) {
            L.splice(p, 0, obj);
        }
        /*for (let i = L.length - 1; i >= p; i--) {
            L[i + 1] = L[i];
        }
        if (p <= L.length) {
            L[p] = obj;
        }*/
    };

    function LOCATE(obj, L) {
        for (i = 0; i < L.length; i++) {
            if (L[i] == obj) {
                return i;
            }
            return END(L);
        }
    };


    function RETRIEVE(p, L) {
        return L[p];
    };

    function DELETE(p, L) {
        L.splice(p, 1);
    };

    function NEXT(p, L) {
        if (p == L.length - 1) {
            return END(L);
        }
        return L[p + 1];
    };

    function PREVIOUS(p, L) {
        return L[p - 1];
    };

    function MAKENULL(L) {
        L.splice(0, L.length);
        return END(L);
    };

    function FIRST(L) {
        if (L.length == 0) {
            return END(L);
        }
        return L[0];
    };

    function PRINTLIST(L) {
        list.innerHTML = L;
    }

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    ss.addEventListener("click", function (event) {
        MAKENULL(line);
        for (i = 0; i < 10; i++) {
            line[i] = randomInteger(0, 10);
        }
        PRINTLIST(line);
    });

    cl.addEventListener("click", function (event) {
        MAKENULL(line);
        PRINTLIST(line);
    });

    d.addEventListener("click", function (event) {
        DELETE(del.value, line);
        PRINTLIST(line);
    });

    inser.addEventListener("click", function (event) {
        INSERT(el.value, ins.value, line);
        PRINTLIST(line);
    });

}