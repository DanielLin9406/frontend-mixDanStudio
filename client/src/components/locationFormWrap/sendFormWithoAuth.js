import axios from 'axios';

const client_id = app.env.GOOGLE_CLIENT_ID;
const client_secret = app.env.GOOGLE_CLIENT_SECRET;

function getAccessToken() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('access_token');
}

async function updateAccessToken() {
  return await axios.post(
    `https://www.googleapis.com/oauth2/v4/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`,
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
  );
}

async function postForm(bodyData = []) {
  const access_token = getAccessToken();
  const res = axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/1G9BKNDpUFsrd3Pu_f0Fi1og11MYWtIHmGqiXDw4SXTs/values/A1:append?includeValuesInResponse=false&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=USER_ENTERED`,
    {
      majorDimension: 'ROWS',
      range: '',
      values: [bodyData]
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }
  );
  console.log(res);
  return res;
}

function getFormDataOAuth(e) {
  if (e.target.name === 'submit') {
    const nodeList = e.currentTarget.childNodes;
    const formData = Array.from(nodeList)
      .filter(dom => dom.className === 'input-item')
      .map(dom => dom.childNodes[0].value);
    postForm(formData);
  }
}

export { getFormDataOAuth, updateAccessToken };
