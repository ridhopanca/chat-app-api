import ChatRoomModel from "../models/ChatRoom.js";
import ChatMessageModel from "../models/ChatMessage.js";

export default {
	deleteRoomById: async(req, res) => {
		try {
			const { roomId } = req.params;
			const room = await ChatRoomModel.deleteOne({ _id: roomId });
			const messages = await ChatMessageModel.deleteMany({ chatRoomId: roomId });
			return res.status(200).json({
				success: true,
				message: "Operation performed successfully",
				deleteRoomsCount: room.deletedCount,
				deletedMessageCount: messages.deletedCount,
			});
		} catch(error){
			console.log(error)
			return res.status(500).json({success:false, error: error});
		}
	},
	deleteMessageById: async (req, res) => {
		try {
			const { messageId } = req.params;
			const message = await ChatMessageModel.deleteOne({ _id: messageId });
			return res.status(200).json({success:true, deleteMessageCount: message.deletedCount });
		} catch(error) {
			return res.status(500).json({success:false,error:error});
		}
	},
}
