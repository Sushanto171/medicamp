import { Typography } from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import Container from "../../components/Container";

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-primary text-white p-8">
      <Container>
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
          <img src={logo} alt="logo-ct" className="w-36" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 opacity-80">
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal text-white hover:text-accent focus:text-accent"
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal text-white hover:text-accent focus:text-accent"
              >
                License
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal text-white hover:text-accent focus:text-accent"
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal  text-white hover:text-accent focus:text-accent"
              >
                Contact Us
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography
          color="white"
          className="text-center opacity-70 font-normal"
        >
          Copyright &copy; {new Date().getFullYear()} - All right reserved by
          MediCamp
        </Typography>
      </Container>
    </footer>
  );
}
