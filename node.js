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
    http module
        createServer
            to create a server 
        listen
            listens on specified port and host
    url module
        parse
            parse query string in url
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
*/