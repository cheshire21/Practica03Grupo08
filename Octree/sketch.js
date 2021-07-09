// crea escenario
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
// obtiene controles de Orbita para mover el cubo
var controls = new THREE.OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.y = 340;
camera.position.x = -155;
camera.position.z = 380;

// coloca los ejes el punto origen con x y z 
var axisHelper = new THREE.AxisHelper(10);
scene.add( axisHelper );

var octree;
var sizeCube = 0;

var GraphRange ;
var range;
var found = []

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
/* -----------------------------query------------------------------ */
function cleanRange(){
    //creo cubo 
    range = null;
    for(let p of found){    //vuelve blanco los puntos antes de eliminar el cubo
        p.material.color.set(0xffffff);
        
    }
    // elimino cubo de la grafica
    scene.remove(GraphRange);
    GraphRange = null;
    
}
function createRange(size, x ,y,z){
    cleanRange();
    let rangeSize = ((size == undefined)? 30 : size);
    let rangex = ((x == undefined)? Math.random()*sizeCube : x);
    let rangey = ((y == undefined)? Math.random()*sizeCube : y);
    let rangez = ((z == undefined)? Math.random()*sizeCube : z);
    
    //creo cubo 
    range  = new Box(rangex,rangey,rangez,rangeSize,rangeSize,rangeSize);
    found = [];
    octree.query(range,found); // se buscan los puntos 
    console.log('Puntos intersectados: ' + found.length)
    //grafico cubo
    var geometry = new THREE.BoxGeometry(rangeSize*2,rangeSize*2,rangeSize*2);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: alpha + 0.3, transparent: true, } );
    
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(rangex,rangey,rangez);// se coloca las coordenadas 
    GraphRange = cube;
    scene.add(GraphRange); // se inserta en la escena
}


function cleanScene(){
    scene = new THREE.Scene(); //crea una nueva escena
    scene.add( axisHelper ); // aagrego otro x y z 
}
/* -----------------------------end------------------------------ */
var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};


animate(); 
