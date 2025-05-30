function preencherSiglasNaColunaD() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Página5");
  const lastRow = sheet.getLastRow();

  const nomes = sheet.getRange(2, 3, lastRow - 1, 1).getValues();

  const nomeParaSigla = {
    "HOSPITAL MUNICIPAL MIGUEL COUTO": "HMMC",
    "HOSPITAL MUNICIPAL FRANCISCO DA SILVA TELLES": "HMFST",
    "HOSPITAL MUNICIPAL NOSSA SENHORA DO LORETO": "HMNSL",
    "UPA CIDADE DE DEUS": "UPACDD",
    "UPA MADUREIRA": "UPAMD",
    "UPA SENADOR CAMARA": "UPASC",
    "MATERNIDADE DA ROCINHA": "MR",
    "CENTRO CARIOCA DO OLHO": "CCO",
    "CER CENTRO": "CERCT",
    "UPA ENGENHO DE DENTRO": "UPAED",
    "UPA ROCINHA": "UPARC",
    "HOSPITAL DO ANDARAÍ": "HMA",
    "HOSPITAL MUNICIPAL BARATA RIBEIRO": "HMBR",
    "UPA PACIÊNCIA": "UPAPC",
    "UPA VILA KENNEDY": "UPAVK",
    "HOSPITAL MUNICIPAL SOUZA AGUIAR": "HMSA",
    "MATERNIDADE MARIA AMELIA BUARQUE DE HOLLANDA": "MMABH",
    "UPA COSTA BARROS": "UPACB",
    "HOSPITAL MUNICIPAL DA PIEDADE": "HMP",
    "HOSPITAL MUNICIPAL RONALDO GAZOLLA": "HMRG",
    "UPA MAGALHÃES BASTOS": "UPAMB",
    "UPA MANGUINHOS": "UPAMAN",
    "CER BARRA": "CERBT",
    "HOSPITAL MUNICIPAL SALGADO FILHO": "HMSF",
    "HOSPITAL MUNICIPAL ALVARO RAMOS": "HMAR",
    "HOSPITAL MUNICIPAL JESUS": "HMJ",
    "HOSPITAL MUNICIPAL ROCHA MAIA": "HMRM",
    "UPA COMPLEXO DO ALEMÃO": "UPAALM",
    "HOSPITAL MUNICIPAL ALBERT SCHWEITZER": "HMAS",
    "UPA ROCHA MIRANDA": "UPARM",
    "UPA SEPETIBA": "UPASPB",
    "CER LEBLON": "CERLB",
    "HOSPITAL MUNICIPAL ROCHA FARIA": "HMRF",
    "UPA DEL CASTILHO": "UPADC",
    "UPA JOAO XXIII": "UPAJ23",
    "HOSPITAL MUNICIPAL LOURENÇO JORGE": "HMLJ"
  };

  const siglas = nomes.map(row => {
    const nome = (row[0] || "").toString().trim().toUpperCase();
    for (const nomeCompleto in nomeParaSigla) {
      if (nomeCompleto.toUpperCase() === nome) {
        return [nomeParaSigla[nomeCompleto]];
      }
    }
    return ["NÃO ENCONTRADO"];
  });

  sheet.getRange(2, 4, siglas.length, 1).setValues(siglas);
}
