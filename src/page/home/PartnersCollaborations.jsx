import Marquee from "react-fast-marquee";
import SectionTitle from "../../components/SectionTitle";

const partners = [
  {
    id: 1,
    name: "Red Cross",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_the_Red_Cross.svg/1280px-Flag_of_the_Red_Cross.svg.png",
  },
  {
    id: 2,
    name: "Doctors Without Borders",
    logo: "https://scontent.fdac177-1.fna.fbcdn.net/v/t39.30808-6/344085792_898186221260126_5368489319762680531_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGRqDIRowi0cZfR3u0j0_qof6DpF96vYOh_oOkX3q9g6PiRk4xq5SRM3F-7hvj_km-TC3MtAMkVLkqh1umUX0xR&_nc_ohc=lpgYGq-6oKwQ7kNvgEtqCbn&_nc_oc=AdgFMVcVzoBBrKpvgp4HpzBcOl3RaHuR7_tz5vpNz4nIbSPHeOi-pYcoPYPwWVgBPkA&_nc_zt=23&_nc_ht=scontent.fdac177-1.fna&_nc_gid=AgaDw49ErKcfdGx7rnRklkT&oh=00_AYBK7VtEQNjpfaxspIDulQLDjGHmweb1ft21hLRI3Vo3NQ&oe=67BA960F",
  },
  {
    id: 4,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/UNICEF_Logo_%28cropped%29.png",
  },
  {
    id: 3,
    name: "WHO",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/who-logo-svg-vector.svg",
  },
  {
    id: 5,
    name: "Red Cross",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_the_Red_Cross.svg/1280px-Flag_of_the_Red_Cross.svg.png",
  },
  {
    id: 6,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/UNICEF_Logo_%28cropped%29.png",
  },
  {
    id: 8,
    name: "Doctors Without Borders",
    logo: "https://scontent.fdac177-1.fna.fbcdn.net/v/t39.30808-6/344085792_898186221260126_5368489319762680531_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGRqDIRowi0cZfR3u0j0_qof6DpF96vYOh_oOkX3q9g6PiRk4xq5SRM3F-7hvj_km-TC3MtAMkVLkqh1umUX0xR&_nc_ohc=lpgYGq-6oKwQ7kNvgEtqCbn&_nc_oc=AdgFMVcVzoBBrKpvgp4HpzBcOl3RaHuR7_tz5vpNz4nIbSPHeOi-pYcoPYPwWVgBPkA&_nc_zt=23&_nc_ht=scontent.fdac177-1.fna&_nc_gid=AgaDw49ErKcfdGx7rnRklkT&oh=00_AYBK7VtEQNjpfaxspIDulQLDjGHmweb1ft21hLRI3Vo3NQ&oe=67BA960F",
  },
  {
    id: 7,
    name: "WHO",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/who-logo-svg-vector.svg",
  },
];

export default function PartnersCollaborations() {
  return (
    <section className="py-12 ">
      <div>
        <SectionTitle title="Partners_ & Collaborations" />
      </div>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          We proudly collaborate with these organizations.
        </p>

        <Marquee className="py-8 cursor-auto" pauseOnHover={true}>
          <div className="flex ">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="box bg-white dark:bg-background dark:shadow-secondary cursor-pointer mx-4 rounded-xl shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
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
