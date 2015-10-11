var util = Npm.require('util');
Future = Npm.require('fibers/future');
var OperationHelper = apac.OperationHelper;

function initAmazon() {
  var opHelper = new OperationHelper({
  awsId:     Meteor.settings.AWSAccessKeyId,
  awsSecret: Meteor.settings.AWSSecretKey,
  assocId:   Meteor.settings.assocId,
  endPoint: "webservices.amazon.co.uk"
  // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options) 
  });
  //opHelper.setEndpoint("http://webservices.amazon.co.uk/onca/xml");
  return opHelper;
}

function sleep(ms) {
    var future = new Future();
    setTimeout(function() {
        future.return();
    }, ms);
    future.wait();
}

createCart = function(offers) {
  opHelper = initAmazon();
  offerJson = createOfferJson(offers);
  console.log(offerJson)
  var amazonSearchFuture = new Future();
  opHelper.execute('CartCreate', offerJson, 
    function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js 
      amazonSearchFuture.return(results);
  });
  results = amazonSearchFuture.wait();
  console.log(JSON.stringify(results));
  return results;
}

function createOfferJson(offers) {
  var jsonData = {};
  var cartPosition = 1;
  offers.forEach(function(offer) {
  	var ItemOfferListingIdName = "Item." + cartPosition + ".OfferListingId";
  	var ItemQuantityName = "Item." + cartPosition + ".Quantity";
  	jsonData[ItemOfferListingIdName] = offer.OfferListingId[0];
  	jsonData[ItemQuantityName] = 1;
    cartPosition++;
  });
  return jsonData;
}

getRandomItemsOfPrice = function(price) {
  opHelper = initAmazon();

  randomCategory = Random.choice(Meteor.settings.ukCategories);
  randomTitle = createRandomTitle();

  var amazonSearchFuture = new Future();
  sleep(1000);
  opHelper.execute('ItemSearch', {
    'SearchIndex': randomCategory,
    'Title': randomTitle,
    'MinimumPrice': price-5,
    'MaximumPrice': price,
    'ResponseGroup': 'ItemAttributes,Offers,OfferFull',
    'MerchantId' : 'Amazon'
  }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
    if (results.ItemSearchResponse != null) {
      amazonSearchFuture.return(results.ItemSearchResponse.Items[0].Item);
    } else {
      amazonSearchFuture.return([]);
    }
  });
  results = amazonSearchFuture.wait();
  return results;
}

function createRandomTitle() {
	alphabetArray = createAlphabetArray();
	return Random.choice(alphabetArray);
}

function createAlphabetArray() {
  var abc = (function(){var output = []; for(var i='A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++)
    output.push(String.fromCharCode(i)); return output;})()
  return abc;
}