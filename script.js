(function() {
  // Watch for the redirect URL to appear in the page
  const observer = new MutationObserver(function() {
    
    // Method 1: look for any external link that appears
    const links = [...document.querySelectorAll('a[href]')];
    const dest = links.find(a => 
      !a.href.includes('tarviral.com') && 
      a.href.startsWith('http')
    );
    if (dest) {
      observer.disconnect();
      window.location.href = dest.href;
      return;
    }

    // Method 2: check if redirect URL is in any script tag
    const scripts = [...document.querySelectorAll('script')];
    for (let s of scripts) {
      const match = s.innerText.match(/"(https?:\/\/(?!tarviral)[^"]+)"/);
      if (match) {
        observer.disconnect();
        window.location.href = match[1];
        return;
      }
    }

    // Method 3: check window object for redirect URL
    try {
      const str = JSON.stringify(window.__NEXT_DATA__ || {});
      const match = str.match(/"(https?:\/\/(?!tarviral)[^"]+)"/);
      if (match) {
        observer.disconnect();
        window.location.href = match[1];
        return;
      }
    } catch(e) {}
  });

  // Start watching the entire page for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });

  // Also try immediately
  setTimeout(() => {
    const str = JSON.stringify(window.__NEXT_DATA__ || {});
    const match = str.match(/"(https?:\/\/(?!tarviral)[^"]+)"/);
    if (match) {
      observer.disconnect();
      window.location.href = match[1];
    }
  }, 2000);

})();
