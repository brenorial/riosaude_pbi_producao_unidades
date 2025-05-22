# Integração Google Sheets + Power BI com Google Apps Script

Este repositório contém um script do Google Apps Script que expõe os dados de uma planilha do Google Sheets em formato **JSON**, permitindo a integração eficiente e estruturada com ferramentas de BI como o **Power BI**.

## 📌 Objetivo

Facilitar a extração de dados de uma aba específica (`BASE`) da planilha, estruturando-os como JSON por meio de uma **API personalizada (endpoint do Google Apps Script)**. Isso torna o processo mais seguro, estável e performático do que utilizar a conexão direta via URL pública do Google Sheets.

---

## 📄 Código

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

---

## ⚙️ Explicação do Código

- `doGet(e)`: Função acionada automaticamente em uma requisição GET (ex: via navegador ou Power BI Web).
- `SpreadsheetApp.openById(...)`: Abre a planilha usando seu ID.
- `getSheetByName('BASE')`: Acessa a aba chamada `BASE`.
- `getDataRange().getValues()`: Captura todos os dados da aba.
- A primeira linha (`data[0]`) é usada como cabeçalhos para o JSON.
- Cada linha subsequente é transformada em um objeto JavaScript, onde:

  - As colunas a partir da 4ª (`i >= 3`) têm os traços `-` removidos, de forma que não quebre as colunas no Power BI. Essas células com `-` se tornam então `null`.

- O JSON final é retornado como saída da requisição.

---

## ⏰ Acionador Automático

Para garantir que os dados da planilha estejam sempre atualizados e reflitam as últimas informações disponíveis, configurei um trigger que atualiza a planilha todo dia às 5 horas da manhã.

---

## 🗂️ Workflow

![alt text](public/workflow.png)

## ✅ Vantagens sobre conectar o Power BI direto pela URL do Google Sheets

| Conexão Direta (URL)                                            | Via Apps Script (JSON)                            |
| --------------------------------------------------------------- | ------------------------------------------------- |
| Requer publicação da planilha como pública (risco de segurança) | Acesso controlado via script, mais seguro         |
| Estrutura de dados bruta, sem tratamento                        | JSON limpo, com tratamento de campos              |
| Pode apresentar problemas de desempenho e atualização           | Mais rápido e estável para grandes volumes        |
| Dificuldade para lidar com múltiplas abas ou filtros            | Fácil de programar lógica personalizada no script |
| Pouco flexível para transformações ou filtros                   | Totalmente customizável no GAS antes de exportar  |

---

## 🔗 Como usar no Power BI

1. Publique o script como um **Web App**:

   - Em "Publicar" → "Implantar como aplicativo da Web"
   - Configure acesso como "Qualquer pessoa"
   - Copie a URL gerada

2. No Power BI:

   - Vá em **Obter Dados** → **Web**
   - Insira a URL do Web App
   - Escolha formato **JSON**
   - Carregue e modele os dados conforme necessário

---

## 📌 Conclusão

Utilizar o Google Apps Script como intermediário entre o Google Sheets e o Power BI oferece **mais controle, segurança e performance**. Esse método permite também realizar transformações de dados antes mesmo que eles sejam carregados no Power BI.

# 📚 Documentação do Projeto RioSaúde PBI

A documentação completa deste projeto está disponível online e pode ser acessada através do link abaixo:

👉 [Acesse a documentação aqui](https://brenorial.github.io/riosaude_pbi_producao_unidades/)

---

Até a próxima! 🚀


