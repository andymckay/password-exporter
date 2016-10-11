document.addEventListener("click", function(e) {
  if (e.target.id === "export-passwords") {
    console.log('exporting passwords');
    browser.logins.search({})
      .then(records => { 
        let output = [[
          "hostname", 
          "username", 
          "password", 
          "formSubmitURL", 
          "usernameField", 
          "passwordField"
        ],];
        for (let record of records) {
          // This does not conform to RFC 4180 and will break 
          // on things like a , in the field.
          output.push([
            record.hostname, 
            record.username, 
            record.password, 
            record.formSubmitURL, 
            record.usernameField, 
            record.passwordField
          ])
        }
        let blob = URL.createObjectURL(new Blob([output.join('\n')], {type: 'text/csv'}));
        browser.downloads.download({url: blob, filename: 'passwords.csv'});
      }, failure => {
        console.log('it went wrong');
      });
  }

  e.preventDefault();
});
