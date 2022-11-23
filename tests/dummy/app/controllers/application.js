import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { htmlSafe } from "@ember/string";
import {
	ClassicEditor,
	CommentEditor,
	DecoupledEditor,
	// SimpleUploadAdapter,
	injectExternalLinkPaste,
} from "@postedin/ckeditor5-build-combined";

class Editor {
	@tracked value;

	name;
	editor;
	options;
	injectPaste;
	replaceContentClass;

	constructor(
		name,
		editor,
		value,
		options,
		{ injectPaste, replaceContentClass } = {}
	) {
		this.name = name;
		this.editor = editor;
		this.value = value;
		this.options = options;
		this.injectPaste = injectPaste;
		this.replaceContentClass = replaceContentClass;
	}

	@action
	setValue(value) {
		this.value = htmlSafe(value);
	}

	@action
	onReady(editor) {
		if (this.injectPaste) {
			injectExternalLinkPaste(editor);
		}
	}
}

export default class ApplicationController extends Controller {
	classic = ClassicEditor;
	options = {
		language: "es",
	};
	value = "";

	editors = [
		new Editor(
			"Postedin Classic Editor",
			ClassicEditor,
			'<p><img src="image.png" /></p>',
			{
				language: "en",
				link: {
					addTargetToExternalLinks: true,
				},
			},
			{ injectPaste: true }
		),
		new Editor("Postedin Comment Editor", CommentEditor, "", {
			language: "en",
		}),
		new Editor(
			"Postedin Decoupled Document Editor",
			DecoupledEditor,
			`<img src="image.png" /><h2 style="text-align:center;">The Flavorful Tuscany Meetup</h2><h3 style="text-align:center;">Welcome letter</h3><p>Dear Guest,</p><p>We are delighted to welcome you to the annual <i>Flavorful Tuscany Meetup</i> and hope you will enjoy the programme as well as your stay at the <a href="https://ckeditor.com">Bilancino Hotel</a>.</p><p>Please find below the full schedule of the event.</p><figure class="table ck-widget ck-widget_with-selection-handle" contenteditable="false"><div class="ck ck-widget__selection-handle"><svg class="ck ck-icon" viewBox="0 0 16 16"><path d="M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z"></path><path fill-opacity=".256" d="M1 1h14v14H1z"></path><g class="ck-icon__selected-indicator"><path d="M7 0h2v1H7V0zM0 7h1v2H0V7zm15 0h1v2h-1V7zm-8 8h2v1H7v-1z"></path><path fill-opacity=".254" d="M1 1h14v14H1z"></path></g></svg></div><table><thead><tr><th class="ck-editor__editable ck-editor__nested-editable" contenteditable="true" colspan="2"><span>Saturday, July 14</span></th></tr></thead><tbody><tr><td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true"><span>9:30 AM - 11:30 AM</span></td><td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true"><p><strong>Americano vs. Brewed</strong> - “know your coffee” with:&nbsp;</p><ul><li>Giulia Bianchi</li><li>Stefano Garau</li><li>Giuseppe Russo</li></ul></td></tr><tr><td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true"><span>1:00 PM - 3:00 PM</span></td><td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true"><p><strong>Pappardelle al pomodoro</strong> - live cooking</p><p>Incorporate the freshest ingredients&nbsp;<br>with Rita Fresco</p></td></tr><tr><td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true"><span>5:00 PM - 8:00 PM</span></td><td class="ck-editor__editable ck-editor__nested-editable" contenteditable="true"><span><strong>Tuscan vineyards at a glance</strong> - wine-tasting&nbsp;<br>with Frederico Riscoli</span></td></tr></tbody></table></figure><blockquote><p>The annual Flavorful Tuscany meetups are always a culinary discovery. You get the best of Tuscan flavors during an intense one-day stay at one of the top hotels of the region. All the sessions are lead by top chefs passionate about their profession. I would certainly recommend to save the date in your calendar for this one!</p><p>Angelina Calvino, food journalist</p></blockquote><p>Please arrive at the <a href="https://ckeditor.com">Bilancino Hotel</a> reception desk <mark class="marker-yellow">at least half an hour earlier</mark> to make sure that the registration process goes as smoothly as possible.</p><p>We look forward to welcoming you to the event.</p><p><strong>Victoria Valc</strong></p><p><strong>Event Manager</strong></p><p><strong>Bilancino Hotel</strong></p></div>`,
			{
				language: "es",
			}
		),
		new Editor(
			"Postedin Classic Editor: es, ck-content removed",
			ClassicEditor,
			"",
			{
				language: "es",
			},
			{ injectPaste: true, replaceContentClass: true }
		),
	];

	@tracked
	uploads = [];

	@action
	uploaded(upload) {
		this.uploads = [...this.uploads, upload];
	}
}
