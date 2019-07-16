export default class banner {
  constructor() {
    this.wrap = document.querySelector('.banner');
    this.items = document.querySelector('.banner-slider ul');
    this.itemCount = document.querySelectorAll('.banner-slider ul li').length;
    this.scroller = document.querySelector('.banner-slider');
    this.pos = 0;
  }
  setTransform() {
    this.items.style['transform'] =
      'translate3d(' + -this.pos * this.items.offsetWidth + 'px,0,0)';
  }
  next() {
    this.pos = Math.min(this.pos + 1, this.itemCount - 1);
    this.setTransform();
  }
  prev() {
    this.pos = Math.max(this.pos - 1, 0);
    this.setTransform();
  }
}
