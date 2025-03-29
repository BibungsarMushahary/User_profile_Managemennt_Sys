# User_profile_Managemennt_Sys

A secure Node.js API for user profiles with JWT authentication.

## Setup Instructions

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BibungsarMushahary/User_profile_Managemennt_Sys.git
   cd profile-management-system
   
2. Install dependencies:
   ```bash
   (npm install)
   
4. Set up environment variables:
   ```bash
   cp .env.example .env
   
6. Start the development server:
   ```bash
   npm start
   
## API Documentation

### Authentication

|  Endpoint	   |      Method	   |   Description	    |     Request Body |
| --- | --- | --- | --- |
/api/auth/register	|    POST	     |   Register new user	     |     {name, email, password, address}
/api/auth/login     |    POST	     |   Login existing user	   |     {email, password}

### Profile Management

Endpoint	         |    Method	   |     Description	      |          Headers Required
| --- | --- | --- |
/api/profile/:id	 |    GET	  |        Get user profile 	   |       Authorization: Bearer <token>
/api/profile/:id	  |   PUT	 |         Update user profile	 |       Authorization: Bearer <token>


### Sample Url Commands

Register:
```bash 
curl -X POST http://localhost:6000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Test User","email":"bibung@gmail.com","password":"test123","address":"Assam"}'
```
Login:
```bash
curl -X POST http://localhost:6000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"bibung@gmail.com","password":"test123"}'
```
Get Profile:
```bash
curl -X GET http://localhost:6000/api/profile/user_id_here \
-H "Authorization: Bearer 11171"

```
   
