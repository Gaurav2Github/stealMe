var DateTimeFormatter = require('../util/DateTimeFormatter.js');
var VisitTime = function (startTime, endTime) {
	var k = {};
	k.startTime = DateTimeFormatter.format(startTime);
	k.endTime = DateTimeFormatter.format(endTime);

	return k;
};

module.exports = VisitTime;