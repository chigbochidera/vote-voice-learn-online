
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, AlertTriangle, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await forgotPassword(email);
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your email to reset your password
          </p>
        </div>

        <Card className="p-6">
          {isSubmitted ? (
            <div className="space-y-4">
              <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Email Sent</AlertTitle>
                <AlertDescription>
                  We've sent a password reset link to {email}. Please check your
                  inbox and follow the instructions to reset your password.
                </AlertDescription>
              </Alert>
              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="font-medium text-myvomyvo-600 hover:text-myvomyvo-500 dark:text-myvomyvo-400 dark:hover:text-myvomyvo-300"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <Alert variant="default" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle>Password Reset</AlertTitle>
                <AlertDescription>
                  If your email is registered with us, you will receive a password reset link shortly.
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                className="w-full bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" /> Send Reset Link
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-myvomyvo-600 hover:text-myvomyvo-500 dark:text-myvomyvo-400 dark:hover:text-myvomyvo-300"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
