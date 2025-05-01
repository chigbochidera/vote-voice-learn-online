
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertTriangle, Mail } from "lucide-react";

const VerifyEmail = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      setIsVerifying(true);
      try {
        // Mock API call to verify email
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        if (token) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        setIsSuccess(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    setIsVerifying(true);
    // Mock API call to resend verification email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerifying(false);
    // Show success toast
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Email Verification
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Verifying your email address
          </p>
        </div>

        <Card className="p-6">
          {isVerifying ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-12 w-12 text-myvomyvo-600 animate-spin" />
              <p className="text-lg font-medium">Verifying your email...</p>
            </div>
          ) : isSuccess ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Email Verified</AlertTitle>
                <AlertDescription>
                  Your email has been successfully verified. You can now access all features of the platform.
                </AlertDescription>
              </Alert>
              <div className="text-center mt-6">
                <Button
                  className="w-full bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Verification Failed</AlertTitle>
                <AlertDescription>
                  We couldn't verify your email address. The link may have expired or is invalid.
                </AlertDescription>
              </Alert>
              <div className="text-center mt-6">
                <Button
                  className="w-full bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white"
                  onClick={handleResendVerification}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" /> Resend Verification Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
