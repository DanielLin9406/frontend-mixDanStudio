import "dotenv/config";
import express from "express";
import fetchUrl from "./controler/googleoAuth";
import authRouter from "./routes/route";

const app = express();
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  fetchUrl();
});

export default app;
