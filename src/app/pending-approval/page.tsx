import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hourglass, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function PendingApprovalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center justify-center text-center mb-8">
         <div className="bg-primary p-3 rounded-full mb-4">
          <Leaf className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-5xl font-headline text-primary-foreground">Verdant Vista</h1>
      </div>

      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-3 w-fit mb-2">
            <Hourglass className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Approval Pending</CardTitle>
          <CardDescription>
            Your account has been created successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            An administrator needs to approve your account before you can access the shop. You will be notified via email once your account is active. Thank you for your patience.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
