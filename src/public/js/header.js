if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        require('!raw-loader!../html/header.pug');
    }
}

module.exports = "header";

// const render = require('../html/header.art');
// const data = {
//     title: 'My Page'
// };
// const html = render(data);
// const header_bgc = document.querySelector('.header_bgc');

// if (typeof document === 'object') {
//     header_bgc.innerHTML = html;
// }
// document.querySelector('.logo>a').appendChild(buildImgTag(img_logo));

// //import img
// // 使用html loader 版本
// var img_logo = require("html-loader!../html/img.html");
// function buildImgTag() {
//     return img_logo;
// }
// document.querySelector('.logo>a').insertAdjacentHTML('beforeend', buildImgTag());