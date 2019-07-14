export default function ripple(e) {
  let posX = null;
  let posY = null;
  let buttonWidth = null;
  let buttonHeight = null;
  let pageX = null;
  let pageY = null;

  // Setup
  if (e.target.classList.contains('sliderCtrl')) {
    posX = e.target.parentNode.parentNode.offsetLeft;
    posY = e.target.parentNode.parentNode.offsetTop;
    buttonWidth = e.target.parentNode.parentNode.offsetWidth;
    buttonHeight = e.target.parentNode.parentNode.offsetHeight;
  } else if (e.target.parentNode.classList.contains('sliderCtrl')) {
    posX = e.target.parentNode.parentNode.parentNode.offsetLeft;
    posY = e.target.parentNode.parentNode.parentNode.offsetTop;
    buttonWidth = e.target.parentNode.parentNode.parentNode.offsetWidth;
    buttonHeight = e.target.parentNode.parentNode.parentNode.offsetHeight;
  } else {
    posX = e.target.offsetLeft;
    posY = e.target.offsetTop;
    buttonWidth = e.target.offsetWidth;
    buttonHeight = e.target.offsetHeight;
  }
  pageX = e.pageX;
  pageY = e.pageY;

  // Remove olds ones
  let oldripple = document.querySelector('.ripple') || null;
  if (oldripple) oldripple.remove();

  // Add the element as firstChild
  let ripple = document.createElement('span');
  ripple.classList.add('ripple');

  if (e.target.classList.contains('sliderCtrl')) {
    e.target.parentNode.parentNode.insertBefore(
      ripple,
      e.target.parentNode.parentNode.firstChild
    );
  } else if (e.target.parentNode.classList.contains('sliderCtrl')) {
    e.target.parentNode.parentNode.parentNode.insertBefore(
      ripple,
      e.target.parentNode.parentNode.parentNode.firstChild
    );
  } else {
    e.target.insertBefore(ripple, e.target.firstChild);
  }

  // Make it round!
  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  let x = pageX - posX - buttonWidth / 2;
  let y = pageY - posY - buttonHeight / 2;

  let cssStyle =
    'width:' +
    buttonWidth +
    'px;height:' +
    buttonHeight +
    'px;top:' +
    y +
    'px' +
    ';left:' +
    x +
    'px;';

  // Add the ripples CSS and start the animation
  document.querySelector('.ripple').style.cssText = cssStyle;
  document.querySelector('.ripple').classList.add('rippleEffect');
}
