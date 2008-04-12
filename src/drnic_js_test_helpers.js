<%= include 'HEADER' %>

var DrNic = DrNic || {};
DrNic.JsTestHelpers = {
  Version: '<%= APP_VERSION %>',
};

<%= include 'simulate_events.js', 'assertions.js' %>
<%= include 'ajax_mock/prototype.js', 'ajax_mock/jquery.js' %>
