import ClassicEditor from './classic-editor';

class SimpleEditor extends ClassicEditor {

}

SimpleEditor.defaultConfig = {
  plugins: [
    'Essentials',
    'Paragraph',
    'Autoformat',
    'Bold',
    'Italic',
    'Link',
    'BlockQuote',
    'List',
    'Indent',
  ],
  toolbar: {
    items: [
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'undo', 'redo',
    ],
  },
  language: 'en',
};

export default SimpleEditor;
