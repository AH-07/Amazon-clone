import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js"; 
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
import { orders } from "../data/orders.js";
// import isSatSun from "./Exercises.js"; from exercises
//import dayJS from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js" from exercises
// import "../data/cart-class.js";
// import "../data/car.js"
// import "../data/backend-practice.js"


Promise.all([
  loadProductsFetch(),
  loadCartFetch(),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}).catch(() => {
  console.log("Unexpected error. Please try again later.")
})
    


  


/* E18h
async function loadPage() {
  try {
    await loadProductsFetch();
    await loadCartFetch();
  } catch (error) {
    console.log("Unexpected error. Please try again later.")
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
}

loadPage();
*/

/*
async function loadPage() {
  try {
    // throw "error 1"; manual error usuable everywhere in normal code but for unexpected errors

    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      // throw "error 2"; manual error in a promise method 1
      loadCart(() => {
        // throw does not work in this because it happens in the future

        // reject("error 3") 2nd method to make a manual error in a proimise (works in the future)
        resolve("value3");
      });  
    });
    
  } catch (error) {
    console.log("Unexpected error. Please try again later.")
  }

  

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
}

loadPage();
*/

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });  
  })

]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader(); 
});
*/


/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });

}).then((value) => {
  // console.log(value)

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });  
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();  
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader(); // added in challenge 15j
  });
});
*/





