const CartPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart items */}
          <div className="space-y-4">{/* Add cart items here */}</div>
        </div>

        <div>
          {/* Order summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {/* Add order summary here */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
