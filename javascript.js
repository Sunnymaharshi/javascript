/*  
    JavaScript
        javascript is Just-in-Time (JIT) compiler 
        it uses both compiler and interpreter
        Compiler 
            The source code is converted into machine code once and then gets executed.
        Interpreter
            Interpreters are quick. 
            We don’t have to go through that whole compilation step before execution. 
            It just starts translating the first line and then executes it.
            Cons
                When you’re running the same code more than once. 
                For example, if you’re in a loop. Then you have to do the same translation over and over and over again.
        Just-In-Time (JIT) compiler
            To get rid of the interpreter’s inefficiency, “the interpreter keeps retranslating the same code every time it goes through the loop”.
            we have a new component called a monitor (aka a profiler). That monitor watches the code as it runs
            Identify the hot or warm components of the code eg: repetitive code.
            Transform those components into machine code during run time.
            Optimize the generated machine code.
            Hot swap the previous implementation of the code.
            Just in time compiler is nothing but a combination of an interpreter and a compiler.   

    Everything in Javascript happens inside an Execution Context

    Execution Context
        Memory component 
            aka variable environment 
            stores all variables and functions 
        Code component
            aka Thread of Execution
            code is executed one line at a time 
    Garbage collection 
        Garbage collection is automatic in JS 
        it tries to release the memory if the location is not reachable
        Mark and Sweep Algorithm used for garbage collection
        Mark and Sweep Algorithm
            starts from root object, marks referenced values
            if it finds unreadable locations, those will be removed
    Javascript is synchronous single-threaded language
    When we run the code, A Global Execution Context is created in 2 phases 
        1. Memory creation phase
            allocates memory to variables and functions
            stores undefined in variables
            and function code for the functions
        2. Code Execution phase 
            runs the code 1 at a time 
    
    For every function invocation, new Execution Context is created for the function to run.
    this execution context is again created in 2 phases, same as above

    Call Stack 
        everytime Javascript is executed, it is created
        to manage execution contexts
        at bottom of the stack, we have Global Execution context
        maintains the order of execution of execution contexts
        Call Stack executes whatever there in the stack, it won't wait for anything.
    
    Hoisting
        variables can use used before it has been declared
        since variable are stored with undefined in memory allocation phase
    undefined
        variables declared in code are stored with undefined in memory allocation phase 
        It is not empty, it is one of JavaScript's primitive types.        
        It is a placeholder and takes up the memory
    not defined 
        when we use variable which is not declared anywhere in the code, we get this error

    window
        window is a global object object which is created along with global execution context
        at global level 'this' points to window
    
    First Class functions
        using functions as values
        treating functions like any other variables
        programming language is said to have First-class functions when functions in that language are treated like any other variable.

    Callback function
        function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of action.

    Event Listeners 
        when we create a event listener, callback function forms a Closure with outer scope
        this consumes a lot of memory, so we remove event listeners whenever possible

    Web APIs (not part of javascript, these are part of browser)
        setTimeout
        DOM APIs
        fetch
        local storage
        console
        location etc 
        we can access these through global object 'window', since it is global scope, we can access these without 'window.'

    Callback Queue
        aka Task Queue
        all callback functions(ex:setTimeout) are pushed to callback queue before coming to Call Stack.
    Microtask Queue
        it has higher priority than callback queue
        fetch callback function(Promise) will be pushed to Microtask queue
        all the callback functions which comes through 'Promises' and 'MutationObserver' goes into it.
    Event loop
        checks the Microtask queue and Callback queue and pushes function to Call Stack when 'Call stack is empty'
        it continuously monitors Call Stack, Microtask queue and Callback queue
        functions in Microtask queue is prioritized over functions in Callback queue
        event loop goes to callback queue once all the functions in Microtask queue are completed
        if function in callback queue won't get a chance to execute due to more Microtask queue function, it is called Starvation of callback queue

    setTimeout
        it does not always execute exactly after timeout given.
        if something is runing in call stack which takes more time than timeout of setTimeout
        event loop waits for call stack to empty, then only setTimeout callback function executes
        setTimeout(function,0) runs the function just after call Stack is empty

    Higher Order Functions 
        A function which takes another function as an argument or returns a function 
        ex: map, filter, reduce etc

    Callback functions Cons 
        Callback Hell
            in order to maintain order of callback functions, we pass callback inside callback so on
            which makes code unreadable 
        Invertion of Control 
            we are trusting another callback function to call the next callback function afterwards
            we are loosing control over the callback functions 
    
    Promise
        The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
        3 States 
            pending: initial state, neither fulfilled nor rejected.
            fulfilled: meaning that the operation was completed successfully.
            rejected: meaning that the operation failed.
        Promise objects are immutable
        Promise.resolve() and Promise.reject() is to wrap a value into a resolved or rejected promise value.
*/

// 1.
// getName()           // output: Javascript
// console.log(x)      // output: undefined
var x1 = 7;

function getName() {
  console.log("Normal function");
}

// 2. Arrow function behaves like a variable

// in memory allocation phase, getName1 is allocated with undefined
// getName1()          // output: TypeError: getName1 is not a function

var getName1 = () => {
  console.log("Arrow function");
};

// 3. function in a variable also behaves like a variable
// in memory allocation phase, getName2 is allocated with undefined
// getName2()          // output: TypeError: getName2 is not a function
var getName2 = function () {
  console.log("Javascript");
};

/*  
    Lexical environment
        whenever execution context is created, Lexical environment is created.
        it is local memory along with lexical environment of it's parent
        for global execution context, parent lexical environment points to null

    Scope Chain
        whenever we are using  variable 'b' in a function, b will be searched in local memory
        if it's not found, b will be searched in parent lexical environment of the function.
        this goes until b is found or we reach lexical environment is null which is global scope.
*/
// Scope Chain
function a() {
  var b = 1;
  c();
  function c() {
    console.log(b);
  }
}
// a();                // output: 1

/*
    var 
        var is functional scoped 
        all variables declared with var after implicitly declared at the top
        those bubble up to the top, in both normal & strict mode
        *avoid using var for declaring variables
    Hoisting 
        var variable declarations are pulled to the top of their function or scope 
        so varibale is undefined until it is initialised
    let
        let and const are block scoped
        these variables are hoisted in different memory space (ex:Script) instead of Global.
        * we can't access these until they are initialised.
        if we try to access before initialisation we get Reference error: Cannot access before initialisation
        can be re-initialised
    const 
        same as let, with more strict rules
        must be initialised at the time of declaration
        cannot be re-initialised
    Temporal Dead Zone 
        A variable declared with let, const, or class is said to be in a "temporal dead zone" (TDZ) 
        javascript hoist these variables but in temporal dead zone, so that we can't
        access them before initialisation
        from the start of the block until code execution reaches the place where the variable is declared and initialized.
        aka the block until let/const/class is initialised
        aka block where a variable is inaccessible until the moment the computer completely initializes it with a value.
        While inside the TDZ, the variable has not been initialized with a value, and any attempt to access it will result in a ReferenceError.
        to avoid errors because of TDZ, move all ur declarations and initialisations to the top
*/
// TDZ starts at beginning of scope

// console.log(l);     // output: "undefined"
// console.log(k);     // output: ReferenceError: Cannot access 'k' before initialization

// var l = 1;
let k = 2; // End of TDZ (for k)

// Cannot redeclare same let variable in same scope
// let k = 10;           // output: SyntaxError: Identifier 'k' has already been declared
// var k = 10;           // output: SyntaxError: Identifier 'k' has already been declared

// const m;              // output: SyntaxError: Missing initializer in const declaration
const t = 10;

// t = 11;               // output: TypeError: Assignment to constant variable.

