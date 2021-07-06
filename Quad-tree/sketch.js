let count = 0;
let qt;
//primera parte: muestra el codigo 
// function setup () {
//   createCanvas (401 ,401) ;
//   let boundary = new Rectangle (200 ,200 ,200 ,200) ;
//   let qt = new QuadTree ( boundary , 4) ;

//   for (let i=0; i < 5; i ++) {
//     let p = new Point (Math.random() * 400 , Math.random() * 400) ;
//     qt.insert (p);
//   }
//   console.log(qt)
//   background (0) ;
//   qt.show () ;
// }
// function draw(){
//   if(mouseIsPressed){
//     for(let i = 0; i < 5; i ++){
//       let m = new Point(mouseX + random(-5,5),mouseY+random(-5,5))
//       qt.insert(m);
//     }
//   }
//   background(0);
//   qt.show();
// }
//Segunda parte obtener los puntos que se encuentra en el rango 
function setup () {
  createCanvas (400 ,400) ;
  let boundary = new Rectangle (200 ,200 ,200 ,200) ;
  qt = new QuadTree ( boundary , 4) ;

  console.log (qt);
  for (let i=0; i < 500; i ++) {
  let p = new Point ( Math.random() * 400 , Math.random() * 400) ;
  qt.insert (p);
  // console.log(p)
  }
  background (0) ;
  qt.show () ;
  
  // console.log (qt);
}
function draw () {
  background (0) ;
  qt.show () ;
  stroke (0 ,255 ,0) ;
  rectMode ( CENTER );
  let range = new Rectangle ( mouseX ,mouseY ,25 ,25)
  rect ( range.x , range.y , range.w *2 , range.h *2) ;
  let points = [];
  qt.query (range , points );
  for (let p of points ){
    strokeWeight (4) ;
    point (p.x , p.y );
  }
  console.log(points.length)
}
