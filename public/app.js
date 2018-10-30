// import * as firebase from 'firebase';
// import 'firebase/firestore';

console.log("running app.js");

document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    const productsRef = db.collection('pokemon');


    // const query = productsRef.where('price', '>=', 5) //key, sort method, value
    // so this query will return all the things in db collection whose price is > 10

    const query = productsRef.orderBy('id','desc').limit(5)
    // this will return 5 items from db collection according to price in desc order
    query.get()
         .then(products => {
             products.forEach(doc => {
                 data = doc.data()
                 console.log(`${data.name} at $${data.id} <br>`)
                //  document.write(`${data.name} at $${data.id} <br>`)
             })
         })
})

// $(function () { // Same as document.addEventListener("DOMContentLoaded"...

//   // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
//   $("#navbarToggle").blur(function (event) {
//     var screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//       $("#collapsable-nav").collapse('hide');
//     }
//   });
// });

