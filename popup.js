// add an event listener for page load in the extension background script
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // get the active tab in the current window
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        const activeTab = tabs[0];
        const url = activeTab.url;
        const button = document.querySelector('button');
  
        if (url && url.startsWith('https://scratch.mit.edu/projects/')) {
          // enable the button if the URL matches the pattern
          button.disabled = false;
  
          // add a click event listener to the button
          button.addEventListener('click', () => {
            // generate the Twitter intent URL
            const baseUrl = "https://twitter.com/intent/tweet?";
            const text = "Check out this Scratch project!";
            const encodedUrl = encodeURIComponent(url);
            const hashtags = "Scratch,ScratchShare";
            const encodedHashtags = encodeURIComponent(hashtags);
            const twitterIntentUrl = `${baseUrl}text=${text}&url=${encodedUrl}&hashtags=${encodedHashtags}`;
  
            // open the Twitter intent URL in a new tab
            browser.tabs.create({ url: twitterIntentUrl });
          });
        } else {
          button.disabled = true;
        }
      });
    }
  });
  