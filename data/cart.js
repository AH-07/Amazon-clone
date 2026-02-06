import { validifyDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1"
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2"
    }];
  }
};


export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });

  return cartQuantity
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) { 
      cartItem.quantity = newQuantity
    }
  })
  saveToStorage()
}


function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function addToCart(productId, quantity){
  let matchingItem;

  cart.forEach((cartItem)=>{
      if (productId === cartItem.productId){
        matchingItem = cartItem
      }
    }) 

    if (matchingItem) {
      matchingItem.quantity += quantity || 1;
    } else {
    cart.push({
      productId: productId,
      quantity: quantity || 1,
      deliveryOptionId: "1"
    });
  };

  saveToStorage()
}

export function removeFromCart(productId) {
  const newCart = []
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  });

  cart = newCart;

  saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  if (validifyDeliveryOption(deliveryOptionId) === false) {
    return
  }

  let matchingItem;

  cart.forEach((cartItem)=>{
    if (productId === cartItem.productId){
      matchingItem = cartItem
    }
  });

  if (!matchingItem) {
    return
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    func();
  })

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

// E18h
export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart")
  const text = await response.text();
  // console.log(text)
}