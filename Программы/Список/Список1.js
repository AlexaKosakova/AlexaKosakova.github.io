function loadPage() {
    function List() {
        var length = 0;
        var header = null;

        var Obj = function (element) {
            this.element = element;
            this.next = null;
        };


        this.END = function () {
            var current = header;
            while (current.next) {
                current = current.next;
            }
            return current.next;
        }


        this.ADD = function (element) {
            var obj = new Obj(element);
            if (header === null) {
                header = new Obj(NaN);

                header.next = obj;
            } else {
                var current = header.next;

                while (current.next) {
                    current = current.next;
                }

                current.next = obj;
            }
            length++;
        };


        this.INSERT = function (position, element) {
            var obj = new Obj(element);

            var current = header;
            var previous;
            var currentposition = 0;

            if (position > length + 1) {
                return false;
            } else {
                while (currentposition < position) {
                    previous = current;
                    current = current.next;
                    currentposition++;
                }
                obj.next = current;
                previous.next = obj;
            }
            length++;
        };


        this.LOCATE = function (element) {
            var current = header;
            var position = -1;

            while (current) {
                position++;
                if (current.element === element) {
                    return position;
                }
                current = current.next;
            }

            return -1;
        };


        this.RETRIEVE = function (position) {
            var current = header.next;
            var count = 1;
            while (count < position) {
                count++;
                current = current.next

            }
            return current.element;
        };


        this.DELETE = function (position) {
            var current = header;
            var previous;
            var currentposition = 0;
            if (position < 1 || position > length) {
                return null
            } else {
                while (currentposition < position) {
                    currentposition++;
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next
            }
            length--;
            return current.element;
        };


        this.MAKENULL = function () {

            n = length;
            for (i = 1; i <= n; i++) {
                this.DELETE(1);
            }
            header = null;
            length = 0;
            return 0;
        };


        this.PRINTLIST = function () {
            n = length;
            var L =[];
            for (i = 1; i <= n; i++) {
                console.log(this.RETRIEVE(i), i);
                L[i-1] = this.RETRIEVE(i);
            }
            l.innerHTML = L;
            return 0;
        };
    };

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    var list = new List();

    ss.addEventListener("click", function (event) {
        list.MAKENULL();
        for (i = 0; i < 10; i++) {
            list.ADD(randomInteger(0, 10));
        }
        list.PRINTLIST();
    });

    cl.addEventListener("click", function (event) {
        list.MAKENULL();
        list.PRINTLIST();
    });

    d.addEventListener("click", function (event) {
        list.DELETE(del.value);
        list.PRINTLIST();
    });

    inser.addEventListener("click", function (event) {
        list.INSERT(ins.value, el.value);
        list.PRINTLIST();
    });

}