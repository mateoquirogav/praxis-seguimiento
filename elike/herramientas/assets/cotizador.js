/* =========================================================
   ELIKE - Cotizá la instalación
   Cotizador en 4 pasos con verificación de cobertura.
   ========================================================= */

const CI = {
  uno :'<path d="M12 4v16"/><path d="M8.5 7.5L12 4l3.5 3.5"/>',
  puer:'<path d="M5 3h14v18H5z"/><path d="M5 21h14"/><circle cx="15.6" cy="12" r="1"/>',
  blin:'<path d="M12 3l7.5 3v6c0 4.4-3 8.1-7.5 9.3C7.5 20.1 4.5 16.4 4.5 12V6L12 3z"/><path d="M9.4 12.2l1.9 1.9 3.4-3.6"/>',
  pin :'<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>'
};

const PASOS_C = ['Unidades','Puerta','Zona','Datos'];

const cot = { paso:0, unidades:null, puerta:null, zona:null, localidad:null, cp:'', nombre:'', tel:'' };
const cap = document.getElementById('ek-app');

/* ----------------------- CALCULO ----------------------- */
function calcular(){
  const z = EK_ZONAS.find(x => x.id === cot.zona);
  if (!z) return null;
  const u = cot.unidades === '+5' ? 5 : Number(cot.unidades);
  const base = z.precio;
  const conPuerta = cot.puerta === 'blindada' ? base * (1 + EK_COTIZA.recargoBlindada) : base;
  const extras = (u - 1) * conPuerta * EK_COTIZA.unidadExtra;
  return {
    zona:z, unidades:u, base, conPuerta, extras,
    recargo: conPuerta - base,
    total: Math.round((conPuerta + extras) / 100) * 100
  };
}

/* ------------------------ VISTAS ----------------------- */
function barraPasosC(){
  return '<div class="ek-pasos">' + PASOS_C.map((t,i) => {
    const cl = i < cot.paso ? 'hecho' : (i === cot.paso ? 'act' : '');
    const num = i < cot.paso ? ekSvg(EK_ICONOS.tic) : (i+1);
    return '<div class="ek-paso ' + cl + '"><b>' + num + '</b><small>' + t + '</small></div>';
  }).join('') + '</div>';
}

function navPie(){
  return cot.paso > 0
    ? '<div class="ek-pie-nav"><button class="ek-volver" id="ek-volver">' + ekSvg(EK_ICONOS.flec) + ' Volver</button><span></span></div>'
    : '';
}

function pintarC(){
  if (cot.paso >= PASOS_C.length) return pintarResultadoC();
  if (cot.paso === 0) return pasoUnidades();
  if (cot.paso === 1) return pasoPuerta();
  if (cot.paso === 2) return pasoZona();
  return pasoDatos();
}

function engancharVolver(){
  const v = document.getElementById('ek-volver');
  if (v) v.onclick = () => { cot.paso--; pintarC(); subirC(); };
}
function engancharOps(){
  cap.querySelectorAll('.ek-op').forEach(b => {
    b.onclick = () => {
      cot[b.dataset.campo] = b.dataset.v;
      cot.paso++;
      pintarC();
      subirC();
    };
  });
}
function subirC(){
  const c = document.querySelector('.ek-card');
  const y = c.getBoundingClientRect().top + window.scrollY - 110;
  if (window.scrollY > y) window.scrollTo({top:y, behavior:'smooth'});
}

/* ---- Paso 1: unidades ---- */
function pasoUnidades(){
  const ops = ['1','2','3','4','5','+5'].map(v =>
    '<button class="ek-op' + (cot.unidades === v ? ' sel' : '') + '" data-campo="unidades" data-v="' + v + '"><b>' + v + '</b></button>'
  ).join('');
  cap.innerHTML = barraPasosC() +
    '<div class="ek-preg">' +
      '<h2>¿Cuántas cerraduras querés instalar?</h2>' +
      '<p class="ayuda">Las unidades se cotizan para una misma dirección (por ejemplo, 3 cerraduras en la misma casa o edificio).</p>' +
      '<div class="ek-ops ek-ops--chicas">' + ops + '</div>' +
      navPie() +
    '</div>';
  engancharOps(); engancharVolver();
}

