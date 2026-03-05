import React, { useState, useRef, useEffect } from 'react';

const ReadMore = ({ text, maxLines = 10 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const contentHeight = contentRef.current.scrollHeight;
        const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
        const lines = contentHeight / lineHeight;
        setShowButton(lines > maxLines);
    }, [text, maxLines]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <p
                ref={contentRef}
                style={{
                    overflow: isExpanded ? 'visible' : 'hidden',
                    display: isExpanded ? 'block' : '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: isExpanded ? 'none' : maxLines,
                    maxHeight: isExpanded ? 'none' : `${maxLines * 21}px`,
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </p>
            {showButton && (
                <button onClick={toggleReadMore} style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20px' }}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                    <span className={`icon ${isExpanded ? 'rotate' : ''}`}>
                        <svg width="10" height="10" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L7 7.5L13 1.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    );
};

export default ReadMore;
