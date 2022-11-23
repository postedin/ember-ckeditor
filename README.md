# CKEditor 5 component for Ember.js

@postedin/ember-ckeditor

**Un**official [CKEditor 5](https://ckeditor.com/ckeditor-5/) rich text editor component for Ember.js.

## Why we made it

[Postedin](https://www.postedin.com) is a content creation platform. A good rich text editor is at the core of our product. Our platform uses [Ember.js](https://emberjs.com) so we naturally need a good integration with CKEditor 5 which we consider to be the best editor for the browser by a long shot.

## What is next

### For 1.0.0

- write a proper readme with proper documentation
- write a proper contributing guide
- some basic tests

### Wishlist

- hopefully get changes we want into CKEditor instead of running custom builds or extending things
- full extensive testing
- autocomplete plugin (similar to gmail suggestions when writing an email)
- sources plugin (add a source that we can list at the bottom of the document)

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v12 or above

## Installation

```
ember install @postedin/ember-ckeditor
```

## Usage

TODO: proper detailed usage

You need to have a build to use with this component. We use a combined build, so we can use multiple different custom versions (https://github.com/postedin/ckeditor5-build-combined). You can use any build like the official classic (https://www.npmjs.com/package/@ckeditor/ckeditor5-build-classic).

You will need to import the build and use it in the component.

For example, make an `Editor` component. We added a basic option and it will update the value.

```js
// components/editor.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class EditorComponent extends Component {
	classicEditor = ClassicEditor;
	value = '';
	options = {
		link: {
			addTargetToExternalLinks: true,
		},
	};

	@action
	handleInput(value) {
		this.value = value;

		if (this.args.onChanged) {
			this.args.onChanged(value); // for consuming this component and getting the updated value
		}
	}
}
```

```html
<!-- components/editor.hbs -->
<CKEditor
	@editor="{{this.classicEditor}}"
	@value="{{this.value}}"
	@options="{{this.options}}"
	@onInput="{{this.handleInput}}"
/>
```

TODO: explain getting languages working

## Contributing

TODO: more details

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
