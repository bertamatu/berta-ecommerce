'use client';

import { useState } from 'react';

// Contact information data structure
const contactInfo = {
  address: '123 E-Commerce St, Shopping District, City',
  email: 'info@berta-ecommerce.com',
  phone: '+1 (555) 123-4567',
  hours: {
    weekdays: '9:00 AM - 6:00 PM',
    weekends: '10:00 AM - 4:00 PM',
  },
};

// Form field configuration
const formFields = [
  { id: 'name', label: 'Name', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  { id: 'subject', label: 'Subject', type: 'text', required: true },
  { id: 'message', label: 'Message', type: 'textarea', required: true },
];

// Reusable form field component
const FormField = ({
  id,
  label,
  type,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  required: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="mb-2 block font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={id}
        rows={4}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required={required}
        aria-required={required}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required={required}
        aria-required={required}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

// Contact info item component
const ContactInfoItem = ({
  icon,
  title,
  details,
}: {
  icon: string;
  title: string;
  details: string | { [key: string]: string };
}) => {
  // SVG paths for different icons
  const iconPaths: Record<string, string> = {
    location_on:
      'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    email:
      'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    phone:
      'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    access_time:
      'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  };

  return (
    <div className="mb-4 flex items-start">
      <div className="mr-3 shrink-0 text-blue-600">
        <svg
          className="size-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d={iconPaths[icon] || ''} />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {typeof details === 'string' ? (
          <p className="text-gray-600">{details}</p>
        ) : (
          Object.entries(details).map(([key, value]) => (
            <p key={key} className="text-gray-600">
              <span className="font-medium">{key}: </span>
              {value}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

const ContactPage = () => {
  // Using object to store form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Using destructuring in function parameters
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Using spread operator to update state
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Using arrow function with early return pattern
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) return;

    // Form submission logic would go here
    alert(`Thank you for your message! We'll get back to you soon.`);

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Contact Us</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section aria-labelledby="contact-info">
          <h2
            id="contact-info"
            className="mb-4 text-xl font-semibold text-gray-900"
          >
            Contact Information
          </h2>

          <ContactInfoItem
            icon="location_on"
            title="Address"
            details={contactInfo.address}
          />

          <ContactInfoItem
            icon="email"
            title="Email"
            details={contactInfo.email}
          />

          <ContactInfoItem
            icon="phone"
            title="Phone"
            details={contactInfo.phone}
          />

          <ContactInfoItem
            icon="access_time"
            title="Business Hours"
            details={contactInfo.hours}
          />
        </section>

        <section aria-labelledby="contact-form">
          <h2
            id="contact-form"
            className="mb-4 text-xl font-semibold text-gray-900"
          >
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Using map with destructuring to render form fields */}
            {formFields.map(({ id, label, type, required }) => (
              <FormField
                key={id}
                id={id}
                label={label}
                type={type}
                required={required}
                value={formData[id as keyof typeof formData]}
                onChange={handleChange}
              />
            ))}

            <button
              type="submit"
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
