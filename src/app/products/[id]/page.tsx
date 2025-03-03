// Define the params type
type ProductPageParams = {
  params: Promise<{ id: string }>;
};

// Generate static paths for products
export async function generateStaticParams() {
  // In a real app, you would fetch all product IDs from your data source
  // For now, we'll just return a few example IDs
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// Define the page component as async
export default async function ProductPage({ params }: ProductPageParams) {
  // In Next.js 15, params is a Promise that needs to be awaited
  const { id } = await params;

  // Simulate fetching product data (in a real app, this would be an actual API call)
  const productData = await getProductData(id);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <figure className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Add product image here */}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                {/* Thumbnail images */}
              </button>
            ))}
          </div>
        </figure>

        <section className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {productData.name}
            </h1>
            <p className="mt-3 text-3xl text-gray-900">
              ${productData.price.toFixed(2)}
            </p>
          </div>

          <div className="prose prose-sm sm:prose-base text-gray-500">
            <p>{productData.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">Features</h2>
            <ul className="mt-4 space-y-2">
              {productData.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200">
              Add to Cart
            </button>
            <button className="flex-1 bg-white text-black px-6 py-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              Add to Wishlist
            </button>
          </div>
        </section>
      </article>
    </main>
  );
}

// Helper function to simulate fetching product data
async function getProductData(id: string) {
  // In a real app, you would fetch this data from an API
  // For now, we'll just return mock data

  // Simulate a small delay to mimic a network request
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    name: `Premium Product ${id}`,
    price: 99.99,
    description:
      'This is a detailed description of the product. It features premium materials and expert craftsmanship, making it a perfect addition to your collection.',
    images: ['/product1.jpg'],
    features: [
      'Premium Quality',
      'Sustainable Materials',
      'Handcrafted',
      'Lifetime Warranty',
    ],
  };
}
