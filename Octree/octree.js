let alpha = 0.04;

//CLase Punto
class Point{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
        this.geometry = new THREE.SphereGeometry( 1, 10, 10 );
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.sphere = new THREE.Mesh( this.geometry, this.material );
        this.sphere.position.set(x,y,z);
        scene.add( this.sphere );
    }
}
//Clase Caja
class Box{
    constructor(x,y,z,w,h,d){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
        this.h=h;
        this.d=d;
    }
    contains(point){ 
        return (point.x >= (this.x - this.w) && point.x < (this.x + this.w) && 
        point.y >= (this.y - this.h) && point.y < (this.y + this.h) &&
        point.z >= (this.z - this.d) && point.z < (this.z + this.d));
    }
    intersects(range){ // metodo que retorna true si el rango y la caja no se intersectan
        return (range.x - range.w > this.x + this.w  || range.x + range.w < this.x - this.w  ||
        range.y - range.h > this.y + this.h  || range.y + range.h < this.y - this.h  ||
        range.z - range.d > this.z + this.d  ||range.z + range.d < this.z - this.d);
    }
}
// Clase Octree
class Octree{
    constructor(box,n){
        this.box=box;
        this.capacity=n;
        this.points=[];
        this.divided=false;
        // grafica el cubo 
        this.geometry = new THREE.BoxGeometry(box.w*2,box.h*2,box.d*2);
        this.material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: alpha, transparent: true, } );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.cube.position.set(box.x,box.y,box.z);
        scene.add(this.cube);
    }
    subdivide(){
        let x = this.box.x;
        let y = this.box.y;
        let z = this.box.z;
        let w = this.box.w/2;
        let h = this.box.h/2;
        let d = this.box.d/2;

        let nof = new Box(x-w,y-h,z-d,w,h,d); 
        let nef = new Box(x+w,y-h,z-d,w,h,d);
        let sof = new Box(x-w,y+h,z-d,w,h,d);
        let sef = new Box(x+w,y+h,z-d,w,h,d);
        let nob = new Box(x-w,y-h,z+d,w,h,d);
        let neb = new Box(x+w,y-h,z+d,w,h,d);
        let sob = new Box(x-w,y+h,z+d,w,h,d);
        let seb = new Box(x+w,y+h,z+d,w,h,d);

        this.northwestFront = new Octree(nof,this.capacity);
        this.northeastFront = new Octree(nef,this.capacity);
        this.southwestFront = new Octree(sof,this.capacity);
        this.southeastFront = new Octree(sef,this.capacity);
        this.northwestBack = new Octree(nob,this.capacity);
        this.northeastBack = new Octree(neb,this.capacity);
        this.southwestBack = new Octree(sob,this.capacity);
        this.southeastBack = new Octree(seb,this.capacity);

        alpha = alpha + 0.01;
        this.divided = true;
    }
    insert(point){

        if(!this.box.contains(point)){
            return false;
        }
        if(this.points.length<this.capacity){
            this.points.push(point);
            return true;
        }
        
        if(!this.divided){
            this.subdivide();
        }
        return (
            this.northwestFront.insert(point) ||
            this.northeastFront.insert(point) ||
            this.southwestFront.insert(point) ||
            this.southeastFront.insert(point) ||
            this.northwestBack.insert(point) ||
            this.northeastBack.insert(point) ||
            this.southwestBack.insert(point) ||
            this.southeastBack.insert(point) );
    }
    query(range,found){
        if(this.box.intersects(range)){
            return;
        }
        else{
            for(let p of this.points){
                if(range.contains(p)){
                    p.material.color.set(0xff0f00);
                    found.push(p);
                }
            }
            if(this.divided){
                this.northwestFront.query(range,found);
                this.northeastFront.query(range,found);
                this.southwestFront.query(range,found);
                this.southeastFront.query(range,found);
                this.northwestBack.query(range,found);
                this.northeastBack.query(range,found);
                this.southwestBack.query(range,found);
                this.southeastBack.query(range,found);
            }
        }
    }
}