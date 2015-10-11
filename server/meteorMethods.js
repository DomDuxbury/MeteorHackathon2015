Meteor.methods({
  createShoppingCart: function (price) {
    shoppingURL = createShoppingCart(price);
    this.unblock();
    return shoppingURL;
    /*offer = getSingleItemOfPrice(2);
    if (offer != null) {
      price = offer.Price[0].Amount;
      console.log(price);
    }*/   
  }
});