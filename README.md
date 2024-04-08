## Task title

- Implementing a RESTful API with Express and local file system

## Task description:

Create a RESTful API using the Express.js framework that interacts with the local file system for a simple JSON file management application. While you can use modules to help you sort or refine your, you need to ensure that we can see your logic in each of the operations with the FS async module.The API should support the following operations:

● Create a new file with JSON data.<br/>
● Retrieve a list of all files.<br/>
● Retrieve a single file and its content, returned as JSON.<br/>
● Update a file JSON data.<br/>
● Delete a file.<br/>

Please provide the code for setting up the API, implementing these operations, and using the File System module for asynchronous file operations.

## Run && build

1. npm install
2. npm start

## How to test using Postman

To test the create method using Postman, you need to perform the following steps:

1. Open Postman and create a new POST request.<br/>
2. Enter the URL of the endpoint that generates the data.<br/>
   ● Create a new file with JSON data: (POST): http://localhost:3000/files.<br/>
   ● Retrieve a list of all files (GET): http://localhost:3000/files.<br/>
   ● Retrieve a single file and its content, returned as JSON. (GET): http://localhost:3000/files/:filename <br/>
   ● Update a file JSON data. (PUT) http://localhost:3000/files/:filename <br/>
   ● Delete a file. (DELETE) http://localhost:3000/files/:filename<br/>

3. Select the POST method from the drop-down menu next to the URL.<br/>
4. Select the "Body" tab.<br/>
5. Select "raw" and select "JSON" from the drop-down list.<br/>
6. In the text window, enter the JSON data you want to send. <br/>
   {
   "filename": "example",
   "data": {
   "name": "John",
   "age": 30
   }
   }
7. Click the "Send" button to send the data creation request.

If everything went right, you will receive a response from the server, stating that the file was created successfully. <br/> Make sure the Express.js server is running and listening on the port you specified (in this case, port 3000).
