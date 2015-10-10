if (Meteor.isClient) {
  // counter starts at 0
  Template.test.events({
    'click .test-button': function () {
      // increment the counter when button is clicked
       Meteor.call('testMethod');
       console.log("Hello");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
