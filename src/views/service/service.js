// sass
require('./service.scss');
// js
require('../../public/js/header.js');
require('../../public/js/footer.js');
// load lib
// const moment = require('moment');
// const _ = require('lodash');
// html with pug template and hot reload in DevMode
if (process.env.NODE_ENV === 'development' && module.hot) {
  import ('!raw-loader!./service.pug');
}


module.exports = "service";