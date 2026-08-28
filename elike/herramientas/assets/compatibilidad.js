/* =========================================================
   ELIKE - Compatibilidad con puertas
   Recomendador de producto en 4 pasos.
   ========================================================= */

const IC = {
  conv:'<path d="M5 3h14v18H5z"/><path d="M5 21h14"/><circle cx="15.6" cy="12" r="1"/>',
  alum:'<path d="M4 3h16v18H4z"/><path d="M8 3v18M16 3v18"/><circle cx="6.2" cy="12" r=".9"/>',
  blin:'<path d="M12 3l7.5 3v6c0 4.4-3 8.1-7.5 9.3C7.5 20.1 4.5 16.4 4.5 12V6L12 3z"/><path d="M9.4 12.2l1.9 1.9 3.4-3.6"/>',
  corr:'<path d="M3 4h8v16H3z"/><path d="M13 4h8v16h-8z"/><path d="M2 21h20"/>',
  vidr:'<path d="M5 3h14v18H5z"/><path d="M8.5 6.5l7 11M15.5 6.5l-7 11"/>',
  inte:'<path d="M3 11l9-7 9 7"/><path d="M5.5 9.6V20h13V9.6"/><path d="M10 20v-5h4v5"/>',
  exte:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/>',
  mano:'<path d="M8 12V5.5a1.6 1.6 0 0 1 3.2 0V12"/><path d="M11.2 11V4.4a1.6 1.6 0 0 1 3.2 0V12"/><path d="M14.4 12V6.6a1.6 1.6 0 0 1 3.2 0v7.6c0 3.6-2.4 6.3-6 6.3-3.2 0-5.4-1.9-6.2-4.6L4 12.6a1.6 1.6 0 0 1 2.7-1.6L8 12.6"/>',
  regl:'<path d="M2 9h20v6H2z"/><path d="M6 9v3M10 9v4M14 9v3M18 9v4"/>',
  dudo:'<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.5"/><path d="M12 17v.4"/>'
};

const PASOS = ['Puerta','Ubicación','Manijón','Medidas'];

const OPC = {
  puerta:[
    {v:'convencional', t:'Convencional', s:'Madera, chapa o metal', i:IC.conv, r:'convencional'},
    {v:'aluminio',     t:'PVC o aluminio', s:'Perfil o marco angosto', i:IC.alum, r:'de PVC o aluminio'},
    {v:'blindada',     t:'Blindada', s:'Puerta de seguridad', i:IC.blin, r:'blindada'},
    {v:'corrediza',    t:'Corrediza', s:'Corre sobre un riel', i:IC.corr, r:'corrediza'},
    {v:'vidrio',       t:'Vidrio / blindex', s:'Vidrio templado', i:IC.vidr, r:'de vidrio'}
  ],
  ubicacion:[
    {v:'interior', t:'Interior o protegida', s:'No recibe lluvia ni sol directo', i:IC.inte, r:'interior o protegida'},
    {v:'exterior', t:'A la intemperie', s:'Recibe lluvia, humedad o sol', i:IC.exte, r:'a la intemperie'}
  ],
  manijon:[
    {v:'si',   t:'Si, tiene manijón', s:'Barral o manija fija del lado de afuera', i:IC.mano},
    {v:'no',   t:'No tiene manijón', s:'Solo la manija comun', i:IC.conv},
    {v:'nose', t:'No estoy seguro', s:'Lo vemos con un asesor', i:IC.dudo}
  ],
  espesor:[
    {v:'-35',    t:'Menos de 35 mm', s:'Puerta fina', i:IC.regl, rango:[20,35]},
    {v:'35-55',  t:'35 a 55 mm',     s:'Lo más comun en PVC y aluminio', i:IC.regl, rango:[35,55]},
    {v:'55-80',  t:'55 a 80 mm',     s:'Madera maciza o blindada liviana', i:IC.regl, rango:[55,80]},
    {v:'80-110', t:'80 a 110 mm',    s:'Blindada o puerta doble', i:IC.regl, rango:[80,110]},
    {v:'+110',   t:'Más de 110 mm',  s:'Puerta muy gruesa', i:IC.regl, rango:[110,160]},
    {v:'nose',   t:'No la medí',     s:'Te mostramos igual las opciones', i:IC.dudo, rango:null}
  ],
  espesorVidrio:[
    {v:'8-10',  t:'8 a 10 mm',  s:'Vidrio templado fino', i:IC.regl, rango:[8,10]},
    {v:'10-12', t:'10 a 12 mm', s:'El espesor más usado', i:IC.regl, rango:[10,12]},
    {v:'nose',  t:'No lo medí', s:'Te mostramos igual las opciones', i:IC.dudo, rango:null}
  ]
};

