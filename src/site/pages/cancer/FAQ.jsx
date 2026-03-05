import React, { useState } from 'react'

const faqs = [
  {
    question: "What are the risks associated with cancer treatments?",
    answer: "While cancer treatments may cause side effects such as fatigue, nausea, or hair loss, our expert team at Lokmanya Hospitals is always available to guide and manage these risks effectively.",
  },
  {
    question: "How long will my recovery take?",
    answer: "Recovery times vary depending on the individual and the specific treatment plan. It can take anywhere from a few weeks to several months, and we’ll be with you every step of the way.",
  },
  {
    question: "Will I need follow-up care after treatment?",
    answer: "Yes, follow-up care is essential. Regular check-ups allow us to monitor for any signs of recurrence and ensure your overall well-being post-treatment.",
  },
];

  
  function FAQ() {
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };
  
    return (
      <section className="faq-container">
        <div className="side-space section-space">
        <h2 className='section-heading'>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className="faq-icon">{expandedIndex === index ? "−" : "+"}</span>
            </div>
            {expandedIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
        </div>
      </section>
    );
  }
  
export default FAQ;
