const ProductPage = ({ params }: { params: { id: string } }) => {
  // In a real app, you would fetch product data based on the ID
  const product = {
    id: params.id,
    name: 'Premium Product',
    price: 99.99,
    description: 'This is a detailed description of the product.',
    images: ['/product1.jpg'],
    features: ['Premium Quality', 'Sustainable Materials', 'Handcrafted'],
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <figure className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Add product image here */}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden">
                {/* Thumbnail images */}
              </button>
            ))}
          </div>
        </figure>
        
        <section className="space-y-6 sm:space-y-8">
          <div>
            <span className="text-sm sm:text-base text-blue-600 font-medium">Premium Collection</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
            <p className="text-2xl sm:text-3xl text-gray-900 font-medium">${product.price}</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="space-y-3 sm:space-y-4 fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:relative sm:p-0 sm:border-0">
            <button className="w-full bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105">
              Add to Cart
            </button>
            <button className="w-full bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105">
              Add to Wishlist
            </button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ProductPage; 