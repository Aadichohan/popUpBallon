
const Rand = ()=>{
  Math.random();
Math.floor(Math.random())
 rand = Math.floor(Math.random() * 5) + 1; 
 return rand;
}
let board = [];
const assignNum = () =>{

  let rand;
  let ballons = ByClass('balloon');
  innLength =  Math.round(ballons.length/5);
//   for(var i=0; i< innLength; i++){
//     board[i] = [];
//     for(var j=0; j<5; j++){
//       rand = Rand();
//       // if(board.includes(rand)){
//       //   console.log(rand);
        
//       // }
//       // else{
//         board[i][j]=rand;
//       // }
//     }
//   }
// }
  
  
  for(let i = 0; i < ballons.length; i++){
    rand = Rand();
    
    board.push(rand);

    ballons[i].setAttribute('data-id',rand);
    let bcolor = setcolor(rand);
    ballons[i].style.backgroundColor = bcolor;
  
  }
  console.log('b ',   board);

 setInstruct();
}

const setInstruct = () =>{
  rand = Rand();
  if(board.includes(rand)){
  ById('instruct').innerText = 'pop the '+setcolor(rand)+' ballon';
  ById('instruct').setAttribute('data-id',rand);
  }
  else{
    board.push(rand);
  //   ById('instruct').innerText = 'pop the '+setcolor(rand)+' ballon';
  // ById('instruct').setAttribute('data-id',rand);
  }
}

const setcolor = (n) =>{
  if(n==1){
    return  'red';
  }
  else if(n==2){
    return  'green';
  }
  else if(n==3){
    return  'blue';
  }
  else if(n==4){
  return 'pink';
}
else if(n==5){
  return 'purple';
}
}
assignNum();

// const 