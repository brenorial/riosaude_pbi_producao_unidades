
# 🧹 Padronização de Nomes na Planilha Google Sheets

Este script em Google Apps Script tem como objetivo padronizar os nomes das unidades hospitalares presentes neste relatório, alinhando-os com a base central de dados. Dessa forma, obtemos maior unificação e consistência das informações, facilitando a análise e a gestão dos dados.

## Como funciona

1. **Base de nomes (Coluna A):** Lista de nomes padronizados.
2. **Nomes a padronizar (Coluna B):** Lista com nomes que podem estar despadronizados.
3. **Saída (Coluna C):** Nome padronizado correspondente mais próximo encontrado na base.
4. O script utiliza:
   - Normalização de textos (remoção de acentos, maiúsculas, substituições comuns).
   - Algoritmo de distância de Levenshtein para encontrar o nome mais parecido.
   - Retorna "NÃO ENCONTRADO" caso a similaridade seja muito baixa.

## Código do Script

```javascript
function padronizarNomes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Página5");
  const baseRange = sheet.getRange("A2:A" + sheet.getLastRow());
  const producaoRange = sheet.getRange("B2:B" + sheet.getLastRow());
  const outputRange = sheet.getRange("C2:C" + sheet.getLastRow());

  const baseValues = baseRange.getValues().flat().filter(String);
  const producaoValues = producaoRange.getValues().flat();

  function normalizar(nome) {
    if (!nome) return "";
    nome = nome.toString().toUpperCase();
    nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    nome = nome.replace(/HOSP MUN/g, "HOSPITAL MUNICIPAL")
               .replace(/H MUN/g, "HOSPITAL MUNICIPAL")
               .replace(/MATERN/g, "MATERNIDADE")
               .replace(/UPA 24H/g, "UPA")
               .replace(/CER - /g, "CER ")
               .replace(/N S/g, "NOSSA SENHORA")
               .replace(/ AP/g, "")
               .replace(/-/g, "")
               .replace(/SMS /g, "")
               .replace(/S TELLES/g, "SILVA TELLES")
               .replace(/ B DE /g, " BUARQUE DE ");
    return nome.trim();
  }

  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  const baseNormalizada = baseValues.map(normalizar);

  function encontrarCorrespondente(nome) {
    const nomeNorm = normalizar(nome);
    if (!nomeNorm) return "NÃO ENCONTRADO";

    let melhorIndice = -1;
    let melhorDistancia = Infinity;

    for (let i = 0; i < baseNormalizada.length; i++) {
      const dist = levenshtein(nomeNorm, baseNormalizada[i]);
      if (dist < melhorDistancia) {
        melhorDistancia = dist;
        melhorIndice = i;
      }
    }

    if (melhorDistancia <= 8) {
      return baseValues[melhorIndice];
    } else {
      return "NÃO ENCONTRADO";
    }
  }

  const resultados = producaoValues.map(encontrarCorrespondente);

  outputRange.setValues(resultados.map(r => [r]));
}
````
