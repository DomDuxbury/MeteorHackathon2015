Meteor.methods({
  testMethod: function () {
    getRandomItemOfPriceAndCategory("Books", 500);
  }
});