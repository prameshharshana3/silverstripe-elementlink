/* global tinymce, window */
import i18n from 'i18n';
import TinyMCEActionRegistrar from 'lib/TinyMCEActionRegistrar';
import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {createInsertLinkModal} from 'containers/InsertLinkModal/InsertLinkModal';
import {loadComponent} from 'lib/Injector';
import 'lang/en.js';
import 'lang/fr.js';

const commandName = 'sslinkelement';

// Link to element number
TinyMCEActionRegistrar
    .addAction('sslink', {
        text: i18n._t('Admin.LINKLABEL_ELEMENT', 'Link to Element'),
        // eslint-disable-next-line no-console
        onclick: (editor) => editor.execCommand(commandName),
        priority: 51,
    })
    .addCommandWithUrlTest(commandName, /^\[sitetree_link.+]$/);

const plugin = {
    init(editor) {
        editor.addCommand(commandName, () => {
            const field = window.jQuery(`#${editor.id}`).entwine('ss');

            field.openLinkPhoneDialog();
        });
    },
};

const modalId = 'insert-link__dialog-wrapper--element';
const sectionConfigKey = 'SilverStripe\\Admin\\LeftAndMain';
const formName = 'EditorElementLink';

const InsertLinkPhoneModal = loadComponent(createInsertLinkModal(sectionConfigKey, formName));

jQuery.entwine('ss', ($) => {
    $('textarea.htmleditor').entwine({
        openLinkPhoneDialog() {
            let dialog = $(`#${modalId}`);

            if (!dialog.length) {
                dialog = $(`<div id="${modalId}" />`);
                $('body').append(dialog);
            }
            dialog.addClass('insert-link__dialog-wrapper');

            dialog.setElement(this);
            dialog.open();
        },
    });

    /**
     * Assumes that $('.insert-link__dialog-wrapper').entwine({}); is defined for shared functions
     */
    $(`#${modalId}`).entwine({
        renderModal(isOpen) {
            const handleHide = () => this.close();
            const handleInsert = (...args) => this.handleInsert(...args);
            const attrs = this.getOriginalAttributes();
            const selection = tinymce.activeEditor.selection;
            const selectionContent = selection.getContent() || '';
            const tagName = selection.getNode().tagName;
            const requireLinkText = tagName !== 'A' && selectionContent.trim() === '';

            // create/update the react component
            ReactDOM.render(
                <InsertLinkPhoneModal
                isOpen={isOpen}
                onInsert={handleInsert}
                onClosed={handleHide}
                title={i18n._t('Admin.LINK_ELEMENT', 'Insert element link')}
                bodyClassName="modal__dialog"
                className="insert-link__dialog-wrapper--element"
                fileAttributes={attrs}
                identifier="Admin.InsertLinkElementModal"
                requireLinkText={requireLinkText}
                />,
                this[0]
            );

        },

        getOriginalAttributes() {
            const editor = this.getElement().getEditor();
            const node = $(editor.getSelectedNode());

            let element = (node.attr('href') || '');

            return {
                Link: element,
                Description: node.attr('title'),
            };
        },

        buildAttributes(data) {
            const attributes = this._super(data);

            let href = '';

            let element = attributes.href;

            if (element) {
                href = `${element}`;
            }
            attributes.href = href;

            delete attributes.target;

            return attributes;
        },
    });
});

// Adds the plugin class to the list of available TinyMCE plugins
tinymce.PluginManager.add(commandName, (editor) => plugin.init(editor));
export default plugin;
