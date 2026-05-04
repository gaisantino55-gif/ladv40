'use client';

import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../config/firebase';

export default function AccountPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    notifications: true
  });

  useEffect(() => {
    console.log('[Account] isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);
    
    if (isLoaded && isSignedIn && user) {
      console.log('[Account] Fetching data for user:', user.id);
      const userRef = ref(db, `users/${user.id}`);
      
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log('[Account] Data received:', data);
        if (data) {
          setFormData({
            fullName: data.fullName || user.fullName || '',
            phone: data.phone || '',
            address: data.address || '',
            notifications: data.notifications !== undefined ? data.notifications : true
          });
        } else {
          setFormData(prev => ({
            ...prev,
            fullName: user.fullName || ''
          }));
        }
        setLoading(false);
      }, (error) => {
        console.error('[Account] Firebase Error:', error);
        setLoading(false); // Clear loading even on error
      });

      return () => unsubscribe();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || (loading && isSignedIn)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0faf4]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const userRef = ref(db, `users/${user.id}`);
      await update(userRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setMessage({ type: 'success', text: 'Account details updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update details. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Account Details', icon: 'person' },
    { id: 'history', label: 'Order History', icon: 'history' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <main className="min-h-screen bg-[#f0faf4] pb-20 sm:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Header Section */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-emerald-100 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src={user.imageUrl} 
              alt={user.fullName} 
              className="w-24 h-24 rounded-full border-4 border-emerald-50 shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[14px]">verified</span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-blue-950">{formData.fullName || user.fullName}</h1>
            <p className="text-slate-500 font-medium">{user.primaryEmailAddress?.emailAddress}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                Verified Customer
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                Level 1 Member
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <aside className="w-full md:w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'bg-white text-slate-600 hover:bg-emerald-50'
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-100">
            {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">badge</span>
                  Personal Information
                </h2>
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                        placeholder="+254 700 000000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Delivery Address</label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none min-h-[100px]"
                        placeholder="Street Name, Building, City"
                      />
                    </div>
                  </div>

                  {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${
                      message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/10 active:scale-95"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">receipt_long</span>
                  Order History
                </h2>
                <div className="py-12 text-center">
                  <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">shopping_cart_off</span>
                  <p className="text-slate-500 font-medium">You haven't placed any orders yet.</p>
                  <a href="/products" className="inline-block mt-4 text-emerald-600 font-bold hover:underline">Start Shopping →</a>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">settings_suggest</span>
                  Preferences
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                    <div>
                      <p className="font-bold text-slate-800">Email Notifications</p>
                      <p className="text-xs text-slate-500">Receive updates about your orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.notifications}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setFormData({ ...formData, notifications: val });
                          // Auto save this one
                          update(ref(db, `users/${user.id}`), { notifications: val });
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-800 mb-1">Account Security</p>
                    <p className="text-xs text-slate-500 mb-4">Manage your password and security settings via Clerk</p>
                    <button 
                      onClick={() => window.open(user.publicMetadata?.external_account_url || 'https://accounts.clerk.dev')}
                      className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline"
                    >
                      Manage Security Settings ↗
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
