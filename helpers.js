function toString(arr, splitter = ', ', braces = true) {
	if (arr.length < 1) {
		return '';
	}
	var result = arr[0];
	for (var i = 1; i < arr.length; i++) {
		result += splitter + arr[i]
	}
	if (braces) {
		result = `[$(result)]`
	}
	return result;
}

module.exports = {
	toString: toString
}