import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-amber-300">
      <div className="max-w-4xl bg-green-300 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to our platform! We are committed to providing the best services and ensuring a seamless experience for our users. Our team is dedicated to innovation, customer satisfaction, and delivering high-quality solutions.
        </p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Our Mission</h3>
          <p className="text-gray-600 mt-2">
            Our mission is to revolutionize the way people interact with technology, making it accessible and beneficial for everyone.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Our Vision</h3>
          <p className="text-gray-600 mt-2">
            We envision a future where technology seamlessly integrates into everyday life, enhancing productivity and innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
