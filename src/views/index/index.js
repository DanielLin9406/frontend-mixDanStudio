// sass
require('./index.scss');
// js
require('../../public/js/header');
require('../../public/js/footer');
// html with pug template and hot reload in DevMode
if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        require('!raw-loader!./index.pug');
    }
}

module.exports = "index";
// require('./index.html');
// load lib
// const moment = require('moment');
// const _ = require('lodash');