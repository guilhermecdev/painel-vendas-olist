/**
 * Eventos dos filtros do dashboard.
 */
function setupFilters(render) {
  ['fs', 'fc', 'fp'].forEach(id => {
    $(id).onchange = render;
  });

  $('clr').onclick = () => {
    ['fs', 'fc', 'fp'].forEach(id => {
      $(id).value = '-1';
    });
    render();
  };
}
