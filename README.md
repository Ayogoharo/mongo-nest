#Pet project showcasing a Dockerized MongoDB setup and a basic NestJS application for database interaction.

<details>

<summary> Tech Stack </summary>

- NestJS
- MongoDB
- Docker
- Docker Compose
- Postman

</details>

<details>

<summary> Documentation </summary>

### Authentication Endpoints

#### POST /auth/signup

Create a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "name": "Full Name",
  "date_of_birth": "1990-01-01T00:00:00.000Z", // Optional
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8b2c1e4b0f2a1b2c3d4e5",
    "email": "user@example.com",
    "username": "username",
    "name": "Full Name",
    "date_of_birth": "1990-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /auth/login

Authenticate user and get JWT token.

**Request Body:**

```json
{
  "login": "user@example.com", // Can be email or username
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8b2c1e4b0f2a1b2c3d4e5",
    "email": "user@example.com",
    "username": "username",
    "name": "Full Name",
    "date_of_birth": "1990-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### User Management Endpoints

#### GET /users

Get all users (public endpoint).

**Response:**

```json
[
  {
    "_id": "64f8b2c1e4b0f2a1b2c3d4e5",
    "email": "user@example.com",
    "username": "username",
    "name": "Full Name",
    "date_of_birth": "1990-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /users/:id

Get user by ID (public endpoint).

**Response:**

```json
{
  "_id": "64f8b2c1e4b0f2a1b2c3d4e5",
  "email": "user@example.com",
  "username": "username",
  "name": "Full Name",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PATCH /users/:id

Update user profile (authenticated - users can only update their own profile).

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body (all fields optional):**

```json
{
  "email": "newemail@example.com",
  "username": "newusername",
  "name": "New Full Name",
  "date_of_birth": "1991-01-01T00:00:00.000Z"
}
```

**Response:**

```json
{
  "_id": "64f8b2c1e4b0f2a1b2c3d4e5",
  "email": "newemail@example.com",
  "username": "newusername",
  "name": "New Full Name",
  "date_of_birth": "1991-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

#### DELETE /users/:id

Delete user account (authenticated - users can only delete their own account).

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "_id": "64f8b2c1e4b0f2a1b2c3d4e5",
  "email": "user@example.com",
  "username": "username",
  "name": "Full Name",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

#### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

#### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "User with this email or username already exists",
  "error": "Conflict"
}
```

### Authentication Flow

1. **Sign up**: POST `/auth/signup` with user details and password
2. **Login**: POST `/auth/login` with email/username and password
3. **Use JWT**: Include `Authorization: Bearer <token>` header for protected endpoints

</details>

## Postman Collection

(Postman Link)[https://technical-explorer-57406185-6173148.postman.co/workspace/Default-workspace~d8f2a5b1-54cc-4fd9-bb8a-c9028849686d/request/47179282-03dbf811-3a05-492e-b4a1-724163221d13?action=share&creator=47179282&ctx=documentation&active-environment=47179282-18dc7d87-8357-45ac-a643-970d68ecd700]

## Test instructions

1. Clone the repository
2. Navigate to the project directory
3. Create `.env` file in the root directory according to the [.env.example](./example.env) file
4. Install the dependencies

- `❯ npm i`

5. Build the Docker image

- `❯ docker compose up -d`

6. Run the Docker container
7. Run application in dev mode

- `❯ npm run start:dev`

8. Open Postman and import the collection ussing link
9. Test the API endpoints ussing Postman
