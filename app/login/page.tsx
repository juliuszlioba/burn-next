import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound } from 'lucide-react';
import { login } from './actions';

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
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input id="email" name="email" type="email" placeholder="Email" required />
              </div>
              <div>
                <Input id="password" name="password" type="password" placeholder="Password" required />
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
