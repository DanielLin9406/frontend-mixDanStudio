const render = require('../html/header.art');
const data = {
    title: 'My Page'
};
const html = render(data);
const header_bgc = document.querySelector('.header_bgc');

if (typeof document === 'object') {
    header_bgc.innerHTML = html;
}

module.exports = "header";