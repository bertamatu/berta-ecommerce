'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/contexts/ToastContext';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  memberSince: 'March 2023',
  preferences: {
    darkMode: true,
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacyLevel: 'balanced',
  },
  biometricEnabled: false,
  twoFactorEnabled: true,
  recentOrders: [
    { id: 'ORD-7829', date: '2023-11-15', status: 'Delivered', total: 129.99 },
    { id: 'ORD-6547', date: '2023-10-28', status: 'Delivered', total: 79.5 },
  ],
  savedItems: 4,
  loyaltyPoints: 1250,
  carbonFootprint: {
    score: 'B+',
    reduced: '12kg',
    description: 'Better than 75% of shoppers',
  },
};

type TabType =
  | 'overview'
  | 'orders'
  | 'preferences'
  | 'security'
  | 'sustainability';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const { showToast } = useToast();

  const handleBiometricToggle = () => {
    // In a real app, this would trigger biometric setup
    showToast('Biometric authentication setup would launch here', 'info');
  };

  const handleDataExport = () => {
    showToast(
      'Your data export has been initiated. You will receive an email shortly.',
      'success'
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with user info */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <div className="relative size-16 overflow-hidden rounded-full border-2 border-black">
            <Image
              src={mockUser.avatar}
              alt={mockUser.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold sm:text-3xl">{mockUser.name}</h1>
            <p className="text-gray-600">Member since {mockUser.memberSince}</p>
          </div>
        </div>
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800"
        >
          <svg
            className="mr-2 size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          AI Assistant
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-b">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'orders', label: 'Orders & Returns' },
            { id: 'preferences', label: 'Preferences' },
            { id: 'security', label: 'Privacy & Security' },
            { id: 'sustainability', label: 'Sustainability' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[60vh]">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Stats */}
            <div className="col-span-full grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Loyalty Points</p>
                <p className="mt-1 text-2xl font-semibold">
                  {mockUser.loyaltyPoints}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Saved Items</p>
                <p className="mt-1 text-2xl font-semibold">
                  {mockUser.savedItems}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Carbon Footprint</p>
                <p className="mt-1 text-2xl font-semibold">
                  {mockUser.carbonFootprint.score}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <p className="text-sm text-gray-500">Recent Orders</p>
                <p className="mt-1 text-2xl font-semibold">
                  {mockUser.recentOrders.length}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-lg border p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  View all →
                </Link>
              </div>
              <div className="space-y-4">
                {mockUser.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total}</p>
                      <p className="text-sm text-green-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="rounded-lg border p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">For You</h2>
              <p className="mb-4 text-sm text-gray-600">
                Based on your shopping habits and preferences
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <div className="relative size-12 overflow-hidden rounded-md bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <svg
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Modern Minimalist Chair</p>
                    <p className="text-sm text-gray-500">
                      Similar to your recent purchase
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <div className="relative size-12 overflow-hidden rounded-md bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <svg
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Elegant Minimalist Sofa</p>
                    <p className="text-sm text-gray-500">
                      Completes your living room set
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sustainability Impact */}
            <div className="rounded-lg border p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">
                Your Sustainability Impact
              </h2>
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-full bg-green-100 p-3">
                  <svg
                    className="size-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">
                    You've reduced {mockUser.carbonFootprint.reduced} of CO₂
                  </p>
                  <p className="text-sm text-gray-500">
                    {mockUser.carbonFootprint.description}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  Your sustainable shopping choices have helped plant 3 trees
                  this year.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            <div className="rounded-lg border p-6">
              <h2 className="mb-6 text-xl font-medium">Privacy & Security</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="relative inline-block w-12 select-none">
                    <input
                      type="checkbox"
                      checked={mockUser.twoFactorEnabled}
                      onChange={() => {}}
                      className="peer sr-only"
                      id="toggle-2fa"
                    />
                    <label
                      htmlFor="toggle-2fa"
                      className="block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300 peer-checked:bg-black"
                      aria-label="Toggle two-factor authentication"
                    >
                      <span className="absolute left-1 top-1 block size-4 rounded-full bg-white transition-all peer-checked:left-7"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Biometric Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Use your fingerprint or face to sign in securely
                    </p>
                  </div>
                  <div className="relative inline-block w-12 select-none">
                    <input
                      type="checkbox"
                      checked={mockUser.biometricEnabled}
                      onChange={handleBiometricToggle}
                      className="peer sr-only"
                      id="toggle-biometric"
                    />
                    <label
                      htmlFor="toggle-biometric"
                      className="block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300 peer-checked:bg-black"
                      aria-label="Toggle biometric authentication"
                    >
                      <span className="absolute left-1 top-1 block size-4 rounded-full bg-white transition-all peer-checked:left-7"></span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-3 font-medium">Data & Privacy</h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleDataExport}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Export my data
                    </button>
                    <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left text-sm hover:bg-gray-50">
                      Manage cookies & tracking
                    </button>
                    <button className="w-full rounded-lg border border-red-200 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                      Delete my account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 'orders' ||
          activeTab === 'preferences' ||
          activeTab === 'sustainability') && (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
            <p className="text-gray-500">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content
              would be displayed here
            </p>
          </div>
        )}
      </div>

      {/* AI Assistant Modal */}
      {aiAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Shopping Assistant</h2>
              <button
                onClick={() => setAiAssistantOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4 h-64 overflow-y-auto rounded-lg bg-gray-50 p-4">
              <div className="mb-3 flex">
                <div className="mr-2 shrink-0 rounded-full bg-black p-2">
                  <svg
                    className="size-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="rounded-lg rounded-tl-none bg-gray-200 px-4 py-2">
                  <p>
                    Hello, Alex! How can I help you with your shopping today?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Ask about products, orders, or recommendations..."
                className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              />
              <button className="rounded-r-lg bg-black px-4 py-2 text-white">
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AccountPage;
