Template.surprise.events({
  'click .surprise-button': function () {
    // increment the counter when button is clicked
    inputValue = $(".price-input").val();
    negativeFormFeedback = $('.negative-form-feedback');
    positiveFormFeedback = $('.positive-form-feedback');
    inputValue = parseInt(inputValue);
      if (isNaN(inputValue)) {
      	negativeFormFeedback.show();
        negativeFormFeedback.text("Input must be an integer");
        positiveFormFeedback.text("");
        positiveFormFeedback.hide();        
        return;
      } else if(inputValue < 1) {
      	negativeFormFeedback.show();
      	negativeFormFeedback.text("Input must be greater than £1");
      } else if (inputValue > 1000) {
      	negativeFormFeedback.show();
      	negativeFormFeedback.text("Input must be less than £1000");
      }
      else {
      	negativeFormFeedback.text("");
      	negativeFormFeedback.hide();
      	positiveFormFeedback.show();
      	positiveFormFeedback.text("Loading...");
      	NProgress.start();
      	Meteor.call('createShoppingCart', inputValue*100, function(error, result) {
      	  claimPrizeImage.show();
      	  claimPrizeImage = $('.claim-prize-image');
      	  claimPrizeImage.attr("href", result);
      	  positiveFormFeedback.text("Sucess! Your request has been processed! Click on the box below to claim your surprise");
      	  NProgress.done();
      	});
      	return;  	
      }
  }
});