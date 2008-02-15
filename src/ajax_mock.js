// Utility library to allow mocking of prototypejs Ajax.Request calls
// within unit tests.
// Within tests or setup, use like:
// Ajax.Request.setupMock("/url/under/test", function(request, response) {
//   response.responseJSON = "data";
//   request.options.onComplete(response);
// });


Ajax.Request.setupMock = function(url, block) {
  Ajax.Request.MockedRequests.set(url, block);
};

Ajax.Request.clearMocks = function() {
  Ajax.Request.MockedRequests = $H();
};

Ajax.Request.clearMocks();

Ajax.Request.prototype.requestOrig = Ajax.Request.prototype.request;
Ajax.Request.prototype.request = function(url) {
  var response = new Ajax.Response(this);
  var request  = this;
  var found    = false;
  Ajax.Request.MockedRequests.each(function(mock) {
    if (!found && url == mock[0]) {
      mock[1](request, response);
      found = true;
    }
  });
  if (!found) {
    return this.requestOrig(url);
  }
};
