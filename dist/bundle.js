!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=document.querySelector("#image-modal img"),i=document.getElementById("image-modal"),o=document.getElementById("progress");let a=1;class s{constructor(e,t,n,r){this.id=e,this.name=t,this.price=n,this.images=r}open(){r.src=`content/images/${this.id}/${this.images[0]}`,i.classList.add("open"),this.addProgressDots()}addProgressDots(){o.innerHTML="";for(let e=0;e<this.images.length;e++){let e=document.createElement("div");e.className="progress-dot",o.append(e)}o.children[0].classList.add("selected")}navigateImages(e){"next"===e?a++:a--,a>this.images.length?a=1:a<1&&(a=this.images.length),r.src=`content/images/${this.id}/${a}.jpg`,Array.from(o.children).map(e=>{e.classList.remove("selected")}),o.children[a-1].classList.add("selected")}}var c=[new s("group1","Bord & pallar",5400,["1.jpg","2.jpg","3.jpg","4.jpg"]),new s("group2","Väggbord",3800,["1.jpg","2.jpg"])];const d=document.querySelector(".hamburger"),l=document.querySelector("nav"),u=document.getElementById("furniture"),g=document.getElementById("image-modal"),m=document.querySelector("#image-modal .close"),f=document.querySelector("#image-modal img"),p=document.getElementsByClassName("image-navigation");let v;function y(e){return c.find(e=>e.id===event.target.dataset.furnitureGroupId)}!function(){for(let e of c){let t=document.createElement("img");t.src=`content/images/${e.id}/${e.images[0]}`,t.dataset.furnitureGroupId=e.id,u.appendChild(t)}}(),function(){d.addEventListener("click",()=>l.classList.toggle("active")),u.addEventListener("click",e=>{!function(e){if("IMG"!==e.target.tagName)return;const t=e.target.dataset.furnitureGroupId;(v=y(t)).open(),e.stopPropagation()}(e)}),f.addEventListener("click",()=>{v.navigateImages("next")}),m.addEventListener("click",function(){g.classList.remove("open")}),window.addEventListener("click",function(e){"IMG"===e.srcElement.tagName||e.srcElement.classList.contains("image-navigation")||g.classList.remove("open")});for(const e of p)e.addEventListener("click",function(){const t=e.dataset.direction;v.navigateImages(t)})}()}]);