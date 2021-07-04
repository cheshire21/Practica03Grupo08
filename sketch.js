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
function setup () {
  createCanvas (400 ,400) ;
  let boundary = new Rectangle (200 ,200 ,200 ,200) ;
  qt = new QuadTree ( boundary , 4) ;

  console.log (qt);
  for (let i=0; i < 50; i ++) {
  let p = new Point ( Math.random() * 400 , Math.random() * 400) ;
  qt.insert (p);
  // console.log(p)
  }
  background (0) ;
  qt.show () ;
  
  // console.log (qt);
}

