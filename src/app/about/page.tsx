import { WEB_APP_TITLE } from '../Constants';

// Define section content as structured data
const sections = [
  {
    id: 'intro',
    content: `Welcome to ${WEB_APP_TITLE} your trusted destination for quality
      products. We started our journey with a simple mission: to provide
      our customers with the best shopping experience possible.`,
  },
  {
    id: 'story',
    title: 'Our Story',
    content: `Founded in 2024, ${WEB_APP_TITLE} has grown from a small local store
      to a trusted online retailer. We take pride in our carefully curated
      selection of products and our commitment to customer satisfaction.`,
  },
  {
    id: 'mission',
    title: 'Our Mission',
    content: `Our mission is to provide high-quality products at competitive
      prices while delivering exceptional customer service. We believe in
      building long-lasting relationships with our customers based on
      trust and reliability.`,
  },
];

// Reusable section component
const Section = ({
  title,
  content,
  id,
}: {
  title?: string;
  content: string;
  id: string;
}) => (
  <section id={id}>
    {title && <h2 className="mb-6 text-black">{title}</h2>}
    <p className="mb-6 text-black">{content}</p>
  </section>
);

// Using arrow function with implicit return
const AboutPage = () => (
  <main className="mx-auto max-w-7xl px-4 py-8 text-black sm:px-6 lg:px-8">
    <article className="prose max-w-none">
      <h1 className="mb-6 text-black">About Us</h1>
      {/* Using map with destructuring to render sections */}
      {sections.map(({ id, title, content }) => (
        <Section key={id} id={id} title={title} content={content} />
      ))}
    </article>
  </main>
);

export default AboutPage;
