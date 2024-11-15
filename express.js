/* 
ExpressJS
    minimal node.js framework
    features
        complex routing
        easy handling of requests and responses
        middleware
        server-side rendering etc
    makes easy to organize our app into MVC architecture
    express()
        creates server
    listen()
        listen on host
    get()
        HTTP GET method
    route()
        chain multiple HTTP method handlers
        ex: app.route("path_").get(handler).post(handler)
    post()
        HTTP POST method
    res.status()
        set status code
    res.send()
        send text message
    res.json()
        send javascript object as JSON
    app.use(express.json())
        middleware
        modifies incoming data
        adds body data to req
    req.params
        returns a object with all the params of request
        ex: /api/user/:id?  => {id:value}
        optional params
            ? after params makes it optional
    Middleware 
        everything is middleware, even routes
        express emphasizes use of Middlewares for everything
        it runs btw request and response
        must be defined at top, before routes
        order of middlewares is important
        ex:parsing body,logging,setting headers and route etc
        custom middleware
            app.use() is used to define the middleware
            next() must be called at the end
            ex:app.use((req,res,next)=>{
                // middleware code 
                next()
            })
    express.Router()
        creates a router
        can create sub routes on it
        then we can mount the router to the app as Middleware
        ex: const router = express.Router();
            router.route('/').get(getAllTours).post(createTour);
            app.use('/api/v1/users', userRouter);
    
    Param Middleware
        for params in url path 
    Chaining Middlewares
        app.post(validateData,postHandler)
    express.static middleware
        to server directory files through routes 
        don't add dir name in path
        ex: app.use(express.static(`${__dirname}/public`));
            /favicon.ico
            
*/