/* ---- Paso 2: puerta ---- */
function pasoPuerta(){
  const lista = [
    {v:'convencional', t:'Convencional', s:'Madera, chapa, PVC o aluminio', i:CI.puer},
    {v:'blindada',     t:'Blindada o de seguridad', s:'Requiere más trabajo de calado', i:CI.blin}
  ];
  cap.innerHTML = barraPasosC() +
    '<div class="ek-preg">' +
      '<h2>¿Cómo es la puerta?</h2>' +
      '<p class="ayuda">La puerta blindada lleva más tiempo de colocación, por eso se cotiza distinto.</p>' +
      '<div class="ek-ops">' + lista.map(o =>
        '<button class="ek-op' + (cot.puerta === o.v ? ' sel' : '') + '" data-campo="puerta" data-v="' + o.v + '">' +
          '<span class="ek-op__ic">' + ekSvg(o.i) + '</span>' +
          '<span class="ek-op__tx"><b>' + o.t + '</b><small>' + o.s + '</small></span>' +
        '</button>').join('') + '</div>' +
      navPie() +
    '</div>';
  engancharOps(); engancharVolver();
}

/* ---- Paso 3: zona ---- */
function pasoZona(){
  const opts = EK_ZONAS.map(z =>
    '<optgroup label="' + z.nombre + '">' +
      z.localidades.map(l => '<option value="' + z.id + '|' + l + '"' +
        (cot.localidad === l ? ' selected' : '') + '>' + l + '</option>').join('') +
    '</optgroup>').join('');

  cap.innerHTML = barraPasosC() +
    '<div class="ek-preg">' +
      '<h2>¿Dónde hay que instalarla?</h2>' +
      '<p class="ayuda">Verificamos al instante si tu localidad está dentro de la zona de cobertura del equipo de Elike.</p>' +
      '<div class="ek-2col">' +
        '<div class="ek-campo">' +
          '<label for="ek-loc">Localidad</label>' +
          '<select id="ek-loc">' +
            '<option value="">Elegí tu localidad...</option>' + opts +
            '<option value="fuera|Otra">Mi localidad no está en la lista</option>' +
          '</select>' +
        '</div>' +
        '<div class="ek-campo">' +
          '<label for="ek-cp">Código postal <span style="font-weight:400;color:var(--txt-3)">(opcional)</span></label>' +
          '<input id="ek-cp" type="text" inputmode="numeric" maxlength="8" placeholder="Ej: 1425" value="' + cot.cp + '">' +
          '<p class="pista">Nos ayuda a calcular mejor el viático.</p>' +
        '</div>' +
      '</div>' +
      '<div id="ek-cobertura"></div>' +
      '<div class="ek-pie-nav">' +
        '<button class="ek-volver" id="ek-volver">' + ekSvg(EK_ICONOS.flec) + ' Volver</button>' +
        '<button class="ek-btn ek-btn--pri" id="ek-seguir" disabled>Continuar</button>' +
      '</div>' +
    '</div>';

  const sel = document.getElementById('ek-loc');
  const cob = document.getElementById('ek-cobertura');
  const seg = document.getElementById('ek-seguir');

  const revisar = () => {
    const val = sel.value;
    if (!val){ cob.innerHTML = ''; seg.disabled = true; return; }
    const [zid, loc] = val.split('|');
    cot.zona = zid === 'fuera' ? null : zid;
    cot.localidad = loc;
    if (zid === 'fuera'){
      cob.innerHTML = '<div class="ek-aviso ek-aviso--no">' + ekSvg(EK_ICONOS.alr) +
        '<span><b>Todavía no llegamos ahí con instalación propia.</b> Podés comprar la cerradura igual: te la enviamos con el manual y coordinamos por WhatsApp un instalador de confianza en tu zona.</span></div>';
      seg.disabled = true;
      cob.insertAdjacentHTML('beforeend',
        '<div class="ek-acc" style="margin-top:14px">' +
          '<a class="ek-btn ek-btn--verde" target="_blank" rel="noopener" href="https://wa.me/' + EK_WPP +
            '?text=' + encodeURIComponent('Hola Elike! Quiero instalar una cerradura pero mi localidad no aparece en el cotizador. ¿Puedo coordinar igual?') + '">' +
            ekSvg(EK_ICONOS.wpp) + 'Consultar por mi zona</a>' +
          '<a class="ek-btn ek-btn--fan" href="' + EK_TIENDA + '/cerraduras/" target="_blank" rel="noopener">Ver las cerraduras</a>' +
        '</div>');
    } else {
      const z = EK_ZONAS.find(x => x.id === zid);
      cob.innerHTML = '<div class="ek-aviso ek-aviso--ok">' + ekSvg(EK_ICONOS.ok) +
        '<span><b>Llegamos a ' + loc + '.</b> Entra en ' + z.nombre + ', con instalación a cargo del equipo propio de Elike.</span></div>';
      seg.disabled = false;
    }
  };

  sel.onchange = revisar;
  document.getElementById('ek-cp').oninput = e => { cot.cp = e.target.value; };
  seg.onclick = () => { cot.paso++; pintarC(); subirC(); };
  engancharVolver();
  if (sel.value) revisar();
}

