function exportPasswords(event) {
  browser.logins.search({})
    .then(records => {
      let output = [];
      for (let record of records) {
        output.push(record);
      }
      let string = JSON.stringify(output);
      let blob = URL.createObjectURL(
        new Blob([string]),
        {type: 'application/json'}
      );
      browser.downloads.download({url: blob, filename: 'passwords.json'});
    }, failure => {
      console.log('it went wrong');
    });

  event.preventDefault();
}

function importPasswords(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  let decoder = new TextDecoder('utf8');
  reader.addEventListener('loadend', () => {
    let records = JSON.parse(decoder.decode(reader.result));
    let imported = 0;
    document.getElementById('import-result').open = true;
    let progress = document.getElementById('import-progress');
    let log = document.getElementById('import-log');
    progress.value = 0;
    progress.max = records.length;
    log.value = '';
    for (let record of records) {
      browser.logins.store(record).then(() => {
        progress.value = imported += 1;
        log.value = log.value + `Success: user ${record.username} for ${record.origin}.\n`;
      }, failure => {
        progress.value = imported += 1;
        log.value = log.value + `FAILURE: user ${record.username} for ${record.origin}.\n`;
      });
    }
  });
  reader.readAsArrayBuffer(file);

  event.preventDefault();
}

document.getElementById('export-passwords').addEventListener('click', exportPasswords);
document.getElementById('import-passwords').addEventListener('change', importPasswords);
