/* 
MongoDB
    NoSQL

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



            
            
            
            
        

*/
