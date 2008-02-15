Test.Unit.Testcase.addMethods({
  assertDifference: function(expr, fn, count) {
    var message = arguments[3] || 'Should be equal';
    var orig = eval(expr);
    fn();
    var after = eval(expr);
    this.assertEqual(orig + count, after, message);
  },

  assertNoDifference: function(expr, fn) {
    var message = arguments[2] || 'Should be equal';
    this.assertDifference(expr, fn, 0, message);
  },
});