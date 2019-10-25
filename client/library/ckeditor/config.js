/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'links' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	config.uiColor = '#ffffff';
	config.removePlugins = 'resize';
	config.removePlugins = "elementspath";
	config.extraPlugins = 'confighelper';
	config.extraPlugins = 'wordcount';
	config.startupShowBorders = false;
	config.removePlugins = 'resize';
	config.wordcount = {

		// Whether or not you want to show the Paragraphs Count
		showParagraphs: true,
	
		// Whether or not you want to show the Word Count
		showWordCount: true,
	
		// Whether or not you want to show the Char Count
		showCharCount: false,
	
		// Whether or not you want to count Spaces as Chars
		countSpacesAsChars: false,
	
		// Whether or not to include Html chars in the Char Count
		countHTML: false,
		
		// Maximum allowed Word Count, -1 is default for unlimited
		maxWordCount: 5000,
	
		// Maximum allowed Char Count, -1 is default for unlimited
		maxCharCount: 1000,
	
		// Add filter to add or remove element before counting (see CKEDITOR.htmlParser.filter), Default value : null (no filter)
		filter: new CKEDITOR.htmlParser.filter({
			elements: {
				div: function( element ) {
					if(element.attributes.class == 'mediaembed') {
						return false;
					}
				}
			}
		})
	};

};
