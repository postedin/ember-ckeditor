import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later, cancel } from '@ember/runloop';

const DEBOUNCE_MS = 300;

class CKEditorComponent extends Component {
	editor = null;

	get contentClass() {
		return this.args.contentClass || 'content-scope';
	}

	@action
	watch() {
		if (this.editor) {
			this.setReadOnly(this.editor, this.args.disabled);
		}
	}

	@action
	cleanUp() {
		if (this.editor) {
			this.editor.destroy();
		}
	}

	@action
	setupToolbar(element) {
		this.toolbarElement = element;
	}

	@action
	async createEditor(element) {
		let editor;

		try {
			editor = await this.args.editor.create(element, this.args.options);

			if (this.args.editor && this.args.editor.document) {
				this.toolbarElement.appendChild(editor.ui.view.toolbar.element);
			}

			this.initialize(editor);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}

	initialize(editor) {
		this.editor = editor;

		this.addContentClass(
			editor,
			this.contentClass,
			this.args.replaceContentClass
		);

		if (this.args.value) {
			editor.setData(this.args.value);
		}

		if (this.args.disabled) {
			this.setReadOnly(editor, true);
		}

		// right away we send the new value back because ckeditor will strip stuff not supported
		if (this.args.value !== editor.getData()) {
			this.editorInput(editor.getData());
		}

		this.listenToChanges(editor);
		this.listenToFocus(editor);
		this.listenToUpload(editor);

		this.callback(this.args.onReady, editor);
	}

	addContentClass(editor, contentClass, replace = false) {
		let view = editor.ui.view.editable;
		let editingView = view._editingView;

		editingView.change((writer) => {
			const viewRoot = editingView.document.getRoot(view.name);

			writer.addClass(contentClass, viewRoot);

			if (replace) {
				writer.removeClass('ck-content', viewRoot);
			}
		});
	}

	listenToChanges(editor) {
		editor.model.document.on('change:data', () => {
			let debounceMs = parseInt(this.args.debounce);

			if (isNaN(debounceMs)) {
				debounceMs = DEBOUNCE_MS;
			}

			if (this.debounce) {
				cancel(this.debounce);
			}

			this.debounce = later(() => {
				let data = this.fixPaste(editor.getData());

				if (data !== editor.getData()) {
					editor.setData(data);
				}

				this.editorInput(editor.getData());
			}, debounceMs);
		});
	}

	fixPaste(html) {
		let randomCodes = [
			'&lt;!--td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}--&gt;',
			'&lt;!--br {mso-data-placement:same-cell;}--&gt;',
		];

		for (let code of randomCodes) {
			html = html.replace(`<p>${code}</p>`, '').replace(code, '');
		}

		return html;
	}

	listenToFocus(editor) {
		editor.editing.view.document.on('focus', () => this.editorFocus());
		editor.editing.view.document.on('blur', () => this.editorBlur());
	}

	listenToUpload(editor) {
		if (!editor.plugins.has('FileRepository')) {
			return;
		}

		let fileRepository = editor.plugins.get('FileRepository');

		if (fileRepository) {
			fileRepository.on('loaderCreated', (event, loader) => {
				loader.on('change:uploadResponse', () => {
					if (loader.uploadResponse) {
						this.editorUpload(loader.uploadResponse);
					}
				});
			});
		}
	}

	callback(callback, ...args) {
		if (this.isDestroying || this.isDestroyed) {
			return;
		}

		if (callback) {
			callback(...args);
		}
	}

	editorInput(value) {
		this.callback(this.args.onInput, value);
	}

	editorFocus() {
		this.callback(this.args.onFocus);
	}

	editorBlur() {
		this.callback(this.args.onBlur);
	}

	editorUpload(response) {
		this.callback(this.args.onUpload, response);
	}

	setReadOnly(editor, readOnly, lockId = 'default') {
		if (typeof editor.enableReadOnlyMode === 'function') {
			editor[readOnly ? 'enableReadOnlyMode' : 'disableReadOnlyMode'](lockId);
		} else {
			editor.isReadOnly = readOnly;
		}
	}
}

export default CKEditorComponent;
