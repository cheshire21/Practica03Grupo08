class Point{
    constructor(x,y){
      this.x = x;
      this.y = y;
      
    }
  }
  class Rectangle{
    constructor(x,y,w,h){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
  
    }
    contains(point){
      return (point.x >= this.x - this.w && 
            point.x < this.x + this.w &&
            point.y >= this.y - this.h && 
            point.y < this.y + this.h);
    }
    intersects(range) {
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
          );
  }
}
  
class QuadTree{
    constructor(boundary, n){
      this.boundary = boundary;
      this.capacity = n;
      this.points = []
      this.divided = false;
    }
    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let qt_northeast = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        let qt_northwest = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        let qt_soutwest = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        let qt_southeast = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

        this.northeast = new QuadTree(qt_northeast, this.capacity);
        this.northwest = new QuadTree(qt_northwest, this.capacity);
        this.southeast = new QuadTree(qt_soutwest, this.capacity);
        this.southwest = new QuadTree(qt_southeast, this.capacity);
        this.divided = true;
    }
    insert(point){ 
      if(!this.boundary.contains(point)){
          return false;
      }
      if(this.points.length < this.capacity){
        this.points.push(point);
        return true;
      }
      else{
        if(! this.divided){
            this.subdivide();
        }
  
        if(this.northeast.insert(point)){
            return true;
        }else if (this.northwest.insert(point)){
            return true;
        }else if(this.southeast.insert(point)){
            return true;
        }else if(this.southwest.insert(point)){
            return true;
        }

      }
        
    }
    show() {
      
        stroke (255) ;
        strokeWeight (1) ;
        noFill();
        rectMode (CENTER);
        
        rect ( this.boundary.x , this.boundary.y , this.boundary.w *2 , this.boundary.h*2) ;
        if( this.divided ) {
            this.northeast.show() ;
            this.northwest.show() ;
            this.southeast.show() ;
            this.southwest.show() ;
        }
        
        for (let p of this.points ){
            strokeWeight (1) ;
            point(p.x , p.y );
        }
    }
  }