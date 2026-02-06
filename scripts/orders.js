import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import formatCurrency from "./utills/money.js";
import dayJS from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { addToCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";


async function loadPage() {

  await loadProductsFetch();
  
  let orderHTML = ""
  
  orders.forEach((order) => { 
    const orderTime = dayJS(order.orderTime).format("MMMM D");
    const totalCost = formatCurrency(order.totalCostCents)
    
    orderHTML += `
      <div class="order-container ">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>£${totalCost}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">${orderGridHTML(order)}</div>
      </div>
    `
  });

  function orderGridHTML(order) {

    let orderGridHTML = ""

    order.products.forEach(product => {
      const { productId } = product
      const matchingProduct = getProduct(productId)
      const arrivalDate = dayJS(product.estimatedDeliveryTime).format("MMMM D")
    
      orderGridHTML +=`           
        <div class="product-image-container">
          <img src="${matchingProduct.image}" />
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">Arriving on: ${arrivalDate}</div>
          <div class="product-quantity js-product-quantity">Quantity: ${product.quantity} </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingProduct.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png" />
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
            <button class="track-package-button button-secondary js-track-package-button" data-product-id="${matchingProduct.id}">
              Track package
            </button>
          </a>
        </div>
      `

      

    });

    return orderGridHTML
  }

  document.querySelector(".js-orders-grid").innerHTML = orderHTML

  // E18m

  document.querySelectorAll(`.js-buy-again-button`).forEach(button => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset
    addToCart(productId)
  

    button.innerHTML = "Added"
    setTimeout(() => { button.innerHTML =`
      <img class="buy-again-icon" src="images/icons/buy-again.png" />
      <span class="buy-again-message">Buy it again</span>
    `}, 1200)
    updateCartQuantity();
  })

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity()

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity
  }
  
  updateCartQuantity();
});

}

loadPage();








