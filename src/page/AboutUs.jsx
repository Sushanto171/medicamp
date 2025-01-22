import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { scrollToTop } from "../utilites/utilites";

const AboutUs = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">About MediCamp</h1>
          <p className="mt-4 text-lg">
            Empowering communities by connecting people with healthcare camps.
            Together, we make healthcare accessible to everyone.
          </p>
        </div>
      </header>
      <Container>
        {/* Our Mission and Vision Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600">
              To improve access to healthcare by organizing medical camps that
              address the needs of underserved communities, bridging the gap
              between medical professionals and those in need.
            </p>
            <h2 className="text-3xl font-semibold text-gray-800 mt-12">
              Our Vision
            </h2>
            <p className="mt-4 text-gray-600">
              A world where quality healthcare is a right, not a privilege. We
              aim to create a platform that makes it easy for everyone to find
              and participate in medical camps.
            </p>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Our Impact
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-4xl font-bold text-secondary">50+</h3>
                <p className="mt-2 text-gray-600">Camps Organized</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-4xl font-bold text-secondary">10K+</h3>
                <p className="mt-2 text-gray-600">Lives Impacted</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-4xl font-bold text-secondary">200+</h3>
                <p className="mt-2 text-gray-600">Volunteers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Meet Our Team
            </h2>
            <p className="mt-4 text-gray-600">
              MediCamp is built by a passionate team dedicated to improving
              healthcare accessibility.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Replace with dynamic team members later */}
              <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
                <img
                  src="https://i.ibb.co/YbLVvkQ/team-member-1.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-700">
                  John Doe
                </h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
                <img
                  src="https://i.ibb.co/RhZVfDN/team-member-2.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-700">
                  Jane Smith
                </h3>
                <p className="text-gray-600">Chief Operations Officer</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
                <img
                  src="https://i.ibb.co/18cN6fB/team-member-3.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-700">
                  Mike Johnson
                </h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Want to Learn More?
            </h2>
            <p className="mt-4 text-gray-600">
              Get in touch with us and be part of the MediCamp journey!
            </p>
            <div className="mt-8">
              <Link className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-lg shadow hover:bg-primary-dark transition">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
