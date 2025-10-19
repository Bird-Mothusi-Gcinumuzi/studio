import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="bg-primary p-3 rounded-full mb-4">
          <Leaf className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-5xl font-headline text-primary-foreground">Verdant Vista</h1>
        <p className="text-muted-foreground mt-2">Create Your Account</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Join our community. All new accounts require admin approval.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           <Button className="w-full" asChild>
            <Link href="/pending-approval">Create Account</Link>
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="underline hover:text-primary">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
        <p className="text-xs text-muted-foreground mt-6 text-center max-w-sm">
        Note: Upon registration, you will be taken to a "Pending Approval" page. In a real application, this would happen automatically after form submission.
      </p>
    </main>
  );
}
