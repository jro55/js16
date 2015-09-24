angular.module('myApp', ['ngAnimate'])

var mainController = function($scope, $interval, $animate) {


var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
	this.name = name
	this.calories = calories
	this.vegan = vegan
	this.glutenFree = glutenFree
	this.citrusFree = citrusFree
}

var apple = new FoodItem('Apple', 120, true, true, true)
var bread = new FoodItem('Bread', 200, true, false, true)
var steak = new FoodItem('Steak', 500, false, true, true)
var wienerschnitzel = new FoodItem('Wienerschnitzel', 2500, false, false, false)
var mashedPotatoesAuJus = new FoodItem('Mashed potatoes au jus', 350, false, true, true)
var asparagus = new FoodItem('Grilled asparagus', 75, true, true, true)
var tomatoJuice = new FoodItem('Tomato juice', 75, true, true, true)
var vodka = new FoodItem('Vodka', 100, true, true, true)
var hamburger = new FoodItem('Hamburger Garnish', 100, false, false, true)
var bloodyMaryMix = new FoodItem('Bloody Mary mix', 20, true, false, true)
var wine = new FoodItem('Wine', 250, true, true, true)
var potatoSalad = new FoodItem('Potato Salad', 200, false, true, true)
var redCabbage = new FoodItem('Red Cabbage', 200, true, true, false)
var beer = new FoodItem('Hefeweizen', 400, true, false, true)
var carpaccio = new FoodItem('Beef carpaccio', 700, false, true, false)
var halibut = new FoodItem('Halibut', 500, false, true, false)
var fingerlingPotatoes = new FoodItem('Fingerling Potatos', 300, false, true, true)
var greenBeans = new FoodItem('Blanched green beans', 200, true, true, true)
var breadPudding = new FoodItem('Bread pudding', 400, false, false, true)
var vanillaSauce = new FoodItem('Vanilla sauce', 200, false, true, false)
var riceNoodles = new FoodItem('Rice noodles', 200, true, true, true)
var padThaiSauce = new FoodItem('Pad thai sauce', 100, true, true, false)
var padThaiGarnish = new FoodItem('Peanuts, cilantro, and lime', 50, true, true, false)



// console.log(apple)


FoodItem.prototype.stringify = function(){
	if (this.vegan){
		var isVegan = "is vegan friendly"
	} else { var isVegan = "is not vegan friendly"}
	if (this.glutenFree){
		var isGlutenFree = "is gluten free"
	} else { var isGlutenFree = "is not gluten free"}
	if (this.citrusFree){
		var isCitrusFree = "is citrus free"
	} else { var isCitrusFree = "is not citrus free"}

	return (this.name + " has " + this.calories + " calories. It " + isVegan + ", " + isGlutenFree + ", and " + isCitrusFree + ".")
}

// .stringify()
// bread.stringify()
// steak.stringify()
// wienerschnitzel.stringify()

// -=-=-=-=-=-=-=-=-=- Drinks -=-=-=-=-=-=-=-=-=-=- \\


var Drink = function(name, description, price, ingredients) {
	this.name = name
	this.description = description
	this.price = price
	this.ingredients = ingredients 
}

Drink.prototype.stringify = function() {
	// var currentIngredients = this.ingredients.map(function(obj) {
	// 	return obj.name.toLowerCase();
	// })
	// console.log(this.ingredients)
	var currentIngredients2 = this.ingredients.map(function(obj) {
		// console.log(obj)
		return obj.stringify()
	})
	// console.log(currentIngredients2)
	console.log(this.name + ": " + this.description + ". It costs $" + this.price + " and contains: " + currentIngredients2.join(' ')  )	
}

var bloodyMary = new Drink('Bloody Mary', 'A spicy and delicious bloody mary with hamburger garnish', 12, [tomatoJuice, hamburger, vodka, bloodyMaryMix])
var cabernet = new Drink('Cabernet', 'An earthy and smooth house red', 8, [wine])
var whiteWine = new Drink('House white wine', 'A sweet and tangy house white', 6, [wine])
var weissbier = new Drink('Weissbier','A traditional Bavarian Hefeweizen', 6, [beer])

// console.log(bloodyMary)
// bloodyMary.stringify()


// -=-=-=-=-=-=-=-=-=- Plates -=-=-=-=-=-=-=-=-=-=- \\

$scope.menuPlates = []

var Plate = function(name, description, price, ingredients) {
	this.name = name
	this.description = description
	this.price = price
	this.ingredients = ingredients
	$scope.menuPlates.push(this)
	this.canEat = false
}
var steakDinner = new Plate ('Filet Mignon', '4 oz filet mignon, grilled asparagus, mashed potatoes au jus', 34, [steak, mashedPotatoesAuJus, asparagus])
var wienerschnitzelDinner = new Plate ('Wienerschnitzel', 'Wienerschnitzel with traditional German potato salad and red cabbage', 18, [wienerschnitzel, potatoSalad, redCabbage])
var fishDinner = new Plate('Halibut with Cream sauce', 'Halibut in a light cream sauce with blanched green beans and fingerling potatoes', 28, [halibut, greenBeans, fingerlingPotatoes])
var carpaccioApp = new Plate('Beef Carpaccio', 'Thinly sliced raw beef with parmesan, arugula, lemon, and shiitake mushrooms', 10, [carpaccio])
var breadPudding = new Plate ('Bing Cherry Croissant Bread Pudding', 'Bread pudding made from fresh croissants, topped with bing cherries and a vanilla sauce', 12, [breadPudding, vanillaSauce])
var padThai = new Plate ('Pad Thai', 'Rice noodles in a tangy sauce with peanuts', 22, [riceNoodles, padThaiSauce, padThaiGarnish])


