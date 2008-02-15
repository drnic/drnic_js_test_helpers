<%= include 'HEADER' %>

var DrNic = DrNic || {};
DrNic.JsTestHelpers = {
  Version: '<%= APP_VERSION %>',
};

<%= include 'simulate_events.js', 'ajax_mock.js', 'assertions.js' %>
