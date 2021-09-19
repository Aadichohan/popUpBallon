
const firebaseConfig = {
    apiKey: "AIzaSyAa1L21-mmKWBmeUNgQ51vGkFlp84CPHKQ",
    authDomain: "popballon-8e5b2.firebaseapp.com",
    projectId: "popballon-8e5b2",
    storageBucket: "popballon-8e5b2.appspot.com",
    messagingSenderId: "33551772246",
    appId: "1:33551772246:web:9cbc5ab15eae494021a9f7",
    measurementId: "G-HJR2WTQGDF"
};

firebase.initializeApp(firebaseConfig);
const auth      = firebase.auth();
const firestore = firebase.firestore();

const login = () => {
  let email    =  ById('email').value;
  let password =  ById('password').value;
console.log(email,password);
    auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
   switch (error.code) {
          case "auth/invalid-email":
          case "auth/wrong-password":
          case "auth/user-not-found":
            {
              this.accountErrorMessage = "Wrong email address or password.";
              break;
            }
          case "auth/user-disabled":
          case "user-disabled":
            {
              this.accountErrorMessage = "This account is disabled";
              break;
            }
        }
        console.log(accountErrorMessage);
  });
}




const logOut = () => {
auth.signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

unsubscribe = auth.onAuthStateChanged((user) => {
  
  if (user) {
    
    setUserTitle(user.uid);
    getUserLevel();
    if (window.location.href.indexOf("app.html") == -1) {
      window.location.replace('./app.html');
      console.log('user ',user);
        console.log('user ',user);
      
    }
    } else {
      // console.log('user ',clicked);
      if (window.location.href.indexOf("index.html") == -1) {
        window.location.replace("./index.html");
    }
    }
});


const SignUp = () =>{
  let email    =  ById('semail').value;
  let password =  ById('spassword').value;
  let uname =  ById('sname').value;
  let exsist;
  checkuserExsist(email).then(res => {
    if(res !== undefined || res.length > 0){
      firebaseSignup(email, password, uname);
         console.log('exsist exsist ',res)
        }
   
        
      }).catch((error) => {
     console.log('error ',error);
    });
//   
}

const firebaseSignup = (email, password, uname) =>{
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential)=>{
    unsubscribe(); 
    let uid =  userCredential.user.uid;
    let email =  userCredential.user.email;
    setUserCollection(uid, email,uname);
    LoginSetup();
    console.log('cred ',email);
  })
}

const setUserCollection = (uid, email, uname) =>{
  firestore.collection('users').doc(uid).set({
    uid: uid,
    email:email,
    uname:uname,
    level:1,
    score:0,
    highscore:0
})
.then(() => {
  console.log("Document written");
})
.catch((error) => {
  console.error("Error adding document: ", error);
    });
  }
// check if user exsist

const checkuserExsist = (email) =>{

  return firebase.auth().fetchSignInMethodsForEmail(email)
  .then( result => {
    //  console.log('user exsist ',result);
    return  result;
  })
  .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
      });
    //    console.log('result ',result);
  }
  
  // let clicked = false ;
const signUpSetup = ()=>{
  ById('login-form').style.display = 'none';
  ById('signup-form').style.display = 'block';

}
const LoginSetup = ()=>{
  // alert();
  ById('login-form').style.display = 'block';
  ById('signup-form').style.display = 'none';

}

const setUserTitle = (uid)=>{
  firestore.collection('users').doc(uid).get().then((querySnapshot) => {
    const data = querySnapshot.data();
    const uname = data.uname;
    // console.log(0);
    ById('userTitle').innerText = uname;
});
}
