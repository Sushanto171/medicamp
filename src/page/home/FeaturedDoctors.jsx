import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import useIntersectionObserver from "../../hooks/useObserve";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?t=st=1739963239~exp=1739966839~hmac=8027d0197c7452bf0547f1ea3d7be2232ea2d2e1ea9a902903d45b298d825214&w=900",
  },
  {
    id: 2,
    name: "Dr. Kamal Hossain",
    specialty: "Orthopedic Surgeon",
    image:
      "https://img.freepik.com/free-photo/doctor-smiling-with-stethoscope_1154-36.jpg?t=st=1739963416~exp=1739967016~hmac=54677e4d1938e13ed5f7809fff0457482be0ae986d94627fa4a162162899219c&w=740",
  },
];

const volunteers = [
  {
    id: 1,
    name: "Sadia Islam",
    role: "Medical Assistant",
    image:
      "https://img.freepik.com/free-photo/young-woman-doctor-with-clipboard-holding-pen-her-hand-white-background-high-quality-photo_114579-22881.jpg?t=st=1739963479~exp=1739967079~hmac=a453be02dc70f72b0a4600cb3dd0d75c47fa8283a05934c57c2a9389b12e3c1a&w=900",
  },
  {
    id: 2,
    name: "Rifat Mahmud",
    role: "Health Coordinator",
    image:
      "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17814.jpg?t=st=1739963621~exp=1739967221~hmac=db752bc5ada99a603de3d7fbdb7bded38be34c3e836eb91fb2b06766fdfaa645&w=900",
  },
];

const FeaturedDoctors = () => {
  const { elementRef, isVisible } = useIntersectionObserver(0);
  return (
    <section className="py-12 100 text-center">
      <Container>
        <SectionTitle title=" Meet Our Experts & Volunteers" />
        <div
          ref={elementRef}
          className={`grid grid-cols-1 opacity-0 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-12 ${
            isVisible ? "contentVisible" : ""
          }`}
        >
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white box hover:bg-background shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-secondary"
              />
              <h3 className="text-xl font-semibold mt-4">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.specialty}</p>
            </div>
          ))}
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="hover:bg-background box bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={volunteer.image}
                alt={volunteer.name}
                className="w-32 h-32 object-cover mx-auto rounded-full border-4 border-green-400"
              />
              <h3 className="text-xl font-semibold mt-4">{volunteer.name}</h3>
              <p className="text-gray-500">{volunteer.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedDoctors;
