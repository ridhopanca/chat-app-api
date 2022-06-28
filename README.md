# API for chatting application

This api is using mongodb as database and (node and express) js as engine.
this app built for training from this [source](https://www.freecodecamp.org/news/create-a-professional-node-express/).
with little modification.

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

## API Documentation
Api path local: http://localhost:3000

| End Point			| Method	| Headers	| Body		| Description		|
| -----------------------------	| ------------- | ------------- | ------------- | ---------------------	|
| /api/users			| GET		| 	-	| 	-	| List Users		|
| /api/users			| POST		|	-	| JSON		| Create User		|
| /api/users/:id		| GET		| 	-	|	-	| Get user by id	|
| /api/users/:id		| DELETE	| 	-	|	_ 	| Delete user by id	|
| /api/login/:id		| POST		| 	-	|	-	| Login			|
| /api/room/initiate		| POST		| authorization	| JSON		| Create new room chat	|
| /api/room			| GET		| authorization	| 	-	| Get all conversation	|
| /api/room/:id			| GET		| authorization	| 	-	| Get chat by room id	|
| /api/room/:id/message		| POST		| authorization	| JSON		| Send message in room	|
| /api/room/:id/mark-read	| PUT		| authorization	|	-	| Update read all by id	|
| /api/delete/message/:id	| DELETE	|	-	|	-	| Delete message by id	|
| /api/delete/room/:id		| DELETE	|	-	|	-	| Delete room by id	|

## Example JSON format
```bash
# create new user 
{
   "firstName" : "Jhon",
   "lastName"  : "Doe",
   "type"      : "consumer" // consumer or support
}

# create new room chat
{
   "userIds" : [":id"],
   "type": "counsumer-to-support" //consumer-to-consumer or consumer-to-support
}

# send message
{
   "messageText" : "example message"
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
