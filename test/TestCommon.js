var TestCommon = function TestCommon() {
  var properties = PropertiesService.getUserProperties();
  this.token = properties.getProperty('token');
  this.orgName = properties.getProperty('orgName');
  this.appFileUrl = properties.getProperty('appFileUrl');
  this.appFileSharedUrl = properties.getProperty('appFileSharedUrl');
};

TestCommon.prototype.getClient = function getClient() {
  this.client = new MagicPodClient(this.token, this.orgName);
  return this.client;
};

TestCommon.prototype.compareDateTime = function compareDateTime(appFileCreated, created) {
  var a = Moment.moment.unix(appFileCreated);
  var b = Moment.moment(created);
  return a.isSame(b, 'second');
};
