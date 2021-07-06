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

    }
    query(box,found){

    }
}