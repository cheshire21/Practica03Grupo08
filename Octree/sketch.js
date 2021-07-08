var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.y = 250;
camera.position.x = -150;
camera.position.z = 300;

// coloca los ejes el punto origen con x y z 
var axisHelper = new THREE.AxisHelper(1);
scene.add( axisHelper );

var octree;
var sizeCube = 0;

function createOctree(size,capacity){
    sizeCube = size;
    
    let cube = new Box(size,size ,size ,size ,size ,size );
    octree = new Octree(cube,capacity);
}

function random(num){
    for(i=0;i<num;i++){
        let point = new Point((Math.random()*sizeCube*2),(Math.random()*sizeCube*2),(Math.random()*sizeCube*2));
        octree.insert(point);
        
    }
}

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};


animate(); 
