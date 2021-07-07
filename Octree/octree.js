//CLase Punto
class Point{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
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

    }
    intersectc(box){

    }
}
// Clase Octree
class Octree{
    constructor(box,n){
        this.box=box;
        this.capacity=n;
        this.points=[];
        this.divided=false;
    }
    subdivide(){

    }
    insert(point){

        if(!this.box.contains(point)){
            return false;
        }
        if(this.points.length<this.capacity){
            this.points.push(point);
            point.material.color.set(this.color);
            return true;
        }
        /*
        if(!this.divided){
            this.subdivide();
        }*/
        return (this.sonNOF.insert(point) ||
            this.sonNEF.insert(point) ||
            this.sonSOF.insert(point) ||
            this.sonSEF.insert(point) ||
            this.sonNOB.insert(point) ||
            this.sonNEB.insert(point) ||
            this.sonSOB.insert(point) ||
            this.sonSEB.insert(point) );
    }
    query(box,found){

    }
}