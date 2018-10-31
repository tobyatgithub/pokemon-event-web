console.log("UH");

$(function () { 
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

var dc = {};

// retrieve data from firebase
var allCategoriesUrl ="https://fir-pokemon.firebaseio.com/categories.json";
var homeHtmlUrl = "snippets/home-snippet.html";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuItemsTitleHtml = "snippets/menu-items-title.html";
var menuItemHtml = "snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
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

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") === -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {
  // console.log("running event listener");
  // On first load, show home views
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowHomeHTML, 
    true); 
});

// Builds HTML for the home page based on categories array
// returned from the server.
function buildAndShowHomeHTML (categories) {
console.log("humm..");
  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {

      // console.log("categories = ",categories);
      // random choose function
      var chosenCategoryShortName = chooseRandomCategory(categories);
      // console.log("chosenCategoryShortName = ",chosenCategoryShortName);

      var ShortName = "'" + chosenCategoryShortName.short_name + "'";
      var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, 
        "randomCategoryShortName", ShortName);
      console.log(ShortName)
      // console.log(homeHtml);
      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);

    },
    false); 
    // False here because we are getting just regular HTML from the server, so no need to process JSON.
}


// Given array of category objects, returns a random category object.
function chooseRandomCategory (categories) {
  console.log("running random choice",categories)
  // Choose a random index into the array (from 0 inclusively until array length (exclusively))
  var randomArrayIndex = Math.floor(Math.random() * categories.length);
  // var randomArrayIndex = Math.floor(Math.random() * 4);
  return categories[randomArrayIndex];
}


// Load the menu view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};


// // Load the special view

// dc.loadMenuItems = function (chosenCategoryShortName){
//   console.log("ready to load menu items, show chosenCategoryShortName", chosenCategoryShortName)
// }
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

dc.loadMenuItems = function () {
  for (var i=0; i < 10; i ++){
    var xhr = new XMLHttpRequest();
    console.log("reading data from firebase...")
    xhr.open('GET', "https://fir-pokemon.firebaseio.com/categories.json",true);

    xhr.onload=function(){
        if(this.status == 200){
            var pokemon_list = JSON.parse(this.responseText);
            console.log("pokemon_list",pokemon_list);
            var randomArrayIndex = Math.floor(Math.random() * pokemon_list.length);
            var picked_one = pokemon_list[randomArrayIndex];
            var output = "";
            output += '<div class = "special-picked" style="background-color:white">' +
            '<img src = "'+picked_one.image+'"margin="auto" width = "75%" height="75%">'
            + '<span>Find Yours!</span>'+
            // + '<ul>' +
            // '<li> Name:'+picked_one.name+'</li>'+
            // '</ul>' +
            '</div>;'
            document.getElementById('specials-tile').innerHTML = output;
        }
    console.log('running load menu items, wait 50ms');
    wait(50);
    }

    xhr.send();
    
  }

    var xhr = new XMLHttpRequest();

    xhr.open('GET', "https://fir-pokemon.firebaseio.com/categories.json",true);

    xhr.onload=function(){
        if(this.status == 200){
            var pokemon_list = JSON.parse(this.responseText);
            console.log("pokemon_list",pokemon_list);
            var randomArrayIndex = Math.floor(Math.random() * pokemon_list.length);
            var picked_one = pokemon_list[randomArrayIndex];
            var output = "";
            output += '<div class = "special-picked" style="background-color:white">' +
            '<img src = "'+picked_one.image+'"margin="auto" width = "67%" height="67%">'
            + '<span>Find Yours!</span>'+
            '<ul>' +
            // '<li> ID:' + picked_one.id + '</li>'+
            '<li style="list-style: none;">'+picked_one.name+' is Best for You!</li>'+
            '</ul>' +
            
            '</div>;'
            
            
            document.getElementById('specials-tile').innerHTML = output;
        }
    }

    xhr.send();
  
  
}  

function buildAndShowSpeicalPick (cat) {
	console.log("running special pick build up");
	$ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml){
      console.log("cat's short name = ",cat.short_name)
		var ShortName = "'" + cat.short_name + "'";
		var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, 
	        "randomCategoryShortName", ShortName);
		var catHtml = menuItemsTitleHtml + insertHtml(menuItemHtml,)
    insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
  },
  false);
}

// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}


// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  console.log("finalHtml for category view = ",finalHtml);
  return finalHtml;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}


global.$dc = dc;

})(window);
