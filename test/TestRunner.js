/* global TestCommon */

function TestRunner() { // eslint-disable-line no-unused-vars
  if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
  } // Class GasTap is ready for use now!

  var test = new GasTap();
  var common = new TestCommon();

  /***** Test cases ******************************/
  testGetSpecificBatchRunResult_(test, common);
  testGetBatchRunResults_(test, common);
  testExecuteBatchRunOnMagicPod_(test, common);
  testUploadFromFileUrl_(test, common);
  testUploadFromGoogleDrive_(test, common);
  testGetAppFiles_(test, common);
  testDeleteAppFile_(test, common);
  /***********************************************/

  test.finish();

  return {
    successd: test.totalSucceed(),
    failed: test.totalFailed(),
    skipped: test.totalSkipped(),
    log: Logger.getLog()
  };
}

function testGetSpecificBatchRunResult_(test, common) {
  var client = common.getClient();
  var projectName = 'android';

  test('getSpecificBatchRunResult()', function (t) {
    var result = client.getSpecificBatchRunResult(projectName, 1);
    t.deepEqual(
      result,
      {
        organization_name: common.orgName,
        project_name: projectName,
        batch_run_number: 1,
        status: 'succeeded',
        started_at: '2020-03-02T01:49:56Z',
        finished_at: '2020-03-02T01:50:25Z',
        test_cases: {
          succeeded: 1,
          total: 1
        },
        'url': Utilities.formatString('https://magic-pod.com/%s/%s/batch-run/1/', common.orgName, projectName)
      },
      'ステータスが"succeeded"のレスポンスが正しいこと');
  });
}

function testGetBatchRunResults_(test, common) {
  var client = common.getClient();
  var projectName = 'android';

  test('getBatchRunResults()', function (t) {
    var result = client.getBatchRunResults(projectName, { min_batch_run_number: 1, max_batch_run_number: 1, count: 1 });
    t.deepEqual(
      result,
      {
        organization_name: common.orgName,
        project_name: projectName,
        batch_runs: [
          {
            batch_run_number: 1,
            status: 'succeeded',
            started_at: '2020-03-02T01:49:56Z',
            finished_at: '2020-03-02T01:50:25Z',
            test_cases: {
              succeeded: 1,
              total: 1
            },
            url: Utilities.formatString('https://magic-pod.com/%s/%s/batch-run/1/', common.orgName, projectName)
          }
        ]
      },
      'ステータスが"succeeded"のレスポンスが正しいこと');
  });
}

function testExecuteBatchRunOnMagicPod_(test, common) {
  var client = common.getClient();
  var projectName = 'android';

  test('executeBatchRunOnMagicPod() - Android', function (t) {
    var result;

    result = client.executeBatchRunOnMagicPod(projectName, {
      os: 'android',
      app_type: 'app_file',
      app_file_number: 'latest',
    });
    t.equal(result.organization_name, common.orgName, 'organization_nameが正しいこと');
    t.equal(result.project_name, projectName, 'project_nameが正しいこと');
    t.equal(typeof result.batch_run_number, 'number', 'batch_run_numberが数字であること');
    t.equal(result.status, 'running', 'statusが正しいこと');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'test_cases'), 'test_casesを含むこと');
    t.equal(result.url, Utilities.formatString('https://magic-pod.com/%s/%s/batch-run/%s/', common.orgName, projectName, result.batch_run_number), 'urlが正しいこと');

    result = client.executeBatchRunOnMagicPod(projectName, {
      os: 'android',
      app_type: 'app_url',
      app_url: common.appFileUrl,
      test_case_numbers: [1],
      send_mail: true,
      retry_count: 1,
      capture_type: 'on_error',
      device_language: 'default',
      device_region: 'Default',
      credentials: { key: 'value' },
      log_level: 'expert'
    });
    t.equal(typeof result.batch_run_number, 'number', 'batch_run_numberが数字であること');
  });
}

function testUploadFromFileUrl_(test, common) {
  var client = common.getClient();
  var projectName = 'android';
  var fileName = Utilities.formatString('Demo-fromUrl_%s', Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss'));

  test('testUploadFromFileUrl()', function (t) {
    var result = client.uploadFromFileUrl(projectName, common.appFileUrl, fileName);
    t.equal(result.file_name, fileName + '.apk', 'file_nameが正しいこと');
    t.equal(typeof result.file_no, 'number', 'file_noが数字であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'created'), 'createdを含むこと');
  });
}

function testUploadFromGoogleDrive_(test, common) {
  var client = common.getClient();
  var projectName = 'android';
  var fileName = Utilities.formatString('Demo-fromGDrive_%s', Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss'));

  test('uploadFromGoogleDrive()', function (t) {
    var result = client.uploadFromGoogleDrive(projectName, common.appFileSharedUrl, fileName);
    t.equal(result.file_name, fileName + '.apk', 'file_nameが正しいこと');
    t.equal(typeof result.file_no, 'number', 'file_noが数字であること');
    t.ok(Object.prototype.hasOwnProperty.call(result, 'created'), 'createdを含むこと');
  });
}

function testGetAppFiles_(test, common) {
  var client = common.getClient();
  var projectName = 'android';
  var fileName = Utilities.formatString('Demo-fromUrl_%s', Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss'));

  test('getAppFiles()', function (t) {
    var upload = client.uploadFromFileUrl(projectName, common.appFileUrl, fileName);

    var result = client.getAppFiles(projectName);
    t.ok(Array.isArray(result.app_files), 'app_filesが配列であること');
    t.equal(result.app_files[0].app_file_number, upload.file_no, 'app_file_numberが正しいこと');
    t.equal(result.app_files[0].app_file_name, upload.file_name, 'app_file_nameが正しいこと');
    t.ok(common.compareDateTime(result.app_files[0].app_file_created, upload.created),'app_file_createdが正しいこと');
  });
}

function testDeleteAppFile_(test, common) {
  var client = common.getClient();
  var projectName = 'android';
  var fileName = Utilities.formatString('Demo-fromUrl_%s', Utilities.formatDate(new Date(), 'JST', 'yyyyMMddHHmmss'));

  test('deleteAppFile()', function (t) {
    var upload = client.uploadFromFileUrl(projectName, common.appFileUrl, fileName);

    var result = client.deleteAppFile(projectName, upload.file_no);
    t.equal(result.app_file_number, upload.file_no, 'app_file_numberが正しいこと');
  });
}
