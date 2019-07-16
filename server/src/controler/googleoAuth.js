import { google } from "googleapis";
import axios from "axios";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `http://localhost:${process.env.PORT}/auth/callback`
);
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: scopes
});

function fetchUrl() {
  axios.get(url);
  console.log(url);
  console.log("request sent");
}

async function getUser(code) {
  const { tokens } = await oauth2Client.getToken(code);
  console.log(tokens);
  return tokens;
}

export { getUser };
export default fetchUrl;
