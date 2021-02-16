# Usage instructions
**Make sure node and npm is installed on your computer.**
1. Clone the repository into a folder.
2. Run `npm install` in the main folder (it will also run the package installation for the api folder).
3. Rename the nodemon.json.example to nodemon.json and fill in the correct values for each environment variable. (Changes to this file need a complete restart of the application)
4. Start the script with `npm run dev`. Nodemon will restart the script after each change to the codebase.

## API routes
### /auth
/login [POST] -> The only route without Authorization header. All other routes need 'Bearer token' as the Authorization header. This token is returned by this endpoint.
#### body:

    {
		"db": "Database",
		"username": "Username",
		"password": "Password"
	}
/user [GET] -> Returns the current user.  
/logout [POST] -> Performs a logout for the current user.
### /containers
/ [POST] -> Create a container.
#### *body*:

    {
		"ouId": "GUID of the OU",
		"containerName": "Name of the password",
		"formName": "Existing form"
	}
/ [GET] -> Get all containers.  
/:containerId [GET] -> Get specific container password.  
/filter [GET] -> Find password container.  
#### *body*:

    {
		"search": "Search term"
	}
/apiuser [PATCH] -> Remove api users rights on password.
#### *body*:

    {
	"containerId": "GUID of the container"
	}
### /logs
/lastShown/:userId/:days [GET] -> Find out which passwords a user accessed in the past x days.
### /ous
/ [GET] -> Get all OUs
### /users
/ [GET] -> Get all users
/:userId [GET] -> Get specific user by id