const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Product',
      price: 99.99,
      image: '/product1.jpg',
      category: 'Featured',
    },
    // Add more products
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Our Products
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <select className="w-full sm:w-auto rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Featured</option>
            <option>New Arrivals</option>
          </select>
          <select className="w-full sm:w-auto rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <article key={product.id} className="group">
            <a href={`/products/${product.id}`} className="block">
              <figure className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-3xl overflow-hidden mb-4">
                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                  {/* Add product image here */}
                </div>
              </figure>
              <div className="px-2">
                <span className="text-sm text-blue-600 font-medium">
                  {product.category}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-900 font-medium">${product.price}</p>
                  <button className="bg-black text-white px-4 py-2 rounded-full sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ProductsPage;
