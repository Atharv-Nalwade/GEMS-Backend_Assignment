# GEMS-Backend_Assignment

## IEEE Gems Web Domain (Backend) Selection Assignment

This assignment focuses on the backend development of the IEEE Gems web domain. The task details are provided in the 'Backend Task.pdf' file.
--- 

To set up the project, follow these steps:

1. Make sure Node.js is installed on your machine.
2. Open the terminal at the desired location and execute the following command: 
```
git clone https://github.com/Atharv-Nalwade/GEMS-Backend_Assignment.git
```
3. Run `npm init` or `npm init -y` to initialize the project.
4. Run `npm install` to install the project dependencies.
5. Create a `.env` file in the root directory and add the following line inside it, Replace `sometextwithoutquotes` with your desired secret key:
```
JWT_SECRET=sometextwithoutquotes
```
6. Inside the `src/config/config.json` file, under the `development` section, provide your MySQL database credentials: username, password, and database name.
7. Execute `npx sequelize-cli db:migrate` to execute the database migrations and create the necessary tables.
8. Execute `npx sequelize-cli db:seed:all` to execute the seed file and create the initial invitee entry.
9. Then considering you are in the root directory execute `cd src` followed by `node index.js` to run teh file and teh server would be started

## Packages Used


The following packages are used in this project:

- **bcrypt** (Version 5.1.0): A library for hashing passwords and comparing hashed passwords.
- **body-parser** (Version 1.20.2): Middleware for parsing incoming request bodies.
- **dotenv** (Version 16.1.4): Loads environment variables from a `.env` file into `process.env`.
- **express** (Version 4.18.2): Fast and minimalist web framework for Node.js.
- **jsonwebtoken** (Version 9.0.0): JSON Web Token (JWT) implementation for generating and validating tokens.
- **multer** (Version 1.4.5-lts.1): Middleware for handling file uploads.
- **mysql2** (Version 3.3.5): MySQL client for Node.js that supports pooling and prepared statements.
- **sequelize** (Version 6.32.0): A promise-based ORM for Node.js that supports multiple databases.
- **sequelize-cli** (Version 6.6.1): Command-line interface for Sequelize ORM.

These packages provide various functionalities such as user authentication, data storage and retrieval, file handling, and more.

## Database Schema


The project uses a relational database to store and manage data. The schema consists of several tables that represent different entities in the system.

### User Table

The `User` table stores information about registered users in the system. It has the following columns:

- `id` (INTEGER): The primary key for identifying each user uniquely.
- `inviteeId` (STRING): The ID of the invitee associated with the user.
- `password` (STRING): The hashed password of the user.
- `name` (STRING): The name of the user.
- `email` (STRING): The email address of the user.
- `phone` (STRING): The phone number of the user.
- `alternateEmail` (STRING): An alternate email address of the user.
- `profilePicture` (BLOB): A binary large object (BLOB) data type to store the user's profile picture.
- `createdAt` (DATE): The timestamp representing the creation date of the user record.
- `updatedAt` (DATE): The timestamp representing the last update date of the user record.

### Invitee Table

The `Invitee` table stores information about invited users. It has the following columns:

- `id` (INTEGER): The primary key for identifying each invitee uniquely.
- `inviteeId` (STRING): The ID of the invitee.
- `name` (STRING): The name of the invitee.
- `email` (STRING): The email address of the invitee.
- `phone` (STRING): The phone number of the invitee.
- `alternateEmail` (STRING): An alternate email address of the invitee.
- `createdAt` (DATE): The timestamp representing the creation date of the invitee record.
- `updatedAt` (DATE): The timestamp representing the last update date of the invitee record.

### BlacklistToken Table

The `BlacklistToken` table stores invalidated or deleted JWT tokens. It has the following columns:

- `id` (INTEGER): The primary key for identifying each blacklisted token uniquely.
- `token` (STRING): The JWT token that is blacklisted.
- `createdAt` (DATE): The timestamp representing the creation date of the blacklisted token record.
- `updatedAt` (DATE): The timestamp representing the last update date of the blacklisted token record.


### Organization Table(Optional)

The `Organization` table stores information about organizations. It has the following columns:

- `id` (INTEGER): The primary key for identifying each organization uniquely.
- `organizationId` (STRING): The ID of the organization.
- `inviteeId` (STRING): The ID of the invitee associated with the organization.
- `name` (STRING): The name of the organization.
- `role` (STRING): The role or position of the user in the organization.
- `validTill` (DATE): The date until which the organization's membership or validity is active.
- `createdAt` (DATE): The timestamp representing the creation date of the organization record.
- `updatedAt` (DATE): The timestamp representing the last update date of the organization record.

These tables and their columns define the structure of the project's database schema. Data is stored and retrieved from these tables based on the application's functionality and requirements.

Note: The actual table names in the database may be different from the model names specified in the code. Sequelize provides options to customize the table names, but the default behavior is to pluralize the model names to derive the table names.

