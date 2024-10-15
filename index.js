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
*/

// 1.
// getName()           // output: Javascript
// console.log(x)      // output: undefined
var x1 = 7;

function getName(){
    console.log("Normal function");
}





// 2. Arrow function behaves like a variable

// in memory allocation phase, getName1 is allocated with undefined
// getName1()          // output: TypeError: getName1 is not a function

var getName1 = () => {
    console.log("Arrow function");
}





// 3. function in a variable also behaves like a variable
// in memory allocation phase, getName2 is allocated with undefined
// getName2()          // output: TypeError: getName2 is not a function
var getName2 = function() {
    console.log("Javascript");
}





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
function a(){
    var b = 1;
    c();
    function c(){
        console.log(b);
    }
}
// a();                // output: 1





/*
    let
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
let c2 =  1;
{
    let c2 = 2;             // valid
}
var c3 = 1;
{
    let c3 = 3;             // valid
}


/*
    Spread operator (...variable)
        used to spread all values inside an array or object
    Rest operator (...variable)
        merge all the values into array
        also used in array destructuring to take remaining values into a array        
*/
// Spread operator 
const Person = {
    name:"John",
    age:30
}

const copiedPerson = {
    ...Person,
    height:6
}
// console.log(copiedPerson)
// Output: {name: 'John', age: 30, height: 6}


// Rest operator
function addAll(...args){
    // console.log(args)
}
addAll(1,2,3,6)
// Output: [1, 2, 3, 6]

// Rest operator in array destructuring
const list = [1,2,3,4,5];
const [first,second,...remaining] = list;
console.log(first,second,remaining)
// Output: 1 2 [3, 4, 5]


/*
    Closure
        function along with surrounding state (lexical environment) 
        gives access to another function's scope from an inner function
*/
// Closure
function x(){
    let ax = 10;
    function y(){
        // console.log(ax)
    }
    return y;
}

// after returning y function, y function still remembers it's lexical scope, means Closure is returned
var oy = x();               // after this execution context of x() will be removed/deleted
// oy();                       // output: 10

function z(){
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
function p(){
    for(var i=1;i<=5;i++){
        setTimeout(() => {
            // console.log(i);
        }, i*1000);
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
// every time loop runs, i is a new variable and function forms a Closure with it since i is block scoped
function p1(){
    for(let i=1;i<=5;i++){
        setTimeout(() => {
            // console.log(i);
        }, i*1000);
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
function p2(){
    for(let i=1;i<=5;i++){
        function log(x){
            setTimeout(() => {
                // console.log(x);
            }, x*1000);            
        }
        log(i)        
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





// function statement aka function declaration
function f1(){
    console.log("function")
}
// function expression
var f2 = function (){
    console.log("function")
}
// anonymous function, used when functions are used as values
// can't create functions without name, can be passed without name
/*function (){
    
}
*/
// parameters vs arguments
function f3(param1,param2){
    console.log("function")
}
// values which are passed are arguments
// f3(1,2)

// map: to transform an array
const arr = [1,2,3,4]
function double(n){
    return n*2;
}
const output = arr.map(double)
// console.log(output)

// filter: to filter an array 
const nums = [1,2,3,5,4,6]
function isOdd(n){
    return n%2;
}
const odd_nums = nums.filter(isOdd);
// console.log(odd_nums);

// reduce 
const numbers = [1,2,3,4,5]
const initialValue = 0;
function findSum(accumilator,current){
    accumilator = accumilator + current;
    return accumilator;
}
const sum = numbers.reduce(findSum,initialValue)
// console.log(sum);

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
// Promise: with promise we attach the callback function, instead of passing 
// this way we gain the control over callback functions
// with Promise
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
const GITHUB_USER_API = "https://api.github.com/users/Sunnymaharshi"
const user = fetch(GITHUB_USER_API)

// console.log(user)          // output: Promise {<pending>}
user.then(function (data){
    // console.log(data);
})

// Promise Chain and Promise creation
// * We need to return data coming from 1 promise to pass it to next Promise in Promise Chain
// * catch block only handles errors from above it, means putting catch at the end will handle all the errors
// * we can add catch for each then blocks
// * 'then's after the catch will run no matter errors above it comes or not
const cart  = ["shirts","pants","dresses"]

function createOrder(cart){
    const pr = new Promise(function (resolve,reject){
        if(!validateCart(cart)){
            const err = new Error("Cart is not valid");
            reject(err);
        }
        const orderID = "1234"
        if(orderID){
            setTimeout(function (){
                
                resolve(orderID)
            },3000)
        }
    })

    return pr;
}
function validateCart(cart){
    return true;
}
function proceedToPayment(orderID){
    return new Promise(
        function (resolve,reject){
            resolve("Payment Successfull")
        }
    )
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
const pr4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Promise value 3000");
    },3000);
})
const pr5 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Promise value 5000");
    },5000);
})

