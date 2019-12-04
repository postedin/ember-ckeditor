import ClassicEditor from './classic-editor';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';

class CommentEditor extends ClassicEditor {
  constructor(...args) {
    super(...args);

    let view = this.ui.view;
    view.stickyPanel.setTemplate({
      tag: 'div',
      attributes: {},
      children: [],
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
