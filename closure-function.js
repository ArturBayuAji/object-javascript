const hummus = function(factor) {

	const ingredient = function(amount, unit, name) {
		let ingredientAmount = amount * factor;
		if (ingredientAmount > 1) {
			unit += "s";
		}
		console.log(`${ingredientAmount} ${unit} ${name}`);
	};

	ingredient(1, "can", "chickpeas");
	ingredient(0.25, "cup", "tahini");
	ingredient(0.25, "cup", "lemon juice");
	ingredient(1, "clove", "garlic");
	ingredient(2, "tablespoon", "olive oil");
	ingredient(0.5, "teaspoon", "cumin");
};

let myName = "Artur";

/*
Each local scope can also see all the local scopes that contain it, 
and all scopes can see the global scope. This approach to binding visibility 
is called lexical scoping.
*/
function boilsEgg(numEgg) {
	let isHaveEgg = true;
	function buyEgg(money) {
		let grocery = "not going yet";
		function enterStore(bringBag) {
			let isEggAvailable = true;
			console.log(isHaveEgg);
			console.log(myName);
		}
		enterStore(true);
	}
	buyEgg(5);
}


// WAYS TO DEFINE FUNCTION



// function definition version 1
// 	   this is a binding
//  |---------------------|
// 			 this is the value (a function as value)
let square = function(x) {
	return x*x;
};

// defining a new function value to an existing binding
square = function(x) {
	return "new function value";
}


/* 
we can call a function before defining it because any function definition
is moved to the top of the scope.
*/
saySomething("hello");


// function definition version 2
/* 
this function doesn't PRODUCE ANY VALUE, only side effect (display something on the screen,
or change something that will affect the statement after it)
*/
// |------------------------|
// this whole definition is still a 'binding' the name of the binding is 'saySomething' and the value is the given funciton.
function saySomething(word) {
	console.log(word);
}


// function definition version 3
// “this input (the parameters) produces this result (the body)”
let roundTo = (n, step) => {
	let reminder = n % step;
	return n - reminder + (reminder < step / 2 ? 0 : step);
};
// if there is only one parameter, the parentheses can be omitted
/* 
if the body is a single expression (rather than a block in braces)
that expression will be returned.
So, these two definitions of square do the same thing:
*/
const square1 = (x) => { return x * x; };
const square2 = x => x * x;



// this function have a default value
function multiply(num1, num2 = 2) {
	return num1 * num2;
}



// CLOSURE FUNCTION

/*
A good mental model is to think of function values as containing both the code in their body and 
the environment in which they are created. When called, the function body sees the environment (parameters, etc) in which 
it was created, not the environment in which it is called.
*/

/*
A closure is a function that has access to variables from its surrounding (lexical) scope, 
even after that outer function has returned. It "remembers" and retains access to those variables.
*/

// // defining a funciton using version 1 and 2:
// function wrapValue(n) {
// 	let local = n;
// 	// 	   this is annonymus function
// 	return () => {
// 		return local;
// 	};
// }
// for more clarity here's the same function :
function wrapValue(n) {
	let local = n; // 'local' is a variable in the 'wrapValue' function's scope
	// A function that references bindings from local scopes around it is called a closure. 
	function closureFunction() { 
		return local;
	}
	return closureFunction;
}

//  wrap1 = closureFunction
let wrap1 = wrapValue(1); // in this line 'wrapValues' function has finished executing
let wrap2 = wrapValue(2);
/*  
	wrap1 = () => {
			return local;
	};
*/
console.log(wrap1);
console.log(wrap1()); // but wrap1 (that contain the 'closureFunction') still has access to 'local' binding/variable that passed in.
console.log(wrap2()); // wrap2 has a different closureFunction because any local bindings is a new binding for each call.
// When 'wrapValue' returns, the local variables don't just disappear. The closures keep a reference to them.

// different example:
function multiplier(factor) {
	function closureFunction(number) { // closure function
		return number * factor; // uses the factor variable from its outer scope (the multiplier function), lexical scoping.
	}
	return closureFunction;
}

//  twice = closureFunction			with 'factor' binding set to 2
let twice = multiplier(2);
console.log(twice);
/* 
since 'twice' is a function that is not called immediately, twice = closureFunction
the code below calls it and passing in 5 as an argument, twice = closureFunction(5)
this resulting : twice = 5 * 2.    this 2 is the 'factor' local binding/variable of 'multiplier's function,
that closureFunction remember.

Why it's a Closure:

closureFunction is a closure because it:

1. Is defined inside another function (multiplier).
2. Accesses a variable (factor) from its outer (enclosing) function's scope.
3. "Remembers" the value of that variable (factor) even after the outer function (multiplier) has finished executing.

*/
console.log(twice(5));

let trice = multiplier(3);
console.log(trice);
console.log(trice(5))

// ================ END CLOSURE CONCEPT ======================





// hummus(2);
// boilsEgg(5)
// console.log(roundTo(25, 10));
// multiply(2, 5, "hello", true);
// console.log(multiply(5));
// console.log(multiply(5, 3));
