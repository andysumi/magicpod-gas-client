var TestCommon = function TestCommon() {
  var properties = PropertiesService.getUserProperties();
  this.token = properties.getProperty('token');
  this.orgName = properties.getProperty('orgName');
};

TestCommon.prototype.getClient = function getClient() {
  this.client = new MagicPodClient(this.token, this.orgName);
  return this.client;
};
