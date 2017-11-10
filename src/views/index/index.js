// sass
import ('./index.scss');
// js
// It acts in the same way that window acts in the browswr.
// require('../../public/js/slider');
import ('../../public/js/header');
import ('../../public/js/footer');
// html with pug template and hot reload in DevMode
if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        import ('!raw-loader!./index.pug');
    }
}

export default function index(){
    console.log(document.querySelectorAll('.arrow')[0]);
}

export class banner{
    constructor(){
        this.wrap = document.querySelector('.banner');
        this.items = document.querySelector('.banner_slider ul');
        this.itemCount = document.querySelectorAll('.banner_slider ul li').length;
        this.scroller = document.querySelector('.banner_slider');
        this.pos = 0;
        // this.bindCtrl();
    }
    setTransform () {
        this.items.style['transform'] = 'translate3d(' + (-this.pos * this.items.offsetWidth) + 'px,0,0)';
    }
    next () {
        this.pos = Math.min(this.pos + 1, this.itemCount - 1);
        this.setTransform();
    }
    prev () {
        this.pos = Math.max(this.pos - 1, 0);
        this.setTransform();
    }   
        // document.querySelectorAll('.arrow')[1].addEventListener('click',this.next(),false);
}

// var index_banner = new function(){
//     this.init = function(){

//     }
//     this.run = function(){

//     }
// }
let index_banner = new banner();
document.querySelectorAll('.arrow')[1].addEventListener('click',function(){
    index_banner.next();
},false);
// document.querySelectorAll('.arrow')[1].addEventListener('click',index_banner.next,false);
// var b = new index();

// console.log(b);
window.addEventListener('resize', globalObject.setTransform);

