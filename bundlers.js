/*  
    Webpack 
        static module bundler for modern JavaScript applications. 
        When webpack processes your application, it internally builds a dependency graph.
    webpack.config.js
        contains webpack configurations
        must use CommonJS module system
        must use path library for file path 
        module.exports = {}
    entry
        starts from this file 
        ex: ./src/index.js
    output
        config path for webpack output
        {   
            filename: 'bundle.js',
            path: path.resolve(__dirname,'dist')
        }
        publicPath
            allows you to specify the base path for all the assets
            it can be folder or cdn domain
        clean 
            to remove file before build 
            alternative to Clean Webpack Plugin
    mode 
        none 
            no builtin optimizations 
        development
            uses source maps by default
            create webpack.dev.config.js 
        production 
            default mode
            adds multiple plugins
            create webpack.production.config.js 
        usage in package.json
            "build": "webpack --config webpack.production.config.js"
            "build:dev": "webpack --config webpack.dev.config.js"
    webpack dev server
        automatic builds & hot module replacement
        devServer: {
            port:9000,
            static: {
                directory:path.resolve(__dirname, './dist')
            },
            devMiddleware:{
                index:"index.html",
                writeToDisk: true
            }
            
        } 
        usage in package.json 
            "dev": "webpack serve --config webpack.dev.config.js --hot"
    Asset Modules 
        use asset files in JavaScript application
        files: images, videos, fonts, txt etc
        4 types of asset modules 
        asset/resource
            puts resource in output dir & exports URL 
            used for large images or large fonts 
        asset/inline
            inlines file into bundle as data Uri
            used for small files like svg 
        asset 
            combination of resource and inline
            webpack decides which one to use automatically based on size 
            we can provide our own size 
        asset/source
            used for importing txt file content into js string etc
            inserts it into bundle
        ex: module: {
            rules: [ {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            }]
        }
        webpack check these rules everytime it try to import a file
        Image Optimization
            image webpack loader 
                can specify quality to compress images
            ImageMinimizerWebpackPlugin
                uses imagemin library internally


    Loaders 
        import all other kinds of files that u can't handle with asset modules
        we provide loader to 'use' property in rule
        need to install loaders
        webpack uses loaders from right to left
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        can be used to convert SCSS/SASS to CSS 
        CSS modules 
            can configure custom names generated for CSS modules 
        babel loader
            to transpile modern JS code to regular JS code 
        CSS-in-JS 
            no class name collision
            business logic and styles can be together
            styles depend on JS variables 
            cons 
                bundle size
                can't cache JS and CSS separately
                performance is less 
            JSS 
                library which allows to use JS to describe the styles
                one of many CSS-in-JS libraries
            
    Plugins
        additional JS libraries that do everything that loaders can't 
        can also modify bundles.
        ex: uglifyJSPlugin takes bundle.js and minimizes contents to decrease bundle size 
        usage: plugins: [ new TerserPlugin()]
        Terser 
            reduce bundle size
        MiniCssExtract
            extracts css into separate file 
        Webpack Bundle Analyzer
            analyze webpack output files size
            can visualize output file in html, json etc formats
    Browser caching 
        browser caches site files
        if we change anything in the file, users can't load new bundle immediately
        *so we change the file name, so browser gets latest file everytime we change something
        webpack can automatically change file name content is modified
            output: { filename: 'bundle.[contenthash].js'}
        this creates lot of files in dist/ everytime we change the content
        Clean Webpack Plugin
            cleans dist/ folder before new build files are generated
        HTML Webpack Plugin
            since filenames are changes everytime we change something
            we need to update html file with new filename
            this plugins does this automatically
    Multiple Page App / Code splitting 
        entry: {
            'page1': './src/page1.js',
            'page2': './src/page2.js'
        }
        output: {
            filename: '[name].[contenthash].js'
        }
        generated multiple html files for pages 
            add another HtmlWebpackPlugin
            add bundles to each html
                in html webpack plugins
                    add entry in chunk for respective plugin
                    chunk: ['page1']
        chunks value
            initial 
                entry chunks of the application.
                modules that are loaded at starting of the app
            async 
                dynamically imported (asynchronous) chunks.
                ex: modules that are imported after app load asynchronously
            all
                both
        1. split specify libraries
            cacheGroups 
                can separate specific libraries into separate bundle
                optimization: {
                splitChunks:{
                    cacheGroups: {
                        jquery:{
                            test: /[\\/]nodemodules[\\/]jquery[\\/]/,
                            chunks: 'initial'
                        }
                    }
                } }  
        2. specific criteria for code spliting
            optimization: {
                splitChunks:{
                    chunks: 'all',
                    minSize: 3000,
                    maxSize: 15000,
                    name(module,chunks,cacheGroupKey) {
                        const filePathArray = module
                                    .identifier()
                                    .split('/')
                        return filePathArray[filePathArray.length - 1]
                    }
                }
            }
        3. putting node_modules in separate bundle
            splitChunks:{
                chunks: 'initial',
                maxSize: Infinity,
                minSize: 0,
                cacheGroups: {                    
                    node_modules:{                        
                        test: /[\\/]nodemodules[\\/]/,
                        name: 'node_modules'
                    }
                }
            }
        4. each dependency into it's own bundle 
            splitChunks: {
                chunks: 'all',
                maxSize: Infinity,
                minSize: 0,
                cacheGroups: {
                    node_modules: {
                        test: /[\\/]nodemodules[\\/]/,
                        name(module){
                            const package_name = module.context.match(/[\\/]nodemodules[\\/](.*?)([\\/]|$)/)[1]
                            retrun package_name
                        }
                    }
                }
            }
        5. can define our own strategy
    Lazy loading 
        dynamically import modules only when needed 
        usage: can import a module only for certain condition or userflow 
        can import multiple modules using Promise.all as 
        dynamic imports returns a promise
    Tree Shaking 
        dead code elimination
    Compress production code 
        Compression Webpack Plugin
            creates compressed files along with original files in build
            support Gzip and Brotli compression algorithms 


    Module Federation
        allows developers to share code between multiple projects in a decentralized way, 
        making it easier to manage complex applications.
        dynamically load code from another application.
        Architecture Blocks
            Exposed Module (Remote)
            Consumption Module (Host)
            Shared Module/Dependency
        ModuleFederation Plugin 
            we can expose or consume code 
            it fetches code from remote location where exposed code is hosted 
    Micro frontends 
        web development architectural pattern that breaks down large front-end codebases into smaller,
        more manageable pieces
        each can be developed, tested, and deployed independently
        like each page as a different application
    Parcel Bundler 
        zero configuration bundler 
        plugins 
            parcel-plugin-clean-dist 
                clears dist folder before build 
            parcel-plugin-imagemin 
                minify images
                need config file
            parcel-plugin-purgecss 
                remove unused css 
                need config file
            parcel-plugin-compress 
                gzip or brotli compression
        Tree shaking 
            dead code elimination
            add flag --experimental-scope-hoisting 

*/