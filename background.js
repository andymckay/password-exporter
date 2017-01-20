function openMyPage() {
   browser.tabs.create({
     "url": "passwords.html"
   });
}


/*
Add openMyPage() as a listener to clicks on the browser action.
*/
browser.browserAction.onClicked.addListener(openMyPage);
