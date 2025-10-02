// const { rejects } = require("assert");

// Define an async function
async function fetchData() {
    // Simulate an asynchronous operation using a Promise
    const data = await new Promise((resolve, another_reject) => {
      setTimeout(() => {
        another_reject("Hello from async!");
        }, 5000);
      });
    return data;
}

// Call the async function
fetchData().then((result) => {console.log(result)}).catch((error) => {console.error(error)});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function repeat() {
  while (true) {
    console.log("Printing every 2 seconds...");
    await sleep(2000); // wait 2 seconds
  }
}

repeat();