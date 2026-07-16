'use client';
import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What is the connection between ACLS and the Bhagavad Gita?',
    answer: 'This site explores how the technical, evidence-based AHA guidelines for Advanced Cardiovascular Life Support (ACLS) mirror the spiritual and ethical teachings of the Bhagavad Gita. Both systems teach us how to perform our duty with equanimity, focus, and compassion during times of crisis.',
  },
  {
    question: 'Are these the real AHA Guidelines?',
    answer: 'Yes. The medical information is based on the key 2025 AHA Guidelines for CPR and ECC. We integrate these clinical protocols with specific verses from the Bhagavad Gita to provide a holistic approach to emergency care.',
  },
  {
    question: 'How does Karma Yoga apply to resuscitation?',
    answer: 'Karma Yoga, the path of selfless action, teaches us to focus entirely on performing our duty (perfect compressions) without attachment to the outcome (survival statistics). This prevents both anxiety-induced errors and hesitation, enabling optimal clinical performance.',
  },
  {
    question: 'Who is this content for?',
    answer: 'This content is designed for healthcare providers, emergency responders, and anyone interested in the intersection of modern medical science and ancient spiritual wisdom. It offers a unique framework for managing stress and preventing burnout in high-stakes environments.',
  },
  {
    question: 'Can I use this for official ACLS certification?',
    answer: 'No. While the medical guidelines are accurate to the 2025 AHA update, this site is for educational and reflective purposes only. It is not a substitute for official ACLS training or certification provided by the American Heart Association.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-16 px-4"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#e85d04' }}>
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            style={{ color: '#1a1008' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base" style={{ color: '#7a6555' }}>
            Everything you need to know about the Bhagavad Gita.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3" role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemId = `faq-item-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="rounded-xl border-2 overflow-hidden transition-all duration-200"
                style={{
                  background: '#ffffff',
                  borderColor: isOpen ? '#e85d04' : '#e8ddd0',
                  boxShadow: isOpen ? '0 4px 20px rgba(232,93,4,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
                role="listitem"
              >
                <button
                  id={itemId}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors"
                  style={{ background: isOpen ? '#fff8f5' : 'transparent' }}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span
                    className="font-semibold text-base leading-snug"
                    style={{ color: isOpen ? '#e85d04' : '#1a1008' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      background: isOpen ? '#e85d04' : '#f5edd9',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#ffffff' : '#e85d04'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" /><path d="M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={itemId}
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                  }}
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="border-t mb-4" style={{ borderColor: '#f0e4d5' }} />
                    <p className="text-base leading-relaxed" style={{ color: '#5a4535' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
