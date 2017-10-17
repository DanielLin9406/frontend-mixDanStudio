// sass
require('./index.scss');
// js
// It acts in the same way that window acts in the browswr.
// require('../../public/js/slider');
require('../../public/js/header');
require('../../public/js/footer');
// html with pug template and hot reload in DevMode
if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        require('!raw-loader!./index.pug');
    }
}

var index = {
    default: {
        wrap: document.querySelector('.banner'),
        items: document.querySelector('.banner_slider ul'),
        itemCount: document.querySelectorAll('.banner_slider ul li').length,
        scroller: document.querySelector('.banner_slider'),
        pos: 0,
    },
    next: function () {
        this.default.pos = Math.min(this.default.pos + 1, this.default.itemCount - 1);
        this.setTransform();
    },
    prev: function () {
        this.default.pos = Math.max(this.default.pos - 1, 0);
        this.setTransform();
    },
    setTransform: function () {
        this.default.items.style['transform'] = 'translate3d(' + (-this.default.pos * this.default.items.offsetWidth) + 'px,0,0)';
    }
};

module.exports = index;

window.addEventListener('resize', globalObject.setTransform);

