let size = 8;
let result = "";

for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
  for (let columnIndex = 0; columnIndex < size; columnIndex += 1) {
    if ((rowIndex + columnIndex) % 2 == 0) {
      result += "□";
    }
    else {
      result += "■";
    }
  }
  result += "\n";
}
console.log(result);

//If code is running in browser
if (typeof window === "object"){
  /*
  const is a way to define a variable so that it doesn't change
  document.getElementById() allows this file to access element in page with id of "output"
  */
  const outputElement = document.getElementById("output");
  /*
  We have element, set innerText to result
  innerText is the text directly inside that element
  */
  outputElement.innerText = result;
}