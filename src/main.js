/**
 * MagicPod Clientのインスタンスを作成する
 * @param {String} token 【必須】APIトークン
 * @param {String} orgName 【必須】組織名
 * @return {MagicPodClient} MagicPod Clientのインスタンス
 */
function create(token, orgName) { // eslint-disable-line no-unused-vars
  return new MagicPodClient(token, orgName);
}

/**
 * 一括実行のテスト結果を取得する
 * @param {String} projectName 【必須】プロジェクト名
 * @param {Integer} batchRunNo 【必須】一括実行結果のNo
 * @return {Object}
 */
function getBatchRunResult(projectName, batchRunNo) { // eslint-disable-line no-unused-vars
  throw new Error('このメソッドは直接呼び出せません。createメソッドで取得したインスタンスより呼び出してください。');
}
