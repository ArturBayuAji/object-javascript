/* 
using regular expression to process a phone number with certain format is
problematic. consider these phone number format (E.164) :
1. begin with + (plus sign)
2. followed by country codes (1-3 digits)
3. followed by the rest of the digits (assuming area code and local number is included here)
5. the first digit 
4. the maximum length is 15 digits (country code + rest of the digits)

+[country code][rest of the digits]

variation of user input :
1 2345678           invalid v
+ 1 2345678         valid
+ 123 45678         valid
+ 12345678          invalid v
+ 1234 5678         invalid v
+1 2345678          valid
+1 234 5678         valid
+1234 5678          invalid v
+1 2 3 45 67 8      valid
+1 2 3 4 5 6 7 8    valid
+1 234567890123456  invalid v

program goals :
for all of those variation, the program should be able to validate the phone number, even
if it fails, the program at least should inform the user about the problem.
*/

// allowing for user input
const prompt = require('prompt-sync') ();

function validatePhoneNum(phoneNum) {
    
    let numSplitted = phoneNum.split(" ");
    let countryCode = numSplitted[0];
    
    // preventing : 1 2345678
    if (!countryCode.includes("+")) {
        console.log("Plase provide a plus (+) sign for the country code");
        return null;
    }
    
    // preventing : +1234 5678
    if (countryCode.length > 4) {
        console.log("Maximum number of digits of the country code is 3");
        return null;
    }
    
    /* 
    if space is given after the plus (+) sign, at least the length of 
    numSplitted is 3 or more : [[+], [1], [2345]] 
    because numSplitted[1] will be assumed a country code
    */
    if (countryCode == "+") {
        // preventing : + 12345678
        if (numSplitted.length < 3) {
            console.log("Please provide the country codes after the plus (+) sign.");
            return null;
        // preventing : + 1234 5678
        } else if (numSplitted[1].length > 3) {
            console.log("Maximum number of digits of the country code is 3");
            return null;
        }
    }

    // when plus sign (+) and the country separated by a space : + 12 345678, make it like below :
    // plus sign (+) and country without any space : +12 345678
    if (countryCode == "+" && numSplitted.length >= 3) {
        // complete the whole country code
        countryCode = countryCode.concat(numSplitted[1]);
        /* 
        remove the plus sign (+) and country code digits from 'numSplitted'
        replace it with the completed country code
        */
        numSplitted.splice(0, 2, countryCode);
    }

    let totalLength = numSplitted.reduce((accum, currVal, currIndex) => {
       if (currIndex == 0) {
           // excluding the (+) sign
           return currVal.length - 1;
        }
        return accum + currVal.length
    }, 0);
    
    let result = "";
    // preventing : +1 234567890123456
    if (totalLength <= 15) {
        result = numSplitted.reduce((accum, currVal) => {
            return accum + currVal;
        }, "");
        return result;
    } else {
        console.log("Total number of digits should be 15 or below.");
        return null;
    }
}
