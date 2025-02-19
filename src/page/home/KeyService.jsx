import {
  FaBookMedical,
  FaHeartbeat,
  FaStethoscope,
  FaSyringe,
} from "react-icons/fa";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import useIntersectionObserver from "../../hooks/useObserve";
import "./keyService.css";

const KeyServices = () => {
  const { elementRef, isVisible } = useIntersectionObserver(0);
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
          <SectionTitle
            feedback={true}
            title="Our Key_ Services"
            subTitle={
              "MediCamp offers a range of essential healthcare services to improve the lives of underserved communities."
            }
          />
          <div
            ref={elementRef}
            className={`grid grid-cols-1 opacity-0 md:grid-cols-2 lg:grid-cols-4 gap-8 ${
              isVisible ? "contentVisible" : ""
            }`}
          >
            {services.map((service, index) => (
              <div
                data-aos="zoom-in"
                key={index}
                className="box p-6 cursor-pointer hover:bg-background bg-white dark:bg-background text-primary rounded-lg hover:scale-[1.02] shadow-lg transition-all duration-300"
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
