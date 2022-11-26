import { getUserInfo } from "../src/localstorage";

const Header ={
    render:()=>{
        const {name} = getUserInfo();
  return `
  <div class="brand">
  <a href="/">
    <img src="Images/logo.jpg" class="rounded-circle" alt="logo" />
    <h6><small>NALI FASHION</small></h6>
  </a>
</div>
<div class="nav">
${name? `<a href="/#/profile">${name}</a>`
:`<a href="/#/signin">Sign-In</a>`}
  <a href="/#/cart"><span class="fa fa-shopping-cart"></span></a>
</div>
  `
    },
    after_render:()=>{},
};
export default Header;