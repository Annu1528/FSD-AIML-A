console.log("=== Synchronous Flow ===");

function loginSync() {
    console.log("Login successful");
}

function getDataSync() {
    console.log("Fetching data...");
    return { name: "Anushka", score: 85 };
}

function displayDataSync(data) {
    console.log("Displaying data:", data);
}

function attemptTestSync() {
    console.log("Attempting test...");
}

function logoutSync() {
    console.log("Logout successful");
}

function callOtherAppSync() {
    console.log("Call other app");
}

// Run synchronously
loginSync();
const dataSync = getDataSync();
displayDataSync(dataSync);
attemptTestSync();
logoutSync();
callOtherAppSync();
