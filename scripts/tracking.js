import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import dayJS from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"


async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");
  const orderId = url.searchParams.get("orderId");

  const order = getOrder(orderId)
  const product = getProduct(productId)

  let productDetails;

  order.products.forEach(details => {
    if (product.id === details.productId) {
      productDetails = details
    }
  });
  
  
  // E18o

  const today = dayJS();
  const orderTime =  dayJS(order.orderTime)
  const deliveryTime = dayJS(productDetails.estimatedDeliveryTime)
  const percentageProgress= ((today - orderTime)/(deliveryTime - orderTime) * 100)

  const trackPackageHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${dayJS(productDetails.estimatedDeliveryTime).format("dddd, MMMM D")}</div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">Quantity: ${productDetails.quantity}</div>

    <img
      class="product-image"
      src="${product.image}"
    />

    <div class="progress-labels-container">
      <div class="progress-label ${percentageProgress < 50 ? "current-status" : ""}">Preparing</div>
      <div class="progress-label ${percentageProgress >= 50 && percentageProgress < 100 ? "current-status" : ""} ">Shipped</div>
      <div class="progress-label ${percentageProgress >= 100 ? "current-status" : ""}">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div style="width: ${percentageProgress}%;" class="progress-bar"></div>
    </div>
  `
  document.querySelector(".js-order-tracking").innerHTML = trackPackageHTML
}

loadPage();




/*
document.querySelector(".js-track-package-button").forEach(button => {
  button.addEventListener("click", () =>{
    
  })
});*/


/* example
const url = new URL(window.location.href);
console.log(url.searchParams.get("orderId"));
console.log(url.searchParams.get("productId"));
*/