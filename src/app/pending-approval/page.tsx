
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PendingApprovalPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pending Approval</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your account has been created and is awaiting approval from an administrator. You will receive an email once your account has been approved.</p>
          <Button disabled className="w-full">Go to Shop</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApprovalPage;
