if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,t)=>{const c=s||("document"in self?document.currentScript.src:"")||location.href;if(e[c])return;let a={};const r=s=>i(s,c),u={module:{uri:c},exports:a,require:r};e[c]=Promise.all(n.map((s=>u[s]||r(s)))).then((s=>(t(...s),a)))}}define(["./workbox-cb477421"],(function(s){"use strict";importScripts("fallback-kX-ZQGDTBjqszIThi6V-v.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"8396c8a30b9c878f8fa532c8c37f0f38"},{url:"/_next/static/chunks/13633bf0-916087104b092de6.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/203.215f7ebb412294c3.js",revision:"215f7ebb412294c3"},{url:"/_next/static/chunks/205-781ec2cad0587b16.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/218.c6fb8f9954a6e86c.js",revision:"c6fb8f9954a6e86c"},{url:"/_next/static/chunks/40-f713e22cfb5e0af1.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/4bd1b696-ae6d79a0c570aff2.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/517-5dc866b72ac6c7e4.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/606-373ab61a8a5d0f6b.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/_not-found/page-c42823c9da989d83.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/dashboard/addresses/page-26c573241ffb24a8.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/dashboard/layout-8c2fc9f54b044413.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/dashboard/page-1050fa0a8ce904c4.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/dashboard/routes/page-942d03e75ded888e.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/dashboard/settings/page-d5a08d65dd7b5c2c.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/dashboard/users/page-6537ebba1ede92b8.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/inactive/page-9fff02d213a6126b.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/layout-6932c66c764204f6.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/offline/page-6f505773cc8b3203.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/page-b9b8e45528de1a8f.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/app/signup/page-2125ba291ed9c35d.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/c16f53c3-ff6f83dd0c4b2554.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/framework-5d9faa761b5d9669.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/main-8b6510da4c96789f.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/main-app-2fb7de25065c880c.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/pages/_app-5344d92ca41e26ab.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/pages/_error-d7871a982246cc02.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8c72542459acb60d.js",revision:"kX-ZQGDTBjqszIThi6V-v"},{url:"/_next/static/css/0acef4df005bbe6c.css",revision:"0acef4df005bbe6c"},{url:"/_next/static/css/fe0cf46b04173b3a.css",revision:"fe0cf46b04173b3a"},{url:"/_next/static/kX-ZQGDTBjqszIThi6V-v/_buildManifest.js",revision:"94b18172b9e6d71a90332a14a3db20a5"},{url:"/_next/static/kX-ZQGDTBjqszIThi6V-v/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/icon-192x192.png",revision:"4995529e54dfe6ea24dd002108b720e0"},{url:"/icons/icon-512x512.png",revision:"7459837b4dc760e3f5978b02c0f78764"},{url:"/manifest.json",revision:"245c61375b70aa03b5f46808909e3916"},{url:"/offline",revision:"kX-ZQGDTBjqszIThi6V-v"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:i,state:n})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e},{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET"),s.registerRoute(/^https?.*/,new s.NetworkFirst({cacheName:"offlineCache",plugins:[new s.ExpirationPlugin({maxEntries:200}),{handlerDidError:async({request:s})=>self.fallback(s)}]}),"GET")}));
