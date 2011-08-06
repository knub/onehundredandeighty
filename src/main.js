var e;

alert("test");

var str = "180";

String.prototype.al = function () {"use strict"; alert("something"); };

for (e in str) {
	if (str.hasOwnProperty(e)) {
		alert(e);
	}
}

str.al();
