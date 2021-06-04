
module.exports= {
    coinCount
};
const li = [1,5,10,25,100];

function validDenomination(coin) {
    // int => bool
    return li.indexOf(coin) >= 0;

}

function valueFromCoinObject(obj) {
    const {denom, count} = obj;
    //console.log(validDenomination(denom));
    return validDenomination(denom) ? denom * count : 0;
}

function valueFromArray(arr) {
    const arrow = (value_one, value_two) => value_one + value_two;
    let total = 0;
    for (let i = 0; i < arr.length; i++){
        total = valueFromCoinObject(arr[i]);
        arr[i] = total;
        
    }
    return arr.reduce(arrow);
}

function coinCount(...coinage) {
    return valueFromArray(coinage);

}

//console.log(validDenomination(2));

//console.log(valueFromArray([{denom: 1, count:5},{denom: 5, count:5},{denom: 2, count:5}]))
/*console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));  // Extra credit*/