/* ---- Paso 4: datos ---- */
function pasoDatos(){
  cap.innerHTML = barraPasosC() +
    '<div class="ek-preg">' +
      '<h2>Último paso: ¿quién sos?</h2>' +
      '<p class="ayuda">Con esto armamos la cotización y te la dejamos lista para coordinar la visita.</p>' +
      '<div class="ek-2col">' +
        '<div class="ek-campo">' +
          '<label for="ek-nom">Nombre y apellido</label>' +
          '<input id="ek-nom" type="text" placeholder="Ej: Gustavo Perez" value="' + cot.nombre + '">' +
        '</div>' +
        '<div class="ek-campo">' +
          '<label for="ek-tel">WhatsApp</label>' +
          '<input id="ek-tel" type="tel" inputmode="tel" placeholder="Ej: 11 3129 1243" value="' + cot.tel + '">' +
        '</div>' +
      '</div>' +
      '<div class="ek-pie-nav">' +
        '<button class="ek-volver" id="ek-volver">' + ekSvg(EK_ICONOS.flec) + ' Volver</button>' +
        '<button class="ek-btn ek-btn--pri" id="ek-ver" disabled>Ver mi cotización</button>' +
      '</div>' +
    '</div>';

  const nom = document.getElementById('ek-nom');
  const tel = document.getElementById('ek-tel');
  const btn = document.getElementById('ek-ver');
  const chequear = () => {
    cot.nombre = nom.value.trim();
    cot.tel = tel.value.trim();
    btn.disabled = !(cot.nombre.length > 2 && cot.tel.replace(/\D/g,'').length >= 8);
  };
  nom.oninput = chequear; tel.oninput = chequear; chequear();
  btn.onclick = () => { cot.paso++; pintarC(); subirC(); };
  engancharVolver();
}

