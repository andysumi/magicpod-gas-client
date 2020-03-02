/* global TestCommon */

function TestRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon();

  try {
    /***** Test cases ******************************/
    testGetBatchRunResult(test, common);
    /***********************************************/
  } catch (err) {
    test('Exception occurred', function f(assert) {
      Logger.log(err);
      assert.fail(err);
    });
  }

  test.finish();

  return {
    successd: test.totalSucceed(),
    failed: test.totalFailed(),
    skipped: test.totalSkipped(),
    log: Logger.getLog()
  };
}

function testGetBatchRunResult(test, common) {
  test('getBatchRunResult()', function (t) {
    var client = common.getClient();
    var result;

    result = client.getBatchRunResult('android', 1);
    t.deepEqual(
      result, {
        organization_name: 'sandbox',
        project_name: 'android',
        batch_run_number: 1,
        status: 'succeeded',
        test_cases: {
          succeeded: 2,
          total: 2
        },
        'url': 'https://magic-pod.com/sandbox/android/batch-run/1/'
      },
      'deep equal succeeded result');

    result = client.getBatchRunResult('android', 2);
    t.deepEqual(
      result, {
        organization_name: 'sandbox',
        project_name: 'android',
        batch_run_number: 2,
        status: 'failed',
        test_cases: {
          failed: 2,
          total: 2
        },
        'url': 'https://magic-pod.com/sandbox/android/batch-run/2/'
      },
      'deep equal failed result');

    result = client.getBatchRunResult('android', 3);
    t.deepEqual(
      result, {
        organization_name: 'sandbox',
        project_name: 'android',
        batch_run_number: 3,
        status: 'aborted',
        test_cases: {
          aborted: 2,
          total: 2
        },
        'url': 'https://magic-pod.com/sandbox/android/batch-run/3/'
      },
      'deep equal aborted result');

    result = client.getBatchRunResult('android', 7);
    t.deepEqual(
      result, {
        organization_name: 'sandbox',
        project_name: 'android',
        batch_run_number: 7,
        status: 'unresolved',
        test_cases: {
          unresolved: 2,
          total: 2
        },
        'url': 'https://magic-pod.com/sandbox/android/batch-run/7/'
      },
      'deep equal unresolved result');
  });
}
