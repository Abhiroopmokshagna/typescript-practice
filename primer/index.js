let hatPrice = 100;
console.log(`Hat price: ${hatPrice}`);
let bootsPrice = "100";
console.log(`Boots price: ${bootsPrice}`);

if (hatPrice === bootsPrice) {
  console.log("Prices are the same");
} else {
  console.log("Prices are different");
}

function sumPrices(first, second, third) {
  return first + second + third;
}

let totalPrice = sumPrices(hatPrice, bootsPrice);
console.log(`Total price: ${totalPrice}`);

let myVariable = "Adam";
console.log(`Type: ${typeof myVariable}`);
myVariable = 100;
console.log(`Type: ${typeof myVariable}`);

let firstCity;
let secondCity = firstCity || "London";
console.log(`City: ${secondCity}`);

let taxRate; // no tax rate has been defined
console.log(`Tax rate: ${taxRate ?? 10}%`);
taxRate = 0; // zero-rated for tax
console.log(`Tax rate: ${taxRate ?? 10}%`);
