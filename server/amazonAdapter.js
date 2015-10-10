var util = Npm.require('util')
var OperationHelper = apac.OperationHelper;

getHarryPotterBooks = function() {
  var opHelper = new OperationHelper({
  awsId:     Meteor.settings.AWSAccessKeyId,
  awsSecret: Meteor.settings.AWSSecretKey,
  assocId:   Meteor.settings.assocId
  // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options) 
  });


 
  // execute(operation, params, callback)
  // operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html 
  // params: parameters for operation (optional) 
  // callback(err, parsed, raw): callback function handling results. err = potential errors raised from xml2js.parseString() or http.request(). parsed = xml2js parsed response. raw = raw xml response. 
 
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'Keywords': 'harry potter',
    'ResponseGroup': 'ItemAttributes,Offers'
  }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js 
      console.log(results);
  });

}