// normal way of resolving a Promise
function handlePromise1(){

    // JS Engine will not wait for promise to resolve 
    pr4.then((res)=>{
        console.log(res)
    })
    console.log("1. after promise")
}
// handlePromise1()
/* output:
1. after promise
Promise value 3000
*/

// resolving promise using async and await
async function handlePromise2(){
    
    // JS Engine will suspend handlePromise2(removed from Call Stack), and start from where it left after pr4 resolved
    const val1 = await pr4;
    console.log("after await 1")
    console.log(val1)
    // JS Engine will suspend handlePromise2(removed from Call Stack), and start from where it left after pr5 resolved
    const val2 = await pr5;
    console.log("after await 2")
    console.log(val2)

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
async function handlePromise3(){
    
    // JS Engine will suspend handlePromise2(removed from Call Stack), and start from where it left after pr4 resolved
    const val1 = await pr5;
    console.log("after await 1")
    console.log(val1)
    // pr5 has already been resolved
    const val2 = await pr4;
    console.log("after await 2")
    console.log(val2)

}
// handlePromise3()
/* output: 
after await 1
Promise value 5000
after await 2
Promise value 3000
*/

// fetch with async and await
async function handleFetch(){
    // fetch will returns a Promise
    try {
        const data = await fetch(GITHUB_USER_API);
        // json() return a Promise
        const jsonValue = await data.json();
        console.log("user data json",jsonValue)
    }
    catch(err){
        console.log(err)
    }
}
// handleFetch();

/* 'this' keyword
    this keyword refers to the context where a piece of code is supposed to run
    * value of this in JavaScript depends on how a function is invoked (runtime binding), not how it is defined. 
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
    this in DOM elements 
        Reference to that HTMLElement
        usage: this.tagName etc

*/
// this in Global Scope

// console.log(this);          
// output: window:{...}

// this in a function
function func(){
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
    a:1,
    x: function () {
        console.log(this)
    }
}
// obj.x()
// output: obj

/*
    this inside Arrow function
        arrow function doesn't create it's own execution context, it just uses context where it is defined.
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
    a:1,
    x:  () => {
        console.log(this)
    },
    y: function (){
        console.log(this)
    }
}
// obj2.x()
// output: window:{...}
// obj2.y()
// output: obj2

// this inside nested arrow function
// here enclosing lexical context is method x for which this is obj3
const obj3 = {
    a:1,
    x: function () {
        // enclosing lexical context

        const fun = () => {
            console.log(this)
        }
        fun()
    } 
}
// obj3.x()
// output: obj3
/*
    function borrowing 
    call, apply and bind
        with these you can write a method that can be used on different objects.
        these can refer this to any object.
    call
        first argument is value of this
        next we pass function arguments separately
    apply 
        first argument is value of this
        next we pass function arguments as an array 
    bind 
        it creates a new function and when it called, calls it with 'this' keyword set to the provided value
        when a function is used as a callback, this is lost. so the bind() is used to prevent losing this.
        first argument is value of this
        next we pass function arguments separately
*/
function printFullName(homeTown){
    console.log(this.firstName + " " + this.lastName + " from "+ homeTown)
}
let student1 = {
    firstName:"Sunny",
    lastName:"Reddy"
}
let student2 = {
    firstName:"Maharshi",
    lastName:"Reddy"
}
// call
// printFullName.call(student1,"Andhra")
// output: Sunny Reddy from Andhra

// apply
// printFullName.apply(student2,["Telangana"])
// output: Maharshi Reddy from Telangana

// bind 
let printMyFullName = printFullName.bind(student1,"Andhra");
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
    firstName:"John",
    lastName: "Doe",
    display: function () {
      console.log(this.firstName + " " + this.lastName);
    }
}
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
        instead use Prototype for adding methods
        ES6 class is synthetic sugar of constructor function
*/

function Human(name,home){
    this.name = name
    this.home = home
    this.talk = function (){
        console.log(this.name, "talking")
    }
}
const john = new Human("John","London")
// console.log(john)
/* output:
{name: 'John', home: 'London', talk: ƒ}
*/





/*    Prototypal Inheritance 
        Prototypes are the mechanism by which JavaScript objects inherit features(properties & methods) from one another. 
        __proto__ 
            it is property of every variable, which has all methods and properties that are inherited from it's parent constructor function or class
        prototype
            constructor functions and classes will have prototype property 
            it has all properties and methods which are shared with instances
            by using this you can add properties and methods to any object
        whenever we are access any property/method
            first loopup happens inside the instance if not found, then inside it's __proto__ and so on upto it goes to Object class
            Object is parent of all variables/functions in JavaScript
        date objects inherit from Date.prototype
        array objects inherit from Array.prototype
        normal objects, Date and Array inherit from Object.prototype
        Object.prototype is on the top of the prototype inheritance chain
            Object.__proto__ is null
            since it is base for all and won't inherit from anything            
*/

