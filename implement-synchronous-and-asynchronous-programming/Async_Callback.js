console.log("=== Callback Style ===");

function login(callback) {
    setTimeout(() => {
        console.log("Login successful");
        callback();
    }, 1000);
}

function getData(callback) {
    setTimeout(() => {
        console.log("Fetching data...");
        callback({ name: "Anushka", score: 85 });
    }, 1500);
}

function displayData(data, callback) {
    setTimeout(() => {
        console.log("Displaying data:", data);
        callback();
    }, 1000);
}

function attemptTest(callback) {
    setTimeout(() => {
        console.log("Attempting test...");
        callback();
    }, 1000);
}

function logout(callback) {
    setTimeout(() => {
        console.log("Logout successful");
        callback();
    }, 500);
}

function callOtherApp() {
    console.log("Call other app");
}

// Run flow using callbacks
login(() => {
    getData((data) => {
        displayData(data, () => {
            attemptTest(() => {
                logout(() => {
                    callOtherApp();
                });
            });
        });
    });
});
