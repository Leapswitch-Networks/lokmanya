import React, { useState } from 'react';

const FaqSection = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

  if (!parsedData || parsedData.length === 0) return null;

  return (
    <div className="faq-container">
      <div className="side-space section-space">
        <h2 className='section-heading'>Frequently Asked Questions</h2>
        {parsedData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className="faq-icon">{expandedIndex === index ? "−" : "+"}</span>
            </div>
            {expandedIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
