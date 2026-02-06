import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import isWeekend from "../scripts/Exercises.js";

export const deliveryOptions = [{
  id: "1",
  deliveryDays: 7,
  priceCents: 0
},{
  id: "2",
  deliveryDays: 3,
  priceCents: 499
},{
  id: "3",
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option
    }
  })

  return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption) {
  /* previous exercise
  const deliveryDate = today.add(
    deliveryOption.deliveryDays, "days"
  );*/

  const today = dayjs();

  // 15m

  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = today;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day")

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }  
  }

  const dateString = deliveryDate.format("dddd, D MMMM");
  
  return dateString;
};

export function validifyDeliveryOption(deliveryOptionId) {
  let result = false

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      result = true
    }
  })

  return result
}