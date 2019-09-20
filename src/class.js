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

      return this.fetch_(Utilities.formatString('/%s/batch-run/%s/', projectName, batchRunNo), {method: 'get'});
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
