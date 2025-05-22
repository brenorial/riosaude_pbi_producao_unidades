# ⚙️ Explicação do Código

- `doGet(e)`: Função executada em requisições GET.
- `SpreadsheetApp.openById(...)`: Acessa a planilha pelo ID.
- `getSheetByName("BASE")`: Seleciona a aba `BASE`.
- `getDataRange().getValues()`: Lê todos os dados da aba.
- Transforma os dados em JSON:
  - Cabeçalhos da primeira linha.
  - Linhas convertidas em objetos JS.
  - Colunas a partir da 4ª têm `-` removidos.
