Template.surprise.events({
  'click .surprise-button': function () {
    // increment the counter when button is clicked
    inputValue = $(".price-input").val();
    negativeFormFeedback = $('.negative-form-feedback');
    positiveFormFeedback = $('.positive-form-feedback');
    inputValue = parseInt(inputValue);
      if (isNaN(inputValue)) {
        negativeFormFeedback.text("Input must be an integer");
        positiveFormFeedback.text("");        
        return;
      } else if(inputValue < 1) {
      	negativeFormFeedback.text("Input must be greater than £1");
      } 
      else {
      	negativeFormFeedback.text("");
      	NProgress.start();
      	Meteor.call('createShoppingCart', inputValue*100, function(error, result) {
      	  positiveFormFeedback.text(result);
      	  NProgress.done();
      	});
      	return;  	
      }
  }
});