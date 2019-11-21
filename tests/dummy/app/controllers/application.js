import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import SimpleUploadAdapter from '@postedin/ember-ckeditor/simple-upload-adapter';

export default class ApplicationController extends Controller {
  options = {
    extraPlugins: [ SimpleUploadAdapter ],
    simpleUpload: {
      uploadUrl: '/api/uploads',
    },
  };

  @tracked
  uploads = [];

  @action
  uploaded(upload) {
    console.log(upload);

    this.uploads = [ ...this.uploads, upload ];
  }
}
