var log = require('./Log');

var Radar = function () {};

Radar.prototype.start = function(){
	this.startDate = new Date();
};

Radar.prototype.end = function(namespace){

	this.endDate = new Date();

	var duration = this.endDate - this.startDate;

	log.info('Radar', namespace + ': ' + duration + ' miliseconds.');

};

module.exports = Radar;