import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/productsreen.js';
import { hideshowLoading, parseRequestUrl, showLoading } from './utils.js';
import Error404Screen from './screens/error404screen.js';
import cartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/signinScreen.js';
import Header from '../Components/header.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/shippingScreen.js';
import PaymentScreen from './screens/paymentScreen.js';
import PlaceorderScreen from './screens/placeorderScreen.js';
import OrderScreen from './screens/OrderScreen .js';

const routes = {
    "/": HomeScreen,
    '/product/:id': ProductScreen,
    '/order/:id': OrderScreen,
    '/cart/:id': cartScreen,
    '/cart': cartScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
   '/placeorder': PlaceorderScreen,
}
const router = async () =>{
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = (request.resource? `/${request.resource}`: '/') + 
    (request.id? '/:id':'') +
    (request.verb? `/${request.verb}`:'');
    const screen = routes[parseUrl]? routes[parseUrl]:Error404Screen;
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById('main-container');
    main.innerHTML= await screen.render();
   if(screen.after_render) await screen.after_render();
    hideshowLoading();
}
window.addEventListener('load', router);
window.addEventListener('hashchange', router)