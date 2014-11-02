INSTALL_PATH = ~/.local/share/gnome-shell/extensions
INSTALL_NAME = toptray@mjnaderi.gmail.com

install: build
	rm -rf $(INSTALL_PATH)/$(INSTALL_NAME)
	mkdir -p $(INSTALL_PATH)/$(INSTALL_NAME)
	cp -r _build/* $(INSTALL_PATH)/$(INSTALL_NAME)
	rm -rf _build
	echo Installed in $(INSTALL_PATH)/$(INSTALL_NAME)

build: compile-schema
	rm -rf _build
	mkdir _build
	cp -r schemas convenience.js extension.js metadata.json prefs.js README.md _build
	echo Build was successfull 

compile-schema: ./schemas/org.gnome.shell.extensions.toptray.gschema.xml
	glib-compile-schemas schemas

clean:
	rm -rf _build