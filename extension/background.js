chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "openChatbot") {
        chrome.windows.create({
            url: "https://your-website.com/sandbox.html", // Link to your sandbox
            type: "popup",
            width: 500,
            height: 600
        });
    }
});