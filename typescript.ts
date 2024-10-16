
/*
    Typescript 
        JavaScript Superset 
        Adds new features and Advantages to JavaScript
        Can't be executed by JavaScript environments like browser,node.js
        It is also a powerful compiler that compiles Typescript code to JavaScript
        Identifys errors at compile time that might occur in runtime (like type checking)
        automatically highlights errors in .ts file 
        Typescript type system only helps you during development (i.e before code gets compiled)
        Typescript compiles .ts file and outputs .js file  contains just normal JavaScript 
        output .js file contains just normal JavaScript without any Typescript code like types etc
        TypeScript can also transpiles modern JavaScript into older JavaScript if configured.
        Typescript adds 
            Types 
            Next-gen JavaScript features (compiled to regular JS for older browsers)
            Non-JavaScript features like Interfaces, Generic etc 
            Meta Programming features like Decorators etc
            Rich Configuration Options
        Core Types 
            core primitive types in TypeScript are all lowercase.
            below types are available in JavaScript also
            number 
                all numbers and floats 
                ex:1,-5,1.3
            string 
                any text that is inside '' or "" or ``
                ex: "hello"
            boolean
                true,false
            object
                we can specify 'object' type to any object
                and we can add type for object properties also like below
                we separate object properties types with ;
                ex:const student: {
                    name:string;
                    age:number;
                } = {
                 name:"",
                 age:20,
                }
            array
                array of numbers
                ex: let nums: number[];
                array that contains any type
                ex: let list: any[];
            Types that are added in TypeScript:
            Tuple
                fixed length and type array 
                we can specify multiple primitive types in the array
                ex: [string,number]
                here array will always be of length 2 and first element holds 
                always string and 2nd element will always holds a number
                push() operation is exception in Tuple, is allowed
            Enum
                Automatically enumerated global constant identifiers 
                by default, incremental value start with 0
                ex: enum {ADMIN,READ_ONLY}
                here ADMIN is 0, READ_ONLY is 1
                if u want to starting number as someother number 
                assign that number to first enum variable
                like enum {ADMIN=3,READ_ONLY}
            any
                means any type 
                typescript does not check type for this type
            Union
                used to specify more than 1 type 
                when u want to accept multiple type for a variable
                add pipe(|) to add multiple types
                ex: inputVar : string | number
            Literal Types 
                we specify values that are acceptable to a variable
                ex: let a:"right" | 2;
                now a can have either right or 2 as values
            Type Aliases / Custom Types 
                used to create our own custom types
                ex: type Input = number | string;
            'Function' type
                we can give Function as a type for variable
                let addition: Function;
            'unknown' type 
                more strict than any 
                if u want to assign a var to this type of variable
                u need to check it's type after that assign that
                
        Type Inference feature
            if type is not specified, TypeScript automatically adds type to variables
            for both primitive and object according to assigned value
        
        function return type 
            we can add type for function return value
            ex: function add():number{...}
            void return type
                if function does not return anything
        function as a type 
            we can give function with arguments and return type as a type 
            this is more specific than 'Function' type
            ex: let addition: (a:number,b:number)=>number;
            here argument names need not be same as actual arguments
        'never' type
            used for a function which never returns anything
            ex: function which throws an error never returns anything
            as function execution stop at throw statement
        
        class in typescript (different than class in JS)
            these keywords are added in typescript, not there in JavaScript
            private and public keywords
                to make properties or methods private or public
            readonly keyword
                to make a property readonly
                ex: private readonly name; inside class
        
        Interface (not there in JavaScript)
            it is purely development purpose, it won't appear in compiled JS
            Interfaces are similar to type aliases, 
            except they only apply to object types.
            can't store union types
            Usually objects structures are defined in Interfaces
            classes can implement the Interfaces means class that
            implements a interface must define properties and methods in the interface
            can have 'readonly' properties (but not public, private etc)
            interface can extend other interface
            can used create a function type
            optional properties or methods
                add ? after name of property or methods to make them optional
                can do same in classes also

*/
/*
    Adding type to function arguments
        we add : and type after the arguments
*/
function Add(num1:number,num2:number){
    return num1+num2;
}
// here adding type is redundant and bad practice 
// as TypeScript automatically determines type when value is assigned immediately
let n:number = 1;

