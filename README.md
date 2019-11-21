CKEditor 5 component for Ember.js
==============================================================================

**Un**official [CKEditor 5](https://ckeditor.com/ckeditor-5/) rich text editor component for Ember.js.

## WORK IN PROGRESS

This integration is a work in progress and currently will only see features we directly need.

## Why we made it

[Postedin](https://postedin.com) is a content creation platform. A good rich text editor is at the core of our product. Our platform uses [Ember.js](https://emberjs.com) so we naturally need a good integration with CKEditor 5 which we consider to be the best editor for the browser by a long shot. 

## What is next

### For 1.0.0

- write a proper readme with proper documentation
- write a proper contributing guide
- some basic tests

### Wishlist

- extract the custom editor builds to their own packages
- hopefully get changes we want into CKEditor instead of running custom builds or extending things
- full extensive testing
- autocomplete plugin (similar to gmail suggestions when writing an email)
- sources plugin (add a source that we can list at the bottom of the document)


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install @postedin/ember-ckeditor
```


Usage
------------------------------------------------------------------------------

TODO: proper details

Quick Example:
```hbs
<CKEditor @value={{default}} @onInput={{action (mut default)}} @onUpload={{action 'uploaded'}} @options={{this.options}} />
```


Contributing
------------------------------------------------------------------------------

TODO: more details

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
