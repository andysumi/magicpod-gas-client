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
      var extension = url.match(/^https?:\/\/.+\.(app|ipa|apk|zip)/);
      if (!extension) throw new Error('URLの指定が誤っています');

      // ファイルをダウンロード
      var blob = UrlFetchApp.fetch(url).getBlob();

      if (fileName) {
        blob.setName(Utilities.formatString('%s.%s', fileName, extension[1]));
      }

      return this.fetch_(Utilities.formatString('/%s/upload-file/', projectName), { method: 'post', payload: { file: blob} });
    };

    MagicPodClient.prototype.uploadFromGoogleDrive = function (projectName, sharedUrl, fileName) {
      if (!projectName) throw new Error('"projectName"は必須です');
      if (!sharedUrl) throw new Error('"sharedUrl"は必須です');

      var fileId = sharedUrl.match(/^https:\/\/drive\.google\.com\/file\/d\/(.+)\//);
      if (!fileId) throw new Error('URLの指定が誤っています');

      // ファイルを取得 ※アクセス権限がない場合はエラーになる
      var blob = DriveApp.getFileById(fileId[1]).getBlob();

      var extension = blob.getName().match(/\.(app|ipa|apk|zip)/);
      if (!extension) throw new Error('アプリのファイルではありません');

      if (fileName) {
        blob.setName(Utilities.formatString('%s.%s', fileName, extension[1]));
      }

      return this.fetch_(Utilities.formatString('/%s/upload-file/', projectName), { method: 'post', payload: { file: blob } });
    };

    MagicPodClient.prototype.getAppFiles = function (projectName) {
      if (!projectName) throw new Error('"projectName"は必須です');

      return this.fetch_(Utilities.formatString('/%s/list-files/', projectName), { method: 'get' });
    };

    MagicPodClient.prototype.executeBatchRun_ = function (projectName, param) {
      param.device_language = (!param.device_language) ? 'ja' : param.device_language;
      param.device_region = (!param.device_region) ? 'JP' : param.device_region;
      param.test_case_numbers = (!param.test_case_numbers) ? [] : param.test_case_numbers;
      param.send_mail = (!param.send_mail) ? false : param.send_mail;
      param.retry_count = (!param.retry_count) ? 0 : param.retry_count;
      param.capture_type = (!param.capture_type) ? 'on_each_step' : param.capture_type;

      return this.fetch_(Utilities.formatString('/%s/batch-run/', projectName), { method: 'post', payload: JSON.stringify(param) });
    };

    MagicPodClient.prototype.fetch_ = function (endPoint, options) {
      var url = this.apiUrl + endPoint;
      var contentType = (typeof options.payload == 'string') ? 'application/json' : null;
      var response = UrlFetchApp.fetch(url, {
        method: options.method,
        muteHttpExceptions: true,
        contentType: contentType,
        headers: this.headers,
        payload: options.payload || {}
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