/*
    Block
        aka Compound statement
        block is defined by {} 
        it is used to combine multiple statements      
        we use block to have multiple statements where javascript expects single statement (Ex: if block)
    Block Scope
        what all variables and functions we can access inside a Block
        let and const are block scoped
    Shadowing
        when a variable declared within a certain scope has the same name as a variable in an outer scope. 
        The inner variable "shadows" the outer one within its scope.
        it happens not just inside blocks, also in functions.
*/
// Block Scope and shadowing
var b1 = 100;
let b4 = 10;
{
  var b1 = 1;
  let b2 = 2;
  const b3 = 3;
  let b4 = 4;
  // b1 shadowed b1 in global scope and it re-initialised b1, since both are pointing to Global Scope
  // console.log(b1);        // output: 1
  // console.log(b2);        // output: 2
  // console.log(b3);        // output: 3
  // b4 shadowed b4 in global scope, both are in different scopes, as let is block scoped. same for const also
  // console.log(b4);        // output: 4
}

// console.log(b1);            // output: 1
// console.log(b2);         // output: ReferenceError: b2 is not defined
// console.log(b3);         // output: ReferenceError: b3 is not defined
// console.log(b4);            // output: 10

// illegal shadowing
// let c1 =  1;
// {
//     // since c1 is declared in global scope and var is not block scoped and is trying to re-declare let c1 in global scope
//     var c1 = 2;             // SyntaxError: Identifier 'c1' has already been declared
// }
let c2 = 1;
{
  let c2 = 2; // valid
}
var c3 = 1;
{
  let c3 = 3; // valid
}

/*
    IIFE - Immediately Invoked Function Expression
        is a JavaScript function that runs as soon as it is defined. 
        can have named or anonymous IIFE's
        Immediate Execution
        Avoid polluting the global namespace
            avoiding name conflicts with other parts of your code.
        Execute an async function
        The module pattern - Data Privacy
            allows you to create closures
            to create private and public variables and methods

*/
// normal IIFE function
(function () {
  // …
})();
// arrow IIFE function
(() => {
  // …
})();
// async IIFE function
(async () => {
  // …
})();
/*
    Shallow comparison
        works for primitive data types like numbers and strings 
        won't work for arrays and objects 
    Deep comparison
        compares every single value in array or object
        compares nested objects and arrays also(recursion)
        can use libraries like lodash
*/
/*
    Array traverse
        for__in
            Loops the properties of an object
            for array, it loops indexes
            not recomended if index order is important
        for__of
            Loops the values of any iterable
        forEach
            takes callback function
            can't use break
    Array methods 
        push()
            adds 1 or more elements at the end
            returns new length of array 
        unshift()
            adds 1 or more elements at the beginning
            returns new length of array 
        pop()
            removes last element
            returns removed element
        shift()
            removes first element
            returns removed element
        splice()
            add,insert,replace and remove 1 or more elements
            splice(start,[deleteCount[,val1,val2...]])
            by default it deletes all from the start index
            returns removed elements
    Array searching
        indexOf()
            returns the index of the first occurrence of a value in a string.
            returns -1 if the value is not found.
            string.indexOf(searchvalue, [start])
        lastIndexOf()
            returns the index of the last occurrence of a value in a string.
        includes()
            returns true if an array contains a specified value else false
            includes(element, [start])
        find()
            takes callback 
            returns the value of the first element that passes a test.
            returns undefined if no elements are found.
            array.find(function(currentValue, [index], [arr]),[thisValue])
        findLast()
            returns the value of the last element that passes a test.
        findIndex()
            returns the index of the first element that passes a test.
        findLastIndex()
            returns the index of the last element that passes a test.
        Array.from()
            takes any type and returns array 
            ex: Array.from("hi") // ['h','i']
            can give mapping function to run on each element
            ex: Array.from("hi", (e)=>e.toUpperCase()) // ['H','I']
            Array.from({length:2}) // [undefined,undefined]

        filter()
            returns new array with elements that pass a test provided by a function.
            array.filter(function(currentValue, index, arr), thisValue)
        map()
            returns new array from calling a function for every array element.
            array.map(function(currentValue, index, arr), thisValue)
        reduce()
            A function to be run for each element in the array.
            array.reduce(function(total, currentValue, [currentIndex, arr]), initialValue)
            array element 0 is used as initial value, and the iteration starts from index 1
            If an initial value is supplied, this is used, and the iteration starts from index 0.
        reduceRight()
            start from last to 0th index 
        
        sort()
            sorts the original array and returns it 
            compare function
                to define an alternative sort order.
                function(a, b){return a - b}
                a is right element, b is left element
                should return a negative, zero, or positive value
                negative
                    a is sorted before b.
                positive
                    b is sorted before a.
                0
                    no changes are done
        toSorted() 
            sorts an array without altering the original array.
        reverse() 
            reverses the elements in original array and returns it 
        toReversed() 
            reverses an array without altering the original array.

    string 
        indexOf()
            returns the position of the first occurrence of a value in a string.
            returns -1 if the value is not found.
            indexOf(searchString, [startIndex])
        lastIndexOf()
            returns the index (position) of the last occurrence of a specified value in a string.
            returns -1 if the value is not found.
        search()
            returns the index (position) of the first match.
            returns -1 if no match is found.
            can take regular expression
            search(searchString)
        slice()
            returns a part of a string.
            does not change the original string.
            slice(startIndex, [endIndex])
        substring()
            returns a part of a string.
            does not change the original string.
            Start or end values less than 0, are treated as 0.
            slice(startIndex, [endIndex])
        substr()
            returns a part of a string.
            begins at a specified position, and returns a specified number of characters.
            does not change the original string.
            substr(start, [lengthOfChars])
        charAt()
            returns the character at a specified index in a string.
            Invalid index converts to 0
            charAt(index)
        charCodeAt(0)
            returns the Unicode of the character at a specified index in a string.
            charCodeAt(index)
    Map 
        key-value pairs where the keys can be any datatype.
        remembers the original insertion order of the keys.
        able to use objects as keys
        fruits = new Map([["apples", 500],["bananas", 300],["oranges", 200]])
        set()
            add elements to a Map
            fruits.set("apples", 500);
        get()
            gets the value of a key
            fruits.get("apples");
        size property
            returns count of keys
        Directly iterable
    WeakMap
        hold keys weakly
        keys must be objects, not primitive like number or string
        if keys are garbage collected so do the values
        if there are no other references to an object used as a key, 
        the object can be garbage collected, and its entry will be automatically
        removed from the WeakMap
        obj = {...}
        m.set(obj,1);
        if obj = null after garbage collection
        then obj inside m also will be removed
    Set 
        collection of unique values.
        values can be of any type, primitive values or objects.
        add()
            to add elements to set
    WeakSet 
        hold elements weakly like WeakMap
    BigInt()
        use to work with Large numbers 
        like calculations
        ex: BigInt("12899689846983642") or 12899689846983642n
    Not a Number (NaN)
        math errors like 0/0, 1/"to"
        imaginary numbers like Math.sqrt(-1)
        Number("hi")
        all NaN values are unique, NaN === NaN // false 
        isNaN()
            return true if it is NaN or cannot be coerced to number 
            ex: isNaN(0/0) //true isNaN("hi") // true 
        Number.NaN()
            return true if it is NaN, everything else is false
            ex: isNaN(0/0) //true isNaN("hi") // false 
    
*/
/*
    Object 
        aka Object literal 
        key-value pair data structure
        creation 
            const obj = {} or 
            const obj = new Object();
        All keys are stringified 
            obj[1] = "one"
            here 1 will be converted to "1"
        Dynamic key value 
            to calculate key dynamically
            like getting key from a variable or some js expression
            {
                [user_name]:{...}
            } 
            here value of user_name will be taken as key
        Object.create(object)
            Creates an object from an existing object
        Object.assign()
            copies properties from one or more source objects to a target object.
            can be used to clone the object
            does a shallow clone
            Object.assign(target, source(s))
        Object.keys()
            returns an array of object's own enumerable string-keyed property names.
        obj.hasOwnProperty()
            returns a boolean indicating whether this object has the specified
            property as its own property (as opposed to inheriting it).
            ex: {}.hasOwnProperty("toString") // false
        Object.freeze()
            takes an object, and makes it immutable
        Accessors (Getters and Setters)
            allows equal syntax for properties and methods
            function name and property name must be different
            get and set keywords are used to create methods which acts as properties
            useful for doing things behind-the-scenes
            can be used in classes also
        shallow clone 
            only copies first level of properties, if any properties have objects
            or arrays, clone will reference same objects or arrays 
            ex: Object.assign(), {...obj}, Array.slice()
        deep clone 
            create a completely independent copy of object
            JSON.parse(JSON.stringify(obj))
                can't handle functions,undefined, Symbols and circular reference 
                loses Date objects (converts to string)
                can't preserve Map, Set, RegExp etc
            structuredClone() - modern browsers
                handles circular references 
                preserves most built-in types (Date,Set,Map etc)
                can't handle functions 
            cloneDeep() - lodash

*/
const languageObj = {
  language: "en",
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  },
};
console.log(person.lang); // en
person.lang = "te";
console.log(person.lang); // te