const est = { paso:0, puerta:null, ubicacion:null, manijon:null, espesor:null };
const app = document.getElementById('ek-app');

/* ---------------- Motor de recomendación ---------------- */
function recomendar(){
  const rangoSel = (() => {
    if (!est.espesor || est.espesor === 'nose') return null;
    const lista = est.puerta === 'vidrio' ? OPC.espesorVidrio : OPC.espesor;
    const o = lista.find(x => x.v === est.espesor);
    return o ? o.rango : null;
  })();

  const evaluar = m => {
    if (m.cat === 'acceso') return null;
    let pts = 0, motivos = [], duros = true;

    // 1. Tipo de puerta -- filtro duro
    if (m.puerta.includes(est.puerta)) { pts += 5; }
    else duros = false;

    // 2. Ubicación -- duro solo si es intemperie
    if (est.ubicacion === 'exterior'){
      if (m.exterior) { pts += 4; motivos.push('resiste la intemperie'); }
      else duros = false;
    } else { pts += 1; }

    // 3. Manijón -- duro si dijo que si
    if (est.manijon === 'si'){
      if (m.manijon) { pts += 3; motivos.push('su panel angosto convive con el manijón'); }
      else duros = false;
    } else if (est.manijon === 'no'){ pts += 1; }

    // 4. Espesor -- duro si lo declaro
    if (rangoSel){
      const cubre = m.espesor[0] <= rangoSel[1] && m.espesor[1] >= rangoSel[0];
      const total = m.espesor[0] <= rangoSel[0] && m.espesor[1] >= rangoSel[1];
      if (total) { pts += 3; motivos.push('cubre tu espesor (' + m.specs.espesorTxt.toLowerCase() + ')'); }
      else if (cubre) pts += 1;
      else duros = false;
    }
    return { m, pts, motivos, duros };
  };

  const todos = EK_MODELOS.map(evaluar).filter(Boolean);
  const ok = todos.filter(r => r.duros);
  const orden = a => a.sort((x,y) => y.pts - x.pts || x.m.precio - y.m.precio);

  if (ok.length) return { estado:'ok', lista:orden(ok) };

  // Nada cumple todo: mostramos lo más cerca que hay
  const cerca = orden(todos.filter(r => r.m.puerta.includes(est.puerta)));
  if (cerca.length) return { estado:'parcial', lista:cerca };
  return { estado:'nada', lista:[] };
}

/* ---------------------- Vistas -------------------------- */
function barraPasos(){
  return '<div class="ek-pasos">' + PASOS.map((t,i) => {
    const cl = i < est.paso ? 'hecho' : (i === est.paso ? 'act' : '');
    const num = i < est.paso ? ekSvg(EK_ICONOS.tic) : (i+1);
    return '<div class="ek-paso ' + cl + '"><b>' + num + '</b><small>' + t + '</small></div>';
  }).join('') + '</div>';
}

function opciones(lista, campo){
  return '<div class="ek-ops">' + lista.map(o =>
    '<button class="ek-op' + (est[campo] === o.v ? ' sel' : '') + '" data-campo="' + campo + '" data-v="' + o.v + '">' +
      '<span class="ek-op__ic">' + ekSvg(o.i) + '</span>' +
      '<span class="ek-op__tx"><b>' + o.t + '</b><small>' + o.s + '</small></span>' +
    '</button>'
  ).join('') + '</div>';
}

const PREGUNTAS = [
  () => ({
    campo:'puerta', lista:OPC.puerta,
    h:'¿De qué es tu puerta?',
    a:'Si no estás seguro, tocá la que más se parezca.'
  }),
  () => ({
    campo:'ubicacion', lista:OPC.ubicacion,
    h:'¿Dónde está la puerta?',
    a:'Si la puerta recibe lluvia o humedad necesitas un modelo impermeable.'
  }),
  () => ({
    campo:'manijon', lista:OPC.manijon,
    h:'¿La puerta tiene manijón?',
    a:'El manijón es el barral o la manija fija que va del lado de afuera. Si lo tiene, el panel de la cerradura tiene que ser angosto para no chocarlo.'
  }),
  () => ({
    campo:'espesor',
    lista: est.puerta === 'vidrio' ? OPC.espesorVidrio : OPC.espesor,
    h: est.puerta === 'vidrio' ? '¿Qué espesor tiene el vidrio?' : '¿Qué espesor tiene la puerta?',
    a: est.puerta === 'vidrio'
        ? 'Medí el vidrio de canto. La mayoria de las puertas de blindex son de 10 mm.'
        : 'Medí la puerta de canto, con la puerta abierta. Es el dato que define si la cerradura entra.'
  })
];

