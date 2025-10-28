console.log("=== Promise Style ===");

function login() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Login successful");
            resolve();
        }, 1000);
    });
}

function getData() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Fetching data...");
            resolve({ name: "Anushka", score: 85 });
        }, 1500);
    });
}

function displayData(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Displaying data:", data);
            resolve();
        }, 1000);
    });
}

function attemptTest() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Attempting test...");
            resolve();
        }, 1000);
    });
}

function logout() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Logout successful");
            resolve();
        }, 500);
    });
}

function callOtherApp() {
    console.log("Call other app");
}

// Run flow using Promises
login()
    .then(getData)
    .then(displayData)
    .then(attemptTest)
    .then(logout)
    .then(callOtherApp);
