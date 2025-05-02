
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Our Learning Platform</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl mb-6">
            We provide free educational resources to help people develop skills and knowledge 
            in civic engagement, advocacy, and community leadership.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to democratize access to high-quality educational content. We believe that
            education should be accessible to everyone, regardless of their background or financial situation.
            That's why all our courses are completely free.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li>Comprehensive courses on civic engagement, advocacy, and leadership</li>
            <li>Content created by experienced professionals and educators</li>
            <li>Self-paced learning that fits your schedule</li>
            <li>Certificates of completion for all courses</li>
            <li>Community support and discussion forums</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Accessibility</h3>
              <p>We believe education should be available to everyone, which is why all our courses are free.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Quality</h3>
              <p>We are committed to providing high-quality, accurate, and up-to-date educational content.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Inclusivity</h3>
              <p>Our platform is designed to be welcoming and inclusive to learners from all backgrounds.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p>We foster a supportive community where learners can connect and grow together.</p>
            </div>
          </div>
          
          <div className="my-12 bg-slate-100 dark:bg-slate-800 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start learning?</h2>
            <p className="mb-6">Browse our collection of free courses and begin your learning journey today.</p>
            <Button asChild size="lg">
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
