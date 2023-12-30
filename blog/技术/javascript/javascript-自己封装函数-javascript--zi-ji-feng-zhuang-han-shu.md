```javascript
let myMath = {
    PI: 3.1415926535,
    max: function () {
        let max = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
            arguments[i] > max ? max = arguments[i] : max;
        }
        return max;
    },
    min: function () {
        let min = arguments[0];
        for (let j = 1; j < arguments.length; j++) {
            if (arguments[j] < min) {
                min = arguments[j];
            }
        }
        return min;
    }
}

console.log(myMath.PI);
console.log(myMath.max(1, 5, 9));
console.log(myMath.min(9,5,1))
```