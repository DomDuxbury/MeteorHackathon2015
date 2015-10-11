createShoppingCart = function(totalPrice) {
  shoppingCart = [];
  var attemptCount = 0;
  while (totalPrice > 10 && attemptCount < 5 && shoppingCart.length < 20) {
  	numberOfItems = Math.floor(totalPrice/200) + 1;
    var shoppingCartBreakDown = getRandomShoppingCartBreakDown(numberOfItems,totalPrice);
    shoppingCartBreakDown.forEach(function(number) {
      offer = getSingleItemOfPrice(number);
      if (offer != null) {
        shoppingCart.push(offer);
       totalPrice -= offer.Price[0].Amount;
      }    
    });
  }
  console.log(shoppingCart);
  console.log(shoppingCart.length)
  console.log(numberOfItems);
  console.log(totalPrice);
}

function getRandomShoppingCartBreakDown(numberOfItems, totalPrice) {

  averageSize = Math.floor(totalPrice/numberOfItems);
  breakDown = [];

  difference = totalPrice - averageSize*numberOfItems;
  for (index = 0; index < numberOfItems; index++) {
  	if (index < difference) {
      breakDown.push(averageSize + 1);
  	} else {
  	  breakDown.push(averageSize);
  	}    
  }
  
  for (index = 0; index < numberOfItems; index++) {
    change = Math.floor(Random.fraction() * breakDown[index] * 0.1) * 10;
    console.log(change);
    breakDown[index] -= change;
    destinationNumber = Math.floor(Random.fraction() * numberOfItems)
    breakDown[destinationNumber] += change;
  }
  var sum = 0;
  breakDown.forEach(function(number) {
    sum += number;
  });
  console.log(breakDown);
  console.log(sum);
  return breakDown;
}

getSingleItemOfPrice = function(price) {
  var attemptCount = 0;
  var chosenItem;
  while(chosenItem == null && attemptCount < 100) {
    items = getRandomItemsOfPrice(price);
    if(items != null) {
      chosenItem = filterItems(items, price);
    }
    attemptCount++;
    //console.log("Attempt " + attemptCount);
  }
  //console.log(JSON.stringify(chosenItem));
  return chosenItem;
}

filterItems = function(items, price) {
  filteredOffers = [];
  if (items != null) {
  	//console.log(items.length);	
  	items.forEach(function(item) {
      if(item.Offers != null && item.Offers[0].TotalOffers > 0) {
      	//console.log(JSON.stringify(item.Offers[0].Offer));
      	var Offers = item.Offers[0].Offer[0].OfferListing;
      	Offers.forEach(function(offer) {
          if (offer.IsEligibleForSuperSaverShipping[0] == 1 && offer.Price[0].Amount < price) {
            console.log("success");
            filteredOffers.push(offer);
      	  }
      	});
      }     
  	});
  }
  chosenOffer = Random.choice(filteredOffers);
  return chosenOffer;
}