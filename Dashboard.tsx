import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Loader } from 'lucide-react';

import hill1 from "./images/hill1.png";
import hill2 from "./images/hill2.png";
import hill3 from "./images/hill3.png";
import hill4 from "./images/hill4.png";
import hill5 from "./images/hill5.png";
import leaf from "./images/leaf.png";
import plant from "./images/plant.png";
import tree from "./images/tree.png";
interface FoodWaste {
  id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'completed';
  created_at: string;
}

export default function Dashboard() {
  const { user, userType } = useAuth();
  const [foodWaste, setFoodWaste] = useState<FoodWaste[]>([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFoodWaste();
  }, [user, userType]);

  const fetchFoodWaste = async () => {
    try {
      const { data, error } = await supabase
        .from('food_waste')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFoodWaste(data || []);
    } catch (error) {
      console.error('Error fetching food waste:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('food_waste')
        .insert([
          {
            amount: parseFloat(amount),
            hotel_id: user?.id,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      setAmount('');
      fetchFoodWaste();
    } catch (error) {
      console.error('Error submitting food waste:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      const { error } = await supabase
        .from('food_waste')
        .update({ status: 'accepted', fpu_id: user?.id })
        .eq('id', id);

      if (error) throw error;
      fetchFoodWaste();
    } catch (error) {
      console.error('Error accepting food waste:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-zinc-100">
     
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {userType === 'hotel' ? 'Hotel Dashboard' : 'FPU Dashboard'}
      </h1>

      {userType === 'hotel' && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit Food Waste</h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in kg"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {submitting ? <Loader className="animate-spin h-5 w-5" /> : 'Submit'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-semibold">
            {userType === 'hotel' ? 'Your Submissions' : 'Available Food Waste'}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {foodWaste.map((waste) => (
              <li key={waste.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {waste.amount} kg
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(waste.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        waste.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : waste.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {waste.status.charAt(0).toUpperCase() + waste.status.slice(1)}
                    </span>
                    {userType === 'fpu' && waste.status === 'pending' && (
                      <button
                        onClick={() => handleAccept(waste.id)}
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}