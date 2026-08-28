/* =========================================================
   ELIKE - Base de modelos
   ---------------------------------------------------------
   TODO el sistema (recomendador, comparador y cotizador) lee
   de este archivo. Para dar de alta, editar o sacar un modelo
   se toca SOLO aca: las tres herramientas se actualizan solas.

   Datos tomados de la ficha real de cada producto en
   www.elike.com.ar (septiembre 2026).
   ========================================================= */

const EK_TIENDA = 'https://www.elike.com.ar';
const EK_WPP    = '5491131291243';

/* --- Tipos de puerta que entiende el recomendador ---------
   convencional | aluminio | blindada | corrediza | vidrio
   ---------------------------------------------------------
   exterior:true  -> apta intemperie (impermeable / IP)
   manijon:true   -> el panel es angosto y convive con el
                     manijón o barral fijo de la puerta
   espesor:[min,max] en mm
----------------------------------------------------------- */

const EK_MODELOS = [
  {
    id:'miami', nombre:'Miami', linea:'Bluetooth Tuya',
    resumen:'Cerradura de interior con acceso simple, para empezar sin llaves.',
    precio:94900, cat:'interior',
    slug:'cerradura-inteligente-bluetooth',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/miami-4c588ba0d31820cb9e17724740001717-640-0.webp',
    puerta:['convencional'], exterior:false, manijon:true, espesor:[38,55],
    specs:{
      apertura:'Manual', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'Bluetooth (BLE)',
      app:'Tuya', remoto:'', camara:'', pantalla:'', impermeable:'',
      material:'Aleación de aluminio', mortaja:'SingleBolt', pestillos:'SingleBolt',
      frente:'5,5 cm', profundidad:'7 cm', panel:'16,5 x 2,8 cm',
      espesorTxt:'38 a 55 mm', bateria:'4 pilas AAA', emergencia:'USB'
    }
  },
  {
    id:'chicago', nombre:'Chicago', linea:'Pomo inteligente Tuya',
    resumen:'Pomo inteligente para puertas interiores: se cambia sin obra.',
    precio:99900, cat:'interior',
    slug:'cerradura-pomo-inteligente-elike',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/chicago-faea1607cae6310d8a17724740198397-640-0.webp',
    puerta:['convencional'], exterior:false, manijon:true, espesor:[35,55],
    specs:{
      apertura:'Manual (pomo)', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'Bluetooth (BLE)',
      app:'Tuya', remoto:'', camara:'', pantalla:'', impermeable:'',
      material:'Aluminio + acero inoxidable', mortaja:'SingleBolt', pestillos:'SingleBolt',
      frente:'5,5 cm', profundidad:'7 cm', panel:'7,5 x 5,9 cm',
      espesorTxt:'35 a 55 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'boston', nombre:'Boston', linea:'WiFi Tuya / Bluetooth TTLock',
    resumen:'La puerta de entrada al acceso sin llaves: práctica y fácil de usar.',
    precio:119900, cat:'exterior',
    slug:'cerradura-inteligente-elike-boston',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/boston-6c2e5213d06c63dc2117724738958500-640-0.webp',
    puerta:['convencional'], exterior:false, manijon:false, espesor:[40,110],
    specs:{
      apertura:'Manual', facial:'', palma:'', huellas:'Hasta 100',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi + Bluetooth',
      app:'Tuya y TTLock', remoto:'Sí', camara:'', pantalla:'', impermeable:'',
      material:'Aleación de aluminio', mortaja:'5050', pestillos:'Simple',
      frente:'24 cm', profundidad:'7 cm', panel:'26,8 x 6,1 cm',
      espesorTxt:'40 a 110 mm', bateria:'4 pilas AA', emergencia:'USB'
    }
  },
  {
    id:'budapest', nombre:'Budapest', linea:'WiFi + Bluetooth reforzada',
    resumen:'Reforzada y versatil: triple pestillo para puertas de seguridad.',
    precio:138900, cat:'exterior',
    slug:'cerradura-inteligente-elike-budapest-wifi-y-bluetooth-reforzada',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/budapest-c0691065cf5cc27fba17724735580436-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[35,60],
    specs:{
      apertura:'Manual', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi + Bluetooth',
      app:'TTLock (BT) y Tuya (WiFi)', remoto:'Sí', camara:'', pantalla:'', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'38 x 7 cm',
      espesorTxt:'35 a 60 mm', bateria:'4 pilas AA', emergencia:'USB'
    }
  },
  {
    id:'niza', nombre:'Niza', linea:'Automática / diseño único',
    resumen:'Automática con WiFi y una linea distinta a todo el resto.',
    precio:229000, cat:'exterior',
    slug:'cerradura-inteligente-elike-niza-automatica-diseno-unico-87oxd',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/lk0173-d20225e23929207dde17755873135586-640-0.webp',
    puerta:['convencional'], exterior:false, manijon:true, espesor:[40,120],
    specs:{
      apertura:'Automática', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'', pantalla:'', impermeable:'',
      material:'Aleación de aluminio', mortaja:'5050', pestillos:'Simple',
      frente:'16 cm', profundidad:'7 cm', panel:'26,5 x 5 cm',
      espesorTxt:'40 a 120 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'glasgow', nombre:'Glasgow', linea:'WiFi Tuya impermeable',
    resumen:'Resistente al agua: pensada para puertas expuestas a la intemperie.',
    precio:229900, cat:'exterior',
    slug:'cerradura-inteligente-elike-glasgow-wifi-tuya-impermeable',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/glasgow-0739d4d8cb034d664717724739461167-640-0.webp',
    puerta:['convencional'], exterior:true, manijon:false, espesor:[40,110],
    specs:{
      apertura:'Manual', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'', pantalla:'', impermeable:'Sí',
      material:'Aleación de aluminio', mortaja:'5050', pestillos:'Simple',
      frente:'24 cm', profundidad:'7 cm', panel:'28 x 6,5 cm',
      espesorTxt:'40 a 110 mm', bateria:'4 pilas AA', emergencia:'USB'
    }
  },
  {
    id:'lisboa', nombre:'Lisboa', linea:'Automática / facial 3D',
    resumen:'Automática con reconocimiento facial 3D y pantalla interna.',
    precio:239000, cat:'exterior',
    slug:'cerradura-inteligente-elike-lisboa',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/lisboa-0d06a39b97599207ce17724738570037-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[40,110],
    specs:{
      apertura:'Automática', facial:'Facial 3D', palma:'', huellas:'Hasta 100',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - interna', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'43 x 7,7 cm',
      espesorTxt:'40 a 110 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'monaco', nombre:'Mónaco', linea:'Facial 3D / automática',
    resumen:'Automática con facial 3D, cámara y pantalla, en la banda media.',
    precio:239000, cat:'exterior',
    slug:'cerradura-inteligente-elike-monaco-reconocimiento-facial-3d-automatica-copia',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/lk0208a-6a26827e3b26fcdec017767951276823-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[40,110],
    specs:{
      apertura:'Automática', facial:'Facial 3D', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - interna', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'44 x 7,5 cm',
      espesorTxt:'40 a 110 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'paris', nombre:'París', linea:'Automática / impermeable',
    resumen:'Cierre magnetico motorizado: no requiere calado y va a la intemperie.',
    precio:248000, cat:'especial',
    slug:'cerradura-inteligente-elike-paris-automatica-impermeable',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/paris-2c2e105564188263ad17703964692386-640-0.webp',
    puerta:['convencional','corrediza','aluminio'], exterior:true, manijon:true, espesor:[35,60],
    specs:{
      apertura:'Automática motorizada', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'Bluetooth',
      app:'TTLock', remoto:'', camara:'', pantalla:'', impermeable:'Sí - ambos lados',
      material:'Acero inoxidable', mortaja:'Magnética (sin calado)', pestillos:'Simple',
      frente:'No requiere calado', profundidad:'No requiere calado',
      panel:'Externo 16,8 x 6,8 cm / interno 13 x 10 cm',
      espesorTxt:'35 a 60 mm', bateria:'4 pilas AA', emergencia:'USB'
    }
  },
  {
    id:'roma', nombre:'Roma', linea:'Facial 3D / automática',
    resumen:'Automática con facial 3D: el salto de calidad sin irse a premium.',
    precio:259000, cat:'exterior',
    slug:'cerradura-inteligente-elike-roma',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/roma-be442b00380ae580ef17724739626833-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[40,110],
    specs:{
      apertura:'Automática', facial:'Facial 3D', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - interna', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'44 x 7,5 cm',
      espesorTxt:'40 a 110 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'oslo', nombre:'Oslo', linea:'Marco delgado / impermeable',
    resumen:'Para puertas de perfil angosto de PVC o aluminio, también exterior.',
    precio:269900, cat:'angosto',
    slug:'cerradura-inteligente-elike',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/oslo-94721073c575cbd16917724741246027-640-0.webp',
    puerta:['aluminio'], exterior:true, manijon:true, espesor:[35,55],
    specs:{
      apertura:'Manual', facial:'', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'', pantalla:'', impermeable:'Sí',
      material:'Aleación de aluminio', mortaja:'3585', pestillos:'Simple',
      frente:'24 cm', profundidad:'5 cm', panel:'35 x 3,9 cm',
      espesorTxt:'35 a 55 mm', bateria:'4 pilas AA', emergencia:'USB'
    }
  },
  {
    id:'venecia', nombre:'Venecia', linea:'Marco delgado / facial',
    resumen:'Perfil angosto con reconocimiento facial e impermeable.',
    precio:319000, cat:'angosto',
    slug:'cerradura-inteligente-venecia-puerta-delgada-reconocimiento-facil',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/venecia-6f0eefa935a34171f517724738085033-640-0.webp',
    puerta:['aluminio'], exterior:true, manijon:true, espesor:[35,70],
    specs:{
      apertura:'Manual', facial:'Hasta 50', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'', pantalla:'', impermeable:'Sí',
      material:'Aleación de aluminio', mortaja:'3585', pestillos:'Simple',
      frente:'24 cm', profundidad:'5 cm', panel:'32 x 3,8 cm',
      espesorTxt:'35 a 70 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'sevilla', nombre:'Sevilla', linea:'Facial 3D + palma',
    resumen:'Premium: reconocimiento facial 3D y de palma, cámara y pantalla.',
    precio:319900, cat:'exterior',
    slug:'cerradura-inteligente-elike-sevilla',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/sevilla-82d9f688019a0dcd0417724738325200-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[40,110],
    specs:{
      apertura:'Automática', facial:'Facial 3D', palma:'Sí', huellas:'Hasta 100',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - interna', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'42 x 7,5 cm',
      espesorTxt:'40 a 110 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'florencia', nombre:'Florencia', linea:'Puerta de vidrio / automática',
    resumen:'Disenada especificamente para puertas de vidrio templado.',
    precio:333900, cat:'especial',
    slug:'cerradura-inteligente-elike-florencia',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/florencia-367ef1c01b5bec089a17724738778807-640-0.webp',
    puerta:['vidrio','corrediza'], exterior:false, manijon:true, espesor:[10,12],
    specs:{
      apertura:'Automática', facial:'', palma:'', huellas:'Hasta 100',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'', pantalla:'', impermeable:'',
      material:'Aleación de aluminio', mortaja:'Magnética', pestillos:'Simple',
      frente:'No requiere calado', profundidad:'No requiere calado',
      panel:'170 x 63/33 mm',
      espesorTxt:'Vidrio de 10 a 12 mm', bateria:'4 pilas AA', emergencia:'USB'
    }
  },
  {
    id:'sidney', nombre:'Sidney', linea:'Control de acceso',
    resumen:'Control de acceso para edificios, oficinas, coworks y depositos.',
    precio:399000, cat:'acceso',
    slug:'control-acceso-inteligente-sidney-edificios-y-oficinas-z3b25',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/lkk5f-fca39da22de39a865217767958359666-640-0.webp',
    puerta:[], exterior:true, manijon:true, espesor:[0,0],
    specs:{
      apertura:'Control de acceso (no incluye cerradura)', facial:'Hasta 100', palma:'',
      huellas:'Hasta 100', codigos:'Configurables', rfid:'Hasta 1.000 (Mifare)',
      tecnologia:'Bluetooth 4.0', app:'TTLock', remoto:'Con gateway WiFi (opcional)',
      camara:'', pantalla:'', impermeable:'IP66',
      material:'Aleación de aluminio', mortaja:'No aplica', pestillos:'No aplica',
      frente:'No aplica', profundidad:'No aplica', panel:'Modulo de pared',
      espesorTxt:'No aplica', bateria:'Cableado / batería', emergencia:'-'
    }
  },
  {
    id:'tokio', nombre:'Tokio', linea:'Premium / facial 3D automática',
    resumen:'Premium: maximo nivel de seguridad con facial 3D y videoportero.',
    precio:419900, cat:'exterior',
    slug:'cerradura-inteligente-elike-tokio',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/tokio-68b3988cd7adbc451c17724739798684-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[30,100],
    specs:{
      apertura:'Automática', facial:'Facial 3D', palma:'', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - interna', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'41,5 x 7,8 cm',
      espesorTxt:'30 a 100 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'dubai', nombre:'Dubai', linea:'Premium / facial + palma 3D',
    resumen:'Tope de gama: facial y palma 3D, videollamada y control remoto.',
    precio:439500, cat:'exterior',
    slug:'cerradura-inteligente-elike-dubai',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/firefly_gemini-flash_modificar-a-formato-1-1-no-alterar-nada-mas-36067-6d056bbe7de16d520f17877517960577-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[30,100],
    specs:{
      apertura:'Automática', facial:'Facial 3D', palma:'Palma 3D', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - HD con videoportero', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'42 x 7 cm',
      espesorTxt:'30 a 100 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  },
  {
    id:'londres', nombre:'Londres', linea:'Premium / video vigilancia',
    resumen:'Premium con vigilancia: facial y palma, cámara HD y pantalla interna.',
    precio:475900, cat:'exterior',
    slug:'cerradura-inteligente-elike-londres-reconocimiento-facial',
    img:'https://acdn-us.mitiendanube.com/stores/007/098/438/products/londres-6d0ad1a61aeea72a9817724736345952-640-0.webp',
    puerta:['convencional','blindada'], exterior:false, manijon:false, espesor:[30,100],
    specs:{
      apertura:'Manual', facial:'Hasta 50', palma:'Hasta 50', huellas:'Hasta 50',
      codigos:'Hasta 100', rfid:'Hasta 100', tecnologia:'WiFi',
      app:'Tuya', remoto:'Sí', camara:'Si - HD', pantalla:'Sí - interna', impermeable:'',
      material:'Aleación de aluminio', mortaja:'6068', pestillos:'Triple',
      frente:'24 cm', profundidad:'9 cm', panel:'45 x 7,8 cm',
      espesorTxt:'30 a 100 mm', bateria:'Litio recargable', emergencia:'USB'
    }
  }
];

/* --- Agrupación para el comparador ------------------------ */
const EK_GRUPOS = [
  { titulo:'Cerraduras de exterior', ids:['boston','budapest','glasgow','niza','lisboa','monaco','roma','sevilla','tokio','dubai','londres'] },
  { titulo:'Marco angosto (PVC o aluminio)', ids:['oslo','venecia'] },
  { titulo:'Vidrio, corredizas y sin calado', ids:['florencia','paris'] },
  { titulo:'Cerraduras de interior', ids:['miami','chicago'] },
  { titulo:'Control de acceso', ids:['sidney'] }
];

/* --- Filas de la tabla comparativa (en orden) ------------- */
const EK_FILAS = [
  ['precio',      'Precio'],
  ['apertura',    'Tipo de apertura'],
  ['facial',      'Reconocimiento facial'],
  ['palma',       'Reconocimiento de palma'],
  ['huellas',     'Capacidad de huellas'],
  ['codigos',     'Códigos numéricos'],
  ['rfid',        'Tarjetas RFID'],
  ['tecnologia',  'Conectividad'],
  ['app',         'App compatible'],
  ['remoto',      'Apertura remota'],
  ['camara',      'Cámara / mirilla'],
  ['pantalla',    'Pantalla interna'],
  ['impermeable', 'Resistencia al agua'],
  ['material',    'Material'],
  ['mortaja',     'Mortaja incluida'],
  ['pestillos',   'Pestillos'],
  ['frente',      'Frente de mortaja'],
  ['profundidad', 'Calado requerido'],
  ['panel',       'Medidas del panel'],
  ['espesorTxt',  'Espesor de puerta'],
  ['bateria',     'Alimentación'],
  ['emergencia',  'Energía de emergencia']
];

/* --- Servicio de instalación: precios y cobertura reales --- */
const EK_ZONAS = [
  {
    id:'caba', nombre:'CABA', precio:135000,
    slug:'servicio-de-instalacion-de-cerradura-inteligente-elike-caba',
    localidades:['Ciudad Autónoma de Buenos Aires']
  },
  {
    id:'gba1', nombre:'GBA Zona 1', precio:135000,
    slug:'servicio-de-instalacion-de-cerradura-inteligente-elike-gba',
    localidades:['Escobar','Malvinas Argentinas','Pilar','San Fernando','San Isidro','San Miguel','Tigre','Tres de Febrero','Vicente López']
  },
  {
    id:'gba2', nombre:'GBA Zona 2', precio:160000,
    slug:'gba-zona-2-servicio-de-instalacion-de-cerradura-inteligente-elike',
    localidades:['General Rodríguez','General San Martín','Hurlingham','Ituzaingó','José C. Paz','La Matanza','Luján','Marcos Paz','Merlo','Moreno','Morón']
  },
  {
    id:'gba3', nombre:'GBA Zona 3', precio:170000,
    slug:'gba-zona-3-servicio-de-instalacion-de-cerradura-inteligente',
    localidades:['Almirante Brown','Avellaneda','Berazategui','Berisso','Cañuelas','Ensenada','La Plata','Lanús','Lomas de Zamora','Presidente Perón','Quilmes','San Vicente']
  }
];

/* --- Modificadores del cotizador --------------------------
   Estos DOS valores son los únicos de todo el sistema que
   no salen de la tienda: los define Elike. Se cambian aca.
----------------------------------------------------------- */
const EK_COTIZA = {
  recargoBlindada: 0.20,   // +20% sobre la mano de obra si la puerta es blindada
  unidadExtra:     0.60,   // cada unidad adicional en la misma dirección paga el 60%
  textoUnidadExtra:'Cada unidad adicional en la misma dirección paga el 60% de la mano de obra.'
};

/* --- Utilidades ------------------------------------------- */
const ekPrecio = n => '$' + Number(n).toLocaleString('es-AR', {maximumFractionDigits:0});
const ekUrl    = m => EK_TIENDA + '/productos/' + m.slug + '/';
const ekPorId  = id => EK_MODELOS.find(m => m.id === id);
