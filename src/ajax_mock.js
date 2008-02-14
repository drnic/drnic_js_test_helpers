Ajax.Request.setupMock = function(url, block) {
  Ajax.Request.MockedRequests.set(url, block);
};

Ajax.Request.clearMocks = function() {
  Ajax.Request.MockedRequests = $H();
};

Ajax.Request.clearMocks();

Ajax.Request.prototype.request = function(url) {
  var response = new Ajax.Response(this);
  var request  = this;
  Ajax.Request.MockedRequests.each(function(mock) {
    if (url == mock[0]) mock[1](request, response);
  });
  // this.options.onComplete(response);
};
