import Component from '@glimmer/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

const DEBOUNCE_MS = 100;

class CKEditorComponent extends Component {
  editor = null;

  get contentClass() {
    return this.args.contentClass || 'content-scope';
  }

  @action
  watch() {
    if (this.editor) {
      this.editor.isReadOnly = this.args.disabled;
    }
  }

  @action
  cleanUp() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  @action
  handleInsertedToolbar(element) {
    this.toolbarElement = element;
  }

  @action
  async createEditor(element) {
    let editor;

    try {
      editor = await this.editorClass.create(element, this.args.options);

      if (this.documentEditor) {
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

    this.addContentClass(editor, this.contentClass);

    if (this.args.value) {
      editor.setData(this.args.value);
    }

    if (this.args.disabled) {
      editor.isReadOnly = true;
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

  addContentClass(editor, contentClass) {
    let view = editor.ui.view.editable;
    let editingView = view._editingView;

    editingView.change((writer) => {
      const viewRoot = editingView.document.getRoot(view.name);

      writer.addClass(contentClass, viewRoot);
    });
  }

  listenToChanges(editor) {
    editor.model.document.on('change:data', () => {
      const editorInput = () => {
        this.editorInput(editor.getData());
      };

      debounce({}, editorInput, DEBOUNCE_MS);

      // this.debounce = later(() => {
      //   this.editorInput(editor.getData());
      // }, DEBOUNCE_MS);
    });
  }

  listenToFocus(editor) {
    editor.editing.view.document.on('focus', () => this.editorFocus());
    editor.editing.view.document.on('blur', () => this.editorBlur());
  }

  listenToUpload(editor) {
    if (! editor.plugins.has('FileRepository')) {
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
    this.callback(this.args.onInput, value)
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
}

export default CKEditorComponent;
