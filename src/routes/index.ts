import { Router } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", async (req, res, next) => {
    res.send("Success!").status(StatusCodes.OK);
});

export default router;
