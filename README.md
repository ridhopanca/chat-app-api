# API for chatting application

This API is built using mongodb, node, express and socket io. This API was created for training purposes on realtime chat. reference [source](https://www.freecodecamp.org/news/create-a-professional-node-express/ this),
with a few modifications.

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
   "name" : "Example Name",
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
