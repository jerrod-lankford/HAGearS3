(function(){

	// String.prototype.endsWith polyfill
	if (!String.prototype.endsWith)
	  String.prototype.endsWith = function(searchStr, Position) {
	      // This works much better than >= because
		  // it compensates for NaN:
		  if (!(Position < this.length))
			  Position = this.length;
		  else
			  Position |= 0; // round position

		  return this.substr(Position - searchStr.length,
	                     searchStr.length) === searchStr;
	}

	// String.prototype.startsWith polyfill
	if (!String.prototype.startsWith) {
	    String.prototype.startsWith = function(searchString, position){
	      return this.substr(position || 0, searchString.length) === searchString;
	  };
	}
})();