'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from './Constants';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { useId } from 'react';

const FEATURED_PRODUCT_IDS = [1, 3, 5];

type IconProps = {
  path: string;
  bgColor: string;
  textColor: string;
};

type ServiceFeatureProps = {
  title: string;
  description: string;
  icon: IconProps;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (id: number) => void;
  priority?: boolean;
};

const serviceFeatures: ServiceFeatureProps[] = [
  {
    title: 'Premium Quality',
    description: 'Carefully selected products that meet our high standards.',
    icon: {
      path: 'M5 13l4 4L19 7',
      bgColor: 'bg-gray-100',
      textColor: 'text-black',
    },
  },
  {
    title: 'Fast Delivery',
    description:
      'Get your products delivered quickly and reliably to your doorstep.',
    icon: {
      path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-gray-100',
      textColor: 'text-black',
    },
  },
  {
    title: 'Secure Payment',
    description:
      'Shop with confidence with our secure and encrypted payment system.',
    icon: {
      path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      bgColor: 'bg-gray-100',
      textColor: 'text-black',
    },
  },
];

const ServiceFeature = ({ title, description, icon }: ServiceFeatureProps) => (
  <div className="p-6 text-center">
    <div
      className={`mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl ${icon.bgColor}`}
      aria-hidden="true"
    >
      <svg
        className={`size-10 ${icon.textColor}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={icon.path}
        />
      </svg>
    </div>
    <h3 className="mb-4 text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProductCard = ({
  product,
  onAddToCart,
  priority = false,
}: ProductCardProps) => {
  const { id, name, image, category, price, discount } = product;

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative h-[280px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-cover object-center"
          priority={priority}
        />
        {discount > 0 && (
          <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {`${discount}% OFF`}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-medium text-gray-900">
          <Link href={`/products/${id}`} className="relative">
            {name}
            <span aria-hidden="true" className="absolute inset-0 z-0" />
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div>
              {discountedPrice ? (
                <div className="flex items-center">
                  <div className="rounded-full bg-black px-3 py-1 text-white shadow-sm transition-all duration-200 hover:shadow">
                    <p className="text-sm font-medium">
                      ${discountedPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500 line-through">
                    ${price.toFixed(2)}
                  </p>
                </div>
              ) : (
                <div className="rounded-full bg-black px-3 py-1 text-white shadow-sm transition-all duration-200 hover:shadow">
                  <p className="text-sm font-medium">${price.toFixed(2)}</p>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onAddToCart(id);
                }}
                className="relative z-20 flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-black transition-all duration-200 hover:scale-105 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                aria-label="Add to cart"
                data-product-id={id}
              >
                <svg
                  className="mr-1 size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const componentId = useId();
  const { addToCart } = useCart();

  const featuredProducts = products.filter(({ id }) =>
    FEATURED_PRODUCT_IDS.includes(id)
  );

  const handleAddToCart = (productId: number) => {
    const product = products.find(({ id }) => id === productId);
    if (!product) return;

    addToCart(product, 1);

    const button = document.querySelector(
      `button[data-product-id="${productId}"]`
    );
    if (button) {
      const feedback = document.createElement('div');
      feedback.className =
        'fixed bottom-4 right-4 z-50 rounded-md bg-black px-4 py-2 text-sm text-white shadow-lg';
      feedback.textContent = `Added ${product.name} to cart`;
      document.body.appendChild(feedback);

      setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          document.body.removeChild(feedback);
        }, 500);
      }, 2000);

      button.classList.add('bg-black', 'text-white');
      setTimeout(() => {
        button.classList.remove('bg-black', 'text-white');
      }, 500);
    }
  };

  return (
    <main className="flex-1" suppressHydrationWarning>
      <section
        className="relative overflow-hidden py-16"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-200 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-gray-900 md:mb-6 md:text-5xl"
            >
              The Future of Shopping
            </h1>
            <p className="mb-8 px-4 text-base text-gray-600 md:mb-10 md:text-lg">
              Discover our curated collection of premium products designed for
              the modern lifestyle.
            </p>
            <div className="flex flex-col justify-center gap-4 px-4 sm:flex-row">
              <Link
                href="/products"
                className="w-full rounded-full bg-black px-6 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 sm:w-auto md:px-8 md:py-4"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-black transition-all duration-200 hover:scale-105 hover:border-gray-300 sm:w-auto md:px-8 md:py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-4" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-center justify-between">
            <div
              id="featured-heading"
              className="text-2xl font-bold text-gray-900"
            >
              Featured Products
            </div>
            <Link
              href="/products"
              className="rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-all duration-200 hover:scale-105 hover:border-gray-300"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={`${componentId}-product-${product.id}`}
                product={product}
                onAddToCart={handleAddToCart}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {serviceFeatures.map((feature) => (
              <ServiceFeature
                key={`${componentId}-feature-${feature.title}`}
                {...feature}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
