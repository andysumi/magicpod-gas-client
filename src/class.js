(function (global) {
  var MagicPodClient = (function () {
    function MagicPodClient(token, orgName) {
      if (!token) throw new Error('"token"は必須です');
      if (!orgName) throw new Error('"orgName"は必須です');
      this.apiUrl = Utilities.formatString('https://magic-pod.com/api/v1.0/%s', orgName);
      this.headers = {Authorization: 'Token ' + token};
    }

    MagicPodClient.prototype.getBatchRunResult = function (projectName, batchRunNo) {
      if (!projectName) throw new Error('"projectName"は必須です');
      if (!batchRunNo) throw new Error('"batchRunNo"は必須です');

      return this.fetch_(Utilities.formatString('/%s/batch-run/%s/', projectName, batchRunNo), { method: 'get' });
    };

    MagicPodClient.prototype.executeBatchRunOnMagicPod = function (projectName, param) {
      if (!projectName) throw new Error('"projectName"は必須です');
      if (!param) throw new Error('"param"は必須です');

      param.environment = 'magic_pod';
      param.os = 'ios';
      param.device_type = 'simulator';
      param.version = '12.2';
      param.model = 'iPhone 8';

      return this.executeBatchRun_(projectName, param);
    };

    MagicPodClient.prototype.executeBatchRunOnBrowserStack = function (projectName, param) {
      if (!projectName) throw new Error('"projectName"は必須です');
      if (!param) throw new Error('"param"は必須です');

      param.environment = 'browserstack';
      param.device_type = 'real_device';

      return this.executeBatchRun_(projectName, param);
    };

    MagicPodClient.prototype.executeBatchRunOnSauceLabs = function (projectName, param) {
      if (!projectName) throw new Error('"projectName"は必須です');
      if (!param) throw new Error('"param"は必須です');

      param.environment = 'saucelabs';
      param.device_type = 'real_device';

      return this.executeBatchRun_(projectName, param);
    };

    MagicPodClient.prototype.uploadFromFileUrl = function (projectName, url, fileName) {
      if (!projectName) throw new Error('"projectName"は必須です');
      if (!url) throw new Error('"url"は必須です');
      var result = url.match(/^https?:\/\/.+\.(app|ipa|apk|zip)/);
      if (!result) throw new Error('URLの指定が誤っています');

      // ファイルをダウンロード
      var blob = UrlFetchApp.fetch(url).getBlob();
      var fileFullName = (fileName) ? Utilities.formatString('%s.%s', fileName, result[1]) : blob.getName();
      blob.setName(fileFullName);

      return this.fetch_(Utilities.formatString('/%s/upload-file/', projectName), { method: 'post', payload: { file: blob} });
    };

    MagicPodClient.prototype.executeBatchRun_ = function (projectName, param) {
      param.device_language = (!param.device_language) ? 'ja' : param.device_language;
      param.device_region = (!param.device_region) ? 'JP' : param.device_region;
      param.test_case_numbers = (!param.test_case_numbers) ? [] : param.test_case_numbers;
      param.send_mail = (!param.send_mail) ? false : param.send_mail;
      param.retry_count = (!param.retry_count) ? 0 : param.retry_count;
      param.capture_type = (!param.capture_type) ? 'on_each_step' : param.capture_type;

      return this.fetch_(Utilities.formatString('/%s/batch-run/', projectName), { method: 'post', payload: param });
    };

    MagicPodClient.prototype.fetch_ = function (endPoint, options) {
      var url = this.apiUrl + endPoint;
      var response = UrlFetchApp.fetch(url, {
        method: options.method,
        muteHttpExceptions: true,
        contentType: 'application/json; charset=utf-8',
        headers: this.headers,
        payload: JSON.stringify(options.payload) || {}
      });

      try {
        return JSON.parse(response.getContentText('utf-8'));
      } catch (e) {
        return response.getContentText('utf-8');
      }
    };

    return MagicPodClient;
  })();
  return global.MagicPodClient = MagicPodClient;
})(this);
