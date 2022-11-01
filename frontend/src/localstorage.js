export const getCartItems =()=>{
    const cartItems = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):
    [];
    return cartItems;

}

export const setcartItem = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}