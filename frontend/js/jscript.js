// Handle the scanner form
document.getElementById('scannerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('scanUrl').value;
    const resultsDiv = document.getElementById('scannerResults');
    
    resultsDiv.innerHTML = '<p class="scanning">Scanning, please wait...</p>';
    
    try {
        const response = await fetch('http://localhost:3000/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            let html = `<div class="result"><h4>Scan Results for: ${url}</h4>`;
            html += `<p><strong>Trust Score: ${data.score}/100</strong></p>`;
            
            if (data.issues.length > 0) {
                html += '<ul>';
                data.issues.forEach(issue => {
                    html += `<li>⚠️ ${issue}</li>`;
                });
                html += '</ul>';
            } else {
                html += '<p>✅ No common dark patterns detected!</p>';
            }
            
            html += '</div>';
            resultsDiv.innerHTML = html;
        } else {
            resultsDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = '<p class="error">Scanner service unavailable. Please try again later.</p>';
    }
});