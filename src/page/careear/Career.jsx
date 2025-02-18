import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { scrollToTop } from "../../utilites/utilites";

const CareerPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className=" min-h-screen pb-12">
      {/* Header Section */}
      <header className="bg-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Join Our_ Mission</h1>
          <p className="mt-4 text-lg">
            Be the change you want to see in the world. Join us as a passionate
            volunteer and make a difference today!
          </p>
        </div>
      </header>

      <Container>
        {/* Why Join Us Section */}
        <section className="py-16 ">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">
              Why Join Us?
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 dark:bg-background rounded-lg shadow-md box">
                <h3 className="text-xl font-bold text-gray-700">
                  Make an Impact
                </h3>
                <p className="mt-4 text-gray-600">
                  Contribute your time and skills to bring positive changes to
                  communities and lives.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-background rounded-lg shadow-md box">
                <h3 className="text-xl font-bold text-gray-700">
                  Build Connections
                </h3>
                <p className="mt-4 text-gray-600">
                  Join a network of passionate volunteers and build meaningful
                  relationships.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-background rounded-lg shadow-md box">
                <h3 className="text-xl font-bold text-gray-700">
                  Grow Yourself
                </h3>
                <p className="mt-4 text-gray-600">
                  Gain valuable experience, develop new skills, and grow
                  personally and professionally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities Section */}
        <section className="py-16 bg-gray-100 dark:bg-background-dark">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Volunteer Opportunities
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Explore the opportunities to join our various initiatives and make
              an impact.
            </p>
            <div className="mt-8 flex justify-center">
              <Link className="px-6 py-3 bg-secondary text-white rounded-lg text-lg shadow hover:bg-secondary-light transition">
                Explore Opportunities
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-white dark:bg-background-dark">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Ready to Make a Difference?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Sign up today and join our team of passionate volunteers.
              Together, we can create a better tomorrow.
            </p>
            <div className="mt-8">
              <Link className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-lg shadow hover:bg-primary-dark transition">
                Join as a Volunteer
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default CareerPage;
