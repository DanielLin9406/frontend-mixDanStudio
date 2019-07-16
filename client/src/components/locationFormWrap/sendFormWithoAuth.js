import axios from 'axios';

const client_id = app.env.GOOGLE_CLIENT_ID;
const client_secret = app.env.GOOGLE_CLIENT_SECRET;
const refresh_token = app.env.REFRESH_TOKEN;

async function getAccessToken() {
  return await axios.post(
    `https://www.googleapis.com/oauth2/v4/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`,
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
  );
}

async function postForm() {
  const access_token = await getAccessToken();
  const res = axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/1G9BKNDpUFsrd3Pu_f0Fi1og11MYWtIHmGqiXDw4SXTs/values/A1:append?includeValuesInResponse=false&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=USER_ENTERED`,
    {
      majorDimension: 'ROWS',
      range: '',
      values: [['Dan', 'test@email.com', 'second one']]
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${access_token.data.access_token}`
      }
    }
  );
  console.log(res);
  return res;
}

postForm();
