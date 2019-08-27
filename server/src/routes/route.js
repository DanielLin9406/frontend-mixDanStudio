import auth from "../libs/enrichRouter";
import url from "url";
import googleRedirectUrl, { getUser } from "../controler/googleoAuth";

auth.get("/login", async function(req, res) {
  res.status(301).redirect(googleRedirectUrl);
});

auth.get("/callback", async function(req, res) {
  const code = req.query.code;
  const result = await getUser(code);
  const accessToken = result.access_token;

  res.redirect(
    url.format({
      pathname: "/",
      query: {
        access_token: accessToken
      }
    })
  );
});

export default auth;
