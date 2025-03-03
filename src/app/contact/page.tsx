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
}) => (
  <div className="mb-4 flex items-start">
    <div className="mr-3 shrink-0 text-blue-600">
      <span className="material-icons">{icon}</span>
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
