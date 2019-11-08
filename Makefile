VERSION = $(shell cat manifest.json | grep '"version":' | tr -d '", ' | cut -d':' -f2)

dist_EXTRA :=   ./manifest.json \
		./chrome.manifest \
		./chrome/content/safelinksfixer.png \
		./chrome/content/messenger-overlay.xul \
		./chrome/content/messenger-overlay.js \
		./chrome/content/compose-overlay.xul \
		./chrome/content/compose-overlay.js \
		./chrome/content/safelinksfixer.js

.PHONY: all clean

all: safelinksfixer-$(VERSION).xpi

safelinksfixer-$(VERSION).xpi: $(dist_EXTRA)
	zip -r safelinksfixer-$(VERSION).xpi $^

clean:
	rm -f ./safelinksfixer-*.xpi
