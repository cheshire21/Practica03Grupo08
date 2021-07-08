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
        return (point.x >= (this.x - this.w) && 
        point.x <= (this.x + this.w) && 
        point.y >= (this.y - this.h) && 
        point.y <= (this.y + this.h) &&
        point.z >= (this.z - this.d) &&
        point.z <= (this.z + this.d));
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

        this.sonNOF = new Octree(nof,this.capacity);
        this.sonNEF = new Octree(nef,this.capacity);
        this.sonSOF = new Octree(sof,this.capacity);
        this.sonSEF = new Octree(sef,this.capacity);
        this.sonNOB = new Octree(nob,this.capacity);
        this.sonNEB = new Octree(neb,this.capacity);
        this.sonSOB = new Octree(sob,this.capacity);
        this.sonSEB = new Octree(seb,this.capacity);

        alpha = alpha + 0.1;
        this.divided = true;
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