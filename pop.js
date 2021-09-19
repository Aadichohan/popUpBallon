
let popped = 0;
let life = 3;
let level = 1;
let points = 0;
let countPop = 0;

// 

document.addEventListener('mouseover', function(e){
    if (e.target.className === "balloon"){
        uid = getuId();
        // console.log(uid);
      let data_id =  e.target.getAttribute('data-id');
    //   let data_index =  e.target.getAttribute('data-index');
      let instructId = ById('instruct').getAttribute('data-id');
      e.target.style.backgroundColor = "#ededed";
      // change color of ballon
      setTimeout(function(){ 
          rand = Rand();
        e.target.setAttribute('data-id', rand);
        let bcolor = setcolor(rand);
        e.target.style.backgroundColor = bcolor;
        
       }, 500);
      
      if(instructId === data_id){
          countPop++;
          points = points+10;
          console.log('countPop ',countPop);
          if(countPop == 3){
              countPop = 0;
              assignNum();
            }
            if(popped >= 30){
                
              //  e.target.querySelectorAll("[data-index='1']")
                e.target.textContent = "POP!";
                checkAllPopped('Congratulations');
              getUserLevel().then((level)=>{
            level = level+1;
        //  console.log('getUserLevel ',level );
         setUserLevel(uid, level, points, points);
       });
        //    checkAllPopped('Congratulations');
       }
      }
      else{
        life = life - 1;  
        if(life == 0){
            checkAllPopped('Loose');
        }
      }
      console.log(points, life);
      setInstruct();
               // e.target.style.backgroundColor = "#ededed";
              //  e.target.textContent = "POP!";
                popped++;
                removeEvent(e);
    }   
});

function removeEvent(e){
    e.target.removeEventListener('mouseover', function(){
        
    })
};

function checkAllPopped(message){
    
        console.log('all popped!');
        let gallery = ById('balloon-gallery');
        let messageBody = ById('yay-no-balloons');
      //  let wrapper = ById('wrapper');
        // wrapper.innerHTML = '';
        reset = document.createElement('button');
        reset.innerText = 'Reset';
        reset.classList.add = 'btn btn-success';
        // reset.setAttribute('href','javascript:(0);');
        reset.setAttribute('onclick','window.location.reload()');
        console.log('f ',wrapper);
        gallery.innerHTML = '';
        gallery.appendChild(reset);
        messageBody.innerText = message;
        messageBody.style.display = 'block';
   
};

const setUserLevel = (uid, level, score,highscore)=>{
    console.log('set user level ', uid, level, score,highscore);
    firestore.collection('users').doc(uid).update({
        level:level,
        score:score,
        highscore:0
    })
}

const getuId = () =>{
    return firebase.auth().currentUser.uid;
}
const getUserLevel = ()=>{
    uid =  firebase.auth().currentUser.uid;
   return firestore.collection('users').doc(uid).get().then((querySnapshot) => {
        const data = querySnapshot.data();
        const dblevel = data.level;
        console.log('level ',data);
            ById('level').innerText = ' Level '+dblevel;
             return  dblevel;
    });
}

// getUserLevel();