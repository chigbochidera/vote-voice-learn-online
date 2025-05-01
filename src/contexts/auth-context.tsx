
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  enrolledCourses: string[];
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerificationEmail: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const mockUsers = [
    {
      id: "user-1",
      name: "John Doe",
      email: "user@example.com",
      password: "password123",
      role: "user" as const,
      enrolledCourses: ["course-1", "course-2"],
      isEmailVerified: true,
    },
    {
      id: "admin-1",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin" as const,
      enrolledCourses: [],
      isEmailVerified: true,
    },
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (foundUser) {
          const { password, ...userData } = foundUser;
          setUser(userData);
          toast({
            title: "Login successful",
            description: `Welcome back, ${userData.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = mockUsers.some((u) => u.email === email);
        if (userExists) {
          toast({
            title: "Registration failed",
            description: "Email is already in use",
            variant: "destructive",
          });
          resolve(false);
        } else {
          const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            role: "user" as const,
            enrolledCourses: [],
            isEmailVerified: false,
          };
          setUser(newUser);
          toast({
            title: "Registration successful",
            description: "Please check your email for verification instructions",
          });
          resolve(true);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = mockUsers.some((u) => u.email === email);
        if (userExists) {
          toast({
            title: "Password reset email sent",
            description: "Check your email for a password reset link",
          });
          resolve(true);
        } else {
          toast({
            title: "Email not found",
            description: "No account found with that email address",
            variant: "destructive",
          });
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const resetPassword = async (
    token: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we'd validate the token
        toast({
          title: "Password reset successful",
          description: "Your password has been updated",
        });
        resolve(true);
        setIsLoading(false);
      }, 1000);
    });
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we'd validate the token
        if (user) {
          setUser({ ...user, isEmailVerified: true });
        }
        
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified",
        });
        resolve(true);
        setIsLoading(false);
      }, 1000);
    });
  };

  const resendVerificationEmail = async (): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          toast({
            title: "Verification email sent",
            description: "A new verification email has been sent to your inbox",
          });
          resolve(true);
        } else {
          toast({
            title: "Error",
            description: "You must be logged in to request a verification email",
            variant: "destructive",
          });
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          setUser({ ...user, ...data });
          toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated",
          });
          resolve(true);
        } else {
          toast({
            title: "Update failed",
            description: "You must be logged in to update your profile",
            variant: "destructive",
          });
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        verifyEmail,
        resendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
