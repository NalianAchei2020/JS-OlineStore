import { getUserInfo } from "../src/localstorage";
import { parseRequestUrl } from "../src/utils";

const Header ={
    render:()=>{
        const { name, isAdmin } = getUserInfo();
        const { value } = parseRequestUrl();
  return `
  <div class="brand">
  <button id="aside-open-button">
  &#9776;
</button>
  <a href="/">
    <img src="Images/logo.jpg" class="rounded-circle" alt="logo" />
    <h6><small>NALI FASHION</small></h6>
  </a>
</div>
<div class="search">
  <form class="search-form"  id="search-form">
    <input type="text" name="q" id="q" value="${value || ''}" /> 
    <button type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
<div class="nav">
${name? `<a href="/#/profile">${name}</a>`
:`<a href="/#/signin">Sign-In</a>`}
  <a href="/#/cart"><span class="fa fa-shopping-cart"></span></a>
  ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
</div>
  `
    },
    after_render:()=>{
      document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
    },
};
export default Header;