Meteor.methods({
  testMethod: function () {
    createShoppingCart(1000);
    /*offer = getSingleItemOfPrice(2);
    if (offer != null) {
      price = offer.Price[0].Amount;
      console.log(price);
    }*/   
  }
});