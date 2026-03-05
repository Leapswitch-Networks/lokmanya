    import React, { useEffect, useRef } from 'react';
    import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaItalic, FaListOl, FaListUl, FaUnderline, FaImage, FaLink } from "react-icons/fa";

    const TextEditor = ({ value, onChange, ...props }) => {
        const wysRef = useRef(null);
        const wygRef = useRef(null);

        // Handle key up event to sync content with the state
        useEffect(() => {
            const wys = wysRef.current;
            const wyg = wygRef.current;

            const handleKeyUp = (e) => {
                e.preventDefault();
                let html = e.target.innerHTML;

                // Remove empty <p> or other tags
                html = html.replace(/<p>\s*<\/p>/g, ''); // Remove empty <p> tags
                html = html.replace(/<div>\s*<\/div>/g, ''); // Remove empty <div> tags
                html = html.replace(/<li>\s*<\/li>/g, ''); // Remove empty <li> tags

                // Clean up unwanted tag combinations
                html = html.replace('<li><li>', '<li>');
                html = html.replace('</li></li>', '</li>');
                
                wyg.innerHTML = html.trim();
                onChange(html.trim());
            };

            wys.addEventListener('keyup', handleKeyUp);

            return () => {
                wys.removeEventListener('keyup', handleKeyUp);
            };
        }, [onChange]);

        // Function to format text (bold, italic, etc.)
        const formatText = (command) => {
            if (command === 'h1' || command === 'h2' || command === 'h3' || command === 'h4' || command === 'h5' || command === 'h6' || command === 'p') {
                document.execCommand('formatBlock', false, command);
            } else if (command === 'createlink') {
                const url = prompt('Enter the link here: ', 'http://');
                const target = prompt('Open link in same tab Please Enter 1 ,  \nOpen link in New tab Please Enter 2 ', '2');
                const targetAttr = target === '1' ? '_self' : '_blank';

                if (url) {
                    const selection = window.getSelection();
                    const range = selection.getRangeAt(0);
                    const linkTag = `<a href="${url}" target="${targetAttr}">${range.toString()}</a>`;

                    range.deleteContents();
                    range.insertNode(document.createRange().createContextualFragment(linkTag));

                    onChange(wysRef.current.innerHTML);
                }
            } else {
                document.execCommand(command, false, null);
            }
            wysRef.current.dispatchEvent(new Event('keyup'));
        };

        // Handle button click for formatting
        const handleButtonClick = (command) => () => {
            formatText(command);
        };

        // Handle keyboard shortcuts
        useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.ctrlKey && e.key === '1') {
                    e.preventDefault();
                    formatText('h1');
                } else if (e.ctrlKey && e.key === '2') {
                    e.preventDefault();
                    formatText('h2');
                } else if (e.ctrlKey && e.key === '3') {
                    e.preventDefault();
                    formatText('h3');
                } else if (e.ctrlKey && e.key === '4') {
                    e.preventDefault();
                    formatText('h4');
                } else if (e.ctrlKey && e.key === '5') {
                    e.preventDefault();
                    formatText('h5');
                } else if (e.ctrlKey && e.key === '6') {
                    e.preventDefault();
                    formatText('h6');
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, []);

        // Handle image upload, convert to Base64 and insert into editor
        const handleImageUpload = () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/webp';

            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Image = reader.result;

                        const wys = wysRef.current;
                        const imgTag = `<img src="${base64Image}" alt="Uploaded Image" style="max-width: 100%;" />`;

                        const selection = window.getSelection();
                        const range = selection.getRangeAt(0);

                        if (wys.contains(range.startContainer)) {
                            range.deleteContents();
                            const span = document.createElement('span');
                            span.innerHTML = imgTag;
                            range.insertNode(span);

                            onChange(wys.innerHTML);
                        } else {
                            console.log("Cursor is not in the editable area.");
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };

            fileInput.click();
        };

        return (
            <>
                <div className="formatter formatter_add">
                    <div className="editor-btns">
                        <button type="button" className="editor-btn" onClick={handleButtonClick('bold')}><FaBold /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('italic')}><FaItalic /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('underline')}><FaUnderline /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('insertOrderedList')}><FaListOl /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('insertUnorderedList')}><FaListUl /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('justifyRight')}><FaAlignRight /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('justifyCenter')}><FaAlignCenter /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('justifyLeft')}><FaAlignLeft /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('justifyFull')}><FaAlignJustify /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('h1')}>H1</button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('h2')}>H2</button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('h3')}>H3</button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('h4')}>H4</button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('h5')}>H5</button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('h6')}>H6</button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('p')}>P</button>
                        <button type="button" className="editor-btn" onClick={handleImageUpload}><FaImage /></button>
                        <button type="button" className="editor-btn" onClick={handleButtonClick('createlink')}><FaLink /></button>
                    </div>
                    <div
                        className="edit-text-box edit-text"
                        ref={wysRef}
                        contentEditable="true"
                        rows="15"
                        dangerouslySetInnerHTML={{ __html: value }}
                    ></div>
                    <textarea ref={wygRef} name="report_data" rows="5" value={value} className="reprt_data d-none"></textarea>
                </div>
            </>
        );
    };

    export default TextEditor;
