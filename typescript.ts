
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
        Typescript adds 
            Types 
            Next-gen JavaScript features (compiled to regular JS for older browsers)
            Non-JavaScript features like Interfaces, Generic etc 
            Meta Programming features like Decorators etc
            Rich Configuration Options
        Core Types 
            core primitive types in TypeScript are all lowercase.
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
                
        Type Inference feature
            if type is not specified, TypeScript automatically adds type to variables
            for both primitive and object according to assigned value
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

firstName = 1;
// Compile Error: Type 'number' is not assignable to type 'string'.

// when value is not assigned immediately u can specify type 
let days:number;