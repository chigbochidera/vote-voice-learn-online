
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAllCourses } from "@/services/api";
import { SearchIcon, BookOpen, User, Clock, Star, ArrowRight, ChevronDown, Filter } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filters = {
    search: searchQuery,
    category: category || undefined,
    difficulty: difficulty || undefined,
  };

  const { courses, isLoading, error } = useAllCourses(filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect in useAllCourses will trigger when searchQuery changes
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-myvomyvo-100 via-white to-white dark:from-myvomyvo-950 dark:via-gray-900 dark:to-gray-900 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
            <div className="max-w-lg">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Learn, Engage, Make a 
                <span className="text-myvomyvo-700 dark:text-myvomyvo-400"> Difference</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of learners and discover courses designed to 
                empower your voice in civic engagement and advocacy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses">
                  <Button className="bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white">
                    Browse All Courses
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-myvomyvo-700 text-myvomyvo-700 hover:bg-myvomyvo-50 dark:border-myvomyvo-500 dark:text-myvomyvo-400">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full max-w-md">
              <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="absolute -top-4 -right-4">
                  <Badge className="bg-myvomyvo-600 hover:bg-myvomyvo-700 px-3 py-1 text-white">
                    <Star className="h-3 w-3 mr-1 fill-white" /> Popular
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Civic Engagement Fundamentals
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">Dr. Maria Johnson</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>2h 30m</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  Learn the fundamentals of civic engagement and how to participate 
                  effectively in democratic processes.
                </p>
                <Link to="/courses/course-1">
                  <Button className="w-full bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white">
                    Enroll Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Find Your Perfect Course
            </h2>
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="sm:w-auto"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterVisible ? 'rotate-180' : ''}`} />
                </Button>
                <Button type="submit" className="bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white sm:w-auto">
                  Search
                </Button>
              </div>
              {isFilterVisible && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="civics">Civics</SelectItem>
                        <SelectItem value="advocacy">Advocacy</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Difficulty
                    </label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Discover our most popular courses and start learning today
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-myvomyvo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-myvomyvo-600 dark:text-myvomyvo-400">Loading courses...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400">
                Error loading courses. Please try again later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className="bg-myvomyvo-50 text-myvomyvo-700 border-myvomyvo-200 dark:bg-myvomyvo-900/30 dark:text-myvomyvo-300 dark:border-myvomyvo-800"
                      >
                        {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
                      >
                        {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <User className="h-4 w-4 mr-1" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-amber-500">
                        <Star className="h-4 w-4 mr-1 fill-amber-500" />
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex space-x-2 w-full">
                      <Link to={`/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-myvomyvo-600 text-myvomyvo-700 hover:bg-myvomyvo-50 dark:border-myvomyvo-400 dark:text-myvomyvo-400 dark:hover:bg-myvomyvo-900/30">
                          <BookOpen className="h-4 w-4 mr-2" /> Details
                        </Button>
                      </Link>
                      <Link to={`/courses/${course.id}/enroll`} className="flex-1">
                        <Button className="w-full bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {courses.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/courses">
                <Button variant="outline" className="border-myvomyvo-600 text-myvomyvo-700 hover:bg-myvomyvo-50 dark:border-myvomyvo-400 dark:text-myvomyvo-400 dark:hover:bg-myvomyvo-900/30">
                  View All Courses <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Learn With Us
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              MyVote MyVoice offers a unique learning experience designed to empower civic engagement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="bg-myvomyvo-100 dark:bg-myvomyvo-900/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-myvomyvo-700 dark:text-myvomyvo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Expert-Led Courses
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from experienced professionals and academics in civic engagement and advocacy.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="bg-myvomyvo-100 dark:bg-myvomyvo-900/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-myvomyvo-700 dark:text-myvomyvo-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Community-Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Engage with a community of like-minded individuals committed to positive change.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="bg-myvomyvo-100 dark:bg-myvomyvo-900/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-myvomyvo-700 dark:text-myvomyvo-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Earn Certificates
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete courses and earn certificates to showcase your civic education achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-myvomyvo-700 dark:bg-myvomyvo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-100 mb-8">
            Join our community today and gain the skills and knowledge to make a meaningful impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-myvomyvo-700 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" className="border-white text-white hover:bg-myvomyvo-600">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
