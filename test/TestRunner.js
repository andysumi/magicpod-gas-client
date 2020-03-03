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
    testExecuteBatchRunOnMagicPod(test, common);
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

function testExecuteBatchRunOnMagicPod(test, common) {
  var projectName = 'android';

  test('executeBatchRunOnMagicPod() - Android', function (t) {
    var client = common.getClient();
    var result;

    result = client.executeBatchRunOnMagicPod(projectName, {
      os: 'android',
      app_type: 'app_file',
      app_file_number: 'latest',
    });
    t.equal(result.organization_name, common.orgName, 'organization_nameが正しいこと');
    t.equal(result.project_name, projectName, 'project_nameが正しいこと');
    t.equal(typeof result.batch_run_number, 'number', 'batch_run_numberが正しいこと');
    t.equal(result.status, 'running', 'statusが正しいこと');
    t.ok(result.hasOwnProperty('test_cases'), 'test_casesを含むこと');
    t.equal(result.url, Utilities.formatString('https://magic-pod.com/%s/%s/batch-run/%s/', common.orgName, projectName, result.batch_run_number), 'urlが正しいこと');

    result = client.executeBatchRunOnMagicPod(projectName, {
      os: 'android',
      app_type: 'app_url',
      app_url: 'https://storage.googleapis.com/android-demo-app/Demo.apk',
      test_case_numbers: [1],
      send_mail: true,
      retry_count: 1,
      capture_type: 'on_error',
      device_language: 'default',
      device_region: 'Default',
      credentials: { key: 'value' },
      log_level: 'expert'
    });
    t.equal(typeof result.batch_run_number, 'number', 'batch_run_numberが正しいこと');
  });
}