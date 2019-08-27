# MixDanStudio 混單工作室

This is my very first website project to front-end side.

![preview](https://i.imgur.com/JKoH6tk.jpg)

## Features

Tech perspectives:

- Multi-entry webpack
- Write a replace image path webpack plugin
- Implement OAuth 2.0 and API keys to authorize user.
- Implement Google Sheet API
- Test dynamic import component by webpack.

## Prerequisite

- Node v10.16
- npm v6.9

### Client

1. Create .env file

```bash
# ./client/.env
MAP_BOX_TOKEN=<Mapbox token>
GOOGLE_SHEET_API_KEY=<Google Sheet API with API keys>
GOOGLE_CLIENT_ID=<Google OAuth 2 Client Id>
GOOGLE_SPREAD_SHEET_ID=<Google Spread Sheet ID>
REFRESH_TOKEN=<Google OAuth Refresh Token>
```

2. Install dependence

```bash
# ./client
npm i
```

### Server

1. Create .env file

```bash
# ./server/.env
PORT=5000
CLIENT_ID=<Google OAuth 2.0 Cliend ID>
CLIENT_SECRET=<Google OAuth 2.0 Cliend Secret>
```

2. Install dependence

```bash
# ./server
npm i
```

## Start Project

```bash
# ./client
npm start
```

## Build Project

```bash
# ./client
npm run build
```

## Start Server to fetch OAuth access_token

```bash
# ./server
npm run server
```

## TechStacks

- Webpack 4
- Babel 7
- Pug
- SASS
- jQuery
- ESlint
- Prettier
- Image hosting: AWS S3
- Secret data handler: dotenv
- Google OAuth 2.0
- Express.js

## License

[MIT](https://choosealicense.com/licenses/mit/)
