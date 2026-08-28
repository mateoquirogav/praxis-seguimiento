/* =========================================================
   ELIKE - Encabezado, pie y banda de demostración
   Se inyecta solo en las 3 páginas de herramientas.
   ========================================================= */

const EK_MENU = [
  { txt:'Tienda online',            href: EK_TIENDA + '/productos/', id:'tienda' },
  { txt:'Compatibilidad con puertas', href:'compatibilidad.html',    id:'compat' },
  { txt:'Compará los modelos',      href:'comparativa.html',         id:'compara' },
  { txt:'Cotizá la instalación',    href:'cotizar-instalacion.html', id:'cotiza' }
];

const EK_ICONOS = {
  lupa:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  wpp :'<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.8-5.2A8.5 8.5 0 1 1 21 11.5z"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  bols:'<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9.2 8a2.8 2.8 0 0 1 5.6 0"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  tic :'<path d="M4 12.5l5 5L20 6.5"/>',
  flec:'<path d="M15 5l-7 7 7 7"/>',
  ok  :'<path d="M20 6.5L9 17.5l-5-5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/>',
  alr :'<path d="M12 3l9.5 17H2.5L12 3z"/><path d="M12 10v4M12 17v.4"/>'
};
const ekSvg = (d, extra) => '<svg viewBox="0 0 24 24" ' + (extra||'') + '>' + d + '</svg>';

/* --------------------- ENCABEZADO --------------------- */
function ekHeader(activo){
  const links = EK_MENU.map(m =>
    '<a href="' + m.href + '"' + (m.id === activo ? ' class="on"' : '') + '>' + m.txt + '</a>'
  ).join('');

  document.body.insertAdjacentHTML('afterbegin',
    '<header class="ek-head"><div class="ek-head__in">' +
      '<a class="ek-logo" href="index.html">' +
        '<img src="assets/elike-marca.png" alt="Elike">' +
      '</a>' +
      '<nav class="ek-nav">' + links + '</nav>' +
      '<div class="ek-head__acc">' +
        '<a class="ek-ic" href="' + EK_TIENDA + '/productos/" title="Buscar">' + ekSvg(EK_ICONOS.lupa) + '</a>' +
        '<a class="ek-ic" href="https://wa.me/' + EK_WPP + '" title="WhatsApp">' + ekSvg(EK_ICONOS.wpp) + '</a>' +
        '<a class="ek-ic" href="' + EK_TIENDA + '/account/login/" title="Mi cuenta">' + ekSvg(EK_ICONOS.user) + '</a>' +
        '<a class="ek-ic" href="' + EK_TIENDA + '/cart/" title="Carrito">' + ekSvg(EK_ICONOS.bols) + '</a>' +
      '</div>' +
      '<button class="ek-burger" aria-label="Abrir menú">' + ekSvg(EK_ICONOS.menu) + '</button>' +
    '</div></header>' +
    '<div class="ek-menu"><button class="ek-menu__x" aria-label="Cerrar">&times;</button>' + links +
      '<a href="https://wa.me/' + EK_WPP + '">WhatsApp</a></div>'
  );

  const menu = document.querySelector('.ek-menu');
  document.querySelector('.ek-burger').onclick  = () => menu.classList.add('abierto');
  document.querySelector('.ek-menu__x').onclick = () => menu.classList.remove('abierto');

  const alScroll = () => document.body.classList.toggle('ek-scroll', window.scrollY > 40);
  window.addEventListener('scroll', alScroll, {passive:true});
  alScroll();
}

/* ------------------------- PIE ------------------------- */
function ekFooter(){
  document.body.insertAdjacentHTML('beforeend',
    '<footer class="ek-pie"><div class="ek-pie__in">' +
      '<div class="ek-pie__g">' +
        '<div class="ek-pie__marca">' +
          '<img src="assets/elike-marca.png" alt="Elike">' +
          '<p>Tecnología para hacer tu vida más fácil. Cerraduras inteligentes y alarmas con instalación propia en CABA y GBA.</p>' +
        '</div>' +
        '<div><h5>Productos</h5><ul>' +
          '<li><a href="' + EK_TIENDA + '/cerraduras/">Cerraduras inteligentes</a></li>' +
          '<li><a href="' + EK_TIENDA + '/alarmas/">Alarmas</a></li>' +
          '<li><a href="' + EK_TIENDA + '/cerraduras/servicio-instalacion/">Servicio de instalación</a></li>' +
          '<li><a href="' + EK_TIENDA + '/productos/">Ver todo</a></li>' +
        '</ul></div>' +
        '<div><h5>Herramientas</h5><ul>' +
          '<li><a href="compatibilidad.html">Compatibilidad con puertas</a></li>' +
          '<li><a href="comparativa.html">Compará los modelos</a></li>' +
          '<li><a href="cotizar-instalacion.html">Cotizá la instalación</a></li>' +
        '</ul></div>' +
        '<div><h5>Ayuda</h5><ul>' +
          '<li><a href="' + EK_TIENDA + '/soporte-y-servicio-tecnico/">Soporte técnico</a></li>' +
          '<li><a href="' + EK_TIENDA + '/como-comprar/">Cómo comprar</a></li>' +
          '<li><a href="' + EK_TIENDA + '/politica-de-devolucion/">Devoluciones</a></li>' +
          '<li><a href="https://wa.me/' + EK_WPP + '">WhatsApp</a></li>' +
          '<li><a href="https://instagram.com/elike.arg">Instagram</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="ek-pie__bajo">' +
        '<span>&copy; 2026 Elike. Todos los derechos reservados.</span>' +
        '<span>Diseño y desarrollo <b>PRAXIS</b></span>' +
      '</div>' +
    '</div></footer>'
  );
}

/* ------------------ BANDA DE DEMOSTRACION -------------- */
function ekBandaDemo(){
  document.body.insertAdjacentHTML('beforeend',
    '<div class="ek-demo">' +
      '<b>Vista previa PRAXIS</b>' +
      '<span>Así funciona la herramienta dentro de la tienda de Elike. Datos y precios reales tomados de elike.com.ar.</span>' +
      '<a href="index.html">Ver las tres herramientas</a>' +
      '<button class="ek-demo__x" aria-label="Ocultar">&times;</button>' +
    '</div>'
  );
  document.querySelector('.ek-demo__x').onclick = e => e.target.closest('.ek-demo').remove();
}

/* --------------------- ARRANQUE ------------------------ */
function ekArrancar(activo){
  ekHeader(activo);
  ekFooter();
  ekBandaDemo();
}
