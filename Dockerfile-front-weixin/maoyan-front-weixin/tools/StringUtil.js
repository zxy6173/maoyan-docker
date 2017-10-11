const codes = ["&#xe680;","&#xf8d0;","&#xe921;","&#xe1d5;","&#xe52f;","&#xe766;","&#xe986;","&#xe46c;","&#xf859;","&#xf865;"];
exports.convertUnicode = function(string){
	// console.log(string.replace(new RegExp("&#xf8ca;", 'g'),8));
	for(let i = 0;i < codes.length;i++){
		string = string.replace(new RegExp(codes[i], 'g'),i);
		console.log(string);
	}
	return string;
}