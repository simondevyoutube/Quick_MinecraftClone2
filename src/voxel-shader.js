
export const voxel_shader = (() => {

  const _PLACEMENT_VS = `
  precision mediump float;
  
  // Attributes, declared by three.js
  // attribute vec3 position;
  // attribute vec3 normal;
  // attribute vec2 uv;
  
  // Outputs
  varying vec2 vUV;
    
  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUV = uv;
  }
    `;
    
    const _PLACEMENT_PS = `
  precision mediump float;
  precision mediump sampler2DArray;
  
  uniform float time;
  uniform vec3 edgeColour;
  
  #define saturate(a) clamp( a, 0.0, 1.0 )
  
  varying vec2 vUV;

  float sdf_Box(vec2 coords, vec2 bounds) {
    vec2 dist = abs(coords) - bounds;
    return length(max(dist, 0.0)) + min(max(dist.x, dist.y), 0.0);
  }

  float smootherstep(float a, float b, float x) {
    x = clamp((x - a) / (b - a), 0.0, 1.0);
    return x * x * x * (x * ( x * 6.0 - 15.0) + 10.0);
  }

  void main() {
    float d = sdf_Box(vUV - 0.5, vec2(0.5));

    float s = smoothstep(0.0, 0.1, abs(d));
    float edgeColouring = mix(0.0, 1.0, 1.0 - s);
  
    float blink = clamp(sin(time * 10.0), 0.0, 1.0) * 0.1 + 0.9;
    gl_FragColor = vec4(edgeColour, edgeColouring * blink);
  }
    `;

    const _SUN_VS = `
precision mediump float;

// Attributes, declared by three.js
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

// Outputs
varying vec3 vWorldPosition;
varying vec2 vUV;

#define saturate(a) clamp( a, 0.0, 1.0 )


void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vUV = uv;
}
  `;
  
  const _SUN_PS = `
precision mediump float;
precision mediump sampler2DArray;

varying vec3 vWorldPosition;
varying vec2 vUV;

#define saturate(a) clamp( a, 0.0, 1.0 )


float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdf_Box(vec2 coords, vec2 bounds) {
  vec2 dist = abs(coords) - bounds;
  return length(max(dist, 0.0)) + min(max(dist.x, dist.y), 0.0);
}

float smootherstep(float a, float b, float x) {
  x = clamp((x - a) / (b - a), 0.0, 1.0);
  return x * x * x * (x * ( x * 6.0 - 15.0) + 10.0);
}

float hash1( vec2 p )
{
    p  = 50.0*fract( p*0.3183099 );
    return fract( p.x*p.y*(p.x+p.y) );
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0);

    float a = hash1(p+vec2(0,0));
    float b = hash1(p+vec2(1,0));
    float c = hash1(p+vec2(0,1));
    float d = hash1(p+vec2(1,1));
    
    return -1.0+2.0*( a + (b-a)*u.x + (c-a)*u.y + (a - b - c + d)*u.x*u.y );
}

void main() {
  vec2 uvStepped = floor(vUV * 32.0) / 32.0;
  float sunRadius = 0.125;
  //float d = 1.0 - clamp(sdCircle(uvStepped - 0.5, sunRadius) / (0.5 - sunRadius), 0.0, 1.0);
  float d = 1.0 - clamp(sdf_Box(uvStepped - 0.5, vec2(sunRadius)) / (0.5 - sunRadius), 0.0, 1.0);

  float noiseValue = noise(uvStepped * 32.0) * 0.1 + 0.9;

  vec4 core = sRGBToLinear(vec4(0.96, 0.9, 0.7, 1.0));
  vec4 corona = sRGBToLinear(vec4(0.5, 0.2, 0.05, 1.0)) * noiseValue;
  vec4 sunColour = mix(corona, core, d * d);
  gl_FragColor = vec4(sunColour.xyz, d);
}
  `;

  const _CLOUD_VS = `
precision mediump float;

// Attributes, declared by three.js
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

// Outputs
varying vec3 vWorldPosition;
varying vec3 vNormal;

#define saturate(a) clamp( a, 0.0, 1.0 )


void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vNormal = normal;
}
  `;
  
  const _CLOUD_PS = `
precision mediump float;
precision mediump sampler2DArray;

varying vec3 vWorldPosition;
varying vec3 vNormal;

uniform vec3 cloudMin;
uniform vec3 cloudMax;

#define saturate(a) clamp( a, 0.0, 1.0 )


// https://gist.github.com/DomNomNom/46bb1ce47f68d255fd5d
float GetAABBDepth(vec3 rayOrigin, vec3 rayDir, vec3 boxMin, vec3 boxMax) {
  vec3 tMin = (boxMin - rayOrigin) / rayDir;
  vec3 tMax = (boxMax - rayOrigin) / rayDir;
  vec3 t1 = min(tMin, tMax);
  vec3 t2 = max(tMin, tMax);
  float tNear = max(max(t1.x, t1.y), t1.z);
  float tFar = min(min(t2.x, t2.y), t2.z);

  return (tFar - tNear);
}


vec4 GetCloudShading(vec3 rayOrigin, vec3 rayDir, vec3 boxMin, vec3 boxMax) {
  float depth = GetAABBDepth(rayOrigin, rayDir, boxMin, boxMax);

  float cloudDensity = 0.01;
  float opacity = 1.0 - exp(-cloudDensity * cloudDensity * depth * depth);
  vec3 sunDir = normalize(vec3(-1.0, -4.0, 0.0));

  return vec4(vec3(saturate(dot(sunDir, vNormal)) + 0.75), opacity);
}

float sdBox( vec3 p, vec3 b, float r ) {
    vec3 d = abs(p) - b;
    return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0)) - r;
}

float map( in vec3 pos )
{
  return sdBox(pos, (cloudMax - cloudMin) * 0.25, 0.0);
}

// http://iquilezles.org/www/articles/normalsSDF/normalsSDF.htm
vec3 calcNormal( in vec3 pos )
{
    // inspired by tdhooper and klems - a way to prevent the compiler from inlining map() 4 times
    vec3 n = vec3(0.0);
    for( int i=0; i<4; i++ )
    {
        vec3 e = 0.5773*(2.0*vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))-1.0);
        n += e*map(pos+0.0005*e);
    }
    return normalize(n);
}

void main() {
  vec3 fixedPosition = (cloudMax + cloudMin) * 0.5;
  
  vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
  vec4 cloudColour = GetCloudShading(cameraPosition, viewDirection, cloudMin, cloudMax);

  gl_FragColor = cloudColour;
}
  `;

  const _VOXEL_VS = `
precision mediump float;

// Attributes, declared by three.js
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;
attribute vec3 colour;
attribute float uvSlice;

// Outputs
varying vec3 vNormal;
varying vec3 vColour;
varying vec3 vWorldPosition;
varying vec3 vUV;

uniform float fogTime;

#define saturate(a) clamp( a, 0.0, 1.0 )


void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vNormal = normal;
  vColour = colour;
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vUV = vec3(uv, uvSlice);
}
  `;
  
  const _VOXEL_PS = `
precision mediump float;
precision mediump sampler2DArray;


#define saturate(a) clamp( a, 0.0, 1.0 )

//==========================================================================================
// hashes
//==========================================================================================

float hash1( vec2 p )
{
    p  = 50.0*fract( p*0.3183099 );
    return fract( p.x*p.y*(p.x+p.y) );
}

float hash1( float n )
{
    return fract( n*17.0*fract( n*0.3183099 ) );
}

vec2 hash2( float n ) { return fract(sin(vec2(n,n+1.0))*vec2(43758.5453123,22578.1459123)); }


vec2 hash2( vec2 p ) 
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    p = p*k + k.yx;
    return fract( 16.0 * k*fract( p.x*p.y*(p.x+p.y)) );
}

//==========================================================================================
// noises
//==========================================================================================

// value noise, and its analytical derivatives
vec4 noised( in vec3 x )
{
    vec3 p = floor(x);
    vec3 w = fract(x);
    
    vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    vec3 du = 30.0*w*w*(w*(w-2.0)+1.0);

    float n = p.x + 317.0*p.y + 157.0*p.z;
    
    float a = hash1(n+0.0);
    float b = hash1(n+1.0);
    float c = hash1(n+317.0);
    float d = hash1(n+318.0);
    float e = hash1(n+157.0);
	float f = hash1(n+158.0);
    float g = hash1(n+474.0);
    float h = hash1(n+475.0);

    float k0 =   a;
    float k1 =   b - a;
    float k2 =   c - a;
    float k3 =   e - a;
    float k4 =   a - b - c + d;
    float k5 =   a - c - e + g;
    float k6 =   a - b - e + f;
    float k7 = - a + b + c - d + e - f - g + h;

    return vec4( -1.0+2.0*(k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z), 
                      2.0* du * vec3( k1 + k4*u.y + k6*u.z + k7*u.y*u.z,
                                      k2 + k5*u.z + k4*u.x + k7*u.z*u.x,
                                      k3 + k6*u.x + k5*u.y + k7*u.x*u.y ) );
}

float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 w = fract(x);
    
    vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    
    float n = p.x + 317.0*p.y + 157.0*p.z;
    
    float a = hash1(n+0.0);
    float b = hash1(n+1.0);
    float c = hash1(n+317.0);
    float d = hash1(n+318.0);
    float e = hash1(n+157.0);
	  float f = hash1(n+158.0);
    float g = hash1(n+474.0);
    float h = hash1(n+475.0);

    float k0 =   a;
    float k1 =   b - a;
    float k2 =   c - a;
    float k3 =   e - a;
    float k4 =   a - b - c + d;
    float k5 =   a - c - e + g;
    float k6 =   a - b - e + f;
    float k7 = - a + b + c - d + e - f - g + h;

    return -1.0+2.0*(k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z);
}

vec3 noised( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    vec2 du = 30.0*w*w*(w*(w-2.0)+1.0);
    
    float a = hash1(p+vec2(0,0));
    float b = hash1(p+vec2(1,0));
    float c = hash1(p+vec2(0,1));
    float d = hash1(p+vec2(1,1));

    float k0 = a;
    float k1 = b - a;
    float k2 = c - a;
    float k4 = a - b - c + d;

    return vec3( -1.0+2.0*(k0 + k1*u.x + k2*u.y + k4*u.x*u.y), 
                      2.0* du * vec2( k1 + k4*u.y,
                                      k2 + k4*u.x ) );
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    
#if 0
    p *= 0.3183099;
    float kx0 = 50.0*fract( p.x );
    float kx1 = 50.0*fract( p.x+0.3183099 );
    float ky0 = 50.0*fract( p.y );
    float ky1 = 50.0*fract( p.y+0.3183099 );

    float a = fract( kx0*ky0*(kx0+ky0) );
    float b = fract( kx1*ky0*(kx1+ky0) );
    float c = fract( kx0*ky1*(kx0+ky1) );
    float d = fract( kx1*ky1*(kx1+ky1) );
#else
    float a = hash1(p+vec2(0,0));
    float b = hash1(p+vec2(1,0));
    float c = hash1(p+vec2(0,1));
    float d = hash1(p+vec2(1,1));
#endif
    
    return -1.0+2.0*( a + (b-a)*u.x + (c-a)*u.y + (a - b - c + d)*u.x*u.y );
}

//==========================================================================================
// fbm constructions
//==========================================================================================

const mat3 m3  = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64 );
const mat3 m3i = mat3( 0.00, -0.80, -0.60,
                       0.80,  0.36, -0.48,
                       0.60, -0.48,  0.64 );
const mat2 m2 = mat2(  0.80,  0.60,
                      -0.60,  0.80 );
const mat2 m2i = mat2( 0.80, -0.60,
                       0.60,  0.80 );

//------------------------------------------------------------------------------------------

float fbm_4( in vec3 x )
{
    float f = 2.0;
    float s = 0.5;
    float a = 0.0;
    float b = 0.5;
    for( int i=0; i<4; i++ )
    {
        float n = noise(x);
        a += b*n;
        b *= s;
        x = f*m3*x;
    }
	return a;
}

vec4 fbmd_8( in vec3 x )
{
    float f = 1.92;
    float s = 0.5;
    float a = 0.0;
    float b = 0.5;
    vec3  d = vec3(0.0);
    mat3  m = mat3(1.0,0.0,0.0,
                   0.0,1.0,0.0,
                   0.0,0.0,1.0);
    for( int i=0; i<7; i++ )
    {
        vec4 n = noised(x);
        a += b*n.x;          // accumulate values		
        d += b*m*n.yzw;      // accumulate derivatives
        b *= s;
        x = f*m3*x;
        m = f*m3i*m;
    }
	return vec4( a, d );
}

vec4 fbmd_4( in vec3 x )
{
    float f = 1.92;
    float s = 0.5;
    float a = 0.0;
    float b = 0.5;
    vec3  d = vec3(0.0);
    mat3  m = mat3(1.0,0.0,0.0,
                   0.0,1.0,0.0,
                   0.0,0.0,1.0);
    for( int i=0; i<4; i++ )
    {
        vec4 n = noised(x);
        a += b*n.x;          // accumulate values		
        d += b*m*n.yzw;      // accumulate derivatives
        b *= s;
        x = f*m3*x;
        m = f*m3i*m;
    }
	return vec4( a, d );
}

float fbm_9( in vec2 x )
{
    float f = 1.9;
    float s = 0.55;
    float a = 0.0;
    float b = 0.5;
    for( int i=0; i<9; i++ )
    {
        float n = noise(x);
        a += b*n;
        b *= s;
        x = f*m2*x;
    }
	return a;
}

vec3 fbmd_9( in vec2 x )
{
    float f = 1.9;
    float s = 0.55;
    float a = 0.0;
    float b = 0.5;
    vec2  d = vec2(0.0);
    mat2  m = mat2(1.0,0.0,0.0,1.0);
    for( int i=0; i<9; i++ )
    {
        vec3 n = noised(x);
        a += b*n.x;          // accumulate values		
        d += b*m*n.yz;       // accumulate derivatives
        b *= s;
        x = f*m2*x;
        m = f*m2i*m;
    }
	return vec3( a, d );
}

float fbm_4( in vec2 x )
{
    float f = 1.9;
    float s = 0.55;
    float a = 0.0;
    float b = 0.5;
    for( int i=0; i<4; i++ )
    {
        float n = noise(x);
        a += b*n;
        b *= s;
        x = f*m2*x;
    }
	return a;
}

float sum( vec3 v ) { return v.x+v.y+v.z; }

vec4 hash4( vec2 p ) {
  return fract(
    sin(vec4(1.0+dot(p,vec2(37.0,17.0)), 
              2.0+dot(p,vec2(11.0,47.0)),
              3.0+dot(p,vec2(41.0,29.0)),
              4.0+dot(p,vec2(23.0,31.0))))*103.0);
}

float smootherstep(float a, float b, float x) {
  x = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
  return x * (b - a) + a;
}

uniform vec3 fogColour;
uniform float fogDensity;
uniform vec2 fogRange;
uniform float fogTime;
uniform float fade;
uniform float flow;

uniform sampler2DArray diffuseMap;
uniform sampler2D noiseMap;

varying vec3 vUV;
varying vec3 vNormal;
varying vec3 vColour;
varying vec3 vWorldPosition;

vec4 _FogWithHeight() {
  vec3 fogOrigin = cameraPosition;
  vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
  float fogDepth = distance(vWorldPosition, fogOrigin);

  // vec3 noiseSampleCoord = vWorldPosition * 0.05 + vec3(0, fogTime * 0.5, 0);
  // float noiseSample = fbm_4(noiseSampleCoord + fbm_4(noiseSampleCoord)) * 0.5 + 0.5;
  // fogDepth *= mix(noiseSample, 1.0, saturate((fogDepth - 250.0) / 500.0));
  fogDepth *= fogDepth;

  float heightFactor = 0.025;
  float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
      1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
  fogFactor = saturate(fogFactor);

  return vec4(fogColour, fogFactor);
}


vec4 _Fog() {
  vec3 fogOrigin = cameraPosition;
  vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
  float fogDepth = distance(vWorldPosition, fogOrigin);

  float fogFactor = saturate((fogDepth - fogRange.x) / fogRange.y);

  vec3 noiseSampleCoord = vWorldPosition * 0.05 + vec3(0, fogTime * 0.5, 0);
  float noiseSample = fbm_4(noiseSampleCoord + fbm_4(noiseSampleCoord)) * 0.5 + 0.5;
  float noiseDropoff = saturate((fogDepth - fogRange.x) / fogRange.y);
  noiseDropoff *= noiseDropoff;
  noiseDropoff = mix(noiseSample, 1.0, noiseDropoff);

  fogFactor *= noiseDropoff;

  vec3 fogColourWithNoise = fogColour * noiseDropoff;

  return vec4(fogColourWithNoise, smootherstep(0.0, 1.0, fogFactor));
}

void main() {
  vec4 diffuse = sRGBToLinear(texture2D(diffuseMap, vUV));

  vec3 hemiLight1 = vec3(1.0, 1.0, 1.0);
  vec3 hemiLight2 = vec3(0.5, 0.1, 0.5);
  vec3 sunLightDir = normalize(vec3(0.1, 1.0, 0.0));
  vec3 lighting = saturate(dot(vNormal, sunLightDir)) * 0.25 + vColour * 1.0;
  vec4 outColour = vec4(diffuse.xyz * lighting, 0.75 * fade);

  vec3 noiseDir = abs(vNormal);
  vec2 noiseCoords = (
      noiseDir.x * vWorldPosition.yz +
      noiseDir.y * vWorldPosition.xz +
      noiseDir.z * vWorldPosition.xy);

  vec4 noisePixel = texture2D(noiseMap, noiseCoords / 64.0) * 0.2 + 0.8;
  outColour.xyz *= noisePixel.xyz;

  vec4 fog = _FogWithHeight();
  outColour.xyz = mix(outColour.xyz, fog.xyz, fog.w);

  gl_FragColor = outColour;
}
  `;
  
    return {
        VOXEL: {
            VS: _VOXEL_VS,
            PS: _VOXEL_PS,
        },
        CLOUD: {
            VS: _CLOUD_VS,
            PS: _CLOUD_PS,
        },
        SUN: {
            VS: _SUN_VS,
            PS: _SUN_PS,
        },
        PLACEMENT: {
            VS: _PLACEMENT_VS,
            PS: _PLACEMENT_PS,
        },
    };
  })();
  