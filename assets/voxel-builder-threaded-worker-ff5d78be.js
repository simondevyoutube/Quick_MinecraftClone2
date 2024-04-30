(function(){"use strict";const Ws="125",js="300 es";function Ze(){}Object.assign(Ze.prototype,{addEventListener:function(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)},hasEventListener:function(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1},removeEventListener:function(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}},dispatchEvent:function(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e)}}});const Kt=[];for(let e=0;e<256;e++)Kt[e]=(e<16?"0":"")+e.toString(16);let Wi=1234567;const bt={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[e&255]+Kt[e>>8&255]+Kt[e>>16&255]+Kt[e>>24&255]+"-"+Kt[t&255]+Kt[t>>8&255]+"-"+Kt[t>>16&15|64]+Kt[t>>24&255]+"-"+Kt[n&63|128]+Kt[n>>8&255]+"-"+Kt[n>>16&255]+Kt[n>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toUpperCase()},clamp:function(e,t,n){return Math.max(t,Math.min(n,e))},euclideanModulo:function(e,t){return(e%t+t)%t},mapLinear:function(e,t,n,i,r){return i+(e-t)*(r-i)/(n-t)},lerp:function(e,t,n){return(1-n)*e+n*t},damp:function(e,t,n,i){return bt.lerp(e,t,1-Math.exp(-n*i))},pingpong:function(e,t=1){return t-Math.abs(bt.euclideanModulo(e,t*2)-t)},smoothstep:function(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))},smootherstep:function(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))},randInt:function(e,t){return e+Math.floor(Math.random()*(t-e+1))},randFloat:function(e,t){return e+Math.random()*(t-e)},randFloatSpread:function(e){return e*(.5-Math.random())},seededRandom:function(e){return e!==void 0&&(Wi=e%2147483647),Wi=Wi*16807%2147483647,(Wi-1)/2147483646},degToRad:function(e){return e*bt.DEG2RAD},radToDeg:function(e){return e*bt.RAD2DEG},isPowerOfTwo:function(e){return(e&e-1)===0&&e!==0},ceilPowerOfTwo:function(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))},floorPowerOfTwo:function(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))},setQuaternionFromProperEuler:function(e,t,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),c=o(n/2),l=s((t+i)/2),u=o((t+i)/2),h=s((t-i)/2),d=o((t-i)/2),f=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":e.set(a*u,c*h,c*d,a*l);break;case"YZY":e.set(c*d,a*u,c*h,a*l);break;case"ZXZ":e.set(c*h,c*d,a*u,a*l);break;case"XZX":e.set(a*u,c*g,c*f,a*l);break;case"YXY":e.set(c*f,a*u,c*g,a*l);break;case"ZYZ":e.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}};class J{constructor(t=0,n=0){Object.defineProperty(this,"isVector2",{value:!0}),this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,n){return n!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,n)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t,n){return n!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,n)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n,i){return i!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}}class pe{constructor(){Object.defineProperty(this,"isMatrix3",{value:!0}),this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(t,n,i,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}clone(){return new this.constructor().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],h=i[7],d=i[2],f=i[5],g=i[8],_=r[0],y=r[3],m=r[6],p=r[1],v=r[4],w=r[7],b=r[2],x=r[5],M=r[8];return s[0]=o*_+a*p+c*b,s[3]=o*y+a*v+c*x,s[6]=o*m+a*w+c*M,s[1]=l*_+u*p+h*b,s[4]=l*y+u*v+h*x,s[7]=l*m+u*w+h*M,s[2]=d*_+f*p+g*b,s[5]=d*y+f*v+g*x,s[8]=d*m+f*w+g*M,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return n*o*u-n*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,d=a*c-u*s,f=l*s-o*c,g=n*h+i*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*l-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=d*_,t[4]=(u*n-r*c)*_,t[5]=(r*s-a*n)*_,t[6]=f*_,t[7]=(i*c-l*n)*_,t[8]=(o*n-i*s)*_,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).copy(this).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+n,0,0,1),this}scale(t,n){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=n,i[4]*=n,i[7]*=n,this}rotate(t){const n=Math.cos(t),i=Math.sin(t),r=this.elements,s=r[0],o=r[3],a=r[6],c=r[1],l=r[4],u=r[7];return r[0]=n*s+i*c,r[3]=n*o+i*l,r[6]=n*a+i*u,r[1]=-i*s+n*c,r[4]=-i*o+n*l,r[7]=-i*a+n*u,this}translate(t,n){const i=this.elements;return i[0]+=t*i[2],i[3]+=t*i[5],i[6]+=t*i[8],i[1]+=n*i[2],i[4]+=n*i[5],i[7]+=n*i[8],this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}}let In;const Fn={getDataURL:function(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{In===void 0&&(In=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),In.width=e.width,In.height=e.height;const n=In.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=In}return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}};let za=0;function Ot(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,n=1001,i=1001,r=1006,s=1008,o=1023,a=1009,c=1,l=3e3){Object.defineProperty(this,"id",{value:za++}),this.uuid=bt.generateUUID(),this.name="",this.image=e,this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=a,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=l,this.version=0,this.onUpdate=null}Ot.DEFAULT_IMAGE=void 0,Ot.DEFAULT_MAPPING=300,Ot.prototype=Object.assign(Object.create(Ze.prototype),{constructor:Ot,isTexture:!0,updateMatrix:function(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this},toJSON:function(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){const i=this.image;if(i.uuid===void 0&&(i.uuid=bt.generateUUID()),!t&&e.images[i.uuid]===void 0){let r;if(Array.isArray(i)){r=[];for(let s=0,o=i.length;s<o;s++)i[s].isDataTexture?r.push(Dr(i[s].image)):r.push(Dr(i[s]))}else r=Dr(i);e.images[i.uuid]={uuid:i.uuid,url:r}}n.image=i.uuid}return t||(e.textures[this.uuid]=n),n},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}}),Object.defineProperty(Ot.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}});function Dr(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Fn.getDataURL(e):e.data?{data:Array.prototype.slice.call(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}class Nt{constructor(t=0,n=0,i=0,r=1){Object.defineProperty(this,"isVector4",{value:!0}),this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t,n){return n!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,n)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t,n){return n!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,n)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],_=c[2],y=c[6],m=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-y)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+y)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(l+1)/2,w=(f+1)/2,b=(m+1)/2,x=(u+d)/4,M=(h+_)/4,P=(g+y)/4;return v>w&&v>b?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=x/i,s=M/i):w>b?w<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(w),i=x/r,s=P/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=M/s,r=P/s),this.set(i,r,s,n),this}let p=Math.sqrt((y-g)*(y-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(p)<.001&&(p=1),this.x=(y-g)/p,this.y=(h-_)/p,this.z=(d-u)/p,this.w=Math.acos((l+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n,i){return i!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}}class pi extends Ze{constructor(t,n,i){super(),Object.defineProperty(this,"isWebGLRenderTarget",{value:!0}),this.width=t,this.height=n,this.scissor=new Nt(0,0,t,n),this.scissorTest=!1,this.viewport=new Nt(0,0,t,n),i=i||{},this.texture=new Ot(void 0,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.image={},this.texture.image.width=t,this.texture.image.height=n,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:1006,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null}setSize(t,n){(this.width!==t||this.height!==n)&&(this.width=t,this.height=n,this.texture.image.width=t,this.texture.image.height=n,this.dispose()),this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.width=t.width,this.height=t.height,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $t{constructor(t=0,n=0,i=0,r=1){Object.defineProperty(this,"isQuaternion",{value:!0}),this._x=t,this._y=n,this._z=i,this._w=r}static slerp(t,n,i,r){return i.copy(t).slerp(n,r)}static slerpFlat(t,n,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3];const d=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(h!==_||c!==d||l!==f||u!==g){let y=1-a;const m=c*d+l*f+u*g+h*_,p=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const b=Math.sqrt(v),x=Math.atan2(b,m*p);y=Math.sin(y*x)/b,a=Math.sin(a*x)/b}const w=a*p;if(c=c*y+d*w,l=l*y+f*w,u=u*y+g*w,h=h*y+_*w,y===1-a){const b=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=b,l*=b,u*=b,h*=b}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return t[n]=a*g+u*h+c*f-l*d,t[n+1]=c*g+u*d+l*h-a*f,t[n+2]=l*g+u*f+a*d-c*h,t[n+3]=u*g-a*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n){if(!(t&&t.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),h=a(s/2),d=c(i/2),f=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],l=n[2],u=n[6],h=n[10],d=i+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(i>a&&i>h){const f=2*Math.sqrt(1+i-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>h){const f=2*Math.sqrt(1+a-i-h);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-i-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let r=t.dot(n)+1;return r<1e-6?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(bt.clamp(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,n){return n!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,n)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,o=t._w,a=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-n;return this._w=f*o+n*this._w,this._x=f*i+n*this._x,this._y=f*r+n*this._y,this._z=f*s+n*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-n)*u)/l,d=Math.sin(n*u)/l;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}class E{constructor(t=0,n=0,i=0){Object.defineProperty(this,"isVector3",{value:!0}),this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,n){return n!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,n)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t,n){return n!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,n)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t,n){return n!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,n)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(qs.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(qs.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=c*n+o*r-a*i,u=c*i+a*n-s*r,h=c*r+s*i-o*n,d=-s*n-o*i-a*r;return this.x=l*c+d*-s+u*-a-h*-o,this.y=u*c+d*-o+h*-s-l*-a,this.z=h*c+d*-a+l*-o-u*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t,n){return n!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,n)):this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Nr.copy(this).projectOnVector(t),this.sub(Nr)}reflect(t){return this.sub(Nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(bt.clamp(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n,i){return i!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}}const Nr=new E,qs=new $t;class me{constructor(t,n){Object.defineProperty(this,"isBox3",{value:!0}),this.min=t!==void 0?t:new E(1/0,1/0,1/0),this.max=n!==void 0?n:new E(-1/0,-1/0,-1/0)}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){let n=1/0,i=1/0,r=1/0,s=-1/0,o=-1/0,a=-1/0;for(let c=0,l=t.length;c<l;c+=3){const u=t[c],h=t[c+1],d=t[c+2];u<n&&(n=u),h<i&&(i=h),d<r&&(r=d),u>s&&(s=u),h>o&&(o=h),d>a&&(a=d)}return this.min.set(n,i,r),this.max.set(s,o,a),this}setFromBufferAttribute(t){let n=1/0,i=1/0,r=1/0,s=-1/0,o=-1/0,a=-1/0;for(let c=0,l=t.count;c<l;c++){const u=t.getX(c),h=t.getY(c),d=t.getZ(c);u<n&&(n=u),h<i&&(i=h),d<r&&(r=d),u>s&&(s=u),h>o&&(o=h),d>a&&(a=d)}return this.min.set(n,i,r),this.max.set(s,o,a),this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=mi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t){return this.makeEmpty(),this.expandByObject(t)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return t===void 0&&(console.warn("THREE.Box3: .getCenter() target is now required"),t=new E),this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return t===void 0&&(console.warn("THREE.Box3: .getSize() target is now required"),t=new E),this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t){t.updateWorldMatrix(!1,!1);const n=t.geometry;n!==void 0&&(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox),Or.applyMatrix4(t.matrixWorld),this.union(Or));const i=t.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r]);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n===void 0&&(console.warn("THREE.Box3: .getParameter() target is now required"),n=new E),n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,mi),mi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gi),ji.subVectors(this.max,gi),Dn.subVectors(t.a,gi),Nn.subVectors(t.b,gi),Bn.subVectors(t.c,gi),Je.subVectors(Nn,Dn),Qe.subVectors(Bn,Nn),mn.subVectors(Dn,Bn);let n=[0,-Je.z,Je.y,0,-Qe.z,Qe.y,0,-mn.z,mn.y,Je.z,0,-Je.x,Qe.z,0,-Qe.x,mn.z,0,-mn.x,-Je.y,Je.x,0,-Qe.y,Qe.x,0,-mn.y,mn.x,0];return!Br(n,Dn,Nn,Bn,ji)||(n=[1,0,0,0,1,0,0,0,1],!Br(n,Dn,Nn,Bn,ji))?!1:(qi.crossVectors(Je,Qe),n=[qi.x,qi.y,qi.z],Br(n,Dn,Nn,Bn,ji))}clampPoint(t,n){return n===void 0&&(console.warn("THREE.Box3: .clampPoint() target is now required"),n=new E),n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return mi.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return t===void 0&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(t.center),t.radius=this.getSize(mi).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Be[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Be[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Be[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Be[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Be[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Be[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Be[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Be[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Be),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}function Br(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){gn.fromArray(e,s);const a=r.x*Math.abs(gn.x)+r.y*Math.abs(gn.y)+r.z*Math.abs(gn.z),c=t.dot(gn),l=n.dot(gn),u=i.dot(gn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Be=[new E,new E,new E,new E,new E,new E,new E,new E],mi=new E,Or=new me,Dn=new E,Nn=new E,Bn=new E,Je=new E,Qe=new E,mn=new E,gi=new E,ji=new E,qi=new E,gn=new E,Ga=new me;class Ke{constructor(t,n){this.center=t!==void 0?t:new E,this.radius=n!==void 0?n:-1}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):Ga.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n===void 0&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),n=new E),n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return t===void 0&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),t=new me),this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}}const Oe=new E,zr=new E,Xi=new E,$e=new E,Gr=new E,Yi=new E,Ur=new E;class yi{constructor(t,n){this.origin=t!==void 0?t:new E,this.direction=n!==void 0?n:new E(0,0,-1)}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n===void 0&&(console.warn("THREE.Ray: .at() target is now required"),n=new E),n.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Oe)),this}closestPointToPoint(t,n){n===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),n=new E),n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.direction).multiplyScalar(i).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Oe.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Oe.copy(this.direction).multiplyScalar(n).add(this.origin),Oe.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){zr.copy(t).add(n).multiplyScalar(.5),Xi.copy(n).sub(t).normalize(),$e.copy(this.origin).sub(zr);const s=t.distanceTo(n)*.5,o=-this.direction.dot(Xi),a=$e.dot(this.direction),c=-$e.dot(Xi),l=$e.lengthSq(),u=Math.abs(1-o*o);let h,d,f,g;if(u>0)if(h=o*c-a,d=o*a-c,g=s*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+d*(d+2*c)+l);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;return i&&i.copy(this.direction).multiplyScalar(h).add(this.origin),r&&r.copy(Xi).multiplyScalar(d).add(zr),f}intersectSphere(t,n){Oe.subVectors(t.center,this.origin);const i=Oe.dot(this.direction),r=Oe.dot(Oe)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return a<0&&c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),u>=0?(s=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||s>r||((s>i||i!==i)&&(i=s),(o<r||r!==r)&&(r=o),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,Oe)!==null}intersectTriangle(t,n,i,r,s){Gr.subVectors(n,t),Yi.subVectors(i,t),Ur.crossVectors(Gr,Yi);let o=this.direction.dot(Ur),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$e.subVectors(this.origin,t);const c=a*this.direction.dot(Yi.crossVectors($e,Yi));if(c<0)return null;const l=a*this.direction.dot(Gr.cross($e));if(l<0||c+l>o)return null;const u=-a*$e.dot(Ur);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}}class At{constructor(){Object.defineProperty(this,"isMatrix4",{value:!0}),this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(t,n,i,r,s,o,a,c,l,u,h,d,f,g,_,y){const m=this.elements;return m[0]=t,m[4]=n,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/On.setFromMatrixColumn(t,0).length(),s=1/On.setFromMatrixColumn(t,1).length(),o=1/On.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const n=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const d=o*u,f=o*h,g=a*u,_=a*h;n[0]=c*u,n[4]=-c*h,n[8]=l,n[1]=f+g*l,n[5]=d-_*l,n[9]=-a*c,n[2]=_-d*l,n[6]=g+f*l,n[10]=o*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,g=l*u,_=l*h;n[0]=d+_*a,n[4]=g*a-f,n[8]=o*l,n[1]=o*h,n[5]=o*u,n[9]=-a,n[2]=f*a-g,n[6]=_+d*a,n[10]=o*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,g=l*u,_=l*h;n[0]=d-_*a,n[4]=-o*h,n[8]=g+f*a,n[1]=f+g*a,n[5]=o*u,n[9]=_-d*a,n[2]=-o*l,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){const d=o*u,f=o*h,g=a*u,_=a*h;n[0]=c*u,n[4]=g*l-f,n[8]=d*l+_,n[1]=c*h,n[5]=_*l+d,n[9]=f*l-g,n[2]=-l,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;n[0]=c*u,n[4]=_-d*h,n[8]=g*h+f,n[1]=h,n[5]=o*u,n[9]=-a*u,n[2]=-l*u,n[6]=f*h+g,n[10]=d-_*h}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;n[0]=c*u,n[4]=-h,n[8]=l*u,n[1]=d*h+_,n[5]=o*u,n[9]=f*h-g,n[2]=g*h-f,n[6]=a*u,n[10]=_*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ua,t,Ha)}lookAt(t,n,i){const r=this.elements;return le.subVectors(t,n),le.lengthSq()===0&&(le.z=1),le.normalize(),tn.crossVectors(i,le),tn.lengthSq()===0&&(Math.abs(i.z)===1?le.x+=1e-4:le.z+=1e-4,le.normalize(),tn.crossVectors(i,le)),tn.normalize(),Zi.crossVectors(le,tn),r[0]=tn.x,r[4]=Zi.x,r[8]=le.x,r[1]=tn.y,r[5]=Zi.y,r[9]=le.y,r[2]=tn.z,r[6]=Zi.z,r[10]=le.z,this}multiply(t,n){return n!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,n)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],h=i[5],d=i[9],f=i[13],g=i[2],_=i[6],y=i[10],m=i[14],p=i[3],v=i[7],w=i[11],b=i[15],x=r[0],M=r[4],P=r[8],C=r[12],I=r[1],N=r[5],O=r[9],F=r[13],L=r[2],R=r[6],B=r[10],G=r[14],H=r[3],W=r[7],Y=r[11],K=r[15];return s[0]=o*x+a*I+c*L+l*H,s[4]=o*M+a*N+c*R+l*W,s[8]=o*P+a*O+c*B+l*Y,s[12]=o*C+a*F+c*G+l*K,s[1]=u*x+h*I+d*L+f*H,s[5]=u*M+h*N+d*R+f*W,s[9]=u*P+h*O+d*B+f*Y,s[13]=u*C+h*F+d*G+f*K,s[2]=g*x+_*I+y*L+m*H,s[6]=g*M+_*N+y*R+m*W,s[10]=g*P+_*O+y*B+m*Y,s[14]=g*C+_*F+y*G+m*K,s[3]=p*x+v*I+w*L+b*H,s[7]=p*M+v*N+w*R+b*W,s[11]=p*P+v*O+w*B+b*Y,s[15]=p*C+v*F+w*G+b*K,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],_=t[7],y=t[11],m=t[15];return g*(+s*c*h-r*l*h-s*a*d+i*l*d+r*a*f-i*c*f)+_*(+n*c*f-n*l*d+s*o*d-r*o*f+r*l*u-s*c*u)+y*(+n*l*h-n*a*f-s*o*h+i*o*f+s*a*u-i*l*u)+m*(-r*a*u-n*c*h+n*a*d+r*o*h-i*o*d+i*c*u)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],_=t[13],y=t[14],m=t[15],p=h*y*l-_*d*l+_*c*f-a*y*f-h*c*m+a*d*m,v=g*d*l-u*y*l-g*c*f+o*y*f+u*c*m-o*d*m,w=u*_*l-g*h*l+g*a*f-o*_*f-u*a*m+o*h*m,b=g*h*c-u*_*c-g*a*d+o*_*d+u*a*y-o*h*y,x=n*p+i*v+r*w+s*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/x;return t[0]=p*M,t[1]=(_*d*s-h*y*s-_*r*f+i*y*f+h*r*m-i*d*m)*M,t[2]=(a*y*s-_*c*s+_*r*l-i*y*l-a*r*m+i*c*m)*M,t[3]=(h*c*s-a*d*s-h*r*l+i*d*l+a*r*f-i*c*f)*M,t[4]=v*M,t[5]=(u*y*s-g*d*s+g*r*f-n*y*f-u*r*m+n*d*m)*M,t[6]=(g*c*s-o*y*s-g*r*l+n*y*l+o*r*m-n*c*m)*M,t[7]=(o*d*s-u*c*s+u*r*l-n*d*l-o*r*f+n*c*f)*M,t[8]=w*M,t[9]=(g*h*s-u*_*s-g*i*f+n*_*f+u*i*m-n*h*m)*M,t[10]=(o*_*s-g*a*s+g*i*l-n*_*l-o*i*m+n*a*m)*M,t[11]=(u*a*s-o*h*s-u*i*l+n*h*l+o*i*f-n*a*f)*M,t[12]=b*M,t[13]=(u*_*r-g*h*r+g*i*d-n*_*d-u*i*y+n*h*y)*M,t[14]=(g*a*r-o*_*r-g*i*c+n*_*c+o*i*y-n*a*y)*M,t[15]=(o*h*r-u*a*r+u*i*c-n*h*c-o*i*d+n*a*d)*M,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i){return this.set(1,n,i,0,t,1,i,0,t,n,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,l=s+s,u=o+o,h=a+a,d=s*l,f=s*u,g=s*h,_=o*u,y=o*h,m=a*h,p=c*l,v=c*u,w=c*h,b=i.x,x=i.y,M=i.z;return r[0]=(1-(_+m))*b,r[1]=(f+w)*b,r[2]=(g-v)*b,r[3]=0,r[4]=(f-w)*x,r[5]=(1-(d+m))*x,r[6]=(y+p)*x,r[7]=0,r[8]=(g+v)*M,r[9]=(y-p)*M,r[10]=(1-(d+_))*M,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let s=On.set(r[0],r[1],r[2]).length();const o=On.set(r[4],r[5],r[6]).length(),a=On.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Me.copy(this);const l=1/s,u=1/o,h=1/a;return Me.elements[0]*=l,Me.elements[1]*=l,Me.elements[2]*=l,Me.elements[4]*=u,Me.elements[5]*=u,Me.elements[6]*=u,Me.elements[8]*=h,Me.elements[9]*=h,Me.elements[10]*=h,n.setFromRotationMatrix(Me),i.x=s,i.y=o,i.z=a,this}makePerspective(t,n,i,r,s,o){o===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,c=2*s/(n-t),l=2*s/(i-r),u=(n+t)/(n-t),h=(i+r)/(i-r),d=-(o+s)/(o-s),f=-2*o*s/(o-s);return a[0]=c,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=l,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,n,i,r,s,o){const a=this.elements,c=1/(n-t),l=1/(i-r),u=1/(o-s),h=(n+t)*c,d=(i+r)*l,f=(o+s)*u;return a[0]=2*c,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*l,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const On=new E,Me=new At,Ua=new E(0,0,0),Ha=new E(1,1,1),tn=new E,Zi=new E,le=new E;class _i{constructor(t=0,n=0,i=0,r=_i.DefaultOrder){Object.defineProperty(this,"isEuler",{value:!0}),this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._order=r||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n,i){const r=bt.clamp,s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],h=s[9],d=s[2],f=s[6],g=s[10];switch(n=n||this._order,n){case"XYZ":this._y=Math.asin(r(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-r(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(r(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-r(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(r(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-r(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i!==!1&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Xs.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xs,n,i)}setFromVector3(t,n){return this.set(t.x,t.y,t.z,n||this._order)}reorder(t){return Ys.setFromEuler(this),this.setFromQuaternion(Ys,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}toVector3(t){return t?t.set(this._x,this._y,this._z):new E(this._x,this._y,this._z)}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}_i.DefaultOrder="XYZ",_i.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];const Xs=new At,Ys=new $t;class Zs{constructor(){this.mask=1}set(t){this.mask=1<<t|0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}}let ka=0;const Js=new E,zn=new $t,ze=new At,Ji=new E,vi=new E,Va=new E,Wa=new $t,Qs=new E(1,0,0),Ks=new E(0,1,0),$s=new E(0,0,1),ja={type:"added"},to={type:"removed"};function mt(){Object.defineProperty(this,"id",{value:ka++}),this.uuid=bt.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DefaultUp.clone();const e=new E,t=new _i,n=new $t,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new At},normalMatrix:{value:new pe}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=mt.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new Zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}mt.DefaultUp=new E(0,1,0),mt.DefaultMatrixAutoUpdate=!0,mt.prototype=Object.assign(Object.create(Ze.prototype),{constructor:mt,isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix4:function(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(e){return this.quaternion.premultiply(e),this},setRotationFromAxisAngle:function(e,t){this.quaternion.setFromAxisAngle(e,t)},setRotationFromEuler:function(e){this.quaternion.setFromEuler(e,!0)},setRotationFromMatrix:function(e){this.quaternion.setFromRotationMatrix(e)},setRotationFromQuaternion:function(e){this.quaternion.copy(e)},rotateOnAxis:function(e,t){return zn.setFromAxisAngle(e,t),this.quaternion.multiply(zn),this},rotateOnWorldAxis:function(e,t){return zn.setFromAxisAngle(e,t),this.quaternion.premultiply(zn),this},rotateX:function(e){return this.rotateOnAxis(Qs,e)},rotateY:function(e){return this.rotateOnAxis(Ks,e)},rotateZ:function(e){return this.rotateOnAxis($s,e)},translateOnAxis:function(e,t){return Js.copy(e).applyQuaternion(this.quaternion),this.position.add(Js.multiplyScalar(t)),this},translateX:function(e){return this.translateOnAxis(Qs,e)},translateY:function(e){return this.translateOnAxis(Ks,e)},translateZ:function(e){return this.translateOnAxis($s,e)},localToWorld:function(e){return e.applyMatrix4(this.matrixWorld)},worldToLocal:function(e){return e.applyMatrix4(ze.copy(this.matrixWorld).invert())},lookAt:function(e,t,n){e.isVector3?Ji.copy(e):Ji.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ze.lookAt(vi,Ji,this.up):ze.lookAt(Ji,vi,this.up),this.quaternion.setFromRotationMatrix(ze),i&&(ze.extractRotation(i.matrixWorld),zn.setFromRotationMatrix(ze),this.quaternion.premultiply(zn.invert()))},add:function(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ja)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)},remove:function(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(to)),this},clear:function(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(to)}return this.children.length=0,this},attach:function(e){return this.updateWorldMatrix(!0,!1),ze.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ze.multiply(e.parent.matrixWorld)),e.applyMatrix4(ze),e.updateWorldMatrix(!1,!1),this.add(e),this},getObjectById:function(e){return this.getObjectByProperty("id",e)},getObjectByName:function(e){return this.getObjectByProperty("name",e)},getObjectByProperty:function(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}},getWorldPosition:function(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new E),this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),e=new $t),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vi,e,Va),e},getWorldScale:function(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),e=new E),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vi,Wa,e),e},getWorldDirection:function(e){e===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),e=new E),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()},raycast:function(){},traverse:function(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)},traverseVisible:function(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)},traverseAncestors:function(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)},updateWorldMatrix:function(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}},toJSON:function(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON());function r(o,a){return o[a.uuid]===void 0&&(o[a.uuid]=a.toJSON(e)),a.uuid}if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const a=o.shapes;if(Array.isArray(a))for(let c=0,l=a.length;c<l;c++){const u=a[c];r(e.shapes,u)}else r(e.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let a=0,c=this.material.length;a<c;a++)o.push(r(e.materials,this.material[a]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const a=this.animations[o];i.animations.push(r(e.animations,a))}}if(t){const o=s(e.geometries),a=s(e.materials),c=s(e.textures),l=s(e.images),u=s(e.shapes),h=s(e.skeletons),d=s(e.animations);o.length>0&&(n.geometries=o),a.length>0&&(n.materials=a),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d)}return n.object=i,n;function s(o){const a=[];for(const c in o){const l=o[c];delete l.metadata,a.push(l)}return a}},clone:function(e){return new this.constructor().copy(this,e)},copy:function(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}});const Hr=new E,qa=new E,Xa=new pe;class Ge{constructor(t,n){Object.defineProperty(this,"isPlane",{value:!0}),this.normal=t!==void 0?t:new E(1,0,0),this.constant=n!==void 0?n:0}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=Hr.subVectors(i,n).cross(qa.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}clone(){return new this.constructor().copy(this)}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n===void 0&&(console.warn("THREE.Plane: .projectPoint() target is now required"),n=new E),n.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,n){n===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),n=new E);const i=t.delta(Hr),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):void 0;const s=-(t.start.dot(this.normal)+this.constant)/r;if(!(s<0||s>1))return n.copy(i).multiplyScalar(s).add(t.start)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t===void 0&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),t=new E),t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||Xa.getNormalMatrix(t),r=this.coplanarPoint(Hr).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}}const we=new E,Ue=new E,kr=new E,He=new E,Gn=new E,Un=new E,eo=new E,Vr=new E,Wr=new E,jr=new E;class re{constructor(t,n,i){this.a=t!==void 0?t:new E,this.b=n!==void 0?n:new E,this.c=i!==void 0?i:new E}static getNormal(t,n,i,r){r===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),r=new E),r.subVectors(i,n),we.subVectors(t,n),r.cross(we);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){we.subVectors(r,n),Ue.subVectors(i,n),kr.subVectors(t,n);const o=we.dot(we),a=we.dot(Ue),c=we.dot(kr),l=Ue.dot(Ue),u=Ue.dot(kr),h=o*l-a*a;if(s===void 0&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),s=new E),h===0)return s.set(-2,-1,-1);const d=1/h,f=(l*c-a*u)*d,g=(o*u-a*c)*d;return s.set(1-f-g,g,f)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,He),He.x>=0&&He.y>=0&&He.x+He.y<=1}static getUV(t,n,i,r,s,o,a,c){return this.getBarycoord(t,n,i,r,He),c.set(0,0),c.addScaledVector(s,He.x),c.addScaledVector(o,He.y),c.addScaledVector(a,He.z),c}static isFrontFacing(t,n,i,r){return we.subVectors(i,n),Ue.subVectors(t,n),we.cross(Ue).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return we.subVectors(this.c,this.b),Ue.subVectors(this.a,this.b),we.cross(Ue).length()*.5}getMidpoint(t){return t===void 0&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),t=new E),t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return re.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t===void 0&&(console.warn("THREE.Triangle: .getPlane() target is now required"),t=new Ge),t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return re.getBarycoord(t,this.a,this.b,this.c,n)}getUV(t,n,i,r,s){return re.getUV(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return re.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return re.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){n===void 0&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),n=new E);const i=this.a,r=this.b,s=this.c;let o,a;Gn.subVectors(r,i),Un.subVectors(s,i),Vr.subVectors(t,i);const c=Gn.dot(Vr),l=Un.dot(Vr);if(c<=0&&l<=0)return n.copy(i);Wr.subVectors(t,r);const u=Gn.dot(Wr),h=Un.dot(Wr);if(u>=0&&h<=u)return n.copy(r);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),n.copy(i).addScaledVector(Gn,o);jr.subVectors(t,s);const f=Gn.dot(jr),g=Un.dot(jr);if(g>=0&&f<=g)return n.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),n.copy(i).addScaledVector(Un,a);const y=u*g-f*h;if(y<=0&&h-u>=0&&f-g>=0)return eo.subVectors(s,r),a=(h-u)/(h-u+(f-g)),n.copy(r).addScaledVector(eo,a);const m=1/(y+_+d);return o=_*m,a=d*m,n.copy(i).addScaledVector(Gn,o).addScaledVector(Un,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const no={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Se={h:0,s:0,l:0},Qi={h:0,s:0,l:0};function qr(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function Xr(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Yr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}class lt{constructor(t,n,i){return Object.defineProperty(this,"isColor",{value:!0}),n===void 0&&i===void 0?this.set(t):this.setRGB(t,n,i)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,this}setRGB(t,n,i){return this.r=t,this.g=n,this.b=i,this}setHSL(t,n,i){if(t=bt.euclideanModulo(t,1),n=bt.clamp(n,0,1),i=bt.clamp(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,s=2*i-r;this.r=qr(s,r,t+1/3),this.g=qr(s,r,t),this.b=qr(s,r,t-1/3)}return this}setStyle(t){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let r;const s=i[1],o=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,n(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,n(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const a=parseFloat(r[1])/360,c=parseInt(r[2],10)/100,l=parseInt(r[3],10)/100;return n(r[4]),this.setHSL(a,c,l)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],s=r.length;if(s===3)return this.r=parseInt(r.charAt(0)+r.charAt(0),16)/255,this.g=parseInt(r.charAt(1)+r.charAt(1),16)/255,this.b=parseInt(r.charAt(2)+r.charAt(2),16)/255,this;if(s===6)return this.r=parseInt(r.charAt(0)+r.charAt(1),16)/255,this.g=parseInt(r.charAt(2)+r.charAt(3),16)/255,this.b=parseInt(r.charAt(4)+r.charAt(5),16)/255,this}return t&&t.length>0?this.setColorName(t):this}setColorName(t){const n=no[t];return n!==void 0?this.setHex(n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copyGammaToLinear(t,n=2){return this.r=Math.pow(t.r,n),this.g=Math.pow(t.g,n),this.b=Math.pow(t.b,n),this}copyLinearToGamma(t,n=2){const i=n>0?1/n:1;return this.r=Math.pow(t.r,i),this.g=Math.pow(t.g,i),this.b=Math.pow(t.b,i),this}convertGammaToLinear(t){return this.copyGammaToLinear(this,t),this}convertLinearToGamma(t){return this.copyLinearToGamma(this,t),this}copySRGBToLinear(t){return this.r=Xr(t.r),this.g=Xr(t.g),this.b=Xr(t.b),this}copyLinearToSRGB(t){return this.r=Yr(t.r),this.g=Yr(t.g),this.b=Yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(t){t===void 0&&(console.warn("THREE.Color: .getHSL() target is now required"),t={h:0,s:0,l:0});const n=this.r,i=this.g,r=this.b,s=Math.max(n,i,r),o=Math.min(n,i,r);let a,c;const l=(o+s)/2;if(o===s)a=0,c=0;else{const u=s-o;switch(c=l<=.5?u/(s+o):u/(2-s-o),s){case n:a=(i-r)/u+(i<r?6:0);break;case i:a=(r-n)/u+2;break;case r:a=(n-i)/u+4;break}a/=6}return t.h=a,t.s=c,t.l=l,t}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(t,n,i){return this.getHSL(Se),Se.h+=t,Se.s+=n,Se.l+=i,this.setHSL(Se.h,Se.s,Se.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Se),t.getHSL(Qi);const i=bt.lerp(Se.h,Qi.h,n),r=bt.lerp(Se.s,Qi.s,n),s=bt.lerp(Se.l,Qi.l,n);return this.setHSL(i,r,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),t.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}}lt.NAMES=no,lt.prototype.r=1,lt.prototype.g=1,lt.prototype.b=1;class Ya{constructor(t,n,i,r,s,o=0){this.a=t,this.b=n,this.c=i,this.normal=r&&r.isVector3?r:new E,this.vertexNormals=Array.isArray(r)?r:[],this.color=s&&s.isColor?s:new lt,this.vertexColors=Array.isArray(s)?s:[],this.materialIndex=o}clone(){return new this.constructor().copy(this)}copy(t){this.a=t.a,this.b=t.b,this.c=t.c,this.normal.copy(t.normal),this.color.copy(t.color),this.materialIndex=t.materialIndex;for(let n=0,i=t.vertexNormals.length;n<i;n++)this.vertexNormals[n]=t.vertexNormals[n].clone();for(let n=0,i=t.vertexColors.length;n<i;n++)this.vertexColors[n]=t.vertexColors[n].clone();return this}}let Za=0;function _t(){Object.defineProperty(this,"id",{value:Za++}),this.uuid=bt.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.blending=1,this.side=0,this.flatShading=!1,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}_t.prototype=Object.assign(Object.create(Ze.prototype),{constructor:_t,isMaterial:!0,onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if(t==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===1;continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}},toJSON:function(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(n.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,n.reflectivity=this.reflectivity,n.refractionRatio=this.refractionRatio,this.combine!==void 0&&(n.combine=this.combine),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity)),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.flatShading===!0&&(n.flatShading=this.flatShading),this.side!==0&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.morphTargets===!0&&(n.morphTargets=!0),this.morphNormals===!0&&(n.morphNormals=!0),this.skinning===!0&&(n.skinning=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(r){const s=[];for(const o in r){const a=r[o];delete a.metadata,s.push(a)}return s}if(t){const r=i(e.textures),s=i(e.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n},clone:function(){return new this.constructor().copy(this)},copy:function(e){this.name=e.name,this.fog=e.fog,this.blending=e.blending,this.side=e.side,this.flatShading=e.flatShading,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Object.defineProperty(_t.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}});function en(e){_t.call(this),this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(e)}en.prototype=Object.create(_t.prototype),en.prototype.constructor=en,en.prototype.isMeshBasicMaterial=!0,en.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this};const zt=new E,Ki=new J;function St(e,t,n){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n===!0,this.usage=35044,this.updateRange={offset:0,count:-1},this.version=0}Object.defineProperty(St.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}}),Object.assign(St.prototype,{isBufferAttribute:!0,onUploadCallback:function(){},setUsage:function(e){return this.usage=e,this},copy:function(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this},copyAt:function(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this},copyArray:function(e){return this.array.set(e),this},copyColorsArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),s=new lt),t[n++]=s.r,t[n++]=s.g,t[n++]=s.b}return this},copyVector2sArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),s=new J),t[n++]=s.x,t[n++]=s.y}return this},copyVector3sArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),s=new E),t[n++]=s.x,t[n++]=s.y,t[n++]=s.z}return this},copyVector4sArray:function(e){const t=this.array;let n=0;for(let i=0,r=e.length;i<r;i++){let s=e[i];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),s=new Nt),t[n++]=s.x,t[n++]=s.y,t[n++]=s.z,t[n++]=s.w}return this},applyMatrix3:function(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ki.fromBufferAttribute(this,t),Ki.applyMatrix3(e),this.setXY(t,Ki.x,Ki.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this},applyMatrix4:function(e){for(let t=0,n=this.count;t<n;t++)zt.x=this.getX(t),zt.y=this.getY(t),zt.z=this.getZ(t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this},applyNormalMatrix:function(e){for(let t=0,n=this.count;t<n;t++)zt.x=this.getX(t),zt.y=this.getY(t),zt.z=this.getZ(t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this},transformDirection:function(e){for(let t=0,n=this.count;t<n;t++)zt.x=this.getX(t),zt.y=this.getY(t),zt.z=this.getZ(t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this},set:function(e,t=0){return this.array.set(e,t),this},getX:function(e){return this.array[e*this.itemSize]},setX:function(e,t){return this.array[e*this.itemSize]=t,this},getY:function(e){return this.array[e*this.itemSize+1]},setY:function(e,t){return this.array[e*this.itemSize+1]=t,this},getZ:function(e){return this.array[e*this.itemSize+2]},setZ:function(e,t){return this.array[e*this.itemSize+2]=t,this},getW:function(e){return this.array[e*this.itemSize+3]},setW:function(e,t){return this.array[e*this.itemSize+3]=t,this},setXY:function(e,t,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this},setXYZ:function(e,t,n,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this},setXYZW:function(e,t,n,i,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this},onUpload:function(e){return this.onUploadCallback=e,this},clone:function(){return new this.constructor(this.array,this.itemSize).copy(this)},toJSON:function(){return{itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized}}});function Zr(e,t,n){St.call(this,new Int8Array(e),t,n)}Zr.prototype=Object.create(St.prototype),Zr.prototype.constructor=Zr;function Jr(e,t,n){St.call(this,new Uint8Array(e),t,n)}Jr.prototype=Object.create(St.prototype),Jr.prototype.constructor=Jr;function Qr(e,t,n){St.call(this,new Uint8ClampedArray(e),t,n)}Qr.prototype=Object.create(St.prototype),Qr.prototype.constructor=Qr;function Kr(e,t,n){St.call(this,new Int16Array(e),t,n)}Kr.prototype=Object.create(St.prototype),Kr.prototype.constructor=Kr;function xi(e,t,n){St.call(this,new Uint16Array(e),t,n)}xi.prototype=Object.create(St.prototype),xi.prototype.constructor=xi;function $r(e,t,n){St.call(this,new Int32Array(e),t,n)}$r.prototype=Object.create(St.prototype),$r.prototype.constructor=$r;function bi(e,t,n){St.call(this,new Uint32Array(e),t,n)}bi.prototype=Object.create(St.prototype),bi.prototype.constructor=bi;function $i(e,t,n){St.call(this,new Uint16Array(e),t,n)}$i.prototype=Object.create(St.prototype),$i.prototype.constructor=$i,$i.prototype.isFloat16BufferAttribute=!0;function Ht(e,t,n){St.call(this,new Float32Array(e),t,n)}Ht.prototype=Object.create(St.prototype),Ht.prototype.constructor=Ht;function ts(e,t,n){St.call(this,new Float64Array(e),t,n)}ts.prototype=Object.create(St.prototype),ts.prototype.constructor=ts;function io(e){if(e.length===0)return-1/0;let t=e[0];for(let n=1,i=e.length;n<i;++n)e[n]>t&&(t=e[n]);return t}const Ja={Int8Array,Uint8Array,Uint8ClampedArray:typeof Uint8ClampedArray<"u"?Uint8ClampedArray:Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function tr(e,t){return new Ja[e](t)}let Qa=0;const Le=new At,es=new mt,Hn=new E,he=new me,Mi=new me,Jt=new E;function Gt(){Object.defineProperty(this,"id",{value:Qa++}),this.uuid=bt.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}Gt.prototype=Object.assign(Object.create(Ze.prototype),{constructor:Gt,isBufferGeometry:!0,getIndex:function(){return this.index},setIndex:function(e){return Array.isArray(e)?this.index=new(io(e)>65535?bi:xi)(e,1):this.index=e,this},getAttribute:function(e){return this.attributes[e]},setAttribute:function(e,t){return this.attributes[e]=t,this},deleteAttribute:function(e){return delete this.attributes[e],this},hasAttribute:function(e){return this.attributes[e]!==void 0},addGroup:function(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})},clearGroups:function(){this.groups=[]},setDrawRange:function(e,t){this.drawRange.start=e,this.drawRange.count=t},applyMatrix4:function(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new pe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this},rotateX:function(e){return Le.makeRotationX(e),this.applyMatrix4(Le),this},rotateY:function(e){return Le.makeRotationY(e),this.applyMatrix4(Le),this},rotateZ:function(e){return Le.makeRotationZ(e),this.applyMatrix4(Le),this},translate:function(e,t,n){return Le.makeTranslation(e,t,n),this.applyMatrix4(Le),this},scale:function(e,t,n){return Le.makeScale(e,t,n),this.applyMatrix4(Le),this},lookAt:function(e){return es.lookAt(e),es.updateMatrix(),this.applyMatrix4(es.matrix),this},center:function(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hn).negate(),this.translate(Hn.x,Hn.y,Hn.z),this},setFromPoints:function(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ht(t,3)),this},computeBoundingBox:function(){this.boundingBox===null&&(this.boundingBox=new me);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];he.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,he.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,he.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(he.min),this.boundingBox.expandByPoint(he.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)},computeBoundingSphere:function(){this.boundingSphere===null&&(this.boundingSphere=new Ke);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(he.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];Mi.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(he.min,Mi.min),he.expandByPoint(Jt),Jt.addVectors(he.max,Mi.max),he.expandByPoint(Jt)):(he.expandByPoint(Mi.min),he.expandByPoint(Mi.max))}he.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)Jt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Jt));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],a=this.morphTargetsRelative;for(let c=0,l=o.count;c<l;c++)Jt.fromBufferAttribute(o,c),a&&(Hn.fromBufferAttribute(e,c),Jt.add(Hn)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}},computeFaceNormals:function(){},computeTangents:function(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,s=t.uv.array,o=i.length/3;t.tangent===void 0&&this.setAttribute("tangent",new St(new Float32Array(4*o),4));const a=t.tangent.array,c=[],l=[];for(let C=0;C<o;C++)c[C]=new E,l[C]=new E;const u=new E,h=new E,d=new E,f=new J,g=new J,_=new J,y=new E,m=new E;function p(C,I,N){u.fromArray(i,C*3),h.fromArray(i,I*3),d.fromArray(i,N*3),f.fromArray(s,C*2),g.fromArray(s,I*2),_.fromArray(s,N*2),h.sub(u),d.sub(u),g.sub(f),_.sub(f);const O=1/(g.x*_.y-_.x*g.y);isFinite(O)&&(y.copy(h).multiplyScalar(_.y).addScaledVector(d,-g.y).multiplyScalar(O),m.copy(d).multiplyScalar(g.x).addScaledVector(h,-_.x).multiplyScalar(O),c[C].add(y),c[I].add(y),c[N].add(y),l[C].add(m),l[I].add(m),l[N].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:n.length}]);for(let C=0,I=v.length;C<I;++C){const N=v[C],O=N.start,F=N.count;for(let L=O,R=O+F;L<R;L+=3)p(n[L+0],n[L+1],n[L+2])}const w=new E,b=new E,x=new E,M=new E;function P(C){x.fromArray(r,C*3),M.copy(x);const I=c[C];w.copy(I),w.sub(x.multiplyScalar(x.dot(I))).normalize(),b.crossVectors(M,I);const O=b.dot(l[C])<0?-1:1;a[C*4]=w.x,a[C*4+1]=w.y,a[C*4+2]=w.z,a[C*4+3]=O}for(let C=0,I=v.length;C<I;++C){const N=v[C],O=N.start,F=N.count;for(let L=O,R=O+F;L<R;L+=3)P(n[L+0]),P(n[L+1]),P(n[L+2])}},computeVertexNormals:function(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new St(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const i=new E,r=new E,s=new E,o=new E,a=new E,c=new E,l=new E,u=new E;if(e)for(let h=0,d=e.count;h<d;h+=3){const f=e.getX(h+0),g=e.getX(h+1),_=e.getX(h+2);i.fromBufferAttribute(t,f),r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),l.subVectors(s,r),u.subVectors(i,r),l.cross(u),o.fromBufferAttribute(n,f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),o.add(l),a.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)i.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),l.subVectors(s,r),u.subVectors(i,r),l.cross(u),n.setXYZ(h+0,l.x,l.y,l.z),n.setXYZ(h+1,l.x,l.y,l.z),n.setXYZ(h+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}},merge:function(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(e.attributes[i]===void 0)continue;const s=n[i].array,o=e.attributes[i],a=o.array,c=o.itemSize*t,l=Math.min(a.length,s.length-c);for(let u=0,h=c;u<l;u++,h++)s[h]=a[u]}return this},normalizeNormals:function(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)},toNonIndexed:function(){function e(o,a){const c=o.array,l=o.itemSize,u=o.normalized,h=new c.constructor(a.length*l);let d=0,f=0;for(let g=0,_=a.length;g<_;g++){d=a[g]*l;for(let y=0;y<l;y++)h[f++]=c[d++]}return new St(h,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gt,n=this.index.array,i=this.attributes;for(const o in i){const a=i[o],c=e(a,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const a=[],c=r[o];for(let l=0,u=c.length;l<u;l++){const h=c[l],d=e(h,n);a.push(d)}t.morphAttributes[o]=a}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,a=s.length;o<a;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t},toJSON:function(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const a=this.parameters;for(const c in a)a[c]!==void 0&&(e[c]=a[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const a in n){const c=n[a],l=c.toJSON(e.data);c.name!==""&&(l.name=c.name),e.data.attributes[a]=l}const i={};let r=!1;for(const a in this.morphAttributes){const c=this.morphAttributes[a],l=[];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=d.toJSON(e.data);d.name!==""&&(f.name=d.name),l.push(f)}l.length>0&&(i[a]=l,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e},clone:function(){return new Gt().copy(this)},copy:function(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const l=i[c];this.setAttribute(c,l.clone(t))}const r=e.morphAttributes;for(const c in r){const l=[],u=r[c];for(let h=0,d=u.length;h<d;h++)l.push(u[h].clone(t));this.morphAttributes[c]=l}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,l=s.length;c<l;c++){const u=s[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this},dispose:function(){this.dispatchEvent({type:"dispose"})}});const ro=new At,kn=new yi,ns=new Ke,nn=new E,rn=new E,sn=new E,is=new E,rs=new E,ss=new E,er=new E,nr=new E,ir=new E,rr=new J,sr=new J,or=new J,os=new E,ar=new E;function te(e=new Gt,t=new en){mt.call(this),this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}te.prototype=Object.assign(Object.create(mt.prototype),{constructor:te,isMesh:!0,copy:function(e){return mt.prototype.copy.call(this,e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this},updateMorphTargets:function(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}},raycast:function(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(r),e.ray.intersectsSphere(ns)===!1)||(ro.copy(r).invert(),kn.copy(e.ray).applyMatrix4(ro),n.boundingBox!==null&&kn.intersectsBox(n.boundingBox)===!1))return;let s;if(n.isBufferGeometry){const o=n.index,a=n.attributes.position,c=n.morphAttributes.position,l=n.morphTargetsRelative,u=n.attributes.uv,h=n.attributes.uv2,d=n.groups,f=n.drawRange;if(o!==null)if(Array.isArray(i))for(let g=0,_=d.length;g<_;g++){const y=d[g],m=i[y.materialIndex],p=Math.max(y.start,f.start),v=Math.min(y.start+y.count,f.start+f.count);for(let w=p,b=v;w<b;w+=3){const x=o.getX(w),M=o.getX(w+1),P=o.getX(w+2);s=cr(this,m,e,kn,a,c,l,u,h,x,M,P),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=y.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let y=g,m=_;y<m;y+=3){const p=o.getX(y),v=o.getX(y+1),w=o.getX(y+2);s=cr(this,i,e,kn,a,c,l,u,h,p,v,w),s&&(s.faceIndex=Math.floor(y/3),t.push(s))}}else if(a!==void 0)if(Array.isArray(i))for(let g=0,_=d.length;g<_;g++){const y=d[g],m=i[y.materialIndex],p=Math.max(y.start,f.start),v=Math.min(y.start+y.count,f.start+f.count);for(let w=p,b=v;w<b;w+=3){const x=w,M=w+1,P=w+2;s=cr(this,m,e,kn,a,c,l,u,h,x,M,P),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=y.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let y=g,m=_;y<m;y+=3){const p=y,v=y+1,w=y+2;s=cr(this,i,e,kn,a,c,l,u,h,p,v,w),s&&(s.faceIndex=Math.floor(y/3),t.push(s))}}}else n.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}});function Ka(e,t,n,i,r,s,o,a){let c;if(t.side===1?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side!==2,a),c===null)return null;ar.copy(a),ar.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(ar);return l<n.near||l>n.far?null:{distance:l,point:ar.clone(),object:e}}function cr(e,t,n,i,r,s,o,a,c,l,u,h){nn.fromBufferAttribute(r,l),rn.fromBufferAttribute(r,u),sn.fromBufferAttribute(r,h);const d=e.morphTargetInfluences;if(t.morphTargets&&s&&d){er.set(0,0,0),nr.set(0,0,0),ir.set(0,0,0);for(let g=0,_=s.length;g<_;g++){const y=d[g],m=s[g];y!==0&&(is.fromBufferAttribute(m,l),rs.fromBufferAttribute(m,u),ss.fromBufferAttribute(m,h),o?(er.addScaledVector(is,y),nr.addScaledVector(rs,y),ir.addScaledVector(ss,y)):(er.addScaledVector(is.sub(nn),y),nr.addScaledVector(rs.sub(rn),y),ir.addScaledVector(ss.sub(sn),y)))}nn.add(er),rn.add(nr),sn.add(ir)}e.isSkinnedMesh&&(e.boneTransform(l,nn),e.boneTransform(u,rn),e.boneTransform(h,sn));const f=Ka(e,t,n,i,nn,rn,sn,os);if(f){a&&(rr.fromBufferAttribute(a,l),sr.fromBufferAttribute(a,u),or.fromBufferAttribute(a,h),f.uv=re.getUV(os,nn,rn,sn,rr,sr,or,new J)),c&&(rr.fromBufferAttribute(c,l),sr.fromBufferAttribute(c,u),or.fromBufferAttribute(c,h),f.uv2=re.getUV(os,nn,rn,sn,rr,sr,or,new J));const g=new Ya(l,u,h);re.getNormal(nn,rn,sn,g.normal),f.face=g}return f}class as extends Gt{constructor(t=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,i,n,t,o,s,0),g("z","y","x",1,-1,i,n,-t,o,s,1),g("x","z","y",1,1,t,i,n,r,o,2),g("x","z","y",1,-1,t,i,-n,r,o,3),g("x","y","z",1,-1,t,n,i,r,s,4),g("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(h,2));function g(_,y,m,p,v,w,b,x,M,P,C){const I=w/M,N=b/P,O=w/2,F=b/2,L=x/2,R=M+1,B=P+1;let G=0,H=0;const W=new E;for(let Y=0;Y<B;Y++){const K=Y*N-F;for(let ot=0;ot<R;ot++){const ft=ot*I-O;W[_]=ft*p,W[y]=K*v,W[m]=L,l.push(W.x,W.y,W.z),W[_]=0,W[y]=0,W[m]=x>0?1:-1,u.push(W.x,W.y,W.z),h.push(ot/M),h.push(1-Y/P),G+=1}}for(let Y=0;Y<P;Y++)for(let K=0;K<M;K++){const ot=d+K+R*Y,ft=d+K+R*(Y+1),It=d+(K+1)+R*(Y+1),k=d+(K+1)+R*Y;c.push(ot,ft,k),c.push(ft,It,k),H+=6}a.addGroup(f,H,C),f+=H,d+=G}}}function Vn(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture)?t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function ne(e){const t={};for(let n=0;n<e.length;n++){const i=Vn(e[n]);for(const r in i)t[r]=i[r]}return t}const $a={clone:Vn,merge:ne};var tc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ec=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;function ae(e){_t.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=tc,this.fragmentShader=ec,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}ae.prototype=Object.create(_t.prototype),ae.prototype.constructor=ae,ae.prototype.isShaderMaterial=!0,ae.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vn(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this},ae.prototype.toJSON=function(e){const t=_t.prototype.toJSON.call(this,e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t};function on(){mt.call(this),this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At}on.prototype=Object.assign(Object.create(mt.prototype),{constructor:on,isCamera:!0,copy:function(e,t){return mt.prototype.copy.call(this,e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this},getWorldDirection:function(e){e===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),e=new E),this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()},updateMatrixWorld:function(e){mt.prototype.updateMatrixWorld.call(this,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()},updateWorldMatrix:function(e,t){mt.prototype.updateWorldMatrix.call(this,e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()},clone:function(){return new this.constructor().copy(this)}});function ee(e=50,t=1,n=.1,i=2e3){on.call(this),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}ee.prototype=Object.assign(Object.create(on.prototype),{constructor:ee,isPerspectiveCamera:!0,copy:function(e,t){return on.prototype.copy.call(this,e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this},setFocalLength:function(e){const t=.5*this.getFilmHeight()/e;this.fov=bt.RAD2DEG*2*Math.atan(t),this.updateProjectionMatrix()},getFocalLength:function(){const e=Math.tan(bt.DEG2RAD*.5*this.fov);return .5*this.getFilmHeight()/e},getEffectiveFOV:function(){return bt.RAD2DEG*2*Math.atan(Math.tan(bt.DEG2RAD*.5*this.fov)/this.zoom)},getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(e,t,n,i,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()},clearViewOffset:function(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){const e=this.near;let t=e*Math.tan(bt.DEG2RAD*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const a=s.fullWidth,c=s.fullHeight;r+=s.offsetX*i/a,t-=s.offsetY*n/c,i*=s.width/a,n*=s.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()},toJSON:function(e){const t=mt.prototype.toJSON.call(this,e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}});const Wn=90,jn=1;function qn(e,t,n){if(mt.call(this),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new ee(Wn,jn,e,t);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new E(1,0,0)),this.add(i);const r=new ee(Wn,jn,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new E(-1,0,0)),this.add(r);const s=new ee(Wn,jn,e,t);s.layers=this.layers,s.up.set(0,0,1),s.lookAt(new E(0,1,0)),this.add(s);const o=new ee(Wn,jn,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(new E(0,-1,0)),this.add(o);const a=new ee(Wn,jn,e,t);a.layers=this.layers,a.up.set(0,-1,0),a.lookAt(new E(0,0,1)),this.add(a);const c=new ee(Wn,jn,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new E(0,0,-1)),this.add(c),this.update=function(l,u){this.parent===null&&this.updateMatrixWorld();const h=l.xr.enabled,d=l.getRenderTarget();l.xr.enabled=!1;const f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,l.setRenderTarget(n,0),l.render(u,i),l.setRenderTarget(n,1),l.render(u,r),l.setRenderTarget(n,2),l.render(u,s),l.setRenderTarget(n,3),l.render(u,o),l.setRenderTarget(n,4),l.render(u,a),n.texture.generateMipmaps=f,l.setRenderTarget(n,5),l.render(u,c),l.setRenderTarget(d),l.xr.enabled=h}}qn.prototype=Object.create(mt.prototype),qn.prototype.constructor=qn;function an(e,t,n,i,r,s,o,a,c,l){e=e!==void 0?e:[],t=t!==void 0?t:301,o=o!==void 0?o:1022,Ot.call(this,e,t,n,i,r,s,o,a,c,l),this.flipY=!1,this._needsFlipEnvMap=!0}an.prototype=Object.create(Ot.prototype),an.prototype.constructor=an,an.prototype.isCubeTexture=!0,Object.defineProperty(an.prototype,"images",{get:function(){return this.image},set:function(e){this.image=e}});class nc extends pi{constructor(t,n,i){Number.isInteger(n)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),n=i),super(t,t,n),Object.defineProperty(this,"isWebGLCubeRenderTarget",{value:!0}),n=n||{},this.texture=new an(void 0,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.format=1023,this.texture.encoding=n.encoding,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new as(5,5,5),s=new ae({name:"CubemapFromEquirect",uniforms:Vn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=n;const o=new te(r,s),a=n.minFilter;return n.minFilter===1008&&(n.minFilter=1006),new qn(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(s)}}function Xn(e,t,n,i,r,s,o,a,c,l,u,h){Ot.call(this,null,s,o,a,c,l,i,r,u,h),this.image={data:e||null,width:t||1,height:n||1},this.magFilter=c!==void 0?c:1003,this.minFilter=l!==void 0?l:1003,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}Xn.prototype=Object.create(Ot.prototype),Xn.prototype.constructor=Xn,Xn.prototype.isDataTexture=!0;const Yn=new Ke,lr=new E;class hr{constructor(t,n,i,r,s,o){this.planes=[t!==void 0?t:new Ge,n!==void 0?n:new Ge,i!==void 0?i:new Ge,r!==void 0?r:new Ge,s!==void 0?s:new Ge,o!==void 0?o:new Ge]}set(t,n,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}clone(){return new this.constructor().copy(this)}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t){const n=this.planes,i=t.elements,r=i[0],s=i[1],o=i[2],a=i[3],c=i[4],l=i[5],u=i[6],h=i[7],d=i[8],f=i[9],g=i[10],_=i[11],y=i[12],m=i[13],p=i[14],v=i[15];return n[0].setComponents(a-r,h-c,_-d,v-y).normalize(),n[1].setComponents(a+r,h+c,_+d,v+y).normalize(),n[2].setComponents(a+s,h+l,_+f,v+m).normalize(),n[3].setComponents(a-s,h-l,_-f,v-m).normalize(),n[4].setComponents(a-o,h-u,_-g,v-p).normalize(),n[5].setComponents(a+o,h+u,_+g,v+p).normalize(),this}intersectsObject(t){const n=t.geometry;return n.boundingSphere===null&&n.computeBoundingSphere(),Yn.copy(n.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(Yn)}intersectsSprite(t){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(lr.x=r.normal.x>0?t.max.x:t.min.x,lr.y=r.normal.y>0?t.max.y:t.min.y,lr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(lr)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}}function so(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function ic(e,t){const n=t.isWebGL2,i=new WeakMap;function r(l,u){const h=l.array,d=l.usage,f=e.createBuffer();e.bindBuffer(u,f),e.bufferData(u,h,d),l.onUploadCallback();let g=5126;return h instanceof Float32Array?g=5126:h instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):h instanceof Uint16Array?l.isFloat16BufferAttribute?n?g=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):g=5123:h instanceof Int16Array?g=5122:h instanceof Uint32Array?g=5125:h instanceof Int32Array?g=5124:h instanceof Int8Array?g=5120:h instanceof Uint8Array&&(g=5121),{buffer:f,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version}}function s(l,u,h){const d=u.array,f=u.updateRange;e.bindBuffer(h,l),f.count===-1?e.bufferSubData(h,0,d):(n?e.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):e.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1)}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);u&&(e.deleteBuffer(u.buffer),i.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h===void 0?i.set(l,r(l,u)):h.version<l.version&&(s(h.buffer,l,u),h.version=l.version)}return{get:o,remove:a,update:c}}class yn extends Gt{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,o=n/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,h=t/a,d=n/c,f=[],g=[],_=[],y=[];for(let m=0;m<u;m++){const p=m*d-o;for(let v=0;v<l;v++){const w=v*h-s;g.push(w,-p,0),_.push(0,0,1),y.push(v/a),y.push(1-m/c)}}for(let m=0;m<c;m++)for(let p=0;p<a;p++){const v=p+l*m,w=p+l*(m+1),b=p+1+l*(m+1),x=p+1+l*m;f.push(v,w,x),f.push(w,b,x)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(_,3)),this.setAttribute("uv",new Ht(y,2))}}var rc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,sc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oc=`#ifdef ALPHATEST
	if ( diffuseColor.a < ALPHATEST ) discard;
#endif`,ac=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
	#endif
#endif`,cc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lc="vec3 transformed = vec3( position );",hc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uc=`vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	return vec2( -1.04, 1.04 ) * a004 + r.zw;
}
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
#if defined ( PHYSICALLY_CORRECT_LIGHTS )
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
#else
	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
#endif
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
vec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {
	float fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );
	vec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;
	return Fr * fresnel + F0;
}
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	return 1.0 / ( gl * gv );
}
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( incidentLight.direction + viewDir );
	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( G * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	return specularColor * brdf.x + brdf.y;
}
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	vec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;
	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}
float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
#if defined( USE_SHEEN )
float D_Charlie(float roughness, float NoH) {
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max(1.0 - cos2h, 0.0078125);	return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
float V_Neubelt(float NoV, float NoL) {
	return saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));
}
vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {
	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;
	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );
	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );
}
#endif`,dc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 );
		fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,pc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yc=`#ifdef USE_COLOR
	diffuseColor.rgb *= vColor;
#endif`,_c=`#ifdef USE_COLOR
	varying vec3 vColor;
#endif`,vc=`#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,xc=`#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor.xyz *= color.xyz;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,bc=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Mc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,wc=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ec=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Tc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ac=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lc="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cc=`
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}`,Rc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifndef ENVMAP_TYPE_CUBE_UV
		envColor = envMapTexelToLinear( envColor );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Pc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ic=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Nc=`#ifdef USE_FOG
	fogDepth = - mvPosition.z;
#endif`,Bc=`#ifdef USE_FOG
	varying float fogDepth;
#endif`,Oc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float fogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gc=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,Uc=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
#endif`,Hc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kc=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
		#endif
	}
	#pragma unroll_loop_end
#endif`,Vc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );
		if ( angleCos > spotLight.coneCos ) {
			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;
		} else {
			directLight.color = vec3( 0.0 );
			directLight.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			irradiance *= PI;
		#endif
		return irradiance;
	}
#endif`,Wc=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {
		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );
			#else
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
		#else
			vec4 envMapColor = vec4( 0.0 );
		#endif
		return PI * envMapColor.rgb * envMapIntensity;
	}
	float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {
		float maxMIPLevelScalar = float( maxMIPLevel );
		float sigma = PI * roughness * roughness / ( 1.0 + roughness );
		float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );
	}
	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( -viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
		#else
			vec3 reflectVec = refract( -viewDir, normal, refractionRatio );
		#endif
		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
		float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );
			#else
				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
		#endif
		return envMapColor.rgb * envMapIntensity;
	}
#endif`,jc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qc=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Xc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yc=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,Zc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );
#ifdef REFLECTIVITY
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#endif
#ifdef CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheen;
#endif`,Jc=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif
};
#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {
	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	#ifdef CLEARCOAT
		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = ccDotNL * directLight.color;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			ccIrradiance *= PI;
		#endif
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
	#else
		float clearcoatDHR = 0.0;
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif
	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef CLEARCOAT
		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
	#else
		float clearcoatDHR = 0.0;
	#endif
	float clearcoatInv = 1.0 - clearcoatDHR;
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Qc=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointDirectLightIrradiance( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotDirectLightIrradiance( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );
	#ifdef CLEARCOAT
		clearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );
	#endif
#endif`,$c=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,tl=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,el=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nl=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,il=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,rl=`#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,sl=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ol=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,al=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ll=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hl=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
#endif`,ul=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifndef USE_MORPHNORMALS
		uniform float morphTargetInfluences[ 8 ];
	#else
		uniform float morphTargetInfluences[ 4 ];
	#endif
#endif`,dl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];
	#ifndef USE_MORPHNORMALS
		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];
	#endif
#endif`,fl=`#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
			bitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,pl=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( -vViewPosition, normal, mapN );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );
#endif`,ml=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		float scale = sign( st1.t * st0.s - st0.t * st1.s );
		vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );
		vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );
		vec3 N = normalize( surf_norm );
		mat3 tsn = mat3( S, T, N );
		mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
		return normalize( tsn * mapN );
	}
#endif`,gl=`#ifdef CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,yl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );
	#endif
#endif`,_l=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,vl=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,xl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ml=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wl=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,El=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tl=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Al=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ll=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Cl=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Rl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pl=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,Il=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fl=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Dl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nl=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bl=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ol=`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zl=`#ifdef USE_TRANSMISSIONMAP
	totalTransmission *= texture2D( transmissionMap, vUv ).r;
#endif`,Gl=`#ifdef USE_TRANSMISSIONMAP
	uniform sampler2D transmissionMap;
#endif`,Ul=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Hl=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,kl=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Vl=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Wl=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,jl=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,ql=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Xl=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Yl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zl=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Jl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ql=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Kl=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$l=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,th=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,eh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,nh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ih=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oh=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ah=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ch=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hh=`#define MATCAP
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#ifndef FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,uh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dh=`#define TOON
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ph=`#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mh=`#define STANDARD
#ifdef PHYSICAL
	#define REFLECTIVITY
	#define CLEARCOAT
	#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
	uniform float transmission;
#endif
#ifdef REFLECTIVITY
	uniform float reflectivity;
#endif
#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#ifdef TRANSMISSION
		float totalTransmission = transmission;
	#endif
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <transmissionmap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#ifdef TRANSMISSION
		diffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gh=`#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,_h=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Mh=`#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Sh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`;const Ct={alphamap_fragment:rc,alphamap_pars_fragment:sc,alphatest_fragment:oc,aomap_fragment:ac,aomap_pars_fragment:cc,begin_vertex:lc,beginnormal_vertex:hc,bsdfs:uc,bumpmap_pars_fragment:dc,clipping_planes_fragment:fc,clipping_planes_pars_fragment:pc,clipping_planes_pars_vertex:mc,clipping_planes_vertex:gc,color_fragment:yc,color_pars_fragment:_c,color_pars_vertex:vc,color_vertex:xc,common:bc,cube_uv_reflection_fragment:Mc,defaultnormal_vertex:wc,displacementmap_pars_vertex:Sc,displacementmap_vertex:Ec,emissivemap_fragment:Tc,emissivemap_pars_fragment:Ac,encodings_fragment:Lc,encodings_pars_fragment:Cc,envmap_fragment:Rc,envmap_common_pars_fragment:Pc,envmap_pars_fragment:Ic,envmap_pars_vertex:Fc,envmap_physical_pars_fragment:Wc,envmap_vertex:Dc,fog_vertex:Nc,fog_pars_vertex:Bc,fog_fragment:Oc,fog_pars_fragment:zc,gradientmap_pars_fragment:Gc,lightmap_fragment:Uc,lightmap_pars_fragment:Hc,lights_lambert_vertex:kc,lights_pars_begin:Vc,lights_toon_fragment:jc,lights_toon_pars_fragment:qc,lights_phong_fragment:Xc,lights_phong_pars_fragment:Yc,lights_physical_fragment:Zc,lights_physical_pars_fragment:Jc,lights_fragment_begin:Qc,lights_fragment_maps:Kc,lights_fragment_end:$c,logdepthbuf_fragment:tl,logdepthbuf_pars_fragment:el,logdepthbuf_pars_vertex:nl,logdepthbuf_vertex:il,map_fragment:rl,map_pars_fragment:sl,map_particle_fragment:ol,map_particle_pars_fragment:al,metalnessmap_fragment:cl,metalnessmap_pars_fragment:ll,morphnormal_vertex:hl,morphtarget_pars_vertex:ul,morphtarget_vertex:dl,normal_fragment_begin:fl,normal_fragment_maps:pl,normalmap_pars_fragment:ml,clearcoat_normal_fragment_begin:gl,clearcoat_normal_fragment_maps:yl,clearcoat_pars_fragment:_l,packing:vl,premultiplied_alpha_fragment:xl,project_vertex:bl,dithering_fragment:Ml,dithering_pars_fragment:wl,roughnessmap_fragment:Sl,roughnessmap_pars_fragment:El,shadowmap_pars_fragment:Tl,shadowmap_pars_vertex:Al,shadowmap_vertex:Ll,shadowmask_pars_fragment:Cl,skinbase_vertex:Rl,skinning_pars_vertex:Pl,skinning_vertex:Il,skinnormal_vertex:Fl,specularmap_fragment:Dl,specularmap_pars_fragment:Nl,tonemapping_fragment:Bl,tonemapping_pars_fragment:Ol,transmissionmap_fragment:zl,transmissionmap_pars_fragment:Gl,uv_pars_fragment:Ul,uv_pars_vertex:Hl,uv_vertex:kl,uv2_pars_fragment:Vl,uv2_pars_vertex:Wl,uv2_vertex:jl,worldpos_vertex:ql,background_frag:Xl,background_vert:Yl,cube_frag:Zl,cube_vert:Jl,depth_frag:Ql,depth_vert:Kl,distanceRGBA_frag:$l,distanceRGBA_vert:th,equirect_frag:eh,equirect_vert:nh,linedashed_frag:ih,linedashed_vert:rh,meshbasic_frag:sh,meshbasic_vert:oh,meshlambert_frag:ah,meshlambert_vert:ch,meshmatcap_frag:lh,meshmatcap_vert:hh,meshtoon_frag:uh,meshtoon_vert:dh,meshphong_frag:fh,meshphong_vert:ph,meshphysical_frag:mh,meshphysical_vert:gh,normal_frag:yh,normal_vert:_h,points_frag:vh,points_vert:xh,shadow_frag:bh,shadow_vert:Mh,sprite_frag:wh,sprite_vert:Sh},nt={common:{diffuse:{value:new lt(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new pe},uv2Transform:{value:new pe},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new pe}},sprite:{diffuse:{value:new lt(15658734)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new pe}}},Ce={basic:{uniforms:ne([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Ct.meshbasic_vert,fragmentShader:Ct.meshbasic_frag},lambert:{uniforms:ne([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.fog,nt.lights,{emissive:{value:new lt(0)}}]),vertexShader:Ct.meshlambert_vert,fragmentShader:Ct.meshlambert_frag},phong:{uniforms:ne([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:Ct.meshphong_vert,fragmentShader:Ct.meshphong_frag},standard:{uniforms:ne([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag},toon:{uniforms:ne([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new lt(0)}}]),vertexShader:Ct.meshtoon_vert,fragmentShader:Ct.meshtoon_frag},matcap:{uniforms:ne([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Ct.meshmatcap_vert,fragmentShader:Ct.meshmatcap_frag},points:{uniforms:ne([nt.points,nt.fog]),vertexShader:Ct.points_vert,fragmentShader:Ct.points_frag},dashed:{uniforms:ne([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ct.linedashed_vert,fragmentShader:Ct.linedashed_frag},depth:{uniforms:ne([nt.common,nt.displacementmap]),vertexShader:Ct.depth_vert,fragmentShader:Ct.depth_frag},normal:{uniforms:ne([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Ct.normal_vert,fragmentShader:Ct.normal_frag},sprite:{uniforms:ne([nt.sprite,nt.fog]),vertexShader:Ct.sprite_vert,fragmentShader:Ct.sprite_frag},background:{uniforms:{uvTransform:{value:new pe},t2D:{value:null}},vertexShader:Ct.background_vert,fragmentShader:Ct.background_frag},cube:{uniforms:ne([nt.envmap,{opacity:{value:1}}]),vertexShader:Ct.cube_vert,fragmentShader:Ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ct.equirect_vert,fragmentShader:Ct.equirect_frag},distanceRGBA:{uniforms:ne([nt.common,nt.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ct.distanceRGBA_vert,fragmentShader:Ct.distanceRGBA_frag},shadow:{uniforms:ne([nt.lights,nt.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Ct.shadow_vert,fragmentShader:Ct.shadow_frag}};Ce.physical={uniforms:ne([Ce.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new J(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new lt(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag};function Eh(e,t,n,i,r){const s=new lt(0);let o=0,a,c,l=null,u=0,h=null;function d(g,_,y,m){let p=_.isScene===!0?_.background:null;p&&p.isTexture&&(p=t.get(p));const v=e.xr,w=v.getSession&&v.getSession();w&&w.environmentBlendMode==="additive"&&(p=null),p===null?f(s,o):p&&p.isColor&&(f(p,1),m=!0),(e.autoClear||m)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),p&&(p.isCubeTexture||p.isWebGLCubeRenderTarget||p.mapping===306)?(c===void 0&&(c=new te(new as(1,1,1),new ae({name:"BackgroundCubeMaterial",uniforms:Vn(Ce.cube.uniforms),vertexShader:Ce.cube.vertexShader,fragmentShader:Ce.cube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,x,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),p.isWebGLCubeRenderTarget&&(p=p.texture),c.material.uniforms.envMap.value=p,c.material.uniforms.flipEnvMap.value=p.isCubeTexture&&p._needsFlipEnvMap?-1:1,(l!==p||u!==p.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,l=p,u=p.version,h=e.toneMapping),g.unshift(c,c.geometry,c.material,0,0,null)):p&&p.isTexture&&(a===void 0&&(a=new te(new yn(2,2),new ae({name:"BackgroundMaterial",uniforms:Vn(Ce.background.uniforms),vertexShader:Ce.background.vertexShader,fragmentShader:Ce.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(a)),a.material.uniforms.t2D.value=p,p.matrixAutoUpdate===!0&&p.updateMatrix(),a.material.uniforms.uvTransform.value.copy(p.matrix),(l!==p||u!==p.version||h!==e.toneMapping)&&(a.material.needsUpdate=!0,l=p,u=p.version,h=e.toneMapping),g.unshift(a,a.geometry,a.material,0,0,null))}function f(g,_){n.buffers.color.setClear(g.r,g.g,g.b,_,r)}return{getClearColor:function(){return s},setClearColor:function(g,_=1){s.set(g),o=_,f(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(g){o=g,f(s,o)},render:d}}function Th(e,t,n,i){const r=e.getParameter(34921),s=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=_(null);let l=c;function u(F,L,R,B,G){let H=!1;if(o){const W=g(B,R,L);l!==W&&(l=W,d(l.object)),H=y(B,G),H&&m(B,G)}else{const W=L.wireframe===!0;(l.geometry!==B.id||l.program!==R.id||l.wireframe!==W)&&(l.geometry=B.id,l.program=R.id,l.wireframe=W,H=!0)}F.isInstancedMesh===!0&&(H=!0),G!==null&&n.update(G,34963),H&&(M(F,L,R,B),G!==null&&e.bindBuffer(34963,n.get(G).buffer))}function h(){return i.isWebGL2?e.createVertexArray():s.createVertexArrayOES()}function d(F){return i.isWebGL2?e.bindVertexArray(F):s.bindVertexArrayOES(F)}function f(F){return i.isWebGL2?e.deleteVertexArray(F):s.deleteVertexArrayOES(F)}function g(F,L,R){const B=R.wireframe===!0;let G=a[F.id];G===void 0&&(G={},a[F.id]=G);let H=G[L.id];H===void 0&&(H={},G[L.id]=H);let W=H[B];return W===void 0&&(W=_(h()),H[B]=W),W}function _(F){const L=[],R=[],B=[];for(let G=0;G<r;G++)L[G]=0,R[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:R,attributeDivisors:B,object:F,attributes:{},index:null}}function y(F,L){const R=l.attributes,B=F.attributes;let G=0;for(const H in B){const W=R[H],Y=B[H];if(W===void 0||W.attribute!==Y||W.data!==Y.data)return!0;G++}return l.attributesNum!==G||l.index!==L}function m(F,L){const R={},B=F.attributes;let G=0;for(const H in B){const W=B[H],Y={};Y.attribute=W,W.data&&(Y.data=W.data),R[H]=Y,G++}l.attributes=R,l.attributesNum=G,l.index=L}function p(){const F=l.newAttributes;for(let L=0,R=F.length;L<R;L++)F[L]=0}function v(F){w(F,0)}function w(F,L){const R=l.newAttributes,B=l.enabledAttributes,G=l.attributeDivisors;R[F]=1,B[F]===0&&(e.enableVertexAttribArray(F),B[F]=1),G[F]!==L&&((i.isWebGL2?e:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,L),G[F]=L)}function b(){const F=l.newAttributes,L=l.enabledAttributes;for(let R=0,B=L.length;R<B;R++)L[R]!==F[R]&&(e.disableVertexAttribArray(R),L[R]=0)}function x(F,L,R,B,G,H){i.isWebGL2===!0&&(R===5124||R===5125)?e.vertexAttribIPointer(F,L,R,G,H):e.vertexAttribPointer(F,L,R,B,G,H)}function M(F,L,R,B){if(i.isWebGL2===!1&&(F.isInstancedMesh||B.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;p();const G=B.attributes,H=R.getAttributes(),W=L.defaultAttributeValues;for(const Y in H){const K=H[Y];if(K>=0){const ot=G[Y];if(ot!==void 0){const ft=ot.normalized,It=ot.itemSize,k=n.get(ot);if(k===void 0)continue;const Vt=k.buffer,gt=k.type,wt=k.bytesPerElement;if(ot.isInterleavedBufferAttribute){const yt=ot.data,Lt=yt.stride,vt=ot.offset;yt&&yt.isInstancedInterleavedBuffer?(w(K,yt.meshPerAttribute),B._maxInstanceCount===void 0&&(B._maxInstanceCount=yt.meshPerAttribute*yt.count)):v(K),e.bindBuffer(34962,Vt),x(K,It,gt,ft,Lt*wt,vt*wt)}else ot.isInstancedBufferAttribute?(w(K,ot.meshPerAttribute),B._maxInstanceCount===void 0&&(B._maxInstanceCount=ot.meshPerAttribute*ot.count)):v(K),e.bindBuffer(34962,Vt),x(K,It,gt,ft,0,0)}else if(Y==="instanceMatrix"){const ft=n.get(F.instanceMatrix);if(ft===void 0)continue;const It=ft.buffer,k=ft.type;w(K+0,1),w(K+1,1),w(K+2,1),w(K+3,1),e.bindBuffer(34962,It),e.vertexAttribPointer(K+0,4,k,!1,64,0),e.vertexAttribPointer(K+1,4,k,!1,64,16),e.vertexAttribPointer(K+2,4,k,!1,64,32),e.vertexAttribPointer(K+3,4,k,!1,64,48)}else if(Y==="instanceColor"){const ft=n.get(F.instanceColor);if(ft===void 0)continue;const It=ft.buffer,k=ft.type;w(K,1),e.bindBuffer(34962,It),e.vertexAttribPointer(K,3,k,!1,12,0)}else if(W!==void 0){const ft=W[Y];if(ft!==void 0)switch(ft.length){case 2:e.vertexAttrib2fv(K,ft);break;case 3:e.vertexAttrib3fv(K,ft);break;case 4:e.vertexAttrib4fv(K,ft);break;default:e.vertexAttrib1fv(K,ft)}}}}b()}function P(){N();for(const F in a){const L=a[F];for(const R in L){const B=L[R];for(const G in B)f(B[G].object),delete B[G];delete L[R]}delete a[F]}}function C(F){if(a[F.id]===void 0)return;const L=a[F.id];for(const R in L){const B=L[R];for(const G in B)f(B[G].object),delete B[G];delete L[R]}delete a[F.id]}function I(F){for(const L in a){const R=a[L];if(R[F.id]===void 0)continue;const B=R[F.id];for(const G in B)f(B[G].object),delete B[G];delete R[F.id]}}function N(){O(),l!==c&&(l=c,d(l.object))}function O(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:N,resetDefaultState:O,dispose:P,releaseStatesOfGeometry:C,releaseStatesOfProgram:I,initAttributes:p,enableAttribute:v,disableUnusedAttributes:b}}function Ah(e,t,n,i){const r=i.isWebGL2;let s;function o(l){s=l}function a(l,u){e.drawArrays(s,l,u),n.update(u,s,1)}function c(l,u,h){if(h===0)return;let d,f;if(r)d=e,f="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[f](s,l,u,h),n.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=c}function Lh(e,t,n){let i;function r(){if(i!==void 0)return i;const x=t.get("EXT_texture_filter_anisotropic");return x!==null?i=e.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT):i=0,i}function s(x){if(x==="highp"){if(e.getShaderPrecisionFormat(35633,36338).precision>0&&e.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";x="mediump"}return x==="mediump"&&e.getShaderPrecisionFormat(35633,36337).precision>0&&e.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&e instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&e instanceof WebGL2ComputeRenderingContext;let a=n.precision!==void 0?n.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=n.logarithmicDepthBuffer===!0,u=e.getParameter(34930),h=e.getParameter(35660),d=e.getParameter(3379),f=e.getParameter(34076),g=e.getParameter(34921),_=e.getParameter(36347),y=e.getParameter(36348),m=e.getParameter(36349),p=h>0,v=o||!!t.get("OES_texture_float"),w=p&&v,b=o?e.getParameter(36183):0;return{isWebGL2:o,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:l,maxTextures:u,maxVertexTextures:h,maxTextureSize:d,maxCubemapSize:f,maxAttributes:g,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:m,vertexTextures:p,floatFragmentTextures:v,floatVertexTextures:w,maxSamples:b}}function Ch(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new Ge,a=new pe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d,f){const g=h.length!==0||d||i!==0||r;return r=d,n=u(h,f,0),i=h.length,g},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1,l()},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,y=h.clipShadows,m=e.get(h);if(!r||g===null||g.length===0||s&&!y)s?u(null):l();else{const p=s?0:i,v=p*4;let w=m.clippingState||null;c.value=w,w=u(g,d,v,f);for(let b=0;b!==v;++b)w[b]=n[b];m.clippingState=w,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=p}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let y=null;if(_!==0){if(y=c.value,g!==!0||y===null){const m=f+_*4,p=d.matrixWorldInverse;a.getNormalMatrix(p),(y===null||y.length<m)&&(y=new Float32Array(m));for(let v=0,w=f;v!==_;++v,w+=4)o.copy(h[v]).applyMatrix4(p,a),o.normal.toArray(y,w),y[w+3]=o.constant}c.value=y,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,y}}function Rh(e){let t=new WeakMap;function n(o,a){return a===303?o.mapping=301:a===304&&(o.mapping=302),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===303||a===304)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=e.getRenderList(),u=e.getRenderTarget(),h=new nc(c.height/2);return h.fromEquirectangularTexture(e,o),t.set(o,h),e.setRenderTarget(u),e.setRenderList(l),o.addEventListener("dispose",r),n(h.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}function Ph(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?n("EXT_color_buffer_float"):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Ih(e,t,n,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],34962);const f=h.morphAttributes;for(const g in f){const _=f[g];for(let y=0,m=_.length;y<m;y++)t.update(_[y],34962)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const p=f.array;_=f.version;for(let v=0,w=p.length;v<w;v+=3){const b=p[v+0],x=p[v+1],M=p[v+2];d.push(b,x,x,M,M,b)}}else{const p=g.array;_=g.version;for(let v=0,w=p.length/3-1;v<w;v+=3){const b=v+0,x=v+1,M=v+2;d.push(b,x,x,M,M,b)}}const y=new(io(d)>65535?bi:xi)(d,1);y.version=_;const m=s.get(h);m&&t.remove(m),s.set(h,y)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Fh(e,t,n,i){const r=i.isWebGL2;let s;function o(d){s=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function u(d,f){e.drawElements(s,f,a,d*c),n.update(f,s,1)}function h(d,f,g){if(g===0)return;let _,y;if(r)_=e,y="drawElementsInstanced";else if(_=t.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[y](s,f,a,d*c,g),n.update(f,s,g)}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h}function Dh(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case 4:n.triangles+=a*(s/3);break;case 1:n.lines+=a*(s/2);break;case 3:n.lines+=a*(s-1);break;case 2:n.lines+=a*s;break;case 0:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.frame++,n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Nh(e,t){return e[0]-t[0]}function Bh(e,t){return Math.abs(t[1])-Math.abs(e[1])}function Oh(e){const t={},n=new Float32Array(8),i=[];for(let s=0;s<8;s++)i[s]=[s,0];function r(s,o,a,c){const l=s.morphTargetInfluences,u=l===void 0?0:l.length;let h=t[o.id];if(h===void 0){h=[];for(let y=0;y<u;y++)h[y]=[y,0];t[o.id]=h}for(let y=0;y<u;y++){const m=h[y];m[0]=y,m[1]=l[y]}h.sort(Bh);for(let y=0;y<8;y++)y<u&&h[y][1]?(i[y][0]=h[y][0],i[y][1]=h[y][1]):(i[y][0]=Number.MAX_SAFE_INTEGER,i[y][1]=0);i.sort(Nh);const d=a.morphTargets&&o.morphAttributes.position,f=a.morphNormals&&o.morphAttributes.normal;let g=0;for(let y=0;y<8;y++){const m=i[y],p=m[0],v=m[1];p!==Number.MAX_SAFE_INTEGER&&v?(d&&o.getAttribute("morphTarget"+y)!==d[p]&&o.setAttribute("morphTarget"+y,d[p]),f&&o.getAttribute("morphNormal"+y)!==f[p]&&o.setAttribute("morphNormal"+y,f[p]),n[y]=v,g+=v):(d&&o.hasAttribute("morphTarget"+y)===!0&&o.deleteAttribute("morphTarget"+y),f&&o.hasAttribute("morphNormal"+y)===!0&&o.deleteAttribute("morphNormal"+y),n[y]=0)}const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(e,"morphTargetBaseInfluence",_),c.getUniforms().setValue(e,"morphTargetInfluences",n)}return{update:r}}function zh(e,t,n,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,h=t.get(c,u);return r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),n.update(c.instanceMatrix,34962),c.instanceColor!==null&&n.update(c.instanceColor,34962)),h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:s,dispose:o}}function wi(e=null,t=1,n=1,i=1){Ot.call(this,null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.needsUpdate=!0}wi.prototype=Object.create(Ot.prototype),wi.prototype.constructor=wi,wi.prototype.isDataTexture2DArray=!0;function Si(e=null,t=1,n=1,i=1){Ot.call(this,null),this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.needsUpdate=!0}Si.prototype=Object.create(Ot.prototype),Si.prototype.constructor=Si,Si.prototype.isDataTexture3D=!0;const oo=new Ot,Gh=new wi,Uh=new Si,ao=new an,co=[],lo=[],ho=new Float32Array(16),uo=new Float32Array(9),fo=new Float32Array(4);function Zn(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=co[r];if(s===void 0&&(s=new Float32Array(r),co[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function ge(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function ue(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function po(e,t){let n=lo[t];n===void 0&&(n=new Int32Array(t),lo[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Hh(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function kh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ge(n,t))return;e.uniform2fv(this.addr,t),ue(n,t)}}function Vh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ge(n,t))return;e.uniform3fv(this.addr,t),ue(n,t)}}function Wh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ge(n,t))return;e.uniform4fv(this.addr,t),ue(n,t)}}function jh(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(ge(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ue(n,t)}else{if(ge(n,i))return;fo.set(i),e.uniformMatrix2fv(this.addr,!1,fo),ue(n,i)}}function qh(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(ge(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ue(n,t)}else{if(ge(n,i))return;uo.set(i),e.uniformMatrix3fv(this.addr,!1,uo),ue(n,i)}}function Xh(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(ge(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ue(n,t)}else{if(ge(n,i))return;ho.set(i),e.uniformMatrix4fv(this.addr,!1,ho),ue(n,i)}}function Yh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.safeSetTexture2D(t||oo,r)}function Zh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Gh,r)}function Jh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Uh,r)}function Qh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.safeSetTextureCube(t||ao,r)}function Kh(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function $h(e,t){const n=this.cache;ge(n,t)||(e.uniform2iv(this.addr,t),ue(n,t))}function tu(e,t){const n=this.cache;ge(n,t)||(e.uniform3iv(this.addr,t),ue(n,t))}function eu(e,t){const n=this.cache;ge(n,t)||(e.uniform4iv(this.addr,t),ue(n,t))}function nu(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function iu(e){switch(e){case 5126:return Hh;case 35664:return kh;case 35665:return Vh;case 35666:return Wh;case 35674:return jh;case 35675:return qh;case 35676:return Xh;case 5124:case 35670:return Kh;case 35667:case 35671:return $h;case 35668:case 35672:return tu;case 35669:case 35673:return eu;case 5125:return nu;case 35678:case 36198:case 36298:case 36306:case 35682:return Yh;case 35679:case 36299:case 36307:return Jh;case 35680:case 36300:case 36308:case 36293:return Qh;case 36289:case 36303:case 36311:case 36292:return Zh}}function ru(e,t){e.uniform1fv(this.addr,t)}function su(e,t){e.uniform1iv(this.addr,t)}function ou(e,t){e.uniform2iv(this.addr,t)}function au(e,t){e.uniform3iv(this.addr,t)}function cu(e,t){e.uniform4iv(this.addr,t)}function lu(e,t){const n=Zn(t,this.size,2);e.uniform2fv(this.addr,n)}function hu(e,t){const n=Zn(t,this.size,3);e.uniform3fv(this.addr,n)}function uu(e,t){const n=Zn(t,this.size,4);e.uniform4fv(this.addr,n)}function du(e,t){const n=Zn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function fu(e,t){const n=Zn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function pu(e,t){const n=Zn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function mu(e,t,n){const i=t.length,r=po(n,i);e.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)n.safeSetTexture2D(t[s]||oo,r[s])}function gu(e,t,n){const i=t.length,r=po(n,i);e.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)n.safeSetTextureCube(t[s]||ao,r[s])}function yu(e){switch(e){case 5126:return ru;case 35664:return lu;case 35665:return hu;case 35666:return uu;case 35674:return du;case 35675:return fu;case 35676:return pu;case 5124:case 35670:return su;case 35667:case 35671:return ou;case 35668:case 35672:return au;case 35669:case 35673:return cu;case 35678:case 36198:case 36298:case 36306:case 35682:return mu;case 35680:case 36300:case 36308:case 36293:return gu}}function _u(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=iu(t.type)}function mo(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=yu(t.type)}mo.prototype.updateCache=function(e){const t=this.cache;e instanceof Float32Array&&t.length!==e.length&&(this.cache=new Float32Array(e.length)),ue(t,e)};function go(e){this.id=e,this.seq=[],this.map={}}go.prototype.setValue=function(e,t,n){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const o=i[r];o.setValue(e,t[o.id],n)}};const cs=/(\w+)(\])?(\[|\.)?/g;function yo(e,t){e.seq.push(t),e.map[t.id]=t}function vu(e,t,n){const i=e.name,r=i.length;for(cs.lastIndex=0;;){const s=cs.exec(i),o=cs.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){yo(n,l===void 0?new _u(a,e,t):new mo(a,e,t));break}else{let h=n.map[a];h===void 0&&(h=new go(a),yo(n,h)),n=h}}}function cn(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),s=e.getUniformLocation(t,r.name);vu(r,s,this)}}cn.prototype.setValue=function(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)},cn.prototype.setOptional=function(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)},cn.upload=function(e,t,n,i){for(let r=0,s=t.length;r!==s;++r){const o=t[r],a=n[o.id];a.needsUpdate!==!1&&o.setValue(e,a.value,i)}},cn.seqWithValue=function(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in t&&n.push(s)}return n};function _o(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}let xu=0;function bu(e){const t=e.split(`
`);for(let n=0;n<t.length;n++)t[n]=n+1+": "+t[n];return t.join(`
`)}function vo(e){switch(e){case 3e3:return["Linear","( value )"];case 3001:return["sRGB","( value )"];case 3002:return["RGBE","( value )"];case 3004:return["RGBM","( value, 7.0 )"];case 3005:return["RGBM","( value, 16.0 )"];case 3006:return["RGBD","( value, 256.0 )"];case 3007:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case 3003:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",e),["Linear","( value )"]}}function xo(e,t,n){const i=e.getShaderParameter(t,35713),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=e.getShaderSource(t);return"THREE.WebGLShader: gl.getShaderInfoLog() "+n+`
`+r+bu(s)}function Ei(e,t){const n=vo(t);return"vec4 "+e+"( vec4 value ) { return "+n[0]+"ToLinear"+n[1]+"; }"}function Mu(e,t){const n=vo(t);return"vec4 "+e+"( vec4 value ) { return LinearTo"+n[0]+n[1]+"; }"}function wu(e,t){let n;switch(t){case 1:n="Linear";break;case 2:n="Reinhard";break;case 3:n="OptimizedCineon";break;case 4:n="ACESFilmic";break;case 5:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Su(e){return[e.extensionDerivatives||e.envMapCubeUV||e.bumpMap||e.tangentSpaceNormalMap||e.clearcoatNormalMap||e.flatShading||e.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ti).join(`
`)}function Eu(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function Tu(e,t){const n={},i=e.getProgramParameter(t,35721);for(let r=0;r<i;r++){const o=e.getActiveAttrib(t,r).name;n[o]=e.getAttribLocation(t,o)}return n}function Ti(e){return e!==""}function bo(e,t){return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Mo(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Au=/^[ \t]*#include +<([\w\d./]+)>/gm;function ls(e){return e.replace(Au,Lu)}function Lu(e,t){const n=Ct[t];if(n===void 0)throw new Error("Can not resolve #include <"+t+">");return ls(n)}const Cu=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Ru=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wo(e){return e.replace(Ru,So).replace(Cu,Pu)}function Pu(e,t,n,i){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),So(e,t,n,i)}function So(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Eo(e){let t="precision "+e.precision+` float;
precision `+e.precision+" int;";return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Iu(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===1?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===2?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===3&&(t="SHADOWMAP_TYPE_VSM"),t}function Fu(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case 301:case 302:t="ENVMAP_TYPE_CUBE";break;case 306:case 307:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Du(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case 302:case 307:t="ENVMAP_MODE_REFRACTION";break}return t}function Nu(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case 0:t="ENVMAP_BLENDING_MULTIPLY";break;case 1:t="ENVMAP_BLENDING_MIX";break;case 2:t="ENVMAP_BLENDING_ADD";break}return t}function Bu(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=Iu(n),l=Fu(n),u=Du(n),h=Nu(n),d=e.gammaFactor>0?e.gammaFactor:1,f=n.isWebGL2?"":Su(n),g=Eu(s),_=r.createProgram();let y,m,p=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=[g].filter(Ti).join(`
`),y.length>0&&(y+=`
`),m=[f,g].filter(Ti).join(`
`),m.length>0&&(m+=`
`)):(y=[Eo(n),"#define SHADER_NAME "+n.shaderName,g,n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+d,"#define MAX_BONES "+n.maxBones,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMap&&n.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",n.normalMap&&n.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.displacementMap&&n.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexUvs?"#define USE_UV":"",n.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.useVertexTexture?"#define BONE_TEXTURE":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#ifdef USE_COLOR","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ti).join(`
`),m=[f,Eo(n),"#define SHADER_NAME "+n.shaderName,g,n.alphaTest?"#define ALPHATEST "+n.alphaTest+(n.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+d,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMap&&n.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",n.normalMap&&n.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.sheen?"#define USE_SHEEN":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexUvs?"#define USE_UV":"",n.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(n.extensionShaderTextureLOD||n.envMap)&&n.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==0?"#define TONE_MAPPING":"",n.toneMapping!==0?Ct.tonemapping_pars_fragment:"",n.toneMapping!==0?wu("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",Ct.encodings_pars_fragment,n.map?Ei("mapTexelToLinear",n.mapEncoding):"",n.matcap?Ei("matcapTexelToLinear",n.matcapEncoding):"",n.envMap?Ei("envMapTexelToLinear",n.envMapEncoding):"",n.emissiveMap?Ei("emissiveMapTexelToLinear",n.emissiveMapEncoding):"",n.lightMap?Ei("lightMapTexelToLinear",n.lightMapEncoding):"",Mu("linearToOutputTexel",n.outputEncoding),n.depthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ti).join(`
`)),o=ls(o),o=bo(o,n),o=Mo(o,n),a=ls(a),a=bo(a,n),a=Mo(a,n),o=wo(o),a=wo(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,y=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",n.glslVersion===js?"":"out highp vec4 pc_fragColor;",n.glslVersion===js?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=p+y+o,w=p+m+a,b=_o(r,35633,v),x=_o(r,35632,w);if(r.attachShader(_,b),r.attachShader(_,x),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_),e.debug.checkShaderErrors){const C=r.getProgramInfoLog(_).trim(),I=r.getShaderInfoLog(b).trim(),N=r.getShaderInfoLog(x).trim();let O=!0,F=!0;if(r.getProgramParameter(_,35714)===!1){O=!1;const L=xo(r,b,"vertex"),R=xo(r,x,"fragment");console.error("THREE.WebGLProgram: shader error: ",r.getError(),"35715",r.getProgramParameter(_,35715),"gl.getProgramInfoLog",C,L,R)}else C!==""?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",C):(I===""||N==="")&&(F=!1);F&&(this.diagnostics={runnable:O,programLog:C,vertexShader:{log:I,prefix:y},fragmentShader:{log:N,prefix:m}})}r.deleteShader(b),r.deleteShader(x);let M;this.getUniforms=function(){return M===void 0&&(M=new cn(r,_)),M};let P;return this.getAttributes=function(){return P===void 0&&(P=Tu(r,_)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.name=n.shaderName,this.id=xu++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=x,this}function Ou(e,t,n,i,r,s){const o=[],a=i.isWebGL2,c=i.logarithmicDepthBuffer,l=i.floatVertexTextures,u=i.maxVertexUniforms,h=i.vertexTextures;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},g=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function _(x){const P=x.skeleton.bones;if(l)return 1024;{const I=Math.floor((u-20)/4),N=Math.min(I,P.length);return N<P.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+P.length+" bones. This GPU supports "+N+"."),0):N}}function y(x){let M;return x&&x.isTexture?M=x.encoding:x&&x.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),M=x.texture.encoding):M=3e3,M}function m(x,M,P,C,I){const N=C.fog,O=x.isMeshStandardMaterial?C.environment:null,F=t.get(x.envMap||O),L=f[x.type],R=I.isSkinnedMesh?_(I):0;x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let B,G;if(L){const Y=Ce[L];B=Y.vertexShader,G=Y.fragmentShader}else B=x.vertexShader,G=x.fragmentShader;const H=e.getRenderTarget();return{isWebGL2:a,shaderID:L,shaderName:x.type,vertexShader:B,fragmentShader:G,defines:x.defines,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,instancing:I.isInstancedMesh===!0,instancingColor:I.isInstancedMesh===!0&&I.instanceColor!==null,supportsVertexTextures:h,outputEncoding:H!==null?y(H.texture):e.outputEncoding,map:!!x.map,mapEncoding:y(x.map),matcap:!!x.matcap,matcapEncoding:y(x.matcap),envMap:!!F,envMapMode:F&&F.mapping,envMapEncoding:y(F),envMapCubeUV:!!F&&(F.mapping===306||F.mapping===307),lightMap:!!x.lightMap,lightMapEncoding:y(x.lightMap),aoMap:!!x.aoMap,emissiveMap:!!x.emissiveMap,emissiveMapEncoding:y(x.emissiveMap),bumpMap:!!x.bumpMap,normalMap:!!x.normalMap,objectSpaceNormalMap:x.normalMapType===1,tangentSpaceNormalMap:x.normalMapType===0,clearcoatMap:!!x.clearcoatMap,clearcoatRoughnessMap:!!x.clearcoatRoughnessMap,clearcoatNormalMap:!!x.clearcoatNormalMap,displacementMap:!!x.displacementMap,roughnessMap:!!x.roughnessMap,metalnessMap:!!x.metalnessMap,specularMap:!!x.specularMap,alphaMap:!!x.alphaMap,gradientMap:!!x.gradientMap,sheen:!!x.sheen,transmissionMap:!!x.transmissionMap,combine:x.combine,vertexTangents:x.normalMap&&x.vertexTangents,vertexColors:x.vertexColors,vertexUvs:!!x.map||!!x.bumpMap||!!x.normalMap||!!x.specularMap||!!x.alphaMap||!!x.emissiveMap||!!x.roughnessMap||!!x.metalnessMap||!!x.clearcoatMap||!!x.clearcoatRoughnessMap||!!x.clearcoatNormalMap||!!x.displacementMap||!!x.transmissionMap,uvsVertexOnly:!(x.map||x.bumpMap||x.normalMap||x.specularMap||x.alphaMap||x.emissiveMap||x.roughnessMap||x.metalnessMap||x.clearcoatNormalMap||x.transmissionMap)&&!!x.displacementMap,fog:!!N,useFog:x.fog,fogExp2:N&&N.isFogExp2,flatShading:x.flatShading,sizeAttenuation:x.sizeAttenuation,logarithmicDepthBuffer:c,skinning:x.skinning&&R>0,maxBones:R,useVertexTexture:l,morphTargets:x.morphTargets,morphNormals:x.morphNormals,maxMorphTargets:e.maxMorphTargets,maxMorphNormals:e.maxMorphNormals,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&P.length>0,shadowMapType:e.shadowMap.type,toneMapping:x.toneMapped?e.toneMapping:0,physicallyCorrectLights:e.physicallyCorrectLights,premultipliedAlpha:x.premultipliedAlpha,alphaTest:x.alphaTest,doubleSided:x.side===2,flipSided:x.side===1,depthPacking:x.depthPacking!==void 0?x.depthPacking:!1,index0AttributeName:x.index0AttributeName,extensionDerivatives:x.extensions&&x.extensions.derivatives,extensionFragDepth:x.extensions&&x.extensions.fragDepth,extensionDrawBuffers:x.extensions&&x.extensions.drawBuffers,extensionShaderTextureLOD:x.extensions&&x.extensions.shaderTextureLOD,rendererExtensionFragDepth:a||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:a||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:a||n.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function p(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.fragmentShader),M.push(x.vertexShader)),x.defines!==void 0)for(const P in x.defines)M.push(P),M.push(x.defines[P]);if(x.isRawShaderMaterial===!1){for(let P=0;P<g.length;P++)M.push(x[g[P]]);M.push(e.outputEncoding),M.push(e.gammaFactor)}return M.push(x.customProgramCacheKey),M.join()}function v(x){const M=f[x.type];let P;if(M){const C=Ce[M];P=$a.clone(C.uniforms)}else P=x.uniforms;return P}function w(x,M){let P;for(let C=0,I=o.length;C<I;C++){const N=o[C];if(N.cacheKey===M){P=N,++P.usedTimes;break}}return P===void 0&&(P=new Bu(e,M,x,r),o.push(P)),P}function b(x){if(--x.usedTimes===0){const M=o.indexOf(x);o[M]=o[o.length-1],o.pop(),x.destroy()}}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:w,releaseProgram:b,programs:o}}function zu(){let e=new WeakMap;function t(s){let o=e.get(s);return o===void 0&&(o={},e.set(s,o)),o}function n(s){e.delete(s)}function i(s,o,a){e.get(s)[o]=a}function r(){e=new WeakMap}return{get:t,remove:n,update:i,dispose:r}}function Gu(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.program!==t.program?e.program.id-t.program.id:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Uu(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function To(e){const t=[];let n=0;const i=[],r=[],s={id:-1};function o(){n=0,i.length=0,r.length=0}function a(d,f,g,_,y,m){let p=t[n];const v=e.get(g);return p===void 0?(p={id:d.id,object:d,geometry:f,material:g,program:v.program||s,groupOrder:_,renderOrder:d.renderOrder,z:y,group:m},t[n]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=g,p.program=v.program||s,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=y,p.group=m),n++,p}function c(d,f,g,_,y,m){const p=a(d,f,g,_,y,m);(g.transparent===!0?r:i).push(p)}function l(d,f,g,_,y,m){const p=a(d,f,g,_,y,m);(g.transparent===!0?r:i).unshift(p)}function u(d,f){i.length>1&&i.sort(d||Gu),r.length>1&&r.sort(f||Uu)}function h(){for(let d=n,f=t.length;d<f;d++){const g=t[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.program=null,g.group=null}}return{opaque:i,transparent:r,init:o,push:c,unshift:l,finish:h,sort:u}}function Hu(e){let t=new WeakMap;function n(r,s){const o=t.get(r);let a;return o===void 0?(a=new To(e),t.set(r,new WeakMap),t.get(r).set(s,a)):(a=o.get(s),a===void 0&&(a=new To(e),o.set(s,a))),a}function i(){t=new WeakMap}return{get:n,dispose:i}}function ku(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new E,color:new lt};break;case"SpotLight":n={position:new E,direction:new E,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new E,color:new lt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new E,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":n={color:new lt,position:new E,halfWidth:new E,halfHeight:new E};break}return e[t.id]=n,n}}}function Vu(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let Wu=0;function ju(e,t){return(t.castShadow?1:0)-(e.castShadow?1:0)}function qu(e,t){const n=new ku,i=Vu(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let u=0;u<9;u++)r.probe.push(new E);const s=new E,o=new At,a=new At;function c(u){let h=0,d=0,f=0;for(let M=0;M<9;M++)r.probe[M].set(0,0,0);let g=0,_=0,y=0,m=0,p=0,v=0,w=0,b=0;u.sort(ju);for(let M=0,P=u.length;M<P;M++){const C=u[M],I=C.color,N=C.intensity,O=C.distance,F=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=I.r*N,d+=I.g*N,f+=I.b*N;else if(C.isLightProbe)for(let L=0;L<9;L++)r.probe[L].addScaledVector(C.sh.coefficients[L],N);else if(C.isDirectionalLight){const L=n.get(C);if(L.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const R=C.shadow,B=i.get(C);B.shadowBias=R.bias,B.shadowNormalBias=R.normalBias,B.shadowRadius=R.radius,B.shadowMapSize=R.mapSize,r.directionalShadow[g]=B,r.directionalShadowMap[g]=F,r.directionalShadowMatrix[g]=C.shadow.matrix,v++}r.directional[g]=L,g++}else if(C.isSpotLight){const L=n.get(C);if(L.position.setFromMatrixPosition(C.matrixWorld),L.color.copy(I).multiplyScalar(N),L.distance=O,L.coneCos=Math.cos(C.angle),L.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),L.decay=C.decay,C.castShadow){const R=C.shadow,B=i.get(C);B.shadowBias=R.bias,B.shadowNormalBias=R.normalBias,B.shadowRadius=R.radius,B.shadowMapSize=R.mapSize,r.spotShadow[y]=B,r.spotShadowMap[y]=F,r.spotShadowMatrix[y]=C.shadow.matrix,b++}r.spot[y]=L,y++}else if(C.isRectAreaLight){const L=n.get(C);L.color.copy(I).multiplyScalar(N),L.halfWidth.set(C.width*.5,0,0),L.halfHeight.set(0,C.height*.5,0),r.rectArea[m]=L,m++}else if(C.isPointLight){const L=n.get(C);if(L.color.copy(C.color).multiplyScalar(C.intensity),L.distance=C.distance,L.decay=C.decay,C.castShadow){const R=C.shadow,B=i.get(C);B.shadowBias=R.bias,B.shadowNormalBias=R.normalBias,B.shadowRadius=R.radius,B.shadowMapSize=R.mapSize,B.shadowCameraNear=R.camera.near,B.shadowCameraFar=R.camera.far,r.pointShadow[_]=B,r.pointShadowMap[_]=F,r.pointShadowMatrix[_]=C.shadow.matrix,w++}r.point[_]=L,_++}else if(C.isHemisphereLight){const L=n.get(C);L.skyColor.copy(C.color).multiplyScalar(N),L.groundColor.copy(C.groundColor).multiplyScalar(N),r.hemi[p]=L,p++}}m>0&&(t.isWebGL2||e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=nt.LTC_FLOAT_1,r.rectAreaLTC2=nt.LTC_FLOAT_2):e.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=nt.LTC_HALF_1,r.rectAreaLTC2=nt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=d,r.ambient[2]=f;const x=r.hash;(x.directionalLength!==g||x.pointLength!==_||x.spotLength!==y||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==v||x.numPointShadows!==w||x.numSpotShadows!==b)&&(r.directional.length=g,r.spot.length=y,r.rectArea.length=m,r.point.length=_,r.hemi.length=p,r.directionalShadow.length=v,r.directionalShadowMap.length=v,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=v,r.pointShadowMatrix.length=w,r.spotShadowMatrix.length=b,x.directionalLength=g,x.pointLength=_,x.spotLength=y,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=v,x.numPointShadows=w,x.numSpotShadows=b,r.version=Wu++)}function l(u,h){let d=0,f=0,g=0,_=0,y=0;const m=h.matrixWorldInverse;for(let p=0,v=u.length;p<v;p++){const w=u[p];if(w.isDirectionalLight){const b=r.directional[d];b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(w.isSpotLight){const b=r.spot[g];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),g++}else if(w.isRectAreaLight){const b=r.rectArea[_];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),a.identity(),o.copy(w.matrixWorld),o.premultiply(m),a.extractRotation(o),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(w.isPointLight){const b=r.point[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const b=r.hemi[y];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(m),b.direction.normalize(),y++}}}return{setup:c,setupView:l,state:r}}function Ao(e,t){const n=new qu(e,t),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function c(){n.setup(i)}function l(h){n.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Xu(e,t){let n=new WeakMap;function i(s,o=0){let a;return n.has(s)===!1?(a=new Ao(e,t),n.set(s,[]),n.get(s).push(a)):o>=n.get(s).length?(a=new Ao(e,t),n.get(s).push(a)):a=n.get(s)[o],a}function r(){n=new WeakMap}return{get:i,dispose:r}}function _n(e){_t.call(this),this.type="MeshDepthMaterial",this.depthPacking=3200,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}_n.prototype=Object.create(_t.prototype),_n.prototype.constructor=_n,_n.prototype.isMeshDepthMaterial=!0,_n.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this};function vn(e){_t.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new E,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}vn.prototype=Object.create(_t.prototype),vn.prototype.constructor=vn,vn.prototype.isMeshDistanceMaterial=!0,vn.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this};var Yu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	float mean = 0.0;
	float squared_mean = 0.0;
	float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );
	for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean * HALF_SAMPLE_RATE;
	squared_mean = squared_mean * HALF_SAMPLE_RATE;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,Zu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;function Lo(e,t,n){let i=new hr;const r=new J,s=new J,o=new Nt,a=[],c=[],l={},u={0:1,1:0,2:2},h=new ae({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:Zu,fragmentShader:Yu}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const f=new Gt;f.setAttribute("position",new St(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new te(f,h),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1,this.render=function(b,x,M){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||b.length===0)return;const P=e.getRenderTarget(),C=e.getActiveCubeFace(),I=e.getActiveMipmapLevel(),N=e.state;N.setBlending(0),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);for(let O=0,F=b.length;O<F;O++){const L=b[O],R=L.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",L,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;r.copy(R.mapSize);const B=R.getFrameExtents();if(r.multiply(B),s.copy(R.mapSize),(r.x>n||r.y>n)&&(r.x>n&&(s.x=Math.floor(n/B.x),r.x=s.x*B.x,R.mapSize.x=s.x),r.y>n&&(s.y=Math.floor(n/B.y),r.y=s.y*B.y,R.mapSize.y=s.y)),R.map===null&&!R.isPointLightShadow&&this.type===3){const H={minFilter:1006,magFilter:1006,format:1023};R.map=new pi(r.x,r.y,H),R.map.texture.name=L.name+".shadowMap",R.mapPass=new pi(r.x,r.y,H),R.camera.updateProjectionMatrix()}if(R.map===null){const H={minFilter:1003,magFilter:1003,format:1023};R.map=new pi(r.x,r.y,H),R.map.texture.name=L.name+".shadowMap",R.camera.updateProjectionMatrix()}e.setRenderTarget(R.map),e.clear();const G=R.getViewportCount();for(let H=0;H<G;H++){const W=R.getViewport(H);o.set(s.x*W.x,s.y*W.y,s.x*W.z,s.y*W.w),N.viewport(o),R.updateMatrices(L,H),i=R.getFrustum(),w(x,M,R.camera,L,this.type)}!R.isPointLightShadow&&this.type===3&&y(R,M),R.needsUpdate=!1}_.needsUpdate=!1,e.setRenderTarget(P,C,I)};function y(b,x){const M=t.update(g);h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(x,null,M,h,g,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(x,null,M,d,g,null)}function m(b,x,M){const P=b<<0|x<<1|M<<2;let C=a[P];return C===void 0&&(C=new _n({depthPacking:3201,morphTargets:b,skinning:x}),a[P]=C),C}function p(b,x,M){const P=b<<0|x<<1|M<<2;let C=c[P];return C===void 0&&(C=new vn({morphTargets:b,skinning:x}),c[P]=C),C}function v(b,x,M,P,C,I,N){let O=null,F=m,L=b.customDepthMaterial;if(P.isPointLight===!0&&(F=p,L=b.customDistanceMaterial),L===void 0){let R=!1;M.morphTargets===!0&&(R=x.morphAttributes&&x.morphAttributes.position&&x.morphAttributes.position.length>0);let B=!1;b.isSkinnedMesh===!0&&(M.skinning===!0?B=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",b));const G=b.isInstancedMesh===!0;O=F(R,B,G)}else O=L;if(e.localClippingEnabled&&M.clipShadows===!0&&M.clippingPlanes.length!==0){const R=O.uuid,B=M.uuid;let G=l[R];G===void 0&&(G={},l[R]=G);let H=G[B];H===void 0&&(H=O.clone(),G[B]=H),O=H}return O.visible=M.visible,O.wireframe=M.wireframe,N===3?O.side=M.shadowSide!==null?M.shadowSide:M.side:O.side=M.shadowSide!==null?M.shadowSide:u[M.side],O.clipShadows=M.clipShadows,O.clippingPlanes=M.clippingPlanes,O.clipIntersection=M.clipIntersection,O.wireframeLinewidth=M.wireframeLinewidth,O.linewidth=M.linewidth,P.isPointLight===!0&&O.isMeshDistanceMaterial===!0&&(O.referencePosition.setFromMatrixPosition(P.matrixWorld),O.nearDistance=C,O.farDistance=I),O}function w(b,x,M,P,C){if(b.visible===!1)return;if(b.layers.test(x.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===3)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,b.matrixWorld);const O=t.update(b),F=b.material;if(Array.isArray(F)){const L=O.groups;for(let R=0,B=L.length;R<B;R++){const G=L[R],H=F[G.materialIndex];if(H&&H.visible){const W=v(b,O,H,P,M.near,M.far,C);e.renderBufferDirect(M,null,O,W,b,G)}}}else if(F.visible){const L=v(b,O,F,P,M.near,M.far,C);e.renderBufferDirect(M,null,O,L,b,null)}}const N=b.children;for(let O=0,F=N.length;O<F;O++)w(N[O],x,M,P,C)}}function Ju(e,t,n){const i=n.isWebGL2;function r(){let D=!1;const Z=new Nt;let it=null;const ht=new Nt(0,0,0,0);return{setMask:function(tt){it!==tt&&!D&&(e.colorMask(tt,tt,tt,tt),it=tt)},setLocked:function(tt){D=tt},setClear:function(tt,ct,ut,xt,st){st===!0&&(tt*=xt,ct*=xt,ut*=xt),Z.set(tt,ct,ut,xt),ht.equals(Z)===!1&&(e.clearColor(tt,ct,ut,xt),ht.copy(Z))},reset:function(){D=!1,it=null,ht.set(-1,0,0,0)}}}function s(){let D=!1,Z=null,it=null,ht=null;return{setTest:function(tt){tt?Y(2929):K(2929)},setMask:function(tt){Z!==tt&&!D&&(e.depthMask(tt),Z=tt)},setFunc:function(tt){if(it!==tt){if(tt)switch(tt){case 0:e.depthFunc(512);break;case 1:e.depthFunc(519);break;case 2:e.depthFunc(513);break;case 3:e.depthFunc(515);break;case 4:e.depthFunc(514);break;case 5:e.depthFunc(518);break;case 6:e.depthFunc(516);break;case 7:e.depthFunc(517);break;default:e.depthFunc(515)}else e.depthFunc(515);it=tt}},setLocked:function(tt){D=tt},setClear:function(tt){ht!==tt&&(e.clearDepth(tt),ht=tt)},reset:function(){D=!1,Z=null,it=null,ht=null}}}function o(){let D=!1,Z=null,it=null,ht=null,tt=null,ct=null,ut=null,xt=null,st=null;return{setTest:function(pt){D||(pt?Y(2960):K(2960))},setMask:function(pt){Z!==pt&&!D&&(e.stencilMask(pt),Z=pt)},setFunc:function(pt,Ft,Yt){(it!==pt||ht!==Ft||tt!==Yt)&&(e.stencilFunc(pt,Ft,Yt),it=pt,ht=Ft,tt=Yt)},setOp:function(pt,Ft,Yt){(ct!==pt||ut!==Ft||xt!==Yt)&&(e.stencilOp(pt,Ft,Yt),ct=pt,ut=Ft,xt=Yt)},setLocked:function(pt){D=pt},setClear:function(pt){st!==pt&&(e.clearStencil(pt),st=pt)},reset:function(){D=!1,Z=null,it=null,ht=null,tt=null,ct=null,ut=null,xt=null,st=null}}}const a=new r,c=new s,l=new o;let u={},h=null,d=null,f=null,g=null,_=null,y=null,m=null,p=null,v=null,w=!1,b=null,x=null,M=null,P=null,C=null;const I=e.getParameter(35661);let N=!1,O=0;const F=e.getParameter(7938);F.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=O>=1):F.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=O>=2);let L=null,R={};const B=new Nt,G=new Nt;function H(D,Z,it){const ht=new Uint8Array(4),tt=e.createTexture();e.bindTexture(D,tt),e.texParameteri(D,10241,9728),e.texParameteri(D,10240,9728);for(let ct=0;ct<it;ct++)e.texImage2D(Z+ct,0,6408,1,1,0,6408,5121,ht);return tt}const W={};W[3553]=H(3553,3553,1),W[34067]=H(34067,34069,6),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Y(2929),c.setFunc(3),gt(!1),wt(1),Y(2884),k(0);function Y(D){u[D]!==!0&&(e.enable(D),u[D]=!0)}function K(D){u[D]!==!1&&(e.disable(D),u[D]=!1)}function ot(D){return h!==D?(e.useProgram(D),h=D,!0):!1}const ft={100:32774,101:32778,102:32779};if(i)ft[103]=32775,ft[104]=32776;else{const D=t.get("EXT_blend_minmax");D!==null&&(ft[103]=D.MIN_EXT,ft[104]=D.MAX_EXT)}const It={200:0,201:1,202:768,204:770,210:776,208:774,206:772,203:769,205:771,209:775,207:773};function k(D,Z,it,ht,tt,ct,ut,xt){if(D===0){d&&(K(3042),d=!1);return}if(d||(Y(3042),d=!0),D!==5){if(D!==f||xt!==w){if((g!==100||m!==100)&&(e.blendEquation(32774),g=100,m=100),xt)switch(D){case 1:e.blendFuncSeparate(1,771,1,771);break;case 2:e.blendFunc(1,1);break;case 3:e.blendFuncSeparate(0,0,769,771);break;case 4:e.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case 1:e.blendFuncSeparate(770,771,1,771);break;case 2:e.blendFunc(770,1);break;case 3:e.blendFunc(0,769);break;case 4:e.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}_=null,y=null,p=null,v=null,f=D,w=xt}return}tt=tt||Z,ct=ct||it,ut=ut||ht,(Z!==g||tt!==m)&&(e.blendEquationSeparate(ft[Z],ft[tt]),g=Z,m=tt),(it!==_||ht!==y||ct!==p||ut!==v)&&(e.blendFuncSeparate(It[it],It[ht],It[ct],It[ut]),_=it,y=ht,p=ct,v=ut),f=D,w=null}function Vt(D,Z){D.side===2?K(2884):Y(2884);let it=D.side===1;Z&&(it=!it),gt(it),D.blending===1&&D.transparent===!1?k(0):k(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);const ht=D.stencilWrite;l.setTest(ht),ht&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits)}function gt(D){b!==D&&(D?e.frontFace(2304):e.frontFace(2305),b=D)}function wt(D){D!==0?(Y(2884),D!==x&&(D===1?e.cullFace(1029):D===2?e.cullFace(1028):e.cullFace(1032))):K(2884),x=D}function yt(D){D!==M&&(N&&e.lineWidth(D),M=D)}function Lt(D,Z,it){D?(Y(32823),(P!==Z||C!==it)&&(e.polygonOffset(Z,it),P=Z,C=it)):K(32823)}function vt(D){D?Y(3089):K(3089)}function X(D){D===void 0&&(D=33984+I-1),L!==D&&(e.activeTexture(D),L=D)}function Q(D,Z){L===null&&X();let it=R[L];it===void 0&&(it={type:void 0,texture:void 0},R[L]=it),(it.type!==D||it.texture!==Z)&&(e.bindTexture(D,Z||W[D]),it.type=D,it.texture=Z)}function $(){const D=R[L];D!==void 0&&D.type!==void 0&&(e.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function at(){try{e.compressedTexImage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{e.texImage2D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function A(){try{e.texImage3D.apply(e,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function S(D){B.equals(D)===!1&&(e.scissor(D.x,D.y,D.z,D.w),B.copy(D))}function q(D){G.equals(D)===!1&&(e.viewport(D.x,D.y,D.z,D.w),G.copy(D))}function j(){u={},L=null,R={},h=null,d=null,f=null,g=null,_=null,y=null,m=null,p=null,v=null,w=!1,b=null,x=null,M=null,P=null,C=null,a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Y,disable:K,useProgram:ot,setBlending:k,setMaterial:Vt,setFlipSided:gt,setCullFace:wt,setLineWidth:yt,setPolygonOffset:Lt,setScissorTest:vt,activeTexture:X,bindTexture:Q,unbindTexture:$,compressedTexImage2D:at,texImage2D:et,texImage3D:A,scissor:S,viewport:q,reset:j}}function Qu(e,t,n,i,r,s,o){const a=r.isWebGL2,c=r.maxTextures,l=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,d=new WeakMap;let f,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,S){return g?new OffscreenCanvas(A,S):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function y(A,S,q,j){let D=1;if((A.width>j||A.height>j)&&(D=j/Math.max(A.width,A.height)),D<1||S===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const Z=S?bt.floorPowerOfTwo:Math.floor,it=Z(D*A.width),ht=Z(D*A.height);f===void 0&&(f=_(it,ht));const tt=q?_(it,ht):f;return tt.width=it,tt.height=ht,tt.getContext("2d").drawImage(A,0,0,it,ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+it+"x"+ht+")."),tt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return bt.isPowerOfTwo(A.width)&&bt.isPowerOfTwo(A.height)}function p(A){return a?!1:A.wrapS!==1001||A.wrapT!==1001||A.minFilter!==1003&&A.minFilter!==1006}function v(A,S){return A.generateMipmaps&&S&&A.minFilter!==1003&&A.minFilter!==1006}function w(A,S,q,j){e.generateMipmap(A);const D=i.get(S);D.__maxMipLevel=Math.log(Math.max(q,j))*Math.LOG2E}function b(A,S,q){if(a===!1)return S;if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=S;return S===6403&&(q===5126&&(j=33326),q===5131&&(j=33325),q===5121&&(j=33321)),S===6407&&(q===5126&&(j=34837),q===5131&&(j=34843),q===5121&&(j=32849)),S===6408&&(q===5126&&(j=34836),q===5131&&(j=34842),q===5121&&(j=32856)),(j===33325||j===33326||j===34842||j===34836)&&t.get("EXT_color_buffer_float"),j}function x(A){return A===1003||A===1004||A===1005?9728:9729}function M(A){const S=A.target;S.removeEventListener("dispose",M),C(S),S.isVideoTexture&&d.delete(S),o.memory.textures--}function P(A){const S=A.target;S.removeEventListener("dispose",P),I(S),o.memory.textures--}function C(A){const S=i.get(A);S.__webglInit!==void 0&&(e.deleteTexture(S.__webglTexture),i.remove(A))}function I(A){const S=i.get(A),q=i.get(A.texture);if(A){if(q.__webglTexture!==void 0&&e.deleteTexture(q.__webglTexture),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++)e.deleteFramebuffer(S.__webglFramebuffer[j]),S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[j]);else e.deleteFramebuffer(S.__webglFramebuffer),S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer&&e.deleteRenderbuffer(S.__webglColorRenderbuffer),S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer);i.remove(A.texture),i.remove(A)}}let N=0;function O(){N=0}function F(){const A=N;return A>=c&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+c),N+=1,A}function L(A,S){const q=i.get(A);if(A.isVideoTexture&&X(A),A.version>0&&q.__version!==A.version){const j=A.image;if(j===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ot(q,A,S);return}}n.activeTexture(33984+S),n.bindTexture(3553,q.__webglTexture)}function R(A,S){const q=i.get(A);if(A.version>0&&q.__version!==A.version){ot(q,A,S);return}n.activeTexture(33984+S),n.bindTexture(35866,q.__webglTexture)}function B(A,S){const q=i.get(A);if(A.version>0&&q.__version!==A.version){ot(q,A,S);return}n.activeTexture(33984+S),n.bindTexture(32879,q.__webglTexture)}function G(A,S){const q=i.get(A);if(A.version>0&&q.__version!==A.version){ft(q,A,S);return}n.activeTexture(33984+S),n.bindTexture(34067,q.__webglTexture)}const H={1e3:10497,1001:33071,1002:33648},W={1003:9728,1004:9984,1005:9986,1006:9729,1007:9985,1008:9987};function Y(A,S,q){q?(e.texParameteri(A,10242,H[S.wrapS]),e.texParameteri(A,10243,H[S.wrapT]),(A===32879||A===35866)&&e.texParameteri(A,32882,H[S.wrapR]),e.texParameteri(A,10240,W[S.magFilter]),e.texParameteri(A,10241,W[S.minFilter])):(e.texParameteri(A,10242,33071),e.texParameteri(A,10243,33071),(A===32879||A===35866)&&e.texParameteri(A,32882,33071),(S.wrapS!==1001||S.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(A,10240,x(S.magFilter)),e.texParameteri(A,10241,x(S.minFilter)),S.minFilter!==1003&&S.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));const j=t.get("EXT_texture_filter_anisotropic");if(j){if(S.type===1015&&t.get("OES_texture_float_linear")===null||S.type===1016&&(a||t.get("OES_texture_half_float_linear"))===null)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(e.texParameterf(A,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function K(A,S){A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",M),A.__webglTexture=e.createTexture(),o.memory.textures++)}function ot(A,S,q){let j=3553;S.isDataTexture2DArray&&(j=35866),S.isDataTexture3D&&(j=32879),K(A,S),n.activeTexture(33984+q),n.bindTexture(j,A.__webglTexture),e.pixelStorei(37440,S.flipY),e.pixelStorei(37441,S.premultiplyAlpha),e.pixelStorei(3317,S.unpackAlignment);const D=p(S)&&m(S.image)===!1,Z=y(S.image,D,!1,u),it=m(Z)||a,ht=s.convert(S.format);let tt=s.convert(S.type),ct=b(S.internalFormat,ht,tt);Y(j,S,it);let ut;const xt=S.mipmaps;if(S.isDepthTexture)ct=6402,a?S.type===1015?ct=36012:S.type===1014?ct=33190:S.type===1020?ct=35056:ct=33189:S.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===1026&&ct===6402&&S.type!==1012&&S.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=1012,tt=s.convert(S.type)),S.format===1027&&ct===6402&&(ct=34041,S.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=1020,tt=s.convert(S.type))),n.texImage2D(3553,0,ct,Z.width,Z.height,0,ht,tt,null);else if(S.isDataTexture)if(xt.length>0&&it){for(let st=0,pt=xt.length;st<pt;st++)ut=xt[st],n.texImage2D(3553,st,ct,ut.width,ut.height,0,ht,tt,ut.data);S.generateMipmaps=!1,A.__maxMipLevel=xt.length-1}else n.texImage2D(3553,0,ct,Z.width,Z.height,0,ht,tt,Z.data),A.__maxMipLevel=0;else if(S.isCompressedTexture){for(let st=0,pt=xt.length;st<pt;st++)ut=xt[st],S.format!==1023&&S.format!==1022?ht!==null?n.compressedTexImage2D(3553,st,ct,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):n.texImage2D(3553,st,ct,ut.width,ut.height,0,ht,tt,ut.data);A.__maxMipLevel=xt.length-1}else if(S.isDataTexture2DArray)n.texImage3D(35866,0,ct,Z.width,Z.height,Z.depth,0,ht,tt,Z.data),A.__maxMipLevel=0;else if(S.isDataTexture3D)n.texImage3D(32879,0,ct,Z.width,Z.height,Z.depth,0,ht,tt,Z.data),A.__maxMipLevel=0;else if(xt.length>0&&it){for(let st=0,pt=xt.length;st<pt;st++)ut=xt[st],n.texImage2D(3553,st,ct,ht,tt,ut);S.generateMipmaps=!1,A.__maxMipLevel=xt.length-1}else n.texImage2D(3553,0,ct,ht,tt,Z),A.__maxMipLevel=0;v(S,it)&&w(j,S,Z.width,Z.height),A.__version=S.version,S.onUpdate&&S.onUpdate(S)}function ft(A,S,q){if(S.image.length!==6)return;K(A,S),n.activeTexture(33984+q),n.bindTexture(34067,A.__webglTexture),e.pixelStorei(37440,S.flipY),e.pixelStorei(37441,S.premultiplyAlpha),e.pixelStorei(3317,S.unpackAlignment);const j=S&&(S.isCompressedTexture||S.image[0].isCompressedTexture),D=S.image[0]&&S.image[0].isDataTexture,Z=[];for(let st=0;st<6;st++)!j&&!D?Z[st]=y(S.image[st],!1,!0,l):Z[st]=D?S.image[st].image:S.image[st];const it=Z[0],ht=m(it)||a,tt=s.convert(S.format),ct=s.convert(S.type),ut=b(S.internalFormat,tt,ct);Y(34067,S,ht);let xt;if(j){for(let st=0;st<6;st++){xt=Z[st].mipmaps;for(let pt=0;pt<xt.length;pt++){const Ft=xt[pt];S.format!==1023&&S.format!==1022?tt!==null?n.compressedTexImage2D(34069+st,pt,ut,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):n.texImage2D(34069+st,pt,ut,Ft.width,Ft.height,0,tt,ct,Ft.data)}}A.__maxMipLevel=xt.length-1}else{xt=S.mipmaps;for(let st=0;st<6;st++)if(D){n.texImage2D(34069+st,0,ut,Z[st].width,Z[st].height,0,tt,ct,Z[st].data);for(let pt=0;pt<xt.length;pt++){const Yt=xt[pt].image[st].image;n.texImage2D(34069+st,pt+1,ut,Yt.width,Yt.height,0,tt,ct,Yt.data)}}else{n.texImage2D(34069+st,0,ut,tt,ct,Z[st]);for(let pt=0;pt<xt.length;pt++){const Ft=xt[pt];n.texImage2D(34069+st,pt+1,ut,tt,ct,Ft.image[st])}}A.__maxMipLevel=xt.length}v(S,ht)&&w(34067,S,it.width,it.height),A.__version=S.version,S.onUpdate&&S.onUpdate(S)}function It(A,S,q,j){const D=s.convert(S.texture.format),Z=s.convert(S.texture.type),it=b(S.texture.internalFormat,D,Z);n.texImage2D(j,0,it,S.width,S.height,0,D,Z,null),e.bindFramebuffer(36160,A),e.framebufferTexture2D(36160,q,j,i.get(S.texture).__webglTexture,0),e.bindFramebuffer(36160,null)}function k(A,S,q){if(e.bindRenderbuffer(36161,A),S.depthBuffer&&!S.stencilBuffer){let j=33189;if(q){const D=S.depthTexture;D&&D.isDepthTexture&&(D.type===1015?j=36012:D.type===1014&&(j=33190));const Z=vt(S);e.renderbufferStorageMultisample(36161,Z,j,S.width,S.height)}else e.renderbufferStorage(36161,j,S.width,S.height);e.framebufferRenderbuffer(36160,36096,36161,A)}else if(S.depthBuffer&&S.stencilBuffer){if(q){const j=vt(S);e.renderbufferStorageMultisample(36161,j,35056,S.width,S.height)}else e.renderbufferStorage(36161,34041,S.width,S.height);e.framebufferRenderbuffer(36160,33306,36161,A)}else{const j=s.convert(S.texture.format),D=s.convert(S.texture.type),Z=b(S.texture.internalFormat,j,D);if(q){const it=vt(S);e.renderbufferStorageMultisample(36161,it,Z,S.width,S.height)}else e.renderbufferStorage(36161,Z,S.width,S.height)}e.bindRenderbuffer(36161,null)}function Vt(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),L(S.depthTexture,0);const j=i.get(S.depthTexture).__webglTexture;if(S.depthTexture.format===1026)e.framebufferTexture2D(36160,36096,3553,j,0);else if(S.depthTexture.format===1027)e.framebufferTexture2D(36160,33306,3553,j,0);else throw new Error("Unknown depthTexture format")}function gt(A){const S=i.get(A),q=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Vt(S.__webglFramebuffer,A)}else if(q){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)e.bindFramebuffer(36160,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]=e.createRenderbuffer(),k(S.__webglDepthbuffer[j],A,!1)}else e.bindFramebuffer(36160,S.__webglFramebuffer),S.__webglDepthbuffer=e.createRenderbuffer(),k(S.__webglDepthbuffer,A,!1);e.bindFramebuffer(36160,null)}function wt(A){const S=i.get(A),q=i.get(A.texture);A.addEventListener("dispose",P),q.__webglTexture=e.createTexture(),o.memory.textures++;const j=A.isWebGLCubeRenderTarget===!0,D=A.isWebGLMultisampleRenderTarget===!0,Z=m(A)||a;if(a&&A.texture.format===1022&&(A.texture.type===1015||A.texture.type===1016)&&(A.texture.format=1023,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),j){S.__webglFramebuffer=[];for(let it=0;it<6;it++)S.__webglFramebuffer[it]=e.createFramebuffer()}else if(S.__webglFramebuffer=e.createFramebuffer(),D)if(a){S.__webglMultisampledFramebuffer=e.createFramebuffer(),S.__webglColorRenderbuffer=e.createRenderbuffer(),e.bindRenderbuffer(36161,S.__webglColorRenderbuffer);const it=s.convert(A.texture.format),ht=s.convert(A.texture.type),tt=b(A.texture.internalFormat,it,ht),ct=vt(A);e.renderbufferStorageMultisample(36161,ct,tt,A.width,A.height),e.bindFramebuffer(36160,S.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(36160,36064,36161,S.__webglColorRenderbuffer),e.bindRenderbuffer(36161,null),A.depthBuffer&&(S.__webglDepthRenderbuffer=e.createRenderbuffer(),k(S.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(j){n.bindTexture(34067,q.__webglTexture),Y(34067,A.texture,Z);for(let it=0;it<6;it++)It(S.__webglFramebuffer[it],A,36064,34069+it);v(A.texture,Z)&&w(34067,A.texture,A.width,A.height),n.bindTexture(34067,null)}else n.bindTexture(3553,q.__webglTexture),Y(3553,A.texture,Z),It(S.__webglFramebuffer,A,36064,3553),v(A.texture,Z)&&w(3553,A.texture,A.width,A.height),n.bindTexture(3553,null);A.depthBuffer&&gt(A)}function yt(A){const S=A.texture,q=m(A)||a;if(v(S,q)){const j=A.isWebGLCubeRenderTarget?34067:3553,D=i.get(S).__webglTexture;n.bindTexture(j,D),w(j,S,A.width,A.height),n.bindTexture(j,null)}}function Lt(A){if(A.isWebGLMultisampleRenderTarget)if(a){const S=i.get(A);e.bindFramebuffer(36008,S.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,S.__webglFramebuffer);const q=A.width,j=A.height;let D=16384;A.depthBuffer&&(D|=256),A.stencilBuffer&&(D|=1024),e.blitFramebuffer(0,0,q,j,0,0,q,j,D,9728),e.bindFramebuffer(36160,S.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function vt(A){return a&&A.isWebGLMultisampleRenderTarget?Math.min(h,A.samples):0}function X(A){const S=o.render.frame;d.get(A)!==S&&(d.set(A,S),A.update())}let Q=!1,$=!1;function at(A,S){A&&A.isWebGLRenderTarget&&(Q===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),Q=!0),A=A.texture),L(A,S)}function et(A,S){A&&A.isWebGLCubeRenderTarget&&($===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),$=!0),A=A.texture),G(A,S)}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=L,this.setTexture2DArray=R,this.setTexture3D=B,this.setTextureCube=G,this.setupRenderTarget=wt,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Lt,this.safeSetTexture2D=at,this.safeSetTextureCube=et}function Ku(e,t,n){const i=n.isWebGL2;function r(s){let o;if(s===1009)return 5121;if(s===1017)return 32819;if(s===1018)return 32820;if(s===1019)return 33635;if(s===1010)return 5120;if(s===1011)return 5122;if(s===1012)return 5123;if(s===1013)return 5124;if(s===1014)return 5125;if(s===1015)return 5126;if(s===1016)return i?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===1021)return 6406;if(s===1022)return 6407;if(s===1023)return 6408;if(s===1024)return 6409;if(s===1025)return 6410;if(s===1026)return 6402;if(s===1027)return 34041;if(s===1028)return 6403;if(s===1029)return 36244;if(s===1030)return 33319;if(s===1031)return 33320;if(s===1032)return 36248;if(s===1033)return 36249;if(s===33776||s===33777||s===33778||s===33779)if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===33776)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===33777)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===33778)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===33779)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===35840||s===35841||s===35842||s===35843)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===35840)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===35841)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===35842)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===35843)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===36196)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if((s===37492||s===37496)&&(o=t.get("WEBGL_compressed_texture_etc"),o!==null)){if(s===37492)return o.COMPRESSED_RGB8_ETC2;if(s===37496)return o.COMPRESSED_RGBA8_ETC2_EAC}if(s===37808||s===37809||s===37810||s===37811||s===37812||s===37813||s===37814||s===37815||s===37816||s===37817||s===37818||s===37819||s===37820||s===37821||s===37840||s===37841||s===37842||s===37843||s===37844||s===37845||s===37846||s===37847||s===37848||s===37849||s===37850||s===37851||s===37852||s===37853)return o=t.get("WEBGL_compressed_texture_astc"),o!==null?s:null;if(s===36492)return o=t.get("EXT_texture_compression_bptc"),o!==null?s:null;if(s===1020)return i?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:r}}function hs(e=[]){ee.call(this),this.cameras=e}hs.prototype=Object.assign(Object.create(ee.prototype),{constructor:hs,isArrayCamera:!0});function Jn(){mt.call(this),this.type="Group"}Jn.prototype=Object.assign(Object.create(mt.prototype),{constructor:Jn,isGroup:!0});function Ai(){this._targetRay=null,this._grip=null,this._hand=null}Object.assign(Ai.prototype,{constructor:Ai,getHandSpace:function(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand},getTargetRaySpace:function(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1),this._targetRay},getGripSpace:function(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1),this._grip},dispatchEvent:function(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this},disconnect:function(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this},update:function(e,t,n){let i=null,r=null,s=null;const o=this._targetRay,a=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred")if(c&&e.hand){s=!0;for(const g of e.hand.values()){const _=t.getJointPose(g,n);if(c.joints[g.jointName]===void 0){const m=new Jn;m.matrixAutoUpdate=!1,m.visible=!1,c.joints[g.jointName]=m,c.add(m)}const y=c.joints[g.jointName];_!==null&&(y.matrix.fromArray(_.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.jointRadius=_.radius),y.visible=_!==null}const l=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=l.position.distanceTo(u.position),d=.02,f=.005;c.inputState.pinching&&h>d+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&(i=t.getPose(e.targetRaySpace,n),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale))),a!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale)));return o!==null&&(o.visible=i!==null),a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),this}});function Co(e,t){const n=this;let i=null,r=1,s=null,o="local-floor",a=null;const c=[],l=new Map,u=new ee;u.layers.enable(1),u.viewport=new Nt;const h=new ee;h.layers.enable(2),h.viewport=new Nt;const d=[u,h],f=new hs;f.layers.enable(1),f.layers.enable(2);let g=null,_=null;this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let N=c[I];return N===void 0&&(N=new Ai,c[I]=N),N.getTargetRaySpace()},this.getControllerGrip=function(I){let N=c[I];return N===void 0&&(N=new Ai,c[I]=N),N.getGripSpace()},this.getHand=function(I){let N=c[I];return N===void 0&&(N=new Ai,c[I]=N),N.getHandSpace()};function y(I){const N=l.get(I.inputSource);N&&N.dispatchEvent({type:I.type,data:I.inputSource})}function m(){l.forEach(function(I,N){I.disconnect(N)}),l.clear(),g=null,_=null,e.setFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),C.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return s},this.getSession=function(){return i},this.setSession=async function(I){if(i=I,i!==null){i.addEventListener("select",y),i.addEventListener("selectstart",y),i.addEventListener("selectend",y),i.addEventListener("squeeze",y),i.addEventListener("squeezestart",y),i.addEventListener("squeezeend",y),i.addEventListener("end",m),i.addEventListener("inputsourceschange",p);const N=t.getContextAttributes();N.xrCompatible!==!0&&await t.makeXRCompatible();const O={antialias:N.antialias,alpha:N.alpha,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:r},F=new XRWebGLLayer(i,t,O);i.updateRenderState({baseLayer:F}),s=await i.requestReferenceSpace(o),C.setContext(i),C.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function p(I){const N=i.inputSources;for(let O=0;O<c.length;O++)l.set(N[O],c[O]);for(let O=0;O<I.removed.length;O++){const F=I.removed[O],L=l.get(F);L&&(L.dispatchEvent({type:"disconnected",data:F}),l.delete(F))}for(let O=0;O<I.added.length;O++){const F=I.added[O],L=l.get(F);L&&L.dispatchEvent({type:"connected",data:F})}}const v=new E,w=new E;function b(I,N,O){v.setFromMatrixPosition(N.matrixWorld),w.setFromMatrixPosition(O.matrixWorld);const F=v.distanceTo(w),L=N.projectionMatrix.elements,R=O.projectionMatrix.elements,B=L[14]/(L[10]-1),G=L[14]/(L[10]+1),H=(L[9]+1)/L[5],W=(L[9]-1)/L[5],Y=(L[8]-1)/L[0],K=(R[8]+1)/R[0],ot=B*Y,ft=B*K,It=F/(-Y+K),k=It*-Y;N.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(k),I.translateZ(It),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert();const Vt=B+It,gt=G+It,wt=ot-k,yt=ft+(F-k),Lt=H*G/gt*Vt,vt=W*G/gt*Vt;I.projectionMatrix.makePerspective(wt,yt,Lt,vt,Vt,gt)}function x(I,N){N===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(N.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.getCamera=function(I){f.near=h.near=u.near=I.near,f.far=h.far=u.far=I.far,(g!==f.near||_!==f.far)&&(i.updateRenderState({depthNear:f.near,depthFar:f.far}),g=f.near,_=f.far);const N=I.parent,O=f.cameras;x(f,N);for(let L=0;L<O.length;L++)x(O[L],N);I.matrixWorld.copy(f.matrixWorld),I.matrix.copy(f.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale);const F=I.children;for(let L=0,R=F.length;L<R;L++)F[L].updateMatrixWorld(!0);return O.length===2?b(f,u,h):f.projectionMatrix.copy(u.projectionMatrix),f};let M=null;function P(I,N){if(a=N.getViewerPose(s),a!==null){const F=a.views,L=i.renderState.baseLayer;e.setFramebuffer(L.framebuffer);let R=!1;F.length!==f.cameras.length&&(f.cameras.length=0,R=!0);for(let B=0;B<F.length;B++){const G=F[B],H=L.getViewport(G),W=d[B];W.matrix.fromArray(G.transform.matrix),W.projectionMatrix.fromArray(G.projectionMatrix),W.viewport.set(H.x,H.y,H.width,H.height),B===0&&f.matrix.copy(W.matrix),R===!0&&f.cameras.push(W)}}const O=i.inputSources;for(let F=0;F<c.length;F++){const L=c[F],R=O[F];L.update(R,N,s)}M&&M(I,N)}const C=new so;C.setAnimationLoop(P),this.setAnimationLoop=function(I){M=I},this.dispose=function(){}}Object.assign(Co.prototype,Ze.prototype);function $u(e){function t(m,p){m.fogColor.value.copy(p.color),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,v,w){p.isMeshBasicMaterial?i(m,p):p.isMeshLambertMaterial?(i(m,p),c(m,p)):p.isMeshToonMaterial?(i(m,p),u(m,p)):p.isMeshPhongMaterial?(i(m,p),l(m,p)):p.isMeshStandardMaterial?(i(m,p),p.isMeshPhysicalMaterial?d(m,p):h(m,p)):p.isMeshMatcapMaterial?(i(m,p),f(m,p)):p.isMeshDepthMaterial?(i(m,p),g(m,p)):p.isMeshDistanceMaterial?(i(m,p),_(m,p)):p.isMeshNormalMaterial?(i(m,p),y(m,p)):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&s(m,p)):p.isPointsMaterial?o(m,p,v,w):p.isSpriteMaterial?a(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.specularMap&&(m.specularMap.value=p.specularMap);const v=e.get(p).envMap;if(v){m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v._needsFlipEnvMap?-1:1,m.reflectivity.value=p.reflectivity,m.refractionRatio.value=p.refractionRatio;const x=e.get(v).__maxMipLevel;x!==void 0&&(m.maxMipLevel.value=x)}p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity);let w;p.map?w=p.map:p.specularMap?w=p.specularMap:p.displacementMap?w=p.displacementMap:p.normalMap?w=p.normalMap:p.bumpMap?w=p.bumpMap:p.roughnessMap?w=p.roughnessMap:p.metalnessMap?w=p.metalnessMap:p.alphaMap?w=p.alphaMap:p.emissiveMap?w=p.emissiveMap:p.clearcoatMap?w=p.clearcoatMap:p.clearcoatNormalMap?w=p.clearcoatNormalMap:p.clearcoatRoughnessMap&&(w=p.clearcoatRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),m.uvTransform.value.copy(w.matrix));let b;p.aoMap?b=p.aoMap:p.lightMap&&(b=p.lightMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),m.uv2Transform.value.copy(b.matrix))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity}function s(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,v,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=w*.5,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap);let b;p.map?b=p.map:p.alphaMap&&(b=p.alphaMap),b!==void 0&&(b.matrixAutoUpdate===!0&&b.updateMatrix(),m.uvTransform.value.copy(b.matrix))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap);let v;p.map?v=p.map:p.alphaMap&&(v=p.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uvTransform.value.copy(v.matrix))}function c(m,p){p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap)}function l(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function h(m,p){m.roughness.value=p.roughness,m.metalness.value=p.metalness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p){h(m,p),m.reflectivity.value=p.reflectivity,m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.sheen&&m.sheen.value.copy(p.sheen),p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),m.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===1&&m.clearcoatNormalScale.value.negate()),m.transmission.value=p.transmission,p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap)}function f(m,p){p.matcap&&(m.matcap.value=p.matcap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function g(m,p){p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}function _(m,p){p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),m.referencePosition.value.copy(p.referencePosition),m.nearDistance.value=p.nearDistance,m.farDistance.value=p.farDistance}function y(m,p){p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias)}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function td(){const e=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return e.style.display="block",e}function ur(e){e=e||{};const t=e.canvas!==void 0?e.canvas:td(),n=e.context!==void 0?e.context:null,i=e.alpha!==void 0?e.alpha:!1,r=e.depth!==void 0?e.depth:!0,s=e.stencil!==void 0?e.stencil:!0,o=e.antialias!==void 0?e.antialias:!1,a=e.premultipliedAlpha!==void 0?e.premultipliedAlpha:!0,c=e.preserveDrawingBuffer!==void 0?e.preserveDrawingBuffer:!1,l=e.powerPreference!==void 0?e.powerPreference:"default",u=e.failIfMajorPerformanceCaveat!==void 0?e.failIfMajorPerformanceCaveat:!1;let h=null,d=null;const f=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=3e3,this.physicallyCorrectLights=!1,this.toneMapping=0,this.toneMappingExposure=1,this.maxMorphTargets=8,this.maxMorphNormals=4;const g=this;let _=!1,y=null,m=0,p=0,v=null,w=null,b=-1,x=null;const M=new Nt,P=new Nt;let C=null,I=t.width,N=t.height,O=1,F=null,L=null;const R=new Nt(0,0,I,N),B=new Nt(0,0,I,N);let G=!1;const H=new hr;let W=!1,Y=!1;const K=new At,ot=new E,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function It(){return v===null?O:1}let k=n;function Vt(T,U){for(let z=0;z<T.length;z++){const V=T[z],rt=t.getContext(V,U);if(rt!==null)return rt}return null}try{const T={alpha:i,depth:r,stencil:s,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",Yt,!1),k===null){const U=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&U.shift(),k=Vt(U,T),k===null)throw Vt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let gt,wt,yt,Lt,vt,X,Q,$,at,et,A,S,q,j,D,Z,it,ht,tt,ct,ut;function xt(){gt=new Ph(k),wt=new Lh(k,gt,e),gt.init(wt),ct=new Ku(k,gt,wt),yt=new Ju(k,gt,wt),yt.scissor(P.copy(B).multiplyScalar(O).floor()),yt.viewport(M.copy(R).multiplyScalar(O).floor()),Lt=new Dh,vt=new zu,X=new Qu(k,gt,yt,vt,wt,ct,Lt),Q=new Rh(g),$=new ic(k,wt),ut=new Th(k,gt,$,wt),at=new Ih(k,$,Lt,ut),et=new zh(k,at,$,Lt),it=new Oh(k),D=new Ch(vt),A=new Ou(g,Q,gt,wt,ut,D),S=new $u(vt),q=new Hu(vt),j=new Xu(gt,wt),Z=new Eh(g,Q,yt,et,a),ht=new Ah(k,gt,Lt,wt),tt=new Fh(k,gt,Lt,wt),Lt.programs=A.programs,g.capabilities=wt,g.extensions=gt,g.properties=vt,g.renderLists=q,g.state=yt,g.info=Lt}xt();const st=new Co(g,k);this.xr=st;const pt=new Lo(g,et,wt.maxTextureSize);this.shadowMap=pt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=gt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=gt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(T){T!==void 0&&(O=T,this.setSize(I,N,!1))},this.getSize=function(T){return T===void 0&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),T=new J),T.set(I,N)},this.setSize=function(T,U,z){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=T,N=U,t.width=Math.floor(T*O),t.height=Math.floor(U*O),z!==!1&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T===void 0&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),T=new J),T.set(I*O,N*O).floor()},this.setDrawingBufferSize=function(T,U,z){I=T,N=U,O=z,t.width=Math.floor(T*z),t.height=Math.floor(U*z),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T===void 0&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),T=new Nt),T.copy(M)},this.getViewport=function(T){return T.copy(R)},this.setViewport=function(T,U,z,V){T.isVector4?R.set(T.x,T.y,T.z,T.w):R.set(T,U,z,V),yt.viewport(M.copy(R).multiplyScalar(O).floor())},this.getScissor=function(T){return T.copy(B)},this.setScissor=function(T,U,z,V){T.isVector4?B.set(T.x,T.y,T.z,T.w):B.set(T,U,z,V),yt.scissor(P.copy(B).multiplyScalar(O).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(T){yt.setScissorTest(G=T)},this.setOpaqueSort=function(T){F=T},this.setTransparentSort=function(T){L=T},this.getClearColor=function(T){return T===void 0&&(console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"),T=new lt),T.copy(Z.getClearColor())},this.setClearColor=function(){Z.setClearColor.apply(Z,arguments)},this.getClearAlpha=function(){return Z.getClearAlpha()},this.setClearAlpha=function(){Z.setClearAlpha.apply(Z,arguments)},this.clear=function(T,U,z){let V=0;(T===void 0||T)&&(V|=16384),(U===void 0||U)&&(V|=256),(z===void 0||z)&&(V|=1024),k.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",Yt,!1),q.dispose(),j.dispose(),vt.dispose(),Q.dispose(),et.dispose(),ut.dispose(),st.dispose(),Ae.stop()};function Ft(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function Yt(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1,xt()}function dn(T){const U=T.target;U.removeEventListener("dispose",dn),An(U)}function An(T){fn(T),vt.remove(T)}function fn(T){const U=vt.get(T).program;U!==void 0&&A.releaseProgram(U)}function ui(T,U){T.render(function(z){g.renderBufferImmediate(z,U)})}this.renderBufferImmediate=function(T,U){ut.initAttributes();const z=vt.get(T);T.hasPositions&&!z.position&&(z.position=k.createBuffer()),T.hasNormals&&!z.normal&&(z.normal=k.createBuffer()),T.hasUvs&&!z.uv&&(z.uv=k.createBuffer()),T.hasColors&&!z.color&&(z.color=k.createBuffer());const V=U.getAttributes();T.hasPositions&&(k.bindBuffer(34962,z.position),k.bufferData(34962,T.positionArray,35048),ut.enableAttribute(V.position),k.vertexAttribPointer(V.position,3,5126,!1,0,0)),T.hasNormals&&(k.bindBuffer(34962,z.normal),k.bufferData(34962,T.normalArray,35048),ut.enableAttribute(V.normal),k.vertexAttribPointer(V.normal,3,5126,!1,0,0)),T.hasUvs&&(k.bindBuffer(34962,z.uv),k.bufferData(34962,T.uvArray,35048),ut.enableAttribute(V.uv),k.vertexAttribPointer(V.uv,2,5126,!1,0,0)),T.hasColors&&(k.bindBuffer(34962,z.color),k.bufferData(34962,T.colorArray,35048),ut.enableAttribute(V.color),k.vertexAttribPointer(V.color,3,5126,!1,0,0)),ut.disableUnusedAttributes(),k.drawArrays(4,0,T.count),T.count=0},this.renderBufferDirect=function(T,U,z,V,rt,Rt){U===null&&(U=ft);const Et=rt.isMesh&&rt.matrixWorld.determinant()<0,Pt=Rn(T,U,V,rt);yt.setMaterial(V,Et);let Tt=z.index;const Zt=z.attributes.position;if(Tt===null){if(Zt===void 0||Zt.count===0)return}else if(Tt.count===0)return;let Xt=1;V.wireframe===!0&&(Tt=at.getWireframeAttribute(z),Xt=2),(V.morphTargets||V.morphNormals)&&it.update(rt,z,V,Pt),ut.setup(rt,V,Pt,z,Tt);let Mt,Dt=ht;Tt!==null&&(Mt=$.get(Tt),Dt=tt,Dt.setIndex(Mt));const Ye=Tt!==null?Tt.count:Zt.count,Wt=z.drawRange.start*Xt,Pn=z.drawRange.count*Xt,Qt=Rt!==null?Rt.start*Xt:0,Vs=Rt!==null?Rt.count*Xt:1/0,ce=Math.max(Wt,Qt),ki=Math.min(Ye,Wt+Pn,Qt+Vs)-1,fi=Math.max(0,ki-ce+1);if(fi!==0){if(rt.isMesh)V.wireframe===!0?(yt.setLineWidth(V.wireframeLinewidth*It()),Dt.setMode(1)):Dt.setMode(4);else if(rt.isLine){let Vi=V.linewidth;Vi===void 0&&(Vi=1),yt.setLineWidth(Vi*It()),rt.isLineSegments?Dt.setMode(1):rt.isLineLoop?Dt.setMode(2):Dt.setMode(3)}else rt.isPoints?Dt.setMode(0):rt.isSprite&&Dt.setMode(4);if(rt.isInstancedMesh)Dt.renderInstances(ce,fi,rt.count);else if(z.isInstancedBufferGeometry){const Vi=Math.min(z.instanceCount,z._maxInstanceCount);Dt.renderInstances(ce,fi,Vi)}else Dt.render(ce,fi)}},this.compile=function(T,U){d=j.get(T),d.init(),T.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),d.setupLights();const z=new WeakMap;T.traverse(function(V){const rt=V.material;if(rt)if(Array.isArray(rt))for(let Rt=0;Rt<rt.length;Rt++){const Et=rt[Rt];z.has(Et)===!1&&(oe(Et,T,V),z.set(Et))}else z.has(rt)===!1&&(oe(rt,T,V),z.set(rt))})};let Xe=null;function di(T){st.isPresenting||Xe&&Xe(T)}const Ae=new so;Ae.setAnimationLoop(di),typeof window<"u"&&Ae.setContext(window),this.setAnimationLoop=function(T){Xe=T,st.setAnimationLoop(T),T===null?Ae.stop():Ae.start()},this.render=function(T,U){let z,V;if(arguments[2]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),z=arguments[2]),arguments[3]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),V=arguments[3]),U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;ut.resetDefaultState(),b=-1,x=null,T.autoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(U=st.getCamera(U)),T.isScene===!0&&T.onBeforeRender(g,T,U,z||v),d=j.get(T,f.length),d.init(),f.push(d),K.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),H.setFromProjectionMatrix(K),Y=this.localClippingEnabled,W=D.init(this.clippingPlanes,Y,U),h=q.get(T,U),h.init(),Ln(T,U,0,g.sortObjects),h.finish(),g.sortObjects===!0&&h.sort(F,L),W===!0&&D.beginShadows();const rt=d.state.shadowsArray;pt.render(rt,T,U),d.setupLights(),d.setupLightsView(U),W===!0&&D.endShadows(),this.info.autoReset===!0&&this.info.reset(),z!==void 0&&this.setRenderTarget(z),Z.render(h,T,U,V);const Rt=h.opaque,Et=h.transparent;Rt.length>0&&pn(Rt,T,U),Et.length>0&&pn(Et,T,U),T.isScene===!0&&T.onAfterRender(g,T,U),v!==null&&(X.updateRenderTargetMipmap(v),X.updateMultisampleRenderTarget(v)),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1),f.pop(),f.length>0?d=f[f.length-1]:d=null,h=null};function Ln(T,U,z,V){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||H.intersectsSprite(T)){V&&ot.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);const Et=et.update(T),Pt=T.material;Pt.visible&&h.push(T,Et,Pt,z,ot.z,null)}}else if(T.isImmediateRenderObject)V&&ot.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K),h.push(T,null,T.material,z,ot.z,null);else if((T.isMesh||T.isLine||T.isPoints)&&(T.isSkinnedMesh&&T.skeleton.frame!==Lt.render.frame&&(T.skeleton.update(),T.skeleton.frame=Lt.render.frame),!T.frustumCulled||H.intersectsObject(T))){V&&ot.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);const Et=et.update(T),Pt=T.material;if(Array.isArray(Pt)){const Tt=Et.groups;for(let Zt=0,Xt=Tt.length;Zt<Xt;Zt++){const Mt=Tt[Zt],Dt=Pt[Mt.materialIndex];Dt&&Dt.visible&&h.push(T,Et,Dt,z,ot.z,Mt)}}else Pt.visible&&h.push(T,Et,Pt,z,ot.z,null)}}const Rt=T.children;for(let Et=0,Pt=Rt.length;Et<Pt;Et++)Ln(Rt[Et],U,z,V)}function pn(T,U,z){const V=U.isScene===!0?U.overrideMaterial:null;for(let rt=0,Rt=T.length;rt<Rt;rt++){const Et=T[rt],Pt=Et.object,Tt=Et.geometry,Zt=V===null?Et.material:V,Xt=Et.group;if(z.isArrayCamera){const Mt=z.cameras;for(let Dt=0,Ye=Mt.length;Dt<Ye;Dt++){const Wt=Mt[Dt];Pt.layers.test(Wt.layers)&&(yt.viewport(M.copy(Wt.viewport)),d.setupLightsView(Wt),Cn(Pt,U,Wt,Tt,Zt,Xt))}}else Cn(Pt,U,z,Tt,Zt,Xt)}}function Cn(T,U,z,V,rt,Rt){if(T.onBeforeRender(g,U,z,V,rt,Rt),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),T.isImmediateRenderObject){const Et=Rn(z,U,rt,T);yt.setMaterial(rt),ut.reset(),ui(T,Et)}else g.renderBufferDirect(z,U,V,rt,T,Rt);T.onAfterRender(g,U,z,V,rt,Rt)}function oe(T,U,z){U.isScene!==!0&&(U=ft);const V=vt.get(T),rt=d.state.lights,Rt=d.state.shadowsArray,Et=rt.state.version,Pt=A.getParameters(T,rt.state,Rt,U,z),Tt=A.getProgramCacheKey(Pt);let Zt=V.program,Xt=!0;if(V.environment=T.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=Q.get(T.envMap||V.environment),Zt===void 0)T.addEventListener("dispose",dn);else if(Zt.cacheKey!==Tt)fn(T);else if(V.lightsStateVersion!==Et)Xt=!1;else{if(Pt.shaderID!==void 0)return;Xt=!1}Xt&&(Pt.uniforms=A.getUniforms(T),T.onBeforeCompile(Pt,g),Zt=A.acquireProgram(Pt,Tt),V.program=Zt,V.uniforms=Pt.uniforms,V.outputEncoding=Pt.outputEncoding);const Mt=V.uniforms;(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(V.numClippingPlanes=D.numPlanes,V.numIntersection=D.numIntersection,Mt.clippingPlanes=D.uniform),V.needsLights=uf(T),V.lightsStateVersion=Et,V.needsLights&&(Mt.ambientLightColor.value=rt.state.ambient,Mt.lightProbe.value=rt.state.probe,Mt.directionalLights.value=rt.state.directional,Mt.directionalLightShadows.value=rt.state.directionalShadow,Mt.spotLights.value=rt.state.spot,Mt.spotLightShadows.value=rt.state.spotShadow,Mt.rectAreaLights.value=rt.state.rectArea,Mt.ltc_1.value=rt.state.rectAreaLTC1,Mt.ltc_2.value=rt.state.rectAreaLTC2,Mt.pointLights.value=rt.state.point,Mt.pointLightShadows.value=rt.state.pointShadow,Mt.hemisphereLights.value=rt.state.hemi,Mt.directionalShadowMap.value=rt.state.directionalShadowMap,Mt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Mt.spotShadowMap.value=rt.state.spotShadowMap,Mt.spotShadowMatrix.value=rt.state.spotShadowMatrix,Mt.pointShadowMap.value=rt.state.pointShadowMap,Mt.pointShadowMatrix.value=rt.state.pointShadowMatrix);const Dt=V.program.getUniforms(),Ye=cn.seqWithValue(Dt.seq,Mt);V.uniformsList=Ye}function Rn(T,U,z,V){U.isScene!==!0&&(U=ft),X.resetTextureUnits();const rt=U.fog,Rt=z.isMeshStandardMaterial?U.environment:null,Et=v===null?g.outputEncoding:v.texture.encoding,Pt=Q.get(z.envMap||Rt),Tt=vt.get(z),Zt=d.state.lights;if(W===!0&&(Y===!0||T!==x)){const Qt=T===x&&z.id===b;D.setState(z,T,Qt)}z.version===Tt.__version?(z.fog&&Tt.fog!==rt||Tt.environment!==Rt||Tt.needsLights&&Tt.lightsStateVersion!==Zt.state.version||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==D.numPlanes||Tt.numIntersection!==D.numIntersection)||Tt.outputEncoding!==Et||Tt.envMap!==Pt)&&oe(z,U,V):(oe(z,U,V),Tt.__version=z.version);let Xt=!1,Mt=!1,Dt=!1;const Ye=Tt.program,Wt=Ye.getUniforms(),Pn=Tt.uniforms;if(yt.useProgram(Ye.program)&&(Xt=!0,Mt=!0,Dt=!0),z.id!==b&&(b=z.id,Mt=!0),Xt||x!==T){if(Wt.setValue(k,"projectionMatrix",T.projectionMatrix),wt.logarithmicDepthBuffer&&Wt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),x!==T&&(x=T,Mt=!0,Dt=!0),z.isShaderMaterial||z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshStandardMaterial||z.envMap){const Qt=Wt.map.cameraPosition;Qt!==void 0&&Qt.setValue(k,ot.setFromMatrixPosition(T.matrixWorld))}(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Wt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial||z.isShadowMaterial||z.skinning)&&Wt.setValue(k,"viewMatrix",T.matrixWorldInverse)}if(z.skinning){Wt.setOptional(k,V,"bindMatrix"),Wt.setOptional(k,V,"bindMatrixInverse");const Qt=V.skeleton;if(Qt){const Vs=Qt.bones;if(wt.floatVertexTextures){if(Qt.boneTexture===null){let ce=Math.sqrt(Vs.length*4);ce=bt.ceilPowerOfTwo(ce),ce=Math.max(ce,4);const ki=new Float32Array(ce*ce*4);ki.set(Qt.boneMatrices);const fi=new Xn(ki,ce,ce,1023,1015);Qt.boneMatrices=ki,Qt.boneTexture=fi,Qt.boneTextureSize=ce}Wt.setValue(k,"boneTexture",Qt.boneTexture,X),Wt.setValue(k,"boneTextureSize",Qt.boneTextureSize)}else Wt.setOptional(k,Qt,"boneMatrices")}}return(Mt||Tt.receiveShadow!==V.receiveShadow)&&(Tt.receiveShadow=V.receiveShadow,Wt.setValue(k,"receiveShadow",V.receiveShadow)),Mt&&(Wt.setValue(k,"toneMappingExposure",g.toneMappingExposure),Tt.needsLights&&hf(Pn,Dt),rt&&z.fog&&S.refreshFogUniforms(Pn,rt),S.refreshMaterialUniforms(Pn,z,O,N),cn.upload(k,Tt.uniformsList,Pn,X)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(cn.upload(k,Tt.uniformsList,Pn,X),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Wt.setValue(k,"center",V.center),Wt.setValue(k,"modelViewMatrix",V.modelViewMatrix),Wt.setValue(k,"normalMatrix",V.normalMatrix),Wt.setValue(k,"modelMatrix",V.matrixWorld),Ye}function hf(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function uf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.setFramebuffer=function(T){y!==T&&v===null&&k.bindFramebuffer(36160,T),y=T},this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return p},this.getRenderList=function(){return h},this.setRenderList=function(T){h=T},this.getRenderTarget=function(){return v},this.setRenderTarget=function(T,U=0,z=0){v=T,m=U,p=z,T&&vt.get(T).__webglFramebuffer===void 0&&X.setupRenderTarget(T);let V=y,rt=!1;if(T){const Rt=vt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(V=Rt[U],rt=!0):T.isWebGLMultisampleRenderTarget?V=vt.get(T).__webglMultisampledFramebuffer:V=Rt,M.copy(T.viewport),P.copy(T.scissor),C=T.scissorTest}else M.copy(R).multiplyScalar(O).floor(),P.copy(B).multiplyScalar(O).floor(),C=G;if(w!==V&&(k.bindFramebuffer(36160,V),w=V),yt.viewport(M),yt.scissor(P),yt.setScissorTest(C),rt){const Rt=vt.get(T.texture);k.framebufferTexture2D(36160,36064,34069+U,Rt.__webglTexture,z)}},this.readRenderTargetPixels=function(T,U,z,V,rt,Rt,Et){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Et!==void 0&&(Pt=Pt[Et]),Pt){let Tt=!1;Pt!==w&&(k.bindFramebuffer(36160,Pt),Tt=!0);try{const Zt=T.texture,Xt=Zt.format,Mt=Zt.type;if(Xt!==1023&&ct.convert(Xt)!==k.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Dt=Mt===1016&&(gt.has("EXT_color_buffer_half_float")||wt.isWebGL2&&gt.has("EXT_color_buffer_float"));if(Mt!==1009&&ct.convert(Mt)!==k.getParameter(35738)&&!(Mt===1015&&(wt.isWebGL2||gt.has("OES_texture_float")||gt.has("WEBGL_color_buffer_float")))&&!Dt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k.checkFramebufferStatus(36160)===36053?U>=0&&U<=T.width-V&&z>=0&&z<=T.height-rt&&k.readPixels(U,z,V,rt,ct.convert(Xt),ct.convert(Mt),Rt):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{Tt&&k.bindFramebuffer(36160,w)}}},this.copyFramebufferToTexture=function(T,U,z=0){const V=Math.pow(2,-z),rt=Math.floor(U.image.width*V),Rt=Math.floor(U.image.height*V),Et=ct.convert(U.format);X.setTexture2D(U,0),k.copyTexImage2D(3553,z,Et,T.x,T.y,rt,Rt,0),yt.unbindTexture()},this.copyTextureToTexture=function(T,U,z,V=0){const rt=U.image.width,Rt=U.image.height,Et=ct.convert(z.format),Pt=ct.convert(z.type);X.setTexture2D(z,0),k.pixelStorei(37440,z.flipY),k.pixelStorei(37441,z.premultiplyAlpha),k.pixelStorei(3317,z.unpackAlignment),U.isDataTexture?k.texSubImage2D(3553,V,T.x,T.y,rt,Rt,Et,Pt,U.image.data):U.isCompressedTexture?k.compressedTexSubImage2D(3553,V,T.x,T.y,U.mipmaps[0].width,U.mipmaps[0].height,Et,U.mipmaps[0].data):k.texSubImage2D(3553,V,T.x,T.y,Et,Pt,U.image),V===0&&z.generateMipmaps&&k.generateMipmap(3553),yt.unbindTexture()},this.initTexture=function(T){X.setTexture2D(T,0),yt.unbindTexture()},this.resetState=function(){yt.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}function Ro(e){ur.call(this,e)}Ro.prototype=Object.assign(Object.create(ur.prototype),{constructor:Ro,isWebGL1Renderer:!0});class ed extends mt{constructor(){super(),Object.defineProperty(this,"isScene",{value:!0}),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.background!==null&&(n.object.background=this.background.toJSON(t)),this.environment!==null&&(n.object.environment=this.environment.toJSON(t)),this.fog!==null&&(n.object.fog=this.fog.toJSON()),n}}function ye(e,t){this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=bt.generateUUID()}Object.defineProperty(ye.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}}),Object.assign(ye.prototype,{isInterleavedBuffer:!0,onUploadCallback:function(){},setUsage:function(e){return this.usage=e,this},copy:function(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this},copyAt:function(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this},set:function(e,t=0){return this.array.set(e,t),this},clone:function(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bt.generateUUID()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new ye(t,this.stride);return n.setUsage(this.usage),n},onUpload:function(e){return this.onUploadCallback=e,this},toJSON:function(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bt.generateUUID()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}});const xn=new E;function bn(e,t,n,i){this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i===!0}Object.defineProperties(bn.prototype,{count:{get:function(){return this.data.count}},array:{get:function(){return this.data.array}},needsUpdate:{set:function(e){this.data.needsUpdate=e}}}),Object.assign(bn.prototype,{isInterleavedBufferAttribute:!0,applyMatrix4:function(e){for(let t=0,n=this.data.count;t<n;t++)xn.x=this.getX(t),xn.y=this.getY(t),xn.z=this.getZ(t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this},setX:function(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this},setY:function(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this},setZ:function(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this},setW:function(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this},getX:function(e){return this.data.array[e*this.data.stride+this.offset]},getY:function(e){return this.data.array[e*this.data.stride+this.offset+1]},getZ:function(e){return this.data.array[e*this.data.stride+this.offset+2]},getW:function(e){return this.data.array[e*this.data.stride+this.offset+3]},setXY:function(e,t,n){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this},setXYZ:function(e,t,n,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this},setXYZW:function(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this},clone:function(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new St(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new bn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)},toJSON:function(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}});function Mn(e){_t.call(this),this.type="SpriteMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}Mn.prototype=Object.create(_t.prototype),Mn.prototype.constructor=Mn,Mn.prototype.isSpriteMaterial=!0,Mn.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this};let Qn;const Li=new E,Kn=new E,$n=new E,ti=new J,Ci=new J,Po=new At,dr=new E,Ri=new E,fr=new E,Io=new J,us=new J,Fo=new J;function Do(e){if(mt.call(this),this.type="Sprite",Qn===void 0){Qn=new Gt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ye(t,5);Qn.setIndex([0,1,2,0,2,3]),Qn.setAttribute("position",new bn(n,3,0,!1)),Qn.setAttribute("uv",new bn(n,2,3,!1))}this.geometry=Qn,this.material=e!==void 0?e:new Mn,this.center=new J(.5,.5)}Do.prototype=Object.assign(Object.create(mt.prototype),{constructor:Do,isSprite:!0,raycast:function(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Kn.setFromMatrixScale(this.matrixWorld),Po.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$n.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Kn.multiplyScalar(-$n.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const s=this.center;pr(dr.set(-.5,-.5,0),$n,s,Kn,i,r),pr(Ri.set(.5,-.5,0),$n,s,Kn,i,r),pr(fr.set(.5,.5,0),$n,s,Kn,i,r),Io.set(0,0),us.set(1,0),Fo.set(1,1);let o=e.ray.intersectTriangle(dr,Ri,fr,!1,Li);if(o===null&&(pr(Ri.set(-.5,.5,0),$n,s,Kn,i,r),us.set(0,1),o=e.ray.intersectTriangle(dr,fr,Ri,!1,Li),o===null))return;const a=e.ray.origin.distanceTo(Li);a<e.near||a>e.far||t.push({distance:a,point:Li.clone(),uv:re.getUV(Li,dr,Ri,fr,Io,us,Fo,new J),face:null,object:this})},copy:function(e){return mt.prototype.copy.call(this,e),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}});function pr(e,t,n,i,r,s){ti.subVectors(e,n).addScalar(.5).multiply(i),r!==void 0?(Ci.x=s*ti.x-r*ti.y,Ci.y=r*ti.x+s*ti.y):Ci.copy(ti),e.copy(t),e.x+=Ci.x,e.y+=Ci.y,e.applyMatrix4(Po)}const mr=new E,No=new E;function ds(){mt.call(this),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}ds.prototype=Object.assign(Object.create(mt.prototype),{constructor:ds,isLOD:!0,copy:function(e){mt.prototype.copy.call(this,e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance)}return this.autoUpdate=e.autoUpdate,this},addLevel:function(e,t=0){t=Math.abs(t);const n=this.levels;let i;for(i=0;i<n.length&&!(t<n[i].distance);i++);return n.splice(i,0,{distance:t,object:e}),this.add(e),this},getCurrentLevel:function(){return this._currentLevel},getObjectForDistance:function(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i&&!(e<t[n].distance);n++);return t[n-1].object}return null},raycast:function(e,t){if(this.levels.length>0){mr.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(mr);this.getObjectForDistance(i).raycast(e,t)}},update:function(e){const t=this.levels;if(t.length>1){mr.setFromMatrixPosition(e.matrixWorld),No.setFromMatrixPosition(this.matrixWorld);const n=mr.distanceTo(No)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r&&n>=t[i].distance;i++)t[i-1].object.visible=!1,t[i].object.visible=!0;for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}},toJSON:function(e){const t=mt.prototype.toJSON.call(this,e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const s=n[i];t.object.levels.push({object:s.object.uuid,distance:s.distance})}return t}});const Bo=new E,Oo=new Nt,zo=new Nt,nd=new E,Go=new At;function fs(e,t){e&&e.isGeometry&&console.error("THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."),te.call(this,e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new At,this.bindMatrixInverse=new At}fs.prototype=Object.assign(Object.create(te.prototype),{constructor:fs,isSkinnedMesh:!0,copy:function(e){return te.prototype.copy.call(this,e),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this},bind:function(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()},pose:function(){this.skeleton.pose()},normalizeSkinWeights:function(){const e=new Nt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.x=t.getX(n),e.y=t.getY(n),e.z=t.getZ(n),e.w=t.getW(n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}},updateMatrixWorld:function(e){te.prototype.updateMatrixWorld.call(this,e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)},boneTransform:function(e,t){const n=this.skeleton,i=this.geometry;Oo.fromBufferAttribute(i.attributes.skinIndex,e),zo.fromBufferAttribute(i.attributes.skinWeight,e),Bo.fromBufferAttribute(i.attributes.position,e).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const s=zo.getComponent(r);if(s!==0){const o=Oo.getComponent(r);Go.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(nd.copy(Bo).applyMatrix4(Go),s)}}return t.applyMatrix4(this.bindMatrixInverse)}});function ps(){mt.call(this),this.type="Bone"}ps.prototype=Object.assign(Object.create(mt.prototype),{constructor:ps,isBone:!0});const Uo=new At,id=new At;function ms(e=[],t=[]){this.uuid=bt.generateUUID(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}Object.assign(ms.prototype,{init:function(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new At)}},calculateInverses:function(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new At;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}},pose:function(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}},update:function(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,s=e.length;r<s;r++){const o=e[r]?e[r].matrixWorld:id;Uo.multiplyMatrices(o,t[r]),Uo.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)},clone:function(){return new ms(this.bones,this.boneInverses)},getBoneByName:function(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}},dispose:function(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)},fromJSON:function(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let s=t[r];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),s=new ps),this.bones.push(s),this.boneInverses.push(new At().fromArray(e.boneInverses[n]))}return this.init(),this},toJSON:function(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const s=t[i];e.bones.push(s.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}});const Ho=new At,ko=new At,gr=[],Pi=new te;function Vo(e,t,n){te.call(this,e,t),this.instanceMatrix=new St(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1}Vo.prototype=Object.assign(Object.create(te.prototype),{constructor:Vo,isInstancedMesh:!0,copy:function(e){return te.prototype.copy.call(this,e),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this},getColorAt:function(e,t){t.fromArray(this.instanceColor.array,e*3)},getMatrixAt:function(e,t){t.fromArray(this.instanceMatrix.array,e*16)},raycast:function(e,t){const n=this.matrixWorld,i=this.count;if(Pi.geometry=this.geometry,Pi.material=this.material,Pi.material!==void 0)for(let r=0;r<i;r++){this.getMatrixAt(r,Ho),ko.multiplyMatrices(n,Ho),Pi.matrixWorld=ko,Pi.raycast(e,gr);for(let s=0,o=gr.length;s<o;s++){const a=gr[s];a.instanceId=r,a.object=this,t.push(a)}gr.length=0}},setColorAt:function(e,t){this.instanceColor===null&&(this.instanceColor=new St(new Float32Array(this.count*3),3)),t.toArray(this.instanceColor.array,e*3)},setMatrixAt:function(e,t){t.toArray(this.instanceMatrix.array,e*16)},updateMorphTargets:function(){},dispose:function(){this.dispatchEvent({type:"dispose"})}});function _e(e){_t.call(this),this.type="LineBasicMaterial",this.color=new lt(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(e)}_e.prototype=Object.create(_t.prototype),_e.prototype.constructor=_e,_e.prototype.isLineBasicMaterial=!0,_e.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.morphTargets=e.morphTargets,this};const Wo=new E,jo=new E,qo=new At,gs=new yi,yr=new Ke;function ei(e=new Gt,t=new _e){mt.call(this),this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}ei.prototype=Object.assign(Object.create(mt.prototype),{constructor:ei,isLine:!0,copy:function(e){return mt.prototype.copy.call(this,e),this.material=e.material,this.geometry=e.geometry,this},computeLineDistances:function(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Wo.fromBufferAttribute(t,i-1),jo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Wo.distanceTo(jo);e.setAttribute("lineDistance",new Ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this},raycast:function(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold;if(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(i),yr.radius+=r,e.ray.intersectsSphere(yr)===!1)return;qo.copy(i).invert(),gs.copy(e.ray).applyMatrix4(qo);const s=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,a=new E,c=new E,l=new E,u=new E,h=this.isLineSegments?2:1;if(n.isBufferGeometry){const d=n.index,g=n.attributes.position;if(d!==null){const _=d.array;for(let y=0,m=_.length-1;y<m;y+=h){const p=_[y],v=_[y+1];if(a.fromBufferAttribute(g,p),c.fromBufferAttribute(g,v),gs.distanceSqToSegment(a,c,u,l)>o)continue;u.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(u);b<e.near||b>e.far||t.push({distance:b,point:l.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else for(let _=0,y=g.count-1;_<y;_+=h){if(a.fromBufferAttribute(g,_),c.fromBufferAttribute(g,_+1),gs.distanceSqToSegment(a,c,u,l)>o)continue;u.applyMatrix4(this.matrixWorld);const p=e.ray.origin.distanceTo(u);p<e.near||p>e.far||t.push({distance:p,point:l.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else n.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")},updateMorphTargets:function(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}});const Xo=new E,Yo=new E;function _r(e,t){ei.call(this,e,t),this.type="LineSegments"}_r.prototype=Object.assign(Object.create(ei.prototype),{constructor:_r,isLineSegments:!0,computeLineDistances:function(){const e=this.geometry;if(e.isBufferGeometry)if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Xo.fromBufferAttribute(t,i),Yo.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Xo.distanceTo(Yo);e.setAttribute("lineDistance",new Ht(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}});function Zo(e,t){ei.call(this,e,t),this.type="LineLoop"}Zo.prototype=Object.assign(Object.create(ei.prototype),{constructor:Zo,isLineLoop:!0});function wn(e){_t.call(this),this.type="PointsMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(e)}wn.prototype=Object.create(_t.prototype),wn.prototype.constructor=wn,wn.prototype.isPointsMaterial=!0,wn.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.morphTargets=e.morphTargets,this};const Jo=new At,ys=new yi,vr=new Ke,xr=new E;function Qo(e=new Gt,t=new wn){mt.call(this),this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}Qo.prototype=Object.assign(Object.create(mt.prototype),{constructor:Qo,isPoints:!0,copy:function(e){return mt.prototype.copy.call(this,e),this.material=e.material,this.geometry=e.geometry,this},raycast:function(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold;if(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(i),vr.radius+=r,e.ray.intersectsSphere(vr)===!1)return;Jo.copy(i).invert(),ys.copy(e.ray).applyMatrix4(Jo);const s=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s;if(n.isBufferGeometry){const a=n.index,l=n.attributes.position;if(a!==null){const u=a.array;for(let h=0,d=u.length;h<d;h++){const f=u[h];xr.fromBufferAttribute(l,f),Ko(xr,f,o,i,e,t,this)}}else for(let u=0,h=l.count;u<h;u++)xr.fromBufferAttribute(l,u),Ko(xr,u,o,i,e,t,this)}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")},updateMorphTargets:function(){const e=this.geometry;if(e.isBufferGeometry){const t=e.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}else{const t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}});function Ko(e,t,n,i,r,s,o){const a=ys.distanceSqToPoint(e);if(a<n){const c=new E;ys.closestPointToPoint(e,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}function $o(e,t,n,i,r,s,o,a,c){Ot.call(this,e,t,n,i,r,s,o,a,c),this.format=o!==void 0?o:1022,this.minFilter=s!==void 0?s:1006,this.magFilter=r!==void 0?r:1006,this.generateMipmaps=!1;const l=this;function u(){l.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}$o.prototype=Object.assign(Object.create(Ot.prototype),{constructor:$o,clone:function(){return new this.constructor(this.image).copy(this)},isVideoTexture:!0,update:function(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}});function Ii(e,t,n,i,r,s,o,a,c,l,u,h){Ot.call(this,null,s,o,a,c,l,i,r,u,h),this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}Ii.prototype=Object.create(Ot.prototype),Ii.prototype.constructor=Ii,Ii.prototype.isCompressedTexture=!0;function br(e,t,n,i,r,s,o,a,c){Ot.call(this,e,t,n,i,r,s,o,a,c),this.needsUpdate=!0}br.prototype=Object.create(Ot.prototype),br.prototype.constructor=br,br.prototype.isCanvasTexture=!0;function Mr(e,t,n,i,r,s,o,a,c,l){if(l=l!==void 0?l:1026,l!==1026&&l!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&l===1026&&(n=1012),n===void 0&&l===1027&&(n=1020),Ot.call(this,null,i,r,s,o,a,l,n,c),this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=a!==void 0?a:1003,this.flipY=!1,this.generateMipmaps=!1}Mr.prototype=Object.create(Ot.prototype),Mr.prototype.constructor=Mr,Mr.prototype.isDepthTexture=!0,new E,new E,new E,new re;const rd={triangulate:function(e,t,n){n=n||2;const i=t&&t.length,r=i?t[0]*n:e.length;let s=ta(e,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,u,h,d,f;if(i&&(s=ld(e,t,s,n)),e.length>80*n){a=l=e[0],c=u=e[1];for(let g=n;g<r;g+=n)h=e[g],d=e[g+1],h<a&&(a=h),d<c&&(c=d),h>l&&(l=h),d>u&&(u=d);f=Math.max(l-a,u-c),f=f!==0?1/f:0}return Fi(s,o,n,a,c,f),o}};function ta(e,t,n,i,r){let s,o;if(r===xd(e,t,n,i)>0)for(s=t;s<n;s+=i)o=ia(s,e[s],e[s+1],o);else for(s=n-i;s>=t;s-=i)o=ia(s,e[s],e[s+1],o);return o&&wr(o,o.next)&&(Ni(o),o=o.next),o}function ln(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(wr(n,n.next)||jt(n.prev,n,n.next)===0)){if(Ni(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function Fi(e,t,n,i,r,s,o){if(!e)return;!o&&s&&pd(e,i,r,s);let a=e,c,l;for(;e.prev!==e.next;){if(c=e.prev,l=e.next,s?od(e,i,r,s):sd(e)){t.push(c.i/n),t.push(e.i/n),t.push(l.i/n),Ni(e),e=l.next,a=l.next;continue}if(e=l,e===a){o?o===1?(e=ad(ln(e),t,n),Fi(e,t,n,i,r,s,2)):o===2&&cd(e,t,n,i,r,s):Fi(ln(e),t,n,i,r,s,1);break}}}function sd(e){const t=e.prev,n=e,i=e.next;if(jt(t,n,i)>=0)return!1;let r=e.next.next;for(;r!==e.prev;){if(ni(t.x,t.y,n.x,n.y,i.x,i.y,r.x,r.y)&&jt(r.prev,r,r.next)>=0)return!1;r=r.next}return!0}function od(e,t,n,i){const r=e.prev,s=e,o=e.next;if(jt(r,s,o)>=0)return!1;const a=r.x<s.x?r.x<o.x?r.x:o.x:s.x<o.x?s.x:o.x,c=r.y<s.y?r.y<o.y?r.y:o.y:s.y<o.y?s.y:o.y,l=r.x>s.x?r.x>o.x?r.x:o.x:s.x>o.x?s.x:o.x,u=r.y>s.y?r.y>o.y?r.y:o.y:s.y>o.y?s.y:o.y,h=_s(a,c,t,n,i),d=_s(l,u,t,n,i);let f=e.prevZ,g=e.nextZ;for(;f&&f.z>=h&&g&&g.z<=d;){if(f!==e.prev&&f!==e.next&&ni(r.x,r.y,s.x,s.y,o.x,o.y,f.x,f.y)&&jt(f.prev,f,f.next)>=0||(f=f.prevZ,g!==e.prev&&g!==e.next&&ni(r.x,r.y,s.x,s.y,o.x,o.y,g.x,g.y)&&jt(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;f&&f.z>=h;){if(f!==e.prev&&f!==e.next&&ni(r.x,r.y,s.x,s.y,o.x,o.y,f.x,f.y)&&jt(f.prev,f,f.next)>=0)return!1;f=f.prevZ}for(;g&&g.z<=d;){if(g!==e.prev&&g!==e.next&&ni(r.x,r.y,s.x,s.y,o.x,o.y,g.x,g.y)&&jt(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0}function ad(e,t,n){let i=e;do{const r=i.prev,s=i.next.next;!wr(r,s)&&ea(r,i,i.next,s)&&Di(r,s)&&Di(s,r)&&(t.push(r.i/n),t.push(i.i/n),t.push(s.i/n),Ni(i),Ni(i.next),i=e=s),i=i.next}while(i!==e);return ln(i)}function cd(e,t,n,i,r,s){let o=e;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&yd(o,a)){let c=na(o,a);o=ln(o,o.next),c=ln(c,c.next),Fi(o,t,n,i,r,s),Fi(c,t,n,i,r,s);return}a=a.next}o=o.next}while(o!==e)}function ld(e,t,n,i){const r=[];let s,o,a,c,l;for(s=0,o=t.length;s<o;s++)a=t[s]*i,c=s<o-1?t[s+1]*i:e.length,l=ta(e,a,c,i,!1),l===l.next&&(l.steiner=!0),r.push(gd(l));for(r.sort(hd),s=0;s<r.length;s++)ud(r[s],n),n=ln(n,n.next);return n}function hd(e,t){return e.x-t.x}function ud(e,t){if(t=dd(e,t),t){const n=na(t,e);ln(t,t.next),ln(n,n.next)}}function dd(e,t){let n=t;const i=e.x,r=e.y;let s=-1/0,o;do{if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){const d=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=i&&d>s){if(s=d,d===i){if(r===n.y)return n;if(r===n.next.y)return n.next}o=n.x<n.next.x?n:n.next}}n=n.next}while(n!==t);if(!o)return null;if(i===s)return o;const a=o,c=o.x,l=o.y;let u=1/0,h;n=o;do i>=n.x&&n.x>=c&&i!==n.x&&ni(r<l?i:s,r,c,l,r<l?s:i,r,n.x,n.y)&&(h=Math.abs(r-n.y)/(i-n.x),Di(n,e)&&(h<u||h===u&&(n.x>o.x||n.x===o.x&&fd(o,n)))&&(o=n,u=h)),n=n.next;while(n!==a);return o}function fd(e,t){return jt(e.prev,e,t.prev)<0&&jt(t.next,e,e.next)<0}function pd(e,t,n,i){let r=e;do r.z===null&&(r.z=_s(r.x,r.y,t,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,md(r)}function md(e){let t,n,i,r,s,o,a,c,l=1;do{for(n=e,e=null,s=null,o=0;n;){for(o++,i=n,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,c--),s?s.nextZ=r:e=r,r.prevZ=s,s=r;n=i}s.nextZ=null,l*=2}while(o>1);return e}function _s(e,t,n,i,r){return e=32767*(e-n)*r,t=32767*(t-i)*r,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function gd(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function ni(e,t,n,i,r,s,o,a){return(r-o)*(t-a)-(e-o)*(s-a)>=0&&(e-o)*(i-a)-(n-o)*(t-a)>=0&&(n-o)*(s-a)-(r-o)*(i-a)>=0}function yd(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!_d(e,t)&&(Di(e,t)&&Di(t,e)&&vd(e,t)&&(jt(e.prev,e,t.prev)||jt(e,t.prev,t))||wr(e,t)&&jt(e.prev,e,e.next)>0&&jt(t.prev,t,t.next)>0)}function jt(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function wr(e,t){return e.x===t.x&&e.y===t.y}function ea(e,t,n,i){const r=Er(jt(e,t,n)),s=Er(jt(e,t,i)),o=Er(jt(n,i,e)),a=Er(jt(n,i,t));return!!(r!==s&&o!==a||r===0&&Sr(e,n,t)||s===0&&Sr(e,i,t)||o===0&&Sr(n,e,i)||a===0&&Sr(n,t,i))}function Sr(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Er(e){return e>0?1:e<0?-1:0}function _d(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&ea(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Di(e,t){return jt(e.prev,e,e.next)<0?jt(e,t,e.next)>=0&&jt(e,e.prev,t)>=0:jt(e,t,e.prev)<0||jt(e,e.next,t)<0}function vd(e,t){let n=e,i=!1;const r=(e.x+t.x)/2,s=(e.y+t.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function na(e,t){const n=new vs(e.i,e.x,e.y),i=new vs(t.i,t.x,t.y),r=e.next,s=t.prev;return e.next=t,t.prev=e,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function ia(e,t,n,i){const r=new vs(e,t,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Ni(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function vs(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function xd(e,t,n,i){let r=0;for(let s=t,o=n-i;s<n;s+=i)r+=(e[o]-e[s])*(e[s+1]+e[o+1]),o=s;return r}const hn={area:function(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5},isClockWise:function(e){return hn.area(e)<0},triangulateShape:function(e,t){const n=[],i=[],r=[];ra(e),sa(n,e);let s=e.length;t.forEach(ra);for(let a=0;a<t.length;a++)i.push(s),s+=t[a].length,sa(n,t[a]);const o=rd.triangulate(n,i);for(let a=0;a<o.length;a+=3)r.push(o.slice(a,a+3));return r}};function ra(e){const t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function sa(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}class oa extends Gt{constructor(t,n){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const i=this,r=[],s=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new Ht(r,3)),this.setAttribute("uv",new Ht(s,2)),this.computeVertexNormals();function o(a){const c=[],l=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1;let h=n.depth!==void 0?n.depth:100,d=n.bevelEnabled!==void 0?n.bevelEnabled:!0,f=n.bevelThickness!==void 0?n.bevelThickness:6,g=n.bevelSize!==void 0?n.bevelSize:f-2,_=n.bevelOffset!==void 0?n.bevelOffset:0,y=n.bevelSegments!==void 0?n.bevelSegments:3;const m=n.extrudePath,p=n.UVGenerator!==void 0?n.UVGenerator:bd;n.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),h=n.amount);let v,w=!1,b,x,M,P;m&&(v=m.getSpacedPoints(u),w=!0,d=!1,b=m.computeFrenetFrames(u,!1),x=new E,M=new E,P=new E),d||(y=0,f=0,g=0,_=0);const C=a.extractPoints(l);let I=C.shape;const N=C.holes;if(!hn.isClockWise(I)){I=I.reverse();for(let X=0,Q=N.length;X<Q;X++){const $=N[X];hn.isClockWise($)&&(N[X]=$.reverse())}}const F=hn.triangulateShape(I,N),L=I;for(let X=0,Q=N.length;X<Q;X++){const $=N[X];I=I.concat($)}function R(X,Q,$){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().multiplyScalar($).add(X)}const B=I.length,G=F.length;function H(X,Q,$){let at,et,A;const S=X.x-Q.x,q=X.y-Q.y,j=$.x-X.x,D=$.y-X.y,Z=S*S+q*q,it=S*D-q*j;if(Math.abs(it)>Number.EPSILON){const ht=Math.sqrt(Z),tt=Math.sqrt(j*j+D*D),ct=Q.x-q/ht,ut=Q.y+S/ht,xt=$.x-D/tt,st=$.y+j/tt,pt=((xt-ct)*D-(st-ut)*j)/(S*D-q*j);at=ct+S*pt-X.x,et=ut+q*pt-X.y;const Ft=at*at+et*et;if(Ft<=2)return new J(at,et);A=Math.sqrt(Ft/2)}else{let ht=!1;S>Number.EPSILON?j>Number.EPSILON&&(ht=!0):S<-Number.EPSILON?j<-Number.EPSILON&&(ht=!0):Math.sign(q)===Math.sign(D)&&(ht=!0),ht?(at=-q,et=S,A=Math.sqrt(Z)):(at=S,et=q,A=Math.sqrt(Z/2))}return new J(at/A,et/A)}const W=[];for(let X=0,Q=L.length,$=Q-1,at=X+1;X<Q;X++,$++,at++)$===Q&&($=0),at===Q&&(at=0),W[X]=H(L[X],L[$],L[at]);const Y=[];let K,ot=W.concat();for(let X=0,Q=N.length;X<Q;X++){const $=N[X];K=[];for(let at=0,et=$.length,A=et-1,S=at+1;at<et;at++,A++,S++)A===et&&(A=0),S===et&&(S=0),K[at]=H($[at],$[A],$[S]);Y.push(K),ot=ot.concat(K)}for(let X=0;X<y;X++){const Q=X/y,$=f*Math.cos(Q*Math.PI/2),at=g*Math.sin(Q*Math.PI/2)+_;for(let et=0,A=L.length;et<A;et++){const S=R(L[et],W[et],at);gt(S.x,S.y,-$)}for(let et=0,A=N.length;et<A;et++){const S=N[et];K=Y[et];for(let q=0,j=S.length;q<j;q++){const D=R(S[q],K[q],at);gt(D.x,D.y,-$)}}}const ft=g+_;for(let X=0;X<B;X++){const Q=d?R(I[X],ot[X],ft):I[X];w?(M.copy(b.normals[0]).multiplyScalar(Q.x),x.copy(b.binormals[0]).multiplyScalar(Q.y),P.copy(v[0]).add(M).add(x),gt(P.x,P.y,P.z)):gt(Q.x,Q.y,0)}for(let X=1;X<=u;X++)for(let Q=0;Q<B;Q++){const $=d?R(I[Q],ot[Q],ft):I[Q];w?(M.copy(b.normals[X]).multiplyScalar($.x),x.copy(b.binormals[X]).multiplyScalar($.y),P.copy(v[X]).add(M).add(x),gt(P.x,P.y,P.z)):gt($.x,$.y,h/u*X)}for(let X=y-1;X>=0;X--){const Q=X/y,$=f*Math.cos(Q*Math.PI/2),at=g*Math.sin(Q*Math.PI/2)+_;for(let et=0,A=L.length;et<A;et++){const S=R(L[et],W[et],at);gt(S.x,S.y,h+$)}for(let et=0,A=N.length;et<A;et++){const S=N[et];K=Y[et];for(let q=0,j=S.length;q<j;q++){const D=R(S[q],K[q],at);w?gt(D.x,D.y+v[u-1].y,v[u-1].x+$):gt(D.x,D.y,h+$)}}}It(),k();function It(){const X=r.length/3;if(d){let Q=0,$=B*Q;for(let at=0;at<G;at++){const et=F[at];wt(et[2]+$,et[1]+$,et[0]+$)}Q=u+y*2,$=B*Q;for(let at=0;at<G;at++){const et=F[at];wt(et[0]+$,et[1]+$,et[2]+$)}}else{for(let Q=0;Q<G;Q++){const $=F[Q];wt($[2],$[1],$[0])}for(let Q=0;Q<G;Q++){const $=F[Q];wt($[0]+B*u,$[1]+B*u,$[2]+B*u)}}i.addGroup(X,r.length/3-X,0)}function k(){const X=r.length/3;let Q=0;Vt(L,Q),Q+=L.length;for(let $=0,at=N.length;$<at;$++){const et=N[$];Vt(et,Q),Q+=et.length}i.addGroup(X,r.length/3-X,1)}function Vt(X,Q){let $=X.length;for(;--$>=0;){const at=$;let et=$-1;et<0&&(et=X.length-1);for(let A=0,S=u+y*2;A<S;A++){const q=B*A,j=B*(A+1),D=Q+at+q,Z=Q+et+q,it=Q+et+j,ht=Q+at+j;yt(D,Z,it,ht)}}}function gt(X,Q,$){c.push(X),c.push(Q),c.push($)}function wt(X,Q,$){Lt(X),Lt(Q),Lt($);const at=r.length/3,et=p.generateTopUV(i,r,at-3,at-2,at-1);vt(et[0]),vt(et[1]),vt(et[2])}function yt(X,Q,$,at){Lt(X),Lt(Q),Lt(at),Lt(Q),Lt($),Lt(at);const et=r.length/3,A=p.generateSideWallUV(i,r,et-6,et-3,et-2,et-1);vt(A[0]),vt(A[1]),vt(A[3]),vt(A[1]),vt(A[2]),vt(A[3])}function Lt(X){r.push(c[X*3+0]),r.push(c[X*3+1]),r.push(c[X*3+2])}function vt(X){s.push(X.x),s.push(X.y)}}}toJSON(){const t=Gt.prototype.toJSON.call(this),n=this.parameters.shapes,i=this.parameters.options;return Md(n,i,t)}}const bd={generateTopUV:function(e,t,n,i,r){const s=t[n*3],o=t[n*3+1],a=t[i*3],c=t[i*3+1],l=t[r*3],u=t[r*3+1];return[new J(s,o),new J(a,c),new J(l,u)]},generateSideWallUV:function(e,t,n,i,r,s){const o=t[n*3],a=t[n*3+1],c=t[n*3+2],l=t[i*3],u=t[i*3+1],h=t[i*3+2],d=t[r*3],f=t[r*3+1],g=t[r*3+2],_=t[s*3],y=t[s*3+1],m=t[s*3+2];return Math.abs(a-u)<.01?[new J(o,1-c),new J(l,1-h),new J(d,1-g),new J(_,1-m)]:[new J(a,1-c),new J(u,1-h),new J(f,1-g),new J(y,1-m)]}};function Md(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,r=e.length;i<r;i++){const s=e[i];n.shapes.push(s.uuid)}else n.shapes.push(e.uuid);return t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}function xs(e,t,n){Gt.call(this),this.type="ParametricGeometry",this.parameters={func:e,slices:t,stacks:n};const i=[],r=[],s=[],o=[],a=1e-5,c=new E,l=new E,u=new E,h=new E,d=new E;e.length<3&&console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");const f=t+1;for(let g=0;g<=n;g++){const _=g/n;for(let y=0;y<=t;y++){const m=y/t;e(m,_,l),r.push(l.x,l.y,l.z),m-a>=0?(e(m-a,_,u),h.subVectors(l,u)):(e(m+a,_,u),h.subVectors(u,l)),_-a>=0?(e(m,_-a,u),d.subVectors(l,u)):(e(m,_+a,u),d.subVectors(u,l)),c.crossVectors(h,d).normalize(),s.push(c.x,c.y,c.z),o.push(m,_)}}for(let g=0;g<n;g++)for(let _=0;_<t;_++){const y=g*f+_,m=g*f+_+1,p=(g+1)*f+_+1,v=(g+1)*f+_;i.push(y,m,v),i.push(m,p,v)}this.setIndex(i),this.setAttribute("position",new Ht(r,3)),this.setAttribute("normal",new Ht(s,3)),this.setAttribute("uv",new Ht(o,2))}xs.prototype=Object.create(Gt.prototype),xs.prototype.constructor=xs;class wd extends Gt{constructor(t,n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const i=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Ht(r,3)),this.setAttribute("normal",new Ht(s,3)),this.setAttribute("uv",new Ht(o,2));function l(u){const h=r.length/3,d=u.extractPoints(n);let f=d.shape;const g=d.holes;hn.isClockWise(f)===!1&&(f=f.reverse());for(let y=0,m=g.length;y<m;y++){const p=g[y];hn.isClockWise(p)===!0&&(g[y]=p.reverse())}const _=hn.triangulateShape(f,g);for(let y=0,m=g.length;y<m;y++){const p=g[y];f=f.concat(p)}for(let y=0,m=f.length;y<m;y++){const p=f[y];r.push(p.x,p.y,0),s.push(0,0,1),o.push(p.x,p.y)}for(let y=0,m=_.length;y<m;y++){const p=_[y],v=p[0]+h,w=p[1]+h,b=p[2]+h;i.push(v,w,b),c+=3}}}toJSON(){const t=Gt.prototype.toJSON.call(this),n=this.parameters.shapes;return Sd(n,t)}}function Sd(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){const r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}function ii(e){_t.call(this),this.type="ShadowMaterial",this.color=new lt(0),this.transparent=!0,this.setValues(e)}ii.prototype=Object.create(_t.prototype),ii.prototype.constructor=ii,ii.prototype.isShadowMaterial=!0,ii.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this};function Bi(e){ae.call(this,e),this.type="RawShaderMaterial"}Bi.prototype=Object.create(ae.prototype),Bi.prototype.constructor=Bi,Bi.prototype.isRawShaderMaterial=!0;function ke(e){_t.call(this),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.vertexTangents=!1,this.setValues(e)}ke.prototype=Object.create(_t.prototype),ke.prototype.constructor=ke,ke.prototype.isMeshStandardMaterial=!0,ke.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.vertexTangents=e.vertexTangents,this};function Sn(e){ke.call(this),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(t){this.reflectivity=bt.clamp(2.5*(t-1)/(t+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(e)}Sn.prototype=Object.create(ke.prototype),Sn.prototype.constructor=Sn,Sn.prototype.isMeshPhysicalMaterial=!0,Sn.prototype.copy=function(e){return ke.prototype.copy.call(this,e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.reflectivity=e.reflectivity,e.sheen?this.sheen=(this.sheen||new lt).copy(e.sheen):this.sheen=null,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this};function En(e){_t.call(this),this.type="MeshPhongMaterial",this.color=new lt(16777215),this.specular=new lt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}En.prototype=Object.create(_t.prototype),En.prototype.constructor=En,En.prototype.isMeshPhongMaterial=!0,En.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function ri(e){_t.call(this),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new lt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}ri.prototype=Object.create(_t.prototype),ri.prototype.constructor=ri,ri.prototype.isMeshToonMaterial=!0,ri.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function si(e){_t.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}si.prototype=Object.create(_t.prototype),si.prototype.constructor=si,si.prototype.isMeshNormalMaterial=!0,si.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function oi(e){_t.call(this),this.type="MeshLambertMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}oi.prototype=Object.create(_t.prototype),oi.prototype.constructor=oi,oi.prototype.isMeshLambertMaterial=!0,oi.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function ai(e){_t.call(this),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new lt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}ai.prototype=Object.create(_t.prototype),ai.prototype.constructor=ai,ai.prototype.isMeshMatcapMaterial=!0,ai.prototype.copy=function(e){return _t.prototype.copy.call(this,e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this};function ci(e){_e.call(this),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}ci.prototype=Object.create(_e.prototype),ci.prototype.constructor=ci,ci.prototype.isLineDashedMaterial=!0,ci.prototype.copy=function(e){return _e.prototype.copy.call(this,e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this};var Ed=Object.freeze({__proto__:null,ShadowMaterial:ii,SpriteMaterial:Mn,RawShaderMaterial:Bi,ShaderMaterial:ae,PointsMaterial:wn,MeshPhysicalMaterial:Sn,MeshStandardMaterial:ke,MeshPhongMaterial:En,MeshToonMaterial:ri,MeshNormalMaterial:si,MeshLambertMaterial:oi,MeshDepthMaterial:_n,MeshDistanceMaterial:vn,MeshBasicMaterial:en,MeshMatcapMaterial:ai,LineDashedMaterial:ci,LineBasicMaterial:_e,Material:_t});const kt={arraySlice:function(e,t,n){return kt.isTypedArray(e)?new e.constructor(e.subarray(t,n!==void 0?n:e.length)):e.slice(t,n)},convertArray:function(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)},isTypedArray:function(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)},getKeyframeOrder:function(e){function t(r,s){return e[r]-e[s]}const n=e.length,i=new Array(n);for(let r=0;r!==n;++r)i[r]=r;return i.sort(t),i},sortedArray:function(e,t,n){const i=e.length,r=new e.constructor(i);for(let s=0,o=0;o!==i;++s){const a=n[s]*t;for(let c=0;c!==t;++c)r[o++]=e[a+c]}return r},flattenJSON:function(e,t,n,i){let r=1,s=e[0];for(;s!==void 0&&s[i]===void 0;)s=e[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(t.push(s.time),n.push.apply(n,o)),s=e[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(t.push(s.time),o.toArray(n,n.length)),s=e[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(t.push(s.time),n.push(o)),s=e[r++];while(s!==void 0)},subclip:function(e,t,n,i,r=30){const s=e.clone();s.name=t;const o=[];for(let c=0;c<s.tracks.length;++c){const l=s.tracks[c],u=l.getValueSize(),h=[],d=[];for(let f=0;f<l.times.length;++f){const g=l.times[f]*r;if(!(g<n||g>=i)){h.push(l.times[f]);for(let _=0;_<u;++_)d.push(l.values[f*u+_])}}h.length!==0&&(l.times=kt.convertArray(h,l.times.constructor),l.values=kt.convertArray(d,l.values.constructor),o.push(l))}s.tracks=o;let a=1/0;for(let c=0;c<s.tracks.length;++c)a>s.tracks[c].times[0]&&(a=s.tracks[c].times[0]);for(let c=0;c<s.tracks.length;++c)s.tracks[c].shift(-1*a);return s.resetDuration(),s},makeClipAdditive:function(e,t=0,n=e,i=30){i<=0&&(i=30);const r=n.tracks.length,s=t/i;for(let o=0;o<r;++o){const a=n.tracks[o],c=a.ValueTypeName;if(c==="bool"||c==="string")continue;const l=e.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===c});if(l===void 0)continue;let u=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let d=0;const f=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);const g=a.times.length-1;let _;if(s<=a.times[0]){const m=u,p=h-u;_=kt.arraySlice(a.values,m,p)}else if(s>=a.times[g]){const m=g*h+u,p=m+h-u;_=kt.arraySlice(a.values,m,p)}else{const m=a.createInterpolant(),p=u,v=h-u;m.evaluate(s),_=kt.arraySlice(m.resultBuffer,p,v)}c==="quaternion"&&new $t().fromArray(_).normalize().conjugate().toArray(_);const y=l.times.length;for(let m=0;m<y;++m){const p=m*f+d;if(c==="quaternion")$t.multiplyQuaternionsFlat(l.values,p,_,0,l.values,p);else{const v=f-d*2;for(let w=0;w<v;++w)l.values[p+w]-=_[w]}}}return e.blendMode=2501,e}};function ve(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n}Object.assign(ve.prototype,{evaluate:function(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];t:{e:{let s;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,e,r)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}s=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let a=n-2;;){if(r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(n===a)break;if(i=r,r=t[--n-1],e>=r)break e}s=n,n=0;break n}break t}for(;n<s;){const o=n+s>>>1;e<t[o]?s=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,i);if(i===void 0)return n=t.length,this._cachedIndex=n,this.afterEnd_(n-1,r,e)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)},settings:null,DefaultSettings_:{},getSettings_:function(){return this.settings||this.DefaultSettings_},copySampleValue_:function(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let s=0;s!==i;++s)t[s]=n[r+s];return t},interpolate_:function(){throw new Error("call to abstract method")},intervalChanged_:function(){}}),Object.assign(ve.prototype,{beforeStart_:ve.prototype.copySampleValue_,afterEnd_:ve.prototype.copySampleValue_});function bs(e,t,n,i){ve.call(this,e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0}bs.prototype=Object.assign(Object.create(ve.prototype),{constructor:bs,DefaultSettings_:{endingStart:2400,endingEnd:2400},intervalChanged_:function(e,t,n){const i=this.parameterPositions;let r=e-2,s=e+1,o=i[r],a=i[s];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,o=2*t-n;break;case 2402:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case 2401:s=e,a=2*n-t;break;case 2402:s=1,a=n+i[1]-i[0];break;default:s=e-1,a=t}const c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(a-n),this._offsetPrev=r*l,this._offsetNext=s*l},interpolate_:function(e,t,n,i){const r=this.resultBuffer,s=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,l=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,d=this._weightNext,f=(n-t)/(i-t),g=f*f,_=g*f,y=-h*_+2*h*g-h*f,m=(1+h)*_+(-1.5-2*h)*g+(-.5+h)*f+1,p=(-1-d)*_+(1.5+d)*g+.5*f,v=d*_-d*g;for(let w=0;w!==o;++w)r[w]=y*s[l+w]+m*s[c+w]+p*s[a+w]+v*s[u+w];return r}});function Tr(e,t,n,i){ve.call(this,e,t,n,i)}Tr.prototype=Object.assign(Object.create(ve.prototype),{constructor:Tr,interpolate_:function(e,t,n,i){const r=this.resultBuffer,s=this.sampleValues,o=this.valueSize,a=e*o,c=a-o,l=(n-t)/(i-t),u=1-l;for(let h=0;h!==o;++h)r[h]=s[c+h]*u+s[a+h]*l;return r}});function Ms(e,t,n,i){ve.call(this,e,t,n,i)}Ms.prototype=Object.assign(Object.create(ve.prototype),{constructor:Ms,interpolate_:function(e){return this.copySampleValue_(e-1)}});function ie(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=kt.convertArray(t,this.TimeBufferType),this.values=kt.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}Object.assign(ie,{toJSON:function(e){const t=e.constructor;let n;if(t.toJSON!==void 0)n=t.toJSON(e);else{n={name:e.name,times:kt.convertArray(e.times,Array),values:kt.convertArray(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}}),Object.assign(ie.prototype,{constructor:ie,TimeBufferType:Float32Array,ValueBufferType:Float32Array,DefaultInterpolation:2301,InterpolantFactoryMethodDiscrete:function(e){return new Ms(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodLinear:function(e){return new Tr(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodSmooth:function(e){return new bs(this.times,this.values,this.getValueSize(),e)},setInterpolation:function(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this},getInterpolation:function(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}},getValueSize:function(){return this.values.length/this.times.length},shift:function(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this},scale:function(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this},trim:function(e,t){const n=this.times,i=n.length;let r=0,s=i-1;for(;r!==i&&n[r]<e;)++r;for(;s!==-1&&n[s]>t;)--s;if(++s,r!==0||s!==i){r>=s&&(s=Math.max(s,1),r=s-1);const o=this.getValueSize();this.times=kt.arraySlice(n,r,s),this.values=kt.arraySlice(this.values,r*o,s*o)}return this},validate:function(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==r;o++){const a=n[o];if(typeof a=="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,a),e=!1;break}if(s!==null&&s>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,a,s),e=!1;break}s=a}if(i!==void 0&&kt.isTypedArray(i))for(let o=0,a=i.length;o!==a;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e},optimize:function(){const e=kt.arraySlice(this.times),t=kt.arraySlice(this.values),n=this.getValueSize(),i=this.getInterpolation()===2302,r=e.length-1;let s=1;for(let o=1;o<r;++o){let a=!1;const c=e[o],l=e[o+1];if(c!==l&&(o!==1||c!==e[0]))if(i)a=!0;else{const u=o*n,h=u-n,d=u+n;for(let f=0;f!==n;++f){const g=t[u+f];if(g!==t[h+f]||g!==t[d+f]){a=!0;break}}}if(a){if(o!==s){e[s]=e[o];const u=o*n,h=s*n;for(let d=0;d!==n;++d)t[h+d]=t[u+d]}++s}}if(r>0){e[s]=e[r];for(let o=r*n,a=s*n,c=0;c!==n;++c)t[a+c]=t[o+c];++s}return s!==e.length?(this.times=kt.arraySlice(e,0,s),this.values=kt.arraySlice(t,0,s*n)):(this.times=e,this.values=t),this},clone:function(){const e=kt.arraySlice(this.times,0),t=kt.arraySlice(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}});function ws(e,t,n){ie.call(this,e,t,n)}ws.prototype=Object.assign(Object.create(ie.prototype),{constructor:ws,ValueTypeName:"bool",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});function Ss(e,t,n,i){ie.call(this,e,t,n,i)}Ss.prototype=Object.assign(Object.create(ie.prototype),{constructor:Ss,ValueTypeName:"color"});function Oi(e,t,n,i){ie.call(this,e,t,n,i)}Oi.prototype=Object.assign(Object.create(ie.prototype),{constructor:Oi,ValueTypeName:"number"});function Es(e,t,n,i){ve.call(this,e,t,n,i)}Es.prototype=Object.assign(Object.create(ve.prototype),{constructor:Es,interpolate_:function(e,t,n,i){const r=this.resultBuffer,s=this.sampleValues,o=this.valueSize,a=(n-t)/(i-t);let c=e*o;for(let l=c+o;c!==l;c+=4)$t.slerpFlat(r,0,s,c-o,s,c,a);return r}});function Ar(e,t,n,i){ie.call(this,e,t,n,i)}Ar.prototype=Object.assign(Object.create(ie.prototype),{constructor:Ar,ValueTypeName:"quaternion",DefaultInterpolation:2301,InterpolantFactoryMethodLinear:function(e){return new Es(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodSmooth:void 0});function Ts(e,t,n,i){ie.call(this,e,t,n,i)}Ts.prototype=Object.assign(Object.create(ie.prototype),{constructor:Ts,ValueTypeName:"string",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0});function zi(e,t,n,i){ie.call(this,e,t,n,i)}zi.prototype=Object.assign(Object.create(ie.prototype),{constructor:zi,ValueTypeName:"vector"});function Ee(e,t=-1,n,i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=bt.generateUUID(),this.duration<0&&this.resetDuration()}function Td(e){switch(e.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Oi;case"vector":case"vector2":case"vector3":case"vector4":return zi;case"color":return Ss;case"quaternion":return Ar;case"bool":case"boolean":return ws;case"string":return Ts}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+e)}function Ad(e){if(e.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Td(e.type);if(e.times===void 0){const n=[],i=[];kt.flattenJSON(e.keys,n,i,"value"),e.times=n,e.values=i}return t.parse!==void 0?t.parse(e):new t(e.name,e.times,e.values,e.interpolation)}Object.assign(Ee,{parse:function(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let s=0,o=n.length;s!==o;++s)t.push(Ad(n[s]).scale(i));const r=new Ee(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r},toJSON:function(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,s=n.length;r!==s;++r)t.push(ie.toJSON(n[r]));return i},CreateFromMorphTargetSequence:function(e,t,n,i){const r=t.length,s=[];for(let o=0;o<r;o++){let a=[],c=[];a.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const l=kt.getKeyframeOrder(a);a=kt.sortedArray(a,1,l),c=kt.sortedArray(c,1,l),!i&&a[0]===0&&(a.push(r),c.push(c[0])),s.push(new Oi(".morphTargetInfluences["+t[o].name+"]",a,c).scale(1/n))}return new Ee(e,-1,s)},findByName:function(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null},CreateClipsFromMorphTargetSequences:function(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,a=e.length;o<a;o++){const c=e[o],l=c.name.match(r);if(l&&l.length>1){const u=l[1];let h=i[u];h||(i[u]=h=[]),h.push(c)}}const s=[];for(const o in i)s.push(Ee.CreateFromMorphTargetSequence(o,i[o],t,n));return s},parseAnimation:function(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,h,d,f,g){if(d.length!==0){const _=[],y=[];kt.flattenJSON(d,_,y,f),_.length!==0&&g.push(new u(h,_,y))}},i=[],r=e.name||"default",s=e.fps||30,o=e.blendMode;let a=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const h=c[u].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let f;for(f=0;f<h.length;f++)if(h[f].morphTargets)for(let g=0;g<h[f].morphTargets.length;g++)d[h[f].morphTargets[g]]=-1;for(const g in d){const _=[],y=[];for(let m=0;m!==h[f].morphTargets.length;++m){const p=h[f];_.push(p.time),y.push(p.morphTarget===g?1:0)}i.push(new Oi(".morphTargetInfluence["+g+"]",_,y))}a=d.length*(s||1)}else{const d=".bones["+t[u].name+"]";n(zi,d+".position",h,"pos",i),n(Ar,d+".quaternion",h,"rot",i),n(zi,d+".scale",h,"scl",i)}}return i.length===0?null:new Ee(r,a,i,o)}}),Object.assign(Ee.prototype,{resetDuration:function(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this},trim:function(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this},validate:function(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e},optimize:function(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this},clone:function(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new Ee(this.name,this.duration,e,this.blendMode)},toJSON:function(){return Ee.toJSON(this)}});const li={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(this.files[e]=t)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Ld(e,t,n){const i=this;let r=!1,s=0,o=0,a;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(l){o++,r===!1&&i.onStart!==void 0&&i.onStart(l,s,o),r=!0},this.itemEnd=function(l){s++,i.onProgress!==void 0&&i.onProgress(l,s,o),s===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(l){i.onError!==void 0&&i.onError(l)},this.resolveURL=function(l){return a?a(l):l},this.setURLModifier=function(l){return a=l,this},this.addHandler=function(l,u){return c.push(l,u),this},this.removeHandler=function(l){const u=c.indexOf(l);return u!==-1&&c.splice(u,2),this},this.getHandler=function(l){for(let u=0,h=c.length;u<h;u+=2){const d=c[u],f=c[u+1];if(d.global&&(d.lastIndex=0),d.test(l))return f}return null}}const Cd=new Ld;function Bt(e){this.manager=e!==void 0?e:Cd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}Object.assign(Bt.prototype,{load:function(){},loadAsync:function(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})},parse:function(){},setCrossOrigin:function(e){return this.crossOrigin=e,this},setWithCredentials:function(e){return this.withCredentials=e,this},setPath:function(e){return this.path=e,this},setResourcePath:function(e){return this.resourcePath=e,this},setRequestHeader:function(e){return this.requestHeader=e,this}});const Te={};function Ve(e){Bt.call(this,e)}Ve.prototype=Object.assign(Object.create(Bt.prototype),{constructor:Ve,load:function(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=li.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;if(Te[e]!==void 0){Te[e].push({onLoad:t,onProgress:n,onError:i});return}const o=/^data:(.*?)(;base64)?,(.*)$/,a=e.match(o);let c;if(a){const l=a[1],u=!!a[2];let h=a[3];h=decodeURIComponent(h),u&&(h=atob(h));try{let d;const f=(this.responseType||"").toLowerCase();switch(f){case"arraybuffer":case"blob":const g=new Uint8Array(h.length);for(let y=0;y<h.length;y++)g[y]=h.charCodeAt(y);f==="blob"?d=new Blob([g.buffer],{type:l}):d=g.buffer;break;case"document":d=new DOMParser().parseFromString(h,l);break;case"json":d=JSON.parse(h);break;default:d=h;break}setTimeout(function(){t&&t(d),r.manager.itemEnd(e)},0)}catch(d){setTimeout(function(){i&&i(d),r.manager.itemError(e),r.manager.itemEnd(e)},0)}}else{Te[e]=[],Te[e].push({onLoad:t,onProgress:n,onError:i}),c=new XMLHttpRequest,c.open("GET",e,!0),c.addEventListener("load",function(l){const u=this.response,h=Te[e];if(delete Te[e],this.status===200||this.status===0){this.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),li.add(e,u);for(let d=0,f=h.length;d<f;d++){const g=h[d];g.onLoad&&g.onLoad(u)}r.manager.itemEnd(e)}else{for(let d=0,f=h.length;d<f;d++){const g=h[d];g.onError&&g.onError(l)}r.manager.itemError(e),r.manager.itemEnd(e)}},!1),c.addEventListener("progress",function(l){const u=Te[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onProgress&&f.onProgress(l)}},!1),c.addEventListener("error",function(l){const u=Te[e];delete Te[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),c.addEventListener("abort",function(l){const u=Te[e];delete Te[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}r.manager.itemError(e),r.manager.itemEnd(e)},!1),this.responseType!==void 0&&(c.responseType=this.responseType),this.withCredentials!==void 0&&(c.withCredentials=this.withCredentials),c.overrideMimeType&&c.overrideMimeType(this.mimeType!==void 0?this.mimeType:"text/plain");for(const l in this.requestHeader)c.setRequestHeader(l,this.requestHeader[l]);c.send(null)}return r.manager.itemStart(e),c},setResponseType:function(e){return this.responseType=e,this},setMimeType:function(e){return this.mimeType=e,this}});function aa(e){Bt.call(this,e)}aa.prototype=Object.assign(Object.create(Bt.prototype),{constructor:aa,load:function(e,t,n,i){const r=this,s=new Ve(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)},parse:function(e){const t=[];for(let n=0;n<e.length;n++){const i=Ee.parse(e[n]);t.push(i)}return t}});function ca(e){Bt.call(this,e)}ca.prototype=Object.assign(Object.create(Bt.prototype),{constructor:ca,load:function(e,t,n,i){const r=this,s=[],o=new Ii,a=new Ve(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(r.withCredentials);let c=0;function l(u){a.load(e[u],function(h){const d=r.parse(h,!0);s[u]={width:d.width,height:d.height,format:d.format,mipmaps:d.mipmaps},c+=1,c===6&&(d.mipmapCount===1&&(o.minFilter=1006),o.image=s,o.format=d.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let u=0,h=e.length;u<h;++u)l(u);else a.load(e,function(u){const h=r.parse(u,!0);if(h.isCubemap){const d=h.mipmaps.length/h.mipmapCount;for(let f=0;f<d;f++){s[f]={mipmaps:[]};for(let g=0;g<h.mipmapCount;g++)s[f].mipmaps.push(h.mipmaps[f*h.mipmapCount+g]),s[f].format=h.format,s[f].width=h.width,s[f].height=h.height}o.image=s}else o.image.width=h.width,o.image.height=h.height,o.mipmaps=h.mipmaps;h.mipmapCount===1&&(o.minFilter=1006),o.format=h.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}});function Lr(e){Bt.call(this,e)}Lr.prototype=Object.assign(Object.create(Bt.prototype),{constructor:Lr,load:function(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=li.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;const o=document.createElementNS("http://www.w3.org/1999/xhtml","img");function a(){o.removeEventListener("load",a,!1),o.removeEventListener("error",c,!1),li.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(l){o.removeEventListener("load",a,!1),o.removeEventListener("error",c,!1),i&&i(l),r.manager.itemError(e),r.manager.itemEnd(e)}return o.addEventListener("load",a,!1),o.addEventListener("error",c,!1),e.substr(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}});function As(e){Bt.call(this,e)}As.prototype=Object.assign(Object.create(Bt.prototype),{constructor:As,load:function(e,t,n,i){const r=new an,s=new Lr(this.manager);s.setCrossOrigin(this.crossOrigin),s.setPath(this.path);let o=0;function a(c){s.load(e[c],function(l){r.images[c]=l,o++,o===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)a(c);return r}});function la(e){Bt.call(this,e)}la.prototype=Object.assign(Object.create(Bt.prototype),{constructor:la,load:function(e,t,n,i){const r=this,s=new Xn,o=new Ve(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(a){const c=r.parse(a);c&&(c.image!==void 0?s.image=c.image:c.data!==void 0&&(s.image.width=c.width,s.image.height=c.height,s.image.data=c.data),s.wrapS=c.wrapS!==void 0?c.wrapS:1001,s.wrapT=c.wrapT!==void 0?c.wrapT:1001,s.magFilter=c.magFilter!==void 0?c.magFilter:1006,s.minFilter=c.minFilter!==void 0?c.minFilter:1006,s.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.encoding!==void 0&&(s.encoding=c.encoding),c.flipY!==void 0&&(s.flipY=c.flipY),c.format!==void 0&&(s.format=c.format),c.type!==void 0&&(s.type=c.type),c.mipmaps!==void 0&&(s.mipmaps=c.mipmaps,s.minFilter=1008),c.mipmapCount===1&&(s.minFilter=1006),s.needsUpdate=!0,t&&t(s,c))},n,i),s}});function Ls(e){Bt.call(this,e)}Ls.prototype=Object.assign(Object.create(Bt.prototype),{constructor:Ls,load:function(e,t,n,i){const r=new Ot,s=new Lr(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){r.image=o;const a=e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0;r.format=a?1022:1023,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}});function dt(){this.type="Curve",this.arcLengthDivisions=200}Object.assign(dt.prototype,{getPoint:function(){return console.warn("THREE.Curve: .getPoint() not implemented."),null},getPointAt:function(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)},getPoints:function(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t},getSpacedPoints:function(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t},getLength:function(){const e=this.getLengths();return e[e.length-1]},getLengths:function(e){if(e===void 0&&(e=this.arcLengthDivisions),this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t},updateArcLengths:function(){this.needsUpdate=!0,this.getLengths()},getUtoTmapping:function(e,t){const n=this.getLengths();let i=0;const r=n.length;let s;t?s=t:s=e*n[r-1];let o=0,a=r-1,c;for(;o<=a;)if(i=Math.floor(o+(a-o)/2),c=n[i]-s,c<0)o=i+1;else if(c>0)a=i-1;else{a=i;break}if(i=a,n[i]===s)return i/(r-1);const l=n[i],h=n[i+1]-l,d=(s-l)/h;return(i+d)/(r-1)},getTangent:function(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const s=this.getPoint(i),o=this.getPoint(r),a=t||(s.isVector2?new J:new E);return a.copy(o).sub(s).normalize(),a},getTangentAt:function(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)},computeFrenetFrames:function(e,t){const n=new E,i=[],r=[],s=[],o=new E,a=new At;for(let d=0;d<=e;d++){const f=d/e;i[d]=this.getTangentAt(f,new E),i[d].normalize()}r[0]=new E,s[0]=new E;let c=Number.MAX_VALUE;const l=Math.abs(i[0].x),u=Math.abs(i[0].y),h=Math.abs(i[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),s[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),s[d]=s[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const f=Math.acos(bt.clamp(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(a.makeRotationAxis(o,f))}s[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(bt.clamp(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let f=1;f<=e;f++)r[f].applyMatrix4(a.makeRotationAxis(i[f],d*f)),s[f].crossVectors(i[f],r[f])}return{tangents:i,normals:r,binormals:s}},clone:function(){return new this.constructor().copy(this)},copy:function(e){return this.arcLengthDivisions=e.arcLengthDivisions,this},toJSON:function(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e},fromJSON:function(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}});function xe(e,t,n,i,r,s,o,a){dt.call(this),this.type="EllipseCurve",this.aX=e||0,this.aY=t||0,this.xRadius=n||1,this.yRadius=i||1,this.aStartAngle=r||0,this.aEndAngle=s||2*Math.PI,this.aClockwise=o||!1,this.aRotation=a||0}xe.prototype=Object.create(dt.prototype),xe.prototype.constructor=xe,xe.prototype.isEllipseCurve=!0,xe.prototype.getPoint=function(e,t){const n=t||new J,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(s?r=0:r=i),this.aClockwise===!0&&!s&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let a=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=a-this.aX,d=c-this.aY;a=h*l-d*u+this.aX,c=h*u+d*l+this.aY}return n.set(a,c)},xe.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this},xe.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e},xe.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this};function Gi(e,t,n,i,r,s){xe.call(this,e,t,n,n,i,r,s),this.type="ArcCurve"}Gi.prototype=Object.create(xe.prototype),Gi.prototype.constructor=Gi,Gi.prototype.isArcCurve=!0;function Cs(){let e=0,t=0,n=0,i=0;function r(s,o,a,c){e=s,t=a,n=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let d=(o-s)/l-(a-s)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,f*=u,r(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return e+t*s+n*o+i*a}}}const Cr=new E,Rs=new Cs,Ps=new Cs,Is=new Cs;function de(e=[],t=!1,n="centripetal",i=.5){dt.call(this),this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}de.prototype=Object.create(dt.prototype),de.prototype.constructor=de,de.prototype.isCatmullRomCurve3=!0,de.prototype.getPoint=function(e,t=new E){const n=t,i=this.points,r=i.length,s=(r-(this.closed?0:1))*e;let o=Math.floor(s),a=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:a===0&&o===r-1&&(o=r-2,a=1);let c,l;this.closed||o>0?c=i[(o-1)%r]:(Cr.subVectors(i[0],i[1]).add(i[0]),c=Cr);const u=i[o%r],h=i[(o+1)%r];if(this.closed||o+2<r?l=i[(o+2)%r]:(Cr.subVectors(i[r-1],i[r-2]).add(i[r-1]),l=Cr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let f=Math.pow(c.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(l),d);g<1e-4&&(g=1),f<1e-4&&(f=g),_<1e-4&&(_=g),Rs.initNonuniformCatmullRom(c.x,u.x,h.x,l.x,f,g,_),Ps.initNonuniformCatmullRom(c.y,u.y,h.y,l.y,f,g,_),Is.initNonuniformCatmullRom(c.z,u.z,h.z,l.z,f,g,_)}else this.curveType==="catmullrom"&&(Rs.initCatmullRom(c.x,u.x,h.x,l.x,this.tension),Ps.initCatmullRom(c.y,u.y,h.y,l.y,this.tension),Is.initCatmullRom(c.z,u.z,h.z,l.z,this.tension));return n.set(Rs.calc(a),Ps.calc(a),Is.calc(a)),n},de.prototype.copy=function(e){dt.prototype.copy.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this},de.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e},de.prototype.fromJSON=function(e){dt.prototype.fromJSON.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this};function ha(e,t,n,i,r){const s=(i-t)*.5,o=(r-n)*.5,a=e*e,c=e*a;return(2*n-2*i+s+o)*c+(-3*n+3*i-2*s-o)*a+s*e+n}function Rd(e,t){const n=1-e;return n*n*t}function Pd(e,t){return 2*(1-e)*e*t}function Id(e,t){return e*e*t}function Ui(e,t,n,i){return Rd(e,t)+Pd(e,n)+Id(e,i)}function Fd(e,t){const n=1-e;return n*n*n*t}function Dd(e,t){const n=1-e;return 3*n*n*e*t}function Nd(e,t){return 3*(1-e)*e*e*t}function Bd(e,t){return e*e*e*t}function Hi(e,t,n,i,r){return Fd(e,t)+Dd(e,n)+Nd(e,i)+Bd(e,r)}function Re(e=new J,t=new J,n=new J,i=new J){dt.call(this),this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}Re.prototype=Object.create(dt.prototype),Re.prototype.constructor=Re,Re.prototype.isCubicBezierCurve=!0,Re.prototype.getPoint=function(e,t=new J){const n=t,i=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(Hi(e,i.x,r.x,s.x,o.x),Hi(e,i.y,r.y,s.y,o.y)),n},Re.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this},Re.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e},Re.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this};function We(e=new E,t=new E,n=new E,i=new E){dt.call(this),this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}We.prototype=Object.create(dt.prototype),We.prototype.constructor=We,We.prototype.isCubicBezierCurve3=!0,We.prototype.getPoint=function(e,t=new E){const n=t,i=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(Hi(e,i.x,r.x,s.x,o.x),Hi(e,i.y,r.y,s.y,o.y),Hi(e,i.z,r.z,s.z,o.z)),n},We.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this},We.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e},We.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this};function fe(e=new J,t=new J){dt.call(this),this.type="LineCurve",this.v1=e,this.v2=t}fe.prototype=Object.create(dt.prototype),fe.prototype.constructor=fe,fe.prototype.isLineCurve=!0,fe.prototype.getPoint=function(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n},fe.prototype.getPointAt=function(e,t){return this.getPoint(e,t)},fe.prototype.getTangent=function(e,t){const n=t||new J;return n.copy(this.v2).sub(this.v1).normalize(),n},fe.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.v1.copy(e.v1),this.v2.copy(e.v2),this},fe.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},fe.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function Pe(e=new E,t=new E){dt.call(this),this.type="LineCurve3",this.v1=e,this.v2=t}Pe.prototype=Object.create(dt.prototype),Pe.prototype.constructor=Pe,Pe.prototype.isLineCurve3=!0,Pe.prototype.getPoint=function(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n},Pe.prototype.getPointAt=function(e,t){return this.getPoint(e,t)},Pe.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.v1.copy(e.v1),this.v2.copy(e.v2),this},Pe.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},Pe.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function Ie(e=new J,t=new J,n=new J){dt.call(this),this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}Ie.prototype=Object.create(dt.prototype),Ie.prototype.constructor=Ie,Ie.prototype.isQuadraticBezierCurve=!0,Ie.prototype.getPoint=function(e,t=new J){const n=t,i=this.v0,r=this.v1,s=this.v2;return n.set(Ui(e,i.x,r.x,s.x),Ui(e,i.y,r.y,s.y)),n},Ie.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this},Ie.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},Ie.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function je(e=new E,t=new E,n=new E){dt.call(this),this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}je.prototype=Object.create(dt.prototype),je.prototype.constructor=je,je.prototype.isQuadraticBezierCurve3=!0,je.prototype.getPoint=function(e,t=new E){const n=t,i=this.v0,r=this.v1,s=this.v2;return n.set(Ui(e,i.x,r.x,s.x),Ui(e,i.y,r.y,s.y),Ui(e,i.z,r.z,s.z)),n},je.prototype.copy=function(e){return dt.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this},je.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},je.prototype.fromJSON=function(e){return dt.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this};function Fe(e=[]){dt.call(this),this.type="SplineCurve",this.points=e}Fe.prototype=Object.create(dt.prototype),Fe.prototype.constructor=Fe,Fe.prototype.isSplineCurve=!0,Fe.prototype.getPoint=function(e,t=new J){const n=t,i=this.points,r=(i.length-1)*e,s=Math.floor(r),o=r-s,a=i[s===0?s:s-1],c=i[s],l=i[s>i.length-2?i.length-1:s+1],u=i[s>i.length-3?i.length-1:s+2];return n.set(ha(o,a.x,c.x,l.x,u.x),ha(o,a.y,c.y,l.y,u.y)),n},Fe.prototype.copy=function(e){dt.prototype.copy.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this},Fe.prototype.toJSON=function(){const e=dt.prototype.toJSON.call(this);e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e},Fe.prototype.fromJSON=function(e){dt.prototype.fromJSON.call(this,e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new J().fromArray(i))}return this};var Od=Object.freeze({__proto__:null,ArcCurve:Gi,CatmullRomCurve3:de,CubicBezierCurve:Re,CubicBezierCurve3:We,EllipseCurve:xe,LineCurve:fe,LineCurve3:Pe,QuadraticBezierCurve:Ie,QuadraticBezierCurve3:je,SplineCurve:Fe});function Tn(){dt.call(this),this.type="CurvePath",this.curves=[],this.autoClose=!1}Tn.prototype=Object.assign(Object.create(dt.prototype),{constructor:Tn,add:function(e){this.curves.push(e)},closePath:function(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new fe(t,e))},getPoint:function(e){const t=e*this.getLength(),n=this.getCurveLengths();let i=0;for(;i<n.length;){if(n[i]>=t){const r=n[i]-t,s=this.curves[i],o=s.getLength(),a=o===0?0:1-r/o;return s.getPointAt(a)}i++}return null},getLength:function(){const e=this.getCurveLengths();return e[e.length-1]},updateArcLengths:function(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()},getCurveLengths:function(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e},getSpacedPoints:function(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t},getPoints:function(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const s=r[i],o=s&&s.isEllipseCurve?e*2:s&&(s.isLineCurve||s.isLineCurve3)?1:s&&s.isSplineCurve?e*s.points.length:e,a=s.getPoints(o);for(let c=0;c<a.length;c++){const l=a[c];n&&n.equals(l)||(t.push(l),n=l)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t},copy:function(e){dt.prototype.copy.call(this,e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this},toJSON:function(){const e=dt.prototype.toJSON.call(this);e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e},fromJSON:function(e){dt.prototype.fromJSON.call(this,e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Od[i.type]().fromJSON(i))}return this}});function De(e){Tn.call(this),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}De.prototype=Object.assign(Object.create(Tn.prototype),{constructor:De,setFromPoints:function(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this},moveTo:function(e,t){return this.currentPoint.set(e,t),this},lineTo:function(e,t){const n=new fe(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this},quadraticCurveTo:function(e,t,n,i){const r=new Ie(this.currentPoint.clone(),new J(e,t),new J(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this},bezierCurveTo:function(e,t,n,i,r,s){const o=new Re(this.currentPoint.clone(),new J(e,t),new J(n,i),new J(r,s));return this.curves.push(o),this.currentPoint.set(r,s),this},splineThru:function(e){const t=[this.currentPoint.clone()].concat(e),n=new Fe(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this},arc:function(e,t,n,i,r,s){const o=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+o,t+a,n,i,r,s),this},absarc:function(e,t,n,i,r,s){return this.absellipse(e,t,n,n,i,r,s),this},ellipse:function(e,t,n,i,r,s,o,a){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,i,r,s,o,a),this},absellipse:function(e,t,n,i,r,s,o,a){const c=new xe(e,t,n,i,r,s,o,a);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const l=c.getPoint(1);return this.currentPoint.copy(l),this},copy:function(e){return Tn.prototype.copy.call(this,e),this.currentPoint.copy(e.currentPoint),this},toJSON:function(){const e=Tn.prototype.toJSON.call(this);return e.currentPoint=this.currentPoint.toArray(),e},fromJSON:function(e){return Tn.prototype.fromJSON.call(this,e),this.currentPoint.fromArray(e.currentPoint),this}});function hi(e){De.call(this,e),this.uuid=bt.generateUUID(),this.type="Shape",this.holes=[]}hi.prototype=Object.assign(Object.create(De.prototype),{constructor:hi,getPointsHoles:function(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t},extractPoints:function(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}},copy:function(e){De.prototype.copy.call(this,e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this},toJSON:function(){const e=De.prototype.toJSON.call(this);e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e},fromJSON:function(e){De.prototype.fromJSON.call(this,e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new De().fromJSON(i))}return this}});function Ut(e,t=1){mt.call(this),this.type="Light",this.color=new lt(e),this.intensity=t}Ut.prototype=Object.assign(Object.create(mt.prototype),{constructor:Ut,isLight:!0,copy:function(e){return mt.prototype.copy.call(this,e),this.color.copy(e.color),this.intensity=e.intensity,this},toJSON:function(e){const t=mt.prototype.toJSON.call(this,e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}});function ua(e,t,n){Ut.call(this,e,n),this.type="HemisphereLight",this.position.copy(mt.DefaultUp),this.updateMatrix(),this.groundColor=new lt(t)}ua.prototype=Object.assign(Object.create(Ut.prototype),{constructor:ua,isHemisphereLight:!0,copy:function(e){return Ut.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}});function qe(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hr,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}Object.assign(qe.prototype,{_projScreenMatrix:new At,_lightPositionWorld:new E,_lookTarget:new E,getViewportCount:function(){return this._viewportCount},getFrustum:function(){return this._frustum},updateMatrices:function(e){const t=this.camera,n=this.matrix,i=this._projScreenMatrix,r=this._lookTarget,s=this._lightPositionWorld;s.setFromMatrixPosition(e.matrixWorld),t.position.copy(s),r.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(r),t.updateMatrixWorld(),i.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(i),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(t.projectionMatrix),n.multiply(t.matrixWorldInverse)},getViewport:function(e){return this._viewports[e]},getFrameExtents:function(){return this._frameExtents},copy:function(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this},clone:function(){return new this.constructor().copy(this)},toJSON:function(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}});function Fs(){qe.call(this,new ee(50,1,.5,500)),this.focus=1}Fs.prototype=Object.assign(Object.create(qe.prototype),{constructor:Fs,isSpotLightShadow:!0,updateMatrices:function(e){const t=this.camera,n=bt.RAD2DEG*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),qe.prototype.updateMatrices.call(this,e)}});function da(e,t,n,i,r,s){Ut.call(this,e,t),this.type="SpotLight",this.position.copy(mt.DefaultUp),this.updateMatrix(),this.target=new mt,Object.defineProperty(this,"power",{get:function(){return this.intensity*Math.PI},set:function(o){this.intensity=o/Math.PI}}),this.distance=n!==void 0?n:0,this.angle=i!==void 0?i:Math.PI/3,this.penumbra=r!==void 0?r:0,this.decay=s!==void 0?s:1,this.shadow=new Fs}da.prototype=Object.assign(Object.create(Ut.prototype),{constructor:da,isSpotLight:!0,copy:function(e){return Ut.prototype.copy.call(this,e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}});function Ds(){qe.call(this,new ee(90,1,.5,500)),this._frameExtents=new J(4,2),this._viewportCount=6,this._viewports=[new Nt(2,1,1,1),new Nt(0,1,1,1),new Nt(3,1,1,1),new Nt(1,1,1,1),new Nt(3,0,1,1),new Nt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}Ds.prototype=Object.assign(Object.create(qe.prototype),{constructor:Ds,isPointLightShadow:!0,updateMatrices:function(e,t=0){const n=this.camera,i=this.matrix,r=this._lightPositionWorld,s=this._lookTarget,o=this._projScreenMatrix;r.setFromMatrixPosition(e.matrixWorld),n.position.copy(r),s.copy(n.position),s.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(s),n.updateMatrixWorld(),i.makeTranslation(-r.x,-r.y,-r.z),o.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(o)}});function fa(e,t,n,i){Ut.call(this,e,t),this.type="PointLight",Object.defineProperty(this,"power",{get:function(){return this.intensity*4*Math.PI},set:function(r){this.intensity=r/(4*Math.PI)}}),this.distance=n!==void 0?n:0,this.decay=i!==void 0?i:1,this.shadow=new Ds}fa.prototype=Object.assign(Object.create(Ut.prototype),{constructor:fa,isPointLight:!0,copy:function(e){return Ut.prototype.copy.call(this,e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}});function Ns(e=-1,t=1,n=1,i=-1,r=.1,s=2e3){on.call(this),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}Ns.prototype=Object.assign(Object.create(on.prototype),{constructor:Ns,isOrthographicCamera:!0,copy:function(e,t){return on.prototype.copy.call(this,e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this},setViewOffset:function(e,t,n,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()},clearViewOffset:function(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,s=n+e,o=i+t,a=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=l*this.view.offsetY,a=o-l*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,a,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()},toJSON:function(e){const t=mt.prototype.toJSON.call(this,e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}});function Bs(){qe.call(this,new Ns(-5,5,5,-5,.5,500))}Bs.prototype=Object.assign(Object.create(qe.prototype),{constructor:Bs,isDirectionalLightShadow:!0,updateMatrices:function(e){qe.prototype.updateMatrices.call(this,e)}});function pa(e,t){Ut.call(this,e,t),this.type="DirectionalLight",this.position.copy(mt.DefaultUp),this.updateMatrix(),this.target=new mt,this.shadow=new Bs}pa.prototype=Object.assign(Object.create(Ut.prototype),{constructor:pa,isDirectionalLight:!0,copy:function(e){return Ut.prototype.copy.call(this,e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}});function ma(e,t){Ut.call(this,e,t),this.type="AmbientLight"}ma.prototype=Object.assign(Object.create(Ut.prototype),{constructor:ma,isAmbientLight:!0});function ga(e,t,n,i){Ut.call(this,e,t),this.type="RectAreaLight",this.width=n!==void 0?n:10,this.height=i!==void 0?i:10}ga.prototype=Object.assign(Object.create(Ut.prototype),{constructor:ga,isRectAreaLight:!0,copy:function(e){return Ut.prototype.copy.call(this,e),this.width=e.width,this.height=e.height,this},toJSON:function(e){const t=Ut.prototype.toJSON.call(this,e);return t.object.width=this.width,t.object.height=this.height,t}});class zd{constructor(){Object.defineProperty(this,"isSphericalHarmonics3",{value:!0}),this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new E)}set(t){for(let n=0;n<9;n++)this.coefficients[n].copy(t[n]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,n){const i=t.x,r=t.y,s=t.z,o=this.coefficients;return n.copy(o[0]).multiplyScalar(.282095),n.addScaledVector(o[1],.488603*r),n.addScaledVector(o[2],.488603*s),n.addScaledVector(o[3],.488603*i),n.addScaledVector(o[4],1.092548*(i*r)),n.addScaledVector(o[5],1.092548*(r*s)),n.addScaledVector(o[6],.315392*(3*s*s-1)),n.addScaledVector(o[7],1.092548*(i*s)),n.addScaledVector(o[8],.546274*(i*i-r*r)),n}getIrradianceAt(t,n){const i=t.x,r=t.y,s=t.z,o=this.coefficients;return n.copy(o[0]).multiplyScalar(.886227),n.addScaledVector(o[1],2*.511664*r),n.addScaledVector(o[2],2*.511664*s),n.addScaledVector(o[3],2*.511664*i),n.addScaledVector(o[4],2*.429043*i*r),n.addScaledVector(o[5],2*.429043*r*s),n.addScaledVector(o[6],.743125*s*s-.247708),n.addScaledVector(o[7],2*.429043*i*s),n.addScaledVector(o[8],.429043*(i*i-r*r)),n}add(t){for(let n=0;n<9;n++)this.coefficients[n].add(t.coefficients[n]);return this}addScaledSH(t,n){for(let i=0;i<9;i++)this.coefficients[i].addScaledVector(t.coefficients[i],n);return this}scale(t){for(let n=0;n<9;n++)this.coefficients[n].multiplyScalar(t);return this}lerp(t,n){for(let i=0;i<9;i++)this.coefficients[i].lerp(t.coefficients[i],n);return this}equals(t){for(let n=0;n<9;n++)if(!this.coefficients[n].equals(t.coefficients[n]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,n=0){const i=this.coefficients;for(let r=0;r<9;r++)i[r].fromArray(t,n+r*3);return this}toArray(t=[],n=0){const i=this.coefficients;for(let r=0;r<9;r++)i[r].toArray(t,n+r*3);return t}static getBasisAt(t,n){const i=t.x,r=t.y,s=t.z;n[0]=.282095,n[1]=.488603*r,n[2]=.488603*s,n[3]=.488603*i,n[4]=1.092548*i*r,n[5]=1.092548*r*s,n[6]=.315392*(3*s*s-1),n[7]=1.092548*i*s,n[8]=.546274*(i*i-r*r)}}function Ne(e,t){Ut.call(this,void 0,t),this.type="LightProbe",this.sh=e!==void 0?e:new zd}Ne.prototype=Object.assign(Object.create(Ut.prototype),{constructor:Ne,isLightProbe:!0,copy:function(e){return Ut.prototype.copy.call(this,e),this.sh.copy(e.sh),this},fromJSON:function(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this},toJSON:function(e){const t=Ut.prototype.toJSON.call(this,e);return t.object.sh=this.sh.toArray(),t}});function ya(e){Bt.call(this,e),this.textures={}}ya.prototype=Object.assign(Object.create(Bt.prototype),{constructor:ya,load:function(e,t,n,i){const r=this,s=new Ve(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)},parse:function(e){const t=this.textures;function n(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}const i=new Ed[e.type];if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=new lt().setHex(e.sheen)),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==1&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.skinning!==void 0&&(i.skinning=e.skinning),e.morphTargets!==void 0&&(i.morphTargets=e.morphTargets),e.morphNormals!==void 0&&(i.morphNormals=e.morphNormals),e.dithering!==void 0&&(i.dithering=e.dithering),e.vertexTangents!==void 0&&(i.vertexTangents=e.vertexTangents),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const s=e.uniforms[r];switch(i.uniforms[r]={},s.type){case"t":i.uniforms[r].value=n(s.value);break;case"c":i.uniforms[r].value=new lt().setHex(s.value);break;case"v2":i.uniforms[r].value=new J().fromArray(s.value);break;case"v3":i.uniforms[r].value=new E().fromArray(s.value);break;case"v4":i.uniforms[r].value=new Nt().fromArray(s.value);break;case"m3":i.uniforms[r].value=new pe().fromArray(s.value);break;case"m4":i.uniforms[r].value=new At().fromArray(s.value);break;default:i.uniforms[r].value=s.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.extensions!==void 0)for(const r in e.extensions)i.extensions[r]=e.extensions[r];if(e.shading!==void 0&&(i.flatShading=e.shading===1),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new J().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.transmission!==void 0&&(i.transmission=e.transmission),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),i},setTextures:function(e){return this.textures=e,this}});const Gd={decodeText:function(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}},extractUrlBase:function(e){const t=e.lastIndexOf("/");return t===-1?"./":e.substr(0,t+1)}};function Rr(){Gt.call(this),this.type="InstancedBufferGeometry",this.instanceCount=1/0}Rr.prototype=Object.assign(Object.create(Gt.prototype),{constructor:Rr,isInstancedBufferGeometry:!0,copy:function(e){return Gt.prototype.copy.call(this,e),this.instanceCount=e.instanceCount,this},clone:function(){return new this.constructor().copy(this)},toJSON:function(){const e=Gt.prototype.toJSON.call(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}});function Os(e,t,n,i){typeof n=="number"&&(i=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),St.call(this,e,t,n),this.meshPerAttribute=i||1}Os.prototype=Object.assign(Object.create(St.prototype),{constructor:Os,isInstancedBufferAttribute:!0,copy:function(e){return St.prototype.copy.call(this,e),this.meshPerAttribute=e.meshPerAttribute,this},toJSON:function(){const e=St.prototype.toJSON.call(this);return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}});function _a(e){Bt.call(this,e)}_a.prototype=Object.assign(Object.create(Bt.prototype),{constructor:_a,load:function(e,t,n,i){const r=this,s=new Ve(r.manager);s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)},parse:function(e){const t={},n={};function i(d,f){if(t[f]!==void 0)return t[f];const _=d.interleavedBuffers[f],y=r(d,_.buffer),m=tr(_.type,y),p=new ye(m,_.stride);return p.uuid=_.uuid,t[f]=p,p}function r(d,f){if(n[f]!==void 0)return n[f];const _=d.arrayBuffers[f],y=new Uint32Array(_).buffer;return n[f]=y,y}const s=e.isInstancedBufferGeometry?new Rr:new Gt,o=e.data.index;if(o!==void 0){const d=tr(o.type,o.array);s.setIndex(new St(d,1))}const a=e.data.attributes;for(const d in a){const f=a[d];let g;if(f.isInterleavedBufferAttribute){const _=i(e.data,f.data);g=new bn(_,f.itemSize,f.offset,f.normalized)}else{const _=tr(f.type,f.array),y=f.isInstancedBufferAttribute?Os:St;g=new y(_,f.itemSize,f.normalized)}f.name!==void 0&&(g.name=f.name),s.setAttribute(d,g)}const c=e.data.morphAttributes;if(c)for(const d in c){const f=c[d],g=[];for(let _=0,y=f.length;_<y;_++){const m=f[_];let p;if(m.isInterleavedBufferAttribute){const v=i(e.data,m.data);p=new bn(v,m.itemSize,m.offset,m.normalized)}else{const v=tr(m.type,m.array);p=new St(v,m.itemSize,m.normalized)}m.name!==void 0&&(p.name=m.name),g.push(p)}s.morphAttributes[d]=g}e.data.morphTargetsRelative&&(s.morphTargetsRelative=!0);const u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let d=0,f=u.length;d!==f;++d){const g=u[d];s.addGroup(g.start,g.count,g.materialIndex)}const h=e.data.boundingSphere;if(h!==void 0){const d=new E;h.center!==void 0&&d.fromArray(h.center),s.boundingSphere=new Ke(d,h.radius)}return e.name&&(s.name=e.name),e.userData&&(s.userData=e.userData),s}});function va(e){typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),Bt.call(this,e),this.options={premultiplyAlpha:"none"}}va.prototype=Object.assign(Object.create(Bt.prototype),{constructor:va,isImageBitmapLoader:!0,setOptions:function(t){return this.options=t,this},load:function(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=li.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",fetch(e,o).then(function(a){return a.blob()}).then(function(a){return createImageBitmap(a,r.options)}).then(function(a){li.add(e,a),t&&t(a),r.manager.itemEnd(e)}).catch(function(a){i&&i(a),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}});function xa(){this.type="ShapePath",this.color=new lt,this.subPaths=[],this.currentPath=null}Object.assign(xa.prototype,{moveTo:function(e,t){return this.currentPath=new De,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this},lineTo:function(e,t){return this.currentPath.lineTo(e,t),this},quadraticCurveTo:function(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this},bezierCurveTo:function(e,t,n,i,r,s){return this.currentPath.bezierCurveTo(e,t,n,i,r,s),this},splineThru:function(e){return this.currentPath.splineThru(e),this},toShapes:function(e,t){function n(m){const p=[];for(let v=0,w=m.length;v<w;v++){const b=m[v],x=new hi;x.curves=b.curves,p.push(x)}return p}function i(m,p){const v=p.length;let w=!1;for(let b=v-1,x=0;x<v;b=x++){let M=p[b],P=p[x],C=P.x-M.x,I=P.y-M.y;if(Math.abs(I)>Number.EPSILON){if(I<0&&(M=p[x],C=-C,P=p[b],I=-I),m.y<M.y||m.y>P.y)continue;if(m.y===M.y){if(m.x===M.x)return!0}else{const N=I*(m.x-M.x)-C*(m.y-M.y);if(N===0)return!0;if(N<0)continue;w=!w}}else{if(m.y!==M.y)continue;if(P.x<=m.x&&m.x<=M.x||M.x<=m.x&&m.x<=P.x)return!0}}return w}const r=hn.isClockWise,s=this.subPaths;if(s.length===0)return[];if(t===!0)return n(s);let o,a,c;const l=[];if(s.length===1)return a=s[0],c=new hi,c.curves=a.curves,l.push(c),l;let u=!r(s[0].getPoints());u=e?!u:u;const h=[],d=[];let f=[],g=0,_;d[g]=void 0,f[g]=[];for(let m=0,p=s.length;m<p;m++)a=s[m],_=a.getPoints(),o=r(_),o=e?!o:o,o?(!u&&d[g]&&g++,d[g]={s:new hi,p:_},d[g].s.curves=a.curves,u&&g++,f[g]=[]):f[g].push({h:a,p:_[0]});if(!d[0])return n(s);if(d.length>1){let m=!1;const p=[];for(let v=0,w=d.length;v<w;v++)h[v]=[];for(let v=0,w=d.length;v<w;v++){const b=f[v];for(let x=0;x<b.length;x++){const M=b[x];let P=!0;for(let C=0;C<d.length;C++)i(M.p,d[C].p)&&(v!==C&&p.push({froms:v,tos:C,hole:x}),P?(P=!1,h[C].push(M)):m=!0);P&&h[v].push(M)}}p.length>0&&(m||(f=h))}let y;for(let m=0,p=d.length;m<p;m++){c=d[m].s,l.push(c),y=f[m];for(let v=0,w=y.length;v<w;v++)c.holes.push(y[v].h)}return l}});class Ud{constructor(t){Object.defineProperty(this,"isFont",{value:!0}),this.type="Font",this.data=t}generateShapes(t,n=100){const i=[],r=Hd(t,n,this.data);for(let s=0,o=r.length;s<o;s++)Array.prototype.push.apply(i,r[s].toShapes());return i}}function Hd(e,t,n){const i=Array.from?Array.from(e):String(e).split(""),r=t/n.resolution,s=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*r,o=[];let a=0,c=0;for(let l=0;l<i.length;l++){const u=i[l];if(u===`
`)a=0,c-=s;else{const h=kd(u,r,a,c,n);a+=h.offsetX,o.push(h.path)}}return o}function kd(e,t,n,i,r){const s=r.glyphs[e]||r.glyphs["?"];if(!s){console.error('THREE.Font: character "'+e+'" does not exists in font family '+r.familyName+".");return}const o=new xa;let a,c,l,u,h,d,f,g;if(s.o){const _=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let y=0,m=_.length;y<m;)switch(_[y++]){case"m":a=_[y++]*t+n,c=_[y++]*t+i,o.moveTo(a,c);break;case"l":a=_[y++]*t+n,c=_[y++]*t+i,o.lineTo(a,c);break;case"q":l=_[y++]*t+n,u=_[y++]*t+i,h=_[y++]*t+n,d=_[y++]*t+i,o.quadraticCurveTo(h,d,l,u);break;case"b":l=_[y++]*t+n,u=_[y++]*t+i,h=_[y++]*t+n,d=_[y++]*t+i,f=_[y++]*t+n,g=_[y++]*t+i,o.bezierCurveTo(h,d,f,g,l,u);break}}return{offsetX:s.ha*t,path:o}}function ba(e){Bt.call(this,e)}ba.prototype=Object.assign(Object.create(Bt.prototype),{constructor:ba,load:function(e,t,n,i){const r=this,s=new Ve(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){let a;try{a=JSON.parse(o)}catch{console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),a=JSON.parse(o.substring(65,o.length-2))}const c=r.parse(a);t&&t(c)},n,i)},parse:function(e){return new Ud(e)}});let Pr;const Vd={getContext:function(){return Pr===void 0&&(Pr=new(window.AudioContext||window.webkitAudioContext)),Pr},setContext:function(e){Pr=e}};function Ma(e){Bt.call(this,e)}Ma.prototype=Object.assign(Object.create(Bt.prototype),{constructor:Ma,load:function(e,t,n,i){const r=this,s=new Ve(r.manager);s.setResponseType("arraybuffer"),s.setPath(r.path),s.setRequestHeader(r.requestHeader),s.setWithCredentials(r.withCredentials),s.load(e,function(o){try{const a=o.slice(0);Vd.getContext().decodeAudioData(a,function(l){t(l)})}catch(a){i?i(a):console.error(a),r.manager.itemError(e)}},n,i)}});function wa(e,t,n){Ne.call(this,void 0,n);const i=new lt().set(e),r=new lt().set(t),s=new E(i.r,i.g,i.b),o=new E(r.r,r.g,r.b),a=Math.sqrt(Math.PI),c=a*Math.sqrt(.75);this.sh.coefficients[0].copy(s).add(o).multiplyScalar(a),this.sh.coefficients[1].copy(s).sub(o).multiplyScalar(c)}wa.prototype=Object.assign(Object.create(Ne.prototype),{constructor:wa,isHemisphereLightProbe:!0,copy:function(e){return Ne.prototype.copy.call(this,e),this},toJSON:function(e){return Ne.prototype.toJSON.call(this,e)}});function Sa(e,t){Ne.call(this,void 0,t);const n=new lt().set(e);this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI))}Sa.prototype=Object.assign(Object.create(Ne.prototype),{constructor:Sa,isAmbientLightProbe:!0,copy:function(e){return Ne.prototype.copy.call(this,e),this},toJSON:function(e){return Ne.prototype.toJSON.call(this,e)}});const Ea=new At,Ta=new At;function Wd(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new ee,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new ee,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}Object.assign(Wd.prototype,{update:function(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep;const i=e.projectionMatrix.clone(),r=t.eyeSep/2,s=r*t.near/t.focus,o=t.near*Math.tan(bt.DEG2RAD*t.fov*.5)/t.zoom;let a,c;Ta.elements[12]=-r,Ea.elements[12]=r,a=-o*t.aspect+s,c=o*t.aspect+s,i.elements[0]=2*t.near/(c-a),i.elements[8]=(c+a)/(c-a),this.cameraL.projectionMatrix.copy(i),a=-o*t.aspect-s,c=o*t.aspect-s,i.elements[0]=2*t.near/(c-a),i.elements[8]=(c+a)/(c-a),this.cameraR.projectionMatrix.copy(i)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Ta),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Ea)}});function Aa(e,t,n){this.binding=e,this.valueSize=n;let i,r,s;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,s=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,s=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,s=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=s,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}Object.assign(Aa.prototype,{accumulate:function(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let s=this.cumulativeWeight;if(s===0){for(let o=0;o!==i;++o)n[r+o]=n[o];s=t}else{s+=t;const o=t/s;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=s},accumulateAdditive:function(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e},apply:function(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,s=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const a=t*this._origIndex;this._mixBufferRegion(n,i,a,1-r,t)}s>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let a=t,c=t+t;a!==c;++a)if(n[a]!==n[a+t]){o.setValue(n,i);break}},saveOriginalState:function(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,s=i;r!==s;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0},restoreOriginalState:function(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)},_setAdditiveIdentityNumeric:function(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0},_setAdditiveIdentityQuaternion:function(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1},_setAdditiveIdentityOther:function(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]},_select:function(e,t,n,i,r){if(i>=.5)for(let s=0;s!==r;++s)e[t+s]=e[n+s]},_slerp:function(e,t,n,i){$t.slerpFlat(e,t,e,t,e,n,i)},_slerpAdditive:function(e,t,n,i,r){const s=this._workIndex*r;$t.multiplyQuaternionsFlat(e,s,e,t,e,n),$t.slerpFlat(e,t,e,t,e,s,i)},_lerp:function(e,t,n,i,r){const s=1-i;for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]*s+e[n+o]*i}},_lerpAdditive:function(e,t,n,i,r){for(let s=0;s!==r;++s){const o=t+s;e[o]=e[o]+e[n+s]*i}}});const zs="\\[\\]\\.:\\/",jd=new RegExp("["+zs+"]","g"),Gs="[^"+zs+"]",qd="[^"+zs.replace("\\.","")+"]",Xd=/((?:WC+[\/:])*)/.source.replace("WC",Gs),Yd=/(WCOD+)?/.source.replace("WCOD",qd),Zd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gs),Jd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gs),Qd=new RegExp("^"+Xd+Yd+Zd+Jd+"$"),Kd=["material","materials","bones"];function La(e,t,n){const i=n||se.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}Object.assign(La.prototype,{getValue:function(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)},setValue:function(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)},bind:function(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()},unbind:function(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}});function se(e,t,n){this.path=t,this.parsedPath=n||se.parseTrackName(t),this.node=se.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e}Object.assign(se,{Composite:La,create:function(e,t,n){return e&&e.isAnimationObjectGroup?new se.Composite(e,t,n):new se(e,t,n)},sanitizeNodeName:function(e){return e.replace(/\s/g,"_").replace(jd,"")},parseTrackName:function(e){const t=Qd.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Kd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n},findNode:function(e,t){if(!t||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let s=0;s<r.length;s++){const o=r[s];if(o.name===t||o.uuid===t)return o;const a=n(o.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}}),Object.assign(se.prototype,{_getValue_unavailable:function(){},_setValue_unavailable:function(){},BindingType:{Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Versioning:{None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},GetterByBindingType:[function(t,n){t[n]=this.node[this.propertyName]},function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)t[n++]=i[r]},function(t,n){t[n]=this.resolvedProperty[this.propertyIndex]},function(t,n){this.resolvedProperty.toArray(t,n)}],SetterByBindingTypeAndVersioning:[[function(t,n){this.targetObject[this.propertyName]=t[n]},function(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0},function(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[n++]},function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[n++];this.targetObject.needsUpdate=!0},function(t,n){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,n){this.resolvedProperty[this.propertyIndex]=t[n]},function(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0},function(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,n){this.resolvedProperty.fromArray(t,n)},function(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0},function(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}]],getValue:function(t,n){this.bind(),this.getValue(t,n)},setValue:function(t,n){this.bind(),this.setValue(t,n)},bind:function(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=se.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let l=0;l<e.length;l++)if(e[l].name===c){c=l;break}break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const s=e[i];if(s===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(e.geometry.isBufferGeometry){if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}a=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(a=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]},unbind:function(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}),Object.assign(se.prototype,{_getValue_unbound:se.prototype.getValue,_setValue_unbound:se.prototype.setValue});function $d(){this.uuid=bt.generateUUID(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}Object.assign($d.prototype,{isAnimationObjectGroup:!0,add:function(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,s=r.length;let o,a=e.length,c=this.nCachedObjects_;for(let l=0,u=arguments.length;l!==u;++l){const h=arguments[l],d=h.uuid;let f=t[d];if(f===void 0){f=a++,t[d]=f,e.push(h);for(let g=0,_=s;g!==_;++g)r[g].push(new se(h,n[g],i[g]))}else if(f<c){o=e[f];const g=--c,_=e[g];t[_.uuid]=f,e[f]=_,t[d]=g,e[g]=h;for(let y=0,m=s;y!==m;++y){const p=r[y],v=p[g];let w=p[f];p[f]=v,w===void 0&&(w=new se(h,n[y],i[y])),p[g]=w}}else e[f]!==o&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c},remove:function(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let s=0,o=arguments.length;s!==o;++s){const a=arguments[s],c=a.uuid,l=t[c];if(l!==void 0&&l>=r){const u=r++,h=e[u];t[h.uuid]=l,e[l]=h,t[c]=u,e[u]=a;for(let d=0,f=i;d!==f;++d){const g=n[d],_=g[u],y=g[l];g[l]=_,g[u]=y}}}this.nCachedObjects_=r},uncache:function(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,s=e.length;for(let o=0,a=arguments.length;o!==a;++o){const c=arguments[o],l=c.uuid,u=t[l];if(u!==void 0)if(delete t[l],u<r){const h=--r,d=e[h],f=--s,g=e[f];t[d.uuid]=u,e[u]=d,t[g.uuid]=h,e[h]=g,e.pop();for(let _=0,y=i;_!==y;++_){const m=n[_],p=m[h],v=m[f];m[u]=p,m[h]=v,m.pop()}}else{const h=--s,d=e[h];h>0&&(t[d.uuid]=u),e[u]=d,e.pop();for(let f=0,g=i;f!==g;++f){const _=n[f];_[u]=_[h],_.pop()}}}this.nCachedObjects_=r},subscribe_:function(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const r=this._bindings;if(i!==void 0)return r[i];const s=this._paths,o=this._parsedPaths,a=this._objects,c=a.length,l=this.nCachedObjects_,u=new Array(c);i=r.length,n[e]=i,s.push(e),o.push(t),r.push(u);for(let h=l,d=a.length;h!==d;++h){const f=a[h];u[h]=new se(f,e,t)}return u},unsubscribe_:function(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,r=this._parsedPaths,s=this._bindings,o=s.length-1,a=s[o],c=e[o];t[c]=n,s[n]=a,s.pop(),r[n]=r[o],r.pop(),i[n]=i[o],i.pop()}}});class tf{constructor(t,n,i=null,r=n.blendMode){this._mixer=t,this._clip=n,this._localRoot=i,this.blendMode=r;const s=n.tracks,o=s.length,a=new Array(o),c={endingStart:2400,endingEnd:2400};for(let l=0;l!==o;++l){const u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,n){return this.loop=t,this.repetitions=n,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,n,i){if(t.fadeOut(n),this.fadeIn(n),i){const r=this._clip.duration,s=t._clip.duration,o=s/r,a=r/s;t.warp(1,o,n),this.warp(a,1,n)}return this}crossFadeTo(t,n,i){return t.crossFadeFrom(this,n,i)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,n,i){const r=this._mixer,s=r.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+i,l[0]=t/o,l[1]=n/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,n,i,r){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const c=(t-s)*i;if(c<0||i===0)return;this._startTime=null,n=i*c}n*=this._updateTimeScale(t);const o=this._updateTime(n),a=this._updateWeight(t);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case 2501:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case 2500:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(r,a)}}}_updateWeight(t){let n=0;if(this.enabled){n=this.weight;const i=this._weightInterpolant;if(i!==null){const r=i.evaluate(t)[0];n*=r,t>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=n,n}_updateTimeScale(t){let n=0;if(!this.paused){n=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const r=i.evaluate(t)[0];n*=r,t>i.parameterPositions[1]&&(this.stopWarping(),n===0?this.paused=!0:this.timeScale=n)}}return this._effectiveTimeScale=n,n}_updateTime(t){const n=this._clip.duration,i=this.loop;let r=this.time+t,s=this._loopCount;const o=i===2202;if(t===0)return s===-1?r:o&&(s&1)===1?n-r:r;if(i===2200){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(r>=n)r=n;else if(r<0)r=0;else{this.time=r;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=n||r<0){const a=Math.floor(r/n);r-=n*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=t>0?n:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return n-r}return r}_setEndings(t,n,i){const r=this._interpolantSettings;i?(r.endingStart=2401,r.endingEnd=2401):(t?r.endingStart=this.zeroSlopeAtStart?2401:2400:r.endingStart=2402,n?r.endingEnd=this.zeroSlopeAtEnd?2401:2400:r.endingEnd=2402)}_scheduleFading(t,n,i){const r=this._mixer,s=r.time;let o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=n,a[1]=s+t,c[1]=i,this}}function Ca(e){this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}Ca.prototype=Object.assign(Object.create(Ze.prototype),{constructor:Ca,_bindAction:function(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,s=e._propertyBindings,o=e._interpolants,a=n.uuid,c=this._bindingsByRootAndName;let l=c[a];l===void 0&&(l={},c[a]=l);for(let u=0;u!==r;++u){const h=i[u],d=h.name;let f=l[d];if(f!==void 0)s[u]=f;else{if(f=s[u],f!==void 0){f._cacheIndex===null&&(++f.referenceCount,this._addInactiveBinding(f,a,d));continue}const g=t&&t._propertyBindings[u].binding.parsedPath;f=new Aa(se.create(n,d,g),h.ValueTypeName,h.getValueSize()),++f.referenceCount,this._addInactiveBinding(f,a,d),s[u]=f}o[u].resultBuffer=f.buffer}},_activateAction:function(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}},_deactivateAction:function(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}},_initMemoryManager:function(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}},_isActiveAction:function(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions},_addInactiveAction:function(e,t,n){const i=this._actions,r=this._actionsByClip;let s=r[t];if(s===void 0)s={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=s;else{const o=s.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),s.actionByRoot[n]=e},_removeInactiveAction:function(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,s=this._actionsByClip,o=s[r],a=o.knownActions,c=a[a.length-1],l=e._byClipCacheIndex;c._byClipCacheIndex=l,a[l]=c,a.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete u[h],a.length===0&&delete s[r],this._removeInactiveBindingsForAction(e)},_removeInactiveBindingsForAction:function(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}},_lendAction:function(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_takeBackAction:function(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_addInactiveBinding:function(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let s=i[t];s===void 0&&(s={},i[t]=s),s[n]=e,e._cacheIndex=r.length,r.push(e)},_removeInactiveBinding:function(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,s=this._bindingsByRootAndName,o=s[i],a=t[t.length-1],c=e._cacheIndex;a._cacheIndex=c,t[c]=a,t.pop(),delete o[r],Object.keys(o).length===0&&delete s[i]},_lendBinding:function(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_takeBackBinding:function(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r},_lendControlInterpolant:function(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Tr(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),n.__cacheIndex=t,e[t]=n),n},_takeBackControlInterpolant:function(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r},_controlInterpolantsResultBuffer:new Float32Array(1),clipAction:function(e,t,n){const i=t||this._root,r=i.uuid;let s=typeof e=="string"?Ee.findByName(i,e):e;const o=s!==null?s.uuid:e,a=this._actionsByClip[o];let c=null;if(n===void 0&&(s!==null?n=s.blendMode:n=2500),a!==void 0){const u=a.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=a.knownActions[0],s===null&&(s=c._clip)}if(s===null)return null;const l=new tf(this,s,t,n);return this._bindAction(l,c),this._addInactiveAction(l,o,r),l},existingAction:function(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?Ee.findByName(n,e):e,s=r?r.uuid:e,o=this._actionsByClip[s];return o!==void 0&&o.actionByRoot[i]||null},stopAllAction:function(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this},update:function(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),s=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,s);const o=this._bindings,a=this._nActiveBindings;for(let c=0;c!==a;++c)o[c].apply(s);return this},setTime:function(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)},getRoot:function(){return this._root},uncacheClip:function(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const s=r.knownActions;for(let o=0,a=s.length;o!==a;++o){const c=s[o];this._deactivateAction(c);const l=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=l,t[l]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}},uncacheRoot:function(e){const t=e.uuid,n=this._actionsByClip;for(const s in n){const o=n[s].actionByRoot,a=o[t];a!==void 0&&(this._deactivateAction(a),this._removeInactiveAction(a))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const s in r){const o=r[s];o.restoreOriginalState(),this._removeInactiveBinding(o)}},uncacheAction:function(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}});function Ra(e,t,n){ye.call(this,e,t),this.meshPerAttribute=n||1}Ra.prototype=Object.assign(Object.create(ye.prototype),{constructor:Ra,isInstancedInterleavedBuffer:!0,copy:function(e){return ye.prototype.copy.call(this,e),this.meshPerAttribute=e.meshPerAttribute,this},clone:function(e){const t=ye.prototype.clone.call(this,e);return t.meshPerAttribute=this.meshPerAttribute,t},toJSON:function(e){const t=ye.prototype.toJSON.call(this,e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}});function Pa(e,t,n,i,r){this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}Object.defineProperty(Pa.prototype,"needsUpdate",{set:function(e){e===!0&&this.version++}}),Object.assign(Pa.prototype,{isGLBufferAttribute:!0,setBuffer:function(e){return this.buffer=e,this},setType:function(e,t){return this.type=e,this.elementSize=t,this},setItemSize:function(e){return this.itemSize=e,this},setCount:function(e){return this.count=e,this}});function Ia(e,t,n,i){this.ray=new yi(e,t),this.near=n||0,this.far=i||1/0,this.camera=null,this.layers=new Zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}},Object.defineProperties(this.params,{PointCloud:{get:function(){return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."),this.Points}}})}function Fa(e,t){return e.distance-t.distance}function Us(e,t,n,i){if(e.layers.test(t.layers)&&e.raycast(t,n),i===!0){const r=e.children;for(let s=0,o=r.length;s<o;s++)Us(r[s],t,n,!0)}}Object.assign(Ia.prototype,{set:function(e,t){this.ray.set(e,t)},setFromCamera:function(e,t){t&&t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t&&t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)},intersectObject:function(e,t,n){const i=n||[];return Us(e,this,i,t),i.sort(Fa),i},intersectObjects:function(e,t,n){const i=n||[];if(Array.isArray(e)===!1)return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),i;for(let r=0,s=e.length;r<s;r++)Us(e[r],this,i,t);return i.sort(Fa),i}});const Da=new J;class ef{constructor(t,n){Object.defineProperty(this,"isBox2",{value:!0}),this.min=t!==void 0?t:new J(1/0,1/0),this.max=n!==void 0?n:new J(-1/0,-1/0)}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=Da.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return t===void 0&&(console.warn("THREE.Box2: .getCenter() target is now required"),t=new J),this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return t===void 0&&(console.warn("THREE.Box2: .getSize() target is now required"),t=new J),this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,n){return n===void 0&&(console.warn("THREE.Box2: .getParameter() target is now required"),n=new J),n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y)}clampPoint(t,n){return n===void 0&&(console.warn("THREE.Box2: .clampPoint() target is now required"),n=new J),n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return Da.copy(t).clamp(this.min,this.max).sub(t).length()}intersect(t){return this.min.max(t.min),this.max.min(t.max),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}function Ir(e){mt.call(this),this.material=e,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}Ir.prototype=Object.create(mt.prototype),Ir.prototype.constructor=Ir,Ir.prototype.isImmediateRenderObject=!0;const un=new E,Fr=new At,Hs=new At;class nf extends _r{constructor(t){const n=Na(t),i=new Gt,r=[],s=[],o=new lt(0,0,1),a=new lt(0,1,0);for(let l=0;l<n.length;l++){const u=n[l];u.parent&&u.parent.isBone&&(r.push(0,0,0),r.push(0,0,0),s.push(o.r,o.g,o.b),s.push(a.r,a.g,a.b))}i.setAttribute("position",new Ht(r,3)),i.setAttribute("color",new Ht(s,3));const c=new _e({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(i,c),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=t,this.bones=n,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){const n=this.bones,i=this.geometry,r=i.getAttribute("position");Hs.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<n.length;s++){const a=n[s];a.parent&&a.parent.isBone&&(Fr.multiplyMatrices(Hs,a.matrixWorld),un.setFromMatrixPosition(Fr),r.setXYZ(o,un.x,un.y,un.z),Fr.multiplyMatrices(Hs,a.parent.matrixWorld),un.setFromMatrixPosition(Fr),r.setXYZ(o+1,un.x,un.y,un.z),o+=2)}i.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}}function Na(e){const t=[];e&&e.isBone&&t.push(e);for(let n=0;n<e.children.length;n++)t.push.apply(t,Na(e.children[n]));return t}class rf extends _r{constructor(t=10,n=10,i=4473924,r=8947848){i=new lt(i),r=new lt(r);const s=n/2,o=t/n,a=t/2,c=[],l=[];for(let d=0,f=0,g=-a;d<=n;d++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const _=d===s?i:r;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}const u=new Gt;u.setAttribute("position",new Ht(c,3)),u.setAttribute("color",new Ht(l,3));const h=new _e({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}}const sf=new Float32Array(1);new Int32Array(sf.buffer);const of=new en({side:1,depthWrite:!1,depthTest:!1});new te(new as,of),dt.create=function(e,t){return console.log("THREE.Curve.create() has been deprecated"),e.prototype=Object.create(dt.prototype),e.prototype.constructor=e,e.prototype.getPoint=t,e},Object.assign(De.prototype,{fromPoints:function(e){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(e)}}),Object.create(de.prototype),Object.create(de.prototype);function Ba(e){console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."),de.call(this,e),this.type="catmullrom"}Ba.prototype=Object.create(de.prototype),Object.assign(Ba.prototype,{initFromArray:function(){console.error("THREE.Spline: .initFromArray() has been removed.")},getControlPointsArray:function(){console.error("THREE.Spline: .getControlPointsArray() has been removed.")},reparametrizeByArcLength:function(){console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")}}),rf.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")},nf.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")},Object.assign(Bt.prototype,{extractUrlBase:function(e){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),Gd.extractUrlBase(e)}}),Bt.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}},Object.assign(ef.prototype,{center:function(e){return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),this.getCenter(e)},empty:function(){return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),this.isEmpty()},isIntersectionBox:function(e){return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},size:function(e){return console.warn("THREE.Box2: .size() has been renamed to .getSize()."),this.getSize(e)}}),Object.assign(me.prototype,{center:function(e){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(e)},empty:function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()},isIntersectionBox:function(e){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},isIntersectionSphere:function(e){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(e)},size:function(e){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(e)}}),Object.assign(Ke.prototype,{empty:function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()}}),hr.prototype.setFromMatrix=function(e){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(e)},Object.assign(bt,{random16:function(){return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."),Math.random()},nearestPowerOfTwo:function(e){return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."),bt.floorPowerOfTwo(e)},nextPowerOfTwo:function(e){return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."),bt.ceilPowerOfTwo(e)}}),Object.assign(pe.prototype,{flattenToArrayOffset:function(e,t){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(e,t)},multiplyVector3:function(e){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),e.applyMatrix3(this)},multiplyVector3Array:function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")},applyToBufferAttribute:function(e){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),e.applyMatrix3(this)},applyToVector3Array:function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")},getInverse:function(e){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(e).invert()}}),Object.assign(At.prototype,{extractPosition:function(e){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(e)},flattenToArrayOffset:function(e,t){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(e,t)},getPosition:function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new E().setFromMatrixColumn(this,3)},setRotationFromQuaternion:function(e){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(e)},multiplyToArray:function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")},multiplyVector3:function(e){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},multiplyVector4:function(e){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},multiplyVector3Array:function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")},rotateAxis:function(e){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),e.transformDirection(this)},crossVector:function(e){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},translate:function(){console.error("THREE.Matrix4: .translate() has been removed.")},rotateX:function(){console.error("THREE.Matrix4: .rotateX() has been removed.")},rotateY:function(){console.error("THREE.Matrix4: .rotateY() has been removed.")},rotateZ:function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")},rotateByAxis:function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")},applyToBufferAttribute:function(e){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},applyToVector3Array:function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")},makeFrustum:function(e,t,n,i,r,s){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(e,t,i,n,r,s)},getInverse:function(e){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(e).invert()}}),Ge.prototype.isIntersectionLine=function(e){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(e)},Object.assign($t.prototype,{multiplyVector3:function(e){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),e.applyQuaternion(this)},inverse:function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()}}),Object.assign(yi.prototype,{isIntersectionBox:function(e){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},isIntersectionPlane:function(e){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(e)},isIntersectionSphere:function(e){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(e)}}),Object.assign(re.prototype,{area:function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()},barycoordFromPoint:function(e,t){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(e,t)},midpoint:function(e){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(e)},normal:function(e){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(e)},plane:function(e){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(e)}}),Object.assign(re,{barycoordFromPoint:function(e,t,n,i,r){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),re.getBarycoord(e,t,n,i,r)},normal:function(e,t,n,i){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),re.getNormal(e,t,n,i)}}),Object.assign(hi.prototype,{extractAllPoints:function(e){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(e)},extrude:function(e){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new oa(this,e)},makeGeometry:function(e){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new wd(this,e)}}),Object.assign(J.prototype,{fromAttribute:function(e,t,n){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,n)},distanceToManhattan:function(e){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(e)},lengthManhattan:function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(E.prototype,{setEulerFromRotationMatrix:function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},setEulerFromQuaternion:function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},getPositionFromMatrix:function(e){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(e)},getScaleFromMatrix:function(e){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(e)},getColumnFromMatrix:function(e,t){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(t,e)},applyProjection:function(e){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(e)},fromAttribute:function(e,t,n){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,n)},distanceToManhattan:function(e){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(e)},lengthManhattan:function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(Nt.prototype,{fromAttribute:function(e,t,n){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,n)},lengthManhattan:function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(mt.prototype,{getChildByName:function(e){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(e)},renderDepth:function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")},translate:function(e,t){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(t,e)},getWorldRotation:function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")},applyMatrix:function(e){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.defineProperties(mt.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(e){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=e}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}}),Object.assign(te.prototype,{setDrawMode:function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}),Object.defineProperties(te.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),0},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}}),Object.defineProperties(ds.prototype,{objects:{get:function(){return console.warn("THREE.LOD: .objects has been renamed to .levels."),this.levels}}}),Object.defineProperty(ms.prototype,"useVertexTexture",{get:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")},set:function(){console.warn("THREE.Skeleton: useVertexTexture has been removed.")}}),fs.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")},Object.defineProperty(dt.prototype,"__arcLengthDivisions",{get:function(){return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions},set:function(e){console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions=e}}),ee.prototype.setLens=function(e,t){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),t!==void 0&&(this.filmGauge=t),this.setFocalLength(e)},Object.defineProperties(Ut.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(e){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=e}},shadowCameraLeft:{set:function(e){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=e}},shadowCameraRight:{set:function(e){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=e}},shadowCameraTop:{set:function(e){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=e}},shadowCameraBottom:{set:function(e){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=e}},shadowCameraNear:{set:function(e){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=e}},shadowCameraFar:{set:function(e){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=e}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(e){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=e}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(e){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=e}},shadowMapHeight:{set:function(e){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=e}}}),Object.defineProperties(St.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===35048},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(35048)}}}),Object.assign(St.prototype,{setDynamic:function(e){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(e===!0?35048:35044),this},copyIndicesArray:function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},setArray:function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")}}),Object.assign(Gt.prototype,{addIndex:function(e){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(e)},addAttribute:function(e,t){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(t&&t.isBufferAttribute)&&!(t&&t.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(e,new St(arguments[1],arguments[2]))):e==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(t),this):this.setAttribute(e,t)},addDrawCall:function(e,t,n){n!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(e,t)},clearDrawCalls:function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()},computeOffsets:function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")},removeAttribute:function(e){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(e)},applyMatrix:function(e){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.defineProperties(Gt.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}}),Object.defineProperties(Rr.prototype,{maxInstancedCount:{get:function(){return console.warn("THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."),this.instanceCount},set:function(e){console.warn("THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."),this.instanceCount=e}}}),Object.defineProperties(Ia.prototype,{linePrecision:{get:function(){return console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."),this.params.Line.threshold},set:function(e){console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."),this.params.Line.threshold=e}}}),Object.defineProperties(ye.prototype,{dynamic:{get:function(){return console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."),this.usage===35048},set:function(e){console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."),this.setUsage(e)}}}),Object.assign(ye.prototype,{setDynamic:function(e){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(e===!0?35048:35044),this},setArray:function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")}}),Object.assign(oa.prototype,{getArrays:function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")},addShapeList:function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")},addShape:function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")}}),Object.assign(ed.prototype,{dispose:function(){console.error("THREE.Scene: .dispose() has been removed.")}}),Object.defineProperties(_t.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new lt}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(e){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=e===1}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(e){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=e}}}),Object.defineProperties(En.prototype,{metal:{get:function(){return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."),!1},set:function(){console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")}}}),Object.defineProperties(Sn.prototype,{transparency:{get:function(){return console.warn("THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."),this.transmission},set:function(e){console.warn("THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."),this.transmission=e}}}),Object.defineProperties(ae.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(e){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=e}}}),Object.assign(ur.prototype,{clearTarget:function(e,t,n,i){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(e),this.clear(t,n,i)},animate:function(e){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(e)},getCurrentRenderTarget:function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()},getMaxAnisotropy:function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()},getPrecision:function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision},resetGLState:function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()},supportsFloatTextures:function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")},supportsHalfFloatTextures:function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")},supportsStandardDerivatives:function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")},supportsCompressedTextureS3TC:function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")},supportsCompressedTexturePVRTC:function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")},supportsBlendMinMax:function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")},supportsVertexTextures:function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures},supportsInstancedArrays:function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")},enableScissorTest:function(e){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(e)},initMaterial:function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")},addPrePlugin:function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")},addPostPlugin:function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")},updateShadowMap:function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")},setFaceCulling:function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")},allocTextureUnit:function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")},setTexture:function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")},setTexture2D:function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")},setTextureCube:function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")},getActiveMipMapLevel:function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()}}),Object.defineProperties(ur.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(e){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=e}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(e){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=e}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(e){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=e===!0?3001:3e3}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}}),Object.defineProperties(Lo.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}}),Object.defineProperties(pi.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(e){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=e}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(e){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=e}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(e){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=e}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(e){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=e}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(e){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=e}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(e){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=e}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(e){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=e}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(e){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=e}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(e){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=e}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(e){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=e}}}),qn.prototype.updateCubeMap=function(e,t){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(e,t)},qn.prototype.clear=function(e,t,n,i){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(e,t,n,i)},Fn.crossOrigin=void 0,Fn.loadTexture=function(e,t,n,i){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");const r=new Ls;r.setCrossOrigin(this.crossOrigin);const s=r.load(e,n,void 0,i);return t&&(s.mapping=t),s},Fn.loadTextureCube=function(e,t,n,i){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");const r=new As;r.setCrossOrigin(this.crossOrigin);const s=r.load(e,n,void 0,i);return t&&(s.mapping=t),s},Fn.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")},Fn.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ws}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ws);const af=function(){var e=.5*(Math.sqrt(3)-1),t=(3-Math.sqrt(3))/6,n=1/3,i=1/6,r=(Math.sqrt(5)-1)/4,s=(5-Math.sqrt(5))/20;function o(u){var h;typeof u=="function"?h=u:u?h=c(u):h=Math.random,this.p=a(h),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var d=0;d<512;d++)this.perm[d]=this.p[d&255],this.permMod12[d]=this.perm[d]%12}o.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(u,h){var d=this.permMod12,f=this.perm,g=this.grad3,_=0,y=0,m=0,p=(u+h)*e,v=Math.floor(u+p),w=Math.floor(h+p),b=(v+w)*t,x=v-b,M=w-b,P=u-x,C=h-M,I,N;P>C?(I=1,N=0):(I=0,N=1);var O=P-I+t,F=C-N+t,L=P-1+2*t,R=C-1+2*t,B=v&255,G=w&255,H=.5-P*P-C*C;if(H>=0){var W=d[B+f[G]]*3;H*=H,_=H*H*(g[W]*P+g[W+1]*C)}var Y=.5-O*O-F*F;if(Y>=0){var K=d[B+I+f[G+N]]*3;Y*=Y,y=Y*Y*(g[K]*O+g[K+1]*F)}var ot=.5-L*L-R*R;if(ot>=0){var ft=d[B+1+f[G+1]]*3;ot*=ot,m=ot*ot*(g[ft]*L+g[ft+1]*R)}return 70*(_+y+m)},noise3D:function(u,h,d){var f=this.permMod12,g=this.perm,_=this.grad3,y,m,p,v,w=(u+h+d)*n,b=Math.floor(u+w),x=Math.floor(h+w),M=Math.floor(d+w),P=(b+x+M)*i,C=b-P,I=x-P,N=M-P,O=u-C,F=h-I,L=d-N,R,B,G,H,W,Y;O>=F?F>=L?(R=1,B=0,G=0,H=1,W=1,Y=0):O>=L?(R=1,B=0,G=0,H=1,W=0,Y=1):(R=0,B=0,G=1,H=1,W=0,Y=1):F<L?(R=0,B=0,G=1,H=0,W=1,Y=1):O<L?(R=0,B=1,G=0,H=0,W=1,Y=1):(R=0,B=1,G=0,H=1,W=1,Y=0);var K=O-R+i,ot=F-B+i,ft=L-G+i,It=O-H+2*i,k=F-W+2*i,Vt=L-Y+2*i,gt=O-1+3*i,wt=F-1+3*i,yt=L-1+3*i,Lt=b&255,vt=x&255,X=M&255,Q=.6-O*O-F*F-L*L;if(Q<0)y=0;else{var $=f[Lt+g[vt+g[X]]]*3;Q*=Q,y=Q*Q*(_[$]*O+_[$+1]*F+_[$+2]*L)}var at=.6-K*K-ot*ot-ft*ft;if(at<0)m=0;else{var et=f[Lt+R+g[vt+B+g[X+G]]]*3;at*=at,m=at*at*(_[et]*K+_[et+1]*ot+_[et+2]*ft)}var A=.6-It*It-k*k-Vt*Vt;if(A<0)p=0;else{var S=f[Lt+H+g[vt+W+g[X+Y]]]*3;A*=A,p=A*A*(_[S]*It+_[S+1]*k+_[S+2]*Vt)}var q=.6-gt*gt-wt*wt-yt*yt;if(q<0)v=0;else{var j=f[Lt+1+g[vt+1+g[X+1]]]*3;q*=q,v=q*q*(_[j]*gt+_[j+1]*wt+_[j+2]*yt)}return 32*(y+m+p+v)},noise4D:function(u,h,d,f){var g=this.perm,_=this.grad4,y,m,p,v,w,b=(u+h+d+f)*r,x=Math.floor(u+b),M=Math.floor(h+b),P=Math.floor(d+b),C=Math.floor(f+b),I=(x+M+P+C)*s,N=x-I,O=M-I,F=P-I,L=C-I,R=u-N,B=h-O,G=d-F,H=f-L,W=0,Y=0,K=0,ot=0;R>B?W++:Y++,R>G?W++:K++,R>H?W++:ot++,B>G?Y++:K++,B>H?Y++:ot++,G>H?K++:ot++;var ft,It,k,Vt,gt,wt,yt,Lt,vt,X,Q,$;ft=W>=3?1:0,It=Y>=3?1:0,k=K>=3?1:0,Vt=ot>=3?1:0,gt=W>=2?1:0,wt=Y>=2?1:0,yt=K>=2?1:0,Lt=ot>=2?1:0,vt=W>=1?1:0,X=Y>=1?1:0,Q=K>=1?1:0,$=ot>=1?1:0;var at=R-ft+s,et=B-It+s,A=G-k+s,S=H-Vt+s,q=R-gt+2*s,j=B-wt+2*s,D=G-yt+2*s,Z=H-Lt+2*s,it=R-vt+3*s,ht=B-X+3*s,tt=G-Q+3*s,ct=H-$+3*s,ut=R-1+4*s,xt=B-1+4*s,st=G-1+4*s,pt=H-1+4*s,Ft=x&255,Yt=M&255,dn=P&255,An=C&255,fn=.6-R*R-B*B-G*G-H*H;if(fn<0)y=0;else{var ui=g[Ft+g[Yt+g[dn+g[An]]]]%32*4;fn*=fn,y=fn*fn*(_[ui]*R+_[ui+1]*B+_[ui+2]*G+_[ui+3]*H)}var Xe=.6-at*at-et*et-A*A-S*S;if(Xe<0)m=0;else{var di=g[Ft+ft+g[Yt+It+g[dn+k+g[An+Vt]]]]%32*4;Xe*=Xe,m=Xe*Xe*(_[di]*at+_[di+1]*et+_[di+2]*A+_[di+3]*S)}var Ae=.6-q*q-j*j-D*D-Z*Z;if(Ae<0)p=0;else{var Ln=g[Ft+gt+g[Yt+wt+g[dn+yt+g[An+Lt]]]]%32*4;Ae*=Ae,p=Ae*Ae*(_[Ln]*q+_[Ln+1]*j+_[Ln+2]*D+_[Ln+3]*Z)}var pn=.6-it*it-ht*ht-tt*tt-ct*ct;if(pn<0)v=0;else{var Cn=g[Ft+vt+g[Yt+X+g[dn+Q+g[An+$]]]]%32*4;pn*=pn,v=pn*pn*(_[Cn]*it+_[Cn+1]*ht+_[Cn+2]*tt+_[Cn+3]*ct)}var oe=.6-ut*ut-xt*xt-st*st-pt*pt;if(oe<0)w=0;else{var Rn=g[Ft+1+g[Yt+1+g[dn+1+g[An+1]]]]%32*4;oe*=oe,w=oe*oe*(_[Rn]*ut+_[Rn+1]*xt+_[Rn+2]*st+_[Rn+3]*pt)}return 27*(y+m+p+v+w)}};function a(u){var h,d=new Uint8Array(256);for(h=0;h<256;h++)d[h]=h;for(h=0;h<255;h++){var f=h+~~(u()*(256-h)),g=d[h];d[h]=d[f],d[f]=g}return d}o._buildPermutationTable=a;function c(){var u=0,h=0,d=0,f=1,g=l();u=g(" "),h=g(" "),d=g(" ");for(var _=0;_<arguments.length;_++)u-=g(arguments[_]),u<0&&(u+=1),h-=g(arguments[_]),h<0&&(h+=1),d-=g(arguments[_]),d<0&&(d+=1);return g=null,function(){var y=2091639*u+f*23283064365386963e-26;return u=h,h=d,d=y-(f=y|0)}}function l(){var u=4022871197;return function(h){h=h.toString();for(var d=0;d<h.length;d++){u+=h.charCodeAt(d);var f=.02519603282416938*u;u=f>>>0,f-=u,f*=u,u=f>>>0,f-=u,u+=f*4294967296}return(u>>>0)*23283064365386963e-26}}return{SimplexNoise:o}}(),qt=function(){class e{constructor(n){this.params_=n,this._Init()}_Init(){this._noise=new af.SimplexNoise(this.params_.seed)}Get(n,i,r){const s=2**-this.params_.persistence,o=n/this.params_.scale,a=i/this.params_.scale,c=r/this.params_.scale,l=this._noise;let u=1,h=1,d=0,f=0;for(let g=0;g<this.params_.octaves;g++){let _=l.noise3D(o*h,a*h,c*h);f+=_*u,d+=u,u*=s,h*=this.params_.lacunarity}if(f/=d,this.params_.ridged?f=1-Math.abs(f):f=f*.5+.5,f=Math.pow(f,this.params_.exponentiation),this.params_.range){const g=this.params_.range;f=g[0]+(g[1]-g[0])*f}return f*this.params_.height}}return{Noise:e}}(),be=function(){return{rand_range:function(e,t){return Math.random()*(t-e)+e},rand_normalish:function(){return(Math.random()+Math.random()+Math.random()+Math.random())/4*2-1},rand_int:function(e,t){return Math.round(Math.random()*(t-e)+e)},lerp:function(e,t,n){return e*(n-t)+t},smoothstep:function(e,t,n){return e=e*e*(3-2*e),e*(n-t)+t},smootherstep:function(e,t,n){return e=e*e*e*(e*(e*6-15)+10),e*(n-t)+t},clamp:function(e,t,n){return Math.min(Math.max(e,t),n)},sat:function(e){return Math.min(Math.max(e,0),1)},in_range:(e,t,n)=>e>=t&&e<=n}}(),ks=(()=>{function e(b,x,M,P,C){const I=M.clone().sub(x),N=b.clone().sub(x),O=C-P,F=I.dot(I),L=N.dot(N),R=N.dot(I)/F,B=Math.sqrt(L-R*R*F),G=Math.max(0,B-(R<.5?P:C)),H=Math.abs(R-.5)-.5,W=O*O+F,Y=be.sat((O*(B-P)+R*F)/W),K=B-P-Y*O,ot=R-Y;return(K<0&&H<0?-1:1)*Math.sqrt(Math.min(G*G+H*H*F,K*K+ot*ot*F))}function t(b,x){return b.length()-x}const n=new E,i=new me,r=new me,s=new me,o=new Ke,a=new $t,c=new $t,l=new $t,u=new E(1,0,0),h=new E(0,1,0),d=new E(0,0,1),f=new E;class g{constructor(x){this.sdfs_=[],this.pos_=x.clone(),this.aabb_=new me(this.pos_.clone(),this.pos_.clone())}get AABB(){return this.aabb_}AddSphere(x,M,P){o.set(this.pos_.clone(),P),o.translate(M),o.getBoundingBox(i),this.aabb_.union(i);const C=M.clone();this.sdfs_.push(I=>(n.copy(I),n.sub(C),n.sub(this.pos_),t(n,P)<0?x:null))}AddCappedCone(x,M,P,C,I,N){o.set(P.clone(),I),o.getBoundingBox(r),o.set(C.clone(),N),o.getBoundingBox(s),i.makeEmpty(),i.union(r),i.union(s),i.translate(M),i.translate(this.pos_),this.aabb_.union(i);const O=P.clone(),F=C.clone(),L=M.clone();this.sdfs_.push(R=>(n.copy(R),n.sub(L),n.sub(this.pos_),e(n,O,F,I,N)<0?x:null))}Evaluate(x){for(let M=0;M<this.sdfs_.length;++M){const P=this.sdfs_[M](x);if(P)return P}return null}}const _=new qt.Noise({seed:7,octaves:1,scale:1,persistence:.5,lacunarity:2,exponentiation:1,height:1});function y(b,x,M,P){const C=new g(new E(b,x,M));return C.AddSphere("stone",new E,P),C}function m(b,x,M){const P=new g(new E(b,x,M));return P.AddCappedCone("tree_bark",new E,new E,new E(0,20,0),5,5),P}function p(b,x,M){const I=new E(5,15,0),N=new E(-6,0,1),O=new E(9,0,-7),F=new E(8,0,6),L=4,R=_.Get(b,9,M)*2*Math.PI;a.setFromAxisAngle(h,R),I.applyQuaternion(a),N.applyQuaternion(a),O.applyQuaternion(a),F.applyQuaternion(a);const B=new g(new E(b,x,M));return B.AddCappedCone("tree_bark",new E,new E(0,-2,0),I,3,.5),B.AddCappedCone("tree_bark",new E,new E(0,4,0),N,1,1),B.AddCappedCone("tree_bark",new E,new E(0,4,0),O,2,1),B.AddCappedCone("tree_bark",new E,new E(0,4,0),F,2,1),B.AddSphere("tree_leaves",I,L),B}function v(b,x,M){let P=100;_.Get(b,1,M)*20+20,_.Get(b,2,M)*5+4;const C=new g(new E(b,x,M)),I=(.01+_.Get(b,P++,M)*.02)*2*Math.PI,N=_.Get(b,P++,M)*2*Math.PI,O=(F,L,R,B,G)=>{if(R=Math.max(R,1),G>6){a.copy(B),n.set(0,5,0),n.applyQuaternion(B),n.add(F),C.AddSphere("tree_leaves",n,5);return}const H=new E(0,L,0),W=(.03+_.Get(b,P++,M)*.08)*2*Math.PI,Y=(.25+_.Get(b,P++,M)*.25)*2*Math.PI;H.applyQuaternion(B),H.add(F),C.AddCappedCone("tree_bark",f,F,H,R,R*.6),c.setFromAxisAngle(u,W),l.setFromAxisAngle(h,Y),a.copy(B),a.multiply(l),a.multiply(c),O(H.clone(),L*.6,R*.6,a.clone(),G+1);const K=_.Get(b,P++,M)*.01*2*Math.PI,ot=_.Get(b,P++,M)*.25*2*Math.PI;c.setFromAxisAngle(u,-(W+K)),l.setFromAxisAngle(h,-(Y+ot)),a.copy(B),a.multiply(l),a.multiply(c),O(H.clone(),L*.6,R*.6,a.clone(),G+1)};return c.setFromAxisAngle(u,I),l.setFromAxisAngle(h,N),a.copy(l),a.multiply(c),O(new E(0,-5,0),20,5,a.clone(),1),C.AddCappedCone("tree_bark",new E,new E(0,3,0),new E(12,-1,0),2,1),C.AddCappedCone("tree_bark",new E,new E(0,4,0),new E(-8,-1,-11),2,1),C.AddCappedCone("tree_bark",new E,new E(0,2,0),new E(-13,-1,-4),2,1),C}function w(b,x,M){let P=100;const C=new g(new E(b,x,M)),I=(.01+_.Get(b,P++,M)*.02)*2*Math.PI,N=_.Get(b,P++,M)*2*Math.PI,O=(L,R,B,G,H)=>{if(H>7)return;const W=new E(4,0,0),Y=-.075*2*Math.PI;W.applyQuaternion(G),W.add(L),C.AddCappedCone("tree_leaves",f,L,W,B,B),c.setFromAxisAngle(d,Y),a.copy(G),a.multiply(c),O(W.clone(),R,B,a.clone(),H+1)},F=(L,R,B,G,H)=>{if(B=Math.max(B,1),H>3){O(L,R,1,new $t,H),l.setFromAxisAngle(h,.33*2*Math.PI),O(L,R,1,l.clone(),H),l.setFromAxisAngle(h,.66*2*Math.PI),O(L,R,1,l.clone(),H);return}const W=new E(0,R,0),Y=(.05+_.Get(b,P++,M)*.02)*2*Math.PI;W.applyQuaternion(G),W.add(L),C.AddCappedCone("tree_bark",f,L,W,B,B*.6),c.setFromAxisAngle(u,Y),a.copy(G),a.multiply(c),F(W.clone(),R*.75,B*.75,a.clone(),H+1)};return c.setFromAxisAngle(u,I),l.setFromAxisAngle(h,N),a.copy(l),a.multiply(c),F(new E(0,-5,0),15,2,a.clone(),1),C}return{TREE1:p,TREE2:v,PALM_TREE1:w,SPHERE:y,CONE1:m}})(),cf=(()=>({enabled:!1,foliageEnabled:!0,hardcodedFoliageEnabled:!1,introEnabled:!1,skipOceans:!1,skipClouds:!1,skipFoliageNoise:!1,skipPruning:!1,skipExteriorBlocks:!1,skipAO:!1,skipVariableLuminance:!1,skipGravity:!1,useFlatTerrain:!1,showTools:!0,fixedTerrainOrigin:!1,PLAYER_POS:[-1826.1306923527645,27.940844444445403,-220.6986696117536],PLAYER_ROT:[-.0380279893805328,.3364980691628503,.013601301436886065,.9408176901358577],CAMERA_POS:[0,0],CAMERA_DECCELERATION:[-10,0,-10],INTRO_RATE:5e-4,WORLD_BLOCK_SIZE:16,WORLD_SIZE:24}))(),lf=(()=>{const t=Math.floor(6.4),n=t+4,i=Math.floor(128*.7);new lt(8421631),new lt(16777088),new lt(16777215),new lt(4210752),new lt(4259648);function r(_,y){return _<t||_<n?"sand":_>i?"snow":"grass"}new qt.Noise({seed:6,octaves:1,scale:128,persistence:.5,lacunarity:2,exponentiation:4,height:32}),new E;class s{constructor(y){this.params_=y,this.N_Moon_=new qt.Noise({seed:4,octaves:5,scale:1024,persistence:.5,lacunarity:2,exponentiation:4,height:1}),this.N_Craters_=new qt.Noise({seed:7,octaves:1,scale:.99,persistence:.5,lacunarity:2,exponentiation:1,height:1}),this.InitCraters_()}InitCraters_(){this.craters_=[];for(let y=-this.params_.dimensions.x*10;y<=this.params_.dimensions.x*10;y+=8)for(let m=-this.params_.dimensions.z*10;m<=this.params_.dimensions.z*10;m+=8){const p=y+this.params_.offset.x,v=m+this.params_.offset.z;if(this.N_Craters_.Get(p,0,v)>.95){const b=Math.min(this.N_Craters_.Get(p,1,v)**4*100,50)+4;this.craters_.push([new E(p,0,v),b])}}}Get(y,m){const p=this.N_Moon_.Get(y,m,10),v=this.N_Moon_.Get(y,m,20);let b=Math.round(this.N_Moon_.Get(y+p,m+v,0)*64);for(let x=0;x<this.craters_.length;++x){const M=new E(y,0,m),[P,C]=this.craters_[x],I=P.distanceTo(M),N=C;if(I<N*2){const O=C/4,F=Math.abs(I-(N-O)),R=1-be.sat(F/O)**.5,B=C/10,G=1-be.sat((I-(N-O*2))/O)**2;b+=R*B+G*-(B*2)}}return["moon",Math.round(b)]}}class o{constructor(y){this.params_=y,this.moon_=new s(y),this.grass_=new l(y),this.sand_=new c(y),this.rocky_=new a(y),this.N_Height_=new qt.Noise({seed:100,octaves:1,scale:4096,persistence:.5,lacunarity:2,exponentiation:1,height:32}),this.N_Roll_=new qt.Noise({seed:200,octaves:1,scale:8,persistence:.5,lacunarity:2,exponentiation:1,height:1}),this.N_=new qt.Noise({seed:4,octaves:.99,scale:1,persistence:.5,lacunarity:2,exponentiation:1,height:4}),this.N_Types_=new qt.Noise({seed:8,octaves:.99,scale:1,persistence:.5,lacunarity:2,exponentiation:1,height:4})}Biome_(y,m,p,v){const w=be.smootherstep(v,0,1),b=be.smootherstep(p/128,0,1),x=["sand",0],M=this.moon_.Get(y,m),P=["grass",0],C=["stone",0],I=be.lerp(w,x[1],P[1]),N=be.lerp(w,M[1],C[1]),O=be.lerp(b,I,N),F=w<.5?x[0]:P[0],L=w<.5?M[0]:C[0];return[b<.5?F:L,Math.floor(O)]}Get2(y,m){const p=this.N_Height_.Get(y,0,m),v=Math.floor(p),w=this.N_Moisture_.Get(y,0,m);return this.Biome_(y,m,v,w)}ChooseTerrainType_(y,m){const v=[Math.floor(y/1024),Math.floor(m/1024)],w=[v[0]*1024,v[1]*1024],b=[Math.round(this.N_.Get(v[0],0,v[1])*1024),Math.round(this.N_.Get(v[0],1,v[1])*1024)];b[0]=w[0]+1024*.5,b[1]=w[1]+1024*.5;const x=((y-b[0])**2+(m-b[1])**2)**.5,M=be.sat((x-1024*.25)/(1024*.25)),P=Math.round(this.N_Types_.Get(v[0],0,v[1]));let C=null;P==0?C=this.rocky_.Get(y,m):P==1?C=this.sand_.Get(y,m):P==2?C=this.grass_.Get(y,m):P==3?C=["snow",15]:P==4&&(C=this.moon_.Get(y,m)),C[1]=be.lerp(be.smootherstep(M,0,1),C[1],0);const I=this.N_Roll_.Get(y,2,m);return be.sat((x-1024*.375)/(1024*.125))>I&&(C[0]="grass"),C[1]<t&&(C[0]="sand"),C}Get(y,m){const p=this.ChooseTerrainType_(y,m);return p[1]=Math.round(p[1]),p}}class a{constructor(y){this.params_=y,this.N_Terrain_=new qt.Noise({seed:9,octaves:6,scale:500.005,persistence:.5,lacunarity:2,exponentiation:6,height:64,ridged:!0}),this.N_Roll_=new qt.Noise({seed:200,octaves:2,scale:8,persistence:.5,lacunarity:2,exponentiation:1,height:1}),this.N_Height_=new qt.Noise({seed:100,octaves:1,scale:64,persistence:.5,lacunarity:2,exponentiation:1,height:1,range:[.25,1]})}Get(y,m){const p=this.N_Terrain_.Get(y,0,m)*this.N_Height_.Get(y,0,m),v=Math.floor(p),w=this.N_Roll_.Get(y,0,m),b=v/32;let x="stone";return w>b&&(x="dirt"),[x,v]}}class c{constructor(y){this.params_=y,this.N_Terrain_=new qt.Noise({seed:4,octaves:4,scale:500.005,persistence:.5,lacunarity:2,exponentiation:6,height:1,range:[-1,1]}),this.N_Height_=new qt.Noise({seed:4,octaves:3,scale:500.005,persistence:.5,lacunarity:2,exponentiation:1,height:64})}Get(y,m){const p=[this.N_Terrain_.Get(y,0,m),this.N_Terrain_.Get(y,1,m)],v=this.N_Height_.Get(y+p[0],0,m+p[1]);return["sand",Math.floor(v)]}}class l{constructor(y){this.params_=y,this.N_Terrain_=new qt.Noise({seed:4,octaves:6,scale:4096,persistence:.5,lacunarity:2,exponentiation:6,height:1}),this.N_Height_=new qt.Noise({seed:4,octaves:3,scale:4096,persistence:.5,lacunarity:2,exponentiation:1,height:512}),this.N_Plateaus_=new qt.Noise({seed:5,octaves:4,scale:512,persistence:.5,lacunarity:2,exponentiation:2,height:1}),this.N_PlateausNum_=new qt.Noise({seed:6,octaves:4,scale:1024,persistence:.5,lacunarity:2,exponentiation:1,height:20}),this.N_Moisture_=new qt.Noise({seed:3,octaves:3,scale:512,persistence:.5,lacunarity:2,exponentiation:4,height:1})}Get(y,m){const p=this.N_Terrain_.Get(y,m,0),v=this.N_Height_.Get(y,m,0);let w=v*p;if(this.N_Plateaus_.Get(y,m,0)>.25){const x=Math.round(10+this.N_PlateausNum_.Get(y,m,0)),M=Math.round(v/x);w=Math.round(w/M)*M}const b=Math.floor(w);return this.N_Moisture_.Get(y,m,0),[r(b),b]}}const u=new qt.Noise({seed:10,octaves:1,scale:.99,persistence:.5,lacunarity:2,exponentiation:4,height:1}),h=new qt.Noise({seed:11,octaves:4,scale:2.01,persistence:.5,lacunarity:2,exponentiation:1,height:1}),d=new qt.Noise({seed:7,octaves:1,scale:.99,persistence:.5,lacunarity:2,exponentiation:1,height:1});class f{constructor(){this.sdfs_=[]}Add(y){this.sdfs_.push(y)}Intersects(y){for(let m=0;m<this.sdfs_.length;++m)if(this.sdfs_[m].AABB.intersectsBox(y))return!0;return!1}Evaluate(y,m,p){const v=new E(y,m,p);for(let w=0;w<this.sdfs_.length;++w){const b=this.sdfs_[w];if(b.AABB.containsPoint(v)){const x=b.Evaluate(v);if(x)return x}}}}class g{constructor(){this.Create_()}Create_(){const y=new yn(1,1);y.rotateY(Math.PI/2),y.translate(.5,0,0);const m=new yn(1,1);m.rotateY(-Math.PI/2),m.translate(-.5,0,0);const p=new yn(1,1);p.rotateX(-Math.PI/2),p.translate(0,.5,0);const v=new yn(1,1);v.rotateX(Math.PI/2),v.translate(0,-.5,0);const w=new yn(1,1);w.translate(0,0,.5);const b=new yn(1,1);b.rotateY(Math.PI),b.translate(0,0,-.5);const x=[y,m,w,b];for(let M of x)for(let P=0;P<M.attributes.uv.array.length;P+=2)M.attributes.uv.array[P+1]=1-M.attributes.uv.array[P+1];this.geometries_=[y,m,p,v,w,b]}Init(y){this.params_=y,this.params_.offset=new E(...y.offset),this.params_.dimensions=new E(...y.dimensions),this.terrainGenerator_=new o(y)}GenerateNoise_(y,m){return this.terrainGenerator_.Get(y,m)}Key_(y,m,p){return y+"."+m+"."+p}PruneHiddenVoxels_(y){const m={};for(let p in y){const v=y[p],w=this.Key_(v.position[0]+1,v.position[1],v.position[2]),b=this.Key_(v.position[0]-1,v.position[1],v.position[2]),x=this.Key_(v.position[0],v.position[1]+1,v.position[2]),M=this.Key_(v.position[0],v.position[1]-1,v.position[2]),P=this.Key_(v.position[0],v.position[1],v.position[2]+1),C=this.Key_(v.position[0],v.position[1],v.position[2]-1),I=[w,b,x,M,P,C];let N=!1;for(let O=0;O<6;++O){const F=I[O]in y;v.facesHidden[O]=F,F||(N=!0)}N&&(m[p]=v)}return m}CreateFoliageSDFs_(){const y=new f;for(let m=-this.params_.dimensions.x*4;m<this.params_.dimensions.x*4;m+=16)for(let p=-this.params_.dimensions.z*4;p<this.params_.dimensions.z*4;p+=16){const v=m+this.params_.offset.x,w=p+this.params_.offset.z;if(d.Get(v,0,w)>.8){const[x,M]=this.GenerateNoise_(v,w),P=M;if(P<=t)continue;if(x=="grass"){let C=ks.TREE1;d.Get(v,1,w)<.15&&(C=ks.TREE2),y.Add(C(v,P,w))}else if(x=="sand"){let C=ks.PALM_TREE1;y.Add(C(v,P,w))}}}return y}CreateTerrain_(){const y={},v=this.params_.dimensions.x+1,w=this.params_.dimensions.x+1;for(let b=-1;b<v;b++)for(let x=-1;x<w;x++){const M=b+this.params_.offset.x,P=x+this.params_.offset.z,[C,I]=this.GenerateNoise_(M,P),N=I,O=this.Key_(M,N,P);y[O]={position:[M,N,P],type:C,visible:!0,facesHidden:[!1,!1,!1,!1,!1],ao:[null,null,null,null,null,null]};let F=I;for(let L=-1;L<=1;L++)for(let R=-1;R<=1;R++){const[B,G]=this.GenerateNoise_(M+L,P+R);F=Math.min(G,F)}if(F<I)for(let L=F+1;L<I;L++){const R=this.Key_(M,L,P);y[R]={position:[M,L,P],type:C,visible:!0,facesHidden:[!1,!1,!1,!1,!1],ao:[null,null,null,null,null,null]},(C=="grass"||C=="snow")&&(y[R].type="dirt")}}return y}ApplySDFsToVoxels_(y,m){const p=this.params_.offset.clone(),v=this.params_.offset.clone().add(this.params_.dimensions),w=new me(p,v);y.Intersects(w);for(let b=-1;b<this.params_.dimensions.x+1;b++)for(let x=-1;x<this.params_.dimensions.z+1;x++){const M=b+this.params_.offset.x,P=x+this.params_.offset.z,[C,I]=this.GenerateNoise_(M,P);for(let N=0;N<100;N++){const O=I+N,F=this.Key_(M,O,P);if(F in m)continue;const L=y.Evaluate(M,O,P);if(L){let R=0;L=="tree_leaves"&&!cf.skipFoliageNoise&&(R=d.Get(M,O,P)),R<.7&&(m[F]={position:[M,O,P],type:L,visible:!0,facesHidden:[!1,!1,!1,!1,!1],ao:[null,null,null,null,null,null]})}}}}CreateOcean_(y){const m={};for(let p=-1;p<this.params_.dimensions.x+1;p++)for(let v=-1;v<this.params_.dimensions.z+1;v++){const w=p+this.params_.offset.x,b=v+this.params_.offset.z,[x,M]=this.GenerateNoise_(w,b);if(M<t){const P=this.Key_(w,t,b);m[P]={position:[w,t,b],type:"ocean",visible:!0,facesHidden:[!1,!1,!1,!1,!1],ao:[null,null,null,null,null,null]}}}return m}BuildAO_(y){for(let m in y){const p=y[m],v=(w,b,x)=>this.Key_(p.position[0]+w,p.position[1]+b,p.position[2]+x)in y?.75:1;p.facesHidden[0]||(p.ao[0]=[v(1,0,1)*v(1,1,0)*v(1,1,1),v(1,0,-1)*v(1,1,0)*v(1,1,-1),v(1,0,1)*v(1,-1,0)*v(1,-1,1),v(1,0,-1)*v(1,-1,0)*v(1,-1,-1)]),p.facesHidden[1]||(p.ao[1]=[v(-1,0,-1)*v(-1,1,0)*v(-1,1,-1),v(-1,0,1)*v(-1,1,0)*v(-1,1,1),v(-1,0,-1)*v(-1,-1,0)*v(-1,-1,-1),v(-1,0,1)*v(-1,-1,0)*v(-1,-1,1)]),p.facesHidden[2]||(p.ao[2]=[v(0,1,-1)*v(-1,1,0)*v(-1,1,-1),v(0,1,-1)*v(1,1,0)*v(1,1,-1),v(0,1,1)*v(-1,1,0)*v(-1,1,1),v(0,1,1)*v(1,1,0)*v(1,1,1)]),p.facesHidden[3]||(p.ao[3]=[v(0,-1,1)*v(-1,-1,0)*v(-1,-1,1),v(0,-1,1)*v(1,-1,0)*v(1,-1,1),v(0,-1,-1)*v(-1,-1,0)*v(-1,-1,-1),v(0,-1,-1)*v(1,-1,0)*v(1,-1,-1)]),p.facesHidden[4]||(p.ao[4]=[v(-1,0,1)*v(0,1,1)*v(-1,1,1),v(1,0,1)*v(0,1,1)*v(1,1,1),v(-1,0,1)*v(0,-1,1)*v(-1,-1,1),v(1,0,1)*v(0,-1,1)*v(1,-1,1)]),p.facesHidden[5]||(p.ao[5]=[v(1,0,-1)*v(0,1,-1)*v(1,1,-1),v(-1,0,-1)*v(0,1,-1)*v(-1,1,-1),v(1,0,-1)*v(0,-1,-1)*v(1,-1,-1),v(-1,0,-1)*v(0,-1,-1)*v(-1,-1,-1)])}return y}ApplyFadeIn_(y){if(this.params_.currentTime<0||this.params_.currentTime>1)return;const m=this.params_.currentTime**2,p=m,w=m+.1-p,b=[];for(let x in y){const M=y[x],P=h.Get(...M.position),I=((M.position[1]+50)/250-p)/w;P<I&&b.push(x)}for(let x=0;x<b.length;++x)delete y[b[x]]}RemoveExteriorVoxels_(y){const m=[],p=this.params_.offset.x,v=this.params_.offset.z,w=this.params_.offset.x+this.params_.dimensions.x,b=this.params_.offset.z+this.params_.dimensions.z;for(let x in y){const M=y[x];(M.position[0]<p||M.position[0]>=w||M.position[2]<v||M.position[2]>=b)&&m.push(x)}for(let x=0;x<m.length;++x)delete y[m[x]]}MergeCustomVoxels_(y){const m=this.params_.customVoxels,p=[];for(let v in m){const w=m[v];w.visible?(w.facesHidden=[!1,!1,!1,!1,!1],w.ao=[null,null,null,null,null,null]):p.push(v)}Object.assign(y,m);for(let v=0;v<p.length;++v)delete y[p[v]]}RemoveVoxelAndFill_(y,m){const p=this.Key_(...y),v={};v[p]={position:[...y],visible:!1};const[w,b]=this.GenerateNoise_(y[0],y[2]);if(y[1]<=b)for(let x=-1;x<=1;x++)for(let M=-1;M<=1;M++)for(let P=-1;P<=1;P++){const C=y[0]+x,I=y[1]+M,N=y[2]+P,[O,F]=this.GenerateNoise_(C,N),L=this.Key_(C,I,N);if(!(L in m)&&I<F){let R="dirt";O=="sand"&&(R="sand"),I<F-2&&(R="stone"),O=="moon"&&(R="moon"),v[L]={position:[C,I,N],type:R,visible:!0}}}return v}Rebuild(){const y=this.CreateTerrain_(),m=this.CreateFoliageSDFs_();this.ApplySDFsToVoxels_(m,y);const p=this.CreateOcean_(y);this.ApplyFadeIn_(p),this.ApplyFadeIn_(y);const v=this.PruneHiddenVoxels_(y),w=this.PruneHiddenVoxels_(p);this.BuildAO_(v);const b=Object.assign({},w,v);this.RemoveExteriorVoxels_(b);const x=this.BuildMeshDataFromVoxels_(b),M=Object.assign({},y,p);this.RemoveExteriorVoxels_(M);for(let P in M){const C=M[P];M[P]={type:C.type,position:C.position,visible:C.visible}}return x.voxels=M,x}PartialRebuild(y,m){const p=Object.assign({},y,m),v=[];for(let x in p){const M=p[x];M.visible?(M.facesHidden=[!1,!1,!1,!1,!1],M.ao=[null,null,null,null,null,null]):v.push(x)}for(let x=0;x<v.length;++x)delete p[v[x]];const w=this.PruneHiddenVoxels_(p);this.BuildAO_(w),this.RemoveExteriorVoxels_(w);const b=this.BuildMeshDataFromVoxels_(w);return b.voxels=y,b}BuildMeshDataFromVoxels_(y){const m={};m.opaque={positions:[],uvs:[],uvSlices:[],normals:[],indices:[],colours:[]},m.transparent={positions:[],uvs:[],uvSlices:[],normals:[],indices:[],colours:[]};for(let b in y){const x=y[b];for(let M=0;M<6;++M){if(x.facesHidden[M])continue;const P=x.type=="ocean"?m.transparent:m.opaque,C=P.positions.length/3,I=[...this.geometries_[M].attributes.position.array];for(let F=0;F<3;++F)for(let L=0;L<4;++L)I[L*3+F]+=x.position[F];P.positions.push(...I),P.uvs.push(...this.geometries_[M].attributes.uv.array),P.normals.push(...this.geometries_[M].attributes.normal.array);const N=u.Get(...x.position)*.1+.9;for(let F=0;F<4;++F){P.uvSlices.push(this.params_.blockTypes[x.type].textures[M]);const L=new lt(16777215);L.multiplyScalar(N),x.ao[M]&&L.multiplyScalar(x.ao[M][F]),L.convertSRGBToLinear(),P.colours.push(L.r,L.g,L.b)}const O=[...this.geometries_[M].index.array];for(let F=0;F<O.length;++F)O[F]+=C;P.indices.push(...O)}}const p=4,v=4,w={};for(let b in m){const x=new Float32Array(new ArrayBuffer(p*m[b].positions.length)),M=new Float32Array(new ArrayBuffer(p*m[b].normals.length)),P=new Float32Array(new ArrayBuffer(p*m[b].uvs.length)),C=new Float32Array(new ArrayBuffer(p*m[b].uvSlices.length)),I=new Float32Array(new ArrayBuffer(p*m[b].colours.length)),N=new Uint32Array(new ArrayBuffer(v*m[b].indices.length));x.set(m[b].positions,0),M.set(m[b].normals,0),P.set(m[b].uvs,0),C.set(m[b].uvSlices,0),I.set(m[b].colours,0),N.set(m[b].indices,0),w[b]={positions:x,uvs:P,uvSlices:C,normals:M,colours:I,indices:N}}return w.buildId=this.params_.buildId,w}}return{VoxelBlockBuilder:g}})(),Oa=new lf.VoxelBlockBuilder;self.onmessage=e=>{if(e.data.subject=="build_chunk"){Oa.Init(e.data.params);const t=Oa.Rebuild(),n=[];for(let i in t.opaque)n.push(t.opaque[i].buffer);for(let i in t.transparent)n.push(t.transparent[i].buffer);self.postMessage({subject:"build_chunk_result",data:t},n)}}})();
//# sourceMappingURL=voxel-builder-threaded-worker-ff5d78be.js.map
