VERSION := $(shell awk '/em:version/ {gsub("</?em:version>", "",$$1); print $$1}' install.rdf)

dist_EXTRA :=   ./install.rdf \
		./chrome.manifest \
		./defaults/preferences/prefs.js \
		./chrome/content/about.xul \
		./chrome/content/options.xul \
		./chrome/content/smileyfixer.png \
		./chrome/content/messenger-overlay.xul \
		./chrome/content/messenger-overlay.js \
		./chrome/locale/en-US/about.dtd

.PHONY: all clean dist

all: smileyfixer-$(VERSION).xpi

smileyfixer-$(VERSION).xpi: $(dist_EXTRA)
	zip -r smileyfixer-$(VERSION).xpi $^