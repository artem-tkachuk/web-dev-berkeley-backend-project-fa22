import {Router} from "express";
import {postSendGift} from "../controllers/postSendGift";
import {postUseGift} from "../controllers/postUseGift";
import {getGiftMetadata} from "../controllers/getGiftMetadata";

const router = Router();

// Send Gift
router.post('/gift', postSendGift);
// Use gift
router.post('/use', postUseGift);
// Get Gift Metadata
router.get('/gift/metadata', getGiftMetadata);

export default router;