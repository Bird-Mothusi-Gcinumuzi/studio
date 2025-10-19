'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { StatCard } from '@/components/admin/stat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { DollarSign, ShoppingCart, Users, Hourglass } from 'lucide-react';
import { CheckoutLog, User } from '@/lib/definitions';

const db = getFirestore(app);

export default function DashboardPage() {
  const [checkoutLogs, setCheckoutLogs] = useState<CheckoutLog[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribeCheckouts = onSnapshot(collection(db, 'checkouts'), (querySnapshot) => {
      const logs: CheckoutLog[] = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() } as CheckoutLog);
      });
      setCheckoutLogs(logs);
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const usersData: User[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as User);
      });
      setUsers(usersData);
    });

    return () => {
      unsubscribeCheckouts();
      unsubscribeUsers();
    };
  }, []);

  const totalSales = checkoutLogs.reduce((sum, log) => sum + log.totalValue, 0);
  const totalCheckouts = checkoutLogs.length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const approvedUsers = users.filter(u => u.status === 'active').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Potential Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4" />}
          description="Total value of all checkouts"
        />
        <StatCard
          title="Total Checkouts"
          value={`+${totalCheckouts}`}
          icon={<ShoppingCart className="h-4 w-4" />}
          description="Total number of initiated checkouts"
        />
        <StatCard
          title="Approved Users"
          value={`${approvedUsers}`}
          icon={<Users className="h-4 w-4" />}
          description="Number of active customer accounts"
        />
        <StatCard
          title="Pending Approval"
          value={`${pendingUsers}`}
          icon={<Hourglass className="h-4 w-4" />}
          description="Users awaiting admin approval"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Checkouts</CardTitle>
          <CardDescription>A log of the most recent customer checkouts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkoutLogs.slice(0, 10).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="font-medium">{log.userId}</div>
                  </TableCell>
                  <TableCell>{log.timestamp ? format(log.timestamp.toDate(), 'PPpp') : 'N/A'}</TableCell>
                  <TableCell className="text-right">${log.totalValue.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{log.cartSnapshot.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
