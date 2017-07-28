// sass
require('./index.scss');
// js
require('../../public/js/header.js');
require('../../public/js/footer.js');
// load lib
// var moment = require('moment');

//import header
const header_bgc = document.querySelector('.header_bgc');
if (typeof document === 'object') {
    header_bgc.innerHTML = html;
}



module.exports = "index";