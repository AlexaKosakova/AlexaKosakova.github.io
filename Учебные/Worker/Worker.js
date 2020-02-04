var interval;
var output;
var method;
var errorsCount = 0;
obj = {
    y_value: 0,
    t_value: 0,
    errors: null,
}

onmessage = function (e) {
    console.log('Message received from main script');
    console.log(e.data);
    var interv = e.data[1];
    asyncFunction().onSuccess(successCallback).onError(errorCallback);


    function successCallback() {
        errorsCount = 0;
        var start = e.data[2];
        var end = new Date;
        obj.t_value = (end - start) / 1000;
        obj.y_value = Math.random() * (1 + 1) - 1;
        obj.errors = null;
        var json = JSON.stringify(obj);
        console.log('success');
        console.log(json);
        postMessage(json);
        console.log('Posting message back to main script');
        if (e.data[3] === "1") {
            asyncFunction().onSuccess(successCallback).onError(errorCallback);
        }
    }

    function errorCallback(message) {
        errorsCount++;
        if (errorsCount < 4) {
            var start = e.data[2];
            var end = new Date;
            obj.t_value = (end - start) / 1000;
            obj.y_value = 0;
            obj.errors = message;
            var json = JSON.stringify(obj);
            console.log(json);
            console.log('error');
            postMessage(json);
            console.log('Posting message back to main script');
            if (e.data[3] === "1") {
                asyncFunction().onSuccess(successCallback).onError(errorCallback);
            }
        } else {
            postMessage("error");
        }
    };

    function asyncFunction(n) {
        const WAIT = 0;
        const SUCCESS = 1;
        const ERROR = 2;
        const errorCodes = {
            1: {
                "код": 418,
                "сообщение": "я — чайник"
            },
            2: {
                "код": 504,
                "сообщение": "шлюз не отвечает"
            },
            3: {
                "код": 408,
                "сообщение": "истекло время ожидания"
            },
            4: {
                "код": 407,
                "сообщение": "необходима аутентификация прокси"
            },
            5: {
                "код": 422,
                "сообщение": "необрабатываемый экземпляр"
            },
            6: {
                "код": 451,
                "сообщение": "недоступно по юридическим причинам"
            },
            7: {
                "код": 506,
                "сообщение": "вариант тоже проводит согласование"
            },
            8: {
                "код": 520,
                "сообщение": "неизвестная ошибка"
            },
            9: {
                "код": 509,
                "сообщение": "исчерпана пропускная ширина канала"
            },
            10: {
                "код": 203,
                "сообщение": "информация не авторитетна"
            }
        };

        var result = {
            status: WAIT,
            value: null,
            onSuccess: function (callback) {
                var timer = setInterval(function () {
                    if (result.status !== WAIT) {
                        if (result.status === SUCCESS) {
                            callback(result.value);
                        }
                        clearInterval(timer);
                    }
                }, 20);
                return this;
            },
            onError: function (callback) {
                var timer = setInterval(function () {
                    if (result.status !== WAIT) {
                        if (result.status === ERROR) {
                            callback(result.value);
                        }
                        clearInterval(timer);
                    }
                }, 20);
                return this;
            },
        };

        setTimeout(function () {
            if (Math.random() < 0.8) {
                result.status = SUCCESS;
            } else {
                var r = (Math.floor(Math.random() * (10)) + 1);
                result.value = errorCodes[r]["код"] + ": " + errorCodes[r]["сообщение"];
                result.status = ERROR;
            }
        }, interv);
        return result;
    }
}