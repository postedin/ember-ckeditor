import BaseUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

class SimpleUploadAdapter extends BaseUploadAdapter {
  init() {
    super.init();

    const { createUploadAdapter } = this.editor.plugins.get('FileRepository');

    this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      const adapter = createUploadAdapter(loader, this.editor.config.get('simpleUpload'));

      adapter._initListeners = function (resolve, reject, file) {
        const { xhr } = adapter;
        const { loader } = this;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());

        xhr.addEventListener('load', () => {
          let { response } = xhr;

          // workaround for FakeRequest not having the correct `response` property, for use in tests/dummy
          if (xhr.constructor.name === 'FakeRequest') {
            response = JSON.parse(xhr.responseText);
          }

          if (!response || response.error) {
            // eslint-disable-next-line no-console
            console.error(response.error);

            return reject(response && response.error && response.error.message ? response.error.message : genericErrorText);
          }

          if (response.url) {
            return resolve({ ...response, default: response.url });
          }

          if (response.urls) {
            return resolve(response.urls);
          }

          return resolve(response);
        });

        if (xhr.upload) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              loader.uploadTotal = event.total;
              loader.uploaded = event.loaded;
            }
          });
        }
      };

      return adapter;
    };
  }
}

export default SimpleUploadAdapter;
