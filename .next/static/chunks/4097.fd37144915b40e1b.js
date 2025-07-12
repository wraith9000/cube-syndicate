(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4097],{645:(t,e,i)=>{let r=i(46087).getSymbolSize;e.getPositions=function(t){let e=r(t);return[[0,0],[e-7,0],[0,e-7]]}},8527:(t,e)=>{function i(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||e.length>8)throw Error("Invalid hex color: "+t);(3===e.length||4===e.length)&&(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");let i=parseInt(e.join(""),16);return{r:i>>24&255,g:i>>16&255,b:i>>8&255,a:255&i,hex:"#"+e.slice(0,6).join("")}}e.getOptions=function(t){t||(t={}),t.color||(t.color={});let e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,r=t.width&&t.width>=21?t.width:void 0,o=t.scale||4;return{width:r,scale:r?4:o,margin:e,color:{dark:i(t.color.dark||"#000000ff"),light:i(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},e.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},e.getImageWidth=function(t,i){let r=e.getScale(t,i);return Math.floor((t+2*i.margin)*r)},e.qrToImageData=function(t,i,r){let o=i.modules.size,n=i.modules.data,a=e.getScale(o,r),s=Math.floor((o+2*r.margin)*a),l=r.margin*a,c=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let i=0;i<s;i++){let u=(e*s+i)*4,d=r.color.light;e>=l&&i>=l&&e<s-l&&i<s-l&&(d=c[+!!n[Math.floor((e-l)/a)*o+Math.floor((i-l)/a)]]),t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}},15580:(t,e,i)=>{let r=i(43585),o=i(46087);function n(t){this.mode=r.KANJI,this.data=t}n.getBitsLength=function(t){return 13*t},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let i=o.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");i=(i>>>8&255)*192+(255&i),t.put(i,13)}},t.exports=n},16862:(t,e,i)=>{let r=i(94676),o=i(55908),n=i(46514),a=i(62013);function s(t,e,i,n,a){let s=[].slice.call(arguments,1),l=s.length,c="function"==typeof s[l-1];if(!c&&!r())throw Error("Callback required as last argument");if(c){if(l<2)throw Error("Too few arguments provided");2===l?(a=i,i=e,e=n=void 0):3===l&&(e.getContext&&void 0===a?(a=n,n=void 0):(a=n,n=i,i=e,e=void 0))}else{if(l<1)throw Error("Too few arguments provided");return 1===l?(i=e,e=n=void 0):2!==l||e.getContext||(n=i,i=e,e=void 0),new Promise(function(r,a){try{let a=o.create(i,n);r(t(a,e,n))}catch(t){a(t)}})}try{let r=o.create(i,n);a(null,t(r,e,n))}catch(t){a(t)}}e.create=o.create,e.toCanvas=s.bind(null,n.render),e.toDataURL=s.bind(null,n.renderToDataURL),e.toString=s.bind(null,function(t,e,i){return a.render(t,i)})},29343:(t,e)=>{e.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}},34122:t=>{function e(){this.buffer=[],this.length=0}e.prototype={get:function(t){let e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)==1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(t){let e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=e},36517:(t,e)=>{e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let i={N1:3,N2:3,N3:40,N4:10};e.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(t){let e=t.size,r=0,o=0,n=0,a=null,s=null;for(let l=0;l<e;l++){o=n=0,a=s=null;for(let c=0;c<e;c++){let e=t.get(l,c);e===a?o++:(o>=5&&(r+=i.N1+(o-5)),a=e,o=1),(e=t.get(c,l))===s?n++:(n>=5&&(r+=i.N1+(n-5)),s=e,n=1)}o>=5&&(r+=i.N1+(o-5)),n>=5&&(r+=i.N1+(n-5))}return r},e.getPenaltyN2=function(t){let e=t.size,r=0;for(let i=0;i<e-1;i++)for(let o=0;o<e-1;o++){let e=t.get(i,o)+t.get(i,o+1)+t.get(i+1,o)+t.get(i+1,o+1);(4===e||0===e)&&r++}return r*i.N2},e.getPenaltyN3=function(t){let e=t.size,r=0,o=0,n=0;for(let i=0;i<e;i++){o=n=0;for(let a=0;a<e;a++)o=o<<1&2047|t.get(i,a),a>=10&&(1488===o||93===o)&&r++,n=n<<1&2047|t.get(a,i),a>=10&&(1488===n||93===n)&&r++}return r*i.N3},e.getPenaltyN4=function(t){let e=0,r=t.data.length;for(let i=0;i<r;i++)e+=t.data[i];return Math.abs(Math.ceil(100*e/r/5)-10)*i.N4},e.applyMask=function(t,i){let r=i.size;for(let o=0;o<r;o++)for(let n=0;n<r;n++)i.isReserved(n,o)||i.xor(n,o,function(t,i,r){switch(t){case e.Patterns.PATTERN000:return(i+r)%2==0;case e.Patterns.PATTERN001:return i%2==0;case e.Patterns.PATTERN010:return r%3==0;case e.Patterns.PATTERN011:return(i+r)%3==0;case e.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(r/3))%2==0;case e.Patterns.PATTERN101:return i*r%2+i*r%3==0;case e.Patterns.PATTERN110:return(i*r%2+i*r%3)%2==0;case e.Patterns.PATTERN111:return(i*r%3+(i+r)%2)%2==0;default:throw Error("bad maskPattern:"+t)}}(t,n,o))},e.getBestMask=function(t,i){let r=Object.keys(e.Patterns).length,o=0,n=1/0;for(let a=0;a<r;a++){i(a),e.applyMask(a,t);let r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(a,t),r<n&&(n=r,o=a)}return o}},37788:(t,e,i)=>{let r=i(46087).getSymbolSize;e.getRowColCoords=function(t){if(1===t)return[];let e=Math.floor(t/7)+2,i=r(t),o=145===i?26:2*Math.ceil((i-13)/(2*e-2)),n=[i-7];for(let t=1;t<e-1;t++)n[t]=n[t-1]-o;return n.push(6),n.reverse()},e.getPositions=function(t){let i=[],r=e.getRowColCoords(t),o=r.length;for(let t=0;t<o;t++)for(let e=0;e<o;e++)(0!==t||0!==e)&&(0!==t||e!==o-1)&&(t!==o-1||0!==e)&&i.push([r[t],r[e]]);return i}},43585:(t,e,i)=>{let r=i(29343),o=i(81685);e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(t,e){if(!t.ccBits)throw Error("Invalid mode: "+t);if(!r.isValid(e))throw Error("Invalid version: "+e);return e>=1&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},e.getBestModeForData=function(t){return o.testNumeric(t)?e.NUMERIC:o.testAlphanumeric(t)?e.ALPHANUMERIC:o.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(t){if(t&&t.id)return t.id;throw Error("Invalid mode")},e.isValid=function(t){return t&&t.bit&&t.ccBits},e.from=function(t,i){if(e.isValid(t))return t;try{if("string"!=typeof t)throw Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw Error("Unknown mode: "+t)}}catch(t){return i}}},46087:(t,e)=>{let i,r=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(t){if(!t)throw Error('"version" cannot be null or undefined');if(t<1||t>40)throw Error('"version" should be in range from 1 to 40');return 4*t+17},e.getSymbolTotalCodewords=function(t){return r[t]},e.getBCHDigit=function(t){let e=0;for(;0!==t;)e++,t>>>=1;return e},e.setToSJISFunction=function(t){if("function"!=typeof t)throw Error('"toSJISFunc" is not a valid function.');i=t},e.isKanjiModeEnabled=function(){return void 0!==i},e.toSJIS=function(t){return i(t)}},46514:(t,e,i)=>{let r=i(8527);e.render=function(t,e,i){var o;let n=i,a=e;void 0!==n||e&&e.getContext||(n=e,e=void 0),e||(a=function(){try{return document.createElement("canvas")}catch(t){throw Error("You need to specify a canvas element")}}()),n=r.getOptions(n);let s=r.getImageWidth(t.modules.size,n),l=a.getContext("2d"),c=l.createImageData(s,s);return r.qrToImageData(c.data,t,n),o=a,l.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px",l.putImageData(c,0,0),a},e.renderToDataURL=function(t,i,r){let o=r;void 0!==o||i&&i.getContext||(o=i,i=void 0),o||(o={});let n=e.render(t,i,o),a=o.type||"image/png",s=o.rendererOpts||{};return n.toDataURL(a,s.quality)}},51392:t=>{"use strict";t.exports=function(t){for(var e=[],i=t.length,r=0;r<i;r++){var o=t.charCodeAt(r);if(o>=55296&&o<=56319&&i>r+1){var n=t.charCodeAt(r+1);n>=56320&&n<=57343&&(o=(o-55296)*1024+n-56320+65536,r+=1)}if(o<128){e.push(o);continue}if(o<2048){e.push(o>>6|192),e.push(63&o|128);continue}if(o<55296||o>=57344&&o<65536){e.push(o>>12|224),e.push(o>>6&63|128),e.push(63&o|128);continue}if(o>=65536&&o<=1114111){e.push(o>>18|240),e.push(o>>12&63|128),e.push(o>>6&63|128),e.push(63&o|128);continue}e.push(239,191,189)}return new Uint8Array(e).buffer}},55908:(t,e,i)=>{let r=i(46087),o=i(58976),n=i(34122),a=i(79621),s=i(37788),l=i(645),c=i(36517),u=i(60519),d=i(60061),h=i(62202),p=i(88252),g=i(43585),w=i(72920);function f(t,e,i){let r,o,n=t.size,a=p.getEncodedBits(e,i);for(r=0;r<15;r++)o=(a>>r&1)==1,r<6?t.set(r,8,o,!0):r<8?t.set(r+1,8,o,!0):t.set(n-15+r,8,o,!0),r<8?t.set(8,n-r-1,o,!0):r<9?t.set(8,15-r-1+1,o,!0):t.set(8,15-r-1,o,!0);t.set(n-8,8,1,!0)}e.create=function(t,e){let i,p;if(void 0===t||""===t)throw Error("No input text");let b=o.M;return void 0!==e&&(b=o.from(e.errorCorrectionLevel,o.M),i=h.from(e.version),p=c.from(e.maskPattern),e.toSJISFunc&&r.setToSJISFunction(e.toSJISFunc)),function(t,e,i,o){let p;if(Array.isArray(t))p=w.fromArray(t);else if("string"==typeof t){let r=e;if(!r){let e=w.rawSplit(t);r=h.getBestVersionForData(e,i)}p=w.fromString(t,r||40)}else throw Error("Invalid data");let b=h.getBestVersionForData(p,i);if(!b)throw Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<b)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+b+".\n")}else e=b;let m=function(t,e,i){let o=new n;i.forEach(function(e){o.put(e.mode.bit,4),o.put(e.getLength(),g.getCharCountIndicator(e.mode,t)),e.write(o)});let a=(r.getSymbolTotalCodewords(t)-u.getTotalCodewordsCount(t,e))*8;for(o.getLengthInBits()+4<=a&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);let s=(a-o.getLengthInBits())/8;for(let t=0;t<s;t++)o.put(t%2?17:236,8);return function(t,e,i){let o,n,a=r.getSymbolTotalCodewords(e),s=a-u.getTotalCodewordsCount(e,i),l=u.getBlocksCount(e,i),c=a%l,h=l-c,p=Math.floor(a/l),g=Math.floor(s/l),w=g+1,f=p-g,b=new d(f),m=0,v=Array(l),y=Array(l),x=0,k=new Uint8Array(t.buffer);for(let t=0;t<l;t++){let e=t<h?g:w;v[t]=k.slice(m,m+e),y[t]=b.encode(v[t]),m+=e,x=Math.max(x,e)}let $=new Uint8Array(a),C=0;for(o=0;o<x;o++)for(n=0;n<l;n++)o<v[n].length&&($[C++]=v[n][o]);for(o=0;o<f;o++)for(n=0;n<l;n++)$[C++]=y[n][o];return $}(o,t,e)}(e,i,p),v=new a(r.getSymbolSize(e));!function(t,e){let i=t.size,r=l.getPositions(e);for(let e=0;e<r.length;e++){let o=r[e][0],n=r[e][1];for(let e=-1;e<=7;e++)if(!(o+e<=-1)&&!(i<=o+e))for(let r=-1;r<=7;r++)n+r<=-1||i<=n+r||(e>=0&&e<=6&&(0===r||6===r)||r>=0&&r<=6&&(0===e||6===e)||e>=2&&e<=4&&r>=2&&r<=4?t.set(o+e,n+r,!0,!0):t.set(o+e,n+r,!1,!0))}}(v,e);let y=v.size;for(let t=8;t<y-8;t++){let e=t%2==0;v.set(t,6,e,!0),v.set(6,t,e,!0)}return!function(t,e){let i=s.getPositions(e);for(let e=0;e<i.length;e++){let r=i[e][0],o=i[e][1];for(let e=-2;e<=2;e++)for(let i=-2;i<=2;i++)-2===e||2===e||-2===i||2===i||0===e&&0===i?t.set(r+e,o+i,!0,!0):t.set(r+e,o+i,!1,!0)}}(v,e),f(v,i,0),e>=7&&function(t,e){let i,r,o,n=t.size,a=h.getEncodedBits(e);for(let e=0;e<18;e++)i=Math.floor(e/3),r=e%3+n-8-3,o=(a>>e&1)==1,t.set(i,r,o,!0),t.set(r,i,o,!0)}(v,e),!function(t,e){let i=t.size,r=-1,o=i-1,n=7,a=0;for(let s=i-1;s>0;s-=2)for(6===s&&s--;;){for(let i=0;i<2;i++)if(!t.isReserved(o,s-i)){let r=!1;a<e.length&&(r=(e[a]>>>n&1)==1),t.set(o,s-i,r),-1==--n&&(a++,n=7)}if((o+=r)<0||i<=o){o-=r,r=-r;break}}}(v,m),isNaN(o)&&(o=c.getBestMask(v,f.bind(null,v,i))),c.applyMask(o,v),f(v,i,o),{modules:v,version:e,errorCorrectionLevel:i,maskPattern:o,segments:p}}(t,i,b,p)}},57354:(t,e)=>{let i=new Uint8Array(512),r=new Uint8Array(256);!function(){let t=1;for(let e=0;e<255;e++)i[e]=t,r[t]=e,256&(t<<=1)&&(t^=285);for(let t=255;t<512;t++)i[t]=i[t-255]}(),e.log=function(t){if(t<1)throw Error("log("+t+")");return r[t]},e.exp=function(t){return i[t]},e.mul=function(t,e){return 0===t||0===e?0:i[r[t]+r[e]]}},58976:(t,e)=>{e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2},e.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},e.from=function(t,i){if(e.isValid(t))return t;try{if("string"!=typeof t)throw Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw Error("Unknown EC Level: "+t)}}catch(t){return i}}},60061:(t,e,i)=>{let r=i(91640);function o(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}o.prototype.initialize=function(t){this.degree=t,this.genPoly=r.generateECPolynomial(this.degree)},o.prototype.encode=function(t){if(!this.genPoly)throw Error("Encoder not initialized");let e=new Uint8Array(t.length+this.degree);e.set(t);let i=r.mod(e,this.genPoly),o=this.degree-i.length;if(o>0){let t=new Uint8Array(this.degree);return t.set(i,o),t}return i},t.exports=o},60519:(t,e,i)=>{let r=i(58976),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(t,e){switch(e){case r.L:return o[(t-1)*4+0];case r.M:return o[(t-1)*4+1];case r.Q:return o[(t-1)*4+2];case r.H:return o[(t-1)*4+3];default:return}},e.getTotalCodewordsCount=function(t,e){switch(e){case r.L:return n[(t-1)*4+0];case r.M:return n[(t-1)*4+1];case r.Q:return n[(t-1)*4+2];case r.H:return n[(t-1)*4+3];default:return}}},62013:(t,e,i)=>{let r=i(8527);function o(t,e){let i=t.a/255,r=e+'="'+t.hex+'"';return i<1?r+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':r}function n(t,e,i){let r=t+e;return void 0!==i&&(r+=" "+i),r}e.render=function(t,e,i){let a=r.getOptions(e),s=t.modules.size,l=t.modules.data,c=s+2*a.margin,u=a.color.light.a?"<path "+o(a.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",d="<path "+o(a.color.dark,"stroke")+' d="'+function(t,e,i){let r="",o=0,a=!1,s=0;for(let l=0;l<t.length;l++){let c=Math.floor(l%e),u=Math.floor(l/e);c||a||(a=!0),t[l]?(s++,l>0&&c>0&&t[l-1]||(r+=a?n("M",c+i,.5+u+i):n("m",o,0),o=0,a=!1),c+1<e&&t[l+1]||(r+=n("h",s),s=0)):o++}return r}(l,s,a.margin)+'"/>',h='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+('viewBox="0 0 '+c+" ")+c+'" shape-rendering="crispEdges">'+u+d+"</svg>\n";return"function"==typeof i&&i(null,h),h}},62202:(t,e,i)=>{let r=i(46087),o=i(60519),n=i(58976),a=i(43585),s=i(29343),l=r.getBCHDigit(7973);function c(t,e){return a.getCharCountIndicator(t,e)+4}e.from=function(t,e){return s.isValid(t)?parseInt(t,10):e},e.getCapacity=function(t,e,i){if(!s.isValid(t))throw Error("Invalid QR Code version");void 0===i&&(i=a.BYTE);let n=(r.getSymbolTotalCodewords(t)-o.getTotalCodewordsCount(t,e))*8;if(i===a.MIXED)return n;let l=n-c(i,t);switch(i){case a.NUMERIC:return Math.floor(l/10*3);case a.ALPHANUMERIC:return Math.floor(l/11*2);case a.KANJI:return Math.floor(l/13);case a.BYTE:default:return Math.floor(l/8)}},e.getBestVersionForData=function(t,i){let r,o=n.from(i,n.M);if(Array.isArray(t)){if(t.length>1){for(let i=1;i<=40;i++)if(function(t,e){let i=0;return t.forEach(function(t){let r=c(t.mode,e);i+=r+t.getBitsLength()}),i}(t,i)<=e.getCapacity(i,o,a.MIXED))return i;return}if(0===t.length)return 1;r=t[0]}else r=t;return function(t,i,r){for(let o=1;o<=40;o++)if(i<=e.getCapacity(o,r,t))return o}(r.mode,r.getLength(),o)},e.getEncodedBits=function(t){if(!s.isValid(t)||t<7)throw Error("Invalid QR Code version");let e=t<<12;for(;r.getBCHDigit(e)-l>=0;)e^=7973<<r.getBCHDigit(e)-l;return t<<12|e}},66444:(t,e,i)=>{let r=i(43585);function o(t){this.mode=r.NUMERIC,this.data=t.toString()}o.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){let e,i,r;for(e=0;e+3<=this.data.length;e+=3)r=parseInt(this.data.substr(e,3),10),t.put(r,10);let o=this.data.length-e;o>0&&(r=parseInt(this.data.substr(e),10),t.put(r,3*o+1))},t.exports=o},69184:(t,e,i)=>{let r=i(43585),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function n(t){this.mode=r.ALPHANUMERIC,this.data=t}n.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let i=45*o.indexOf(this.data[e]);i+=o.indexOf(this.data[e+1]),t.put(i,11)}this.data.length%2&&t.put(o.indexOf(this.data[e]),6)},t.exports=n},72920:(t,e,i)=>{let r=i(43585),o=i(66444),n=i(69184),a=i(87487),s=i(15580),l=i(81685),c=i(46087),u=i(98521);function d(t){return unescape(encodeURIComponent(t)).length}function h(t,e,i){let r,o=[];for(;null!==(r=t.exec(i));)o.push({data:r[0],index:r.index,mode:e,length:r[0].length});return o}function p(t){let e,i,o=h(l.NUMERIC,r.NUMERIC,t),n=h(l.ALPHANUMERIC,r.ALPHANUMERIC,t);return c.isKanjiModeEnabled()?(e=h(l.BYTE,r.BYTE,t),i=h(l.KANJI,r.KANJI,t)):(e=h(l.BYTE_KANJI,r.BYTE,t),i=[]),o.concat(n,e,i).sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function g(t,e){switch(e){case r.NUMERIC:return o.getBitsLength(t);case r.ALPHANUMERIC:return n.getBitsLength(t);case r.KANJI:return s.getBitsLength(t);case r.BYTE:return a.getBitsLength(t)}}function w(t,e){let i,l=r.getBestModeForData(t);if((i=r.from(e,l))!==r.BYTE&&i.bit<l.bit)throw Error('"'+t+'" cannot be encoded with mode '+r.toString(i)+".\n Suggested mode is: "+r.toString(l));switch(i===r.KANJI&&!c.isKanjiModeEnabled()&&(i=r.BYTE),i){case r.NUMERIC:return new o(t);case r.ALPHANUMERIC:return new n(t);case r.KANJI:return new s(t);case r.BYTE:return new a(t)}}e.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(w(e,null)):e.data&&t.push(w(e.data,e.mode)),t},[])},e.fromString=function(t,i){let o=function(t,e){let i={},o={start:{}},n=["start"];for(let a=0;a<t.length;a++){let s=t[a],l=[];for(let t=0;t<s.length;t++){let c=s[t],u=""+a+t;l.push(u),i[u]={node:c,lastCount:0},o[u]={};for(let t=0;t<n.length;t++){let a=n[t];i[a]&&i[a].node.mode===c.mode?(o[a][u]=g(i[a].lastCount+c.length,c.mode)-g(i[a].lastCount,c.mode),i[a].lastCount+=c.length):(i[a]&&(i[a].lastCount=c.length),o[a][u]=g(c.length,c.mode)+4+r.getCharCountIndicator(c.mode,e))}}n=l}for(let t=0;t<n.length;t++)o[n[t]].end=0;return{map:o,table:i}}(function(t){let e=[];for(let i=0;i<t.length;i++){let o=t[i];switch(o.mode){case r.NUMERIC:e.push([o,{data:o.data,mode:r.ALPHANUMERIC,length:o.length},{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.ALPHANUMERIC:e.push([o,{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.KANJI:e.push([o,{data:o.data,mode:r.BYTE,length:d(o.data)}]);break;case r.BYTE:e.push([{data:o.data,mode:r.BYTE,length:d(o.data)}])}}return e}(p(t,c.isKanjiModeEnabled())),i),n=u.find_path(o.map,"start","end"),a=[];for(let t=1;t<n.length-1;t++)a.push(o.table[n[t]].node);return e.fromArray(a.reduce(function(t,e){let i=t.length-1>=0?t[t.length-1]:null;return i&&i.mode===e.mode?t[t.length-1].data+=e.data:t.push(e),t},[]))},e.rawSplit=function(t){return e.fromArray(p(t,c.isKanjiModeEnabled()))}},74097:(t,e,i)=>{"use strict";i.r(e),i.d(e,{W3mAllWalletsView:()=>ez,W3mConnectingWcBasicView:()=>t8,W3mDownloadsView:()=>eZ});var r=i(47514),o=i(10121),n=i(35558),a=i(65819),s=i(96641),l=i(5582),c=i(28898);i(98160);var u=i(7688),d=i(54252),h=i(32836),p=i(19628),g=i(34397),w=i(96504),f=i(99478);let b=t=>t??f.s6;i(58840),i(98750),i(89556);var m=i(97265),v=i(54166);i(43804),i(25322);let y=(0,g.AH)`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var x=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let k=class extends g.WF{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="xxs";return t="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${t});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),(0,g.qy)`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?(0,g.qy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?(0,g.qy)`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:(0,g.qy)`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};k.styles=[m.fD,m.W5,y],x([(0,w.MZ)()],k.prototype,"size",void 0),x([(0,w.MZ)()],k.prototype,"name",void 0),x([(0,w.MZ)()],k.prototype,"imageSrc",void 0),x([(0,w.MZ)()],k.prototype,"walletIcon",void 0),x([(0,w.MZ)({type:Boolean})],k.prototype,"installed",void 0),x([(0,w.MZ)()],k.prototype,"badgeSize",void 0),k=x([(0,v.E)("wui-wallet-image")],k);let $=(0,g.AH)`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var C=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let R=class extends g.WF{constructor(){super(...arguments),this.walletImages=[]}render(){let t=this.walletImages.length<4;return(0,g.qy)`${this.walletImages.slice(0,4).map(({src:t,walletName:e})=>(0,g.qy)`
            <wui-wallet-image
              size="inherit"
              imageSrc=${t}
              name=${b(e)}
            ></wui-wallet-image>
          `)}
      ${t?[...Array(4-this.walletImages.length)].map(()=>(0,g.qy)` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};R.styles=[m.W5,$],C([(0,w.MZ)({type:Array})],R.prototype,"walletImages",void 0),R=C([(0,v.E)("wui-all-wallets-image")],R),i(2745);let E=(0,g.AH)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var I=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let M=class extends g.WF{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return(0,g.qy)`
      <button ?disabled=${this.disabled} tabindex=${b(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?(0,g.qy)` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?(0,g.qy)` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?(0,g.qy)`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:(0,g.qy)`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?(0,g.qy)`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?(0,g.qy)`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?(0,g.qy)`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};M.styles=[m.W5,m.fD,E],I([(0,w.MZ)({type:Array})],M.prototype,"walletImages",void 0),I([(0,w.MZ)()],M.prototype,"imageSrc",void 0),I([(0,w.MZ)()],M.prototype,"name",void 0),I([(0,w.MZ)()],M.prototype,"tagLabel",void 0),I([(0,w.MZ)()],M.prototype,"tagVariant",void 0),I([(0,w.MZ)()],M.prototype,"icon",void 0),I([(0,w.MZ)()],M.prototype,"walletIcon",void 0),I([(0,w.MZ)()],M.prototype,"tabIdx",void 0),I([(0,w.MZ)({type:Boolean})],M.prototype,"installed",void 0),I([(0,w.MZ)({type:Boolean})],M.prototype,"disabled",void 0),I([(0,w.MZ)({type:Boolean})],M.prototype,"showAllWallets",void 0),I([(0,w.MZ)({type:Boolean})],M.prototype,"loading",void 0),I([(0,w.MZ)({type:String})],M.prototype,"loadingSpinnerColor",void 0),M=I([(0,v.E)("wui-list-wallet")],M);var T=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let W=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.count=a.N.state.count,this.filteredCount=a.N.state.filteredWallets.length,this.isFetchingRecommendedWallets=a.N.state.isFetchingRecommendedWallets,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t),a.N.subscribeKey("count",t=>this.count=t),a.N.subscribeKey("filteredWallets",t=>this.filteredCount=t.length),a.N.subscribeKey("isFetchingRecommendedWallets",t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.find(t=>"walletConnect"===t.id),{allWallets:e}=s.H.state;if(!t||"HIDE"===e||"ONLY_MOBILE"===e&&!n.w.isMobile())return null;let i=a.N.state.featured.length,o=this.count+i,l=o<10?o:10*Math.floor(o/10),c=this.filteredCount>0?this.filteredCount:l,d=`${c}`;return this.filteredCount>0?d=`${this.filteredCount}`:c<o&&(d=`${c}+`),(0,r.qy)`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${d}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,u.J)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){h.E.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),p.I.push("AllWallets")}};T([(0,o.MZ)()],W.prototype,"tabIdx",void 0),T([(0,o.wk)()],W.prototype,"connectors",void 0),T([(0,o.wk)()],W.prototype,"count",void 0),T([(0,o.wk)()],W.prototype,"filteredCount",void 0),T([(0,o.wk)()],W.prototype,"isFetchingRecommendedWallets",void 0),W=T([(0,c.EM)("w3m-all-wallets-widget")],W);var P=i(34735),O=i(95842),S=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let q=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.filter(t=>"ANNOUNCED"===t.type);return t?.length?(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${t.filter(O.g.showConnector).map(t=>(0,r.qy)`
              <wui-list-wallet
                imageSrc=${(0,u.J)(P.$.getConnectorImage(t))}
                name=${t.name??"Unknown"}
                @click=${()=>this.onConnector(t)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${t.id}`}
                .installed=${!0}
                tabIdx=${(0,u.J)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){"walletConnect"===t.id?n.w.isMobile()?p.I.push("AllWallets"):p.I.push("ConnectingWalletConnect"):p.I.push("ConnectingExternal",{connector:t})}};S([(0,o.MZ)()],q.prototype,"tabIdx",void 0),S([(0,o.wk)()],q.prototype,"connectors",void 0),q=S([(0,c.EM)("w3m-connect-announced-widget")],q);var A=i(81192),j=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let L=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.loading=!1,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t)),n.w.isTelegram()&&n.w.isIos()&&(this.loading=!A.x.state.wcUri,this.unsubscribe.push(A.x.subscribeKey("wcUri",t=>this.loading=!t)))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let{customWallets:t}=s.H.state;if(!t?.length)return this.style.cssText="display: none",null;let e=this.filterOutDuplicateWallets(t);return(0,r.qy)`<wui-flex flexDirection="column" gap="xs">
      ${e.map(t=>(0,r.qy)`
          <wui-list-wallet
            imageSrc=${(0,u.J)(P.$.getWalletImage(t))}
            name=${t.name??"Unknown"}
            @click=${()=>this.onConnectWallet(t)}
            data-testid=${`wallet-selector-${t.id}`}
            tabIdx=${(0,u.J)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(t){let e=l.i.getRecentWallets(),i=this.connectors.map(t=>t.info?.rdns).filter(Boolean),r=e.map(t=>t.rdns).filter(Boolean),o=i.concat(r);if(o.includes("io.metamask.mobile")&&n.w.isMobile()){let t=o.indexOf("io.metamask.mobile");o[t]="io.metamask"}return t.filter(t=>!o.includes(String(t?.rdns)))}onConnectWallet(t){this.loading||p.I.push("ConnectingWalletConnect",{wallet:t})}};j([(0,o.MZ)()],L.prototype,"tabIdx",void 0),j([(0,o.wk)()],L.prototype,"connectors",void 0),j([(0,o.wk)()],L.prototype,"loading",void 0),L=j([(0,c.EM)("w3m-connect-custom-widget")],L);var z=i(60500),N=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let B=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.filter(t=>"EXTERNAL"===t.type).filter(O.g.showConnector).filter(t=>t.id!==z.o.CONNECTOR_ID.COINBASE_SDK);return t?.length?(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>(0,r.qy)`
            <wui-list-wallet
              imageSrc=${(0,u.J)(P.$.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              data-testid=${`wallet-selector-external-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${(0,u.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){p.I.push("ConnectingExternal",{connector:t})}};N([(0,o.MZ)()],B.prototype,"tabIdx",void 0),N([(0,o.wk)()],B.prototype,"connectors",void 0),B=N([(0,c.EM)("w3m-connect-external-widget")],B);var D=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Z=class extends r.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(t=>(0,r.qy)`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${(0,u.J)(P.$.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${(0,u.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){d.a.selectWalletConnector(t)}};D([(0,o.MZ)()],Z.prototype,"tabIdx",void 0),D([(0,o.MZ)()],Z.prototype,"wallets",void 0),Z=D([(0,c.EM)("w3m-connect-featured-widget")],Z);var U=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let H=class extends r.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){let t=this.connectors.filter(O.g.showConnector);return 0===t.length?(this.style.cssText="display: none",null):(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>(0,r.qy)`
            <wui-list-wallet
              imageSrc=${(0,u.J)(P.$.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${(0,u.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(t){d.a.setActiveConnector(t),p.I.push("ConnectingExternal",{connector:t})}};U([(0,o.MZ)()],H.prototype,"tabIdx",void 0),U([(0,o.MZ)()],H.prototype,"connectors",void 0),H=U([(0,c.EM)("w3m-connect-injected-widget")],H);var F=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let _=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.filter(t=>"MULTI_CHAIN"===t.type&&"WalletConnect"!==t.name);return t?.length?(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>(0,r.qy)`
            <wui-list-wallet
              imageSrc=${(0,u.J)(P.$.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${(0,u.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){d.a.setActiveConnector(t),p.I.push("ConnectingMultiChain")}};F([(0,o.MZ)()],_.prototype,"tabIdx",void 0),F([(0,o.wk)()],_.prototype,"connectors",void 0),_=F([(0,c.EM)("w3m-connect-multi-chain-widget")],_);var J=i(90906),K=i(98782),V=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Y=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.loading=!1,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t)),n.w.isTelegram()&&n.w.isIos()&&(this.loading=!A.x.state.wcUri,this.unsubscribe.push(A.x.subscribeKey("wcUri",t=>this.loading=!t)))}render(){let t=l.i.getRecentWallets().filter(t=>!K.A.isExcluded(t)).filter(t=>!this.hasWalletConnector(t)).filter(t=>this.isWalletCompatibleWithCurrentChain(t));return t.length?(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>(0,r.qy)`
            <wui-list-wallet
              imageSrc=${(0,u.J)(P.$.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,u.J)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){this.loading||d.a.selectWalletConnector(t)}hasWalletConnector(t){return this.connectors.some(e=>e.id===t.id||e.name===t.name)}isWalletCompatibleWithCurrentChain(t){let e=J.W.state.activeChain;return!e||!t.chains||t.chains.some(t=>e===t.split(":")[0])}};V([(0,o.MZ)()],Y.prototype,"tabIdx",void 0),V([(0,o.wk)()],Y.prototype,"connectors",void 0),V([(0,o.wk)()],Y.prototype,"loading",void 0),Y=V([(0,c.EM)("w3m-connect-recent-widget")],Y);var G=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Q=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,n.w.isTelegram()&&n.w.isIos()&&(this.loading=!A.x.state.wcUri,this.unsubscribe.push(A.x.subscribeKey("wcUri",t=>this.loading=!t)))}render(){let{connectors:t}=d.a.state,{customWallets:e,featuredWalletIds:i}=s.H.state,o=l.i.getRecentWallets(),n=t.find(t=>"walletConnect"===t.id),a=t.filter(t=>"INJECTED"===t.type||"ANNOUNCED"===t.type||"MULTI_CHAIN"===t.type).filter(t=>"Browser Wallet"!==t.name);if(!n)return null;if(i||e||!this.wallets.length)return this.style.cssText="display: none",null;let c=Math.max(0,2-(a.length+o.length)),h=K.A.filterOutDuplicateWallets(this.wallets).slice(0,c);return h.length?(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${h.map(t=>(0,r.qy)`
            <wui-list-wallet
              imageSrc=${(0,u.J)(P.$.getWalletImage(t))}
              name=${t?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${(0,u.J)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){if(this.loading)return;let e=d.a.getConnector(t.id,t.rdns);e?p.I.push("ConnectingExternal",{connector:e}):p.I.push("ConnectingWalletConnect",{wallet:t})}};G([(0,o.MZ)()],Q.prototype,"tabIdx",void 0),G([(0,o.MZ)()],Q.prototype,"wallets",void 0),G([(0,o.wk)()],Q.prototype,"loading",void 0),Q=G([(0,c.EM)("w3m-connect-recommended-widget")],Q);var X=i(74623),tt=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let te=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.connectorImages=X.j.state.connectorImages,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t),X.j.subscribeKey("connectorImages",t=>this.connectorImages=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(n.w.isMobile())return this.style.cssText="display: none",null;let t=this.connectors.find(t=>"walletConnect"===t.id);if(!t)return this.style.cssText="display: none",null;let e=t.imageUrl||this.connectorImages[t?.imageId??""];return(0,r.qy)`
      <wui-list-wallet
        imageSrc=${(0,u.J)(e)}
        name=${t.name??"Unknown"}
        @click=${()=>this.onConnector(t)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,u.J)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(t){d.a.setActiveConnector(t),p.I.push("ConnectingWalletConnect")}};tt([(0,o.MZ)()],te.prototype,"tabIdx",void 0),tt([(0,o.wk)()],te.prototype,"connectors",void 0),tt([(0,o.wk)()],te.prototype,"connectorImages",void 0),te=tt([(0,c.EM)("w3m-connect-walletconnect-widget")],te);let ti=(0,r.AH)`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var tr=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let to=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=d.a.state.connectors,this.recommended=a.N.state.recommended,this.featured=a.N.state.featured,this.unsubscribe.push(d.a.subscribeKey("connectors",t=>this.connectors=t),a.N.subscribeKey("recommended",t=>this.recommended=t),a.N.subscribeKey("featured",t=>this.featured=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return(0,r.qy)`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){let{custom:t,recent:e,announced:i,injected:o,multiChain:n,recommended:a,featured:s,external:l}=O.g.getConnectorsByType(this.connectors,this.recommended,this.featured);return O.g.getConnectorTypeOrder({custom:t,recent:e,announced:i,injected:o,multiChain:n,recommended:a,featured:s,external:l}).map(t=>{switch(t){case"injected":return(0,r.qy)`
            ${n.length?(0,r.qy)`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,u.J)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?(0,r.qy)`<w3m-connect-announced-widget
                  tabIdx=${(0,u.J)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?(0,r.qy)`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${(0,u.J)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return(0,r.qy)`<w3m-connect-walletconnect-widget
            tabIdx=${(0,u.J)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return(0,r.qy)`<w3m-connect-recent-widget
            tabIdx=${(0,u.J)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return(0,r.qy)`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${(0,u.J)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return(0,r.qy)`<w3m-connect-custom-widget
            tabIdx=${(0,u.J)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return(0,r.qy)`<w3m-connect-external-widget
            tabIdx=${(0,u.J)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return(0,r.qy)`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${(0,u.J)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${t}`),null}})}};to.styles=ti,tr([(0,o.MZ)()],to.prototype,"tabIdx",void 0),tr([(0,o.wk)()],to.prototype,"connectors",void 0),tr([(0,o.wk)()],to.prototype,"recommended",void 0),tr([(0,o.wk)()],to.prototype,"featured",void 0),to=tr([(0,c.EM)("w3m-connector-list")],to);var tn=i(40166),ta=i(5517);let ts=(0,g.AH)`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var tl=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tc=class extends g.WF{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((t,e)=>{let i=e===this.activeTab;return(0,g.qy)`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(e)}
          data-active=${i}
          data-testid="tab-${t.label?.toLowerCase()}"
        >
          ${this.iconTemplate(t)}
          <wui-text variant="small-600" color="inherit"> ${t.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(t){return t.icon?(0,g.qy)`<wui-icon size="xs" color="inherit" name=${t.icon}></wui-icon>`:null}onTabClick(t){this.buttons&&this.animateTabs(t,!1),this.activeTab=t,this.onTabChange(t)}animateTabs(t,e){let i=this.buttons[this.activeTab],r=this.buttons[t],o=i?.querySelector("wui-text"),n=r?.querySelector("wui-text"),a=r?.getBoundingClientRect(),s=n?.getBoundingClientRect();i&&o&&!e&&t!==this.activeTab&&(o.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),r&&a&&s&&n&&(t!==this.activeTab||e)&&(this.localTabWidth=`${Math.round(a.width+s.width)+6}px`,r.animate([{width:`${a.width+s.width}px`}],{duration:500*!e,fill:"forwards",easing:"ease"}),n.animate([{opacity:1}],{duration:125*!e,delay:200*!e,fill:"forwards",easing:"ease"}))}};tc.styles=[m.W5,m.fD,ts],tl([(0,w.MZ)({type:Array})],tc.prototype,"tabs",void 0),tl([(0,w.MZ)()],tc.prototype,"onTabChange",void 0),tl([(0,w.MZ)({type:Array})],tc.prototype,"buttons",void 0),tl([(0,w.MZ)({type:Boolean})],tc.prototype,"disabled",void 0),tl([(0,w.MZ)()],tc.prototype,"localTabWidth",void 0),tl([(0,w.wk)()],tc.prototype,"activeTab",void 0),tl([(0,w.wk)()],tc.prototype,"isDense",void 0),tc=tl([(0,v.E)("wui-tabs")],tc);var tu=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let td=class extends r.WF{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.generateTabs();return(0,r.qy)`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${t} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let t=this.platforms.map(t=>{if("browser"===t)return{label:"Browser",icon:"extension",platform:"browser"};if("mobile"===t)return{label:"Mobile",icon:"mobile",platform:"mobile"};if("qrcode"===t)return{label:"Mobile",icon:"mobile",platform:"qrcode"};if("web"===t)return{label:"Webapp",icon:"browser",platform:"web"};if("desktop"===t)return{label:"Desktop",icon:"desktop",platform:"desktop"};return{label:"Browser",icon:"extension",platform:"unsupported"}});return this.platformTabs=t.map(({platform:t})=>t),t}onTabChange(t){let e=this.platformTabs[t];e&&this.onSelectPlatfrom?.(e)}};tu([(0,o.MZ)({type:Array})],td.prototype,"platforms",void 0),tu([(0,o.MZ)()],td.prototype,"onSelectPlatfrom",void 0),td=tu([(0,c.EM)("w3m-connecting-header")],td);var th=i(7478);i(4537);let tp=(0,g.AH)`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var tg=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tw={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},tf={lg:"paragraph-600",md:"small-600"},tb={lg:"md",md:"md"},tm=class extends g.WF{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${+!this.loading};
    --local-opacity-000: ${+!!this.loading};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let t=this.textVariant??tf[this.size];return(0,g.qy)`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let t=tb[this.size],e=this.disabled?tw.disabled:tw[this.variant];return(0,g.qy)`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return(0,g.qy)``}};tm.styles=[m.W5,m.fD,tp],tg([(0,w.MZ)()],tm.prototype,"size",void 0),tg([(0,w.MZ)({type:Boolean})],tm.prototype,"disabled",void 0),tg([(0,w.MZ)({type:Boolean})],tm.prototype,"fullWidth",void 0),tg([(0,w.MZ)({type:Boolean})],tm.prototype,"loading",void 0),tg([(0,w.MZ)()],tm.prototype,"variant",void 0),tg([(0,w.MZ)({type:Boolean})],tm.prototype,"hasIconLeft",void 0),tg([(0,w.MZ)({type:Boolean})],tm.prototype,"hasIconRight",void 0),tg([(0,w.MZ)()],tm.prototype,"borderRadius",void 0),tg([(0,w.MZ)()],tm.prototype,"textVariant",void 0),tm=tg([(0,v.E)("wui-button")],tm),i(21330);let tv=(0,g.AH)`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var ty=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tx=class extends g.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return(0,g.qy)`
      <button ?disabled=${this.disabled} tabindex=${b(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};tx.styles=[m.W5,m.fD,tv],ty([(0,w.MZ)()],tx.prototype,"tabIdx",void 0),ty([(0,w.MZ)({type:Boolean})],tx.prototype,"disabled",void 0),ty([(0,w.MZ)()],tx.prototype,"color",void 0),tx=ty([(0,v.E)("wui-link")],tx);let tk=(0,g.AH)`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var t$=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tC=class extends g.WF{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let t=this.radius>50?50:this.radius,e=36-t;return(0,g.qy)`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${116+e} ${245+e}"
          stroke-dashoffset=${360+1.75*e}
        />
      </svg>
    `}};tC.styles=[m.W5,tk],t$([(0,w.MZ)({type:Number})],tC.prototype,"radius",void 0),tC=t$([(0,v.E)("wui-loading-thumbnail")],tC),i(22724);let tR=(0,g.AH)`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var tE=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tI=class extends g.WF{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let t="sm"===this.size?"small-600":"paragraph-600";return(0,g.qy)`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?(0,g.qy)`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${t} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};tI.styles=[m.W5,m.fD,tR],tE([(0,w.MZ)()],tI.prototype,"variant",void 0),tE([(0,w.MZ)()],tI.prototype,"imageSrc",void 0),tE([(0,w.MZ)({type:Boolean})],tI.prototype,"disabled",void 0),tE([(0,w.MZ)()],tI.prototype,"icon",void 0),tE([(0,w.MZ)()],tI.prototype,"size",void 0),tE([(0,w.MZ)()],tI.prototype,"text",void 0),tI=tE([(0,v.E)("wui-chip-button")],tI);let tM=(0,g.AH)`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var tT=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tW=class extends g.WF{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return(0,g.qy)`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};tW.styles=[m.W5,m.fD,tM],tT([(0,w.MZ)({type:Boolean})],tW.prototype,"disabled",void 0),tT([(0,w.MZ)()],tW.prototype,"label",void 0),tT([(0,w.MZ)()],tW.prototype,"buttonLabel",void 0),tW=tT([(0,v.E)("wui-cta-button")],tW);let tP=(0,r.AH)`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var tO=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tS=class extends r.WF{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:t,app_store:e,play_store:i,chrome_store:o,homepage:a}=this.wallet,s=n.w.isMobile(),l=n.w.isIos(),u=n.w.isAndroid(),d=[e,i,a,o].filter(Boolean).length>1,h=c.Zv.getTruncateString({string:t,charsStart:12,charsEnd:0,truncate:"end"});return d&&!s?(0,r.qy)`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>p.I.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&a?(0,r.qy)`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:e&&l?(0,r.qy)`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&u?(0,r.qy)`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&n.w.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&n.w.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&n.w.openHref(this.wallet.homepage,"_blank")}};tS.styles=[tP],tO([(0,o.MZ)({type:Object})],tS.prototype,"wallet",void 0),tS=tO([(0,c.EM)("w3m-mobile-download-links")],tS);let tq=(0,r.AH)`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var tA=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};class tj extends r.WF{constructor(){super(),this.wallet=p.I.state.data?.wallet,this.connector=p.I.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=P.$.getWalletImage(this.wallet)??P.$.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=A.x.state.wcUri,this.error=A.x.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(A.x.subscribeKey("wcUri",t=>{this.uri=t,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),A.x.subscribeKey("wcError",t=>this.error=t)),(n.w.isTelegram()||n.w.isSafari())&&n.w.isIos()&&A.x.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),A.x.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let t=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,e=`Continue in ${this.name}`;return this.error&&(e="Connection declined"),(0,r.qy)`
      <wui-flex
        data-error=${(0,u.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,u.J)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?(0,r.qy)`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?(0,r.qy)`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let t=this.shadowRoot?.querySelector("wui-button");t?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){A.x.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let t=th.W.state.themeVariables["--w3m-border-radius-master"],e=t?parseInt(t.replace("px",""),10):4;return(0,r.qy)`<wui-loading-thumbnail radius=${9*e}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(n.w.copyToClopboard(this.uri),ta.P.showSuccess("Link copied"))}catch{ta.P.showError("Failed to copy")}}}tj.styles=tq,tA([(0,o.wk)()],tj.prototype,"isRetrying",void 0),tA([(0,o.wk)()],tj.prototype,"uri",void 0),tA([(0,o.wk)()],tj.prototype,"error",void 0),tA([(0,o.wk)()],tj.prototype,"ready",void 0),tA([(0,o.wk)()],tj.prototype,"showRetry",void 0),tA([(0,o.wk)()],tj.prototype,"secondaryBtnLabel",void 0),tA([(0,o.wk)()],tj.prototype,"secondaryLabel",void 0),tA([(0,o.wk)()],tj.prototype,"isLoading",void 0),tA([(0,o.MZ)({type:Boolean})],tj.prototype,"isMobile",void 0),tA([(0,o.MZ)()],tj.prototype,"onRetry",void 0);let tL=class extends tj{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),h.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;let{connectors:t}=d.a.state,e=t.find(t=>"ANNOUNCED"===t.type&&t.info?.rdns===this.wallet?.rdns||"INJECTED"===t.type||t.name===this.wallet?.name);if(e)await A.x.connectExternal(e,e.chain);else throw Error("w3m-connecting-wc-browser: No connector found");tn.W.close(),h.E.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(t){h.E.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:t?.message??"Unknown"}}),this.error=!0}}};tL=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.EM)("w3m-connecting-wc-browser")],tL);let tz=class extends tj{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),h.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:t,name:e}=this.wallet,{redirect:i,href:r}=n.w.formatNativeUrl(t,this.uri);A.x.setWcLinking({name:e,href:r}),A.x.setRecentWallet(this.wallet),n.w.openHref(i,"_blank")}catch{this.error=!0}}};tz=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.EM)("w3m-connecting-wc-desktop")],tz);var tN=i(76610),tB=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tD=class extends tj{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=s.H.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:t,link_mode:e,name:i}=this.wallet,{redirect:r,redirectUniversalLink:o,href:a}=n.w.formatNativeUrl(t,this.uri,e);this.redirectDeeplink=r,this.redirectUniversalLink=o,this.target=n.w.isIframe()?"_top":"_self",A.x.setWcLinking({name:i,href:a}),A.x.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?n.w.openHref(this.redirectUniversalLink,this.target):n.w.openHref(this.redirectDeeplink,this.target)}catch(t){h.E.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:t instanceof Error?t.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=tN.oU.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(A.x.subscribeKey("wcUri",()=>{this.onHandleURI()})),h.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){A.x.setWcError(!1),this.onConnect?.()}};tB([(0,o.wk)()],tD.prototype,"redirectDeeplink",void 0),tB([(0,o.wk)()],tD.prototype,"redirectUniversalLink",void 0),tB([(0,o.wk)()],tD.prototype,"target",void 0),tB([(0,o.wk)()],tD.prototype,"preferUniversalLinks",void 0),tB([(0,o.wk)()],tD.prototype,"isLoading",void 0),tD=tB([(0,c.EM)("w3m-connecting-wc-mobile")],tD);var tZ=i(16862);function tU(t,e,i){return t!==e&&(t-e<0?e-t:t-e)<=i+.1}let tH={generate({uri:t,size:e,logoSize:i,dotColor:r="#141414"}){let o=[],n=function(t,e){let i=Array.prototype.slice.call(tZ.create(t,{errorCorrectionLevel:"Q"}).modules.data,0),r=Math.sqrt(i.length);return i.reduce((t,e,i)=>(i%r==0?t.push([e]):t[t.length-1].push(e))&&t,[])}(t,0),a=e/n.length,s=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];s.forEach(({x:t,y:e})=>{let i=(n.length-7)*a*t,l=(n.length-7)*a*e;for(let t=0;t<s.length;t+=1){let e=a*(7-2*t);o.push((0,g.JW)`
            <rect
              fill=${2===t?r:"transparent"}
              width=${0===t?e-5:e}
              rx= ${0===t?(e-5)*.45:.45*e}
              ry= ${0===t?(e-5)*.45:.45*e}
              stroke=${r}
              stroke-width=${5*(0===t)}
              height=${0===t?e-5:e}
              x= ${0===t?l+a*t+2.5:l+a*t}
              y= ${0===t?i+a*t+2.5:i+a*t}
            />
          `)}});let l=Math.floor((i+25)/a),c=n.length/2-l/2,u=n.length/2+l/2-1,d=[];n.forEach((t,e)=>{t.forEach((t,i)=>{!n[e][i]||e<7&&i<7||e>n.length-8&&i<7||e<7&&i>n.length-8||e>c&&e<u&&i>c&&i<u||d.push([e*a+a/2,i*a+a/2])})});let h={};return d.forEach(([t,e])=>{h[t]?h[t]?.push(e):h[t]=[e]}),Object.entries(h).map(([t,e])=>{let i=e.filter(t=>e.every(e=>!tU(t,e,a)));return[Number(t),i]}).forEach(([t,e])=>{e.forEach(e=>{o.push((0,g.JW)`<circle cx=${t} cy=${e} fill=${r} r=${a/2.5} />`)})}),Object.entries(h).filter(([t,e])=>e.length>1).map(([t,e])=>{let i=e.filter(t=>e.some(e=>tU(t,e,a)));return[Number(t),i]}).map(([t,e])=>{e.sort((t,e)=>t<e?-1:1);let i=[];for(let t of e){let e=i.find(e=>e.some(e=>tU(t,e,a)));e?e.push(t):i.push([t])}return[t,i.map(t=>[t[0],t[t.length-1]])]}).forEach(([t,e])=>{e.forEach(([e,i])=>{o.push((0,g.JW)`
              <line
                x1=${t}
                x2=${t}
                y1=${e}
                y2=${i}
                stroke=${r}
                stroke-width=${a/1.25}
                stroke-linecap="round"
              />
            `)})}),o}},tF=(0,g.AH)`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var t_=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tJ=class extends g.WF{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??"#3396ff"}
    `,(0,g.qy)`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){let t="light"===this.theme?this.size:this.size-32;return(0,g.JW)`
      <svg height=${t} width=${t}>
        ${tH.generate({uri:this.uri,size:t,logoSize:this.arenaClear?0:t/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?(0,g.qy)`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?(0,g.qy)`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:(0,g.qy)`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};tJ.styles=[m.W5,tF],t_([(0,w.MZ)()],tJ.prototype,"uri",void 0),t_([(0,w.MZ)({type:Number})],tJ.prototype,"size",void 0),t_([(0,w.MZ)()],tJ.prototype,"theme",void 0),t_([(0,w.MZ)()],tJ.prototype,"imageSrc",void 0),t_([(0,w.MZ)()],tJ.prototype,"alt",void 0),t_([(0,w.MZ)()],tJ.prototype,"color",void 0),t_([(0,w.MZ)({type:Boolean})],tJ.prototype,"arenaClear",void 0),t_([(0,w.MZ)({type:Boolean})],tJ.prototype,"farcaster",void 0),tJ=t_([(0,v.E)("wui-qr-code")],tJ);let tK=(0,g.AH)`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var tV=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tY=class extends g.WF{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,(0,g.qy)`<slot></slot>`}};tY.styles=[tK],tV([(0,w.MZ)()],tY.prototype,"width",void 0),tV([(0,w.MZ)()],tY.prototype,"height",void 0),tV([(0,w.MZ)()],tY.prototype,"borderRadius",void 0),tV([(0,w.MZ)()],tY.prototype,"variant",void 0),tY=tV([(0,v.E)("wui-shimmer")],tY);let tG=(0,g.AH)`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`,tQ=class extends g.WF{render(){return(0,g.qy)`
      <a
        data-testid="ux-branding-reown"
        href=${"https://reown.com"}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};tQ.styles=[m.W5,m.fD,tG],tQ=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,v.E)("wui-ux-by-reown")],tQ);let tX=(0,r.AH)`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`,t0=class extends tj{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),h.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(t=>t()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),(0,r.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let t=this.getBoundingClientRect().width-40,e=this.wallet?this.wallet.name:void 0;return A.x.setWcLinking(void 0),A.x.setRecentWallet(this.wallet),(0,r.qy)` <wui-qr-code
      size=${t}
      theme=${th.W.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,u.J)(P.$.getWalletImage(this.wallet))}
      color=${(0,u.J)(th.W.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,u.J)(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let t=!this.uri||!this.ready;return(0,r.qy)`<wui-link
      .disabled=${t}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};t0.styles=tX,t0=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.EM)("w3m-connecting-wc-qrcode")],t0);let t1=class extends r.WF{constructor(){if(super(),this.wallet=p.I.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");h.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return(0,r.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,u.J)(P.$.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};t1=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.EM)("w3m-connecting-wc-unsupported")],t1);var t3=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t2=class extends tj{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=tN.oU.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(A.x.subscribeKey("wcUri",()=>{this.updateLoadingState()})),h.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:t,name:e}=this.wallet,{redirect:i,href:r}=n.w.formatUniversalUrl(t,this.uri);A.x.setWcLinking({name:e,href:r}),A.x.setRecentWallet(this.wallet),n.w.openHref(i,"_blank")}catch{this.error=!0}}};t3([(0,o.wk)()],t2.prototype,"isLoading",void 0),t2=t3([(0,c.EM)("w3m-connecting-wc-web")],t2);var t5=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t4=class extends r.WF{constructor(){super(),this.wallet=p.I.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!s.H.state.siwx,this.remoteFeatures=s.H.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(s.H.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return(0,r.qy)`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?(0,r.qy)`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(t=!1){if("browser"!==this.platform&&(!s.H.state.manualWCControl||t))try{let{wcPairingExpiry:e,status:i}=A.x.state;(t||s.H.state.enableEmbedded||n.w.isPairingExpired(e)||"connecting"===i)&&(await A.x.connectWalletConnect(),this.isSiwxEnabled||tn.W.close())}catch(t){h.E.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:t?.message??"Unknown"}}),A.x.setWcError(!0),ta.P.showError(t.message??"Connection error"),A.x.resetWcConnection(),p.I.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:t,desktop_link:e,webapp_link:i,injected:r,rdns:o}=this.wallet,a=r?.map(({injected_id:t})=>t).filter(Boolean),l=[...o?[o]:a??[]],c=!s.H.state.isUniversalProvider&&l.length,u=A.x.checkInstalled(l),d=c&&u,h=e&&!n.w.isMobile();d&&!J.W.state.noAdapters&&this.platforms.push("browser"),t&&this.platforms.push(n.w.isMobile()?"mobile":"qrcode"),i&&this.platforms.push("web"),h&&this.platforms.push("desktop"),d||!c||J.W.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return(0,r.qy)`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return(0,r.qy)`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return(0,r.qy)`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return(0,r.qy)`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return(0,r.qy)`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return(0,r.qy)`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?(0,r.qy)`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(t){let e=this.shadowRoot?.querySelector("div");e&&(await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=t,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};t5([(0,o.wk)()],t4.prototype,"platform",void 0),t5([(0,o.wk)()],t4.prototype,"platforms",void 0),t5([(0,o.wk)()],t4.prototype,"isSiwxEnabled",void 0),t5([(0,o.wk)()],t4.prototype,"remoteFeatures",void 0),t4=t5([(0,c.EM)("w3m-connecting-wc-view")],t4);var t6=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t8=class extends r.WF{constructor(){super(...arguments),this.isMobile=n.w.isMobile()}render(){if(this.isMobile){let{featured:t,recommended:e}=a.N.state,{customWallets:i}=s.H.state,o=l.i.getRecentWallets(),n=t.length||e.length||i?.length||o.length;return(0,r.qy)`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${n?(0,r.qy)`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return(0,r.qy)`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};t6([(0,o.wk)()],t8.prototype,"isMobile",void 0),t8=t6([(0,c.EM)("w3m-connecting-wc-basic-view")],t8);var t7=i(69405),t9=i(39784);let et=()=>new ee;class ee{}let ei=new WeakMap,er=(0,t9.u$)(class extends t7.Kq{render(t){return f.s6}update(t,[e]){let i=e!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),f.s6}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){let e=this.ht??globalThis,i=ei.get(e);void 0===i&&(i=new WeakMap,ei.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?ei.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),eo=(0,g.AH)`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var en=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ea=class extends g.WF{constructor(){super(...arguments),this.inputElementRef=et(),this.checked=void 0}render(){return(0,g.qy)`
      <label>
        <input
          ${er(this.inputElementRef)}
          type="checkbox"
          ?checked=${b(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};ea.styles=[m.W5,m.fD,m.ck,eo],en([(0,w.MZ)({type:Boolean})],ea.prototype,"checked",void 0),ea=en([(0,v.E)("wui-switch")],ea);let es=(0,g.AH)`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var el=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ec=class extends g.WF{constructor(){super(...arguments),this.checked=void 0}render(){return(0,g.qy)`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${b(this.checked)}></wui-switch>
      </button>
    `}};ec.styles=[m.W5,m.fD,es],el([(0,w.MZ)({type:Boolean})],ec.prototype,"checked",void 0),ec=el([(0,v.E)("wui-certified-switch")],ec);let eu=(0,g.AH)`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var ed=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eh=class extends g.WF{constructor(){super(...arguments),this.icon="copy"}render(){return(0,g.qy)`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};eh.styles=[m.W5,m.fD,eu],ed([(0,w.MZ)()],eh.prototype,"icon",void 0),eh=ed([(0,v.E)("wui-input-element")],eh);var ep=i(13455);let eg=(0,g.AH)`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var ew=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ef=class extends g.WF{constructor(){super(...arguments),this.inputElementRef=et(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){let t=`wui-padding-right-${this.inputRightPadding}`,e={[`wui-size-${this.size}`]:!0,[t]:!!this.inputRightPadding};return(0,g.qy)`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${er(this.inputElementRef)}
        class=${(0,ep.H)(e)}
        type=${this.type}
        enterkeyhint=${b(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${b(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?(0,g.qy)`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};ef.styles=[m.W5,m.fD,eg],ew([(0,w.MZ)()],ef.prototype,"size",void 0),ew([(0,w.MZ)()],ef.prototype,"icon",void 0),ew([(0,w.MZ)({type:Boolean})],ef.prototype,"disabled",void 0),ew([(0,w.MZ)()],ef.prototype,"placeholder",void 0),ew([(0,w.MZ)()],ef.prototype,"type",void 0),ew([(0,w.MZ)()],ef.prototype,"keyHint",void 0),ew([(0,w.MZ)()],ef.prototype,"value",void 0),ew([(0,w.MZ)()],ef.prototype,"inputRightPadding",void 0),ew([(0,w.MZ)()],ef.prototype,"tabIdx",void 0),ef=ew([(0,v.E)("wui-input-text")],ef);let eb=(0,g.AH)`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`,em=class extends g.WF{constructor(){super(...arguments),this.inputComponentRef=et()}render(){return(0,g.qy)`
      <wui-input-text
        ${er(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){let t=this.inputComponentRef.value,e=t?.inputElementRef.value;e&&(e.value="",e.focus(),e.dispatchEvent(new Event("input")))}};em.styles=[m.W5,eb],em=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,v.E)("wui-search-bar")],em);let ev=(0,g.JW)`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,ey=(0,g.AH)`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var ex=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ek=class extends g.WF{constructor(){super(...arguments),this.type="wallet"}render(){return(0,g.qy)`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?(0,g.qy)` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${ev}`:(0,g.qy)`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};ek.styles=[m.W5,m.fD,ey],ex([(0,w.MZ)()],ek.prototype,"type",void 0),ek=ex([(0,v.E)("wui-card-select-loader")],ek);var e$=i(59970);let eC=(0,g.AH)`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var eR=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eE=class extends g.WF{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&e$.Z.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&e$.Z.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&e$.Z.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&e$.Z.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&e$.Z.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&e$.Z.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&e$.Z.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&e$.Z.getSpacingStyles(this.margin,3)};
    `,(0,g.qy)`<slot></slot>`}};eE.styles=[m.W5,eC],eR([(0,w.MZ)()],eE.prototype,"gridTemplateRows",void 0),eR([(0,w.MZ)()],eE.prototype,"gridTemplateColumns",void 0),eR([(0,w.MZ)()],eE.prototype,"justifyItems",void 0),eR([(0,w.MZ)()],eE.prototype,"alignItems",void 0),eR([(0,w.MZ)()],eE.prototype,"justifyContent",void 0),eR([(0,w.MZ)()],eE.prototype,"alignContent",void 0),eR([(0,w.MZ)()],eE.prototype,"columnGap",void 0),eR([(0,w.MZ)()],eE.prototype,"rowGap",void 0),eR([(0,w.MZ)()],eE.prototype,"gap",void 0),eR([(0,w.MZ)()],eE.prototype,"padding",void 0),eR([(0,w.MZ)()],eE.prototype,"margin",void 0),eE=eR([(0,v.E)("wui-grid")],eE);let eI=(0,r.AH)`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var eM=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eT=class extends r.WF{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let t=this.wallet?.badge_type==="certified";return(0,r.qy)`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,u.J)(t?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${t?(0,r.qy)`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?(0,r.qy)`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,u.J)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return(0,r.qy)`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=P.$.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await P.$.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};eT.styles=eI,eM([(0,o.wk)()],eT.prototype,"visible",void 0),eM([(0,o.wk)()],eT.prototype,"imageSrc",void 0),eM([(0,o.wk)()],eT.prototype,"imageLoading",void 0),eM([(0,o.MZ)()],eT.prototype,"wallet",void 0),eT=eM([(0,c.EM)("w3m-all-wallets-list-item")],eT);let eW=(0,r.AH)`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var eP=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eO="local-paginator",eS=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!a.N.state.wallets.length,this.wallets=a.N.state.wallets,this.recommended=a.N.state.recommended,this.featured=a.N.state.featured,this.filteredWallets=a.N.state.filteredWallets,this.unsubscribe.push(a.N.subscribeKey("wallets",t=>this.wallets=t),a.N.subscribeKey("recommended",t=>this.recommended=t),a.N.subscribeKey("featured",t=>this.featured=t),a.N.subscribeKey("filteredWallets",t=>this.filteredWallets=t))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.paginationObserver?.disconnect()}render(){return(0,r.qy)`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let t=this.shadowRoot?.querySelector("wui-grid");t&&(await a.N.fetchWalletsByPage({page:1}),await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(t,e){return[...Array(t)].map(()=>(0,r.qy)`
        <wui-card-select-loader type="wallet" id=${(0,u.J)(e)}></wui-card-select-loader>
      `)}walletsTemplate(){let t=this.filteredWallets?.length>0?n.w.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):n.w.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return K.A.markWalletsAsInstalled(t).map(t=>(0,r.qy)`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(t)}
          .wallet=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:t,recommended:e,featured:i,count:r}=a.N.state,o=window.innerWidth<352?3:4,n=t.length+e.length,s=Math.ceil(n/o)*o-n+o;return(s-=t.length?i.length%o:0,0===r&&i.length>0)?null:0===r||[...i,...t,...e].length<r?this.shimmerTemplate(s,eO):null}createPaginationObserver(){let t=this.shadowRoot?.querySelector(`#${eO}`);t&&(this.paginationObserver=new IntersectionObserver(([t])=>{if(t?.isIntersecting&&!this.loading){let{page:t,count:e,wallets:i}=a.N.state;i.length<e&&a.N.fetchWalletsByPage({page:t+1})}}),this.paginationObserver.observe(t))}onConnectWallet(t){d.a.selectWalletConnector(t)}};eS.styles=eW,eP([(0,o.wk)()],eS.prototype,"loading",void 0),eP([(0,o.wk)()],eS.prototype,"wallets",void 0),eP([(0,o.wk)()],eS.prototype,"recommended",void 0),eP([(0,o.wk)()],eS.prototype,"featured",void 0),eP([(0,o.wk)()],eS.prototype,"filteredWallets",void 0),eS=eP([(0,c.EM)("w3m-all-wallets-list")],eS);let eq=(0,r.AH)`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var eA=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ej=class extends r.WF{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?(0,r.qy)`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await a.N.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:t}=a.N.state,e=K.A.markWalletsAsInstalled(t);return t.length?(0,r.qy)`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${e.map(t=>(0,r.qy)`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(t)}
              .wallet=${t}
              data-testid="wallet-search-item-${t.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:(0,r.qy)`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(t){d.a.selectWalletConnector(t)}};ej.styles=eq,eA([(0,o.wk)()],ej.prototype,"loading",void 0),eA([(0,o.MZ)()],ej.prototype,"query",void 0),eA([(0,o.MZ)()],ej.prototype,"badge",void 0),ej=eA([(0,c.EM)("w3m-all-wallets-search")],ej);var eL=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ez=class extends r.WF{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=n.w.debounce(t=>{this.search=t})}render(){let t=this.search.length>=2;return(0,r.qy)`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${t||this.badge?(0,r.qy)`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,u.J)(this.badge)}
          ></w3m-all-wallets-search>`:(0,r.qy)`<w3m-all-wallets-list badge=${(0,u.J)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onClick(){if("certified"===this.badge){this.badge=void 0;return}this.badge="certified",ta.P.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return n.w.isMobile()?(0,r.qy)`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){p.I.push("ConnectingWalletConnect")}};eL([(0,o.wk)()],ez.prototype,"search",void 0),eL([(0,o.wk)()],ez.prototype,"badge",void 0),ez=eL([(0,c.EM)("w3m-all-wallets-view")],ez);let eN=(0,g.AH)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var eB=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eD=class extends g.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return(0,g.qy)`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${b(this.iconVariant)}
        tabindex=${b(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return(0,g.qy)`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return(0,g.qy)`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){let t=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",e="square-blue"===this.iconVariant?"mdl":"md",i=this.iconSize?this.iconSize:e;return(0,g.qy)`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${i}
          background="transparent"
          iconColor=${t}
          backgroundColor=${t}
          size=${e}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?(0,g.qy)`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:(0,g.qy)``}chevronTemplate(){return this.chevron?(0,g.qy)`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};eD.styles=[m.W5,m.fD,eN],eB([(0,w.MZ)()],eD.prototype,"icon",void 0),eB([(0,w.MZ)()],eD.prototype,"iconSize",void 0),eB([(0,w.MZ)()],eD.prototype,"tabIdx",void 0),eB([(0,w.MZ)()],eD.prototype,"variant",void 0),eB([(0,w.MZ)()],eD.prototype,"iconVariant",void 0),eB([(0,w.MZ)({type:Boolean})],eD.prototype,"disabled",void 0),eB([(0,w.MZ)()],eD.prototype,"imageSrc",void 0),eB([(0,w.MZ)()],eD.prototype,"alt",void 0),eB([(0,w.MZ)({type:Boolean})],eD.prototype,"chevron",void 0),eB([(0,w.MZ)({type:Boolean})],eD.prototype,"loading",void 0),eD=eB([(0,v.E)("wui-list-item")],eD);let eZ=class extends r.WF{constructor(){super(...arguments),this.wallet=p.I.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return(0,r.qy)`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?(0,r.qy)`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?(0,r.qy)`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?(0,r.qy)`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?(0,r.qy)`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&n.w.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&n.w.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&n.w.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&n.w.openHref(this.wallet.homepage,"_blank")}};eZ=function(t,e,i,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.EM)("w3m-downloads-view")],eZ)},79621:t=>{function e(t){if(!t||t<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}e.prototype.set=function(t,e,i,r){let o=t*this.size+e;this.data[o]=i,r&&(this.reservedBit[o]=!0)},e.prototype.get=function(t,e){return this.data[t*this.size+e]},e.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},e.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},t.exports=e},81685:(t,e)=>{let i="[0-9]+",r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",o="(?:(?![A-Z0-9 $%*+\\-./:]|"+(r=r.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+";e.KANJI=RegExp(r,"g"),e.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),e.BYTE=RegExp(o,"g"),e.NUMERIC=RegExp(i,"g"),e.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let n=RegExp("^"+r+"$"),a=RegExp("^"+i+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");e.testKanji=function(t){return n.test(t)},e.testNumeric=function(t){return a.test(t)},e.testAlphanumeric=function(t){return s.test(t)}},87487:(t,e,i)=>{let r=i(51392),o=i(43585);function n(t){this.mode=o.BYTE,"string"==typeof t&&(t=r(t)),this.data=new Uint8Array(t)}n.getBitsLength=function(t){return 8*t},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){for(let e=0,i=this.data.length;e<i;e++)t.put(this.data[e],8)},t.exports=n},88252:(t,e,i)=>{let r=i(46087),o=r.getBCHDigit(1335);e.getEncodedBits=function(t,e){let i=t.bit<<3|e,n=i<<10;for(;r.getBCHDigit(n)-o>=0;)n^=1335<<r.getBCHDigit(n)-o;return(i<<10|n)^21522}},91640:(t,e,i)=>{let r=i(57354);e.mul=function(t,e){let i=new Uint8Array(t.length+e.length-1);for(let o=0;o<t.length;o++)for(let n=0;n<e.length;n++)i[o+n]^=r.mul(t[o],e[n]);return i},e.mod=function(t,e){let i=new Uint8Array(t);for(;i.length-e.length>=0;){let t=i[0];for(let o=0;o<e.length;o++)i[o]^=r.mul(e[o],t);let o=0;for(;o<i.length&&0===i[o];)o++;i=i.slice(o)}return i},e.generateECPolynomial=function(t){let i=new Uint8Array([1]);for(let o=0;o<t;o++)i=e.mul(i,new Uint8Array([1,r.exp(o)]));return i}},94676:t=>{t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},98521:t=>{"use strict";var e={single_source_shortest_paths:function(t,i,r){var o,n,a,s,l,c,u,d={},h={};h[i]=0;var p=e.PriorityQueue.make();for(p.push(i,0);!p.empty();)for(a in n=(o=p.pop()).value,s=o.cost,l=t[n]||{})l.hasOwnProperty(a)&&(c=s+l[a],u=h[a],(void 0===h[a]||u>c)&&(h[a]=c,p.push(a,c),d[a]=n));if(void 0!==r&&void 0===h[r])throw Error(["Could not find a path from ",i," to ",r,"."].join(""));return d},extract_shortest_path_from_predecessor_list:function(t,e){for(var i=[],r=e;r;)i.push(r),t[r],r=t[r];return i.reverse(),i},find_path:function(t,i,r){var o=e.single_source_shortest_paths(t,i,r);return e.extract_shortest_path_from_predecessor_list(o,r)},PriorityQueue:{make:function(t){var i,r=e.PriorityQueue,o={};for(i in t=t||{},r)r.hasOwnProperty(i)&&(o[i]=r[i]);return o.queue=[],o.sorter=t.sorter||r.default_sorter,o},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){this.queue.push({value:t,cost:e}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=e}}]);