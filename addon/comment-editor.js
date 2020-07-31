import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import ClassicEditor from './classic-editor';

class CommentEditor extends ClassicEditor {
  constructor(...args) {
    super(...args);

    this.on('ready', () => {
      this.ui.view.top.remove(0);
    });
  }
}

CommentEditor.defaultConfig = {
  plugins: [
    'Essentials',
    'Paragraph',
    'Autoformat',
    'Bold',
    'Italic',
    'Link',
    'BlockQuote',
    Code,
  ],
  toolbar: false,
  language: 'en',
};

export default CommentEditor;
