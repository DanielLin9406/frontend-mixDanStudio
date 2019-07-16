import auth from "../libs/enrichRouter";
import { getUser } from "../controler/googleoAuth";

auth.get("/callback", async function(req, res) {
  console.log("here");
  const code = req.query.code;
  const result = await getUser(code);
  res.send(result);
});

export default auth;
