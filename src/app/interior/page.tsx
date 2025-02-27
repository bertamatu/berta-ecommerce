import { ROUTES } from '../Constants';

const InteriorPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Interior Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ROUTES.INTERIOR.categories.map((category) => (
          <div key={category} className="relative group">
            <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
              {/* Add category image here */}
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-xl font-semibold">{category}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default InteriorPage; 