Test.Unit.Testcase.prototype.assertDifference = function(expr, fn, count) {
  var orig = eval(expr);
  fn();
  var after = eval(expr);
  this.assertEqual(orig + count, after);
};

Test.Unit.Testcase.prototype.assertNoDifference = function(expr, fn) {
  this.assertDifference(expr, fn, 0);
};

Test.Unit.Testcase.prototype.assertTagDifference = function(selector, fn, count) {
  var expr = "document.getElementsByTagName('" + selector + "').length";
  var orig = eval(expr);
  fn();
  var after = eval(expr);
  this.assertEqual(orig + count, after);
};