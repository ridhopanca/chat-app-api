import makeValidation from "@withvoid/make-validation";
import UserModel, {USER_TYPES} from "../models/User.js";

export default {
	onGetAllUsers: async (req, res) => {
		try {
			const users = await UserModel.getUsers();
			return res.status(200).json({success: true, users});
		} catch(error) {
			return res.status(500).json({success: false, error: error});
		}
	},
	onGetUserById: async (req, res) => {
		try {
			const user = await UserModel.getUserById(req.params.id);
			return res.status(200).json({success:true, user});
		} catch (error) {
			return res.status(500).json({success: false, error: error});
		}
	},
	onSearchUser: async (req, res) => {
		try {
			const validation = makeValidation(types => ({
				payload: req.body,
				checks: {
					name: { type: types.string }
				}
			}));

			if(!validation.success) return res.status(400).json(validation);
			const { name } = req.body;
			const user = await UserModel.searchUser(name);
			return res.status(200).json({success:true, user});
		} catch(error){
			return res.status(500).json({success: false, error: error});
		}
	},
	onCreateUsers: async (req, res) => {
		try {
			const validation = makeValidation(types => ({
				payload: req.body,
				checks: {
					firstName: { type: types.string },
					lastName: { type: types.string },
					type: { type: types.enum, options: { enum: USER_TYPES } },
				}
			}));

			if(!validation.success) return res.status(400).json(validation);

			const { firstName, lastName, type } = req.body;
			const user = await UserModel.createUser(firstName,lastName,type);
			return res.status(200).json({success: true, user});
		} catch (error) {
			return res.status(500).json({success: false, message:error});
		}
	},
	onDeleteUserById: async (req, res) => {
		try {
			const user = await UserModel.deleteUserById(req.params.id);
			return res.status(200).json({
				success:true,
				message: `Deleted a count of ${user.deletedCount} user.`
			});
		} catch(error) {
			return res.status(500).json({success:false, error:error});
		}
	},
}
