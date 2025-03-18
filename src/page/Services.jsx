import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { scrollToTop } from "../utilities/utilities";

const Services = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const services = [
    {
      id: 1,
      title: "Health Check-Up Camps",
      description:
        "Organizing comprehensive health check-ups for communities to identify and address common health concerns.",
      icon: "https://i.ibb.co/CMdpWsx/health-check.png",
    },
    {
      id: 2,
      title: "Vaccination Drives",
      description:
        "Facilitating vaccination programs to protect against preventable diseases, ensuring healthier communities.",
      icon: "https://i.ibb.co/6YgR7p3/vaccine.png",
    },
    {
      id: 3,
      title: "Mental Health Awareness",
      description:
        "Promoting mental well-being by offering counseling sessions and mental health workshops.",
      icon: "https://i.ibb.co/L8k3Rf4/mental-health.png",
    },
    {
      id: 4,
      title: "Blood Donation Camps",
      description:
        "Connecting donors with recipients through regular blood donation drives.",
      icon: "https://i.ibb.co/4s1CzM8/blood-donation.png",
    },
    {
      id: 5,
      title: "Specialist Consultations",
      description:
        "Providing access to expert consultations from specialized doctors during medical camps.",
      icon: "https://i.ibb.co/8mRsqNs/consultation.png",
    },
    {
      id: 6,
      title: "Nutrition Workshops",
      description:
        "Educating communities about balanced diets and nutritional requirements for better health.",
      icon: "https://i.ibb.co/7WTTPHc/nutrition.png",
    },
  ];

  return (
    <div className="pb-12 min-h-screen">
      {/* Header Section */}
      <header className="bg-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <SectionTitle
            feedback={true}
            title={"Our_ Services"}
            subTitle={
              " At MediCamp, we are dedicated to providing essential healthcare services that make a difference in people's lives."
            }
          />
        </div>
      </header>

      <Container>
        {/* Services Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="p-6 box bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-20 h-20 mx-auto"
                  />
                  <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-gray-600 text-center">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Join Us Today
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Become a part of our mission to make healthcare accessible to
              everyone. Whether as a participant, volunteer, or supporter, your
              contribution matters.
            </p>
            <div className="mt-8">
              <Link className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-lg shadow hover:bg-primary-dark transition">
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Services;
