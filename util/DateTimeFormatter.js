/**
 * Created by John on 20/09/2014.
 */
var moment = require('moment');

exports.format = function(unformattedDateTime) {
    var wholeDateTime = new Date(moment(unformattedDateTime));

    var formattedDate = wholeDateTime.toDateString();
    var formattedTime = wholeDateTime.toTimeString().substring(0, wholeDateTime.toTimeString().indexOf(" GMT"));
    return formattedDate + " " + formattedTime;
};