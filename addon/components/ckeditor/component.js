import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later, cancel } from '@ember/runloop';
import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
import InlineEditor from '@postedin/ember-ckeditor/inline-editor';
import ClassicEditor from '@postedin/ember-ckeditor/classic-editor';
import CommentEditor from '@postedin/ember-ckeditor/comment-editor';

const DEBOUNCE_MS = 100;

class CKEditorComponent extends Component {
  editor = null;
  contentClass = 'content-scope';

  get editorClass() {
    if (this.args.editor && this.args.editor.prototype instanceof Editor) {
      return this.args.editor;
    }

    switch (this.args.editor) {
      case 'inline': return InlineEditor;
      case 'comment': return CommentEditor;
    }

    return ClassicEditor;
  }

  get dead() {
    return this.isDestroying || this.isDestroyed;
  }

  @action
  handleInsertElement(element) {
    this.createEditor(element);
  }

  @action
  handleDisable(element, [ disabled ]) {
    if (this.editor) {
      this.editor.isReadOnly = disabled;
    }
  }

  @action
  handleDestroyElement() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  async createEditor(element) {
    let editor;

    try {
      editor = await this.editorClass.create(element, this.args.options);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    this.initialize(editor);
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

    if (this.args.onReady) {
      this.args.onReady(editor);
    }
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
    editor.model.document.on('change', () => {
      if (this.debounce) {
        cancel(this.debounce);
      }

      this.debounce = later(() => {
        this.editorInput(editor.getData());
      }, DEBOUNCE_MS);
    });
  }

  listenToFocus(editor) {
    editor.ui.focusTracker.on('change:isFocused', (event) => {
      if (event.source.isFocused) {
        this.editorFocus();
      } else {
        this.editorBlur();
      }
    });
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

  editorInput(value) {
    if (this.dead) {
      return;
    }

    if (this.args.onInput) {
      this.args.onInput(value);
    }
  }

  editorFocus() {
    if (this.dead) {
      return;
    }

    if (this.args.onFocus) {
      this.args.onFocus();
    }
  }

  editorBlur() {
    if (this.dead) {
      return;
    }

    if (this.args.onBlur) {
      this.args.onBlur();
    }
  }

  editorUpload(response) {
    if (this.dead) {
      return;
    }

    if (this.args.onUpload) {
      this.args.onUpload(response);
    }
  }
}

export default CKEditorComponent;
