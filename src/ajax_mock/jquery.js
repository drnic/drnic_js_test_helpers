// Utility library to allow mocking of prototypejs Ajax.Request calls
// within unit tests.
// Within tests or setup, use like:
// Test.Ajax.setupMock("/url/under/test", function(request, response) {
//   response = "data";
//   request.complete(response);
// });
var Test = Test || {};
Test.Ajax = Test.Ajax || {};
if (typeof jQuery != "undefined") {
  (function($){
    
    Test.Ajax.setupMock = function(url, block) {
      Test.Ajax.prepareMocks();
      Test.Ajax.MockedRequests[url] = block;
    };

    Test.Ajax.clearMocks = function() {
      Test.Ajax.MockedRequests = {};
      if ($.ajaxOrig) {
        $.ajax = $.ajaxOrig;
        $.ajaxOrig = null;
      }
    };

    Test.Ajax.clearMocks();

    Test.Ajax.prepareMocks = function() {
      if (!$.ajaxOrig) {
        $.ajaxOrig = $.ajax;
        $.ajax = function(options) {
          var response = {};
          var mock = Test.Ajax.MockedRequests[options];
          if (!mock) {
            mock = Test.Ajax.MockedRequests[options.url];
          }
          if (mock) {
            mock(options, response);
          } else {
            return $.ajaxOrig(options);
          }
        };
      }
    };
    
  })(jQuery); 
}