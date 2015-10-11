var util = Npm.require('util')
var OperationHelper = apac.OperationHelper;

getRandomItemOfPriceAndCategory = function(category, price) {
  console.log(Meteor.settings.AWSAccessKeyId);
  var opHelper = new OperationHelper({
  awsId:     Meteor.settings.AWSAccessKeyId,
  awsSecret: Meteor.settings.AWSSecretKey,
  assocId:   Meteor.settings.assocId,
  endPoint: "webservices.amazon.co.uk"
  // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options) 
  });
  //opHelper.setEndpoint("http://webservices.amazon.co.uk/onca/xml");


 
  // execute(operation, params, callback)
  // operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html 
  // params: parameters for operation (optional) 
  // callback(err, parsed, raw): callback function handling results. err = potential errors raised from xml2js.parseString() or http.request(). parsed = xml2js parsed response. raw = raw xml response. 
 
  opHelper.execute('ItemSearch', {
    'SearchIndex': category,
    'Title': 'a',
    'MinimumPrice': price,
    'MaximumPrice': price,
    'ResponseGroup': 'ItemAttributes,Offers,OfferFull'
  }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js 

      console.log(JSON.stringify(results.ItemSearchResponse.Items[0].Item));
  });

}

doNothing = function() {

}