// You work as a developer for a big box store. Here is a JSON representation 
// of a small sample of the products you sell.

// Your job is to build a web page that lists all of the products, the name of the department 
// it's in, and the price. Additionally, put a <select> element at the top of the page that 
// contains all possible values of the season_discount key in the categories file. As soon 
// as you select one of the seasons, all prices on the page should immediately be discounted 
// by the corresponding percentage.

// For example, when Spring is chosen, all products in the corresponding Household category 
// should have their prices updated with a 15% discount off the base price.

// The two JSON representations above should be in two files: products.json, and 
// categories.json. You should load both file via XHRs and store the contents in two 
// different JavaScript variables in your code.

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
		console.log("productsData: ",productsData);	// TEST
	}
}

function categoriesLoad() {
	if(categories.status === 200) {
		var categoriesData = JSON.parse(this.responseText);
		console.log("categoriesData: ",categoriesData);	// TEST
	}
}




