import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const CHAT_ROOM_TYPES = {
	CONSUMER_TO_CONSUMER: "consumer-to-consumer",
	CONSUMER_TO_SUPPORT: "consumer-to-support",
};

const chatRoomSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: () => uuidv4().replace(/\-/g,""),
		},
		name: String,
		userIds: Array,
		type: String,
		chatInitiator: String,
	},
	{
		timestamps: true,
		collection: "chatrooms",
	}
);

chatRoomSchema.statics.initiateChat = async function(
	name,
	userIds,
	type, 
	chatInitiator
) {
	try {
		const availableRoom = await this.findOne({
			userIds: {
				$size: userIds.length,
				$all: [...userIds],
			},
		});
		if(availableRoom){
			return {
				isNew: false,
				message: 'retrieving an old chat room',
				chatRoomId: availableRoom._doc._id,
				type: availableRoom._doc.type,
			};
		}

		const newRoom = await this.create({ name, userIds, type, chatInitiator });
		return {
			isNew: true,
			message: 'creating a new chatroom',
			chatRoomId: newRoom._doc._id,
			type: newRoom._doc.type,
		};
	} catch(error){
		throw error;
	}
}

chatRoomSchema.statics.getChatRoomByRoomId = async function(roomId){
	try {
		const room = await this.findOne({_id: roomId});
		return room;
	} catch(error) {
		throw error;
	}
}

chatRoomSchema.statics.getChatRoomsByUserId = async function(userId){
	try {
		const rooms = await this.find({ userIds: { $all: [userId] } });
		return rooms;
	} catch(error) {
		throw error;
	}
}

chatRoomSchema.statics.getMessageByRoomId = async function(roomIds, options){
	try {
		return this.aggregate([
			{ $match : { _id: {$in : roomIds} } },
			// do a join on another table called chatmessages, and 
			// get me room details
			{
				$lookup: {
					from: 'chatmessages',
					localField: '_id',
					foreignField: 'chatRoomId',
					as: 'chatMessages',
				}
			},
			{ $unwind: {"path" : "$chatMessages","preserveNullAndEmptyArrays": true}},
			// do a join on another table called users, and,
			// get me a user whose _id = chatMessages.postedByUser
			{
				$lookup: {
					from: 'users',
					localField: 'chatMessages.postedByUser',
					foreignField: '_id',
					as: 'postedByUser',
				}
			},
			{ $unwind:{"path" : "$postedByUser", "preserveNullAndEmptyArrays": true} },
			{ 
				$group: {
					_id: '$_id',
					chatRoomId: {$last: '$_id'},
					chatRoomName: {$last: '$name'},
					messageId: {$last: '$chatMessages._id'},
					message: {$last: '$chatMessages.message'},
					messageCreatedAt: {$last: '$chatMessages.createdAt'},
					type: {$last: '$chatMessages.type'},
					postedByUser:{$last:'$postedByUser'},
					createdAt: {$last: '$createdAt'},
				}
			},
			{ $sort: {createdAt:-1}},
			// apply pagination
			{ $skip: options.page * options.limit },
			{ $limit: options.limit }
		]);
	} catch(error) {
		throw error;
	}
}

export default mongoose.model("ChatRoom", chatRoomSchema);
