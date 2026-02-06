import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js"
import { products, getProduct } from "../../data/products.js"
import formatCurrency  from "../utills/money.js"
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js"
import { renderCheckoutHeader } from "./checkoutHeader.js"

export function renderOrderSummary() {
  let cartSummaryHTML = ""

  

  cart.forEach((cartItem) => {
    const productId = cartItem.productId

    const matchingProduct = getProduct(productId)

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId)

    const dateString = calculateDeliveryDate(deliveryOption);
    

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container
        js-cart-item-container-${matchingProduct.id}"
        data-product-id="${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src="${matchingProduct.image}"
          />

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">${matchingProduct.getPrice()}</div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="link-primary save-quantity-link js-save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  })

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html="";

    deliveryOptions.forEach((deliveryOption) => {
      
      const dateString = calculateDeliveryDate(deliveryOption)

      const priceString = deliveryOption.priceCents === 0 
      ? "FREE Shipping"
      : `£${formatCurrency(deliveryOption.priceCents)} - Shipping`

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
      
      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString}</div>
          </div>
        </div>
      `
    });

    return html;
  }

  document.querySelector(".js-order-summary")
  .innerHTML = cartSummaryHTML

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click",() => {
      const {productId} = link.dataset;
      removeFromCart(productId)

      renderOrderSummary(); // added in exercise 15h
      renderPaymentSummary();
      renderCheckoutHeader(); // added in Exercise 15k
    });
  });

  document.querySelectorAll(".js-delivery-option")
  .forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary()
      renderPaymentSummary();
    })
  })


  /* Exercise 14 

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity()

    document.querySelector(".js-quantity-display")
    .innerHTML = `${cartQuantity} items`
  }
  */

  // Challenge 14

  document.querySelectorAll(".js-update-quantity").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const { productId } = updateLink.dataset

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.add("is-editing-quantity")
    })
  })

  document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      updateSave(saveLink);
      renderPaymentSummary();
      renderCheckoutHeader();
    })
  });

  document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const isEditingStatus = document.querySelector(".is-editing-quantity")
      if (!isEditingStatus) return;

      // const { productId } = isEditingStatus.dataset 
      // didnt use this bc of unlearnt syntax

      const saveLink = isEditingStatus.querySelector(`.js-save-quantity-link`)

      if (isEditingStatus) {
        updateSave(saveLink);
        renderPaymentSummary();
        renderCheckoutHeader(); 
      }
    } 
  });

  function updateSave(saveLink) {
    const { productId } = saveLink.dataset

    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)

    if (newQuantity >= 0 && newQuantity < 1000) {
      quantityLabel.innerHTML = newQuantity
      updateQuantity(productId, newQuantity)
    } else {
      alert("Invalid Quantity: must be between 0 and 1000")
      return 
    }
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.classList.remove("is-editing-quantity")
  };

  /* 14n add your own features
  - added 0 < 1000 validation
  - added enter key for saving
  */ 
}







