import { Router } from "express";

const router = Router();
const enrichRouter = createEnrichRouter();

function createEnrichRouter() {
  return router;
}

export default enrichRouter;