function Person(){                          // constructor function
    this.talk = function(){
        console.log("Person talking")
    }
    this.age = 30;
}

const sunny = new Person()

sunny.age = 20;                             // age in sunny is shadowing age in Person
sunny.talk = function (){                   // talk in sunny is shadowing talk in Person
    console.log("Sunny talking")
}

// console.log("Sunny age:",sunny.age)
// output: 20

// sunny.talk()
// output: Sunny talking

// console.log(sunny.__proto__ === Person.prototype)
// output: true


// adding custom method to all functions
// same can be done to any object
Function.prototype.printMyFullName = function (){
    console.log("Maharshi Reddy")
}

function xyz (){

}

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
    firstName:"sunny",
    lastName:"reddy"    
}
function printStudent(homeTown, state){
    console.log(this.firstName,this.lastName,homeTown,state)
}
Function.prototype.mybind = function(...args){

    let fun = this; 
    let new_obj = args[0];
    let other_args = args.slice(1);
    return function(...new_args){
        fun.call(new_obj,...other_args,...new_args);
    }
}
const printStudent2 = printStudent.mybind(student,"atp")
// printStudent2("AP");
// output: sunny reddy atp AP





/*  
    Function Currying 
        used to transform a function that takes multiple arguments into a sequence of functions that each takes a single argument.
        can be done using bind or Closures        
*/
let multiply1 = function (x,y){
    console.log(x*y);
}
// using bind
let multiplyByTwo1 = multiply1.bind(this,2)
// multiplyByTwo1(2)
// output: 4

// using Closure - nested function have access to surrounding state (the lexical environment).
function multiply2(x){
    return function(y){
        console.log(x * y);
    }
}
let multiplyByTwo2 = multiply2(2)
// multiplyByTwo2(2)
// output: 4

/*
    Pure Functions
        functions that produce the same output for a particular input every time they are called
        they have no side effects and do not rely on external state or mutable data.
        side effects 
            Mutating your input
            console.log
            HTTP calls (AJAX/fetch)
            Changing the filesystem (fs)
            Querying the DOM
*/


