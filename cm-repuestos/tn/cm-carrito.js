(function(){
  var WA='542477397400',NUM='+54 9 2477 39-7400';
  var ICO='<svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.6L3 29l7-2.2c1.8 1 3.9 1.5 6 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm6.4 17.6c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.1-4.1-1-3.4-1.4-5.6-4.9-5.8-5.1-.2-.2-1.4-1.8-1.4-3.5s.9-2.5 1.2-2.8c.3-.3.7-.4.9-.4h.7c.2 0 .5 0 .8.6l1 2.4c.1.2.1.5 0 .7l-.4.6-.5.6c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1l1.1-1.3c.2-.3.5-.3.8-.2l2.3 1.1c.3.2.6.2.7.4.1.2.1.9-.2 1.7z"/></svg>';
  function pedido(m){
    var it=[].slice.call(m.querySelectorAll('.js-cart-item')).map(function(r){
      var n=r.querySelector('.cart-item-name a')||r.querySelector('.cart-item-name'),q=r.querySelector('.js-cart-quantity-input');
      return (q?q.value:'1')+' x '+(n?n.textContent.trim():'');
    });
    var t=m.querySelector('.js-cart-total');
    return {items:it,total:t?t.textContent.trim().replace(/,00$/,''):''};
  }
  function pintar(){
    var m=document.querySelector('#modal-cart');if(!m)return;
    var sub=m.querySelector('.js-ajax-cart-submit');if(!sub)return;
    var btn=sub.querySelector('input.btn-primary,button.btn-primary');
    if(btn&&btn.tagName==='INPUT'&&btn.value!=='Enviar mi pedido')btn.value='Enviar mi pedido';
    if(!m.querySelector('.cmc-nota'))sub.insertAdjacentHTML('beforebegin','<div class="cmc-nota">'+ICO.replace('<svg','<svg style="width:18px;height:18px;flex:0 0 18px;fill:#25D366"')+'<div><b>Hoy no pagás nada.</b> Enviás el pedido y te escribimos por WhatsApp para cerrar pago y envío.</div></div>');
    var c=m.querySelector('.cmc');
    if(!c){
      sub.insertAdjacentHTML('afterend',
        '<div class="cmc-sub">Sin pago online · sin compromiso</div>'+
        '<div class="cmc"><span class="cmc-pill">Compra asistida</span>'+
        '<div class="cmc-t">Así te llega nuestro mensaje</div>'+
        '<p class="cmc-d">Apenas envías el pedido, revisamos el stock real y te escribimos por WhatsApp. Sin sorpresas.</p>'+
        '<div class="cmc-steps"><span class="cmc-s1"><i>1</i>Enviás el pedido</span><span class="cmc-s2"><i>2</i>Revisamos stock</span><span class="cmc-s3"><i>3</i>Te escribimos</span></div>'+
        '<div class="cmc-phone"><div class="cmc-head"><span class="cmc-av">CM</span><div><b>CM Repuestos</b><small>en línea</small></div></div>'+
        '<div class="cmc-chat"><div class="cmc-b cmc-b1">¡Hola! Recibimos tu pedido en la web.<small>10:42</small></div>'+
        '<div class="cmc-b cmc-b2 cmc-ped"></div>'+
        '<div class="cmc-b cmc-b3">Ya revisamos el stock: está todo. ¿Cómo querés pagar y a dónde te lo enviamos?<small>10:44</small></div>'+
        '<div class="cmc-typing"><i></i><i></i><i></i></div></div></div>'+
        '<div class="cmc-num">'+ICO+'<span>Te escribimos desde este número. Agendalo para ver el mensaje:<b>'+NUM+' · CM Repuestos</b></span></div>'+
        '<a class="cmc-wa" target="_blank" rel="noopener">'+ICO+'¿Preferís consultar antes? Escribinos</a></div>');
      c=m.querySelector('.cmc');
    }
    var p=pedido(m);
    c.querySelector('.cmc-ped').innerHTML='Tu pedido:<br><b>'+p.items.join('<br>')+'</b><br>Total: <b>'+p.total+'</b><small>10:42</small>';
    c.querySelector('.cmc-wa').href='https://wa.me/'+WA+'?text='+encodeURIComponent('Hola CM Repuestos, quiero consultar antes de enviar mi pedido:\n'+p.items.join('\n')+'\nTotal: '+p.total);
  }
  var t;function luego(){clearTimeout(t);t=setTimeout(pintar,300);}
  function iniciar(){
    var m=document.querySelector('#modal-cart');if(!m)return;
    pintar();
    new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(!ms[i].target.closest||!ms[i].target.closest('.cmc'))return luego();}}).observe(m,{childList:true,subtree:true,characterData:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
})();
