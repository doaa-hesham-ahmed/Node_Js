const { Router } = require("express");
const { prisma } = require("./../../common/db/db");

const healthRouter = Router();

healthRouter.get("/", async (req, res, next) => {
    try {
        const health = await prisma.$queryRaw`SELECT 1+4`;

        res.json({
            message: "Router is connected successfully",
            success: true,
            data: health
        });

    } catch (error) {
        next(error);
    }
});

module.exports = healthRouter;