/*
    Spread operator (...variable)
        used to spread all values inside an array or object
    Rest operator (...variable)
        merge all the values into array
        also used in array destructuring to take remaining values into a array        
*/
// Spread operator
const Person = {
  name: "John",
  age: 30,
};

const copiedPerson = {
  ...Person,
  height: 6,
};
// console.log(copiedPerson)
// Output: {name: 'John', age: 30, height: 6}

// Rest operator
function addAll(...args) {
  // console.log(args)
}
addAll(1, 2, 3, 6);
// Output: [1, 2, 3, 6]

// Rest operator in array destructuring
const list = [1, 2, 3, 4, 5];
const [first, second, ...remaining] = list;
// console.log(first,second,remaining)
// Output: 1 2 [3, 4, 5]

/*
    Iterators 
        ES6 
        new mechanism to iterate or traverse through data structures
        can use for__of loop
        arrays,strings,maps,sets etc are iterable
    iterable
        used to make data structure iterable which is not
        it should have method to Symbol.iterator key which returns object with next method
    Async Iterators
        for asynchronous operations
        Symbol.asyncIterator
*/
let range = {
  start: 10,
  end: 15,
  [Symbol.iterator]: function () {
    return {
      next() {
        if (this.start <= this.end) {
          return { value: this.start++, done: false };
        }
        return { done: true };
      },
    };
  },
};
// for (i of range){
//     console.log(i)
// }
// prints 10 to 15
/*
    Generators 
        function* keyword used to define 
        calling generator function returns generator object
        yeild operator 
            returns the value and 
            passes the generator function
        next()
            starts execution till the yeild operator
        can use for__of loop or spread operator instead  of next()
        return()
            used to exit from the generator
    Async Generators
        for asynchronous operations
*/
const genFunction = function* () {
  console.log(1);
  yield 1;
  console.log(2);
  yield 2;
  console.log(3);
};
const gObj = genFunction();
// gObj.next()          // {value:1, done:false}
let rangeGen = {
  start: 10,
  end: 15,
  [Symbol.iterator]: function* () {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  },
};
console.log([...rangeGen]);
/*
    Closure
        function along with surrounding state (lexical environment) 
        gives access to another function's scope from an inner function
        used to create private variables
*/
// Closure
function x() {
  let ax = 10;
  function y() {
    // console.log(ax)
  }
  return y;
}

// after returning y function, y function still remembers it's lexical scope, means Closure is returned
var oy = x(); // after this execution context of x() will be removed/deleted
// oy();                       // output: 10

function z() {
  let m = 3;
  // execution won't pause here for 1000ms, setTimeout will stores this callback function (Closure) and attaches a timer
  // function will run after timer ends
  setTimeout(function () {
    console.log(m);
  }, 1000);
  // console.log("After setTimeout")
}

// z();
/* output:
After setTimeout
3
*/

// by the time function runs var i value will be 6, since it is global scope, all functions will take same i
function p() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(() => {
      // console.log(i);
    }, i * 1000);
  }
}
// p();
/* output:
6
6
6
6
6
*/
// every time loop runs, i is a new variable and setTimeout function forms a Closure with it since i is block scoped
function p1() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      // console.log(i);
    }, i * 1000);
  }
}

// p1();
/* output:
1
2
3
4
5
*/

// using var and Closure, we created new Closure everytime loop runs
function p2() {
  for (let i = 1; i <= 5; i++) {
    function log(x) {
      setTimeout(() => {
        // console.log(x);
      }, x * 1000);
    }
    log(i);
  }
}
// p2();
/* output:
1
2
3
4
5
*/
// Closure in event listeners, here count is private variable
document.getElementById("button")?.addEventListener(
  "click",
  (function () {
    let count = 0;
    return function () {
      count += 1;
      console.log(`button clicked ${count} times`);
    };
  })()
);
// function statement aka function declaration
function f1() {
  console.log("function");
}
// function expression
var f2 = function () {
  console.log("function");
};
// anonymous function, used when functions are used as values
// can't create functions without name, can be passed without name
/*function (){
    
}
*/
// parameters vs arguments
function f3(param1, param2) {
  console.log("function");
}
// values which are passed are arguments
// f3(1,2)

// map: to transform an array
const arr = [1, 2, 3, 4];
function double(n) {
  return n * 2;
}
const output = arr.map(double);
// console.log(output)

// filter: to filter an array
const nums = [1, 2, 3, 5, 4, 6];
function isOdd(n) {
  return n % 2;
}
const odd_nums = nums.filter(isOdd);
// console.log(odd_nums);

// reduce
const numbers = [1, 2, 3, 4, 5];
const initialValue = 0;
function findSum(accumilator, current) {
  accumilator = accumilator + current;
  return accumilator;
}
const sum = numbers.reduce(findSum, initialValue);
// console.log(sum);

// flatten multi-d array with reduce
const d2_arr = [
  [1, 2],
  [3, 4],
];
const flaten = d2_arr.reduce((total, cur) => total.concat(cur), []);
console.log(flaten); // [ 1, 2, 3, 4 ]

// Callback Hell and Invertion of Control
// calling APIs through functions
// passing callback functions to call after function completed to maintain sequence of execution
// we are loosing control over passed callback functions since we don't whether it's gets executed or not.
/*
createOrder(cart,function (orderID){

    proceedToPayment(orderID,function (paymentStatus){

        confirmation(paymentStatus);
    })
})
*/
/*  Promise
        with promise we attach the callback function, instead of passing 
        this way we gain the control over callback functions
        then 
            runs after resolve
        catch 
            runs after error 
        finally
            runs at the end
*/
/*
createOrder(cart)
    .then(function (orderID){
        return proceedToPayment(orderID);
    })
    .then(function (paymentStatus){
        return confirmation(paymentStatus);
    });
// with Promise using Arrow Functions
createOrder(cart)
    .then((orderID) => proceedToPayment(orderID))
    .then((paymentStatus)=> confirmation(paymentStatus));
*/
const GITHUB_USER_API = "https://api.github.com/users/Sunnymaharshi";
const user = fetch(GITHUB_USER_API);

// console.log(user)          // output: Promise {<pending>}
user.then(function (data) {
  // console.log(data);
});

/*  Promise Chain and Promise creation
        We need to return data coming from 1 promise to pass it to next Promise in Promise Chain
        catch block only handles errors from above it, means putting catch at the end will handle all the errors
        we can add catch for each then blocks
        then blocks after the catch will run no matter errors above it comes or not
        finally block will run at end no matter what.
*/
const cart = ["shirts", "pants", "dresses"];

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }
    const orderID = "1234";
    if (orderID) {
      setTimeout(function () {
        resolve(orderID);
      }, 3000);
    }
  });

  return pr;
}
function validateCart(cart) {
  return true;
}
function proceedToPayment(orderID) {
  return new Promise(function (resolve, reject) {
    resolve("Payment Successfull");
  });
}

