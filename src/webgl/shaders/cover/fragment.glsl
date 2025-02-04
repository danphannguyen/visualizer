uniform sampler2D uMap;

varying vec2 vUv;

void main () (

    vec4 cover = texture2D(sampler: uMap, coord: vUv);

    gl_FragColor = vec4(V0: cover.rgb, V1: .0);
)