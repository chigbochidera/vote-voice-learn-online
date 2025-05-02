
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Search, MoreHorizontal, Shield, ShieldOff, UserX } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  role: "user" | "admin";
  status: "active" | "inactive";
  joinedAt: string;
}

const ManageUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers: User[] = [
          {
            id: "user-1",
            name: "John Doe",
            email: "john@example.com",
            enrolledCourses: 3,
            role: "user",
            status: "active",
            joinedAt: "2023-01-15",
          },
          {
            id: "user-2",
            name: "Jane Smith",
            email: "jane@example.com",
            enrolledCourses: 5,
            role: "user",
            status: "active",
            joinedAt: "2023-02-20",
          },
          {
            id: "user-3",
            name: "Robert Johnson",
            email: "robert@example.com",
            enrolledCourses: 1,
            role: "user",
            status: "inactive",
            joinedAt: "2023-03-10",
          },
          {
            id: "admin-1",
            name: "Admin User",
            email: "admin@example.com",
            enrolledCourses: 0,
            role: "admin",
            status: "active",
            joinedAt: "2022-12-01",
          },
          {
            id: "user-4",
            name: "Emily Davis",
            email: "emily@example.com",
            enrolledCourses: 2,
            role: "user",
            status: "active",
            joinedAt: "2023-04-05",
          },
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleRole = (userId: string) => {
    setUsers(users.map((user) => {
      if (user.id === userId) {
        const newRole = user.role === "admin" ? "user" : "admin";
        toast.success(`User role updated to ${newRole} successfully`);
        return {
          ...user,
          role: newRole,
        };
      }
      return user;
    }));
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map((user) => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "inactive" : "active";
        toast.success(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
        return {
          ...user,
          status: newStatus,
        };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage user accounts on the platform
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Enrolled Courses</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-center">{user.enrolledCourses}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "default" : "outline"}
                        className={user.role === "admin" ? "bg-primary/10 text-primary hover:bg-primary/10" : ""}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "outline"}
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.role === "admin" ? (
                            <DropdownMenuItem onClick={() => handleToggleRole(user.id)}>
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Remove Admin Role
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleToggleRole(user.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                          )}
                          {user.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                              <UserX className="mr-2 h-4 w-4" />
                              Activate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
