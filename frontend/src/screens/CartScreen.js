import { getProduct } from "../api";
import { parseRequestUrl, rerender } from "../utils";
import { getCartItems, setcartItem } from "../localstorage";

const addToCart = (item, forceUpdate=false)=>{
  let cartItems = getCartItems();
  const existItem = cartItems.find((x)=> x.product === item.product);
  if(existItem){
      if(forceUpdate){
      cartItems = cartItems.map((x)=> x.product === existItem.product? 
      item: x);
  }
}
  else{
      cartItems = [...cartItems, item];
  }
  setcartItem(cartItems);
  if(forceUpdate){
      rerender(cartScreen);
  }
};
const removeFromCart = (id) =>{
 setcartItem(getCartItems().filter((x) => x.prooduct !== id));
 if(id === parseRequestUrl().id){
     document.location.hash = '/cart';
 }
 else{
     rerender(cartScreen);
 }
}
const cartScreen = {
    after_render:() =>{
   const qtySelects = document.getElementsByClassName("qty-select");
   Array.from(qtySelects).forEach(qtyselect => {
       qtyselect.addEventListener('change', (e)=>{
           const item = getCartItems().find((x) => x.product === qtyselect.id);
           addToCart({...item, qty:Number(e.target.value)}, true);
       });
   });
   const deleteButtons = document.getElementsByClassName("delete-button");
   Array.from(deleteButtons).forEach(deleteButton =>{
       deleteButton.addEventListener("click", ()=>{
           removeFromCart(deleteButton.id);
       });
   });
   document.getElementById("checkout-button").addEventListener("click", () =>{
      document.location.hash = '/signin'; 
   })
    },

    render:async()=>{
        const request = parseRequestUrl();
   if(request.id){
       const prooduct = await getProduct(request.id);
       addToCart({
           product: prooduct._id,
           name: prooduct.name,
           image: prooduct.image,
           price:prooduct.price,
           countInStock: prooduct.countInStock,
           qty: 1,
       });
   }
   const cartItems = getCartItems();
   return `
   <div class=" content cart">
    <div class="cart-list">
    <ul class="cart-list-container">
    <li>
    <h3>Shopping cart</h3>
    <div>Price</div>
    </li>
    <li>
    ${
        cartItems.length === 0? '<div>Cart is empty, <a href="/#/">Go Shopping</a></div>':
        cartItems.map(
            (item) => `
        <li>
        <div class ="cart-image">
        <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-name">
        <div>
      <a href="/#/product/${item.product}">${item.name}</a>
        </div>
      <div>
      Qty: <select class="qty-select" id="${item.product}">
      ${
          [...Array(item.countInStock).keys()].map(x=> item.qty === x+1 
            ? `<option selected value="${x+1}">${x + 1}</option>`
            : `<option value="${x + 1}">${x + 1}</option>`
            )}
      </select>
      <button type="button" class="delete-button" id="${item.product}">
      Delete
      </button>
      </div>
      </div>
      <div class="cart-price">
      $${item.price}
      </div>
        </li>
        `).join("\n")
    }
    </li>
    </ul>
    </div>
    <div class="cart-action">
    <h3>
    Subtotal (${cartItems.reduce((a, c) => a+c.qty, 0)} items)
    :
    $${cartItems.reduce((a, c) => a+c.price * c.qty, 0)}
    </h3>
    <button id="checkout-button" class="primary fw"><h4>
    Proceed To Checkout
    </h4></button>
    </div>
   </div>
   `
    }
}

export default cartScreen;