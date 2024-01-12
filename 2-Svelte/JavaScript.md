## JavaScript

### Variables/constants

```javascript
let something = 'hihi' // let = variable so you can change it. Type: string. "Let" = function scope.
let someNumber = 1 // Type: number (decimal or integer)
someNumber = someNumber * 2.5 // now 'someNumber' is 2.5
const someConstant = new Date() // const = constant so you can't change it. Type: date and current date as empty - or: new Date("2022-03-25")
let modalOpen = false // Type: boolean
let userFirstName = null // Type: null
const someStuff = ["1", "2", "3"] // Type: array of strings
console.log(someStuff[0] + someStuff[2]) // prints "13"
const someObject = { // Type: object
    name: "Bob Marley",
    age: 90,
    cars: ["VW", "BMW", "Žiguli"]
}
console.log(someObject.cars[1]) // prints "BMW"
var someVar = "hihi" // var - same as let but block scope. This means if let is used inside a block (like within an if statement or a loop), it is only accessible within that block. Can be also re-declared. Let is more preferred in modern JS.

Types are dynamic. You can do `age = 3` and then `age = '4'` so the `age` variable becomes from a number to a string. But it is not advised ant therefore we will learn in the future type safety with TS (TypeScript) or JSDoc comments (preferred by [Rich Harris](https://rich.ip.new/)).

```

## Operators

* `+`	Addition
* -	Subtraction
* *	Multiplication
* **	Exponentiation - like a shortcut for multiplication. When you write A ** B, it means you are multiplying A by itself B times. If A is 3 and B is 2, then 3 ** 2 means 3 * 3 = 9. If B is 3 then 3 ** 3 means 3 * 3 * 3 = 27.
* /	Division
* %	Modulus (Division Remainder) - find the remainder after dividing one number by another. If I share 10 beers among 3 friends, how many beers will be left after everyone  gets an equal share? One, right? So 10 % 3 is 1.
* ++	Increment - eg. if age = 25 then on birthday we'll do age++ and get 26
* --	Decrement - same as ++ but decrementing

### Assignment Operators

=	- if `let age = 25` and `newAge = 77` then `age = newAge` means bad deal as the `age` is now 77
+=	- `age += newAge` is a shortcut of `age = age + newAge` so `age` is now 102 (healthy lifestyle)
-=	- same as above
*=	- pretty much same `age *= 2` is a shortcut of `age = age * 2` so `age` is now 50
/=	- same as above for dividing
%=	- `age %= 10` is same as `age = age % 10` so `age` is now 5
**=	- `age **= 2` is same as `age = age ** 2` so `age` is now 625 (RIP)

### Comparison Operators

==	equal to ('15' == 15 is true)
===	equal value and equal type ('15' == 15 is false). Preferred always for type safety.
!=	not equal
!==	not equal value or not equal type.
>	greater than (btw, can be also used on strings as A is smaller than B)
<	less than
>=	greater than or equal to
<=	less than or equal to
?	ternary operator is a shortcut in programming for a simple "if-else" decision.  It's made up of three parts: a condition, what to do if the condition is true, and what to do if it's false. It looks like this: `isWeekend ? "Party time" : "Learn and work, nigga!"`. Or assign something to variable `reloadData = apiResponse === 'error' ? true : false` - if the `apiResponse` returned "error" then the `reloadData` variable will be `true` and somewhere else we will be checking its value and reload data if it becomes true.

### Logical Operators

&&	logical and
||	logical or
!	logical not

Can be used to place in front of whatever comparsion eg `if (!name.includes('Putin')) { // some actions }` means "if the string 'name' doesn't include "Putin"

## Type Operators

Mostly for type safety in the future

typeof	- Returns the type of a variable
instanceof	- Returns true if an object is an instance of an object type


## If else

```javascript
let jesusExisted = true
const everybodyBelieve = false

if (jesusExisted || !everybodyBelieve) {
    console.log('Halleluuja to some')
} else if (jesusExisted || !everybodyBelieve) console.log('Maximum HALLELUUJAAA!') // Note that we don't need {} if there's just one statement
else {
    // do something - Jesus didn't exists - not sure what?!?
}
```

We can combine multiple conditions with `&&` and `||` operators - eg.:

```javascript
const georgeCarlinKnowsItAll = true

if ((jesusExisted && everybodyBelieve) || georgeCarlinKnowsItAll) {
   // Homework: what to do in such case????
}
   
```

## Functions

```javascript
myFunction() // prints "Hello World!"

function myFunction() {
    console.log('Hello World!')
}
```

### Function parameters & exporting

Create a new file eg. `/src/lib/utils/helloSomething.js`:

```javascript
export function logHelloSomethingTimes(name, left) { // Note: we "export" it as it is in separate file and we expect to get 2 variables when the function is called
    console.log('Hello ' + name + '! Days left: ' + left)
}
```

Now, for example in `/src/routes/heya/+page.svelte`:

```javascript
<script>
    import { logHelloSomethingTimes } from '$lib/utils/helloSomething.js' // Note: we import the function from separate file. Use $lib to access `/src/lib` instead of `../../` etc.

    const myName = 'Hell' // Nice to keep space to separate imports, variable declarations and calling functions etc. different blocks
    
    logHelloSomethingTimes(myName, 3) // prints "Hello Hell! Days left: 3"
</script>
```

## Function Return and default values

When JS reaches a `return` statement, the function will stop executing and may return some value to the function caller.

```javascript
function hitlerCheck(sex, jew = true) {
    const whatTogive = 'gas' // Note that this variable is only available inside this function

    if (!jew) return // not a jew, well - nothing to do so just return
    
    if (sex === 'female') return 'Command: rape first'
    else return 'Give some ' + whatTogive
}

whatToDo = hitlerCheck('male') // we don't need to pass 'jew' second parameter true/false because it has default value of true and in this example we have a Jew
console.log(whatToDo) // prints "Give some gas"
```

## Arrow functions

Shorter and more concise syntax. They're great for writing small functions that fit in one line.

```javascript
const myFunction = () => {
    // do something
}

//or pass parameters

const myFunction = (param1, param2) => {
    return param1 + param2
}
```

The only way to use functions in the layout area in Svelte is arrow functions: `<button on:click={() => openModal = true}>`

### More advanced info for future:

* In arrow functions `this` keyword Behavior: This is a big difference. In traditional functions, `this` refers to the context in which the function was called. But in arrow functions, `this` is taken from the surrounding context where the function is defined, not where it's called. This makes arrow functions very handy in certain situations, like in object methods or event listeners, where you want `this` to refer to the context outside of the function.
* Methods and Constructors: If you're defining a method in an object or a constructor function, it's usually better to use a traditional function. This is because arrow functions don't have their own `this` and also don't have the `new` keyword functionality, which is important in constructors.