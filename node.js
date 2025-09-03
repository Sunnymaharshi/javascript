/*
    node.js
        Javascript runtime built on google opensource V8 engine
        not for CPU intensive tasks
    node runtime 
        V8 Engine
            converts js to machine code
            Memory heap
            call stack 
                keeps track of function invocations 
        libuv 
            cross platform opensource library written in C language
            handles asynchronous operations in node.js
            it uses Thread pool & event loop 
            Thread Pool 
                has pool threads that node uses to offload time consuming task
                by default, it has 4 threads 
                so it can run 4 different tasks
                set threadpool size 
                    process.env.UV_THREADPOOL_SIZE = 5  
                    if given more than CPU cores, task execution time increases               
                ex: fs.readFile uses thread pool to offload file reading task
            Network IO
                https.request is Network I/O operation
                does not use Thread Pool 
                libuv deligates work to OS kernel 
            event loop
                asynchronous tasks
                picks events from event queue and pushes their callbacks to call stack
                when nothing is pending, event loop exits & program ends
                microtask queue 
                    nextTick queue 
                        process.nextTick callbacks
                        all nextTick callbacks are executed before callbacks in promise queue
                        nextTick can create nextTick recursively
                    promise queue 
                        promise callbacks 
                    executed first in every cycle 
                timer queue 
                    setTimeout & setInterval
                    micro task queue callbacks are executed in between the execution of 
                    timer queue callbacks
                I/O queue                    
                    fs.read/write etc callbacks
                    when running setTimeout(fn,0) and I/O async method, order of execution 
                    is never guaranteed 
                        it depends on CPU busy or not, as 0ms is taken as 1ms internally
                    I/O pooling 
                        if this queue is empty it checks if I/O operation is completed
                        then adds callback to the queue, runs that in next cycle
                        I/O events are polled and callbacks are added to I/O queue only after 
                        I/O is completed
                    microtask queue cbs executed after I/O queue & before check queue
                check queue
                    setImmediate callbacks
                    microtask query cbs executed in between check queue callbacks
                    when running setTimeout(fn,0) and setImmediate, order of execution 
                    can never be guaranteed
                close queue 
                    close event listeners 
                    ex: Socket.close(), stream.close() etc 
            Event Loop cycle
                microtask queue (nextTick,promise)
                timer queue (setTimeout,setInterval)
                    microtask queue in between each callback execution
                I/O queue (fs.readFile)
                    I/O pooling if queue is empty
                check queue (setImmediate)
                    microtask queue in between each callback execution
                close queue (close event listeners)
                event loop continues/exits 
    every node.js code file wrapped in it's own IFEE (function)
        wrapper: function (exports,require,module,__filename,__dirname){}
    debugging in chrome dev tools 
        node --inspect
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
        __filename & __dirname
            absolute path in file system
    Module Caching 
        modules only runs once and cached 
        when imported again it gives cached module 
    exporting 
        for single variable 
            module.exports = something;
            can use any name for importing
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
        require.resolve()
            to check if module exists without running it 
    path module 
        basename()
            returns last portion of path (filename/foldername)
        extname()
            return extension of the path (.js, "" for folder)
        parse()
            returns obj with root, dir, base, ext, name of path 
        format()
            returns original path from parse() value 
        isAbsolute()
            returns true if path is absolute
        join()
            joins multiple paths to single path 
            join("f1","f2","index.j") => f1/f2/index.js 
        resolve()
            if / not given
                "f1","f2","index.js"
                adds absolute path of __dirname at beginning
                {__dirname}/f1/f2/index.js
            if / given, 
                "/f1","f2","index.js" => /f1/f2/index.js
            last argument with / is considered as root 
                "f1","/f2","index.js" => /f2/index.js 
                "f1","/f2","../index.js" => /index.js 
    events module 
        return EventEmitter class
        emit()
            to emit an event
            emitter.emit("something")
        on()
            listen on event 
            emitter.on("something", callback, ...args)
        custom EventEmitter class by extending it 
    Buffer 
        stores data in hexadecimal 
        limited space 
        toString()
            returns actual value 
        toJSON()
            obj with type: 'Buffer' & data: array of decimals (string representation in UTF-8)
        console.log()
            prints class with hexadecimal values of passed value
        write()
            to write new data to buffer 
            ignore data beyond buffer size
    fs module
        by default returns a buffer, pass "utf-8" to get actual content 
        readFileSync
            reads file Synchronously
            readFileSync("./file.txt", "utf-8")
        readFile
            reads file Asynchronously
            takes callback with error & data args 
            readFile("./file.txt", "utf-8", (err,data)=>{})
        writeFileSync
            writes to file Synchronously
            writeFileSync("./file.txt", "Hello")
        writeFile 
            writes to file 
            to append, add third argument {flag: "a"}
            writeFile("./file.txt", "hello",{flag: "a"}, (err)=>{}) 
    fs/promises module 
        promise version of fs module
    streams
        process (read or write) data in chunks as they arrive
        without waiting for entire data to be available before processinng
        default Buffer size 64KB
        highWatterMark 
            to set buffer size 
            2 for 2Bytes
        all streams are event emitters
        data event when reading data from readable stream
        readable streams
            fs.createReadStream
        writable streams
            fs.createWriteStream
        duplex streams
            both readable and writable
            net.Socket
        transform streams
            duplex streams that transform data as it is written or read 
            zlib.createGzip
        implement streams
            streams library
        consume streams 
            piping/events
    pipe
        connects streams, can chain multiple streams
        ex: readableStream.pipe(writableStream) 
    http module
        creates web servers to transfer data over http
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
    cluster module 
        enables creation of child processes (workers) that run simultaneously 
        can run multiple instances of node.js that can distribute workloads
        Master & child workers 
        isMaster 
            to check if it is master process
        fork()
            to create worker threads 
            create only workers as many as CPU cores 
        pm2 package can be used to run a file in cluster mode 
    worker_threads module
        enables use of threads that execute JavaScript in parallel 
        code runs in separate separate child process, preventing blocking your main app 
        can run multiple application threads within single node.js instance 
        if process isolation is not required we can use worker threads instead of cluster module
    Memory Leak 
        when program incorrectly manages memory allocations in such a way that memory that is 
        no longer needed is not released 
        happens when expected short lived objects are attached to long lived ones 
        ex: const requests = new Map()
        const client = redis.createClient();
        app.get('/', (req,res)=>{
            requests.set(req.id, req);
            client.on("message",()=>{})
            res.status(200).send('hello')
        })
        here requests obj holds all the requests coming, which keeps increases
        and added message event listener inside request handle, keeps on adding listeners 
        which consumes memory fast it should be at top level
        memory leaks can happen in system level also 
        Debugging leaks 
            process.memoryUsage()
                gives following 
                rss 
                    Resident Set Size, amount of RAM node process is consuming 
                    entire app consumption
                heapTotal
                    Total space available for js objects presently
                external 
                    amount of memory consumed by off-heap data (buffers) used by node 
                heapUsed 
                    total space occupied by JavaScript objects presently
            Heap Snapshots
                node --inspect index.js
                chrome devtools -> memory
                can compare 2 snapshots to identify memory leak easily
            production 
                heapdump module 
                    generate dumps on demand 
                    great for post mortem debugging 
                    may contain sensitive data 
                Allocation timeline 
                    takes sequence of snapshots & shows chart 
                    can inspect in detail
                Sampling heap profiler 
                    heap-profile module
                    low overhead, designed for production
                    bar chat for each function that alocating memory                    
    npm 
        software/package registry
        package manager for JavaScript language
        regular dependencies
            packages that are needed to run the app
        dev dependencies
            packages that are needed only in development of app
        npm outdated
            lists outdated packages
        package-lock.json
            contains exact versions of packages    
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
