const ContactPage = () => {
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
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
