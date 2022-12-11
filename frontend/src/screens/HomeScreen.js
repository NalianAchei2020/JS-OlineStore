
import Rating from '../../Components/Ratings';
import { getProducts } from '../api';
import {parseRequestUrl } from '../utils';
const HomeScreen = {
  render: async () =>{
    const { value } = parseRequestUrl();
    const products = await getProducts({ searchKeyword: value });
    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }

      return`
      <div class="container-fluid hero">
      <div class="row align-items-start">
        <div class="col">
          <br />
          <span class="sub">Limited Time Only For Winter</span>
          <h1 class="fashion">fash<span class="i">i</span>on</h1>
          <p>LOOK YOU BEST ON YOUR BEST DAY</p>
          <button class="btn btn-danger" id="btn">Explore Now</button>
        </div>
        <div class="col">
          <img src="Images/woman-in-cart.png" id="image" />
        </div>
      </div>
    </div>

      <ul class="products">
      ${products.map(
          (product) =>
          `
          <li>
          <div class="product">
              <a href="/#/product/${product._id}">
                  <img src=${product.image} alt=${product.name} />
              </a>
              <div class="product-name">
                  <a href="/#/product/1">
                 ${product.name}
                  </a>
              </div>
              <div class="product-rating">
              ${Rating.render({value:product.rating, text:product.numReview+ 'reviews'})}
              </div>
              <div class="product-brand">
                 ${product.brand} 
              </div>
              <div class="product-price"><span>
              ${product.price}</span>
              </div>
          </div>
      </li>
          `
      ).join("\n")}
      </ul>
      `
  } , 
};
export default HomeScreen;