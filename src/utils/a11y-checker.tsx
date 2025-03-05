'use client';

import React, { useEffect, useState, useRef } from 'react';

// Create a static lock to prevent concurrent runs across component instances
let axeRunLock = false;

interface A11yIssue {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: { html: string; target: string[] }[];
}

// Type for the axe module
type AxeModule = {
  default: {
    run: (context: Document) => Promise<{
      violations: A11yIssue[];
    }>;
  };
};

/**
 * A development-only component that checks for accessibility issues
 * Only include this component in development builds
 *
 * This component uses axe-core to scan the DOM for accessibility issues
 * and displays them in a panel at the bottom of the screen.
 *
 * It's designed to help developers identify and fix accessibility issues
 * during development, not for production use.
 */
export const A11yChecker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = useState<A11yIssue[]>([]);
  const [showIssues, setShowIssues] = useState(false);
  const isRunningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const axeRef = useRef<AxeModule | null>(null);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    // Function to load axe-core
    const loadAxe = async () => {
      if (!axeRef.current) {
        try {
          // Dynamically import axe-core only in development
          axeRef.current = (await import('axe-core')) as AxeModule;
        } catch (error) {
          console.error('Error loading axe-core:', error);
        }
      }
      return axeRef.current;
    };

    const runA11yCheck = async () => {
      // Skip if already running in this instance or globally
      if (isRunningRef.current || axeRunLock) return;

      try {
        // Set running flags
        isRunningRef.current = true;
        axeRunLock = true;

        // Load axe if not already loaded
        const axe = await loadAxe();
        if (!axe) return;

        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Use a debounced approach to prevent multiple runs
        timerRef.current = setTimeout(async () => {
          try {
            // Check if document is available (client-side only)
            if (typeof document === 'undefined') return;

            // Run the accessibility check
            const results = await axe.default.run(document);
            if (results.violations.length > 0) {
              setIssues(results.violations);
            }
          } catch (error) {
            console.error('Error during axe.run:', error);
          } finally {
            // Reset running flags
            isRunningRef.current = false;
            axeRunLock = false;
          }
        }, 1500); // Increased timeout to ensure components are fully rendered
      } catch (error) {
        console.error('Error running accessibility check:', error);
        // Reset running flags on error
        isRunningRef.current = false;
        axeRunLock = false;
      }
    };

    // Run the check
    runA11yCheck();

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Only reset the instance flag, not the global lock
      isRunningRef.current = false;
    };
  }, []);

  // Don't render anything in production or if no issues found
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
