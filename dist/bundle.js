!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){var o;const i=function(e,t){if(!e)return;"undefined"!=typeof window&&function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();t||(t={}),t={...{minHorizontal:10,minVertical:10,deltaHorizontal:3,deltaVertical:5,preventScroll:!1,lockAxis:!0},...t};let n=[],o=!1;const i=function(e){o=!0};e.addEventListener("mousedown",i);const r=function(e){o=!1,s(e)};e.addEventListener("mouseup",r);const a=function(e){o&&(e.changedTouches=[{clientX:e.clientX,clientY:e.clientY}],c(e))};e.addEventListener("mousemove",a);const s=function(o){if(!n.length)return;const i=o instanceof TouchEvent;let r=[],a=[],s={top:!1,right:!1,bottom:!1,left:!1};for(let e=0;e<n.length;e++)r.push(n[e].x),a.push(n[e].y);const c=r[0],l=r[r.length-1],d=a[0],u=a[a.length-1],m={x:[c,l],y:[d,u]};if(n.length>1){const t={detail:{touch:i,...m}};let n=new CustomEvent("swiperelease",t);e.dispatchEvent(n)}let g=r[0]-r[r.length-1],f="none";f=g>0?"left":"right";let p,h=Math.min(...r),v=Math.max(...r);if(Math.abs(g)>=t.minHorizontal)switch(f){case"left":(p=Math.abs(h-r[r.length-1]))<=t.deltaHorizontal&&(s.left=!0);break;case"right":(p=Math.abs(v-r[r.length-1]))<=t.deltaHorizontal&&(s.right=!0)}if(f="none",f=(g=a[0]-a[a.length-1])>0?"top":"bottom",h=Math.min(...a),v=Math.max(...a),Math.abs(g)>=t.minVertical)switch(f){case"top":(p=Math.abs(h-a[a.length-1]))<=t.deltaVertical&&(s.top=!0);break;case"bottom":(p=Math.abs(v-a[a.length-1]))<=t.deltaVertical&&(s.bottom=!0)}if(n=[],s.top||s.right||s.bottom||s.left){t.lockAxis&&((s.left||s.right)&&Math.abs(c-l)>Math.abs(d-u)?s.top=s.bottom=!1:(s.top||s.bottom)&&Math.abs(c-l)<Math.abs(d-u)&&(s.left=s.right=!1));const n={detail:{directions:s,touch:i,...m}};let o=new CustomEvent("swipe",n);e.dispatchEvent(o)}else{let t=new CustomEvent("swipecancel",{detail:{touch:i,...m}});e.dispatchEvent(t)}},c=function(o){t.preventScroll&&o.preventDefault();let i=o.changedTouches[0];if(n.push({x:i.clientX,y:i.clientY}),n.length>1){const t={detail:{x:[n[0].x,n[n.length-1].x],y:[n[0].y,n[n.length-1].y],touch:o instanceof TouchEvent}};let i=new CustomEvent("swiping",t);e.dispatchEvent(i)}};let l=!1;try{const e=Object.defineProperty({},"passive",{get:function(){l={passive:!t.preventScroll}}});window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}catch(e){}return e.addEventListener("touchmove",c,l),e.addEventListener("touchend",s),{off:function(){e.removeEventListener("touchmove",c,l),e.removeEventListener("touchend",s),e.removeEventListener("mousedown",i),e.removeEventListener("mouseup",r),e.removeEventListener("mousemove",a)}}};void 0!==e.exports?e.exports=i:void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o)},function(e,t,n){"use strict";n.r(t);const o=document.querySelector("#image-modal img"),i=document.getElementById("image-modal"),r=document.getElementById("progress");let a=1;class s{constructor(e,t,n,o){this.id=e,this.name=t,this.price=n,this.images=o}open(){o.src=`content/images/${this.id}/${this.images[0]}`,i.classList.add("open"),this.addProgressDots()}addProgressDots(){r.innerHTML="";for(let e=0;e<this.images.length;e++){let e=document.createElement("div");e.className="progress-dot",r.append(e)}r.children[0].classList.add("selected")}navigateImages(e){"next"===e?a++:a--,a>this.images.length?a=1:a<1&&(a=this.images.length),o.src=`content/images/${this.id}/${a}.jpg`,Array.from(r.children).map(e=>{e.classList.remove("selected")}),r.children[a-1].classList.add("selected")}}var c=[new s("group1","Bord & pallar",5400,["1.jpg","2.jpg","3.jpg","4.jpg"]),new s("group2","Väggbord",3800,["1.jpg","2.jpg"])],l=n(0),d=n.n(l);const u=document.querySelector(".hamburger"),m=document.querySelector("nav"),g=document.getElementById("furniture"),f=document.getElementById("image-modal"),p=document.querySelector("#image-modal .close"),h=document.querySelector("#image-modal img"),v=document.getElementsByClassName("image-navigation");let b;d()(h,{minHorizontal:100});function E(e){"IMG"===e.srcElement.tagName||e.srcElement.classList.contains("image-navigation")||f.classList.remove("open")}function y(e){const t=e.detail.directions;t.left?b.navigateImages("next"):t.right&&b.navigateImages("previous")}function w(e){return c.find(e=>e.id===event.target.dataset.furnitureGroupId)}!function(){for(let e of c){let t=document.createElement("img");t.src=`content/images/${e.id}/${e.images[0]}`,t.dataset.furnitureGroupId=e.id,g.appendChild(t)}}(),u.addEventListener("click",()=>m.classList.toggle("active")),h.addEventListener("swipe",y),g.addEventListener("click",e=>{!function(e){if("IMG"!==e.target.tagName)return;const t=e.target.dataset.furnitureGroupId;(b=w(t)).open(),e.stopPropagation()}(e)}),p.addEventListener("click",function(){f.classList.remove("open")}),window.addEventListener("click",E),function(){for(const e of v)e.addEventListener("click",function(){const t=e.dataset.direction;b.navigateImages(t)})}()}]);