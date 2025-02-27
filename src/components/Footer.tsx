const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">BertaShop</h3>
            <p className="text-gray-800">Your one-stop shop for quality products.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-800 hover:text-black">Products</a></li>
              <li><a href="/about" className="text-gray-800 hover:text-black">About Us</a></li>
              <li><a href="/contact" className="text-gray-800 hover:text-black">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact Info</h3>
            <ul className="space-y-2 text-gray-800">
              <li>Email: info@bertashop.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Shop Street, City</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;