function power(base, exponent) {
    if (exponent == 0) {
        return 1
    } else {
        return base * power(base, exponent - 1);
    }
}


// start : 1
// repeatedly + 5  or  * 3
// given a number 'num', find a sequence of such addition and multiplication that produces 'num'
// e.g  'num' = 13 --> sequence : 1 * 3 + 5 + 5 = 13
// but number 15 cannot be produced at all
// 'num' = 15 --> sequence : 1 * ??????
// here's recursive solution
function findSolution(target) {
    function find(current, history) {   // current = current number,   history = string that show how to get the target.
        if (current == target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
            // find(6, "(1 + 5)")           return fc           find(11, "(1 + 5 + 5)")
            // current = 11,    history = "((1 + 5) + 5)" --> find(11, "((1 + 5) + 5)")
            // current = 16,    history = "(((1 + 5) + 5) + 5)" --> find(16, "((1 + 5) + 5) + 5)")    return null

            //     left expression                          right expression
            return find(current + 5, `(${history} + 5)`) ?? find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");  
}
  
// console.log(findSolution(13)); // target = 13

// find(1, "1")
//   find(6, "(1 + 5)")
//     find(11, "((1 + 5) + 5)")
//       find(16, "(((1 + 5) + 5) + 5)")
//         too big
//       find(33, "(((1 + 5) + 5) * 3)")
//         too big
//     find(18, "((1 + 5) * 3)")
//       too big
//   find(3, "(1 * 3)")
//     find(8, "((1 * 3) + 5)")
//       find(13, "(((1 * 3) + 5) + 5)")
//         found!


function findSolution(target) {
    function find(current, history) {
        if (current == target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
          
        }
    }
    return find(1, "1");
}
  
// console.log(findSolution(24));


function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs) {
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}
  
// printFarmInventory(7, 16, 3);



// 0 is even
// 1 is odd
// For any other number N, its evenness is the same as N-2.
// evennes of 4 = 4-2 = 2
// evennes of 5 = 5-2 = 3
// evennes of 21 = 21-2 = 19




// 2 * 2 * 2 * 2 * 2 * 1
// console.log(power(2, 5)) ;
