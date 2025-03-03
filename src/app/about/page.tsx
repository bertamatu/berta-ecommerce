import { WEB_APP_TITLE } from '../Constants';

const AboutPage = () => {
  return (
    <main className="text-black max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="text-black mb-6">About Us</h1>
        <section>
          <p className="text-black mb-6">
            Welcome to {WEB_APP_TITLE} your trusted destination for quality
            products. We started our journey with a simple mission: to provide
            our customers with the best shopping experience possible.
          </p>
        </section>
        <section>
          <h2 className="text-black mb-6">Our Story</h2>
          <p className="text-black mb-6">
            Founded in 2024, {WEB_APP_TITLE} has grown from a small local store
            to a trusted online retailer. We take pride in our carefully curated
            selection of products and our commitment to customer satisfaction.
          </p>
        </section>
        <section>
          <h2 className="text-black mb-6">Our Mission</h2>
          <p className="text-black mb-6">
            Our mission is to provide high-quality products at competitive
            prices while delivering exceptional customer service. We believe in
            building long-lasting relationships with our customers based on
            trust and reliability.
          </p>
        </section>
      </article>
    </main>
  );
};

export default AboutPage;
