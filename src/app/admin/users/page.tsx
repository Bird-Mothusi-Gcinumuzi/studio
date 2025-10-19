import { users } from '@/lib/data';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UsersPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View, edit, and manage all user accounts in the system.</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={users} />
        </CardContent>
    </Card>
  );
}
