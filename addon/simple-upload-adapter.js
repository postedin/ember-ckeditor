import BaseUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

class SimpleUploadAdapter extends BaseUploadAdapter {
  init() {
    super.init();

    let createUploadAdapter = this.editor.plugins.get('FileRepository').createUploadAdapter;

    this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      let adapter = createUploadAdapter(loader, this.editor.config.get('simpleUpload'));
      let initListeners = adapter._initListeners;

      adapter._initListeners = function (resolve, reject, file) {
        initListeners.call(adapter, resolve, reject, file);

        const xhr = adapter.xhr;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr._eventListeners.load.pop();

        xhr.addEventListener('load', () => {
          let response = xhr.response;

          // workaround for FakeRequest not having the correct `response` property, for use in tests/dummy
          if (xhr.constructor.name === 'FakeRequest') {
            response = JSON.parse(xhr.responseText);
          }

          if (! response || response.error) {
            // eslint-disable-next-line no-console
            console.error(response.error);

            return reject( response && response.error && response.error.message ? response.error.message : genericErrorText );
          }

          if (response.url) {
            return resolve({ ...response, default: response.url });
          }

          if (response.urls) {
            return resolve(response.urls);
          }

          return resolve(response);
        });
      };

      return adapter;
    };
  }
}

export default SimpleUploadAdapter;
