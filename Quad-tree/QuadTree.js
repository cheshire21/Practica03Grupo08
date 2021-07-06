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
    contains(point){ //metodo que verifica que el punto se encuentre dentro del cuadrante
      return (
          point.x >= this.x - this.w && 
          point.x < this.x + this.w &&
          point.y >= this.y - this.h && 
          point.y < this.y + this.h);
    }
    intersects(range) {//metodo que retorna false si los cuadrantes intersectan
        return (
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
        let qt_southwest = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        let qt_southeast = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

        this.northeast = new QuadTree(qt_northeast, this.capacity);
        this.northwest = new QuadTree(qt_northwest, this.capacity);
        this.southeast = new QuadTree(qt_southeast, this.capacity);
        this.southwest = new QuadTree(qt_southwest, this.capacity);
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
        if(!this.divided){
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
    query(range, found){ // metodo de encuentra puntos dentro del rectangulo verde 
        if(this.boundary.intersects(range)){//se verifica si el cuadrandante se encuentra dentro del rango
            return;
        }else{
            for(let p of this.points){ 
                
                if(range.contains(p)){ // se obtienen los puntos que estan dentro del rango 
                    found.push(p);
                }
            }
            if(this.divided){ // si el cuadrante esta dividido se va recursivamente a los cuadrante hijos  
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
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