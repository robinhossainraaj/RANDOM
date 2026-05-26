(function() {

  // Auto-click any continue/proceed button immediately
  function autoClick() {
    // Common button texts on these redirect pages
    const keywords = ['continue', 'proceed', 'skip', 'next', 
                      'get link', 'click here', 'go', 'redirect',
                      'aperte', 'continuar', 'avançar', 'pular'];
    
    // Find all buttons and links
    const elements = [...document.querySelectorAll('a, button, input[type="button"], input[type="submit"]')];
    
    for (let el of elements) {
      const text = (el.innerText || el.value || '').toLowerCase();
      if (keywords.some(k => text.includes(k))) {
        el.click();
        return true;
      }
    }
    return false;
  }

  // Watch for new buttons appearing (countdown ends → button appears)
  const observer = new MutationObserver(function() {
    autoClick();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });

  // Try immediately + every 500ms
  autoClick();
  setInterval(autoClick, 500);

  // Also watch for page navigation (each step loads new page)
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(autoClick, 1000);
    }
  }, 500);

})();
