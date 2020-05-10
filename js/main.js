$(function() {
    const calculator = (function() {
        let input = $('.calculator__input');
        let numbers = $('.number');
        let operations = $('.operation');
        let methods = $('.method');
        let calculateBtn = $('#calculate');
        let clearBtn = $('#clear');
        let nums = [];
        let ops = [];
        let numsId = 0;
        let opsId = 0;
        let res = 0;

        function press() {
            numbers.on('click', function(event) {
                let inputVal = input.val() + event.target.value;
                input.val(inputVal);
                if (nums[numsId] === undefined) {
                    nums[numsId] = event.target.value;
                } else {
                    nums[numsId] += event.target.value;
                }
            });
            operations.on('click', function(event) {
                let inputVal = input.val() + event.target.value;
                input.val(inputVal);
                ops[opsId] = event.target.value;
                numsId++;
                opsId++;
            });
            methods.on('click', function(event) {
                let inputVal = input.val() + `${event.target.value}(${nums[numsId]})`;
                inputVal = inputVal.replace(nums[numsId], '');
                input.val(inputVal);
                ops[opsId] = event.target.value;
                opsId++;
            });
            calculateBtn.on('click', function() {
                calculate();
            });
            clearBtn.on('click', function() {
                clear();
            });
        }

        function calculate() {
            for (let i = 0; i < ops.length; i++) {
                if (ops[i] === '*') {
                    nums[i] *= nums[i + 1];
                    ops.splice(i, 1);
                    nums.splice(i + 1, 1);
                    i--;
                } else if (ops[i] === '/') {
                    nums[i] /= nums[i + 1];
                    ops.splice(i, 1);
                    nums.splice(i + 1, 1);
                    i--;
                } else if (ops[i] === '^') {
                    nums[i] = nums[i] ** nums[i + 1];
                    ops.splice(i, 1);
                    nums.splice(i + 1, 1);
                    i--;
                } else if (ops[i] === 'sin') {
                    nums[i] = Math.sin(nums[i]);
                    ops.splice(i, 1);
                    i--;
                } else if (ops[i] === 'cos') {
                    nums[i] = Math.cos(nums[i]);
                    ops.splice(i, 1);
                    i--;
                } else if (ops[i] === 'sqrt') {
                    nums[i] = Math.sqrt(nums[i]);
                    ops.splice(i, 1);
                    i--;
                }
            }
            for (let i = 0; i < ops.length; i++) {
                switch (ops[i]) {
                    case '+':
                        if (res === 0) {
                            res = +nums[i] + +nums[i + 1];
                        } else {
                            res += +nums[i + 1];
                        }
                        break;
                    case '-':
                        if (res === 0) {
                            res = +nums[i] - +nums[i + 1];
                        } else {
                            res -= +nums[i + 1];
                        }
                        break;
                }
            }
            input.val(res);
            numsId = 0;
            opsId = 0;
            nums.splice(0, nums.length);
            ops.splice(0, ops.length);
            nums[numsId] = res;
            res = 0;
        }

        function clear() {
            input.val('');
            numsId = 0;
            opsId = 0;
            res = 0;
            nums.splice(0, nums.length);
            ops.splice(0, ops.length);
        }

        return {
            init: function() {
                press();
            }
        }
    })();

    calculator.init();
});