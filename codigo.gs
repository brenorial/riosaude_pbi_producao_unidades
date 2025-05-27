function doGet(e) {
  var ss = SpreadsheetApp.openById('');
  var sheet = ss.getSheetByName('BASE'); 
  var data = sheet.getDataRange().getValues();
  
  var headers = data[0];
  var jsonData = data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(header, i) {
      var value = row[i];
      if (i >= 3) {
        value = String(value).replace(/-/g, '');
      }
      obj[header] = value;
    });
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}