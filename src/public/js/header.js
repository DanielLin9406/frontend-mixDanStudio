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

document.querySelector('.logo>a').appendChild(buildImgTag(img_logo));
module.exports = "header";