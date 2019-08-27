import '../../components/header/header';
import '../../components/footer/footer';
import banner from '../../shared/banner';
import ripple from '../../shared/ripple';
// Use API_KEY
import { getFormDataAPIKeys } from '../../components/locationFormWrap/sendFormWithApiKeys';
// Use oAuth2 (need backend)
import { getFormDataOAuth } from '../../components/locationFormWrap/sendFormWithoAuth';

// sass
import './index.scss';

const onLoadMapbox = ({ default: mapboxgl, initMap }) => {
  mapboxgl.accessToken = app.env.MAP_BOX_TOKEN;

  // const map = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
  //   center: [121.54, 25.02],
  //   minzoom: 3,
  //   maxzoom: 9,
  //   zoom: 12,
  //   pitch: 45,
  //   bearing: -17.6
  // });
  // initMap({ map, mapboxgl });
};

const onLoadPhotoWorkSlider = ({ default: initPhotoWorkSlider }) => {
  initPhotoWorkSlider();
};
const onLoadLettering = ({ default: lettering, jQuery }) => {
  jQuery('.photoWorksLettering p').lettering();
  jQuery('.webWorksLettering p').lettering();
};

// html with pug template and hot reload in DevMode
if (process.env.NODE_ENV === 'development' && module.hot) {
  import('./index.pug');
}

const asyncLoadComponents = [
  {
    import: import(
      /* webpackChunkName: "mapboxgl", webpackPrefetch: 0 */ '../../shared/mapbox'
    ).then(onLoadMapbox)
  },
  {
    import: import(
      /* webpackChunkName: "photoWorkSlider", webpackPrefetch: 2 */ '../../shared/photo-work-slider'
    ).then(onLoadPhotoWorkSlider)
  },
  {
    import: import(
      /* webpackChunkName: "lettering", webpackPrefetch: 1 */ '../../shared/lettering.min.js'
    ).then(onLoadLettering)
  }
];

const getImport = () => asyncLoadComponents.map(ele => ele.import);

// Async import componet
Promise.all(getImport()).then(component => {
  console.log('component loading');
  // document.body.appendChild(...component);
});

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}

// Header hide when scroll down
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
let takeActionHeight = '';
let takeActionContainerToTop = '';
let takeActionContainerToBottom = '';
let footerHeight = '';
let productItemCheckoutCss_general = '';
let productItemCheckoutCss_reachPoint = '';
let productItemCheckoutCss_reachFooter = '';
let bodyHeight = '';
let windowHeight = '';
let toFooterTop = '';
let statusContainer = '';
let statusContainerToTop = '';

window.addEventListener('scroll', function() {
  bodyHeight = document.body.clientHeight;
  windowHeight = window.innerHeight;

  takeActionHeight = document.querySelector('.takeAction').clientHeight;
  statusContainer = document.querySelector('.statusWrap').clientHeight;

  takeActionContainerToTop = getPosition(
    document.querySelector('.takeActionWrap')
  );
  statusContainerToTop = getPosition(document.querySelector('.statusWrap'));

  // Desktop
  takeActionContainerToBottom =
    statusContainerToTop.y -
    takeActionHeight -
    (windowHeight - takeActionHeight) / 2;

  // Desktop revised css style
  productItemCheckoutCss_general = 'position:absolute;';
  productItemCheckoutCss_reachPoint = 'position:fixed;';
  productItemCheckoutCss_reachFooter = 'position:absolute;bottom:0;top:auto;';

  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    document.querySelector('header').style.top = '-55px';
    // subMenu ? subMenu.style.top = '0px': false;
  } else {
    document.querySelector('header').style.top = '0px';
    // subMenu ? subMenu.style.top = subMenuTop+'px' : false;
  }
  lastScrollTop = st;

  if (st >= takeActionContainerToTop.y && st < takeActionContainerToBottom) {
    document.querySelector(
      '.takeAction'
    ).style.cssText = productItemCheckoutCss_reachPoint;
  } else if (st >= takeActionContainerToBottom) {
    document.querySelector(
      '.takeAction'
    ).style.cssText = productItemCheckoutCss_reachFooter;
  } else {
    document.querySelector(
      '.takeAction'
    ).style.cssText = productItemCheckoutCss_general;
  }
});

window.onload = function() {
  //Index init
  window.addEventListener('resize', globalObject.setTransform);
  let index_banner = new banner();
  document.querySelectorAll('.arrow')[0].addEventListener(
    'click',
    function() {
      index_banner.prev();
    },
    false
  );
  document.querySelectorAll('.arrow')[1].addEventListener(
    'click',
    function() {
      index_banner.next();
    },
    false
  );
  // Use Api keys to post
  // document
  //   .querySelector('#form')
  //   .addEventListener('click', getFormDataAPIKeys, false);
  // Use AJAX to call OAuth 2.0 access_token to post
  // document.querySelector('#login').addEventListener('click', login, false);
  document
    .querySelector('#form')
    .addEventListener('click', getFormDataOAuth, false);

  document
    .querySelector('.photoWorksWrap')
    .addEventListener('click', ripple, false);
};
