## 📥 Contexto

Após a padronização do JSON, é necessário atualizar o Power BI para reconhecer as novas colunas adicionadas na fonte de dados (API Web via Apps Script).

Para isso, foi preciso modificar o código Power Query, incluindo explicitamente essas novas colunas no processo de expansão dos dados. Sem essa atualização, as colunas recém-adicionadas não seriam carregadas no Power BI.


## Passos realizados

1. **Atualização da expansão das colunas no Power Query**

No passo onde se expande os registros da coluna `"Column1"`, foi necessário incluir as novas colunas `"UNIDADE_PADRONIZADA"` e `"SIGLA_UNIDADE"`. O código atualizado fica assim:

```m
= Table.ExpandRecordColumn(
    #"Convertido para Tabela", "Column1",
    {
      "COMPETÊNCIA",
      "CNES",
      "UNIDADE",
      "VALOR APROVADO_SIA",
      "QUANTIDADE APROVADA_SIA",
      "QUANTIDADE APRESENTADA_SIA",
      "VALOR APRESENTADO_SIA",
      "QUANTIDADE APRESENTADA_AIH",
      "QUANTIDADE REJEITADA_AIH",
      "VALOR TOTAL_AIH",
      "UNIDADE_PADRONIZADA",
      "SIGLA_UNIDADE"
    },
    {
      "COMPETÊNCIA",
      "CNES",
      "UNIDADE",
      "VALOR APROVADO_SIA",
      "QUANTIDADE APROVADA_SIA",
      "QUANTIDADE APRESENTADA_SIA",
      "VALOR APRESENTADO_SIA",
      "QUANTIDADE APRESENTADA_AIH",
      "QUANTIDADE REJEITADA_AIH",
      "VALOR TOTAL_AIH",
      "UNIDADE_PADRONIZADA",
      "SIGLA_UNIDADE"
    }
)
```

2. **Tratamento dos tipos de dados**

Após expandir as colunas, é fundamental ajustar os tipos das colunas para evitar erros e garantir a correta manipulação dos dados. A etapa de transformação de tipos ficou assim:

```m
= Table.TransformColumnTypes(
    #"Tipo Alterado1",
    {
      {"COMPETÊNCIA", type datetime},
      {"CNES", Int64.Type},
      {"UNIDADE", type text},
      {"VALOR APROVADO_SIA", type number},
      {"QUANTIDADE APROVADA_SIA", Int64.Type},
      {"QUANTIDADE APRESENTADA_SIA", Int64.Type},
      {"VALOR APRESENTADO_SIA", type number},
      {"VALOR TOTAL_AIH", type number},
      {"UNIDADE_PADRONIZADA", type text},
      {"SIGLA_UNIDADE", type text},
      {"QUANTIDADE APRESENTADA_AIH", Int64.Type},
      {"QUANTIDADE REJEITADA_AIH", Int64.Type}
    }
)
```

> **Importante:** Se ocorrer erro ao converter as colunas `QUANTIDADE APRESENTADA_AIH` ou `QUANTIDADE REJEITADA_AIH` para inteiro, verificar se existem valores vazios ou não numéricos, que precisam ser tratados antes da conversão.

---

Assim, o Power BI reconhecerá as novas colunas e os dados estarão formatados corretamente para análise.
