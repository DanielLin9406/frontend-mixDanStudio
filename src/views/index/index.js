// sass
require('./index.scss');
// js
require('../../public/js/header');
require('../../public/js/footer');
// html
if (process.env.NODE_ENV === 'development') {
    require('./index.dev');
}
// require('./index.html');
// load lib
// const moment = require('moment');
// const _ = require('lodash');

module.exports = "index";