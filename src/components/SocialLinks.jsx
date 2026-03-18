import {
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaGithub,
  FaTelegram,
} from "react-icons/fa6";
import ReactGA from "react-ga4";
const handleClick = (platform) => {
  ReactGA.event("Social_Links", {
    platform: platform,
  });
};

export default function SocialLinks() {
  return (
    <div className="flex gap-6 text-2xl items-center">
      <a
        onClick={() => handleClick("linkedin")}
        href="https://www.linkedin.com/in/ahmedzaki-me"
        target="_blank"
      >
        <FaLinkedin className="text-text hover:text-main duration-300" />
      </a>
      <a
        onClick={() => handleClick("Github")}
        href="https://github.com/ahmedzaki-me"
        target="_blank"
      >
        <FaGithub className="text-text hover:text-main duration-300" />
      </a>
      <a href="https://www.facebook.com/share/172y3NuuF3/" target="_blank">
        <FaFacebook className="text-text hover:text-main duration-300" />
      </a>
      <a href="https://wa.me/201286113602" target="_blank">
        <FaWhatsapp className="text-text hover:text-main duration-300" />
      </a>
      <a href="http://t.me/AhmedZaki11103" target="_blank">
        <FaTelegram className="text-text hover:text-main duration-300" />
      </a>
    </div>
  );
}
