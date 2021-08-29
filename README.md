a. Step to run code:

    ```
      docker build -t api-download . && docker run -it api-download
    ```

b. Details of all the tables and their schema: 

Database Used: MongoDB

Number of Tables: 1

Table Scheme: 
    
``` 
                {
                    API: {
                        type: String
                    },
                    Description: {
                        type: String
                    },
                    Auth: {
                        type: String
                    },
                    HTTPS: {
                        type: Boolean
                    },
                    Cors: {
                         type: String
                    },
                    Link: {
                         type: String
                    },
                    Category: {
                        type: String
                    }
                 }
```

Query to fetch all Documents from Collection:
    
``` 
     db.getCollection('apischemas').find({}) 
```

c. What is done from “Points to achieve”:

 i. Your code should follow concept of OOPS - ✅
    
 ii. Support for handling authentication requirements & token expiration of server - ✅
    
 iii. Support for pagination to get all data - ✅
    
 iv. Develop work around for rate limited server - ✅
    
v. Crawled all API entries for all categories and stored it in a database - ✅
    
   Number of entries in your table: 525

   Note: All the point from “Points to achieve” is achived.

d. What is not done from “Points to achieve”: Not Applicable

e. What would you improve if given more days: 

 i. I would have collected more detaild data from each individual APIs provided.
 
 ii.I would have created a UI for the application. 

