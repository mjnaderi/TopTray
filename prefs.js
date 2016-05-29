// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 4 -*-

/*
    Copyright © 2014 Mohammad Javad Naderi

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Mainloop = imports.mainloop;

const Gettext = imports.gettext.domain('toptray');
const _ = Gettext.gettext;
const N_ = function(e) { return e };

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
    Convenience.initTranslations();
}


const WorkspaceSettingsWidget = new GObject.Class({
    Name: 'WorkspaceIndicator.WorkspaceSettingsWidget',
    GTypeName: 'WorkspaceSettingsWidget',
    Extends: Gtk.Box,

    _init: function(params) {
        this.parent(params);
        this.settings = Convenience.getSettings('org.gnome.shell.extensions.toptray');

        let notebook = new Gtk.Notebook();

        /* SETTINGS */

        let toptraySettings = new Gtk.Box({orientation:Gtk.Orientation.VERTICAL});
        let toptraySettingsTitle = new Gtk.Label({label: _("Main Settings")});

        let toptraySettingsMain1 = new Gtk.Box({spacing:30,orientation:Gtk.Orientation.HORIZONTAL, homogeneous:true,
                                             margin:10});
        indentWidget(toptraySettingsMain1);

        let toptraySettingsControl1 = new Gtk.Box({spacing:30, margin_left:10, margin_top:10, margin_right:10});

        /* Icon Size Setting */

        let toptraySettingsGrid1= new Gtk.Grid({row_homogeneous:true,column_homogeneous:false});

        let iconSizeLabel = new Gtk.Label({label: _("Icon Size [px]"), use_markup: true, xalign: 0,hexpand:true});
        let iconSizeWidget = new Gtk.SpinButton({halign:Gtk.Align.END});
                iconSizeWidget.set_sensitive(true);
                iconSizeWidget.set_range(0, 32);
                iconSizeWidget.set_value(this.settings.get_int('icon-size'));
                iconSizeWidget.set_increments(1, 2);
                iconSizeWidget.connect('value-changed', Lang.bind(this, function(button){
                    let s = button.get_value_as_int();
                    this.settings.set_int('icon-size', s);
                    Main.refresh();
                }));

        toptraySettingsGrid1.attach(iconSizeLabel, 0,0,1,1);
        toptraySettingsGrid1.attach(iconSizeWidget, 1,0,1,1);

        toptraySettingsMain1.add(toptraySettingsGrid1);

        toptraySettings.add(toptraySettingsControl1);
        toptraySettings.add(toptraySettingsMain1);

        notebook.append_page(toptraySettings, toptraySettingsTitle);

        this.add(notebook);
    }
});



function buildPrefsWidget() {
    let widget = new WorkspaceSettingsWidget({orientation: Gtk.Orientation.VERTICAL, spacing:5, border_width:5});
    widget.show_all();

    return widget;
}


/*
 * Add a margin to the widget:
 *  left margin in LTR
 *  right margin in RTL
 */
function indentWidget(widget){

    let indent = 20;

    if(Gtk.Widget.get_default_direction()==Gtk.TextDirection.RTL){
        widget.set_margin_right(indent);
    } else {
        widget.set_margin_left(indent);
    }
}
