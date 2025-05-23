/*
    node.js
        Javascript runtime built on google opensource V8 engine
    Event Loop
        allows Node.js to perform non-blocking I/O operations
        despite the fact that a single JavaScript thread is used by default
        by offloading operations to the system kernel whenever possible.
        makes asynchronous possible
        runs all app code that is inside callback functions 
        i.e. not top level code ?
        manages all the asynchronous operations. 
        It constantly checks for new events in the Callback queue and processes them in a loop.
        Callback queue
            contains callbacks, timers, and I/O events, that are generated as a result of
            asynchronous operations. These events are added to the queue when they are
            triggered but are not executed immediately.
        Macro-task queue or Task queue
            ex:setTimeout, setInterval, and setImmediate.
        Micro-task Queue
            higher priority than regular callbacks & Macro tasks
            ex: Promise callbacks, process.nextTick() etc       
        priority
            expired timer callbacks
            I/O pooling and callbacks
            setImmediate callbacks
            close callbacks
        The event loop can be blocked by high CPU-bound operations
        To avoid blocking the event loop, CPU-bound operations should be 
        offloaded to worker threads or other processes.
        dont block Event Loop
            Don't use sync versions of functions like readFileSync
            Don't perform complex calculations 
            be careful with JSON in large objects 
            Don't use too complex regular expression 
    module 
        node runs all code of module inside a wrapper function
        function has arguments: exports,require,module,__filename,__dirname
        that's why are able to access these variables inside a module
        modules are cached after execution, means they only executed once
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
    fs module
        readFileSync
            reads file Synchronously
        readFile
            reads file Asynchronously
        relative path always takes folder in which file is running at root folder 
        not the folder in which file is running
        __dirname is usefull for giving relative path
    http module
        createServer
            to create a server 
        listen
            listens on specified port and host
    url module
        parse
            parse query string in url
    util module 
        promisify
            makes asynchronous function return promise
    npm 
        software/package registry
        node package manager 
        regular dependencies
            packages that are needed to run the app
        dev dependencies
            packages that are needed only in development of app
        npm outdated
            lists outdated packages
        package-lock.json
            contains exact versions of packages
    events module
        we can emit our custom events and listen
        emit()
            to emit an event
        on()
            to listen to an event and run a callback back
    streams
        process (read or write) data piece by piece 
        without completing whole read or write operation
        means without keeping all the data in memory
        readable streams
        writable streams
        duplex streams
            both readable and writable
            ex: net web socket
        transform streams
            duplex streams that transform data as it is written or read 
            ex: Gzip creation
        
    CommonJS module system
        each JS file is treated as a separate module
        Node.js uses CommonJS module system
            require(), exports or module.exports
    
    ES module system
        it is used in browsers
        import module; export something;  
    Environment variables
        can define env variables in config.env 
        dotenv package
            to set env variables on node 
            ex:dotenv.config({
                path: './config.env',
            });
    REST Architecture
        Representational State Transfer
        architectural style for providing standards between computer systems 
        on the web, making it easier for systems to communicate with each other.
        1.Separate API into logical resources
        2.Expose structured, resource-based URLs 
            ex: /users, /posts etc
        3.use HTTP methods to perform actions on resource
            Create 
                POST 
            Read 
                GET 
            Update
                PUT,PATCH 
            Delete
                DELETE            
        4.Send data as JSON (usually)
        5.Be stateless
            all state is handled at client side 
            each request must contain all the info required to process it 
            server should never remember previous requests      
    ndb package
        debugger for node.js
        opens node.js code in new chrome window with devtools 
        features
            break points 
    handling unhandled promise rejections globally
        process.on('unhandledRejection', (err) => {
            console.log(err.name, err.message);
        });
    handling uncaught exceptions globally
        process.on('uncaughtException', (err) => {
            console.log(err.name, err.message);
            console.log('Uncaught Exception! Shuting down...');
        
        });
    EventEmitter 
        core class in node.js that facilitates the emission and 
        handling of events. it allows u to create and listen to events.
        methods 
            on - add listener 
            off - remove listener 
            emit - triggers the event 
    JSON WEB TOKEN (JWT) Authentication
        after login 
            server
                unique JWT token (secret string) is created 
                and sends to client
                it is not stored in server
            client
                JWT token is stored in local storage
        accessing protected route 
            client
                sends JWT token to server along with request
            server
                1.verifying token
                    created test signature using header,payload 
                    & secret(saved in server)
                    compares test signature and signature in token
                    if both are same 
                        payload or data is not modified 
                        Authenticates users 
                    else 
                        Not Authenticated
                2. check if user exist
                    user might have deleted his account 
                3. check if user have changed password
                    if token issue time < password changed time 
                    throw error to login
                without secret(saved in server), no one can manipulate
                JWT data as they can't create valid signature

        JWT Web Token (secret string)
            it has 3 parts separated with '.'
            header 
                not encrypted
                info about token
                like algorithm, type
            payload
                not encrypted 
                data
            signature 
                encrypted
                created using header,payload and 'secret' saved in server
          
    Client side rendering (CSR)
        website building is done on client(browsers)
        like geting data and creating html etc 
    Server side rendering (SSR)
        website building is done on server
        inject data into html templates 
        

            
*/
