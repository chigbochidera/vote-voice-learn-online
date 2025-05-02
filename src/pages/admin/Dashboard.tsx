
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Bookmark, BarChart, PieChart, Plus, BookOpen, LogOut } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardStats {
  totalUsers: number;
  newUsersThisMonth: number;
  activeEnrollments: number;
  averageCompletionRate: number;
  totalCourses: number;
  mostPopularCourse: string;
}

interface EnrollmentData {
  name: string;
  enrollments: number;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    newUsersThisMonth: 0,
    activeEnrollments: 0,
    averageCompletionRate: 0,
    totalCourses: 0,
    mostPopularCourse: "",
  });
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock stats data
        setStats({
          totalUsers: 157,
          newUsersThisMonth: 24,
          activeEnrollments: 312,
          averageCompletionRate: 67,
          totalCourses: 12,
          mostPopularCourse: "React Fundamentals",
        });
        
        // Mock chart data
        setEnrollmentData([
          { name: "Jan", enrollments: 65 },
          { name: "Feb", enrollments: 78 },
          { name: "Mar", enrollments: 84 },
          { name: "Apr", enrollments: 96 },
          { name: "May", enrollments: 105 },
          { name: "Jun", enrollments: 122 },
        ]);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your platform and view key metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-2 flex items-center">
          <Button asChild>
            <Link to="/admin/courses/create">
              <Plus className="mr-1 h-4 w-4" /> Create Course
            </Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary mr-3" />
              <span className="text-3xl font-bold">{stats.totalUsers}</span>
              <span className="ml-2 text-sm text-green-600">+{stats.newUsersThisMonth} this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bookmark className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-3xl font-bold">{stats.activeEnrollments}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-green-600 mr-3" />
              <span className="text-3xl font-bold">{stats.averageCompletionRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Enrollment chart - takes up 2/3 width on large screens */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrollments" fill="#9b87f5" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick stats - takes up 1/3 width on large screens */}
        <Card>
          <CardHeader>
            <CardTitle>Course Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <span>Total Courses</span>
                </div>
                <span className="font-bold">{stats.totalCourses}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  <span>Most Popular</span>
                </div>
                <span className="font-bold text-right max-w-[150px] truncate" title={stats.mostPopularCourse}>
                  {stats.mostPopularCourse}
                </span>
              </div>
              <div className="pt-4 flex flex-col gap-4">
                <Button asChild variant="outline">
                  <Link to="/admin/courses">Manage Courses</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/admin/users">Manage Users</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/admin/courses/create">Create Course</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Latest Courses</TabsTrigger>
          <TabsTrigger value="users">New Users</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Card>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recently Added Courses</h3>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/courses">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">TypeScript Mastery</p>
                    <p className="text-sm text-gray-500">Added 2 days ago</p>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/admin/courses/course-5/edit">Edit</Link>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Advanced CSS and Sass</p>
                    <p className="text-sm text-gray-500">Added 5 days ago</p>
                  </div>
                  <Button asChild size="sm">
                    <Link to="/admin/courses/course-4/edit">Edit</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recently Joined Users</h3>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/users">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Emily Davis</p>
                    <p className="text-sm text-gray-500">emily@example.com</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin/users">View</Link>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-sm text-gray-500">robert@example.com</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin/users">View</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
