/*  JavaScript
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

    Lexical environment
        whenever execution context is created, Lexical environment is created.
        it is local memory along with lexical environment of it's parent
        for global execution context, parent lexical environment  points to null
    Scope Chain
        whenever we are using  variable 'b' in a function, b will be searched in local memory
        if it's not found, b will be searched in parent lexical environment of the function.
        this goes until b is found or we reach lexical environment is null which is global scope.
    
    let
        these variables are hoisted in different memory space (ex:Script) instead of Global.
        we can't access these until they are initialised.
        if we try to access before initialisation we get Reference error: Cannot access before initialisation
        can be re-initialised

    Temporal Dead Zone 
        A variable declared with let, const, or class is said to be in a "temporal dead zone" (TDZ) 
        from the start of the block until code execution reaches the place where the variable is declared and initialized.
        aka the block until let/const/class is initialised
        aka block where a variable is inaccessible until the moment the computer completely initializes it with a value.
        While inside the TDZ, the variable has not been initialized with a value, and any attempt to access it will result in a ReferenceError.
        to avoid errors because of TDZ, move all ur declarations and initialisations to the top
    
    const 
        same as let, with more strict rules
        must be initialised at the time of declaration
        cannot be re-initialised

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

    Closure
        function along with surrounding state (lexical environment) 
        gives access to another function's scope from an inner function
    
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

*/

// 1.

getName()           // output: Javascript
console.log(x)      // output: undefined

var x1 = 7;

function getName(){
    console.log("Javascript");
}

// 2. Arrow function behaves like a variable
// in memory allocation phase, getName1 is allocated with undefined

// getName1()          // output: TypeError: getName1 is not a function

// var getName1 = () => {
//     console.log("Javascript");
// }

// // 3. function in a variable also behaves like a variable
// // in memory allocation phase, getName2 is allocated with undefined

// getName2()          // output: TypeError: getName2 is not a function

// var getName2 = function() {
//     console.log("Javascript");
// }


// Scope Chain 
function a(){
    var b = 1;
    c();
    function c(){
        console.log(b);
    }
}
a();                // output: 1


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

// Block Scope and shadowing

var b1 = 100;
let b4 = 10;
{
    var b1 = 1;
    let b2 = 2;
    const b3 = 3;
    let b4 = 4;
    // b1 shadowed b1 in global scope and it re-initialised b1, since both are pointing to Global Scope
    console.log(b1);        // output: 1
    console.log(b2);        // output: 2
    console.log(b3);        // output: 3
    // b4 shadowed b4 in global scope, both are in different scopes, as let is block scoped. same for const also
    console.log(b4);        // output: 4
}
console.log(b1);            // output: 1
// console.log(b2);         // output: ReferenceError: b2 is not defined
// console.log(b3);         // output: ReferenceError: b3 is not defined
console.log(b4);            // output: 10

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

// Closure
function x(){
    let ax = 10;
    function y(){
        console.log(ax)
    }
    return y;
}
// after returning y function, y function still remembers it's lexical scope, means Closure is returned
var oy = x();               // after this execution context of x() will be removed/deleted

oy();                       // output: 10

function z(){
    let m = 3;
    // execution won't pause here for 1000ms, setTimeout will stores this callback function (Closure) and attaches a timer
    // function will run after timer ends
    setTimeout(function () {        
        console.log(m);
    }, 1000);
    console.log("After setTimeout")
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
            console.log(i);
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
            console.log(i);
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
                console.log(x);
            }, x*1000);            
        }
        log(i)        
    }
}
p2();
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
f3(1,2)

// map: to transform an array
const arr = [1,2,3,4]
function double(n){
    return n*2;
}
const output = arr.map(double)
console.log(output)

// filter: to filter an array 
const nums = [1,2,3,5,4,6]
function isOdd(n){
    return n%2;
}
const odd_nums = nums.filter(isOdd);
console.log(odd_nums);

// reduce 
const numbers = [1,2,3,4,5]
const initialValue = 0;
function findSum(accumilator,current){
    accumilator = accumilator + current;
    return accumilator;
}
const sum = numbers.reduce(findSum,initialValue)
console.log(sum);
