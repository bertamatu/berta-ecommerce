import Link from 'next/link';

// Using array of objects for better organization
const quickLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

// Using object for contact info
const contactInfo = {
  email: 'info@bertashop.com',
  phone: '(123) 456-7890',
  address: '123 Shop Street, City',
};

// Using arrow function component
const Footer = () => {
  // Using template literals for class names
  const headingClass = 'mb-4 text-lg font-semibold text-black';
  const linkClass = 'text-gray-800 hover:text-black';

  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className={headingClass}>BertaShop</h3>
            <p className="text-gray-800">
              Your one-stop shop for quality products.
            </p>
          </div>
          <div>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="space-y-2">
              {/* Using destructuring in map callback */}
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={headingClass}>Contact Info</h3>
            <ul className="space-y-2 text-gray-800">
              {/* Using template literals for contact info */}
              <li>{`Email: ${contactInfo.email}`}</li>
              <li>{`Phone: ${contactInfo.phone}`}</li>
              <li>{`Address: ${contactInfo.address}`}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
