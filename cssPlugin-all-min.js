var cssPlugin=function(){document.head.webkitMatchesSelector&&(Element.prototype._setAttribute=Element.prototype.setAttribute,Element.prototype.setAttribute=function(a,b){var c=document.createEvent("MutationEvents"),d=this.getAttribute(a);this._setAttribute(a,b),c.initMutationEvent("DOMAttrModified",!0,!0,null,d,b,a,2),this.dispatchEvent(c)});var a=window.console||{log:function(){}},b=window.location.href.split("?")[0].split("/");b.pop(),b=b.join("/");var c={checks:0,queries:0},d,e,f=[],g=[{name:"-plugin-any",base:"",fn:function(a,b){return a.matchesSelector(b)}}],h,j=[],k=[],l=!1,m=function(a,c,d){var e,f;if(a.tagName!=="BODY"&&c.scan!==""){if(a.matchesSelector(c.scan)){for(var g=0;g<c.rules.length;g++)e=x.map[c.rules[g].filter].fn(a,c.rules[g].filterargs,{siblings:a.parentNode.children,location:b}),f=c.rules[g].rid,e?q(a,f):r(a,f);d=a}return m(a.parentNode,c,d)}return d},n=function(a,b){while(a.tagName!=="BODY")b.push(a),a=a.parentNode;return b},o=function(b,d){var e=(new Date).getTime(),f,g=b.target||b,h=[];if(b.type==="DOMNodeRemoved"){setTimeout(function(){o({type:"DOMNodeInserted",target:b.relatedNode,relatedNode:b.relatedNode},!1)},1);return}if(!l){c={checks:0,queries:0},l=!0;try{c.queries++;var i=u(b);if(i){g=m(g,i)||g;return}for(var j=0;j<h.length;j++)h[j]._oldclasses=h[j].className;w(g,b.type==="DOMNodeInserted"?n(b.relatedNode,[g]):!1)}catch(k){a.log(k.message)}finally{c.duration=(new Date).getTime()-e+"ms",a.log(JSON.stringify(c)),l=!1}}},p=function(a,b){return(new RegExp("_"+b)).test((a.target||a).className)},q=function(a,b){p(a,b)||((a.target||a).className+=" _"+b)},r=function(a,b){p(a,b)&&((a.target||a).className=(a.target||a).className.replace(" _"+b,""))},s=function(a,b,c){var e,f,g=[],h=!1,i;for(var j=0;j<a.segments.length;j++){i=a.segments[j],e=i.selector.replace(/\._\d/,"").replace(":-"+d+"-any()",""),f=i.filterargs,g.push(e);if(e.indexOf(b)!==-1||f&&f.indexOf(b)!==-1){h=!0;break}}return{a:g.join(" "),b:j-h?0:1}},t={"class":function(a){return"."+a},id:function(a){return"#"+a},attr:function(a){return"["+a}},u=function(a){var b,c=[],d,e="",f="",g=[],h=[],i;if(!a.attrName)return!1;b=t[a.attrName]?t[a.attrName]:t.attr;for(var k=0;k<j.length;k++){d=j[k],d.str||(d.str=JSON.stringify(d)),i=b(a.newValue.trim());if(d.str.indexOf(i)!==-1||b===t.attr&&d.str.indexOf(a.attrName)!==-1){d.index=k;var l=s(d,i,a);l.a&&g.indexOf(l.a)===-1&&g.push(l.a),d.segments[l.b].rid=k,c.push(d.segments[l.b])}}return{scan:g.join(","),rules:c}},v=function(){var a=[],b,c,d,f=0,g,h;if(!e){e={};for(var i=0;i<j.length;i++){c=j[i],b=[];for(var k=0;k<c.segments.length;k++)d=c.segments[k],g=d.selector.replace(/\._\d/,""),b.push(g),d.filter&&(h=b.join(" "),h===""&&(h="*"),e[h]||(e[h]={filters:{}}),e[h].filters[d.filter]||(e[h].filters[d.filter]=[]),e[h].filters[d.filter].push({rid:i,args:d.filterargs}))}}return e},w=function(a,c,d){var e,f,g,h,i,k=j,l,m,n={},o,p=v();for(var f in p){l=c,c?l=c.concat(Array.prototype.slice.call(a.querySelectorAll(f),0)):a.querySelectorAll&&(l=Array.prototype.slice.call(a.querySelectorAll(f),0));for(var s=0;s<l.length;s++){e=l[s],m={target:e},fs=p[f].filters;for(var t in fs){i=fs[t];for(var u=0;u<i.length;u++)h=x.map[t].fn(e,i[u].args,{siblings:e.parentNode.children,location:b}),h?q(m,i[u].rid):r(m,i[u].rid)}}}},x={map:{},parseFilters:function(){return f},init:function(a){var b,c,e,f,g=document.createElement("style"),h="-moz-|-ms-|-webkit-|-o-";document.getElementsByTagName("head")[0].appendChild(g),b=document.styleSheets[document.styleSheets.length-1],c=y(),c.push(d),c=new RegExp(c.join("|"));var j=[];for(i=0;i<k.length;i++){e=k[i].rule.split(","),f=[];for(var l=0;l<e.length;l++)f.push(e[l]),/-[A-z\0...9]*/.test(e[l])&&!c.test(e[l])&&f.pop();f.join(",")===""?(j.push(e),b.insertRule(e,b.length-1)):(j.push(f.join(",")),b.insertRule(f.join(","),b.length-1))}o(a,document.head.webkitMatchesSelector),a.addEventListener("DOMAttrModified",o),a.addEventListener("DOMNodeInserted",o),a.addEventListener("DOMNodeRemoved",o),a.addEventListener("DOMSubtreeModified",function(a){var b=a.target;!b._isSetting&&b._oldclasses!==b.className&&(b._isSetting=!0,b.setAttribute("class",b.className),b._oldclasses=b.className,b._isSetting=!1)})},registerFilter:function(a,b,c,d){c&&(x.map[":"+a]={fn:c,base:b,ancestrallytruthy:d})}};h=function(){var a,b=document,c=b.body;if(g){for(var e=0;e<g.length;e++)x.registerFilter(g[e].name,g[e].base,g[e].fn,g[e].ancestrallytruthy);c.mozMatchesSelector?(d="-moz-",a="mozMatchesSelector"):c.webkitMatchesSelector?(d="-webkit-",a="webkitMatchesSelector"):c.oMatchesSelector?(d="-o-",a="oMatchesSelector"):(d="-ms-",a="msMatchesSelector"),document.head.matchesSelector||(Element.prototype.matchesSelector=function(b){return this[a](b)}),k=x.parseFilters();for(var e=0;e<k.length;e++)k[e].segments&&j.push(k[e]);x.init(c)}};var y=function(){var a=[];for(var b=0;b<g.length;b++)a.push(g[b].name);return a},z=!0;return document.addEventListener("DOMContentLoaded",function(){z&&h()},!1),{useManualInit:function(){z=!1},init:function(){h()},addCompiledRules:function(a){return f=f.concat(a),this},addFilters:function(a){g=g.concat(a)},getPluginNames:function(){return y()},getBase:function(a){for(var b=0;b<g.length;b++)if(a===g[b].name)return g[b].base}}}(),cssPluginCompiler=function(a){var b,c,d,e,f,g,h,i,j=document.head;matcherFn=j.mozMatchesSelector||j.webkitMatchesSelector||j.msMatchesSelector||j.oMatchesSelector,regExpPart="\\([^\\)]*\\)",care=/(\[|#|\.|:|\w)[A-z|0-9|\-]*/g,compiled=[],mapper={},mc=0,any="-"+matcherFn.name.replace("MatchesSelector","-any"),a=a.replace(/\@-plugin-alias[^\;]*\;/g,function(a,b,c){var d=a.split(/\s|\;/g);return cssPlugin.addFilters([{name:d[1],base:d[2]}]),""}),n,p,pluginNames=cssPlugin.getPluginNames(),reHasPlugin=new RegExp(pluginNames.join("|")),reHasFn=new RegExp(pluginNames.join(regExpPart+"|")+regExpPart,"g"),b=a.split("}"),lastComp=function(){return compiled[compiled.length-1]};try{document.head.querySelectorAll(":"+any+"(*)").length}catch(k){any="-plugin-any"}for(var l=0;l<b.length;l++){h=0,c=b[l].trim();if(c!==""){c=b[l]+"}",e=c,o=c.split("{"),d=o[0];if(d!=="*"&&reHasPlugin.test(d)){compiled.push({segments:[]}),d=d.replace(reHasFn,function(a,b,c){var d;typeof mapper[a]=="undefined"&&(mapper[a]={index:mc++,args:a.match(/\((.*)\)/)[1]}),g=cssPlugin.getBase(a.split("(")[0]);if(!g||g==="")g="*";return any==="-plugin-any"?(d="",b-=1):d=any+"("+g+")",typeof mapper[a].index!="undefined"&&(d+="._"+mapper[a].index),lastComp().segments.push({selector:(c.substring(h,b)+d).trim(),filter:":"+a.split("(")[0],filterargs:mapper[a].args}),d}),d=d.trim().replace(/:$/,"").replace(":._","._"),f=d.match(reHasPlugin);if(f)for(var m=0;m<f.length;m++)g=cssPlugin.getBase(f[m]),d=d.replace(new RegExp(":"+f[m],"g"),function(){return g||""});if(lastComp().segments.length===0)delete lastComp().segments;else{var n=lastComp().segments[lastComp().segments.length-1],p=d.substring(d.indexOf(n.selector)+n.selector.length).trim();p!==""&&lastComp().segments.push({selector:p})}i=d.match(care);for(var m=i.length-1;m>=0;m--)i[m][0]===":"&&i.splice(m,1);lastComp().rule=d.trim()+"{"+o[1]}}}return compiled};cssPlugin.useManualInit(),$(document).ready(function(){var promises=[],store=window.localStorage,cv="plugins-cacheversion";$("head [data-plugins]").each(function(i,el){var url,cache=el.getAttribute("data-cacheversion"),scripts=el.getAttribute("data-plugins").split(",");for(var i=0;i<scripts.length;i++)url=scripts[i],store[cv]!==cache&&(store[cv]=cache,cache=!1),cache&&store[url]?eval(store[url]):promises.push($.getScript(url,function(a){store[cv]&&(store[url]=a)}))}),$.when.apply($,promises).then(function(){var a=[],b;$("[data-usesplugins]").each(function(b,c){var d,e=c.getAttribute("data-cacheversion");store[cv]!==e&&(store[cv]=e,e=!1),c.tagName==="STYLE"?cssPlugin.addCompiledRules(cssPluginCompiler(c.innerHTML)):e&&store[c.href]?cssPlugin.addCompiledRules(JSON.parse(store[c.href])):(d=c.href,a.push($.get(d,function(a){var b=cssPluginCompiler(a);e&&setTimeout(function(){store[d]=JSON.stringify(b)},10),cssPlugin.addCompiledRules(b)},"text")))}),$.when.apply($,a).then(function(){cssPlugin.init()})})});