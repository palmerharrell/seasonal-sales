// You work as a developer for a big box store. Here is a JSON representation 
// of a small sample of the products you sell.

// Your job is to build a web page that lists all of the products, the name of the department 
// it's in, and the price. Additionally, put a <select> element at the top of the page that 
// contains all possible values of the season_discount key in the categories file. As soon 
// as you select one of the seasons, all prices on the page should immediately be discounted 
// by the corresponding percentage.

// For example, when Spring is chosen, all products in the corresponding Household category 
// should have their prices updated with a 15% discount off the base price.


var seasonChooser = document.getElementById("seasonChooser");
var productsEl = document.getElementById("products");

var productsArray = [];
var categoriesArray = [];

var filesLoaded = 0;

// Configure XHR for products.json
var products = new XMLHttpRequest();
products.addEventListener("load", productsLoad);
products.addEventListener("error", productsFail);
products.open("GET", "json/products.json");
products.send();

// Configure XHR for categories.json
var categories = new XMLHttpRequest();
categories.addEventListener("load", categoriesLoad);
categories.addEventListener("error", categoriesFail);
categories.open("GET", "json/categories.json");
categories.send();

function productsFail() {
	console.log("Something went wrong while loading products.json");
}

function categoriesFail() {
	console.log("Something went wrong while loading categories.json");
}

function productsLoad() {
	if(products.status === 200) {
		var productsData = JSON.parse(this.responseText);
		productsArray = productsData.products;
		listProducts();
	} else {
		console.log("Error: ", products.status);
	}
}

function categoriesLoad() {
	if(categories.status === 200) {
		var categoriesData = JSON.parse(this.responseText);
		categoriesArray = categoriesData.categories;
		listProducts();
	} else {
		console.log("Error: ", categories.status);
	}
}

// How do you look up an object in an array by the value of a particular key?
// Why is this running twice?
function listProducts() {
	console.log(productsArray[0].name); // TEST
	console.log(productsArray[0].category_id); // TEST
	console.log(productsArray[0].price); // TEST
	console.log(categoriesArray[0].id); // TEST
	console.log("TESTING TESTING TESTING"); // TEST
	console.log("Why is this running twice???"); // TEST
}

// Once both JSON files have been parsed, list products on page
if (filesLoaded === 2) {
	listProducts();
} else {
	filesLoaded++;
};



