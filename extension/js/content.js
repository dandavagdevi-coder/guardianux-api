// Inject the floating button
function injectButton() {
    if (document.getElementById('guardian-ai-button')) return;
    
    const button = document.createElement('button');
    button.id = 'guardian-ai-button';
    button.textContent = '🛡️ AI Guide';
    button.title = 'Get an AI explanation of dark patterns on this page';
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "openChatbot" });
    });
}

// Basic dark pattern highlighting (simplified)
function scanPage() {
    const shamePhrases = [
        'no thanks, i like paying full price',
        'no thanks, i don\'t want to save money'
    ];
    
    document.querySelectorAll('button, a').forEach(element => {
        const text = element.textContent.toLowerCase();
        if (shamePhrases.some(phrase => text.includes(phrase))) {
            element.style.border = '2px solid red';
            element.style.padding = '2px';
        }
    });
}

// Run on page load
injectButton();
scanPage();

// Watch for dynamic content
new MutationObserver(() => {
    injectButton();
    scanPage();
}).observe(document.body, { childList: true, subtree: true });