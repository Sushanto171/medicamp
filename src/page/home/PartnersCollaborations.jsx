import Marquee from "react-fast-marquee";
import SectionTitle from "../../components/SectionTitle";
const partners = [
  {
    id: 1,
    name: "Red Cross",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Logo_of_the_Red_Cross.svg/2048px-Logo_of_the_Red_Cross.svg.png",
  },
  {
    id: 2,
    name: "Doctors Without Borders",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Doctors_Without_Borders_logo.svg/2560px-Doctors_Without_Borders_logo.svg.png",
  },
  {
    id: 3,
    name: "WHO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/WHO_logo.svg/2048px-WHO_logo.svg.png",
  },
  {
    id: 4,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/UNICEF_Logo.svg/1280px-UNICEF_Logo.svg.png",
  },
  {
    id: 5,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/UNICEF_Logo.svg/1280px-UNICEF_Logo.svg.png",
  },
  {
    id: 6,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/UNICEF_Logo.svg/1280px-UNICEF_Logo.svg.png",
  },
  {
    id: 8,
    name: "Doctors Without Borders",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Doctors_Without_Borders_logo.svg/2560px-Doctors_Without_Borders_logo.svg.png",
  },
  {
    id: 7,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/UNICEF_Logo.svg/1280px-UNICEF_Logo.svg.png",
  },
];

export default function PartnersCollaborations() {
  return (
    <section className="py-12 ">
      <div>
        <SectionTitle title="Partners & Collaborations" />
      </div>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          We proudly collaborate with these organizations.
        </p>

        <Marquee className="py-4 mt-4 " pauseOnHover={true}>
          <div className="flex ">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white cursor-pointer mx-4 rounded-xl shadow-lg p-4 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
