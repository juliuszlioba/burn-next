import { Input } from '@/components/ui/input';
import { login } from './actions';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center p-4 space-y-4 max-w-lg mx-auto w-full h-full">
        <Card className="w-full">
          <CardHeader className="flex items-center gap-2">
            <div className="bg-background p-2 rounded-full">
              <KeyRound strokeWidth={2} />
            </div>
            <div>
              <CardTitle>Login</CardTitle>
              <CardDescription>Only Admin Login</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form>
              <div>
                <label htmlFor="email">Email:</label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex gap-2">
                <Button formAction={login} className="w-full items-end">
                  Log in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
    </div>
  );
}
