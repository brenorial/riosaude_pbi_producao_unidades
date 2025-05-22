# 📄 Código

```javascript
function doGet(e) {
  var ss = SpreadsheetApp.openById(
    "1ylLkwJIlyt0iNyvkWrR2jegwis266XHcJccuTYcChCE"
  );
  var sheet = ss.getSheetByName("BASE");
  var data = sheet.getDataRange().getValues();

  var headers = data[0];
  var jsonData = data.slice(1).map(function (row) {
    var obj = {};
    headers.forEach(function (header, i) {
      var value = row[i];
      if (i >= 3) {
        value = String(value).replace(/-/g, "");
      }
      obj[header] = value;
    });
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

# ⚙️ Explicação do Código

- `doGet(e)`: Função executada em requisições GET.
- `SpreadsheetApp.openById(...)`: Acessa a planilha pelo ID.
- `getSheetByName("BASE")`: Seleciona a aba `BASE`.
- `getDataRange().getValues()`: Lê todos os dados da aba.
- Transforma os dados em JSON:
  - Cabeçalhos da primeira linha.
  - Linhas convertidas em objetos JS.
  - Colunas a partir da 4ª têm `-` removidos.
