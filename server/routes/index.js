import express from "express";
import auth from "./auth/index.js";
import user from "./user/index.js";
import chatRoom from "./chat/index.js";
import deletes from "./delete/index.js";
import { decode } from "../middlewares/jwt.js";
const router = express.Router();
router.use('/api', auth);
router.use('/api/users', user);
router.use('/api/room', decode ,chatRoom);
router.use('/api/delete', deletes);

export default router;
