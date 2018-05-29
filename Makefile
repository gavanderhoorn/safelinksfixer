filt := <em:version>%</em:version>
VERSION := $(patsubst $(filt),%,$(filter $(filt), $(shell cat install.rdf)))

dist_EXTRA :=   ./install.rdf \
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
