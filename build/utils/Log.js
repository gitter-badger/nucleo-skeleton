var getParsedSection = function(section){

	var title = section + ': ';
	var parsedTitle = title.replace('\n: ', '\n');

	return parsedTitle;

};

var log = {
	info : function(section, message){

		console.log(getParsedSection(section) + message);
	
	},
	error : function(section, message){

		console.log(getParsedSection(section) + message);

	}
};

module.exports = log;