## API's


### Signup API

- HTTP Method: POST
- Endpoint:** `http://localhost:3000/api/v1/signup`
- Description: This API is used to sign up a user.
- Send the form-data in the request body with the following keys and values:
```
- `inviteeId` (text): first_user_inviteeId
- `password` (text): john123
```
- Note: Any password can be given by the user. The password is hashed before storing it in the database.
- Important: During the signup process, the user needs to provide an invitee ID. However, to create an invitee ID, a user needs to be logged in. To overcome this, the first invitee is manually inserted into the database via the seeder file. The invitee ID is created in the invitation controller, which is a private endpoint accessible only after authentication. The Signup API checks if the provided invitee ID belongs to someone.
- Considering the task's documentation the first invitee needs to added manually in the database


### Login API

- HTTP Method: POST
- Endpoint: `http://localhost:3000/api/v1/login`
- Send the form-data in the request body with the following keys and values:
```
- `email` (text): john.doe@example.com
- `password` (text): john123
```
- Note: Make sure to use the password provided during the signup API.
- Passwords are compared with the hashed password stored in the database.
- The API creates the user and returns the user in the API's response.
- Along with the user data, it returns a JWT token that can be used to access the private API endpoints. Include the token in the `Authorization` header using the Bearer Token scheme.
- The generated token expires in 1 hour.

### Private Endpoints

All private endpoints first pass through the authentication middleware, where the JWT token is verified, and then the `next()` function is called.

### Logout API

- HTTP Method: GET
- Endpoint: `http://localhost:3000/api/v1/logout`
- Include the token generated in the login API in the `Authorization` header using the Bearer Token scheme.
- If the token is valid, the user will be logged out, and the token will be added to the blacklist token table, which stores invalidated and deleted tokens.
- The next time the logout API or any other private API is called with the same token, it will be checked against the blacklist token table. If it exists, it means the user has already logged out and cannot access the private endpoints.

### Invitation API

- HTTP Method: POST
- Endpoint: `http://localhost:3000/api/v1/invitation`
- The request body should have the following key-value pairs:
```
- `name` (text): "Shreerup"
- `email` (text): "shree@gmail.com"
- `phone` (text): "123456789"
- `alternateEmail` (text): "shree1@gmail.com"
```
- Note: You can enter any values; they represent the person to be invited.
- The API performs input validation by checking if the required fields (`name`, `email`, and `phone`) are present. If any of these fields are missing, it returns a 400 Bad Request response with an error message.
- It generates a unique invitee ID using the `uuidv4` function from the "uuid" module. This ID will be used to identify the invitation.
- The API creates a new entry in the Invitee table of the database using the `Invitee.create` method from Sequelize. It passes the invitee ID, name, email, phone, and alternateEmail as the data for creating the new record.
- If the creation of the invitation entry is successful, it sends a response to the client with the generated invitee ID in the response body.

### EditUser API

- HTTP Method: PUT
- Endpoint: `http://localhost:3000/api/v1/editUser`
- The request body should have the following key-value pairs:
```
- `name` (text): "Shreerup"
- `email` (text): "shree@gmail.com"
- `phone` (text): "123456789"
- `alternateEmail` (text): "shree1@gmail.com"
- `profilePicture` (file): Select a file from your file system
```
- The function requires the User model file and the multer middleware for handling file uploads.
- It configures multer with `memoryStorage`, which means uploaded files are stored as Buffer objects in memory.
- The function extracts the ID of the user from the `req.user.dataValues` object. This assumes that the `req.user` object contains the authenticated user's information.
- It attempts to find the user in the database using the `User.findByPk` method, based on the extracted `userId`. If the user is not found, it returns a Not Found response with an error message.
- The function sets up an upload middleware using `upload.single("profilePicture")`. This middleware processes the file upload with the field name "profilePicture". The uploaded file's data will be available in the `req.file` object.
- The middleware function is executed with `uploadMiddleware(req, res, async (err) => {})`. Inside this function, the file upload is processed.
- If an error occurs during the upload, it logs the error and returns a 500 Internal Server Error response with an error message.
- The function extracts the user details such as name, email, phone, and alternateEmail from the request body.
- It updates the user's information in the database using the `User.update` method. It specifies the updated values for `name`, `email`, `phone`, `alternateEmail`, and `profilePicture` (using the uploaded file buffer if available). The update is applied to the user with the specified ID.
- The function checks the number of rows updated (`numRowsUpdated`). If no rows were updated, it means the user was not found in the database, and it returns a 404 Not Found response with an error message.
- It fetches the updated user details from the database using `User.findByPk` based on the `userId`.
- Finally, it sends a response to the client with the updated user details in the response body.
- If any error occurs during the process, it catches the error, logs it to the console, and sends a 500 Internal Server Error response with an error message.


### Please note that the above description assumes a local development environment with the base URL `http://localhost:3000` Adjust the base URL accordingly if you are deploying the project on a different server.