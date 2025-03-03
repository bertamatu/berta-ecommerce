import { ROUTES } from '../Constants';

const InteriorPage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Interior Collection</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {ROUTES.INTERIOR.categories.map((category) => (
          <div key={category} className="group relative">
            <div className="aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
              {/* Add category image here */}
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white">{category}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default InteriorPage;
