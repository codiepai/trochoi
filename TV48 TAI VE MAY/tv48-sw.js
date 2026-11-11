const V="tv48-v1",F=["./tv48-tai-ve.html","./tv48-manifest.json","./tv48-icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x.startsWith("tv48-")).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  const lanDau=F.some(f=>new URL(f,self.location).href===u.href);
  const phongChu=u.host==="fonts.googleapis.com"||u.host==="fonts.gstatic.com";
  if(lanDau){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));return;}
  if(phongChu){e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n;}).catch(()=>r))));}
});
