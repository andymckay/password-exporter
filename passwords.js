document.addEventListener("click", function(e) {
  if (e.target.id === "export-passwords") {
    console.log('exporting passwords');
    browser.logins.search()
    .then(records => {
      for (let record of records) {
        console.log(record);
      }
    });
  }

  e.preventDefault();
});