// createOrder(cart)
//     .then(function (orderID){
//         console.log(orderID)
//         return orderID;
//     })
//     .then(function (orderID){
//         return proceedToPayment(orderID);
//     })
//     .then(function (status){
//         console.log(status)
//     })
//     .catch(function (err){
//         console.log(err)
//     })

/*  Promise.all()
        usages: Promise.all([p1,p2,p3])
        output: [val1,val2,val3]
        it will call all these APIs in parallel and wait until all are completed/settled
        if any of these fail, it will throw an error immediately
    Promise.allSettled()
        usages: Promise.allSettled([p1,p2,p3])
        output: [val1,err2,val3], it will be list of objects with status and value/reason in each
        it will call all these APIs in parallel and wait until all are completed/settled
        if any of these fail, in output array, error will be there for that promise 
    Promise.race()
        usages: Promise.race([p1,p2,p3])
        output: val2/err2 if p2 is completed/settled first
        it will return result of first completed/settled promise whether it's error or success
    Promise.any()
        usages: Promise.any([p1,p2,p3])
        output: val3 if p3 is first completed/settled success promise
        it will return result of first completed/settled promise which is a success
        if all are failed, it will return AggregateError of all promises, err.errors will contain all the errors    
*/

// const pr1 = new Promise((resolve, reject)=>{
//     setTimeout(() => resolve("pr1 success"),3000);
// })
// const pr2 = new Promise((resolve, reject)=>{
//     // setTimeout(() => resolve("pr2 success"),1000);
//     setTimeout(() => reject("pr2 fail"),1000);
// })
// const pr3 = new Promise((resolve, reject)=>{
//     setTimeout(() => resolve("pr3 success"),2000);
// })

// Promise.allSettled([pr1,pr2,pr3])
//     .then((res)=> {
//         console.log(res)
//     })
//     .catch((err)=>{
//         console.error(err)
//     })
/* output:
[{status: 'fulfilled', value: 'pr1 success'},
{status: 'rejected', reason: 'pr2 fail'},
{status: 'fulfilled', value: 'pr3 success'}]
*/
/*
    Async Functions
        always returns a Promise
        if we return any value which is not a Promise, it will wrap the value inside a Promise and then returns.
        * async and await are modern way of handling promises, internally javascript will be using 'then' only
        await can only be used inside an Async function, Async and await must be used together
        makes code more readable than using 'then' 
        use try/catch or add catch to promise for error handling
        * Promises will start to resolve, from the moment they are created, not when await is added before them.
        from ES2022
            await can be used outside of async function, but only in modules
            it is called top-level await

*/
const pr4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise value 3000");
  }, 3000);
});
const pr5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise value 5000");
  }, 5000);
});

// normal way of resolving a Promise
function handlePromise1() {
  // JS Engine will not wait for promise to resolve
  pr4.then((res) => {
    console.log(res);
  });
  console.log("1. after promise");
}
// handlePromise1()
/* output:
1. after promise
Promise value 3000
*/

// resolving promise using async and await
async function handlePromise2() {
  // JS Engine will suspend handlePromise2(removed from Call Stack), and start from where it left after pr4 resolved
  const val1 = await pr4;
  console.log("after await 1");
  console.log(val1);
  // JS Engine will suspend handlePromise2(removed from Call Stack), and start from where it left after pr5 resolved
  const val2 = await pr5;
  console.log("after await 2");
  console.log(val2);
}
// handlePromise2()
/* output: 
after await 1
Promise value 3000
after await 2
Promise value 5000
*/
// here promise which takes 5sec is came first and promise we takes 3sec comes next
// * Promises will start to resolve, from the moment they are created, not when await is added before them.
async function handlePromise3() {
  // JS Engine will suspend handlePromise2(removed from Call Stack), and start from where it left after pr4 resolved
  const val1 = await pr5;
  console.log("after await 1");
  console.log(val1);
  // pr5 has already been resolved
  const val2 = await pr4;
  console.log("after await 2");
  console.log(val2);
}
// handlePromise3()
/* output: 
after await 1
Promise value 5000
after await 2
Promise value 3000
*/

// fetch with async and await
async function handleFetch() {
  // fetch will returns a Promise
  try {
    const data = await fetch(GITHUB_USER_API);
    // json() return a Promise
    const jsonValue = await data.json();
    console.log("user data json", jsonValue);
  } catch (err) {
    console.log(err);
  }
}
// handleFetch();

/* 'this' keyword
    You cannot change the value of this
    value is determined only at the time of execution
    this keyword refers to the context where a piece of code is supposed to run
    * value of this in JavaScript depends on how a function is invoked (runtime binding), not how it is defined. 
    Left of Dot rule 
        generally this value is whatever left of dot
        calling func() in global scope is same as window.func()
    * this works differently in non-strict mode and strict mode
    this in Global Scope
        points to Global object
        in browser it is window object
        in nodejs it is global
    this substitution 
        if this is undefined or null 
            non strict mode 
                this will be replaced with global object
            strict mode 
                it will be same
    this value depends on how the function is called
        strict mode 
            func()
                undefined
            window.func()
                window
    this in DOM elements or event listeners
        points to that HTMLElement

*/
// this in Global Scope

// console.log(this);
// output: window:{...}

// this in a function
function func() {
  console.log(this);
}
// func()
/*
output in non strict mode:
window:{...}
output in strict mode:
undefined
*/
// window.func()
/*
output in strict mode:
window:{...}
*/

// this inside object's method
// whenever there is a function inside an object it is method
const obj = {
  a: 1,
  x: function () {
    console.log(this);
  },
};
// obj.x()
// output: obj

/*
    this inside Arrow function
        arrow function doesn't create it's own execution context, it just uses context where it is defined.
        most cases we don't need to bind when we use arrow functions 
        in other words, it retains the this value of enclosing lexical context/parent scope at the time they are defined.
        in other words, arrow functions don't have their own this binding. Instead, this is looked up in scope just like a normal variable.
        when invoking arrow functions using call(), bind(), or apply(), the thisArg parameter is ignored.  
        this value cannot be set by bind(), apply() or call() methods, nor does it point to the current object in object methods.
        Arrow functions doesn't have arguments variable inside it which stores arguments passed to it
        you can't pass arguments without defining them in arrow function
        Avoid arrow functions for 
            methods in objects which uses 'this' 
            normal callback functions which uses 'this' 
            event listener callback functions which uses 'this'  
            adding methods to prototype, since 'this' doesn't work          

    obj{
        x:()=>{
            this
        }
    }
    is same as 
    obj {
        x: this
    }
    that's why it took value of this in global scope
*/
const obj2 = {
  a: 1,
  x: () => {
    console.log(this);
  },
  y: function () {
    console.log(this);
  },
};
// obj2.x()
// output: window:{...}
// obj2.y()
// output: obj2

// this inside nested arrow function
// here enclosing lexical context is method x for which this is obj3
const obj3 = {
  a: 1,
  x: function () {
    // enclosing lexical context

    const fun = () => {
      console.log(this);
    };
    fun();
  },
};
// obj3.x()
// output: obj3
/*
    function borrowing or Method Reuse or Explicit Function Binding
    call, apply and bind
        used to call an object method with another object as argument.
        with these you can write a method that can be used on different objects.
        these can refer this to any object.
    call
        invokes function with given this & optional args
        takes arguments separately.
        when you want to invoke the function immediately with thisArg
        call(thisArg,arg1,arg2,...)
    apply 
        invokes function with given this & optional args
        takes arguments as an array 
        usefull when we want to use arguments variable in function
        when you want to invoke the function immediately with thisArg
        apply(thisArg,[arg1,arg2,...])
    bind 
        does not invokes the function
        returns new function with 'this' keyword as given this.
        when you want that function to later be called with a certain context
        useful in events, setTimeout etc where u want to pass callback fn with thisArg
        bind(thisArg, arg1, arg2)
    This Precedence
        1-bind()
        2-apply() and call()
        3-Object method
        4-Global scope
*/
function printFullName(homeTown) {
  console.log(this.firstName + " " + this.lastName + " from " + homeTown);
}
let student1 = {
  firstName: "Sunny",
  lastName: "Reddy",
};
let student2 = {
  firstName: "Maharshi",
  lastName: "Reddy",
};
// call
// printFullName.call(student1,"Andhra")
// output: Sunny Reddy from Andhra

