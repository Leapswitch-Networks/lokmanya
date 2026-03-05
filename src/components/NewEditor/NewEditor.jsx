import { useState, useEffect, useRef, useMemo, Suspense, memo } from 'react';

import 'ckeditor5/ckeditor5.css';
import './editor.css';

const Editor = ({ data, setData }) => {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [EditorComp, setEditorComp] = useState(null);
	const [ClassicEditorBuild, setClassicEditorBuild] = useState(null);

	useEffect(() => {
		setIsLayoutReady(true);

		const loadEditor = async () => {
			const [{ CKEditor }, { 
				ClassicEditor,
				AccessibilityHelp,
				SourceEditing,
				Alignment,
				Autoformat,
				AutoImage,
				AutoLink,
				Autosave,
				BalloonToolbar,
				Base64UploadAdapter,
				BlockQuote,
				Bold,
				Essentials,
				FindAndReplace,
				Heading,
				Highlight,
				HorizontalLine,
				ImageBlock,
				ImageCaption,
				ImageInline,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				ListProperties,
				MediaEmbed,
				Mention,
				PageBreak,
				Paragraph,
				PasteFromOffice,
				SelectAll,
				SpecialCharacters,
				SpecialCharactersArrows,
				SpecialCharactersCurrency,
				SpecialCharactersEssentials,
				SpecialCharactersLatin,
				SpecialCharactersMathematical,
				SpecialCharactersText,
				Strikethrough,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableProperties,
				TableToolbar,
				TextPartLanguage,
				TextTransformation,
				TodoList,
				Underline,
				Undo,
				Font,
				TableColumnResizeEditing,
				TableCellWidthEditing
			} ] = await Promise.all([
				import('@ckeditor/ckeditor5-react'),
				import('ckeditor5')
			]);

			ClassicEditor.builtinPlugins = [
				SourceEditing,
				Font,
				AccessibilityHelp,
				Alignment,
				Autoformat,
				AutoImage,
				AutoLink,
				Autosave,
				BalloonToolbar,
				Base64UploadAdapter,
				BlockQuote,
				Bold,
				Essentials,
				FindAndReplace,
				Heading,
				Highlight,
				HorizontalLine,
				ImageBlock,
				ImageCaption,
				ImageInline,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				ListProperties,
				MediaEmbed,
				Mention,
				PageBreak,
				Paragraph,
				PasteFromOffice,
				SelectAll,
				SpecialCharacters,
				SpecialCharactersArrows,
				SpecialCharactersCurrency,
				SpecialCharactersEssentials,
				SpecialCharactersLatin,
				SpecialCharactersMathematical,
				SpecialCharactersText,
				Strikethrough,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableColumnResizeEditing,
				TableCellWidthEditing,
				TableProperties,
				TableToolbar,
				TextPartLanguage,
				TextTransformation,
				TodoList,
				Underline,
				Undo
			];

			setEditorComp(() => CKEditor);
			setClassicEditorBuild(() => ClassicEditor);
		};

		loadEditor();

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = useMemo(() => ({
		'width': 'auto',
		heigth: '200px',
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'|',
				'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'underline',
				'|',
				'link',
				'insertImage',
				'insertTable',
				'highlight',
				'blockQuote',
				'|',
				'alignment',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'indent',
				'outdent',
				'sourceEditing'
			],
			shouldNotGroupWhenFull: false
		},
		balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
		heading: {
			options: [
				{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
				{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
				{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
				{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
				{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
				{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
				{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
			]
		},
		image: {
			toolbar: [
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage'
			]
		},
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		mention: {
			feeds: [
				{
					marker: '@',
					feed: []
				}
			]
		},
		menuBar: {
			isVisible: true
		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		}
	}), []);

	return (
		<Suspense fallback={<div>Preparing Editor...</div>}>
			<div>
				<div className="ck-main-container">
					<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
						<div className="editor-container__editor">
							<div ref={editorRef}>
								{isLayoutReady && EditorComp && ClassicEditorBuild ? (
									<EditorComp
										editor={ClassicEditorBuild}
										config={editorConfig}
										onChange={async (event, editor) => {
											const Edata = await editor.getData();
											setData(Edata);
										}}
										data={data}
									/>
								) : (
									<div>Loading Editor...</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
};

export default memo(Editor);
