$(function() {
	$(".semester-view").sortable({
		connectWith: ".semester-view",		// specifies lists where li's can be dropped
		placeholder: "placeholder-highlight"	// css class for placeholder when drag'n dropping
	}).disableSelection();				// disableSelection makes text selection impossible
});