function pintar(){
  if (est.paso >= PASOS.length) return pintarResultado();

  const p = PREGUNTAS[est.paso]();
  app.innerHTML =
    barraPasos() +
    '<div class="ek-preg">' +
      '<h2>' + p.h + '</h2>' +
      '<p class="ayuda">' + p.a + '</p>' +
      opciones(p.lista, p.campo) +
      (est.paso > 0
        ? '<div class="ek-pie-nav"><button class="ek-volver" id="ek-volver">' + ekSvg(EK_ICONOS.flec) + ' Volver</button><span></span></div>'
        : '') +
    '</div>';

  app.querySelectorAll('.ek-op').forEach(b => {
    b.onclick = () => {
      est[b.dataset.campo] = b.dataset.v;
      est.paso++;
      pintar();
      subir();
    };
  });
  const v = document.getElementById('ek-volver');
  if (v) v.onclick = () => { est.paso--; pintar(); subir(); };
}

function subir(){
  const c = document.querySelector('.ek-card');
  const y = c.getBoundingClientRect().top + window.scrollY - 110;
  if (window.scrollY > y) window.scrollTo({top:y, behavior:'smooth'});
}

function chips(m){
  const c = [];
  if (m.specs.facial)      c.push({t:m.specs.facial === 'Facial 3D' ? 'Reconocimiento facial 3D' : 'Reconocimiento facial', v:true});
  if (m.specs.palma)       c.push({t:'Reconocimiento de palma', v:true});
  if (m.specs.apertura.indexOf('utomatica') > -1) c.push({t:'Apertura automática', v:true});
  if (m.specs.impermeable) c.push({t:'Resistente al agua', v:true});
  if (m.specs.tecnologia.indexOf('WiFi') > -1) c.push({t:'WiFi + app', v:false});
  else c.push({t:'Bluetooth + app', v:false});
  c.push({t:m.specs.huellas + ' huellas', v:false});
  if (m.specs.pantalla)    c.push({t:'Pantalla interna', v:false});
  return '<div class="ek-chips">' + c.map(x =>
    '<span class="ek-chip' + (x.v ? ' ek-chip--v' : '') + '">' + x.t + '</span>').join('') + '</div>';
}

function textoResumen(){
  const nom = o => o ? o.t : '';
  const P = n => OPC[n].find(x => x.v === est[n]);
  const listaEsp = est.puerta === 'vidrio' ? OPC.espesorVidrio : OPC.espesor;
  return [
    'Puerta ' + P('puerta').r,
    P('ubicacion').r,
    est.manijon === 'si' ? 'con manijón' : (est.manijon === 'no' ? 'sin manijón' : 'manijón a confirmar'),
    'espesor ' + nom(listaEsp.find(x => x.v === est.espesor)).toLowerCase()
  ].join(' | ');
}

function enumerar(a){
  if (a.length === 1) return a[0];
  return a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1];
}

