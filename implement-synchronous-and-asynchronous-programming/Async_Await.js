console.log("=== Async/Await Style ===");

function loginAsync() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Login successful");
            resolve();
        }, 1000);
    });
}

function getDataAsync() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Fetching data...");
            resolve({ name: "Anushka", score: 85 });
        }, 1500);
    });
}

function displayDataAsync(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Displaying data:", data);
            resolve();
        }, 1000);
    });
}

function attemptTestAsync() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Attempting test...");
            resolve();
        }, 1000);
    });
}

function logoutAsync() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Logout successful");
            resolve();
        }, 500);
    });
}

function callOtherAppAsync() {
    console.log("Call other app");
}

async function runAsyncFlow() {
    await loginAsync();
    const data = await getDataAsync();
    await displayDataAsync(data);
    await attemptTestAsync();
    await logoutAsync();
    callOtherAppAsync();
}

runAsyncFlow();
