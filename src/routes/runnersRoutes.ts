import {Router} from "express";

import {postRegisterRunner} from "../controllers/postRegisterRunner";
import {getAllRunners} from "../controllers/getAllRunners";
import {postSimulateRaceTime} from "../controllers/postSimulateRaceTime";

const router = Router();

// Register new runner
router.post('/runner', postRegisterRunner);
// Get All Runners
router.get('/runner', getAllRunners);
// Simulate Race Time
router.post('/sim', postSimulateRaceTime);

export default router;