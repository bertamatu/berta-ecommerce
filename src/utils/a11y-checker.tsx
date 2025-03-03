'use client';

import React, { useEffect, useState } from 'react';

interface A11yIssue {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: { html: string; target: string[] }[];
}

/**
 * A development-only component that checks for accessibility issues
 * Only include this component in development builds
 */
export const A11yChecker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = useState<A11yIssue[]>([]);
  const [showIssues, setShowIssues] = useState(false);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const runA11yCheck = async () => {
      try {
        // Dynamically import axe-core only in development
        const axe = await import('axe-core');

        // Wait for the component to render
        setTimeout(async () => {
          const results = await axe.default.run(document);
          if (results.violations.length > 0) {
            // Type cast to ensure compatibility
            setIssues(results.violations as unknown as A11yIssue[]);
          }
        }, 1000);
      } catch (error) {
        console.error('Error running accessibility check:', error);
      }
    };

    runA11yCheck();
  }, []);

  if (process.env.NODE_ENV !== 'development' || issues.length === 0) {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      {/* Accessibility issues panel */}
      <div
        style={{
          position: 'fixed',
          bottom: showIssues ? '0' : '-400px',
          left: '0',
          right: '0',
          background: '#f8d7da',
          borderTop: '2px solid #842029',
          padding: '10px',
          zIndex: 9999,
          transition: 'bottom 0.3s ease',
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={() => setShowIssues(!showIssues)}
          style={{
            position: 'absolute',
            top: '-30px',
            right: '20px',
            background: '#842029',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {showIssues ? 'Hide' : `Show A11y Issues (${issues.length})`}
        </button>

        <h2 style={{ color: '#842029', margin: '0 0 10px' }}>
          Accessibility Issues: {issues.length}
        </h2>

        <ul style={{ padding: '0 0 0 20px', margin: 0 }}>
          {issues.map((issue) => (
            <li key={issue.id} style={{ marginBottom: '10px' }}>
              <div>
                <strong>Impact: </strong>
                <span
                  style={{
                    color:
                      issue.impact === 'critical'
                        ? '#842029'
                        : issue.impact === 'serious'
                          ? '#664d03'
                          : issue.impact === 'moderate'
                            ? '#0f5132'
                            : '#055160',
                  }}
                >
                  {issue.impact}
                </span>
              </div>
              <div>
                <strong>Description: </strong>
                {issue.description}
              </div>
              <div>
                <strong>Help: </strong>
                {issue.help}
              </div>
              <div>
                <a
                  href={issue.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0d6efd' }}
                >
                  Learn more
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
