(function() {

  function findAndClick() {
    const all = [...document.querySelectorAll('a, button, div, span, p')];
    
    for (let el of all) {
      const text = (el.innerText || el.textContent || '')
        .toLowerCase()
        // normalize leetspeak
        .replace(/0/g, 'o')
        .replace(/1/g, 'i')
        .replace(/3/g, 'e')
        .replace(/4/g, 'a')
        .replace(/\$/g, 's')
        .replace(/!/g, 'i')
        .replace(/@/g, 'a')
        .replace(/&/g, 'e')
        .replace(/\?/g, '')
        .trim();

      const keywords = [
        'advance', 'continue', 'proceed', 'next',
        'prosseguir', 'continuar', 'avancar', 'seguir',
        'click', 'clique', 'press', 'aperte'
      ];

      if (keywords.some(k => text.includes(k)) && text.length < 60) {
        el.click();
        return true;
      }
    }
    return false;
  }

  // Run immediately
  findAndClick();
  
  // Keep trying every 1 second
  setInterval(findAndClick, 1000);

  // Watch for new elements appearing
  new MutationObserver(findAndClick).observe(
    document.body, 
    { childList: true, subtree: true }
  );

})();
