const render = require('../html/header.art');
const data = {
    title: 'My Page'
};
const html = render(data);
const header_bgc = document.querySelector('.header_bgc');

if (typeof document === 'object') {
    header_bgc.innerHTML = html;
}

//import img
var img_logo = require("../../assets/logo.png");

function buildImgTag(claName) {
    var img = document.createElement('img');
    img.src = img_logo;
    img.className = claName;
    return img;
}
module.exports = "header";

document.querySelector('.logo>a').appendChild(buildImgTag(img_logo));

// //import img
// // 使用html loader 版本
// var img_logo = require("html-loader!../html/img.html");
// function buildImgTag() {
//     return img_logo;
// }
// document.querySelector('.logo>a').insertAdjacentHTML('beforeend', buildImgTag());