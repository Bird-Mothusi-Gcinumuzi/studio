import { StatCard } from '@/components/admin/stat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { checkoutLogs, users } from '@/lib/data';
import { format } from 'date-fns';
import { DollarSign, ShoppingCart, Users, Hourglass } from 'lucide-react';

export default function DashboardPage() {
  const totalSales = checkoutLogs.reduce((sum, log) => sum + log.total, 0);
  const totalCheckouts = checkoutLogs.length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const approvedUsers = users.filter(u => u.status === 'approved').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalSales.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4" />}
          description="Total revenue from all checkouts"
        />
        <StatCard
          title="Total Checkouts"
          value={`+${totalCheckouts}`}
          icon={<ShoppingCart className="h-4 w-4" />}
          description="Total number of completed checkouts"
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
                    <div className="font-medium">{log.userName}</div>
                    <div className="text-sm text-muted-foreground">{log.userId}</div>
                  </TableCell>
                  <TableCell>{format(log.timestamp, 'PPpp')}</TableCell>
                  <TableCell className="text-right">${log.total.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{log.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
