Meteor.methods({
  testMethod: function () {
    getRandomItemOfPrice("Books", 500);
  }
});