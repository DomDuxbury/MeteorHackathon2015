createShoppingCart = function(numberOfItems, totalPrice) {
  getRandomShoppingCartBreakDown(numberOfItems,totalPrice)
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
    change = Math.floor(Random.fraction() * breakDown[index]);
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
}

getSingleItemOfPrice = function(price) {
  var attemptCount = 0;
  var chosenItem;
  while(chosenItem == null && attemptCount < 100) {
    items = getRandomItemsOfPrice(price);
    if(items != null) {
      chosenItem = filterItems(items);
    }
    attemptCount++;
    console.log("Attempt " + attemptCount);
  }
  console.log(chosenItem);
  return chosenItem;
}

filterItems = function(items) {
  filteredItems = [];
  if (items != null) {
  	console.log(items.length);	
  	items.forEach(function(item) {
      if(item.Offers != null && item.Offers[0].TotalOffers > 0) {
      	//console.log(JSON.stringify(item.Offers[0].Offer));
      	if (item.Offers[0].Offer[0].OfferListing[0].IsEligibleForSuperSaverShipping[0] == 1) {
          console.log("success");
          filteredItems.push(item);
      	}
      }     
  	});
  }
  chosenItem = Random.choice(filteredItems);
  return chosenItem;
}