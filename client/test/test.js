Template.test.events({
  'click .test-button': function () {
    // increment the counter when button is clicked
     Meteor.call('testMethod');
     console.log("Hello");
  }
});