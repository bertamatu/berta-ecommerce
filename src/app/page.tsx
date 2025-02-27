import Image from 'next/image';

const HomePage = () => {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32" aria-labelledby="hero-heading">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              The Future of{' '}
              <span className="bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text text-transparent">
                Shopping
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 px-4">
              Discover our curated collection of premium products designed for the modern lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a
                href="/products"
                className="w-full sm:w-auto bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                role="button"
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="w-full sm:w-auto bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105"
                role="button"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 id="featured-heading" className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product cards will go here */}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-gray-600">Carefully selected products that meet our high standards.</p>
            </div>
            {/* Add two more feature boxes */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
