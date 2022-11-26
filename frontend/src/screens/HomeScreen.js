import axios from 'axios';
import Rating from '../../Components/Ratings';
import { hideshowLoading, showLoading } from '../utils';
const HomeScreen = {
  render: async () =>{
    showLoading();
    //Fetching data from beackend
    const response = await axios({
        url:"http://localhost:5000/api/products",
      headers:{
         'Content-Type': 'application/json',
      },  
    });
    hideshowLoading();
    if(!response || response.statusText !== 'OK'){
        return `<div>Error in getting data</div>`;
    }
    const products = response.data;
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