// apply
// printFullName.apply(student2,["Telangana"])
// output: Maharshi Reddy from Telangana

// bind
let printMyFullName = printFullName.bind(student1, "Andhra");
// printMyFullName()
// output: Sunny Reddy from Andhra

/*
    this inside Callbacks 
        callback functions run in entirely different context.
        callbacks are typically called with a this value of undefined (calling it directly without attaching it to any object)
        which means if the function is non–strict, the value of this is the global object 
        to fix it, we can pass this value using bind which returns a new function with this passed as argument
        or we can use Arrow functions, which takes this value of it's enclosing lexical context/parent scope.
        or store this value in a variable and use it instead of this callback function
*/
const person = {
  firstName: "John",
  lastName: "Doe",
  display: function () {
    console.log(this.firstName + " " + this.lastName);
  },
};
// when a function is used as a callback, this is lost.
// setTimeout(person.display, 3000);
// output: undefined undefined

// 1. Using Bind
let display = person.display.bind(person);
// setTimeout(display, 3000);
// output: John Doe

/*
    Object Constructor Functions
        Sometimes we need to create many objects of the same type.
        To create an object type we use an object constructor function.
        It is considered good practice to name constructor functions with an upper-case first letter.
        methods in constructor function are copied in all the instances that are created 
        instead use Prototype for adding methods, Human.prototype.talk = function (){}
        ES6 class is synthetic sugar of constructor function
    new keyword
        1.creates empty object
        2.sets this keyword to be that object 
        then our code inside constructor function runs
        3.returns the object (this)
        4.creates a link to the object's prototype
    
*/

function Human(name, home) {
  this.name = name;
  this.home = home;
  this.talk = function () {
    console.log(this.name, "talking");
  };
}
const john = new Human("John", "London");
// console.log(john)
/* output:
{name: 'John', home: 'London', talk: ƒ}
*/

/*    Prototypal Inheritance 
        Prototypes are the mechanism by which JavaScript objects inherit features(properties & methods) from one another. 
        prototype chaining 
            when we run obj.doSomething(), first js checks if it is defined locally 
            if not, js checks __proto__, if not found js checks parent __proto__ so on 
            class inheritance is an example of chain of Prototypes        
        __proto__ 
            it is property of every variable, which has all methods and properties that are inherited from it's parent constructor function or class
        prototype
            constructor functions and classes will have prototype property 
            it has all properties and methods which are shared with instances
            by using this you can add properties and methods to any object
        * never change __proto__ for variables, use prototype on it's class 
        whenever we are access any property/method
            first loopup happens inside the instance if not found, then inside it's __proto__ and so on upto it goes to Object class
            Object is parent of all variables/functions in JavaScript
        date objects inherit from Date.prototype
        array objects inherit from Array.prototype
        normal objects, Date and Array inherit from Object.prototype
        Object.prototype is on the top of the prototype inheritance chain
            Object.__proto__ is null
            since it is base for all and won't inherit from anything            
        Object.create()
            returns new object with prototype as given object 
        Object.getPrototypeOf()
            returns prototype of the passed object 
        Object.setPrototypeOf()
            takes obj, and new prototype for the obj 
            returns passed object with new given prototype
        myproobj.isPrototypeOf()
            returns true if myproobj is prototype of passed object 
*/

function Person1() {
  // constructor function
  this.talk = function () {
    console.log("Person1 talking");
  };
  this.age = 30;
}

const sunny = new Person1();

sunny.age = 20; // age in sunny is shadowing age in Person1
sunny.talk = function () {
  // talk in sunny is shadowing talk in Person1
  console.log("Sunny talking");
};

// console.log("Sunny age:",sunny.age)
// output: 20

// sunny.talk()
// output: Sunny talking

// console.log(sunny.__proto__ === Person1.prototype)
// output: true

// adding custom method to all functions
// same can be done to any object
Function.prototype.printMyFullName = function () {
  console.log("Maharshi Reddy");
};

function xyz() {}

// xyz.printMyFullName()
// output: Maharshi Reddy

/*  polyfill
        piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.
    polyfill for bind 
        every function have access to bind method, so we use prototype property to give our own bind method to any function
        bind method returns a function
        normally we call bind like func.bind(), to get access of function we can use 'this'
        we can pass arguments while using bind, and also new function created with bind can have arguments
*/
let student = {
  firstName: "sunny",
  lastName: "reddy",
};
function printStudent(homeTown, state) {
  console.log(this.firstName, this.lastName, homeTown, state);
}
Function.prototype.mybind = function (...args) {
  let fun = this;
  let new_obj = args[0];
  let other_args = args.slice(1);
  return function (...new_args) {
    fun.call(new_obj, ...other_args, ...new_args);
  };
};
const printStudent2 = printStudent.mybind(student, "atp");
// printStudent2("AP");
// output: sunny reddy atp AP

/*  
    Function Currying 
        functional programming technique that involves breaking down a function that takes
        multiple arguments into a series of functions that take one argument each.
        used for passing partial parameters and avoid unwanted repetitions
        f(a,b,c) => f(a)(b)(c)              
*/
const add_two = function (a) {
  return function (b) {
    return a + b;
  };
};

