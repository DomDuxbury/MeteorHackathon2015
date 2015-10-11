Meteor.methods({
  testMethod: function () {
    items = getRandomItemOfPrice("Books", 500);
    console.log(items);
  }
});