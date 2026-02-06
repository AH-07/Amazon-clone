import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";

describe("test suite: addToCart", () => {

  beforeEach(() => {
    spyOn(localStorage, "setItem");

  })

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: "1"
      }]);
    });

    loadFromStorage();

    
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId: "1"
      }])
    );
  });



  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: "1"
      }]));
  });
});

describe("test suite: removeFromCart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
  beforeEach(() => {
    spyOn(localStorage, "setItem")

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: "1"
      }]);
    });

    loadFromStorage();
  })

  //Exercise 16i - just finished
  it("removes a productId that is in the cart", () => {
    removeFromCart(productId1)
    expect(cart.length).toEqual(0)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart))
  })

  it("removes a productId that is Not in the cart", () => {
    removeFromCart(productId2)
    expect(cart.length).toEqual(1)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: "1"
      }]))
  } )    
})

describe("test suite: updateDeliveryOption", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

  beforeEach(() => {
   spyOn(localStorage, "setItem")
   spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: "1"
      }]);
   });

   loadFromStorage();
  })

  it("updates the delivery option of a product that is in the cart", () => {
    updateDeliveryOption(productId1,"3")

    expect(cart[0].deliveryOptionId).toEqual("3")
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual(productId1)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith("cart",
      JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: "3"
      }])
    )
  });
  
  it("updates the delivery option of a product that is NOT in the cart ", () => {
    updateDeliveryOption(productId2, "2")

    expect(cart.length).toEqual(1)

    expect(localStorage.setItem).not.toHaveBeenCalledTimes(1)
  })

  it("checks if a deliveryOptionId is Not in the cart", () => {

    expect(cart[0].deliveryOptionId).toEqual("1")
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual(productId1)

    expect(localStorage.setItem).not.toHaveBeenCalledTimes(1)
  })
})

// ended on 16m
  