console.log(add_two(1)(2)); // 3
const addTo5 = add_two(5);
console.log(addTo5(1)); // 6
// Curry factory function
function curryFac(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
/*
    Pure Functions
        functions that produce the same output for a particular input every time they are called
        they have no side effects and do not rely on external state or mutable data.
        does not depend on any mutable state 
        does not modify a mutable object, reassigning the variable etc
        side effects 
            Mutating your input
            console.log
            HTTP calls (AJAX/fetch)
            Changing the filesystem (fs)
            Querying the DOM
*/

/*
    Event Flow or Event Propagation in DOM 
        events are processed in 3 phases 
        trickling/capturing down => on element => bubble up
        1.Capturing Phase 
            by default, it won't happen
            1st phase
            pass true as 3rd argument to addEventListener to enable it
            if it is enabled, event handlers are triggered in the capturing phase.
        2.Target Phase 
            target element is the element where the event originally occurred
        3.Bubbling Phase
            event goes to it's parent and so on upto top ancestor element (window).
    Event Propagation 
        order in which elements receive the event.
        * when an element receives an event, that event will propogate to it's ancestors not to it's children
        Propagation order can be controlled by changing 3rd argument(useCapture) to true/false in addEventListener
    Event Bubbling 
        default behaviour of event propagation, default 3rd argument(useCapture)' is false
        bubbling up to parent elements
        when an element receives an event, it runs on itself, then it's parent and so on upto top ancestor element (window).       
    Event Capturing/Trickling
        can be enabled by passing true as a 3rd argument(useCapture) to the addEventListener
        Captured down to child element
        when an element receives an event
            first it's top ancestor (window) event runs, then it's child and so on upto element that received the event.  
    Stop Propagation
        we can stop the propagation by using e.stopPropagation().
        order of propagation will depends on useCapture value, 
        propagation will stop at the element which has e.stopPropagation()   
    event.target 
        element that triggered the event
    event.currentTarget
        element that the event listener is attached to
    some events don't propagate like focus event
    Event class 
        Events can be created with the Event constructor
        ex: const event = new Event("build");
    CustomEvent Interface 
        To add more data to the event object
        detail property can be used to pass custom data
        ex: const event = new CustomEvent("build", { detail: data });
    EventTarget Interface 
        implemented by objects that can receive events and may have listeners for them.
        addEventListener() method
            sets up a function that will be called whenever the specified 
            event is delivered to the target.
        dispatchEvent() method 
            invokes event handlers synchronously. 
            All applicable event handlers are called and return before dispatchEvent() returns.
            ex: dispatchEvent(event)
        removeEventListener() method 
            removes an event listener
            ex: removeEventListener(type, listener)
                removeEventListener(type, listener, options)
                removeEventListener(type, listener, useCapture)
    AbortController Interface
        represents a controller object that allows you to abort one or more Web requests as and when desired.
        ex: controller = new AbortController();
            signal = controller.signal;
            response = await fetch(url, { signal });
            controller.abort()
*/

// Event Bubbling: default (useCapture=false)

// document.querySelector("#grand-parent")
//     .addEventListener("click", ()=>{
//         console.log("Grand Parent Clicked")
//     })
// document.querySelector("#parent")
//     .addEventListener("click", ()=>{
//         console.log("Parent Clicked")
//     })
// document.querySelector("#child")
//     .addEventListener("click", ()=>{
//         console.log("Child Clicked")
//     })
/*
output:
clicked on child 
    child click event
    parent click event
    grand parent click event
clicked on parent
    parent click event
    grand parent click event
clicked on grand parent
    grand parent click event
*/

// Event Capturing/Trickling (useCapture=true), comment above click events

// document.querySelector("#grand-parent")
//     .addEventListener("click", ()=>{
//         console.log("Grand Parent Clicked")
//     }, true)
// document.querySelector("#parent")
//     .addEventListener("click", ()=>{
//         console.log("Parent Clicked")
//     },true)
// document.querySelector("#child")
//     .addEventListener("click", ()=>{
//         console.log("Child Clicked")
//     },true)
/*
output:
clicked on child 
    grand parent click event
    parent click event
    child click event
clicked on parent
    grand parent click event
    parent click event
clicked on grand parent
    grand parent click event
*/

/*
    * Capturing cycle will run first, after Bubbling cycle will run if there is 
        if an element receives an event and if propogable elements have both Bubbling & Capturing
        first, all Capturing events (from top ancestor to element that received event) will run 
        after, all Bubbling events (from element that received event to top ancestor) will run  
*/

// Event Bubbling and Capturing/Trickling, comment above click events

// document.querySelector("#grand-parent")
//     .addEventListener("click", ()=>{
//         console.log("Grand Parent Clicked")
//     },true)
// document.querySelector("#parent")
//     .addEventListener("click", ()=>{
//         console.log("Parent Clicked")
//     },false)
// document.querySelector("#child")
//     .addEventListener("click", ()=>{
//         console.log("Child Clicked")
//     },true)
/*
output:
clicked on child 
    grand parent click event
    child click event
    parent click event
clicked on parent
    grand parent click event
    parent click event
clicked on grand parent
    grand parent click event
*/

// comment above click events

// document.querySelector("#grand-parent")
//     .addEventListener("click", ()=>{
//         console.log("Grand Parent Clicked")
//     },false)
// document.querySelector("#parent")
//     .addEventListener("click", ()=>{
//         console.log("Parent Clicked")
//     },true)
// document.querySelector("#child")
//     .addEventListener("click", ()=>{
//         console.log("Child Clicked")
//     },false)
/*
output:
clicked on child 
    parent click event
    child click event
    grand parent click event
clicked on parent
    parent click event
    grand parent click event
clicked on grand parent
    grand parent click event
*/

// stopPropagation

document.querySelector("#grand-parent").addEventListener(
  "click",
  () => {
    console.log("Grand Parent Clicked");
  },
  true
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("Parent Clicked");
    e.stopPropagation();
  },
  true
);
document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("Child Clicked");
  },
  true
);
/*
output:
clicked on child 
    grand parent click event
    parent click event
clicked on parent
    grand parent click event
    parent click event
clicked on grand parent
    grand parent click event
*/

/*
    Event Delegation
        adding event listeners to each and every elements will decrease the performance of website
        we can reduce the event listeners by adding single event listener to parent and handling it's children events in that.
        This is possible because of Event Bubbling, where children events propagate to parent
        Pros 
            saves memory because we are using 1 listener for all children
            less code
            less DOM manipulation
                in infinite scrolling, elements will keep on adding and event listeners will be added for each 
                this can be avoided with Event Delegation
        Cons
            not all events are bubbled up, ex: blur
            if stopPropagation is used in any children, event won't bubbled up
*/

document.getElementById("category").addEventListener("click", (e) => {
  console.log(e.target.id, "button clicked");
});
document.getElementById("form").addEventListener("keyup", (e) => {
  if (e.target.dataset.uppercase != undefined) {
    e.target.value = e.target.value.toUpperCase();
  }
});

/*  
    Debouncing & Throttling 
        these are approches to handle events to improve performance.
        Throttling is used to rate limit the function call
        Search bar usecase 
            if we call API everytime key pressed, it will cause performance issues
            Debouncing
                delays the execution of a function until a certain amount of time has passed 
                since the last event's occurrence.
                only call API if time difference between keypress events is > 300ms
                skip or avoid API calls if difference between keypress is << 300ms 
                removes unneccesary calls to api when keypress events come very fast.
                ex: typing, search and autocomplete
            Throttling
                limits the number of times a function is executed over a certain time period.
                only call API after 300ms from last call.
                ex: scrolling, mouse events
            Debouncing is usefull and widely used in this case
        Track how many times user resizes the browser window
            when user is resizing, there will be thousands of events(like event for each px change)
            Debouncing
                only call API if time difference between two events is > 100ms
            Throttling
                only call API after 100ms from last call.
                it will ignore all the events in that 100ms
            Throttling is usefull and widely used in this case
        Gun Fire button
            when user is clicking fire button continuously
            rule: can fire only after 300ms
            Debouncing
                only fire if time difference between two events is > 300ms
            Throttling
                only fire after 300ms from last fire event.
                it will ignore all the events in that 300ms
            Throttling is usefull and widely used in this case
*/

// Debouncing on search bar
getSearchData = () => {
  console.log("calling search data");
};

// simple debounce function
let debounceId;
let searchInput;
searchInput?.addEventListener("input", () => {
  clearTimeout(debounceId);
  debounceId = setTimeout(() => {
    getSearchData();
  }, 300);
});

// this function will return debounced function
const debounce = function (callback, delay) {
  let timeoutId;
  return function (...args) {
    // this function forms a Closure with debounce function lexical environment
    let context = this; // store context
    clearTimeout(timeoutId); // clears timer if another event comes before delay, first time timer is undefined

    timeoutId = setTimeout(() => {
      // creates timer on every event
      callback.call(context, ...args); // if no event comes before 300ms, this will run
    }, delay);
  };
};
const debounceSearchData = debounce(getSearchData, 300);

/*
//Debouncing in React,we create useState for search input value 
useEffect(()=>{
    const timer = setTimeout(()=>getSearchData(),300);
    // while typing, this component rerenders and useEffect is called
    // while component is unmounting, we remove the timer
    return {
        clearTimeout(timer)
    }
},[searchText])
*/

// Throttling on fire button, can only fired after the time limit
const Fire = () => {
  console.log("Shotgun Fired");
};
// simple throttle
let isThrottled = false;
let fire_btn;
fire_btn?.addEventListener("click", () => {
  if (!isThrottled) {
    Fire();
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 300);
  }
});

// throttle factory function
const throttle = function (callback, limit) {
  let enabled = true;
  return function (...args) {
    // this function forms a Closure with debounce function lexical environment
    let context = this; // store context
    if (enabled) {
      // call the function if enabled
      callback.call(context, ...args);
      enabled = false; // disable the function
      setTimeout(() => {
        enabled = true; // enable it after the time limit
      }, limit);
    }
  };
};

const throttleFire = throttle(Fire, 1000);

/*
    window.requestAnimationFrame()
        tells the browser you wish to perform an animation
        requests the browser to invoke callback before the next repaint
        frequency of calls to the callback will generally match the display refresh rate
        it only runs once, u need to call it again to recursively to animate again 
        useful when you are animating using js
    window.cancelAnimationFrame()
        to cancel the request 
*/
// add(1)(2)(3)(4)...() return sum of all
// return a function and check if next call have number or not
const add = function (a) {
  return function (b) {
    // return the function

    if (b) {
      // if there is 2nd call with number return add with add both and pass to a
      return add(a + b);
    }
    return a; // 2nd call without number, end of calls, a will be having sum of all
  };
};
// console.log(add(1)(2)(3)(4)())

