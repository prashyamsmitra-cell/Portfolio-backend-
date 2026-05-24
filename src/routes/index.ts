import { Router, type IRouter } from "express";
import adminRouter from "./admin";
import healthRouter from "./health";
import visitorRouter from "./visitors";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(visitorRouter);

export default router;