// here typescript automatically assigns type to variable
let firstName = "Joe";

// firstName = 1;
// Compile Error: Type 'number' is not assignable to type 'string'.

// when value is not assigned immediately u can specify type 
let days:number;

// Tuple 
const admin : {
    name:string;
    role:[number,string]
} = {
    name:"John",
    role: [2,"admin"]
}

// ***Allowed***
admin.role.push("hi")

// ***Not allowed***
// admin.role[1] = 3;
// admin.role = []
// admin.role = [3,"dev","software"]

// Enum 
enum Role {ADMIN,READ_ONLY,AUTHOR}
console.log(Role.ADMIN,Role.READ_ONLY,Role.AUTHOR)
// Output: 0,  1,  2 

// Literal Types 
let a : 1 | "Hi";

// a= 10;
// Compile Error: Type '10' is not assignable to type '1 | "Hi"'

// Type Alias / Custom type
type Input = number | string;
type User = { name: string; age: number };

// function as a type 
let addition :(a:number,b:number)=>number;

// never type - function never returns anything
function generateError(msg:string):never{
    throw {error:msg,code:500}
}
// generateError("error")

// Interface

interface Student {
    name:string;
    age:number;
    greet(phrase:string):void;
    surname?:string;
}

let akash:Student;

akash = {
    name:"akash",
    age:14,
    greet(phrase:string){
        console.log(phrase + ' ' + this.name)
    }
}

// akash.greet("Hi there! I'm")
// Output:Hi there! I'm akash

// Interface for function type
interface AddFn {
    (n1:number,n2:number):number;
}

/*
    Advanced Types 
        Intersection types 
            to create a new type by intersecting two type aliases or Interfaces
            combiles all properties and common properties only appear once in resulting type
            ex: type ElevatedEmploye = Admin & Employee
            for union types 
                it will only take types that are common in both
        Type cast HTML elements
            added HTMLElement type explicitly
            ! at end specifies that value will never be null
            type is added in <> before expression
            or add type after 'as' at end of expression (usefull React)
        Index properties
            if u don't know all the properties 
            u can add the type of properties and values
    Generic Types 
        Type which is connected with other types and expects to provide a type 
        that will be used 
        ex: const arr:Array<string> = ["1","2"]
        extends is used to contraint the types that are allowed
        can extend interface also which tells all properties must be there in incoming type
        keyof constraint
            tells that input arg is must be a key of certain object
            ex: U extends keyof T 
        similar to Generic functions we create Generic classes
        Partial 
            is used to make all of type properties optional
            ex: Partial<Person>
    Decorators
        it is function u apply to something ex: class
        it will run before class is executed (not instantiating)
        can add decorator to property
        
*/

// Type casting
const input1 = <HTMLInputElement>document.getElementById("input1")!
const input2 = document.getElementById("input2")! as HTMLInputElement;
// console.log(input.value)

// Index properties
interface ErrorTemplate {
    [prop:string]: string;
}
const obj: ErrorTemplate = {
    msg: "err",
    time: "5:00AM",
    //code: 500,
}

// Generic functions

function merge<T extends object,U extends object>(obj1: T, obj2: U){
    // merges both objects
    return Object.assign(obj1,obj2);
}

const mergerdObj = merge({name:"xyz"},{age:20})

/*
    3rd party libraries (built in Vanila JavaScript)
        when we use these inside ts file, typescript will show errors 
        but compiles correctly 
        to remove these errors because types are not there (in Vanila JS)
        we can install "types library" for that 3rd party library
        ex: @types/lodash for lodash library
*/