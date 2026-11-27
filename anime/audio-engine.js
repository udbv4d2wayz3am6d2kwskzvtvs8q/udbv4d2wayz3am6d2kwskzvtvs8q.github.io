(()=>{const Fe={serial:null,videoEl:null},_e=0,Oe=()=>{},Pe=["lift3.ws","embed.lateremb.ws","embed.liftw.ws"],Ie=["api.lateremb.ws"],ge=["api.lateremb.ws","api.twemd.ws","api.faphz.com","api.embandr.ws","api.niteface.ws"],ye="wss://wsr.getzend.digital/px",We=["https://hye1eaipby4w.interkh.com","https://ghzbfjzbazc.interkh.com","https://x-bc.interkh.com","https://fazhzcezbdi.interkh.com","https://ab.interkh.com"],Ue=new URLSearchParams(location.search),ze=Ue.has("debug"),Te=ne()||pe(),Me=Te&&(!ne()||V());let ie=null;const xe=new Map;function Le(e){try{const n=new URL(String(e||""));return n.protocol==="https:"&&n.hostname.endsWith(".interkh.com")&&n.hostname.length>12}catch{return!1}}function De(e){try{const n=new URL(String(e||""));return n.protocol==="https:"&&Pe.includes(n.hostname)&&/^\/embed\/movie\/\d+$/.test(n.pathname)}catch{return!1}}function je(e){try{const n=new URL(String(e||""));return n.protocol!=="https:"||!Ie.includes(n.hostname)?!1:/^\/info\/\d{1,12}$/.test(n.pathname)?!n.search:n.pathname==="/search"&&[...n.searchParams.keys()].join()==="q"}catch{return!1}}function Ce(e){try{const n=new URL(String(e||""));return n.protocol==="https:"&&ge.includes(n.hostname)&&n.pathname==="/playlist"&&[...n.searchParams.keys()].join()==="id"&&/^\d{1,12}$/.test(n.searchParams.get("id"))}catch{return!1}}function Se(e,n=0,a=Date.now()){const l=new URL(e);if(l.protocol!=="https:"||!l.hostname.endsWith(".interkh.com")||l.searchParams.has("hx")||l.pathname.startsWith("/x-en-x/")||!/\.(?:mpd|m3u8|webm|ts)$/.test(l.pathname))return e;const r=Math.round((a+n)/36e5),y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",d="DlChEXitLONYRkFjAsnBbymWzSHMqKPgQZpvwerofJTVdIuUcxaG",w=btoa(`${r}/${l.pathname}${l.search}`).replace(/[A-Za-z]/g,M=>d[y.indexOf(M)]);return`${l.origin}/x-en-x/${w}`}function ue(e,n){const a=new URL(n);if(!a.pathname.startsWith("/x-en-x/"))return a.href;const l=new URL(e);return l.hostname=a.hostname,l.href}const ve="alphy.liftCdnClock.v1";let q=null;function E(){if(!q)try{q=JSON.parse(localStorage.getItem(ve)||"null")}catch{}const e=Date.now()-Number(q?.at);return e>=0&&e<24*36e5&&Number.isFinite(q?.offsetMs)?q.offsetMs:0}function C(e){return/^wss:\/\/t\d{1,2}\.(?:zcvh\.net|lateremb\.ws)\/v1\/ws$/.test(String(e||""))}function O(e){return{trackers:[...new Set([e?.p2p?.tracker,e?.p2p?.reserve_tracker].filter(C))],domains:[...new Set((e?.video_domains||[]).filter(n=>/^[a-z0-9-]+\.interkh\.com$/.test(n)))].slice(0,3)}}async function F(e,n){const a=new Uint8Array(e),l=a.length,r=Math.ceil((l+9)/64)*64,y=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21],d=new Int32Array(64);for(let _=0;_<64;_+=1)d[_]=Math.floor(Math.abs(Math.sin(_+1))*4294967296);const w=new Int32Array(16);let M,A;const T=()=>A?.();n?.addEventListener("abort",T,{once:!0});const N=typeof MessageChannel=="function"?()=>(M||(M=new MessageChannel,M.port1.onmessage=()=>A?.()),new Promise(_=>{A=_,M.port2.postMessage(0)})):()=>new Promise(_=>setTimeout(_,0));let p=1732584193,f=-271733879,b=-1732584194,x=271733878;try{for(let _=0;_<r;_+=64){if(!(_%65536)){if(n?.aborted)throw new Error("aborted");_&&await N()}for(let j=0;j<16;j+=1){let oe=0;for(let X=0;X<4;X+=1){const ae=_+j*4+X,ke=ae<l?a[ae]:ae===l?128:0;oe|=ke<<X*8}w[j]=oe}_+64===r&&(w[14]=l*8,w[15]=Math.floor(l/536870912));let D=p,B=f,we=b,se=x;for(let j=0;j<64;j+=1){let oe,X;j<16?(oe=B&we|~B&se,X=j):j<32?(oe=se&B|~se&we,X=(5*j+1)%16):j<48?(oe=B^we^se,X=(3*j+5)%16):(oe=we^(B|~se),X=7*j%16);const ae=y[(j>>4)*4+j%4],ke=D+oe+d[j]+w[X]|0;D=se,se=we,we=B,B=B+(ke<<ae|ke>>>32-ae)|0}p=p+D|0,f=f+B|0,b=b+we|0,x=x+se|0}return[p,f,b,x].map(_=>[0,8,16,24].map(D=>(_>>>D&255).toString(16).padStart(2,"0")).join("")).join("")}finally{n?.removeEventListener("abort",T),M?.port1.close(),M?.port2.close()}}function z(e){const n=new Map,a=new Map;function l(r,y){if(!e(r))return Promise.resolve(null);let d=n.get(r);if(d&&d.retryAt>Date.now())return Promise.resolve(null);if(!d||!d.socket){if(n.size>=4&&!n.has(r)){const N=n.keys().next().value;n.get(N).close(),n.delete(N)}d={socket:null,ready:!1,jobs:new Map,retryAt:0,idle:null,connect:null},n.set(r,d);const T=()=>{clearTimeout(d.connect),clearTimeout(d.idle);const N=d.socket;d.socket=null,d.ready=!1,d.retryAt=Date.now()+15e3;for(const p of d.jobs.values())p.finish(null);if(d.jobs.clear(),N){N.onclose=null,N.onerror=null,N.onmessage=null;try{N.close()}catch{}}};d.close=T;try{const N=new WebSocket(r);d.socket=N,d.connect=setTimeout(T,3500),N.onerror=T,N.onclose=T,N.onmessage=p=>{if(!(d.socket!==N||typeof p.data!="string"||p.data.length>8192))try{const f=JSON.parse(p.data);if(f.i&&!d.ready){d.ready=!0,clearTimeout(d.connect);for(const b of d.jobs.keys())N.send(JSON.stringify({action:"hash",path:b}))}else if(f.response==="hash"&&typeof f.path=="string"){const b=Number.isSafeInteger(f.size)&&f.size>0&&f.size<=67108864&&/^[a-f0-9]{32}$/i.test(f.md5||"");d.jobs.get(f.path)?.finish(b?{size:f.size,md5:f.md5.toLowerCase()}:null)}}catch{}}}catch{return T(),Promise.resolve(null)}}if(clearTimeout(d.idle),d.idle=setTimeout(()=>d.close(),6e4),d.jobs.has(y))return d.jobs.get(y).promise;let w;const M=new Promise(T=>{w=T}),A=setTimeout(()=>d.jobs.get(y)?.finish(null),4e3);if(d.jobs.set(y,{promise:M,finish:T=>{clearTimeout(A),d.jobs.delete(y),w(T)}}),d.ready)try{d.socket.send(JSON.stringify({action:"hash",path:y}))}catch{d.close()}return M}return async(r,y,d)=>{const w=new URL(r).pathname.replace(/^\//,"");if(w.length>1024||!/\.(?:webm|ts|m4s|mp4)$/.test(w))return null;const M=[...new Set((y||[]).filter(e))].slice(0,2),A=M.join("|")+":"+w,T=a.get(A);if(T&&Date.now()-T.at<12e4)return T.value;if(!M.length||d?.aborted)return null;const N=await new Promise(p=>{let f=M.length,b=!1;const x=D=>{b||(b=!0,d?.removeEventListener("abort",_),p(D))},_=()=>x(null);d?.addEventListener("abort",_,{once:!0}),M.forEach(D=>l(D,w).then(B=>{f-=1,(B||!f)&&x(B)}))});if(N)for(a.set(A,{at:Date.now(),value:N});a.size>512;)a.delete(a.keys().next().value);return N}}function fe(){if(ie)return ie;const e=document.createElement("iframe");e.sandbox="allow-scripts",e.referrerPolicy="no-referrer",e.setAttribute("aria-hidden","true"),e.style.cssText="position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;border:0;pointer-events:none";const n=new Map;let a=0,l=null,r={},y,d;const w=new Promise((p,f)=>{y=p,d=f}),M=setTimeout(()=>d(new Error("LiftW media sandbox timeout")),8e3);w.catch(()=>{ie?.iframe===e&&(ie=null),clearTimeout(M),window.removeEventListener("message",T),e.remove();for(const p of n.keys())A(p,new Error("LiftW media sandbox unavailable"))});const A=(p,f,b)=>{const x=n.get(p);x&&(n.delete(p),clearTimeout(x.timer),x.trace&&x.trace===I&&x.trace.token===_e&&Oe("media-fetch",{kind:x.kind,requestId:x.requestId,ms:Date.now()-x.startedAt,transport:x.transport||"",...x.transport==="ws"?{host:x.socketHost}:{},headersMs:x.headersAt==null?-1:x.headersAt-x.startedAt,firstByteMs:x.firstByteAt==null?-1:x.firstByteAt-x.startedAt,transferMs:x.headersAt==null?-1:Date.now()-x.headersAt,bytes:b?.data?.byteLength||x.bytesReported,status:x.status||0,message:f?String(f.message):""}),f?x.reject(f):x.resolve(b))},T=p=>{if(p.source!==e.contentWindow||p.origin!=="null")return;const f=p.data||{};if(!f.alphyLiftwMedia)return;if(f.ready){clearTimeout(M),f.requestOrigin!=="null"||f.documentReferrer?d(new Error("LiftW media sandbox privacy check failed")):y();return}const b=n.get(f.id);if(!b)return;if(f.phase==="headers"){b.headersAt=Date.now(),b.transport=f.transport||"",b.headers=f.headers||{},b.status=Number(f.status)||0,b.responseUrl=f.responseUrl||b.url;try{b.headersReceived(b.headers)}catch{}return}if(f.phase==="first-byte"){b.firstByteAt=Date.now();try{b.progressUpdated(Math.max(1,b.firstByteAt-b.startedAt),0,Math.max(0,Number(b.headers["content-length"])||0))}catch{}return}if(f.phase==="progress"){const _=Math.max(0,Number(f.bytes)||0);b.bytesReported+=_;try{b.progressUpdated(Math.max(1,Number(f.elapsedMs)||1),_,Math.max(0,Number(f.remaining)||0))}catch{}return}if(!f.ok){A(f.id,Object.assign(new Error(f.error||`LiftW media fetch ${f.status||"failed"}`),{status:b.status||Number(f.status)||0}));return}const x=f.buffer?.byteLength||0;if(x>b.bytesReported){const _=Number(f.transferMs)||0,D=!b.bytesReported&&_>=20?_:Date.now()-b.startedAt;try{b.progressUpdated(Math.max(1,D),x-b.bytesReported,0)}catch{}}A(f.id,null,{uri:f.responseUrl||b.responseUrl||b.url,originalUri:b.url,data:f.buffer,status:Number(f.status)||b.status||200,headers:f.headers||b.headers||{},timeMs:Date.now()-b.startedAt,fromCache:!1,integrity:f.integrity||"",verifyMs:Number(f.verifyMs)||0})};window.addEventListener("message",T);const N=(p,f={},b=()=>{},x=()=>{})=>{if(!Le(p)&&!De(p)&&!je(p)&&!Ce(p))return{promise:Promise.reject(new Error("LiftW: blocked media URL")),abort:()=>Promise.resolve()};const _=`liftw-${Date.now()}-${a+=1}`;let D=!1,B=()=>{};return{promise:new Promise((se,j)=>{B=j;const oe=Number(f.timeoutMs)||Number(f.retryParameters?.timeout)||6e4,X=setTimeout(()=>{e.contentWindow?.postMessage({alphyLiftwMedia:!0,cancel:!0,id:_},"*"),A(_,new Error(`LiftW media timeout for ${p}`))},oe);l!==_e&&(l=_e,r={});const ae=f.liftwTransport||"http",ke=!Fe.playerReady&&Le(p)&&(r[ae]||0)<8?I:null;ke&&(r[ae]=(r[ae]||0)+1);const $e=new URL(p).pathname;n.set(_,{url:p,trace:ke,requestId:a,kind:/\.(?:mpd|m3u8)$/.test($e)?"manifest":/\/init\./.test($e)?"init":"segment",resolve:Ae=>{D=!0,se(Ae)},reject:Ae=>{D=!0,j(Ae)},timer:X,startedAt:Date.now(),progressUpdated:b,headersReceived:x,headers:{},status:0,responseUrl:p,transport:f.liftwTransport||"http",socketHost:new URL(f.liftwSocketUrl||ye).hostname,bytesReported:0}),w.then(()=>{if(!n.has(_))return;const Ae=Object.entries(f.headers||{}).find(([Be])=>Be.toLowerCase()==="range")?.[1]||"";e.contentWindow?.postMessage({alphyLiftwMedia:!0,id:_,url:p,range:Ae,noStore:!!f.noStore,whole:Te,socketUrl:f.liftwSocketUrl||"",verification:f.liftwIntegrity?f.liftwVerification||{trackers:[]}:null,clockOffsetMs:E(),transport:f.liftwTransport||"http"},"*")}).catch(Ae=>A(_,Ae))}),abort:()=>(D||!n.has(_)||(e.contentWindow?.postMessage({alphyLiftwMedia:!0,cancel:!0,id:_},"*"),A(_,new Error("LiftW media request aborted")),D||B(new Error("LiftW media request aborted"))),Promise.resolve())}};return e.srcdoc=`<!doctype html><meta charset="utf-8"><script>
const liftwTrackerUrl = ${C.toString()};
const liftwMd5 = ${F.toString()};
const createLiftwHashClient = ${z.toString()};
const expectedSegmentHash = createLiftwHashClient(liftwTrackerUrl);
const controllers = new Map();
const warmOrigins = new Set();
const socketTransports = new Map();
function socketTransportFor(endpoint) {
  endpoint = endpoint || ${JSON.stringify(ye)};
  if (!['wss://ws.getzend.digital/px', 'wss://wsr.getzend.digital/px'].includes(endpoint)) throw new Error('Blocked Lift WS endpoint');
  if (socketTransports.has(endpoint)) return socketTransports.get(endpoint);
let cdnSocket = null;
let cdnOpening = null;
let cdnFail = null;
const cdnQueue = new Map();
function openCdnSocket() {
  if (cdnSocket?.readyState === 1) return Promise.resolve(cdnSocket);
  if (cdnOpening) return cdnOpening;
  let resolveOpening, rejectOpening;
  const opening = new Promise((resolve, reject) => { resolveOpening = resolve; rejectOpening = reject; });
  cdnOpening = opening;
  let socket, timer, failed = false;
  const fail = (error) => {
    if (failed) return;
    failed = true;
    clearTimeout(timer);
    if (cdnOpening === opening) cdnOpening = null;
    if (cdnSocket === socket) {
      cdnSocket = null; cdnFail = null;
      for (const queue of cdnQueue.values()) for (const job of queue) { clearTimeout(job.responseTimer); job.reject(error); }
      cdnQueue.clear();
    }
    rejectOpening(error);
    try { socket?.close(); } catch {}
  };
  try {
    socket = new WebSocket(endpoint);
    cdnSocket = socket; cdnFail = fail;
    socket.binaryType = 'arraybuffer';
    timer = setTimeout(() => fail(new Error('Lift CDN WS connect timeout')), 8000);
    socket.onopen = () => {
      if (failed || cdnSocket !== socket) return;
      clearTimeout(timer); cdnOpening = null; resolveOpening(socket);
    };
    socket.onmessage = async (event) => {
      if (failed || cdnSocket !== socket || typeof event.data === 'string') return;
      const buffer = event.data instanceof ArrayBuffer ? event.data : await event.data.arrayBuffer();
      if (failed || cdnSocket !== socket) return;
      const bytes = new Uint8Array(buffer);
      if (bytes[0] && (bytes.length < 2 || !bytes[1])) {
        fail(new Error('Lift CDN WS response ' + bytes[0])); return;
      }
      if (bytes.length < 2 || bytes.length < 2 + bytes[1]) return;
      let nameBytes = bytes[1];
      let url = new TextDecoder().decode(bytes.subarray(2, 2 + nameBytes));
      let queue = cdnQueue.get(url);
      if (!queue && endpoint === 'wss://wsr.getzend.digital/px') {
        for (const candidate of cdnQueue.keys()) {
          const length = new TextEncoder().encode(candidate).length;
          if (length > 255 && length % 256 === bytes[1] && bytes.length >= 2 + length
            && new TextDecoder().decode(bytes.subarray(2, 2 + length)) === candidate) {
            url = candidate; nameBytes = length; queue = cdnQueue.get(url); break;
          }
        }
      }
      if (!queue?.length) return;
      const job = queue.shift();
      clearTimeout(job.responseTimer);
      if (!job.aborted) {
        if (bytes[0]) job.reject(new Error('Lift CDN WS response ' + bytes[0]));
        else job.resolve({ ok: true, status: job.range ? 206 : 200, url,
          headers: new Headers(), arrayBuffer: async () => buffer.slice(2 + nameBytes) });
      }
      if (!queue.length) cdnQueue.delete(url);
      else sendCdnJob(url);
    };
    socket.onerror = () => fail(new Error('Lift CDN WS connection error'));
    socket.onclose = () => fail(new Error('Lift CDN WS connection closed'));
  } catch (error) { fail(error); }
  return opening;
}
function sendCdnJob(url) {
  const job = cdnQueue.get(url)?.[0];
  if (!job || job.sent) return;
  job.sent = true;
  const fail = cdnFail;
  job.responseTimer = setTimeout(() => fail?.(new Error('Lift CDN WS response timeout')), 30000);
  try { cdnSocket.send(JSON.stringify({ req: 'f', url, range: job.range || undefined })); }
  catch (error) { fail?.(error); }
}
async function fetchCdnSocket(url, range, signal) {
  if (new TextEncoder().encode(url).length > (endpoint === 'wss://wsr.getzend.digital/px' ? 4096 : 255)) throw new Error('Lift CDN WS URL too long');
  const socket = await openCdnSocket();
  if (socket !== cdnSocket || socket.readyState !== 1) throw new Error('Lift CDN WS connection closed');
  if (signal.aborted) throw new Error('aborted');
  return new Promise((resolve, reject) => {
    const job = { range, sent: false, aborted: false,
      resolve: (value) => { signal.removeEventListener('abort', abort); resolve(value); },
      reject: (error) => { signal.removeEventListener('abort', abort); reject(error); } };
    const abort = () => {
      job.aborted = true;
      if (!job.sent) {
        const queue = cdnQueue.get(url);
        if (queue) queue.splice(queue.indexOf(job), 1);
      }
      job.reject(new Error('aborted'));
    };
    signal.addEventListener('abort', abort, { once: true });
    const queue = cdnQueue.get(url) || [];
    queue.push(job); cdnQueue.set(url, queue);
    sendCdnJob(url);
  });
}
  fetchCdnSocket.open = openCdnSocket;
  socketTransports.set(endpoint, fetchCdnSocket);
  return fetchCdnSocket;
}

const liftwCdnTransportUrl = ${Se.toString()};
const liftwCdnResponseUrl = ${ue.toString()};
const allowed = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return false;
    if (url.hostname.endsWith('.interkh.com') && url.hostname.length > 12) return true;
    if (${JSON.stringify([])}.some((suffix) => url.hostname.endsWith(suffix))) return true;
    if (${JSON.stringify(ge)}.includes(url.hostname) && url.pathname === '/playlist') {
      return [...url.searchParams.keys()].join() === 'id' && /^\\d{1,12}$/.test(url.searchParams.get('id'));
    }
    if (${JSON.stringify(Ie)}.includes(url.hostname)) {
      return (/^\\/info\\/\\d{1,12}$/.test(url.pathname) && !url.search) ||
        (url.pathname === '/search' && [...url.searchParams.keys()].join() === 'q');
    }
    return ${JSON.stringify(Pe)}.includes(url.hostname) && /^\\/embed\\/movie\\/\\d+$/.test(url.pathname);
  } catch { return false; }
};
const warmOrigin = (value) => {
  if (!allowed(value) && !${JSON.stringify(Pe.map(p=>`https://${p}`))}.includes(value)) return;
  const origin = new URL(value).origin;
  if (warmOrigins.has(origin) || warmOrigins.size >= 12) return;
  warmOrigins.add(origin);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  fetch(origin + '/', {
    method: 'HEAD', mode: 'cors', credentials: 'omit', cache: 'no-store',
    referrerPolicy: 'no-referrer', redirect: 'error', signal: controller.signal,
  }).catch(() => {}).finally(() => clearTimeout(timer));
};
${JSON.stringify([...We,`https://${Ee()[0]}`])}.forEach(warmOrigin);
addEventListener('message', async (event) => {
  const data = event.data || {};
  if (event.source !== parent || !data.alphyLiftwMedia) return;
  if (data.warm) {
    for (const origin of (Array.isArray(data.origins) ? data.origins : []).slice(0, 3)) {
      warmOrigin(origin);
    }
    return;
  }
  if (data.warmSocket) { try { socketTransportFor(data.warmSocket).open().catch(() => {}); } catch {} return; }
  if (data.cancel) { controllers.get(data.id)?.abort(); return; }
  if (!allowed(data.url)) return;
  const controller = new AbortController();
  controllers.set(data.id, controller);
  try {
    const socketTransport = data.transport === 'ws' && new URL(data.url).hostname.endsWith('.interkh.com');
    const verification = socketTransport ? null : data.verification;
    const range = verification ? '' : data.range;
    const reference = verification ? expectedSegmentHash(data.url, verification.trackers, controller.signal) : null;
    const headers = range ? { Range: range } : {};
    const wireUrl = liftwCdnTransportUrl(data.url, Number(data.clockOffsetMs) || 0);
    const response = socketTransport ? await socketTransportFor(data.socketUrl)(data.url, range, controller.signal) : await fetch(wireUrl, {
      cache: data.noStore ? 'no-store' : 'default', credentials: 'omit', mode: 'cors', referrerPolicy: 'no-referrer',
      headers, signal: controller.signal,
    });
    if (!allowed(response.url)) throw new Error('Blocked media redirect');
    const responseUrl = liftwCdnResponseUrl(data.url, response.url);
    const responseHeaders = {};
    response.headers.forEach((value, name) => { responseHeaders[name.toLowerCase()] = value; });
    parent.postMessage({
      alphyLiftwMedia: true, id: data.id, phase: 'headers', status: response.status,
      transport: socketTransport ? 'ws' : wireUrl === data.url ? 'direct' : 'cdn.js',
      responseUrl, headers: responseHeaders,
    }, '*');
    if (!response.ok) throw new Error('Fetch ' + response.status);
    const headersAt = performance.now();
    const declaredSize = Number(response.headers.get('content-length')) || 0;
    let buffer;
    if (!data.whole && response.body && typeof response.body.getReader === 'function') {
      const reader = response.body.getReader();
      const chunks = [];
      let received = 0;
      let reported = 0;
      let reportedAt = performance.now();
      while (true) {
        const part = await reader.read();
        if (part.done) break;
        if (!received && part.value.byteLength) {
          parent.postMessage({ alphyLiftwMedia: true, id: data.id, phase: 'first-byte' }, '*');
        }
        chunks.push(part.value);
        received += part.value.byteLength;
        const now = performance.now();
        if (now - reportedAt >= 250) {
          parent.postMessage({
            alphyLiftwMedia: true, id: data.id, phase: 'progress',
            elapsedMs: now - reportedAt, bytes: received - reported,
            remaining: Math.max(0, declaredSize - received),
          }, '*');
          reported = received;
          reportedAt = now;
        }
      }
      if (received > reported) {
        parent.postMessage({
          alphyLiftwMedia: true, id: data.id, phase: 'progress',
          elapsedMs: performance.now() - reportedAt, bytes: received - reported,
          remaining: 0,
        }, '*');
      }
      const joined = new Uint8Array(received);
      let offset = 0;
      for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.byteLength; }
      buffer = joined.buffer;
    } else {
      buffer = await response.arrayBuffer();
    }
    let integrity = '', verifyMs = 0;
    if (verification) {
      const expected = await new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), 500);
        reference.then((value) => { clearTimeout(timer); resolve(value); }, () => { clearTimeout(timer); resolve(null); });
      });
      const verifyAt = performance.now();
      let actual = null;
      if (expected && buffer.byteLength === expected.size) {
        const hashing = new AbortController();
        const cancel = () => hashing.abort();
        controller.signal.addEventListener('abort', cancel, { once: true });
        actual = await new Promise((resolve) => {
          const finish = (value) => { clearTimeout(timer); resolve(value); };
          const timer = setTimeout(() => { hashing.abort(); finish(null); }, 1200);
          liftwMd5(buffer, hashing.signal).then(finish, () => finish(null));
        });
        controller.signal.removeEventListener('abort', cancel);
      }
      integrity = !expected ? 'unavailable' : buffer.byteLength !== expected.size ? 'mismatch'
        : !actual ? 'unavailable' : actual === expected.md5 ? 'verified' : 'mismatch';
      verifyMs = Math.round(performance.now() - verifyAt);
      if (integrity === 'mismatch') buffer = new ArrayBuffer(0);
      else if (data.range) {
        const match = /^bytes=(\\d+)-(\\d*)$/.exec(data.range);
        if (!match) throw new Error('Unsupported verified media range');
        buffer = buffer.slice(Number(match[1]), match[2] ? Number(match[2]) + 1 : undefined);
      }
    }
    parent.postMessage({
      alphyLiftwMedia: true, id: data.id, ok: true, status: data.range && verification ? 206 : response.status,
      integrity, verifyMs,
      responseUrl, headers: responseHeaders, buffer,
      transferMs: performance.now() - headersAt,
    }, '*', [buffer]);
  } catch (error) {
    parent.postMessage({
      alphyLiftwMedia: true, id: data.id, ok: false,
      error: String(error && error.message || error),
    }, '*');
  } finally { controllers.delete(data.id); }
});
parent.postMessage({
  alphyLiftwMedia: true, ready: true,
  requestOrigin: globalThis.origin ?? location.origin, documentReferrer: document.referrer,
}, '*');
<\/script>`,document.body.appendChild(e),ie={ready:w,request:N,iframe:e,warm:p=>{w.then(()=>e.contentWindow?.postMessage({alphyLiftwMedia:!0,warm:!0,origins:p},"*")).catch(()=>{})},warmSocket:p=>{w.then(()=>e.contentWindow?.postMessage({alphyLiftwMedia:!0,warmSocket:p},"*")).catch(()=>{})}},ie}function W(e={}){if(["ws","http"].includes(e.cdnTransport))return e.cdnTransport;const n=ze&&Ue.get("liftTransport");if(!n&&e.cdnSocketUrl===!1)return"http";const a=xe.get(e.cdnSocketUrl||ye)||0;return["ws","http"].includes(n)?n:Date.now()<a?"http":"ws"}async function ce(e,{timeoutMs:n,noStore:a=!1,signal:l=null,cdnSocketUrl:r}){const y=Le(e)?W({cdnSocketUrl:r}):"http",d=async w=>{const M=fe().request(e,{noStore:a,timeoutMs:n,liftwSocketUrl:r,liftwTransport:w}),A=()=>M.abort();l?.addEventListener("abort",A,{once:!0});try{const T=await M.promise;return new TextDecoder().decode(T.data)}finally{l?.removeEventListener("abort",A)}};try{return await d(y)}catch(w){if(y!=="ws"||l?.aborted)throw w;return xe.set(r||ye,Date.now()+6e5),Oe("liftw-gateway-warn",w.message),d("http")}}const de=900,U=9e3,J="alphy.liftPlaylist.v1";function K(){let e="";try{e=localStorage.getItem(J)||""}catch{}return ge.includes(e)?[e,...ge.filter(n=>n!==e)]:ge}async function Re(e,n){const a=c(e);if(!a)throw new Error("LiftW: \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 id");const l=K().map(r=>async y=>{const d=await ce(`https://${r}/playlist?id=${a}`,{timeoutMs:U,noStore:!0,signal:n?Q(n,y):y}),w=JSON.parse(d);if(!w||typeof w!="object"||w.error)throw new Error("LiftW /playlist: no usable answer");try{localStorage.setItem(J,r)}catch{}return{data:w,host:r}});return te(l,de)}function H(e){return o({dash:e?.dash_vp9,dasha:e?.dash_av1,hls:e?.hls})}function G(e){const n=Array.isArray(e?.names)?e.names:[];return h(n).filter((l,r)=>e?.visible?.[r]===!1).filter(Boolean)}function ee(e,n){const a=me((Array.isArray(e?.seasons)?e.seasons:[]).map(d=>({season:d?.season,episodes:(Array.isArray(d?.episodes)?d.episodes:[]).map(w=>({episode:w?.episode,title:w?.title||w?.name||"",id:w?.id,videoKey:w?.video_key,duration:w?.duration,sections:(Array.isArray(w?.sections)?w.sections:[]).map(M=>({type:M?.type,start:Number(M?.start||0)/1e3,end:Number(M?.end)/1e3})),audio:w?.audio,cc:w?.cc,sources:H(w?.streams)}))}))),l=a[0]?.episodes?.[0]||null,r=l?l.sources:H(e?.streams);if(!a.length&&!be(r))throw new Error("LiftW \u043D\u0435 \u043E\u0442\u0434\u0430\u043B \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0442\u0430\u0439\u0442\u043B\u0430");const y=e?.seasons?.find?.(d=>Number(d?.season)===a[0]?.season)?.episodes?.find?.(d=>Number(d?.episode)===l?.episode);return{id:String(n),sourcePath:"playlist",cdnSocketUrl:ye,verification:O(e),sources:r,audioNames:l?l.audioNames:i(e),blockedAudioNames:G(l?y?.audio:e?.audio),textTracks:l?l.textTracks:k(e),meta:e?.title?{title:R(e.title).slice(0,180)}:{},playlist:{current:null,seasons:a}}}const Z=["embed.lateremb.ws","lift3.ws"],$="alphy.liftEntrance.v2";function Y(){try{const e=JSON.parse(localStorage.getItem($)||"{}");return e&&typeof e=="object"?e:{}}catch{return{}}}function Ee(){const e=Y().host;return Z.includes(e)?[e,...Z.filter(n=>n!==e)]:[...Z]}function te(e,n){return new Promise((a,l)=>{const r=[];let y=0,d=0,w=!1,M=null,A=null;const T=()=>{if(clearTimeout(M),w)return;if(y>=e.length){d||(w=!0,l(A||new Error("LiftW: \u043D\u0435\u0442 \u0432\u0445\u043E\u0434\u0430")));return}const N=new AbortController;r.push(N);const p=e[y++];d+=1,Promise.resolve().then(()=>p(N.signal)).then(f=>{w||(w=!0,clearTimeout(M),r.forEach(b=>{b!==N&&b.abort()}),a(f))},f=>{d-=1,!w&&(A=f,T())}),y<e.length&&(M=setTimeout(T,n))};T()})}function Q(...e){const n=new AbortController;for(const a of e){if(a.aborted){n.abort();break}a.addEventListener("abort",()=>n.abort(),{once:!0})}return n.signal}function le(e){const n=String(e||"").toLowerCase();return/укр|ukr/.test(n)?"uk":/рус|rus/.test(n)?"ru":/eng|англ/.test(n)?"en":"und"}function be(e){return Te?Me&&e?.hls?{url:e.hls,kind:"hls"}:e?.dash&&he('video/webm; codecs="vp09.00.40.08"')?{url:e.dash,kind:"dash"}:e?.hls?{url:e.hls,kind:"hls"}:e?.dash?{url:e.dash,kind:"dash"}:e?.dasha?{url:e.dasha,kind:"dasha"}:null:e?.dasha&&he('video/webm; codecs="av01.0.08M.08"')?{url:e.dasha,kind:"dasha"}:e?.dash&&he('video/webm; codecs="vp09.00.40.08"')?{url:e.dash,kind:"dash"}:e?.hls?{url:e.hls,kind:"hls"}:e?.dash?{url:e.dash,kind:"dash"}:e?.dasha?{url:e.dasha,kind:"dasha"}:null}function he(e){const n=typeof window<"u"?window.ManagedMediaSource||window.MediaSource:null;if(!n?.isTypeSupported)return!1;try{return n.isTypeSupported(e)&&n.isTypeSupported('audio/webm; codecs="opus"')}catch{return!1}}function pe(){try{return localStorage.getItem("alphy.tvPointer")==="remote"}catch{return!1}}function V(){try{return localStorage.getItem("alphy.videoLight.v2")==="1"}catch{return!1}}function ne(){const e=typeof navigator<"u"&&navigator.userAgent||"";return/\bTizen\b/i.test(e)&&/SMART-?TV|SamsungBrowser[^\n]*\bTV\b/i.test(e)}function me(e){return(Array.isArray(e)?e:[]).map(n=>({season:c(n?.season??n?.number),episodes:(Array.isArray(n?.episodes)?n.episodes:[]).map(a=>({episode:c(a?.episode??a?.number??a?.episodeNumber),title:R(a?.title||a?.name||a?.nameRu||a?.nameEn||""),id:c(a?.id),videoKey:c(a?.videoKey),sources:o(a?.sources||a),audioNames:i(a),textTracks:k(a),credits:Ne(a),skips:s(a)})).filter(a=>a.episode&&Object.keys(a.sources).length).sort((a,l)=>a.episode-l.episode)})).filter(n=>n.season&&n.episodes.length).sort((n,a)=>n.season-a.season)}function Ne(e){if(e?.credits)return e.credits;const n=Number(e?.duration),a=(Array.isArray(e?.sections)?e.sections:[]).filter(r=>r?.type==="titer"&&Number(r.start)>0),l=Number(a[a.length-1]?.start);return!(n>0)||!(l>0)||l>=n||n-l>600?null:{start:l,length:n}}const re=["screen","repeat","ads"],t=8;function s(e){return Array.isArray(e?.skips)?e.skips:(Array.isArray(e?.sections)?e.sections:[]).map(n=>({type:n?.type,start:Number(n?.start),end:Number(n?.end)})).filter(n=>re.includes(n.type)&&n.start>=0&&n.end-n.start>=t).sort((n,a)=>n.start-a.start)}function c(e){const n=Number.parseInt(String(e??""),10);return Number.isFinite(n)&&n>0?n:null}function o(e){const n={};for(const a of["dash","dasha","hls"]){const l=String(e?.[a]||"").replace(/&amp;/g,"&");/^https:\/\//i.test(l)&&(n[a]=l)}return n}function i(e){const n=Array.isArray(e?.audioNames)?e.audioNames:e?.audio?.names;return h(n)}function h(e){const n=(Array.isArray(e)?e:[]).slice(0,24).map(l=>R(l).slice(0,60)),a=g(n);return n.map((l,r)=>a[r]||l)}const m=/^([a-z]{3})\d+$/i,u={rus:"\u0420\u0443\u0441.",ukr:"\u0423\u043A\u0440.",eng:"English",kaz:"\u041A\u0430\u0437.",ger:"Deu.",deu:"Deu.",fre:"Fra.",fra:"Fra."};function g(e){const n=e.map(l=>m.exec(l)?.[1].toLowerCase()||""),a={};return n.map(l=>{if(!l)return"";const r=u[l]||l.toUpperCase(),y=n.filter(d=>d===l).length;return a[l]=(a[l]||0)+1,y>1?`${r} ${a[l]}`:r})}function k(e){const n=Array.isArray(e?.textTracks)?e.textTracks:e?.cc;return(Array.isArray(n)?n:[]).map(a=>{const l=String(a?.url||"").replace(/&amp;/g,"&"),r=R(a?.label||a?.name).slice(0,60);return{url:l,label:r,language:a?.language||le(r)}}).filter(a=>/^https:\/\/[a-z0-9-]+\.interkh\.com\//i.test(a.url)).slice(0,12)}function R(e){return String(e||"").replace(/\s+/g," ").trim()}let I=null;const P=/^([a-z]{3})\d+$/i,S={rus:"\u0420\u0443\u0441.",ukr:"\u0423\u043A\u0440.",eng:"English",kaz:"\u041A\u0430\u0437."};function L(e,n){const a=S[e]||e.toUpperCase(),l=n.filter(r=>r.name===a||r.name.startsWith(a+" ")).length;return l?`${a} ${l+1}`:a}function v(e,n,a=[]){const l=[];for(const r of String(e).split(`
`)){if(!r.startsWith("#EXT-X-MEDIA:TYPE=AUDIO"))continue;const y=/URI="([^"]+)"/.exec(r)?.[1];if(!y)continue;const d=/NAME="([^"]+)"/.exec(r)?.[1]||"",w=Number(/(\d+)$/.exec(d)?.[1]??l.length),M=!a[w]&&P.exec(d),A=M?L(M[1].toLowerCase(),l):a[w]||d,T=A&&A!=="default"?A:`\u0414\u043E\u0440\u043E\u0436\u043A\u0430 ${l.length+1}`;l.some(N=>N.name===T)||l.push({name:T,url:new URL(y,n).href.replace(/^http:/,"https:")})}return l}window.AnimeAudio={async open(e,n,a,l){const{data:r}=await Re(e,l),y=ee(r,e),d=n?y.playlist.seasons.find(p=>p.season===n)?.episodes.find(p=>p.episode===a):y.playlist.seasons.length?null:y;if(!d?.sources?.hls)throw Error("Lift: \u0443 \u044D\u0442\u043E\u0439 \u0441\u0435\u0440\u0438\u0438 \u043D\u0435\u0442 HLS");const w={timeoutMs:8500,cdnSocketUrl:y.cdnSocketUrl},M=p=>ce(p,w),A=await ce(d.sources.hls,{...w,signal:l}),T=new Set([...y.blockedAudioNames,...G(r.seasons?.find(p=>+p.season===n)?.episodes?.find(p=>+p.episode===a)?.audio),"visible","delete"].map(p=>p.toLowerCase())),N=v(A,d.sources.hls,d.audioNames||y.audioNames).filter(p=>!T.has(p.name.toLowerCase()));if(!N.length)throw Error("Lift: \u043D\u0435\u0442 \u0440\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0434\u043E\u0440\u043E\u0436\u0435\u043A \u044D\u0442\u043E\u0439 \u0441\u0435\u0440\u0438\u0438");return{tracks:N,text:M,bytes:async p=>{const f=W(w),b=async x=>(await fe().request(p,{timeoutMs:8500,noStore:!1,liftwSocketUrl:w.cdnSocketUrl,liftwTransport:x}).promise).data;try{return await b(f)}catch(x){if(f!=="ws")throw x;return b("http")}}}}}})(),(()=>{"use strict";function Se(t,s){const c=Math.max(1,Math.round(s/100)),o=Math.floor(t.length/c),i=new Float32Array(o);let h=0;for(let m=0;m<o;m+=1){let u=0;for(let k=0;k<c;k+=1){const R=t[m*c+k];u+=R*R}const g=Math.log(1e-7+u/c);i[m]=Math.max(0,g-h),h=g}return i}function ue(t,s,c){const o=t.length;for(let i=1,h=0;i<o;i+=1){let m=o>>1;for(;h&m;m>>=1)h^=m;h^=m,i<h&&([t[i],t[h]]=[t[h],t[i]],[s[i],s[h]]=[s[h],s[i]])}for(let i=2;i<=o;i<<=1){const h=2*Math.PI/i*(c?-1:1),m=Math.cos(h),u=Math.sin(h);for(let g=0;g<o;g+=i){let k=1,R=0;for(let I=0;I<i/2;I+=1){const P=g+I,S=P+i/2,L=t[S]*k-s[S]*R,v=t[S]*R+s[S]*k;t[S]=t[P]-L,s[S]=s[P]-v,t[P]+=L,s[P]+=v;const e=k*m-R*u;R=k*u+R*m,k=e}}}if(c)for(let i=0;i<o;i+=1)t[i]/=o,s[i]/=o}function ve(t,s){const c=t.length,o=s.length;if(!c||o<c)return null;let i=1;for(;i<c+o;)i<<=1;const h=t.reduce((r,y)=>r+y,0)/c,m=new Float64Array(i),u=new Float64Array(i),g=new Float64Array(i),k=new Float64Array(i);let R=0;for(let r=0;r<c;r+=1){const y=t[r]-h;m[c-1-r]=y,R+=y*y}for(let r=0;r<o;r+=1)g[r]=s[r];ue(m,u,!1),ue(g,k,!1);for(let r=0;r<i;r+=1){const y=m[r]*g[r]-u[r]*k[r];u[r]=m[r]*k[r]+u[r]*g[r],m[r]=y}ue(m,u,!0);const I=new Float64Array(o+1),P=new Float64Array(o+1);for(let r=0;r<o;r+=1)I[r+1]=I[r]+s[r],P[r+1]=P[r]+s[r]*s[r];const S=o-c+1,L=new Float64Array(S);for(let r=0;r<S;r+=1){const y=I[r+c]-I[r],d=P[r+c]-P[r]-y*y/c;L[r]=d>1e-9?m[r+c-1]/Math.sqrt(R*d):0}let v=0;for(let r=1;r<S;r+=1)L[r]>L[v]&&(v=r);let e=-1;for(let r=0;r<S;r+=1)Math.abs(r-v)>30&&L[r]>e&&(e=L[r]);const n=Array.from(L).sort((r,y)=>r-y),a=n[S>>1],l=n[Math.floor(S*.84)]-a||1e-6;return{seconds:v/100,score:L[v],margin:L[v]-e,z:(L[v]-a)/l}}const q=t=>{const s=new Uint8Array(t.reduce((o,i)=>o+i.length,0));let c=0;for(const o of t)s.set(o,c),c+=o.length;return s},E=(t,s)=>(t[s]&14)*2**29+t[s+1]*2**22+(t[s+2]&254)*2**14+t[s+3]*2**7+(t[s+4]>>1);function C(t,s,c){t[s]=t[s]&241|Math.floor(c/2**29)&14,t[s+1]=Math.floor(c/2**22)&255,t[s+2]=Math.floor(c/2**14)&254|1,t[s+3]=Math.floor(c/2**7)&255,t[s+4]=c%128<<1|1}function O(t,s){let c=-1;for(let o=0;o+188<=t.length&&t[o]===71;o+=188){const i=(t[o+1]&31)<<8|t[o+2],h=!!(t[o+1]&64),m=t[o+3]>>4&3;if(!(m&1))continue;const u=o+4+(m&2?1+t[o+4]:0);if(u>=o+188)continue;let g=-1;if(h&&t[u]===0&&t[u+1]===0&&t[u+2]===1){const k=t[u+3];k>=192&&k<=223&&(c<0&&(c=i),g=u)}i===c&&s(g,u,o+188)}}function F(t){const s=[];let c=null;return O(t,(o,i,h)=>{if(o<0){s.push(t.subarray(i,h));return}c===null&&t[o+7]&128&&(c=E(t,o+9)/9e4),s.push(t.subarray(o+9+t[o+8],h))}),{adts:q(s),seconds:c}}function z(t,s){const c=o=>((o+s)%8589934592+8589934592)%8589934592;return O(t,o=>{if(o<0)return;const i=t[o+7];i&128&&C(t,o+9,c(E(t,o+9))),(i&192)===192&&C(t,o+14,c(E(t,o+14)))}),t}function fe(t){let s=0,c=null;for(;t[s]===73&&t[s+1]===68&&t[s+2]===51;){const o=t[s+6]<<21|t[s+7]<<14|t[s+8]<<7|t[s+9],h=new TextDecoder("latin1").decode(t.subarray(s,s+10+o)).indexOf("com.apple.streaming.transportStreamTimestamp");if(h>=0){const m=h+45;let u=0;for(let g=3;g<8;g+=1)u=u*256+t[s+m+g];c=(u+(t[s+m+2]&1)*2**32)/9e4}s+=10+o}return{adts:t.subarray(s),seconds:c}}const W=(t,s)=>t[s]*2**24+(t[s+1]<<16)+(t[s+2]<<8)+t[s+3],ce=(t,s,c,o)=>{for(let i=s;i+8<=c;){const h=W(t,i)||c-i;if(h<8)return;o(String.fromCharCode(t[i+4],t[i+5],t[i+6],t[i+7]),i,Math.min(i+h,c)),i+=h}},de=(t,s)=>{e:for(let c=0;c+s.length<=t.length;c+=1){for(let o=0;o<s.length;o+=1)if(t[c+o]!==s.charCodeAt(o))continue e;return c}return-1};function U(t){const s=de(t,"esds"),c=de(t,"mdhd");if(s<0||c<0)return null;const o=W(t,c+4+(t[c+4]===1?20:12)),i=P=>{let S=P+1;for(;t[S]&128;)S+=1;return S+1},h=i(s+8),m=t[h+2];let u=h+3;m&128&&(u+=2),m&64&&(u+=1+t[u]),m&32&&(u+=2);const g=i(u)+13;if(t[g]!==5)return null;const k=i(g),R=t[k],I=t[k+1];return{timescale:o,profile:R>>3,rate:(R&7)<<1|I>>7,channels:I>>3&15}}function J(t,s){const c=[];let o=null;return ce(t,0,t.length,(i,h,m)=>{i==="moof"&&ce(t,h+8,m,(u,g,k)=>{if(u!=="traf")return;let R=0;ce(t,g+8,k,(I,P)=>{if(I==="tfhd"){const S=W(t,P+8)&16777215;let L=P+16;S&1&&(L+=8),S&2&&(L+=4),S&8&&(L+=4),S&16&&(R=W(t,L))}else if(I==="tfdt"){const S=t[P+8]===1?W(t,P+12)*4294967296+W(t,P+16):W(t,P+12);o===null&&(o=S/s.timescale)}else if(I==="trun"){const S=W(t,P+8)&16777215,L=W(t,P+12);let v=P+16,e=h;S&1&&(e=h+(W(t,v)|0),v+=4),S&4&&(v+=4);for(let n=0;n<L;n+=1){S&256&&(v+=4);const a=S&512?W(t,v):R;S&512&&(v+=4),S&1024&&(v+=4),S&2048&&(v+=4);const l=a+7;c.push(Uint8Array.of(255,241,s.profile-1<<6|s.rate<<2|s.channels>>2,(s.channels&3)<<6|l>>11,l>>3&255,(l&7)<<5|31,252)),c.push(t.subarray(e,e+a)),e+=a}}})})}),{adts:q(c),seconds:o}}function K(t,s){return t[0]===71?F(t):s?J(t,s):fe(t)}async function Re(t){const c=await new OfflineAudioContext(1,1,8e3).decodeAudioData(t.slice().buffer),o=new Float32Array(c.length);for(let i=0;i<c.numberOfChannels;i+=1){const h=c.getChannelData(i);for(let m=0;m<o.length;m+=1)o[m]+=h[m]}return{pcm:o,rate:c.sampleRate}}function H(t,s){const c=[];let o=0,i=0;for(const m of String(t).split(`
`)){const u=m.trim();u.startsWith("#EXTINF:")?o=parseFloat(u.slice(8)):u&&!u.startsWith("#")&&(c.push({url:new URL(u,s).href.replace(/^http:/,"https:"),duration:o,start:i}),i+=o)}const h=/#EXT-X-MAP:URI="([^"]+)"/.exec(t)?.[1];return{segments:c,duration:i,init:h?new URL(h,s).href:""}}const G=(t,s,c)=>t.filter(o=>o.start+o.duration>s&&o.start<c);function ee(t,{durationGap:s=0,duration:c=0}={}){const o=t.filter(u=>u&&u.z>=5);let i=null;for(let u=0;u<o.length;u+=1)for(let g=u+1;g<o.length;g+=1){const k=o[g].at-o[u].at,R=Math.abs(k)>1?(o[g].offset-o[u].offset)/k:0;if(Math.abs(R)>.0015)continue;const I=o.filter(S=>Math.abs(o[u].offset+R*(S.at-o[u].at)-S.offset)<=.15),P=I.reduce((S,L)=>S+L.z,0);I.length>=2&&(!i||P>i.strength)&&(i={strength:P,slope:R,intercept:o[u].offset-R*o[u].at,members:I.length})}if(i){const u={slope:i.slope,intercept:i.intercept,anchors:i.members};return o.some(k=>k.z>=12&&Math.abs(u.intercept+u.slope*k.at-k.offset)>.15)?null:u}const h=o.filter(u=>u.z>=25&&u.margin>=.3).sort((u,g)=>g.z-u.z)[0];if(!h||o.some(u=>u.z>=12&&Math.abs(u.offset-h.offset)>.15))return null;const m=c&&Math.abs(s)<1?s/c:0;return{slope:m,intercept:h.offset-m*h.at,anchors:1}}const Z=(t,s)=>{const c=t.pieces;if(!c)return t;let o=c[0];for(const i of c)s>=i.from&&(o=i);return o},$=(t,s)=>{const c=Z(t,s);return c.intercept+c.slope*s},Y=(t,s)=>{let c=t;for(const i of t.pieces||[])s>=i.clockFrom&&(c=i);const o=c.clock||c;return o.intercept+o.slope*s};function Ee(t,s){const c=o=>({...o,intercept:o.intercept+s,...o.clock?{clock:{...o.clock,intercept:o.clock.intercept+s}}:{}});return{...c(t),...t.pieces?{pieces:t.pieces.map(c)}:{},shifted:+(Number(t.shifted||0)+s).toFixed(3)}}function te(t,s,c){const o=t.pieces||[{...t,from:0,clockFrom:0}];for(let i=0;i<o.length;i+=1){const{clock:h}=o[i],m=R=>R*(1+h.slope)+h.intercept,u=i?m(o[i].clockFrom):-1/0,g=i<o.length-1?m(o[i+1].clockFrom):1/0;if(g<=s)continue;const k=Math.max(0,u-s);return s+k>=c?null:{at:(s+k-h.intercept)/(1+h.slope),skip:k,length:g-s-k,slope:h.slope}}return null}function Q(t,s,{clock:c=!1,clamp:o=!1}={}){const i=t.pieces||[{...t,from:0,clockFrom:-1/0}],h=u=>c?(s-u.clock.intercept)/(1+u.clock.slope):(s-u.intercept)/(1+u.slope),m=u=>c?u.clockFrom:u.from;for(let u=i.length-1;u>=0;u-=1){const g=h(i[u]);if(!(u>0&&g<m(i[u])))return u<i.length-1&&g>=m(i[u+1])?o?m(i[u+1]):null:g}return null}function le(t){const s=t.length,c=t.reduce((m,u)=>m+u.stream,0)/s,o=t.reduce((m,u)=>m+u.clock,0)/s,i=t.reduce((m,u)=>m+(u.stream-c)**2,0),h=i>1?t.reduce((m,u)=>m+(u.stream-c)*(u.clock-o),0)/i:0;return{slope:h,intercept:o-h*c}}function be(t,s){const c=Math.max(...(s.pieces||[s]).map(m=>Math.abs(m.intercept))),i=["#EXTM3U","#EXT-X-VERSION:3",`#EXT-X-TARGETDURATION:${Math.ceil(Math.max(...t.map(m=>m.duration))+c)}`,"#EXT-X-PLAYLIST-TYPE:VOD"];let h=0;for(const m of t){const u=Q(s,m.start+m.duration,{clamp:!0});u<=h||(i.push(`#EXTINF:${(u-h).toFixed(3)},`,m.url),h=u)}return i.push("#EXT-X-ENDLIST"),`${i.join(`
`)}
`}function he(t,s){const c=o=>{const i=Math.max(0,Math.round(o*1e3)),h=(m,u)=>String(m).padStart(u,"0");return`${h(Math.floor(i/36e5),2)}:${h(Math.floor(i/6e4)%60,2)}:${h(Math.floor(i/1e3)%60,2)}.${h(i%1e3,3)}`};return String(t).replace(/(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{3})(?=\s+-->|\s*$|\s+[a-z])/gim,(o,i,h,m,u)=>c(s((Number(i)||0)*3600+Number(h)*60+Number(m)+Number(u)/1e3)))}function pe({fxAudioUrl:t,referenceUrl:s,io:c,decode:o=Re}){let i,h=null;const m=()=>i??(i=Promise.all([Promise.resolve(c.fxText(t)).then(async S=>{const L=H(S,t);return L.init&&(h=U(new Uint8Array(await c.fxBytes(L.init)))),L}),Promise.resolve(c.liftText(s)).then(S=>H(S,s))]).then(([S,L])=>({fx:S,lift:L}))),u=async(S,L,v)=>{const n=(await Promise.all(S.map(r=>L(r.url,r.duration)))).map(r=>K(new Uint8Array(r),v?h:null)),{pcm:a,rate:l}=await o(q(n.map(r=>r.adts)));return{hops:Se(a,l),seconds:n[0].seconds}},g=async(S,L=4,v=14)=>{const{fx:e,lift:n}=await m(),a=n.duration-e.duration,l=G(e.segments,S,S+20);if(!l.length)return null;const r=S-L+Math.min(0,a),y=S+20+v+Math.max(0,a>40?0:a),d=G(n.segments,r,y);if(!d.length)return null;const[w,M]=await Promise.all([u(l,c.fxBytes,!0),u(d,c.liftBytes,!1)]),A=ve(w.hops,M.hops);if(!A)return null;const T=l[0].start,N=d[0].start;return{at:T,offset:N+A.seconds-T,stream:w.seconds??T,clock:(M.seconds??N)+A.seconds-(w.seconds??T),z:A.z,margin:A.margin,score:A.score}},k=async S=>{const{fx:L,lift:v}=await m(),e=L.duration,n=v.duration-e,a=A=>Math.max(30,Math.min(e-20-40,A)),l=[],r=()=>ee(l,{durationGap:n,duration:e}),y=async(...A)=>(l.push(...await Promise.all(A.map(T=>g(a(T))))),r()),d=S>e/2?e*.2:e*.7;let w=await y(S+5,d);if((!w||w.anchors<2)&&(w=await y(e/2+60)),(!w||w.anchors<2)&&(w||!l.some(A=>A&&A.z>=12))&&(l.push(await g(a(e*.35),45,45)),l.push(await g(a(e*.6),45,45)),w=r()),!w)return{line:await I(l),anchors:l};const M=l.filter(A=>A&&Math.abs($(w,A.at)-A.offset)<=.15);return{line:{...w,clock:le(M)},anchors:l}},R=async(S,L,v,e)=>{const{fx:n,lift:a}=await m(),l=G(n.segments,S,L),r=G(a.segments,S+$(v,S)-1,L+$(e,L)+1);if(!l.length||!r.length)return null;const[y,d]=await Promise.all([u(l,c.fxBytes,!0),u(r,c.liftBytes,!1)]),w=l[0].start,M=r[0].start,A=(f,b)=>{const x=w+b/100;return d.hops[Math.round((x+f.intercept+f.slope*x-M)*100)]||0};let T=0,N=0,p=0;for(let f=0;f<y.hops.length;f+=1)T+=y.hops[f]*(A(v,f)-A(e,f)),T>N&&(N=T,p=f+1);return w+p/100},I=async S=>{const L=S.filter(p=>p&&p.z>=5).sort((p,f)=>p.at-f.at),v=[];for(const p of L){const f=v.find(b=>Math.abs(b[0].offset-p.offset)<=.5);f?f.push(p):v.push([p])}const e=v.filter(p=>p.length>1||p[0].z>=12);if(e.length!==2)return null;let[n,a]=e.sort((p,f)=>p[0].at-f[0].at);if(n[n.length-1].at>=a[0].at)return null;const l=a[0].offset-n[0].offset;if(l<.3||l>180)return null;const r=(p,f)=>p&&p.z>=5&&Math.abs(p.offset-f[0].offset)<=.5;let y=n[n.length-1].at,d=a[0].at;for(let p=0;d-y>90&&p<12;p+=1){const f=(y+d)/2,b=(d-y)/6;let x=!1;for(const _ of[f,f-b,f+b]){const D=await g(_,4,Math.max(14,l+4)).catch(()=>null);if(r(D,n)){n=[...n,D],y=D.at,x=!0;break}if(r(D,a)){a=[D,...a],d=D.at,x=!0;break}}if(!x)break}if(d-y>360)return null;const w=p=>{const f=p.length>1?ee(p):null,b=f?f.slope:0,x=f?f.intercept:p[0].offset;return{slope:b,intercept:x,clock:le(p)}},M=w(n),A=w(a),T=await R(y,d+20,M,A).catch(()=>null);if(T===null)return null;const N=a[0].stream-a[0].at;return{...M,anchors:n.length+a.length,cut:+T.toFixed(2),jump:+l.toFixed(2),pieces:[{...M,from:0,clockFrom:0},{...A,from:T,clockFrom:T+N}]}};return{align:k,anchor:g,verify:async(S,L=[])=>{const{fx:v}=await m(),e=v.duration,n=[.1,.4,.92].map(l=>e*l).filter(l=>l>30&&l<e-20-40),a=[...L];for(const l of n){const r=await g(l,4,S.pieces?14+Math.abs(S.jump||0):14).catch(()=>null);if(a.push(r),r&&r.z>=12&&Math.abs($(S,r.at)-r.offset)>1)return S.pieces?!1:await I(a)||!1}return!0}}}function V(t,s){return Math.round(((s-t.clock.intercept)/(1+t.clock.slope)-s)*9e4)}function ne(t,s){let c=-1,o=!1;const i=h=>(h%8589934592+8589934592)%8589934592;for(let h=0;h+188<=t.length&&t[h]===71;h+=188){const m=(t[h+1]&31)<<8|t[h+2],u=t[h+3]>>4&3,g=h+4+(u&2?1+t[h+4]:0);if(u&1&&g+14<h+188&&t[h+1]&64&&t[g]===0&&t[g+1]===0&&t[g+2]===1&&t[g+3]>=192&&t[g+3]<=223&&(c<0||m===c)){c=m,o=!1;const k=t[g+7];if(k&128){const R=E(t,g+9),I=s(R);I===null?o=!0:(C(t,g+9,i(I)),(k&192)===192&&C(t,g+14,i(E(t,g+14)+I-R)))}}o&&m===c&&(t[h+1]=t[h+1]&224|31,t[h+2]=255)}return t}function me(t,s){const c=Ne(t);return c===null?t:s.pieces?ne(t,o=>{const i=Q(s,o/9e4,{clock:!0});return i===null?null:Math.round(i*9e4)}):z(t,V(s,c))}function Ne(t){return F(t).seconds}const re={envelope:Se,locate:ve,tsAudio:F,shiftTsPts:z,packedAudio:fe,mp4Config:U,mp4Audio:J,audioSegment:K,mediaPlaylist:H,fitLine:ee,offsetAt:$,clockOffsetAt:Y,shiftLine:Ee,liftToFx:Q,fxSpan:te,shiftedPlaylist:be,retimeVtt:he,createAligner:pe,segmentShift:V,mapTsPts:ne,placeSegment:me,firstPts:Ne,ALIGN_TIMEOUT_MS:15e3,CLEAR_Z:12};typeof window<"u"&&(window.alphyCross=re),typeof globalThis<"u"&&(globalThis.alphyCross=re)})(),(()=>{"use strict";const Te=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];function Me(E){const C=[];for(let O=0;O+7<=E.length&&!(E[O]!==255||(E[O+1]&240)!==240);){const F=(E[O+3]&3)<<11|E[O+4]<<3|E[O+5]>>5;if(F<7)break;C.push(O),O+=F}return C}const ie=E=>Te[E[2]>>2&15]||48e3;function xe(E,C){const O=Me(E);return O.length>C?E.subarray(O[O.length-C]):E}function Le(E,C){const O=new Uint8Array(E.length+C.length);return O.set(E),O.set(C,E.length),O}const De=E=>[...E].sort((C,O)=>C-O)[E.length>>1],je=(E,C)=>(C-E.clock.intercept)/(1+E.clock.slope),Ce=(E,C)=>E.pieces?window.alphyCross.liftToFx(E,C,{clamp:!0}):(C-E.intercept)/(1+E.slope);function Se({wanted:E,previousEnd:C,now:O}){const F=C!==null&&Math.abs(E-C)<.04?C:E,z=O+.02;return F>=z?{when:F,late:0}:{when:z,late:z-F}}function ue(E,C,O){let F=0;for(let z=0;z<E.length&&!(Ce(C,E[z].start)>O);z+=1)F=z;return F}function ve({video:E,segments:C,line:O,fetchBytes:F,onLost:z,log:fe,audioContext:W}){const ce=window.AudioContext||window.webkitAudioContext,de=E.muted;let U=null,J=null,K=!1,Re=0,H=0,G=!1,ee=!1,Z=new Set,$=[],Y=null,Ee=null,te=null,Q=null,le=0,be=0,he=0,pe=null,V=null;const ne=()=>E.playbackRate||1,me=()=>De($),Ne=()=>(U.outputLatency||0)+(U.baseLatency||0);function re(){H+=1;for(const g of Z)try{g.stop()}catch{}Z=new Set,$=[],Y=null,Ee=null,te=null,Q=null,le=0,G=!1}function t(g){K||(fe?.("fx-sound-warn",g),V?V(new Error(g)):z?.(g))}async function s(g,k){const R=C[g],I=new Uint8Array(await F(R.url));if(k!==H)return;const P=window.alphyCross.audioSegment(I),S=te?Le(te,P.adts):P.adts,L=te?Me(te).length*1024/ie(P.adts):0;let v;try{v=await U.decodeAudioData(S.slice().buffer)}catch{throw new Error("decode")}if(k!==H)return;te=xe(P.adts,2);const e=P.seconds===null||P.seconds===void 0?{at:Ce(O,R.start),skip:0,length:1/0,slope:O.clock.slope}:window.alphyCross.fxSpan(O,P.seconds,P.seconds+v.duration-L);if(Y=g+1,!e)return;const n=e.at,a=(1+e.slope)*ne(),l=me();Q=l;const r=(n-l)/ne()-Ne(),{when:y,late:d}=Se({wanted:r,previousEnd:Ee,now:U.currentTime}),w=L+e.skip+d*a,M=Math.min(v.duration,L+e.skip+e.length),A=(M-w)/a;if(be=0,le=n+M-L-e.skip,A<=0)return;const T=U.createBufferSource();T.buffer=v,T.playbackRate.value=a,T.connect(J),T.onended=()=>Z.delete(T),T.start(y,w,M-w),Z.add(T),Ee=y+A,ee||(ee=!0,setTimeout(()=>{K||k!==H||(E.muted=!0,pe?.(),pe=V=null)},Math.max(0,(y-U.currentTime)*1e3)))}function c(){if(K)return;if(!E.isConnected){m();return}if(E.paused||E.seeking||E.readyState<3){U.state==="running"&&U.suspend().catch(()=>{});return}if(he+=250,!ee&&he>15e3){t("no sound in time");return}if(U.state==="suspended"){U.resume().catch(()=>{});return}if($.push(E.currentTime-U.currentTime*ne()),$.length>9&&$.shift(),$.length<3)return;if(Q!==null&&Math.abs(me()-Q)>.15*ne()){fe?.("fx-sound",`resync ${(me()-Q).toFixed(3)}`),re();return}if(Y===null&&(Y=ue(C,O,E.currentTime)),G||Y>=C.length||le-E.currentTime>12)return;const k=H;G=!0,s(Y,k).catch(R=>{k===H&&(be+=1,R.message==="decode"?t("decode"):be>=3&&t(`segment: ${R.message}`))}).finally(()=>{k===H&&(G=!1)})}const o=()=>{J&&(J.gain.value=de?0:E.volume),ee&&!E.muted&&(E.muted=!0)},i=()=>{U?.state==="running"&&U.suspend().catch(()=>{})},h={seeking:re,emptied:re,ratechange:re,volumechange:o,pause:i,waiting:i};function m(){if(!K){K=!0,V?.(new Error("stopped")),pe=V=null,clearInterval(Re);for(const[g,k]of Object.entries(h))E.removeEventListener(g,k);re(),W||U?.close().catch(()=>{}),E.muted=de}}async function u(){if(U=W||new ce,J=U.createGain(),J.connect(U.destination),J.gain.value=de?0:E.volume,await Promise.race([U.resume(),new Promise(g=>setTimeout(g,1500))]),K)throw new Error("stopped");if(U.state!=="running"&&!E.paused)throw new Error("suspended");for(const[g,k]of Object.entries(h))E.addEventListener(g,k);return Re=setInterval(c,250),new Promise((g,k)=>{pe=g,V=k})}return{start:u,stop:m,state:()=>({state:U?.state,offset:$.length?me():null,sources:Z.size,next:Y,plannedUntil:le})}}const q={create:ve,adtsFrames:Me,lastFrames:xe,placement:Se,segmentAt:ue,fxSeconds:je};typeof window<"u"&&(window.alphyFxSound=q),typeof globalThis<"u"&&(globalThis.alphyFxSound=q)})();