function pintarResultado(){
  const r = recomendar();
  const resumen = textoResumen();

  if (r.estado === 'nada'){
    app.innerHTML = barraPasos() +
      '<div class="ek-res"><div class="ek-res__top">' +
        '<h2>Tu caso necesita una mirada humana</h2>' +
        '<p class="ayuda">Con esa combinación no hay un modelo de catálogo que entre directo. Lo resolvemos por WhatsApp: en general hay solución, pero hay que ver la puerta.</p>' +
      '</div>' +
      avisoNo() +
      '<div class="ek-acc" style="justify-content:center;margin-top:22px">' +
        btnWpp(resumen, null) +
        '<button class="ek-btn ek-btn--fan" id="ek-reset">Empezar de nuevo</button>' +
      '</div></div>';
    document.getElementById('ek-reset').onclick = reiniciar;
    return;
  }

  const top = r.lista[0];
  const m = top.m;
  const alts = r.lista.slice(1, 4);

  const porque = top.motivos.length
    ? 'Te la recomendamos porque entra en una puerta ' + OPC.puerta.find(x => x.v === est.puerta).r +
      (top.motivos.length === 1 ? ' y ' : ', ') + enumerar(top.motivos) + '.'
    : 'Entra en una puerta ' + OPC.puerta.find(x => x.v === est.puerta).r + ' como la tuya.';

  app.innerHTML = barraPasos() +
    '<div class="ek-res">' +
      '<div class="ek-res__top">' +
        '<span class="ek-res__tag">' + ekSvg(EK_ICONOS.ok) + (r.estado === 'ok' ? 'Tenemos tu cerradura' : 'La opción más cercana') + '</span>' +
        '<h2>' + (r.estado === 'ok' ? 'Esta es la que entra en tu puerta' : 'Esta es la que más se acerca') + '</h2>' +
        '<p class="ayuda">' + resumen + '</p>' +
      '</div>' +

      '<div class="ek-ficha">' +
        '<div class="ek-ficha__foto"><img src="' + m.img + '" alt="Elike ' + m.nombre + '" loading="lazy"></div>' +
        '<div class="ek-ficha__txt">' +
          '<h3>Elike ' + m.nombre + '</h3>' +
          '<p class="porque">' + porque + '</p>' +
          chips(m) +
          '<div class="ek-precio"><b>' + ekPrecio(m.precio) + '</b><small>o en cuotas sin interés</small></div>' +
          '<div class="ek-acc">' +
            '<a class="ek-btn ek-btn--pri" href="' + ekUrl(m) + '" target="_blank" rel="noopener">Ver en la tienda</a>' +
            '<a class="ek-btn ek-btn--fan" href="cotizar-instalacion.html">Cotizar la instalación</a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      (r.estado === 'parcial' ? avisoParcial() : '') +

      (alts.length ? '<div class="ek-alts"><h4>También te sirven</h4><div class="ek-alts__g">' +
        alts.map(a =>
          '<a class="ek-mini" href="' + ekUrl(a.m) + '" target="_blank" rel="noopener">' +
            '<img src="' + a.m.img + '" alt="Elike ' + a.m.nombre + '" loading="lazy">' +
            '<span><b>Elike ' + a.m.nombre + '</b><small>' + ekPrecio(a.m.precio) + ' &middot; ' + a.m.linea + '</small></span>' +
          '</a>').join('') +
      '</div></div>' : '') +

      '<div class="ek-aviso">' + ekSvg(EK_ICONOS.info) +
        '<span>La recomendación se calcula con las medidas de ficha de cada modelo. Antes de instalar validamos la puerta por foto: es un minuto y evita cualquier sorpresa.</span>' +
      '</div>' +

      '<div class="ek-pie-nav" style="justify-content:center;gap:10px">' +
        btnWpp(resumen, m) +
        '<a class="ek-btn ek-btn--fan" href="comparativa.html">Comparar con otros modelos</a>' +
        '<button class="ek-btn ek-btn--fan" id="ek-reset">Empezar de nuevo</button>' +
      '</div>' +
    '</div>';

  document.getElementById('ek-reset').onclick = reiniciar;
}

function avisoParcial(){
  return '<div class="ek-aviso">' + ekSvg(EK_ICONOS.alr) +
    '<span>No hay un modelo que cumpla al 100% con todo lo que marcaste, así que te mostramos el que más se acerca. Escribinos y lo confirmamos con una foto de la puerta.</span></div>';
}
function avisoNo(){
  return '<div class="ek-aviso ek-aviso--no">' + ekSvg(EK_ICONOS.alr) +
    '<span>Casos como este (puertas corredizas muy finas, vidrios fuera de medida o marcos especiales) se resuelven con adaptaciones. Mandanos una foto de la puerta abierta y te decimos que se puede hacer.</span></div>';
}

function btnWpp(resumen, m){
  const txt = 'Hola Elike! Hice el test de compatibilidad en la web.%0A%0AMi puerta: ' +
    encodeURIComponent(resumen) +
    (m ? '%0AMe recomendó la ' + encodeURIComponent('Elike ' + m.nombre) : '') +
    '%0A%0AQuiero confirmar si es la correcta.';
  return '<a class="ek-btn ek-btn--verde" target="_blank" rel="noopener" href="https://wa.me/' + EK_WPP + '?text=' + txt + '">' +
    ekSvg(EK_ICONOS.wpp) + 'Confirmar por WhatsApp</a>';
}

function reiniciar(){
  est.paso = 0; est.puerta = null; est.ubicacion = null; est.manijon = null; est.espesor = null;
  pintar(); subir();
}

ekArrancar('compat');
pintar();