// output: 10

/*
    default, async and defer 
        default
            if browser encounters a script tag, it will stop the parsing of html and fetch script src and runs it
            after script run, it will resume the parsing of html
            DOMContentLoad event waits for all scripts to execute
        async
            while browser parsing html, any of scripts with async will fetch the src asynchronously(parallelly)
            as soon as script is downloaded, html parsing stops and script is executed,
            which is not necessarily in the order in which they appear in the document.
            so it doesn't gaurantee the order of scripts execution
            if some scripts are dependent on other, avoid async
            usage 
                we can use async for analystics scripts which are independent of each other
            DOMContentLoad event does not waits for async scripts to execute             
        defer
            while browser parsing html, any of scripts with async will fetch the src asynchronously(parallelly)
            script will be executed after html parsing
            it will run scripts in order in which they appear in the document
            DOMContentLoad event fires after defer scripts are executed
*/

/* --- The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one! --- */

/*  Type Conversion vs Type Coercion 
        Type Conversion
            when we manually convert the type of a value 
        Type Coercion 
            when JavaScript automatically converts the type of a value
            + operator
                converts number to string
            -,*,/ operators
                converts string to number


*/
/* 
const year = '2000';
// Type Coercion 
console.log(year + 1);                  // JS converts 1 to string
// output:'20001'
console.log(year - 1);                  // JS converts '2000' to number
// output:1999
console.log('20' - '10' - 7);           // JS converts '20' and '10' to number
// output:3
console.log('3'*'10');           // JS converts '3' and '10' to number
// output:30
// Type Conversion 
console.log(Number(year) + 1);
// output:2001
console.log(Number('Hi'))               // returns Not a Number (NaN) which type is number
// output:NaN
console.log(String(10));
// output:'10' 
*/

/*  Truthy and Falsy values
        Falsy 
            0, '', undefined, null, NaN
            when converted to boolean, they become false
        Truthy
            all other values are Truthy values 
            when converted to boolean, they become true
*/
/* 
console.log(Boolean(0));            // output:false        
console.log(Boolean(undefined));    // output:false
console.log(Boolean(NaN));          // output:false
console.log(Boolean(null));         // output:false
console.log(Boolean(''));           // output:false
console.log(Boolean({}));           // output:true
*/

