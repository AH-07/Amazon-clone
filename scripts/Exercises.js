import dayJS from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

// remember to move the old exercises here too for more functionality

// Exercise 15


/* 15ab
console.log(
  dayJS()
  .add(5, "days")
  .format("MMMM D")
)*/

/* 15c

console.log(
  dayJS()
  .subtract(1,"month")
  .format("MMMM D")
)*/

/* 15d

console.log(
  dayOfWeek = dayJS().format("dddd")
)*/

// 15efg

const dayOfWeekTest = dayJS()
.add(2, "days")

export default function isWeekend(date) {
  const dayOfWeek = date.format("dddd")
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
};

/* original exercise workings
export function isWeekend(date) {
  const dayOfWeek = date.format("dddd")

  if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
    return `it's the Weekend (${dayOfWeek})`
  } else {
    return `it's Not the Weekend (${dayOfWeek})`
  }
};
*/

// console.log(isWeekend(dayOfWeekTest));


// 15h (on this)

// 15i 
// just inserted calculateCartQuantity() function


// Challenge 15 

// 15j

/* Exercise section - moved

console.log(isSatSun(dayJS())); */ 