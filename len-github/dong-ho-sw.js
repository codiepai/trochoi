const V="dong-ho-v1",F=["./dong-ho.html","./dong-ho-manifest.json","./dong-ho-icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(!F.some(f=>new URL(f,self.location).href===u.href))return; // không đụng tới các game khác
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
