/* 1.//concatination with template literals and  + operator of strings.

let firstName = "krishna";
let middeleName = "kumar";
let lastName = "yadav";

console.log("krishna"+" "+"kumar"+" "+"yadav");
console.log(`${firstName} ${middeleName} ${lastName}`);
 */


/* 2.//finding string length

let firstName = "krishna ";
console.log(firstName.length); */

/* 3.//to change string from uppercase to lowercase and vice versa.

let firstName = "krishna";
let lastName = "YADAV"

console.log(firstName.toUpperCase());
console.log(lastName.toLowerCase());
console.log("Hello".toUpperCase()); */

/* //4.trimming space around string.

let firstName = "  krishna  ";
let lastName = "yadav    h"
console.log(firstName);
console.log(firstName.trim());
console.log(firstName.trimEnd());
console.log(firstName.trimStart());
console.log(lastName.trim()); */

/* //5.replacing of string

let name = "krishna singh yadav";
console.log(name.replace("singh","kumar"));
 */

/* //6.converting string to array.

let firstName = "krishna";
console.log(firstName.split(""));

let lastName = ["y","a","d","a","v"];
console.log(lastName.join("")); */

/* //7.palindrome check

let palindromeNumber = "1234321";
let arrayValue = palindromeNumber.split("");
let arrayReverse = arrayValue.reverse();
let reverseValue = arrayReverse.join("")
console.log(reverseValue);

if (palindromeNumber === reverseValue){
  console.log("palindrome number");
}
else{
  console.log("not palindrome number");
} */

/* // 8.checking character present  in string

let nname = "krishna singh yadav";
console.log(nname.includes("k"))
console.log(nname.includes(" z"))
 */

/* //9.starts with “a” or end with “a”

let nname = "krishna";
console.log(nname.startsWith("k"));
console.log(nname.startsWith("a"));
console.log(nname.endsWith("k"));
console.log(nname.endsWith("a")); */

/* //10.checking index of a character in a word & character at a particular index

let nname = "krishna";
console.log(nname.indexOf("a"));
console.log(nname.indexOf("l"));
console.log(nname[0]);
console.log(nname[1]); */
/* 
//11.slicing first and last name from full name.

let fullName = "krishna kumar yadav";
let firstName = "krishna";
let middeleName = "kumar";
let lastName = "yadav";

console.log(fullName.slice(firstName.length,fullName.length));
console.log(fullName.slice(middeleName.length,fullName.length));
console.log(fullName.slice(lastName.length,fullName.length));
 */

/* //12.make first character of first name capital


let firstName = "Bhdj";
let arrayFirstName = firstName.split("")
arrayFirstName[0] = arrayFirstName[0].toUpperCase();
let newFirstName = arrayFirstName.join("");
console.log(newFirstName);
 */

/* //13.Converting Decimal “10.6” to Floor & Ceil

let number = 10.6;
console.log(Math.floor(number));
console.log(Math.ceil(number));

//14.Generating Random Numbers from 1 to 10

let case1 = Math.random()*10
if (case1<1){
  console.log(case1+1)
}
else{
  console.log(case1);
}

console.log(Math.ceil(Math.random()*10))
console.log(Math.floor((Math.random() * 10 + 1))) */
/* 
//15.Converting a negative number(-10) to positive & Positive(10) to Negative

console.log(-Math.abs(743856));
console.log(Math.abs(-743856));

//16.find 2^10

console.log(Math.pow(2,10));

//17.find square root and cube root.

console.log(Math.sqrt(100));
console.log(Math.cbrt(8));

//18.Finding minimum and Maximum

console.log(Math.max(33,55,7887,5464,5436,3454222,34563535342,7667,442));
console.log(Math.min(33,55,7887,5464,5436,3454222,34563535342,7667,442));

//19.Find the value of PI

console.log(Math.PI);

//20.Find the round of 10.6 and 10.4

console.log(Math.round(10.4));
console.log(Math.round(10.6));

//21.Convert in international format

let num = 9897897897
console.log(num.toLocaleString());

//22.Specific number of decimal places (e.g., 3.14159 to "3.14")

console.log(Math.PI.toFixed(3));
console.log(Math.PI.toFixed(4));
console.log(num.toFixed(3)); */

 /*                                //day 6

console.log(5 == "5");
console.log(5 === "5");
console.log(null == undefined);
console.log(null === undefined);
console.log(true == 1);
console.log(true == "1");
console.log(true === 1);
console.log(false == 0);
console.log(false == "0");
console.log(false === 0);


console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(typeof(NaN));

console.log(99999999999999999 == 100000000000000000);         //only above than 15 digits
console.log(99999999999999999 === 100000000000000000);


console.log(0 == -0);
console.log(0 === -0);

console.log(0 == []);
console.log(0 == {});
console.log([] ==false);
console.log([] == []);
console.log({} == {});

console.log([] == 0);
console.log([]+[]);
console.log({}+{});
console.log([]+{});
console.log({}+[]); */


/* // +, -, **, *, /, %, ++, --

console.log(10 + 10)
console.log(10 - 10)
console.log(10 ** 10)
console.log(10 * 10)
console.log(10 / 10)
console.log(10 % 10) */

/* // =, +=, -=, *=, /=, %=, **=, ++, --

let myScore = 10
let yourScore = 20


myScore += yourScore // myScore = myScore + yourScore
console.log(myScore)

myScore -= yourScore // myScore = myScore - yourScore
console.log(myScore)


myScore *= yourScore // myScore = myScore * yourScore
console.log(myScore)


myScore **= yourScore // myScore = myScore ** yourScore
console.log(myScore)


myScore /= yourScore // myScore = myScore ** yourScore
console.log(myScore)


myScore %= yourScore // myScore = myScore ** yourScore
console.log(myScore)


myScore++ 
yourScore--
console.table([myScore, yourScore]) */