/**
 * MagicPod Clientのインスタンスを作成する
 * @param {string} token 【必須】APIトークン
 * @param {string} orgName 【必須】組織名
 * @return {MagicPodClient} MagicPod Clientのインスタンス
 */
function create(token, orgName) { // eslint-disable-line no-unused-vars
  return new MagicPodClient(token, orgName);
}

/**
 * 一括実行のテスト結果を取得する
 * @param {string} projectName プロジェクト名
 * @param {number} batchRunNo 一括実行結果のNo
 * @return {Object}
 */
function getBatchRunResult(projectName, batchRunNo) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * MagicPodのクラウド環境でテスト一括実行を実行する
 * @param {string} projectName プロジェクト名
 * @param {Object} param パラメータ
 *   @param {string} param.app_type アプリをクラウドに送信する方法
 *   @param {number} [param.app_file_number] app_typeが"app_file”の場合は必須
 *   @param {string} [param.app_url] app_typeが"app_url”の場合は必須
 *   @param {Array<number>} [param.test_case_numbers=[]] 一括実行で呼び出されるテストケース番号
 *   @param {boolean} [param.send_mail=false] "true"の場合はテスト結果をメンバーに送信
 *   @param {number} [param.retry_count=0] テストが失敗した場合にリトライする回数
 *   @param {string} [param.capture_type='on_each_step'] スクリーンショットを保存する頻度
 *   @param {string} [param.device_language='ja'] デバイスの言語
 *   @param {string} [param.device_region='JP'] デバイスのリージョン
 *   @param {string} [param.credentials] シークレット変数
 * @return {Object}
 */
function executeBatchRunOnMagicPod(projectName, param) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * BrowserStack環境でテスト一括実行を実行する
 * @param {string} projectName プロジェクト名
 * @param {Object} param パラメータ
 *   @param {string} param.external_service_user_name BrowserStackのユーザーネーム
 *   @param {string} param.external_service_key BrowserStackのアクセスキー
 *   @param {string} param.os
 *   @param {string} param.version
 *   @param {string} param.model 設定できる端末 https://www.browserstack.com/list-of-browsers-and-platforms/app_automate
 *   @param {string} param.app_type アプリをクラウドに送信する方法
 *   @param {number} [param.app_file_number] app_typeが"app_file”の場合は必須
 *   @param {string} [param.app_url] app_typeが"app_url”の場合は必須
 *   @param {Array<number>} [param.test_case_numbers=[]] 一括実行で呼び出されるテストケース番号
 *   @param {boolean} [param.send_mail=false] "true"の場合はテスト結果をメンバーに送信
 *   @param {number} [param.retry_count=0] テストが失敗した場合にリトライする回数
 *   @param {string} [param.capture_type='on_each_step'] スクリーンショットを保存する頻度
 *   @param {string} [param.device_language='ja'] デバイスの言語
 *   @param {string} [param.device_region='JP'] デバイスのリージョン
 *   @param {string} [param.credentials] シークレット変数
 * @return {Object}
 */
function executeBatchRunOnBrowserStack(projectName, param) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * SauceLabs環境でテスト一括実行を実行する
 * @param {string} projectName プロジェクト名
 * @param {Object} param パラメータ
 *   @param {string} param.external_service_key SauceLabsのTestObject APIキー
 *   @param {string} param.os
 *   @param {string} param.version
 *   @param {string} param.model
 *   @param {string} param.app_type アプリをクラウドに送信する方法
 *   @param {number} [param.app_file_number] app_typeが"app_file”の場合は必須
 *   @param {string} [param.app_url] app_typeが"app_url”の場合は必須
 *   @param {Array<number>} [param.test_case_numbers=[]] 一括実行で呼び出されるテストケース番号
 *   @param {boolean} [param.send_mail=false] "true"の場合はテスト結果をメンバーに送信
 *   @param {number} [param.retry_count=0] テストが失敗した場合にリトライする回数
 *   @param {string} [param.capture_type='on_each_step'] スクリーンショットを保存する頻度
 *   @param {string} [param.device_language='ja'] デバイスの言語
 *   @param {string} [param.device_region='JP'] デバイスのリージョン
 *   @param {string} [param.credentials] シークレット変数
 * @return {Object}
 */
function executeBatchRunOnSauceLabs(projectName, param) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * ファイルのURLからアプリをMagic Podにアップロードする
 * @param {string} projectName プロジェクト名
 * @param {string} url ファイルのURL
 * @param {string} [fileName] 指定しない場合は、既存のファイル名のまま
 * @return {Object}
 */
function uploadFromFileUrl(projectName, url, fileName) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}

/**
 * GoogleドライブからアプリをMagic Podにアップロードする
 * @param {string} projectName プロジェクト名
 * @param {string} sharedUrl ファイルの共有URL
 * @param {string} [fileName] 指定しない場合は、既存のファイル名のまま
 * @return {Object}
 */
function uploadFromGoogleDrive(projectName, sharedUrl, fileName) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
