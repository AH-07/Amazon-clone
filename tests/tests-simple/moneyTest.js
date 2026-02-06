import {formatCurrency} from "../../scripts/utills/money.js";

function testFormatCurrency(input, expected) {
  if (formatCurrency(input) === expected) {
    console.log("Passed");
  } else {
    console.log("Failed");
  }
}

console.log("test suite: formatCurrency");

console.log("converts Cents to GDP");
if (formatCurrency(2095) === "20.95") {
  console.log("Passed");
} else {
  console.log("Failed");
}

console.log("works with 0");
testFormatCurrency(0, "0.00");

console.log("rounds up to the nearest penny");
testFormatCurrency(2000.5, "20.01");

// Exercise 16

console.log("rounds down to the nearest penny");
testFormatCurrency(2000.4, "20.00");


console.log("tests for negative behaviour");
testFormatCurrency(-100, "-1.00");
