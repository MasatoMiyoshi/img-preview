import t from"animejs/lib/anime.es.js";class e{constructor(t){this.options=Object.assign(this.defaultOptions,t)}get defaultOptions(){return{containerID:"img_preview-container",distanceFromCursor:{top:10,left:10}}}get containerID(){return this.options.containerID}get containerClass(){return"img_preview-container"}get containerLoadingClass(){return"img_preview-container__loading"}init(){let t=document.createElement("div");t.setAttribute("id",this.containerID),t.classList.add(this.containerClass),t.append(document.createElement("img")),t.style.display="none",t.style.position="absolute",document.querySelector("body").append(t),this.container=document.querySelector(`#${this.containerID}`),this.img=this.container.querySelector("img")}run(t){let e=this.filterElements(t),i=this;function n(t){i.container.classList.remove(i.containerLoadingClass),i.img.style.display="",i.onLoad(i.img),t.currentTarget.removeEventListener("load",this)}Array.prototype.forEach.call(e,t=>{t.addEventListener("mousemove",t=>{this.container.style.top=t.pageY+this.options.distanceFromCursor.top+"px",this.container.style.left=t.pageX+this.options.distanceFromCursor.left+"px"}),t.addEventListener("mouseover",t=>{this.container.classList.add(this.containerLoadingClass),this.container.style.display="",this.img.addEventListener("load",{handleEvent:n}),this.img.setAttribute("src",this.extractUrl(t.currentTarget)),this.onShow(this.container,t.currentTarget)}),t.addEventListener("mouseout",t=>{this.container.style.display="none",this.img.setAttribute("src",""),this.img.style.display="none",this.onHide(t.currentTarget)})})}filterElements(t){let e=new RegExp(".(gif|jpe?g|png|bmp|gif?d+|jpe?g?d+|png?d+|bmp?d+)$","i");return[].map.call(t,t=>t).filter((t,i)=>{let n=this.extractUrl(t);return!(!n||!n.match(e))})}extractUrl(t){let e;return"A"==t.tagName?e=t.getAttribute("data-image"):"IMG"==t.tagName&&(e=t.getAttribute("src")),e}onShow(e,i){t.remove(i),t({targets:i,opacity:.4,duration:400,easing:"linear"}),t.remove(e.querySelector("img")),e.querySelector("img").style.opacity=0}onLoad(e){t.remove(e),t({targets:e,opacity:1,duration:300,easing:"linear"})}onHide(e){t.remove(e),t({targets:e,opacity:1,duration:300,easing:"linear"})}}export{e as default};
//# sourceMappingURL=index.modern.mjs.map