/*
    Event Flow in DOM 
        events are processed in 3 phases 
        1.Capturing Phase 
            by default, it won't happen
            1st phase
            pass true as 3rd argument to addEventListener to enable it
            if it is enabled, event handlers are triggered in the capturing phase.
        2.Target Phase 
            target element is the element where the event originally occurred
        3.Bubbling Phase
    Event Propagation 
        order in which elements receive the event.
        * when an element receives an event, that event will propogate to it's ancestors not to it's children
        Propagation order can be controlled by changing 3rd argument(useCapture) to true/false in addEventListener
    Event Bubbling 
        default behaviour of event propagation, default 3rd argument(useCapture)' is false
        bubbling up to parent elements
        when an element receives an event, it runs on itself, then it's parent and so on upto top ancestor element.            
    Event Capturing/Trickling
        can be enabled by passing true as a 3rd argument(useCapture) to the addEventListener
        Captured down to child element
        when an element receives an event
            first it's top ancestor event runs, then it's child and so on upto element that received the event.  
    Stop Propagation
        we can stop the propagation by using e.stopPropagation().
        order of propagation will depends on useCapture value, 
        propagation will stop at the element which has e.stopPropagation()   
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

document.querySelector("#grand-parent")
    .addEventListener("click", ()=>{
        console.log("Grand Parent Clicked")
    },true)
document.querySelector("#parent")
    .addEventListener("click", (e)=>{
        console.log("Parent Clicked")
        e.stopPropagation();
    },true)
document.querySelector("#child")
    .addEventListener("click", ()=>{
        console.log("Child Clicked")
    },true)
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

document.getElementById("category").addEventListener('click',(e)=>{
    console.log(e.target.id,"button clicked")
})
document.getElementById("form").addEventListener('keyup',(e)=>{
    if(e.target.dataset.uppercase != undefined){
        e.target.value = e.target.value.toUpperCase()
    }    
})


/*  
    Debouncing & Throttling 
        Throttling is used to rate limit the function call
        Search bar usecase 
            if we call API everytime key pressed, it will cause performance issues
            Debouncing
                only call API if time difference between keypress events is > 300ms
                skip or avoid API calls if difference between keypress is << 300ms 
                removes unneccesary calls to api when keypress events come very fast.
            Throttling
                only call API after 300ms from last call.
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
getSearchData = ()=>{
    console.log("calling search data");
}
// this function will return debounced function
const debounce = function (func, delay){
    let timer;          
    return function (){                      // this function forms a Closure with debounce function lexical environment
        let context = this,args = arguments;        // store context and arguments
        clearTimeout(timer);            // clears timer if another event comes before delay, first time timer is undefined

        timer = setTimeout(()=>{                    // creates timer on every event
            getSearchData.call(context,...args)       // if no event comes before 300ms, this will run
        },delay)
    }

}
const debounceSearchData = debounce(getSearchData,300);

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
const Fire = ()=>{
    console.log("Shotgun Fired");
}
const throttle = function (func,limit){

    let enabled = true;   
    return function (){                     // this function forms a Closure with debounce function lexical environment
        let context = this,args = arguments;        // store context and arguments              
        if(enabled){                                // call the function if enabled
            func.call(context,...args);
            enabled = false;                        // disable the function
            setTimeout(()=>{
                enabled = true                      // enable it after the time limit
            },limit);
        }
    }
}

const throttleFire = throttle(Fire,1000);




// add(1)(2)(3)(4)...() return sum of all 
// return a function and check if next call have number or not
const add = function (a){

    return function (b){        // return the function 

        if(b){                  // if there is 2nd call with number return add with add both and pass to a
            return add(a+b);
        }
        return a;               // 2nd call without number, end of calls, a will be having sum of all
    }
}
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

/*  DOM Traversing
        closest 
            it find closest parent which matches given query selector 
*/
//  Slider Component 
const slider_data = [{text:"slide 1", color:"blue"},{text:"slide 2", color:"orange"},{text:"slide 3", color:"cyan"},{text:"slide 4", color:"green"}]
function slider(data){
    const slides_len = data.length;
    let curr_slide = 0;
    const slider = document.querySelector('.slider');
    const btnLeft = document.querySelector('.slider_btn--left');
    const btnRight = document.querySelector('.slider_btn--right');
    const dotContainer = document.querySelector('.dots');
    const createDots = function () {
        data.forEach(function (_, i) {
          dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots_dot" data-slide="${i}"></button>`
          );
        });
    };
    const createSlides = ()=>{
        data.forEach(function (s,i) {
            slider.insertAdjacentHTML('beforeend',`<div class="slide" style="background-color:${s.color};">${s.text}</div>`)
        })
    }
    createSlides();
    const slides = document.querySelectorAll('.slide');
    const activateDot = function (slide) {
        document
          .querySelectorAll('.dots_dot')
          .forEach(dot => dot.classList.remove('dots_dot--active'));
    
        document
          .querySelector(`.dots_dot[data-slide="${slide}"]`)
          .classList.add('dots_dot--active');
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
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots_dot')) {
          const { slide } = e.target.dataset;
          goToSlide(slide);
          activateDot(slide);
        }
    });

}
slider(slider_data);
/*  Intersection Observer API 
        asynchronously observe changes in the intersection of a target element 
        with an ancestor element or with a top-level document's viewport(screen).
        root
            The element that is used as the viewport for checking visibility of the target. 
            Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
            container in which we observe target element visibility
        rootMargin
            Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" 
            used to increase/decrease the size of the root(container)
        threshold
            Either a single number or an array of numbers which indicate at what percentage of the target's visibility 
            the observer's callback should be executed.
        use cases
            revealing sections as we scroll 
            infinite scrolling 
            lazy loading images etc 
*/
/* 
const intersect_ele = document.querySelector(".intersect");
const observer_callback = function(entries,observer){
    // Each entry describes an intersection change for each element u r observing
    // currently we are only observing for single element (intersect_ele)
    // observer argument is used to unobserver target element
    // single entry because we only observing 1 element
    if(entries[0].isIntersecting){
        console.log("Element is visible on the screen")
    }else{
        console.log("Element is not visible on the screen")
    }
    // observer.unobserve(entries[0].target);
}
const observer_options = {
    // null for checking intersection with viewport(screen)
    root:null,
    // min percentage the element should intersect(visible) inside root
    // callback will called for each threshold in the array
    // 0 means, as soon as element visible inside root even a single pixel
    threshold:[0,0.5]
}
const observer = new IntersectionObserver(observer_callback,observer_options);
observer.observe(intersect_ele) 
*/

/*  ES6 class 
        class is synthetic sugar coating on constructor function
        methods in class are added to prototype
        classes are not hoisted
    Static methods 
        methods that are attached to constructor function or class, not prototype
        we can only access through class/constructor function, not in instances
        created with dot(.) on class or with 'static' keyword before method
        ex:Number.parseFloat()
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

/*  ES6 Module vs Script
        module 
            top-level variables are scoped to module 
            executes in strict mode
            top level 'this' is undefined
            can import/export 
            type="module" in script tag
            file downloads in Async
            imports happens synchronously
        script
            top-level variables are global scoped
            executes in sloppy mode
            top level 'this' is window
            cannot do import/export
*/