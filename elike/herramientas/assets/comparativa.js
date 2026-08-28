/* =========================================================
   ELIKE - Compará los modelos
   Comparador técnico de hasta 3 modelos, tabla dinámica.
   ========================================================= */

const MAX = 3;
let sel = [];                       // ids elegidos, en orden
const zonaSel = document.getElementById('ek-sel');
const zonaTab = document.getElementById('ek-tabla');

/* --------------------- SELECTOR --------------------- */
function pintarSelector(){
  const cab =
    '<div class="ek-sel__cab">' +
      '<div>' +
        '<h2>Compará los modelos</h2>' +
        '<p>Elegí hasta ' + MAX + ' modelos y mirá las diferencias técnicas lado a lado.</p>' +
      '</div>' +
      '<span class="ek-cont' + (sel.length === MAX ? ' lleno' : '') + '">' + sel.length + ' / ' + MAX + ' elegidos</span>' +
    '</div>';

  const grupos = EK_GRUPOS.map(g => {
    const fichas = g.ids.map(id => {
      const m = ekPorId(id);
      if (!m) return '';
      const activo = sel.includes(id);
      const bloqueado = !activo && sel.length >= MAX;
      return '<button class="ek-fx' + (activo ? ' sel' : '') + (bloqueado ? ' off' : '') + '" data-id="' + id + '"' +
        (bloqueado ? ' disabled' : '') + '>' +
        '<img src="' + m.img + '" alt="Elike ' + m.nombre + '" loading="lazy">' +
        '<b>' + m.nombre + '</b>' +
        '<i>' + (activo ? '&minus;' : '+') + '</i>' +
      '</button>';
    }).join('');
    return '<div class="ek-grupo"><h4>' + g.titulo + '</h4><div class="ek-fichas">' + fichas + '</div></div>';
  }).join('');

  zonaSel.innerHTML = cab + grupos +
    (sel.length
      ? '<div class="ek-pie-nav" style="margin-top:4px"><button class="ek-volver" id="ek-limpiar">Limpiar selección</button><span></span></div>'
      : '');

  zonaSel.querySelectorAll('.ek-fx').forEach(b => {
    b.onclick = () => {
      const id = b.dataset.id;
      sel = sel.includes(id) ? sel.filter(x => x !== id) : sel.concat(id);
      pintarSelector();
      pintarTabla();
    };
  });
  const lim = document.getElementById('ek-limpiar');
  if (lim) lim.onclick = () => { sel = []; pintarSelector(); pintarTabla(); };
}

/* ---------------------- TABLA ----------------------- */
function valor(m, campo){
  if (campo === 'precio') return ekPrecio(m.precio);
  const v = m.specs[campo];
  return (v === undefined || v === null || v === '') ? '' : v;
}

function pintarTabla(){
  if (sel.length < 2){
    zonaTab.innerHTML =
      '<div class="ek-vacio">' +
        (sel.length === 0
          ? 'Elegí al menos 2 modelos para ver la comparación.'
          : 'Elegí un modelo más para poder compararlos.') +
      '</div>';
    return;
  }

  const ms = sel.map(ekPorId);

  // Filas que tienen dato en al menos un modelo
  const filas = EK_FILAS.filter(([campo]) => ms.some(m => valor(m, campo) !== ''));

  const cab =
    '<thead><tr><th class="rot"></th>' +
    ms.map(m =>
      '<th><div class="ek-th">' +
        '<img src="' + m.img + '" alt="Elike ' + m.nombre + '" loading="lazy">' +
        '<b>Elike ' + m.nombre + '</b>' +
        '<small>' + m.linea + '</small>' +
        '<button data-quitar="' + m.id + '">Quitar</button>' +
      '</div></th>').join('') +
    '</tr></thead>';

  const cuerpo = '<tbody>' + filas.map(([campo, rot]) => {
    const vals = ms.map(m => valor(m, campo));
    const distintos = new Set(vals).size > 1;
    return '<tr class="' + (distintos ? 'ek-dif' : '') + '">' +
      '<th class="rot">' + rot + '</th>' +
      vals.map(v => v === ''
        ? '<td class="ek-no">&mdash;</td>'
        : '<td' + (campo === 'precio' ? ' class="ek-precio-c"' : '') + '>' + v + '</td>'
      ).join('') +
    '</tr>';
  }).join('') +
  '<tr><th class="rot"></th>' +
    ms.map(m => '<td class="ek-cta"><a href="' + ekUrl(m) + '" target="_blank" rel="noopener">Ver en la tienda</a></td>').join('') +
  '</tr></tbody>';

  zonaTab.innerHTML =
    '<div class="ek-tablaEnv"><table class="ek-tabla">' + cab + cuerpo + '</table></div>' +
    '<div class="ek-leyenda"><i></i> Las filas resaltadas son las que marcan una diferencia real entre los modelos elegidos.</div>' +
    '<div class="ek-aviso">' + ekSvg(EK_ICONOS.info) +
      '<span>Las características que un modelo no tiene se muestran con un guion, y las filas que no aplican a ninguno de los elegidos directamente no aparecen. ' +
      'Si todavía dudás entre dos, <a href="https://wa.me/' + EK_WPP + '" target="_blank" rel="noopener"><b>escribinos por WhatsApp</b></a> y te lo resolvemos en dos minutos.</span>' +
    '</div>' +
    '<div class="ek-pie-nav" style="justify-content:center;gap:10px;margin-top:22px">' +
      '<a class="ek-btn ek-btn--fan" href="compatibilidad.html">¿No sabés cuál entra en tu puerta?</a>' +
      '<a class="ek-btn ek-btn--fan" href="cotizar-instalacion.html">Cotizar la instalación</a>' +
    '</div>';

  zonaTab.querySelectorAll('[data-quitar]').forEach(b => {
    b.onclick = () => {
      sel = sel.filter(x => x !== b.dataset.quitar);
      pintarSelector();
      pintarTabla();
    };
  });
}

/* --------------------- ARRANQUE --------------------- */
ekArrancar('compara');

// Si viene con ?m=roma,tokio se precargan esos modelos
const pre = new URLSearchParams(location.search).get('m');
if (pre) sel = pre.split(',').map(s => s.trim()).filter(id => ekPorId(id)).slice(0, MAX);

pintarSelector();
pintarTabla();
