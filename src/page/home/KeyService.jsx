import {
  FaBookMedical,
  FaHeartbeat,
  FaStethoscope,
  FaSyringe,
} from "react-icons/fa";
import Container from "../../components/Container";

const KeyServices = () => {
  const services = [
    {
      icon: <FaStethoscope size={30} className="text-accent" />,
      title: "Free Medical Checkups",
      description:
        "Providing comprehensive health assessments to ensure early detection and treatment.",
    },
    {
      icon: <FaSyringe size={30} className="text-accent" />,
      title: "Vaccination Drives",
      description:
        "Ensuring communities are protected from preventable diseases through immunization.",
    },
    {
      icon: <FaHeartbeat size={30} className="text-accent" />,
      title: "Health Awareness Campaigns",
      description:
        "Educating individuals on healthy lifestyles and preventive healthcare measures.",
    },
    {
      icon: <FaBookMedical size={30} className="text-accent" />,
      title: "Specialist Consultations",
      description:
        "Bringing expert advice to underserved communities with specialized care.",
    },
  ];

  return (
    <section className="bg-secondary text-white py-12">
      <Container>
        <div className="container mx-auto text-center ">
          <h2 className=" text-3xl md:text-4xl font-bold pb-2">
            Our Key Services
          </h2>
          <p className="text-lg opacity-80 pb-8">
            MediCamp offers a range of essential healthcare services to improve
            the lives of underserved communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                data-aos="zoom-in"
                key={index}
                className="p-6 bg-white dark:bg-background text-primary rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default KeyServices;
