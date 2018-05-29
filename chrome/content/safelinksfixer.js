/* SafelinksFixer namespace */

if (typeof SafelinksFixer == "undefined") {
	var SafelinksFixer = {};

	SafelinksFixer.replaceURL = function(text) {
		var result;
		var reg = /https:\/\/emea.*url=(.*)&data=.*/g;
		while ((result = reg.exec(text)) != null) {
			console.log(result);
			text = text.replace(result[0], decodeURIComponent(result[1]));
			console.log(text)
		}
		return text;
	}

	SafelinksFixer.fixLink = function(link) {
		var origLink = link;

		link.firstChild.data = SafelinksFixer.replaceURL(link.firstChild.data);
		link.href = SafelinksFixer.replaceURL(link.href);

		origSpan.style.fontFamily = "inherit";
		origSpan.style.fontSize = "inherit";
	}

	SafelinksFixer.onLoadMessagePane = function(event) {
		/* Only process when there is a message present */
		if (!gMessageDisplay)
			return;
		if (!gMessageDisplay.displayedMessage)
			return;
		document.removeEventListener("load", SafelinksFixer.onLoadMessagePane, true);
		var mp = document.getElementById('messagepane');
		SafelinksFixer.doFixups(mp.contentDocument);
		document.addEventListener("load", SafelinksFixer.onLoadMessagePane, true);
	};

	SafelinksFixer.doFixups = function(contentDocument) {
		var links = contentDocument.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			try {
				var link = links[i];
				SafelinksFixer.fixLink(link);
			}
			catch (e) {
			}
		}
	};

	SafelinksFixer.init = function() {
		document.addEventListener("load", SafelinksFixer.onLoadMessagePane, true);
	};

	/* for the compose window */
	SafelinksFixer.onLoadComposePane = function(event) {
		var type = GetCurrentEditorType();
		if (type != "htmlmail")
			return;

		var currentEditor = GetCurrentEditor();
		if (currentEditor === null)
			return;
		var currentEditorDom = currentEditor.rootElement;
		SafelinksFixer.doFixups(currentEditorDom);
	};

	SafelinksFixer.initCompose = function() {
		document.addEventListener("load", safelinksFixer.onLoadComposePane, true);
	};
}
