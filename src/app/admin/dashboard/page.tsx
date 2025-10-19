"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { StatCard } from "@/components/admin/stat-card";
import { CheckoutLog } from "@/lib/definitions";

const DashboardPage = () => {
  const [checkouts, setCheckouts] = useState<CheckoutLog[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "checkouts"), (snapshot) => {
      const checkoutsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CheckoutLog[];
      setCheckouts(checkoutsData);
    });

    return () => unsubscribe();
  }, []);

  const totalRevenue = checkouts.reduce((acc, checkout) => acc + checkout.totalValue, 0);
  const totalCheckouts = checkouts.length;
  const averageOrderValue = totalCheckouts > 0 ? totalRevenue / totalCheckouts : 0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard title="Total Checkouts" value={totalCheckouts} />
        <StatCard title="Average Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">All Checkouts</h2>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
          {checkouts.map((checkout) => (
            <div key={checkout.id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <p><strong>Checkout ID:</strong> {checkout.id}</p>
              <p><strong>User ID:</strong> {checkout.userId}</p>
              <p><strong>Total Value:</strong> ${checkout.totalValue.toFixed(2)}</p>
              <p><strong>Timestamp:</strong> {new Date(checkout.timestamp?.toDate()).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;