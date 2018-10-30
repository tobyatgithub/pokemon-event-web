// import * as firebase from 'firebase';
// import 'firebase/firestore';

console.log("running app.js");

document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    const productsRef = db.collection('pokemon');

    var dc = {};

    var homeHtmlUrl = "snippets/home-snippet.html";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";
    
    // DEFINEING FUNCTIONS **START**
    // insert function
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };


    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };  

    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
        .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };      

    function chooseRandomCategory (categories) {
        console.log("running random choice", categories,categories.length);
        // Choose a random index into the array (from 0 inclusively until array length (exclusively))
        var randomArrayIndex = Math.floor(Math.random() * categories.length);
      
        // return category object with that randomArrayIndex
        console.log("running random choice..", randomArrayIndex);
        return categories[randomArrayIndex];
      }

    function buildAndShowHomeHTML (catogories) {
        console.log("running build and show home html");

    }
    // DEFINEING FUNCTIONS **END**

    showLoading("#main-content");


    // const query = productsRef.where('price', '>=', 5) //key, sort method, value
    // so this query will return all the things in db collection whose price is > 10

    const query = productsRef.orderBy('id','desc').limit(5)
    // this will return 5 items from db collection according to price in desc order

    // const myPost = db.collection('pokemon');
    // console.log("mypost",myPost);

    // myPost.onSnapshot(doc =>{
    //     const data =doc.data();
    //     console.log(data)


    // })
    var poke_categories = []
    query.get()
         .then(products => {
            products.forEach(doc => {
                poke_categories.push(doc.data()) //hum..maybe shall push doc.data.type?
                // data = doc.data()
            // console.log(`${data.name} at $${data.id} <br>`)
           //  document.write(`${data.name} at $${data.id} <br>`)
            // console.log(data);
        })
        console.log("poke_categories", poke_categories);

            //  doc => {
            //  console.log(doc);
            //  const data = doc.data();
            //  console.log(data)


        chosenCategoryShortName = chooseRandomCategory(poke_categories);
        console.log("chosenCategoryShortName",chosenCategoryShortName);

        var ShortName = "'" + chosenCategoryShortName.short_name + "'";
        var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, 
            "randomCategoryShortName", ShortName);
        console.log("ShortName",ShortName)
        console.log("homeHtmlToInsertIntoMainPage",homeHtmlToInsertIntoMainPage)
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
         });
    // console.log("poke_categories2", poke_categories); //yes, No!!

    
    
    

    var dc = {};

    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl ="https://davids-restaurant.herokuapp.com/categories.json";
    // var allCategoriesUrl ="/image/catogory.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl =
    "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";
    
    
    console.log("dc",dc);
    console.log("ahhhh");



})



