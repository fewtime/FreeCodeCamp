var entries = [];
var total = 0;
var inputNumber = "";

$(document).ready(function() {

    $("button").click(function() {
        var value = $(this).text();

        if (!isNaN(value) || value === ".") {
            inputNumber += value;
            display(inputNumber);
        } else if (value === "AC") {
            clearAll();
        } else if (value === "CE") {
            clearLastEntry();
        } else if (value === "+") {
            pushToEntries("+");
        } else if (value === "-") {
            pushToEntries("-");
        } else if (value === "X") {
            pushToEntries("*");
        } else if (value === "÷") {
            pushToEntries("/");
        } else if (value === "%") {
            pushToEntries("%");
        } else if (value === "=") {
            entries.push(inputNumber);
            total = parseFloat(entries[0]);
            for (var i = 1; i < entries.length; i += 2) {
                var sign = entries[i];
                var number = parseFloat(entries[i + 1]);
                switch (sign) {
                case "+": total += number; break;
                case "-": total -= number; break;
                case "*": total *= number; break;
                case "/": total /= number; break;
                case "%": total %= number; break;
                default: break;
                }
            }

            if (total < 0) {
                total = Math.abs(total) + "-";
            }

            display(total);

            clearValue();
        }
    });

    function pushToEntries(sign) {
        entries.push(inputNumber);
        entries.push(sign);
        inputNumber = "";
    }

    function clearLastEntry() {
        clearDisplay();
        inputNumber = "";
    }

    function clearAll() {
        clearDisplay();
        clearValue();
    }

    function clearValue() {
        entries = [];
        total = 0;
        inputNumber = "";
    }

    function display(str) {
        $(".display").val(str);
    }

    function clearDisplay() {
        $(".display").val("");
    }

});
