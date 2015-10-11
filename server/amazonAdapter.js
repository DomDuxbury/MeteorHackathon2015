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

function createCart(items) {
  opHelper = initAmazon();
  
  var amazonSearchFuture = new Future();
  opHelper.execute('CartCreate', {
    'SearchIndex': randomCategory,
    'Title': randomTitle,
    'MinimumPrice': price,
    'MaximumPrice': price,
    'ResponseGroup': 'ItemAttributes,Offers,OfferFull'
  }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js 
      amazonSearchFuture.return(results.ItemSearchResponse.Items[0].Item);
  });
  results = amazonSearchFuture.wait();
  return results;
}

getRandomItemsOfPrice = function(price) {
  opHelper = initAmazon();

  randomCategory = Random.choice(Meteor.settings.ukCategories);
  randomTitle = createRandomTitle();

  var amazonSearchFuture = new Future();
  opHelper.execute('ItemSearch', {
    'SearchIndex': randomCategory,
    'Title': randomTitle,
    'MinimumPrice': price,
    'MaximumPrice': price,
    'ResponseGroup': 'ItemAttributes,Offers,OfferFull'
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