var colors = require('colors');

var getParsedSection = function(section){

	var title = section + ': ';
	var parsedTitle = title.replace('\n: ', '\n');

	return parsedTitle;

};

var log = {
	info : function(section, message){

		console.log(colors.bold.blue(getParsedSection(section)) + colors.black(message));
	
	},
	error : function(section, message){

		console.log(colors.bold.magenta(getParsedSection(section)) + colors.red(message));

	}
};

module.exports = log;