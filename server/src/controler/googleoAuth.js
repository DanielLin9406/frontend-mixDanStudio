import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `http://localhost:8080/auth/callback`
);
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: scopes
});

/**
 * @param {string} code 
 * @returns {object} tokens
  {
    access_token:
    refresh_token:
    scope:
    token_type:
    expiry_date:
  }
 */
async function getUser(code) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export { getUser, oauth2Client };
export default url;