$scope.openPlate = function($index) {
	$scope.menuPlates[$index].showDescription = !$scope.menuPlates[$index].showDescription
}

$scope.totalPrice = 0

$scope.addToOrder = function($index, $event) {
	$event.stopPropagation()
	$scope.orders.push($scope.menuPlates[$index])
	console.log($scope.orders)
	$scope.totalPrice = $scope.totalPrice + $scope.menuPlates[$index].price
}

$scope.orders = []

Plate.prototype.isVegan = function() {
	// console.log(this.ingredients)
	for (var i = 0; i < this.ingredients.length; i++) {
		// console.log(this.ingredients[i])
		if (this.ingredients[i].vegan === false) {
			return false
		}
	}
	return true
}

Plate.prototype.isGlutenFree = function() {
	for (var i = 0; i < this.ingredients.length; i++) {
		if (this.ingredients[i].glutenFree === false) {
			return false
		}
	}
	return true
}

Plate.prototype.isCitrusFree = function() {
	for (var i = 0; i < this.ingredients.length; i++) {
		if (this.ingredients[i].citrusFree === false) {
			return false
		}
	}
	return true
}

Plate.prototype.stringify = function() {
	var currentIngredients2 = this.ingredients.map(function(obj) {
		return obj.stringify()
	})
	return (this.name + ": " + this.description + ". It costs $" + this.price + " and contains: " + currentIngredients2.join(' ')  )	
}

console.log(steakDinner.isVegan())
console.log(padThai.isVegan())


// console.log(carpaccioApp.stringify())

// -=-=-=-=-=-=-=-=-=- Order -=-=-=-=-=-=-=-=-=-=- \\


var Order = function(plates) {
	this.plates = plates
}

var table1 = new Order([carpaccioApp, fishDinner, breadPudding])
var table2 = new Order([wienerschnitzelDinner, steakDinner, breadPudding])

Order.prototype.stringify = function() {
	var plates2 = this.plates.map(function(obj) {
		return obj.stringify()
	})
	console.log("This table would like to order: " + plates2.join(' ')  )	
}

// table1.stringify()

// -=-=-=-=-=-=-=-=-=- Menu -=-=-=-=-=-=-=-=-=-=- \\


var Menu = function(plates) {
	this.plates = plates
}

var dinnerMenu = new Menu ([fishDinner, steakDinner, carpaccioApp, wienerschnitzelDinner])

Menu.prototype.stringify = function() {
	var plates3 = this.plates.map(function(obj) {
		return obj.stringify()
	})
	return ("Our dinner menu contains: " + plates3.join(' ')  )	
}

// dinnerMenu.stringify()

// -=-=-=-=-=-=-=-=-=- Restaurant -=-=-=-=-=-=-=-=-=-=- \\


var Restaurant = function(name, description, menu) {
	this.name = name
	this.description = description
	this.menu = menu
}

$scope.hauteHalibut = new Restaurant ("The Haute Halibut", "New American Casual Fine Dining", dinnerMenu)


Restaurant.prototype.stringify = function() {
	var menu2 = this.menu.map(function(obj) {
		return obj.stringify()
	})
	console.log("A classy restaurant, " + this.name + ", with " + this.description + ", has a menu containing: " + menu2.join(' ')  )	
}

// hauteHalibut.stringify()


// -=-=-=-=-=-=-=-=-=- Customers -=-=-=-=-=-=-=-=-=-=- \\


var Customer = function(dietaryPreference) {
	this.dietaryPreference = dietaryPreference
}

var customer1 = new Customer("vegan")
var customer2 = new Customer("gluten free")

Customer.prototype.stringify = function() {
	console.log("This customer's dietary preference is " + this.dietaryPreference + ".")
}

// customer1.stringify()


$scope.youAreVegan = function() {
	$scope.menuPlates.map(function(obj) {
		obj.canEat = false
	})
	$scope.menuPlates.map(function(obj) {
		if (obj.isVegan()) {
			obj.canEat = true
		}
	})
}
// $scope.youAreVegan()

$scope.youAreGlutenFree = function() {
	$scope.menuPlates.map(function(obj) {
		obj.canEat = false
	})
	$scope.menuPlates.map(function(obj) {
		if (obj.isGlutenFree()) {
			obj.canEat = true
		}
	})
}

// $scope.youAreGlutenFree()

$scope.youAreCitrusFree = function() {
	$scope.menuPlates.map(function(obj) {
		obj.canEat = false
	})
	$scope.menuPlates.map(function(obj) {
		if (obj.isCitrusFree()) {
			obj.canEat = true
		}
	})
}

// $scope.youAreCitrusFree()









}

angular.module('myApp').controller("mainController", ['$scope', '$interval', '$animate', mainController])
