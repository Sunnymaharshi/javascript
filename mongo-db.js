/* 
MongoDB
    NoSQL
    built using javascript language
    Collections
        like tables
    Documents
        like rows
        key-value pair data structures
    Scalable
        easy to distribute data across multiple machines
    Flexible
        No document data schema required
        so each document can have different no and type of fields
    Performant
        embeded data models,indexing,sharding,flexible documents,
        native duplication etc
    Document Structure
        BSON 
            format MongoDB uses for data storage
            like JSON but typed
    Embedding/Denormilizing
        including related data into single document
        property can have another document
        ex: comments: [{"author":"Jon","text":"Nice content"}]
    Mongoose
        Object Data Modeling (ODM) library for MongoDB and Node.js 
        a higher level of abstraction
        Features
            schemas to model the data 
            easy data validation
            simple query API
            middleware etc
        Mongoose schema
            where we model our data by describing structure of data 
            default values and validation
            virtual properties 
                not part of document
                can add these to Schema
                used for some derived properties
            builtin validators 
                required
                unique
                trim
                max,min
                maxlength,minlength etc 
            custom validators 
                validate property 
                takes a callback function 
                (can't be arrow function because of 'this')
            Instance method 
                available to all it's documents
                ex:userSchema.methods.myMethod = ()=>{}
            static methods 
                ex: reviewSchema.statics.somefunction = ()=>{}
            indexes 
                while querying index fields, mongo searches indexes instead of all documents
                create indexes for a model
                ex:tourSchema.index({ price: 1 })
        Mongoose model  
            a wrapper for schema
            providing an interface to the database for CRUD operations        
            create()
                here Tour is a model
                returns a promise
                1. const newDoc = new Tour(data)
                    newDoc.save()
                2. await Tour.create(data)
            find()
                get all documents 
            findById()
                get document with id 
            findByIdAndUpdate()
                get document and update 
            findByIdAndDelete()
                delete document
            

        Aggregation pipeline
            defines pipeline to process data
            $match
                match given conditions
            $group
                like group by
                runs task on each groups
            $unwind
                unwinds array elements and creates document for each 
        Middleware
            schema.pre('save)
                runs before save and create
            schema.post('save')
                runs after save and create
            schema.pre('find')
                runs before query
            schema.pre('aggregate')
                runs before aggregate

    MongoDB Data Modeling
        In MongoDB, a Document can have upto 16mb only
        Referencing / Normalized
            storing ID of document in another collection
            ex: friends: [ObjecId(123),ObjecId(124)]
            Pros 
                can query each document on its own
            Cons 
                Need to do multiple queries to get all the data
            Types 
                child referencing 
                    reference to id of document in different collection
                    ex: {logs:[ObjecId(123),ObjecId(124)...]}
                    not good if we have lot of children
                parent referencing
                    we keep reference of parent in child document
                    here app is parent document
                    ex: log{"_id":ObjecId(123),app:ObjecId(1),text:"something"}
                    best for lot of children (1:TONS relation)
                two-way referencing
                    parent keep reference to children and child keep reference to parent
                    ex: movie{actors:[ObjecId(123),ObjecId(124)...]}
                        actor{movies:[ObjecId(23),ObjecId(24)...]}
                    best for MANY:MANY relation
            ex: guides: [{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            }],
            populate function 
                embeds the documents of references in query result
                ex: query.populate('guides')
            virtual populate
                adding data to a document without persisting on database
                ex: tourSchema.virtual('reviews', {
                    ref: 'Review',
                    foreignField: 'tour',
                    localField: '_id',
                });


        Embedded / Denormilized
            storing total document
            ex: friends:[{name:"John"},{name:"Ron"}]
            Pros 
                all data in query
            Cons 
                Not possible to query embeded document on its own 

        
*/
