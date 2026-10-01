# 📊 Painel de Vendas e Satisfação — Olist (2016-2018).

Dashboard interativo desenvolvido para análise de **vendas, comportamento de compra e satisfação dos clientes** a partir do Brazilian E-Commerce Public Dataset by Olist.

O projeto transforma os dados de pedidos entregues em indicadores e visualizações interativas, permitindo analisar receita, volume de pedidos, categorias, estados, formas de pagamento e a relação entre **atrasos na entrega e avaliações dos clientes**.

---

## 🎯 Objetivo

O objetivo deste projeto é explorar dados de e-commerce para responder perguntas como:

- Como o volume de pedidos evolui ao longo do tempo?
- Quais categorias representam maior receita?
- Quais estados apresentam maior volume de receita?
- Quais formas de pagamento são mais utilizadas?
- Como a receita e o ticket médio se comportam?
- Existe associação entre atrasos na entrega e notas dos clientes?
- Quais categorias apresentam menores avaliações médias?

A análise também permite aplicar filtros para investigar diferentes segmentos do negócio.

---

## 📈 Dashboard

O painel apresenta os seguintes indicadores principais:

### KPIs

- **Pedidos entregues**
- **Receita total**
- **Ticket médio**
- **Nota média**

A receita considera a soma dos preços dos produtos, sem incluir o frete. Os pedidos analisados são aqueles com status `delivered`, data de entrega e avaliação registrada.

### Visualizações

- 📅 Pedidos por mês
- 🛍️ Receita por categoria
- 📍 Receita por estado
- 💳 Distribuição por forma de pagamento
- ⭐ Nota média × percentual de pedidos atrasados
- 🚚 Nota média de acordo com o nível de atraso
- 🏷️ Categorias com menores avaliações
- 💡 Leitura automática dos principais indicadores

---

## 🔎 Análise de satisfação

Um dos principais objetivos do projeto é investigar a relação entre **prazo de entrega e satisfação do cliente**.

O dashboard classifica os pedidos de acordo com o atraso:

| Categoria | Atraso |
|---|---:|
| No prazo | 0 dias |
| 1–3 dias | 1 a 3 dias |
| 4–7 dias | 4 a 7 dias |
| 8–14 dias | 8 a 14 dias |
| > 14 dias | Mais de 14 dias |

A análise compara a nota média dos pedidos em cada grupo e também acompanha mensalmente o percentual de pedidos atrasados.

> **Importante:** a relação entre atraso e avaliação apresentada pelo dashboard representa uma associação observada nos dados. Ela não deve ser interpretada, isoladamente, como prova de causalidade.

---

## 🎛️ Filtros interativos

O usuário pode segmentar toda a análise através de três filtros:

- **Estado**
- **Categoria**
- **Forma de pagamento**

Também existe a opção de limpar todos os filtros e retornar à visão geral do dataset.

As métricas e visualizações são recalculadas automaticamente conforme os filtros selecionados.

---

## 🧠 Insights automáticos

O dashboard possui uma seção de **Leitura automática**, responsável por recalcular observações conforme os dados filtrados.

Entre as análises geradas estão:

- percentual de pedidos atrasados;
- comparação da nota média entre pedidos atrasados e entregues no prazo;
- estimativa do impacto na nota média caso pedidos atrasados tivessem a mesma avaliação dos pedidos entregues no prazo;
- identificação do mês com menor nota média;
- identificação de categorias com menores avaliações;
- análise específica de pedidos com mais de 14 dias de atraso.

---

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **SVG** para visualizações
- **Dados estruturados em JavaScript**
- **Design responsivo**

O projeto foi desenvolvido como uma aplicação web independente, sem necessidade de backend para executar o dashboard.

---

## 📂 Estrutura do projeto

```text
olist-sales-dashboard/
│
├── index.html
└── README.md
```

O arquivo `index.html` contém a estrutura, estilização, lógica de interação, dados utilizados e geração das visualizações.