/* --------------------- RESULTADO ----------------------- */
function pintarResultadoC(){
  const c = calcular();
  if (!c){ cot.paso = 2; return pintarC(); }

  const uTxt = cot.unidades === '+5' ? '5 o más' : cot.unidades;
  const pTxt = cot.puerta === 'blindada' ? 'Blindada o de seguridad' : 'Convencional';

  const resumen =
    uTxt + ' cerradura' + (c.unidades > 1 ? 's' : '') + ' | puerta ' + pTxt.toLowerCase() +
    ' | ' + cot.localidad + ' (' + c.zona.nombre + ')';

  const wpp = 'https://wa.me/' + EK_WPP + '?text=' + encodeURIComponent(
    'Hola Elike! Cotice la instalación en la web.\n\n' +
    'Nombre: ' + cot.nombre + '\n' +
    'WhatsApp: ' + cot.tel + '\n' +
    'Unidades: ' + uTxt + '\n' +
    'Puerta: ' + pTxt + '\n' +
    'Zona: ' + cot.localidad + ' - ' + c.zona.nombre + (cot.cp ? ' (CP ' + cot.cp + ')' : '') + '\n' +
    'Estimado en la web: ' + ekPrecio(c.total) + '\n\n' +
    'Quiero coordinar la visita técnica.'
  );

  cap.innerHTML = barraPasosC() +
    '<div class="ek-res">' +
      '<div class="ek-res__top">' +
        '<span class="ek-res__tag">' + ekSvg(EK_ICONOS.ok) + 'Cotización lista</span>' +
        '<h2>' + (cot.nombre.split(' ')[0]) + ', esta es tu instalación</h2>' +
        '<p class="ayuda">' + resumen + '</p>' +
      '</div>' +

      '<div class="ek-cuenta">' +
        '<div class="fila"><span>Mano de obra e instalación &mdash; ' + c.zona.nombre + '</span><b>' + ekPrecio(c.base) + '</b></div>' +
        (c.recargo > 0
          ? '<div class="fila"><span>Adicional por puerta blindada</span><b>+ ' + ekPrecio(c.recargo) + '</b></div>' : '') +
        (c.extras > 0
          ? '<div class="fila"><span>' + (c.unidades - 1) + ' unidad' + (c.unidades - 1 > 1 ? 'es' : '') + ' adicional' + (c.unidades - 1 > 1 ? 'es' : '') + ' en la misma dirección</span><b>+ ' + ekPrecio(Math.round(c.extras)) + '</b></div>' : '') +
        '<div class="fila"><span>Viáticos a ' + cot.localidad + '</span><b>Incluidos</b></div>' +
        '<div class="fila total"><span>Total estimado</span><b>' + ekPrecio(c.total) + '</b></div>' +
      '</div>' +

      '<div class="ek-aviso">' + ekSvg(EK_ICONOS.info) +
        '<span>Es un <b>precio estimado</b>. Se confirma en la validación previa (alcanza con una foto de la puerta abierta). No incluye materiales ni adaptaciones sobre la puerta o su marco, si el trabajo las necesitara.</span>' +
      '</div>' +

      '<div class="ek-pagos">' +
        '<div class="ek-pago"><b>Tarjeta de crédito</b><small>Cuotas sin interés según promoción vigente</small></div>' +
        '<div class="ek-pago"><b>Transferencia</b><small>Con descuento sobre el total</small></div>' +
        '<div class="ek-pago"><b>Efectivo</b><small>Al finalizar la instalación</small></div>' +
      '</div>' +

      '<div class="ek-pie-nav" style="justify-content:center;gap:10px;margin-top:26px">' +
        '<a class="ek-btn ek-btn--verde" target="_blank" rel="noopener" href="' + wpp + '">' + ekSvg(EK_ICONOS.wpp) + 'Coordinar la instalación</a>' +
        '<a class="ek-btn ek-btn--pri" target="_blank" rel="noopener" href="' + EK_TIENDA + '/productos/' + c.zona.slug + '/">Contratar el servicio online</a>' +
        '<a class="ek-btn ek-btn--fan" href="' + EK_TIENDA + '/cerraduras/" target="_blank" rel="noopener">Ver las cerraduras</a>' +
        '<button class="ek-btn ek-btn--fan" id="ek-reset">Empezar de nuevo</button>' +
      '</div>' +
    '</div>';

  document.getElementById('ek-reset').onclick = () => {
    cot.paso = 0; cot.unidades = null; cot.puerta = null; cot.zona = null;
    cot.localidad = null; cot.cp = ''; cot.nombre = ''; cot.tel = '';
    pintarC(); subirC();
  };
}

ekArrancar('cotiza');
pintarC();
