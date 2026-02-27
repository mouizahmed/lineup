import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back. Sign in to your account.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" action="/api/auth/login" method="post">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          <Button className="w-full" type="submit">
            Sign in
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <Link className="underline underline-offset-4" href="/register">
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}