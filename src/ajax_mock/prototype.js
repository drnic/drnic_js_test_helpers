// Utility library to allow mocking of prototypejs Ajax.Request calls
// within unit tests.
// Within tests or setup, use like:
// Ajax.Request.setupMock("/url/under/test", function(request, response) {
//   response.responseJSON = "data";
//   request.options.onComplete(response);
// });
var Test = Test || {};
if (typeof Prototype != "undefined") {
  Test.Ajax = Test.Ajax || {};

  Test.Ajax.setupMock = function(url, block) {
    Test.Ajax.prepareMocks();
    Test.Ajax.MockedRequests.set(url, block);
  };

  Test.Ajax.clearMocks = function() {
    Test.Ajax.MockedRequests = $H();
    if (Ajax.Request.prototype.requestOrig) {
      Ajax.Request.prototype.request = Ajax.Request.prototype.requestOrig;
      Ajax.Request.prototype.requestOrig = null;
    }
  };

  Test.Ajax.clearMocks();

  Test.Ajax.prepareMocks = function() {
    if (!Ajax.Request.prototype.requestOrig) {
      Ajax.Request.prototype.requestOrig = Ajax.Request.prototype.request;
      Ajax.Request.prototype.request = function(url) {
        var response = new Ajax.Response(this);
        var request  = this;
        var found    = false;
        Test.Ajax.MockedRequests.each(function(mock) {
          if (!found && url == mock[0]) {
            mock[1](request, response);
            found = true;
          }
        });
        if (!found) {
          return this.requestOrig(url);
        }
      }
    }
  };
}