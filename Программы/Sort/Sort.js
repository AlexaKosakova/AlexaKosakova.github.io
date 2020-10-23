function loadPage() {
    var S = [];
    var stop = 0;

    function random(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    ss.addEventListener("click", function (event) {
        S.splice(0, S.length)
        for (i = 0; i < 10; i++) {
            S[i] = random(0, 10);
        }
        if (!set.innerHTML) {
            stop = 1;
        }
        set.innerHTML = S;
    });

    cl.addEventListener("click", function (event) {
        S = [];
        stop = 1;
        set.innerHTML = S;
    });

    sor.addEventListener("click", function (event) {
        if (document.getElementById("TypeOfSort").value == 1.1) {
            sort.bubleSort(S);
        }
        if (document.getElementById("TypeOfSort").value == 1.2) {
            sort.insertionSort(S);
        }
        if (document.getElementById("TypeOfSort").value == 1.3) {
            sort.selectionSort(S);
        }
        if (document.getElementById("TypeOfSort").value == 2) {
            sort.quickSort(S, 0, 9);
        }
        if (document.getElementById("TypeOfSort").value == 3) {}
    });


    var sort = {
        bubleSort: async function (array) {
            for (i = 0; i < array.length - 1; i++) {
                for (j = 0; j < array.length - 1 - i; j++) {
                    if (array[j + 1] < array[j]) {
                        var t = array[j + 1];
                        array[j + 1] = array[j];
                        array[j] = t;
                        console.log(array);
                        if (stop === 1) {
                            break;
                        }
                        set.innerHTML = array;
                        await new Promise(r => setTimeout(r, 3000))
                    }
                }
            }
        },

        insertionSort: async function (array) {
            for (i = 0; i < array.length; i++) {
                j = i;
                while (array[j] < array[j - 1]) {
                    [array[j - 1], array[j]] = [array[j], array[j - 1]];
                    j--;
                    console.log(array);
                    if (stop === 1) {
                        break;
                    }
                    set.innerHTML = array;
                    await new Promise(r => setTimeout(r, 2000));
                }
            }
        },

        selectionSort: async function (array) {
            for (i = 0; i < array.length; i++) {
                lowIndex = i;
                lowKey = array[i];
                for (j = i + 1; j < array.length; j++) {
                    if (array[j] < lowKey) {
                        lowKey = array[j];
                        lowIndex = j;
                    }

                }
                [array[i], array[lowIndex]] = [array[lowIndex], array[i]];
                console.log(array);
                if (stop === 1) {
                    break;
                }
                set.innerHTML = array;
                await new Promise(r => setTimeout(r, 2000));
            }
        },

        partition: function (array, left, right) {
            var pivot = array[Math.floor((right + left) / 2)], //middle element
                i = left, //left pointer
                j = right; //right pointer
            while (i <= j) {
                while (array[i] < pivot) {
                    i++;
                }
                while (array[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    i++;
                    j--;
                }
            }
            return i;
        },

        quickSort: async function (array, left, right) {
            var index;

            await new Promise(r => setTimeout(r, 3000))
            if (array.length > 1) {
                index = this.partition(array, left, right);
                set.innerHTML = array;
                console.log(array, index);
                if (stop === 1) {
                    break;
                }
                if (left < index - 1) {
                    quickSort(array, left, index - 1);
                    await new Promise(r => setTimeout(r, 3000))

                }
                if (index < right) {
                    quickSort(array, index, right);
                    await new Promise(r => setTimeout(r, 3000))
                }
            }

            return array;
        }

    }

    /*function sort(array, left, right) {
        if (document.getElementById("TypeOfSort").value == 1.1) {
            async function bubleSort(array) {
                for (i = 0; i < array.length - 1; i++) {
                    for (j = 0; j < array.length - 1 - i; j++) {
                        if (array[j + 1] < array[j]) {
                            var t = array[j + 1];
                            array[j + 1] = array[j];
                            array[j] = t;
                            console.log(array);
                            set.innerHTML = array;
                            await new Promise(r => setTimeout(r, 3000))
                        }
                    }
                }
            }

        };

        if (document.getElementById("TypeOfSort").value == 1.2) {
            async function insertionSort(array) {
                for (i = 0; i < array.length; i++) {
                    j = i;
                    while (array[j] < array[j - 1]) {
                        [array[j - 1], array[j]] = [array[j], array[j - 1]];
                        j--;
                        console.log(array);
                        set.innerHTML = array;
                        await new Promise(r => setTimeout(r, 2000));
                    }
                }
            }
        };

        if (document.getElementById("TypeOfSort").value == 1.3) {
            async function selectionSort(array) {
                for (i = 0; i < array.length; i++) {
                    lowIndex = i;
                    lowKey = array[i];
                    for (j = i + 1; j < array.length; j++) {
                        if (array[j] < lowKey) {
                            lowKey = array[j];
                            lowIndex = j;
                        }

                    }
                    [array[i], array[lowIndex]] = [array[lowIndex], array[i]];
                    console.log(array);
                    set.innerHTML = array;
                    await new Promise(r => setTimeout(r, 2000));
                }
            }
        };

        if (document.getElementById("TypeOfSort").value == 2) {
            function partition(array, left, right) {
                var pivot = array[Math.floor((right + left) / 2)], //middle element
                    i = left, //left pointer
                    j = right; //right pointer
                while (i <= j) {
                    while (array[i] < pivot) {
                        i++;
                    }
                    while (array[j] > pivot) {
                        j--;
                    }
                    if (i <= j) {
                        [array[i], array[j]] = [array[j], array[i]];
                        i++;
                        j--;
                    }
                }
                return i;
            }

            async function quickSort(array, left, right) {
                var index;

                await new Promise(r => setTimeout(r, 3000))
                if (array.length > 1) {
                    index = partition(array, left, right);
                    set.innerHTML = array;
                    console.log(array, index);
                    if (left < index - 1) {
                        quickSort(array, left, index - 1);
                        await new Promise(r => setTimeout(r, 3000))

                    }
                    if (index < right) {
                        quickSort(array, index, right);
                        await new Promise(r => setTimeout(r, 3000))
                    }
                }

                return array;
            }


        };

        if (document.getElementById("TypeOfSort").value == 3) {
            function pushdown(left, right) {
                r = left;
                while (r <= right >> 1) {
                    if (right == 2 * r) {
                        if (array[r] > array[2 * r]) {
                            [array[r], array[2 * r]] = [array[2 * r], array[r]];
                            r = right;
                        }
                    } else {
                        if (array[r] > array[2 * r] && array[2 * r] <= array[2 * r + 1]) {
                            [array[r], array[2 * r]] = [array[2 * r], array[r]];
                            r = 2 * r;
                        } else if (array[2 * r] > array[2 * r + 1] && array[2 * r + 1] < array[2 * r]) {
                            [array[r], array[2 * r + 1]] = [array[2 * r + 1], array[r]];
                            r = 2 * r + 1;
                        } else {
                            r = right;
                        }
                    }
                }
            }
            async function headSort(array) {
                for (i = array.length >> 1; i > 1; i--) {
                    pushdown(i, array.length);
                }
                for (i = array.length; i > 1; i--) {
                    [array[1], array[i]] = [array[i], array[1]];
                    pushdown(1, i - 1);
                }

            }

        }
    }*/


};