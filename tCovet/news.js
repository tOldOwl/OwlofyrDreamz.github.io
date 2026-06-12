document.addEventListener("DOMContentLoaded", function() {
    const list = document.getElementById('headline-list');
    if (!list) return;

    // Direct Google News ATOM Feed (No API keys or converters required)
    const feedUrl = 'https://google.com';

    fetch(feedUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            list.innerHTML = ''; // Clear the loading message

            // Grab the top 5 articles safely
            const maxItems = Math.min(items.length, 5);
            
            for (let i = 0; i < maxItems; i++) {
                const item = items[i];
                const title = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;
                const pubDate = item.querySelector("pubDate").textContent;
                
                // Format the date neatly
                const formattedDate = new Date(pubDate).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });

                const li = document.createElement('li');
                li.style.marginBottom = '12px';
                li.style.borderBottom = '1px dashed #eee';
                li.style.paddingBottom = '8px';

                li.innerHTML = `
                    <a href="${link}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: none; font-size: 14px; font-weight: 500; display: block; line-height: 1.4;">
                        ${title}
                    </a>
                    <small style="color: #999; font-size: 11px; display: block; margin-top: 4px;">
                        ${formattedDate}
                    </small>
                `;
                list.appendChild(li);
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            list.innerHTML = '<li style="color: #dc3545; font-size: 14px;">Unable to load news right now.</li>';
        });
});