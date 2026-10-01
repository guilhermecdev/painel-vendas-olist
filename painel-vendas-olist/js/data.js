/**
 * Carrega os dados exportados do dataset Olist.
 * Mantém a fonte de dados separada da interface.
 */
let D = null;

async function loadData() {
  const response = await fetch('./data/olist-data.json');

  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do dashboard.');
  }

  D = await response.json();
  return D;
}
