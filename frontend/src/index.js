import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/productsreen.js';
import { parseRequestUrl } from './utils.js';
import Error404Screen from './screens/error404screen.js';
import cartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/signinScreen.js';


const routes = {
    "/": HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': cartScreen,
    '/cart': cartScreen,
    '/signin': SigninScreen,
}
const router = async () =>{
    const request = parseRequestUrl();
    const parseUrl = (request.resource? `/${request.resource}`: '/') + 
    (request.id? '/:id':'') +
    (request.verb? `/${request.verb}`:'');
    const screen = routes[parseUrl]? routes[parseUrl]:Error404Screen;

    const main = document.getElementById('main-container');
    main.innerHTML= await screen.render();
    await screen.after_render();
}
window.addEventListener('load', router);
window.addEventListener('hashchange', router)