/*  
    DOM (document object model)
        gives u interface (document object) which is available in js 
        used to access and manipulate html 
    DOM Tree 
        representation of DOM which has parent and child relationship 
    DOM Traversing
        closest 
            it find closest parent which matches given query selector 
    document vs window object 
        window
            represents window/tab in browser
            global object, we can access it's properties directly like document
            setTimeout, setInterval are methods of window(browser related)
            innerHeight, innerWidth are some properties of window object
        document
            property of window object
            not global object, we can't access it's properties directly without calling document
            points to document loaded in that window
    BOM (browser object model)
        window object, which gives following objects related to browser
        screen, location, history, XMLHttpRequest(XHR)
        location object
            host, hostname, href, origin, path, protocol etc 

    Node Types 
        element node 
            like h1, div etc 
        text node 
            actual text of element
        comment node 
            <!-- some comment -->
        document node 
            Represents the entire document
        document type node 
            interface represents a Node containing a doctype.
*/
/*
    AJAX - Asynchronous JavaScript & XML 
        XML refers to XMLHttpRequest(XHR) class
        XMLHttpRequest class 
            used to fetch API 
            open()
                takes HTTP method, URL
            send()
                to initiate request
            onload property
                invokes callback after request is completed
            abort()
                to cancel the request
*/
// const request = new XMLHttpRequest();
// request.open('GET','https://jsonplaceholder.typicode.com/users')
// request.send()
// request.onload = function(){
//     console.log(request.response);
// }
/*
    fetch() API 
        url & optional object with various properties
        default it takes HTTP GET method

*/
/*
    Web Components
        HTML, CSS and JavaScript combination which u can encapsulate inside a container 
        which can function independently
        reusable custom HTML elements
        provides strong encapsulation
        web component creation 
            create class that extends HTMLElement class 
                will instantiated everytime we use the custom element tag
            define required html in constructor
            define custom html element using window.customElements.define
        if we have styles in our html, it will apply outside of component also 
        to solve this we have shadow DOM 
        shadow DOM 
            provides encapsulation to Web Components
            gives separate scope to the web component
            it is components own DOM 
            'open' mode 
                current page can access shadow DOM via JS 
                element.shadowRoot() return shadow DOM 
            'closed' mode 
                current page can't access shadow DOM via JS 
                element.shadowRoot() return null
        light DOM 
            when shadow DOM is there, we refer actual DOM as light DOM 
            to avoid confusion
        template tag 
            hold some html that will be hidden when the page loads
            JavaScript is used to clone and display it
        Dynamic data with custom attributes
            we can pass attributes to custom html element to use them in template
        connectedCallback()
            invoked after component is added to DOM
            we can change custom element attributes here to modify the component after an event occurs
        static get observedAttributes() 
            returns array of attributes to u want to keep watch on
        attributeChangedCallback()
            invoked when any observed attributes are modified
            here we update shadow DOM with new attributes data 
        this.remove()
            used to remove component from DOM 
        disconnectedCallback()
            invoked after component is removed from DOM 
            here we can remove event listeners
        slot element
            used to dynamically add html content inside component from custom element

*/
const template = document.createElement("template");
template.innerHTML = `
<style>
    h1 {
        color: red;
    }
</style>
Product Card Template
`;
class ProductCard extends HTMLElement {
  constructor() {
    super();
    const h1 = document.createElement("h1");
    h1.innerHTML = `
        <style>
            h1 {
                color: red;
            }
        </style>
        Product Card
        `;
    this.attachShadow({ mode: "open" });
    // this.shadowRoot.appendChild(h1)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
// defining custom element name
window.customElements.define("product-card", ProductCard);

//  Slider Component
const slider_data = [
  { text: "slide 1", color: "blue" },
  { text: "slide 2", color: "orange" },
  { text: "slide 3", color: "cyan" },
  { text: "slide 4", color: "green" },
];
function slider(data) {
  const slides_len = data.length;
  let curr_slide = 0;
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider_btn--left");
  const btnRight = document.querySelector(".slider_btn--right");
  const dotContainer = document.querySelector(".dots");
  const createDots = function () {
    data.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };
  const createSlides = () => {
    data.forEach(function (s, i) {
      slider.insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-color:${s.color};">${s.text}</div>`
      );
    });
  };
  createSlides();
  const slides = document.querySelectorAll(".slide");
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots_dot--active"));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add("dots_dot--active");
  };
  const goToSlide = function (slide) {
    // make translateX 0% for the slide, left slides have -% and right slides +% in 100's
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const nextSlide = function () {
    if (curr_slide === slides_len - 1) {
      curr_slide = 0;
    } else {
      curr_slide++;
    }

    goToSlide(curr_slide);
    activateDot(curr_slide);
  };
  const prevSlide = function () {
    if (curr_slide === 0) {
      curr_slide = slides_len - 1;
    } else {
      curr_slide--;
    }
    goToSlide(curr_slide);
    activateDot(curr_slide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots_dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider(slider_data);

/*  ES6 class 
        class is added in javascript 2015 version
        class is synthetic sugar coating on constructor function
        methods in class are added to prototype
        classes are not hoisted
    Static properties
        properties that are assigned to class, not the instance 
        ex: static count =  1; or Account.count = 1;
    Static methods 
        methods that are attached to constructor function or class, not prototype
        we can only access through class/constructor function, not in instances
        ex: static getCount(){} or Account.getCount(){} 
        this inside static method
            this points to Class itself, not instance 
        use cases 
            to ground related functions together 
            ex: Math.abs(), Math.round() etc 
    instanceof keyword
        ex: car instanceof Car; // true 
    Inheritance 
        ex: class Child extends Parent
        super()
            calls parent constructor
            if a constructor is defined in child class 
            we must call super with parent argument inside child constructor
            before initializing child arguments
    public fields in class (Field declarations)
        normal properties
        can also declare them above constructor
        Class Acc{
            count = 0;
            name;  // name = undefined 
        }
    private fields in class 
        can't access outside the class 
        must declare it above constructor first 
        property name starts with # 
        ex: #amt = 213
    private methods in class 
        can't access outside the class  
        function name starts with # 
        ex: #calculateAmt(){}
    ES2022 static initialization blocks 
        runs block of code only once when class is loaded
        ex: class Acc {
            static {
                console.log("Acc loaded")
            }
        }
*/
/* class Student {
    constructor(name,marks){
        this.name = name;
        this.marks = marks;
    }
    isPassed(){
        return this.marks>=50;
    }
    static bye(){
        console.log("Bye!");        
    }
}
const mahesh= new Student('mahesh',66);
console.log(mahesh.isPassed());
// Static methods
Student.hey = function (){
    console.log("hey there!")
}
Student.hey()
Student.bye() */

/*  
    ES6 Module vs Script
        module 
            top-level variables are scoped to module 
            executes in strict mode
            top level 'this' is undefined
            can import/export 
            type="module" in script tag
            file downloads in Async
            imports happens synchronously
            to use import/export locally u need to have a server
        script
            top-level variables are global scoped
            executes in sloppy mode
            top level 'this' is window
            cannot do import/export
    CommonJS module system
        each JS file is treated as a separate module
        Node.js uses CommonJS module system
            require(), exports or module.exports
        exporting 
            for single variable 
                module.exports = something;
                can you any name for importing
                ex:const anything = require('module-name')
            for multiple variables
                exports.something1 = 1;
                exports.something2 = 2;
                when imported, all these returned in object
                ex: const {something1,something2} = require('module-name')
        require()
            imports module in a js file 
            returns exports of the module 
            i.e. module.exports object in the module
            ./ points to root folder 
            not the folder in which file presents
            ex: require('path')
    ES6+ Features 
        Optional Chaining  (?.) 
            If the object accessed or function called using this operator is 'undefined' or 'null',
            the expression short circuits and evaluates to 'undefined' instead of throwing an error.
            ex: adventurer.dog?.name 
            ex: adventurer.someNonExistentMethod?.()
        Nullish coalesing (??)
            returns right hand operand when left hand operand is null or undefined
            only for null or undefined, not for false, 0 etc 
            usefull when we want to check only for null or undefined and other values are valid 
            in which (||) is not useful
            0 ?? "unknown" // 0 
            0 || "unknown" // unknown
        Numeric separators (_)
            numbers can be readable with (_)
            ex: 1_000_000
        Array.prototype.at()
            pass index to get value, supports negative index 
            [1,2,3].at(-1) // 3
        func.length 
            returns no of parameters expected by the function 
*/
/*
    Browser APIs 
        fetch()
            use to make network requests
            replaced old XMLHttpRequest 
            retrives data as readable stream 
            ex: res = await fetch(URL)
                data = await res.json()
            rejects the promise only when network or cors errors occurs
            to upload file, u pass formData object in body 
        localStorage 
            store key/value pairs in browser
            only supports strings, to store objects stringify them
            persistent across the sessions 
            ex: localStorage.setItem("hi","hello")
            localStorage.getItem("hi")
            removeItem() 
                to remove the item
            clear()
                to clear the localStorage
            storage event on window 
                triggers when there is change in storage
        sessionStorage 
            similar to localStorage but for single session 
            has same methods as localStorage
            won't persist in different tab or window 
            after closing tab, it is cleared 
            usecase: form data persist on refresh 
        IndexedDB 
            low level API for storing structured data, including large datasets
            similar to a database
        Geolocation API 
            allows users to share their location with web apps 
            navigator.geolocation property is used to check if browser supports 
            if permission is not given, these methods will automatically ask for permission
            getCurrentPosition()
                returns current location 
                takes success & failure callbacks 
            watchPosition()
                invoked everytime location changes
        getUserMedia API 
            used to access microphone, webcam etc 
            ex: navigator.mediaDevices.getUserMedia({video:true})
        Performance API 
            measure performance of web pages and apps 
            mark()
                marks currents point of time 
            measure()
                difference btw two marks 
                ex: measure("diff m1 and m2", 'mark1','mark2')
            getEntries()
                returns Performance object with all the entries it took 
        Web Audio API 
            processing and synthesizing the audio in webapps 
        Canvas API 
            drawing graphics via javascript and canvas element
        WebSocket API 
            real-time communication with client and server 
            connection is persistent and bi-directional 
            socket.onmessage
                runs everytime it receives data
            socket.send()
                to send a message
        Notifications API 
            send notifications to users          
*/
/*  Intersection Observer API 
        asynchronously observe changes in intersection of a target element with it's parent/viewport
        entries
            each entry describes an intersection change for each target element you are observing
            target 
                element that intersection is observed on 
                useful when observing multiple targets 
            isInterecting 
                true if target is intersecting with root 
            intersectionRatio 
                percentage of target intersecting with root 
                ex: 0.256773  
        observer arg
            used to unobserver target element
        root
            parent element to check the intersection of target element
            null for checking intersection with viewport(screen)
            Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
        rootMargin
            Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" 
            used to increase/decrease the size of the root(container)
        threshold
            Either a single number or an array of numbers (multiple thresholds)
            callback is fired for each if multiple thresholds given
            who much percentage of target should intersect before the callback is fired
            0 means, as soon as element intersect with root even a single pixel
            1 is total element
        use cases:
            revealing sections as we scroll 
            infinite scrolling 
            lazy loading images 
            ad visible time on screen etc 
*/
/* 
const target_ele = document.querySelector(".intersect");
const observer_callback = function(entries,observer){

    if(entries[0].isIntersecting){
        console.log("Element is visible on the screen")
    }else{
        console.log("Element is not visible on the screen")
    }
    // observer.unobserve(entries[0].target);
}
const observer_options = {
    root:null,
    threshold:[0,0.5]
}
const observer = new IntersectionObserver(observer_callback,observer_options);
observer.observe(target_ele) 
*/

/*
    SOLID Object-Oriented Principles
        Single Responsibility Principle (SRP)
            class should only have one responsibility 
        Open/Closed Principle
            behaviour of module can be extended without modifying it's source code 
        Liskov Substitution Principle (LSP)
            objects of superclass should be able to be replaced wth objects of subclass 
            without affecting the correctness of program 
        Interface Segregation Principle (ISP)
            A class should not be forced to implement interfaces it does not  use 
        Dependency Inversion Principle (DIP)
            High level modules (main app logic) should not depend directly on 
            low-level modules (like specific tools or libraries)
            both should depend on Abstraction (interfaces or general ideas)
    Design Patterns 
        Module Pattern 
            ensure private and public encapsulation protecting global namespace 
            and diminishing naming conflicts
            ex: IIFEs, private variables, higher order functions etc 
        Singleton Pattern 
            assures only one instance of class/object exists
            ex: db connection object etc 
        Observer Pattern
            subscription model where objects (observers) listen to events 
            and get notified when event occurs
            ex: DOM event listeners etc 
        Registry Pattern 
            store and retrieve instances of object/class
        Mixin Pattern 
            object that we can use in order to add reusable functionality to another
            object or class, without using inheritance. 
            make an object with useful methods, so that we can easily merge them into
            object or class using Object.assign() to add methods from that object
        Proxy Pattern 
            With a Proxy object, we get more control over the interactions with certain objects
            ex: instead of interacting with the target object directly, 
            we’ll interact with the Proxy object.
        

        


*/
