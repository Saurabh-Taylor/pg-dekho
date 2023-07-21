
# Project Title: User Management Backend with Express and MongoDB

Design and develop a user management backend system using Express.js and MongoDB, allowing users to
create, login account



## User Management API

### Base URL
The base URL for all API endpoints is: `http://localhost:PORT/`

### Endpoints

#### 1. Register a User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mysecretpassword"
}
```
- **Response:**
  - Success (Status code: 201)
    ```json
    {
      "success": true,
      "message": "User registered successfully"
    }
    ```
  - Error (Status code: 400)
    ```json
    {
      "success": false,
      "error": "Email already exists"
    }
    ```
    - Possible errors:
      - `"Invalid request data"`
      - `"Email already exists"`

#### 2. User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "mysecretpassword"
}
```
- **Response:**
  - Success (Status code: 200)
    ```json
    {
      "success": true,
      "message": "Login successful",
    }
    ```
  - Error (Status code: 401)
    ```json
    {
      "success": false,
      "error": "Invalid email or password"
    }
    ```
    - Possible errors:
      - `"Invalid request data"`
      - `"Invalid email or password"`

#
  

### Error Handling

- The API follows RESTful principles and returns appropriate HTTP status codes for success and error responses.
- Success responses have a `success` property set to `true`.
- Error responses have a `success` property set to `false` and an `error` property with an error message.
- Error messages may vary depending on the specific error encountered.



