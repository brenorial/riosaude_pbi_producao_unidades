# 📈 Métricas Power BI

### % Aprovados AIH

Calcula a porcentagem de autorizações apresentadas no sistema AIH que foram aprovadas, considerando que a quantidade rejeitada é subtraída do total apresentado.

```DAX
% Aprovados AIH =
DIVIDE(
    SUM(exec[QUANTIDADE APRESENTADA_AIH]) - SUM(exec[QUANTIDADE REJEITADA_AIH]),
    SUM(exec[QUANTIDADE APRESENTADA_AIH]),
    0
)
```

- Numerador: Quantidade apresentada menos a quantidade rejeitada (autorizadas aprovadas)
- Denominador: Quantidade apresentada
- Retorna 0 em caso de divisão por zero

---

### % Aprovados SIA

Calcula a porcentagem de autorizações aprovadas no sistema SIA em relação à quantidade apresentada.

```DAX
% Aprovados SIA =
DIVIDE(
    SUM(exec[QUANTIDADE APROVADA_SIA]),
    SUM(exec[QUANTIDADE APRESENTADA_SIA]),
    0
)
```

- Numerador: Quantidade aprovada
- Denominador: Quantidade apresentada
- Retorna 0 em caso de divisão por zero

---

### % Glosa AIH

Calcula a porcentagem de autorizações rejeitadas (glosas) no sistema AIH em relação à quantidade apresentada.

```DAX
% Glosa AIH =
DIVIDE(
    SUM(exec[QUANTIDADE REJEITADA_AIH]),
    SUM(exec[QUANTIDADE APRESENTADA_AIH]),
    0
)
```

- Numerador: Quantidade rejeitada
- Denominador: Quantidade apresentada
- Retorna 0 em caso de divisão por zero

---

### % Glosa SIA

Calcula a porcentagem de autorizações rejeitadas (glosas) no sistema SIA em relação à quantidade apresentada.

```DAX
% Glosa SIA =
DIVIDE(
    SUM(exec[QUANTIDADE APRESENTADA_SIA]) - SUM(exec[QUANTIDADE APROVADA_SIA]),
    SUM(exec[QUANTIDADE APRESENTADA_SIA]),
    0
)
```

- Numerador: Quantidade apresentada menos quantidade aprovada (quantidade rejeitada)
- Denominador: Quantidade apresentada
- Retorna 0 em caso de divisão por zero

---

## Observações gerais

- As medidas usam a função `DIVIDE` para evitar erros de divisão por zero, retornando 0 nesses casos.
- Os dados são provenientes da tabela `exec` com colunas específicas para cada sistema (AIH e SIA).
- Essas métricas são importantes para análise de eficiência e controle de rejeições nos processos de autorização.

---

# 🔗 Como usar o JSON do Apps Scripts no Power BI

**Publique o script como Web App**:

- Vá em **Publicar** > **Implantar como aplicativo da Web**
- Escolha "Qualquer pessoa" como acesso
- Copie a URL gerada

**No Power BI**:

- Clique em **Obter Dados** > **Web**
- Cole a URL do Web App
- Selecione o formato **JSON**
- Importe e modele os dados

**Configuração do Power BI**

- O arquivo está setado para atualizar todos os dias às 6h da manhã
- Existe o modelo de dados e o arquivo base
- Está separado o arquivo base (criar métricas) e o relatório (consumir dados)
