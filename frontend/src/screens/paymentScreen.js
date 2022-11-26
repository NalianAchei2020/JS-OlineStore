import CheckoutSteps from "../../Components/checkout";
import { getUserInfo, setPayment, setUserInfo } from "../localstorage";

const PaymentScreen = {
    after_render: ()=>{
     
      document.getElementById("payment-form")
      .addEventListener('submit', async(e)=>{
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        setPayment({paymentMethod});
        document.location.hash ='/placeOrder';
      })
    },

  render: () =>{
    const {name} = getUserInfo();
    if(!name){
      document.location.hash ='/';
    }
    
    return `
    ${CheckoutSteps.render({ step1:true, step2:true, step3:true,})}
    <div class="form-container">
    <form id="payment-form">
    <ul class="form-items">
    <li>
    <h1>Payment</h1>
    </li>
    <li>
    <div>
    <input type="radio" name="payment-method" id="paypal" value="PAYPAL" checked/>
    <label for="paypal">Paypal</label>
    </div>
    </li>
    <li>
    <div>
    <input type="radio" name="payment-method" id="stripe" value="STRIPE" checked/>
    <label for="stripe">Stripe</label>
    </div>
    </li>
    <li>
    <div>
    <input type="radio" name="payment-method" id="creditcard" value="CREDIT CARD" checked/>
    <label for="creditcard">Credit Card</label>
    </div>
    </li>
    <li>
    <button type="submit" class="primary">Continue</button>
    </li>
    </ul>
    </form>
    </div>
    `
  }
}
export default PaymentScreen;