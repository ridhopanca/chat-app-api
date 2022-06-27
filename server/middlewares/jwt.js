import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
const SECRET_KEY = 'z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmY';

export const encode = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await UserModel.getUserById(userId);
		const payload = {
			userId: user._id,
			usetType: user.type,
		};
		const authToken = jwt.sign(payload, SECRET_KEY);
		console.log('Auth', authToken);
		req.authToken = authToken;
		next();
	} catch(error){
		return res.status(400).json({success:false, message: error.error});
	}
}

export const decode = (req, res, next) => {
	if(!req.headers['authorization']) return res.status(400).json({success: false, messag: 'No access token provided'});
	const accessToken = req.headers.authorization.split(' ')[1];
	try {
		const decoded= jwt.verify(accessToken, SECRET_KEY);
		req.userId = decoded.userId;
		req.userType = decoded.type;
		return next();
	} catch(error) {
		return res.status(400).json({success:false, message: error.error});
	}
}