---

## ▶️ Como executar

Como o projeto utiliza apenas tecnologias front-end, não é necessário instalar dependências.

### 1. Clone o repositório

```bash
git clone https://github.com/guilhermecdev/painel-vendas-olist.git
```

### 2. Entre na pasta

```bash
cd painel-vendas-olist
```

### 3. Abra o projeto

Basta abrir o arquivo:

```text
index.html
```

💻 Executando com VS Code

Caso utilize o Visual Studio Code, também é possível executar o projeto através da extensão Live Server:

Abra a pasta painel-vendas-olist no VS Code;

Abra o arquivo index.html;

Clique com o botão direito no arquivo;

Selecione Open with Live Server.

O dashboard será aberto automaticamente no navegador.

---

## 📊 Dataset

O projeto utiliza o:

**Brazilian E-Commerce Public Dataset by Olist**

Fonte: Kaggle.

O próprio dashboard informa que a análise utiliza pedidos com status `delivered`, data de entrega e pelo menos uma avaliação. O mês é determinado pela data da compra, a receita corresponde à soma dos preços dos produtos e o atraso é calculado pela diferença entre a data real de entrega e a data estimada.

### Período analisado

**Setembro de 2016 a Agosto de 2018.**

---

## ⚙️ Metodologia

O fluxo de análise pode ser resumido em:

```text
Dataset Olist
     ↓
Seleção de pedidos entregues
     ↓
Pedidos com avaliação registrada
     ↓
Tratamento e organização dos dados
     ↓
Criação dos indicadores
     ↓
Segmentação por filtros
     ↓
Visualizações
     ↓
Análise de satisfação e atrasos
     ↓
Insights automáticos
```

---

## 📌 Critérios utilizados

- Status do pedido: `delivered`
- Pedido precisa possuir data de entrega
- Pedido precisa possuir avaliação registrada
- Receita = soma dos preços dos produtos
- Frete não é incluído na receita
- Mês = mês da data da compra
- Atraso = data real de entrega − data estimada de entrega

O dashboard também considera que os primeiros meses possuem poucos registros: setembro e dezembro de 2016 possuem apenas um pedido cada, enquanto novembro de 2016 não possui pedidos entregues.

---

## 💼 Aplicação no portfólio

Este projeto demonstra conhecimentos em:

- Análise exploratória de dados
- Construção de KPIs
- Data Visualization
- Análise de comportamento de clientes
- Análise temporal
- Segmentação de dados
- Análise de satisfação
- Interpretação de indicadores
- Desenvolvimento de dashboards interativos
- JavaScript para manipulação e visualização de dados
- Desenvolvimento de interfaces responsivas

---

## 🚀 Possíveis melhorias

Algumas evoluções futuras para o projeto:

- [ ] Separar dados e lógica em arquivos JavaScript independentes
- [ ] Criar uma API para disponibilização dos dados
- [ ] Implementar atualização automática dos dados
- [ ] Adicionar análise de vendedores
- [ ] Adicionar análise de frete
- [ ] Criar indicadores de margem e lucratividade
- [ ] Adicionar análise geográfica
- [ ] Implementar exportação dos dados filtrados
- [ ] Migrar o dashboard para Power BI
- [ ] Criar uma versão utilizando Python + Streamlit

---

## 📷 Preview

> Adicione aqui uma captura de tela do dashboard.

```text
![Dashboard Olist](./assets/dashboard-preview.png)
```

---

## 👨‍💻 Autor

**Guilherme Cardozo**

Analista de Dados Júnior | SQL | Python | Power BI | Excel | Data Analytics

---

## 📄 Licença e fonte dos dados

Os dados utilizados pertencem ao **Brazilian E-Commerce Public Dataset by Olist**, disponibilizado através do Kaggle.

Este projeto foi desenvolvido para fins **educacionais e de portfólio**, utilizando os dados conforme indicado na fonte original.
