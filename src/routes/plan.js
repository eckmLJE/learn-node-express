import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const plans = await req.context.models.Plan.findAll();
  return res.send(plans);
});

export default router;
