import{s as I,r as te,O as y,E as be,e as R,F as ve,h as T,d as v,P as U,i as X,x as k,y as le,z as ne,A as se,D as Ne,_ as re,$ as K,G as ye,f as F,a as x,l as fe,g as L,c as $,m as ue,j as w,H as P,k as ce,J as G,W as Se,n as he,R as Ce,K as We}from"./scheduler.9f5adef4.js";import{S as Y,i as Z,a as D,t as j,b as V,d as J,m as M,e as Q}from"./index.53ef41cd.js";import{e as de}from"./each.e59479a4.js";function p(t,e){const n={},s={},l={$$scope:1};let o=t.length;for(;o--;){const r=t[o],u=e[o];if(u){for(const _ in r)_ in u||(s[_]=1);for(const _ in u)l[_]||(n[_]=u[_],l[_]=1);t[o]=u}else for(const _ in r)l[_]=1}for(const r in s)r in n||(n[r]=void 0);return n}function ke(t){return typeof t=="object"&&t!==null?t:{}}var Ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Je(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}/**
 * @license lucide-svelte v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function me(t,e,n){const s=t.slice();return s[11]=e[n][0],s[12]=e[n][1],s}function ee(t){let e,n=[t[12]],s={};for(let l=0;l<n.length;l+=1)s=y(s,n[l]);return{c(){e=be(t[11]),this.h()},l(l){e=ve(l,t[11],{}),T(e).forEach(v),this.h()},h(){U(e,s)},m(l,o){X(l,e,o)},p(l,o){U(e,s=p(n,[o&32&&l[12]]))},d(l){l&&v(e)}}}function ge(t){let e=t[11],n,s=t[11]&&ee(t);return{c(){s&&s.c(),n=R()},l(l){s&&s.l(l),n=R()},m(l,o){s&&s.m(l,o),X(l,n,o)},p(l,o){l[11]?e?I(e,l[11])?(s.d(1),s=ee(l),e=l[11],s.c(),s.m(n.parentNode,n)):s.p(l,o):(s=ee(l),e=l[11],s.c(),s.m(n.parentNode,n)):e&&(s.d(1),s=null,e=l[11])},d(l){l&&v(n),s&&s.d(l)}}}function Te(t){let e,n,s,l,o,r=de(t[5]),u=[];for(let i=0;i<r.length;i+=1)u[i]=ge(me(t,r,i));const _=t[10].default,h=te(_,t,t[9],null);let g=[_e,t[7],{width:t[2]},{height:t[2]},{stroke:t[1]},{fill:t[6]},{"stroke-width":s=t[4]?Number(t[3])*24/Number(t[2]):t[3]},{class:l=`lucide-icon lucide lucide-${t[0]} ${t[8].class??""}`}],b={};for(let i=0;i<g.length;i+=1)b=y(b,g[i]);return{c(){e=be("svg");for(let i=0;i<u.length;i+=1)u[i].c();n=R(),h&&h.c(),this.h()},l(i){e=ve(i,"svg",{width:!0,height:!0,stroke:!0,fill:!0,"stroke-width":!0,class:!0});var c=T(e);for(let a=0;a<u.length;a+=1)u[a].l(c);n=R(),h&&h.l(c),c.forEach(v),this.h()},h(){U(e,b)},m(i,c){X(i,e,c);for(let a=0;a<u.length;a+=1)u[a]&&u[a].m(e,null);k(e,n),h&&h.m(e,null),o=!0},p(i,[c]){if(c&32){r=de(i[5]);let a;for(a=0;a<r.length;a+=1){const S=me(i,r,a);u[a]?u[a].p(S,c):(u[a]=ge(S),u[a].c(),u[a].m(e,n))}for(;a<u.length;a+=1)u[a].d(1);u.length=r.length}h&&h.p&&(!o||c&512)&&le(h,_,i,i[9],o?se(_,i[9],c,null):ne(i[9]),null),U(e,b=p(g,[_e,c&128&&i[7],(!o||c&4)&&{width:i[2]},(!o||c&4)&&{height:i[2]},(!o||c&2)&&{stroke:i[1]},(!o||c&64)&&{fill:i[6]},(!o||c&28&&s!==(s=i[4]?Number(i[3])*24/Number(i[2]):i[3]))&&{"stroke-width":s},(!o||c&257&&l!==(l=`lucide-icon lucide lucide-${i[0]} ${i[8].class??""}`))&&{class:l}]))},i(i){o||(D(h,i),o=!0)},o(i){j(h,i),o=!1},d(i){i&&v(e),Ne(u,i),h&&h.d(i)}}}function Ee(t,e,n){const s=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","fill"];let l=re(e,s),{$$slots:o={},$$scope:r}=e,{name:u}=e,{color:_="currentColor"}=e,{size:h=24}=e,{strokeWidth:g=2}=e,{absoluteStrokeWidth:b=!1}=e,{iconNode:i}=e,{fill:c="none"}=e;return t.$$set=a=>{n(8,e=y(y({},e),K(a))),n(7,l=re(e,s)),"name"in a&&n(0,u=a.name),"color"in a&&n(1,_=a.color),"size"in a&&n(2,h=a.size),"strokeWidth"in a&&n(3,g=a.strokeWidth),"absoluteStrokeWidth"in a&&n(4,b=a.absoluteStrokeWidth),"iconNode"in a&&n(5,i=a.iconNode),"fill"in a&&n(6,c=a.fill),"$$scope"in a&&n(9,r=a.$$scope)},e=K(e),[u,_,h,g,b,i,c,l,e,r,o]}class Pe extends Y{constructor(e){super(),Z(this,e,Ee,Te,I,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5,fill:6})}}const we=Pe;function ze(t){let e;const n=t[2].default,s=te(n,t,t[3],null);return{c(){s&&s.c()},l(l){s&&s.l(l)},m(l,o){s&&s.m(l,o),e=!0},p(l,o){s&&s.p&&(!e||o&8)&&le(s,n,l,l[3],e?se(n,l[3],o,null):ne(l[3]),null)},i(l){e||(D(s,l),e=!0)},o(l){j(s,l),e=!1},d(l){s&&s.d(l)}}}function qe(t){let e,n;const s=[{name:"chevron-left"},t[1],{iconNode:t[0]}];let l={$$slots:{default:[ze]},$$scope:{ctx:t}};for(let o=0;o<s.length;o+=1)l=y(l,s[o]);return e=new we({props:l}),{c(){V(e.$$.fragment)},l(o){J(e.$$.fragment,o)},m(o,r){M(e,o,r),n=!0},p(o,[r]){const u=r&3?p(s,[s[0],r&2&&ke(o[1]),r&1&&{iconNode:o[0]}]):{};r&8&&(u.$$scope={dirty:r,ctx:o}),e.$set(u)},i(o){n||(D(e.$$.fragment,o),n=!0)},o(o){j(e.$$.fragment,o),n=!1},d(o){Q(e,o)}}}function Fe(t,e,n){let{$$slots:s={},$$scope:l}=e;const o=[["path",{d:"m15 18-6-6 6-6"}]];return t.$$set=r=>{n(1,e=y(y({},e),K(r))),"$$scope"in r&&n(3,l=r.$$scope)},e=K(e),[o,e,s,l]}class Le extends Y{constructor(e){super(),Z(this,e,Fe,qe,I,{})}}const De=Le;function je(t){let e;const n=t[2].default,s=te(n,t,t[3],null);return{c(){s&&s.c()},l(l){s&&s.l(l)},m(l,o){s&&s.m(l,o),e=!0},p(l,o){s&&s.p&&(!e||o&8)&&le(s,n,l,l[3],e?se(n,l[3],o,null):ne(l[3]),null)},i(l){e||(D(s,l),e=!0)},o(l){j(s,l),e=!1},d(l){s&&s.d(l)}}}function Ae(t){let e,n;const s=[{name:"chevron-right"},t[1],{iconNode:t[0]}];let l={$$slots:{default:[je]},$$scope:{ctx:t}};for(let o=0;o<s.length;o+=1)l=y(l,s[o]);return e=new we({props:l}),{c(){V(e.$$.fragment)},l(o){J(e.$$.fragment,o)},m(o,r){M(e,o,r),n=!0},p(o,[r]){const u=r&3?p(s,[s[0],r&2&&ke(o[1]),r&1&&{iconNode:o[0]}]):{};r&8&&(u.$$scope={dirty:r,ctx:o}),e.$set(u)},i(o){n||(D(e.$$.fragment,o),n=!0)},o(o){j(e.$$.fragment,o),n=!1},d(o){Q(e,o)}}}function Ke(t,e,n){let{$$slots:s={},$$scope:l}=e;const o=[["path",{d:"m9 18 6-6-6-6"}]];return t.$$set=r=>{n(1,e=y(y({},e),K(r))),"$$scope"in r&&n(3,l=r.$$scope)},e=K(e),[o,e,s,l]}class Oe extends Y{constructor(e){super(),Z(this,e,Ke,Ae,I,{})}}const Ie=Oe;function Be(t){let e,n,s,l,o,r,u=t[9]=="story"?"Previous Chapter":"Previous Folder",_,h,g,b,i,c,a,S,C,E=t[9]=="story"?"Next Chapter":"Next Folder",z,W,q,m,O,B;return ye(t[18]),l=new De({props:{color:t[2],strokeWidth:t[3]}}),a=new Ie({props:{color:t[2],strokeWidth:t[3]}}),{c(){e=F("section"),n=F("button"),s=F("div"),V(l.$$.fragment),o=x(),r=F("p"),_=fe(u),b=x(),i=F("button"),c=F("div"),V(a.$$.fragment),S=x(),C=F("p"),z=fe(E),this.h()},l(f){e=L(f,"SECTION",{style:!0,class:!0});var d=T(e);n=L(d,"BUTTON",{"aria-label":!0,class:!0});var N=T(n);s=L(N,"DIV",{class:!0});var A=T(s);J(l.$$.fragment,A),A.forEach(v),o=$(N),r=L(N,"P",{class:!0});var oe=T(r);_=ue(oe,u),oe.forEach(v),N.forEach(v),b=$(d),i=L(d,"BUTTON",{"aria-label":!0,class:!0});var H=T(i);c=L(H,"DIV",{class:!0});var ie=T(c);J(a.$$.fragment,ie),ie.forEach(v),S=$(H),C=L(H,"P",{class:!0});var ae=T(C);z=ue(ae,E),ae.forEach(v),H.forEach(v),d.forEach(v),this.h()},h(){w(s,"class","svg-wrapper svelte-1ym7snq"),w(r,"class","svelte-1ym7snq"),w(n,"aria-label","left"),w(n,"class",h="left "+t[4]+" svelte-1ym7snq"),n.disabled=g=t[5]==0||t[7]==0,P(n,"full",t[1]),w(c,"class","svg-wrapper svelte-1ym7snq"),w(C,"class","svelte-1ym7snq"),w(i,"aria-label","right"),w(i,"class",W="right "+t[4]+" svelte-1ym7snq"),i.disabled=q=t[5]==t[6]-1||t[7]==t[8]-1,P(i,"full",t[1]),ce(e,"height",t[10]+"px"),w(e,"class","svelte-1ym7snq"),P(e,"tapType",t[9]),P(e,"debug",t[0])},m(f,d){X(f,e,d),k(e,n),k(n,s),M(l,s,null),k(n,o),k(n,r),k(r,_),k(e,b),k(e,i),k(i,c),M(a,c,null),k(i,S),k(i,C),k(C,z),m=!0,O||(B=[G(window,"keydown",function(){Se(t[11])&&t[11].apply(this,arguments)}),G(window,"resize",t[18]),G(n,"click",t[19]),G(i,"click",t[20])],O=!0)},p(f,[d]){t=f;const N={};d&4&&(N.color=t[2]),d&8&&(N.strokeWidth=t[3]),l.$set(N),(!m||d&512)&&u!==(u=t[9]=="story"?"Previous Chapter":"Previous Folder")&&he(_,u),(!m||d&16&&h!==(h="left "+t[4]+" svelte-1ym7snq"))&&w(n,"class",h),(!m||d&160&&g!==(g=t[5]==0||t[7]==0))&&(n.disabled=g),(!m||d&18)&&P(n,"full",t[1]);const A={};d&4&&(A.color=t[2]),d&8&&(A.strokeWidth=t[3]),a.$set(A),(!m||d&512)&&E!==(E=t[9]=="story"?"Next Chapter":"Next Folder")&&he(z,E),(!m||d&16&&W!==(W="right "+t[4]+" svelte-1ym7snq"))&&w(i,"class",W),(!m||d&480&&q!==(q=t[5]==t[6]-1||t[7]==t[8]-1))&&(i.disabled=q),(!m||d&18)&&P(i,"full",t[1]),(!m||d&1024)&&ce(e,"height",t[10]+"px"),(!m||d&512)&&P(e,"tapType",t[9]),(!m||d&1)&&P(e,"debug",t[0])},i(f){m||(D(l.$$.fragment,f),D(a.$$.fragment,f),m=!0)},o(f){j(l.$$.fragment,f),j(a.$$.fragment,f),m=!1},d(f){f&&v(e),Q(l),Q(a),O=!1,Ce(B)}}}function He(t,e,n){let s,{debug:l=!1}=e,{enableKeyboard:o=!1}=e,{full:r=!1}=e,{showArrows:u=!1}=e,{disable:_=[]}=e,{directions:h=["left","right"]}=e,{arrowSize:g="48px"}=e,{arrowStroke:b="#000"}=e,{arrowStrokeWidth:i="2"}=e,{arrowPosition:c="center"}=e,{activeFolder:a}=e,{lettersLen:S}=e,{activeChapter:C}=e,{chaptersLen:E}=e,{tapType:z}=e;const W=We();let q;function m(){n(10,q=window.innerHeight)}const O=()=>W("tap","left"),B=()=>W("tap","right");return t.$$set=f=>{"debug"in f&&n(0,l=f.debug),"enableKeyboard"in f&&n(13,o=f.enableKeyboard),"full"in f&&n(1,r=f.full),"showArrows"in f&&n(14,u=f.showArrows),"disable"in f&&n(15,_=f.disable),"directions"in f&&n(16,h=f.directions),"arrowSize"in f&&n(17,g=f.arrowSize),"arrowStroke"in f&&n(2,b=f.arrowStroke),"arrowStrokeWidth"in f&&n(3,i=f.arrowStrokeWidth),"arrowPosition"in f&&n(4,c=f.arrowPosition),"activeFolder"in f&&n(5,a=f.activeFolder),"lettersLen"in f&&n(6,S=f.lettersLen),"activeChapter"in f&&n(7,C=f.activeChapter),"chaptersLen"in f&&n(8,E=f.chaptersLen),"tapType"in f&&n(9,z=f.tapType)},t.$$.update=()=>{t.$$.dirty&65538,t.$$.dirty&2,t.$$.dirty&73728&&n(11,s=f=>{const d=f.key.replace("Arrow","").toLowerCase(),N=h.includes(d);o&&N&&(f.preventDefault(),W("tap",d))}),t.$$.dirty&81920&&h.filter(f=>typeof u=="boolean"?u:u.includes(f))},[l,r,b,i,c,a,S,C,E,z,q,s,W,o,u,_,h,g,m,O,B]}class Me extends Y{constructor(e){super(),Z(this,e,He,Be,I,{debug:0,enableKeyboard:13,full:1,showArrows:14,disable:15,directions:16,arrowSize:17,arrowStroke:2,arrowStrokeWidth:3,arrowPosition:4,activeFolder:5,lettersLen:6,activeChapter:7,chaptersLen:8,tapType:9})}}export{De as C,Me as T,p as a,Ie as b,Ve as c,Je as g};