/* SafelinksFixer namespace */

if (typeof SafelinksFixer == "undefined") {
	var SafelinksFixer = {};

	SafelinksFixer.replaceURL = function(text) {
		var result;
		var regexes = new Array(
			new RegExp('https:\/\/urldefense\.proofpoint\.com\/v2\/url\\?u=(\\S+)&d.*', "g"),
			new RegExp("https:\/\/.*\.safelinks\.protection.*url=(.*)&data=.*reserved=0", "g"),
			new RegExp("https:\/\/.*\.safelinks\.protection.*url=(.*)&amp;data=.*reserved=0", "g"),
			new RegExp("https:\/\/.*\.safelinks\.protection.*url=(.*)&sdata=.*reserved=0", "g"),
			new RegExp("https:\/\/.*\.safelinks\.protection.*url=(.*)&amp;sdata=.*reserved=0", "g")
		);
		var i;
		var res;
		for (i=0; i<regexes.length; i++) {
			reg = regexes[i];
			while ((result = reg.exec(text)) != null) {
				res = result[1].replace(/-/g, '%').replace(/_/g, '/');
				//console.log("Replacing ", result[0], " with ", decodeURIComponent(res));
				return text.replace(result[0], decodeURIComponent(res));
			}
		}
		return text;
	}

	SafelinksFixer.fixLink = function(link) {
		link.firstChild.data = SafelinksFixer.replaceURL(link.firstChild.data);
		link.href = SafelinksFixer.replaceURL(link.href);
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

	SafelinksFixer.doComposeFixups = function(currentEditorDom) {
		(function iterate_node(node) {
			if (node.nodeType == 3) {
				var text = SafelinksFixer.replaceURL(node.data);
				node.data = text;
			} else if (node.nodeType == 1) {
				for (var i=0; i<node.childNodes.length; i++) {
					iterate_node(node.childNodes[i]);
				}
			}
		})(currentEditorDom);
	}

	SafelinksFixer.init = function() {
		document.addEventListener("load", SafelinksFixer.onLoadMessagePane, true);
	};

	/* for the compose window */
	SafelinksFixer.onLoadComposePane = function(event) {
		var type = GetCurrentEditorType();
		if (type != "htmlmail") {
			return;
		}

		var currentEditor = GetCurrentEditor();
		if (currentEditor === null)
			return;

		var currentEditorDom = currentEditor.rootElement;
		SafelinksFixer.doFixups(currentEditorDom);
		SafelinksFixer.doComposeFixups(currentEditorDom);
	};

	SafelinksFixer.initCompose = function() {
		document.addEventListener("load", SafelinksFixer.onLoadComposePane, true);
	};
}
