# Todo API using node.js, express and MongoDB 

I'm going to extend the app capabilities:
  i do database in my localhost and port 5000

### I Create two models (user, todo) 

- Implementation of the endpoints   

|   |   |   |
|---|---|---|
|HTTP Method|route|Description|
|post|/users/register|- Register a user with the following required attributes Username,password, firstname <br><br>Notes:  <br><br>- Return ({message:”user was registered successfully”}) if success <br><br>- Handle validation errors returned from mongo|
|Post|/users/login|Return ({message: "logged in successfully" ,username ,todos } ) <br><br>If the the authentication failed  <br><br>Return ({error:”invalid credentials” }) with 401 status code|
|GET|/users|Return the first name of registered users|
|DELETE|/users|Delete the user|
|PATCH|/users|- Return ({message:”user was edited successfully”, user: theUserAfterEdit”}) if success <br><br>- Handle validation errors returned from mongo|
|POST|/toods|Create new todo  <br><br>({username, title,tags})  <br><br>Return the new todo to the user|
|GET|/todos/:userId|Return the todos of specific user|
|PATCH|/todos/:id|Edit todo|
|DELETE|/todos/:id|Delete todo|
