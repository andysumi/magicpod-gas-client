[![Run test](https://github.com/andysumi/magicpod-gas-client/actions/workflows/test.yml/badge.svg)](https://github.com/andysumi/magicpod-gas-client/actions/workflows/test.yml)

# magicpod-gas-client

Google Apps Script用の[Magic Pod](https://magic-pod.com/)APIライブラリ

## スクリプトID

`1AqrlQxmypqWIW_x9yF5mLobB2kHy-RARMgTKP8xDudF5hDC9Lr2v5Rrf`

## 使い方

### 事前準備

- [ライブラリをプロジェクトに追加する](https://developers.google.com/apps-script/guides/libraries)
- APIトークンを取得する

### コードサンプル

```js
function myFunction() {
  var app = MagicPodClient.create(PropertiesService.getUserProperties().getProperty('MAGICPOD_TOKEN'), 'your_org_name');

  var res1 = app.executeBatchRunOnMagicPod('your_project_name', {
    app_type: 'app_file',
    app_file_number: 1
  });
  Logger.log(JSON.stringify(res1, null , '\t'));

  var res2 = app.getBatchRunResult('your_project_name', res1.batch_run_number);
  Logger.log(JSON.stringify(res2, null , '\t'));
}
```
