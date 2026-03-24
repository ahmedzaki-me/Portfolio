import {
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaGithub,
  FaTelegram,
} from "react-icons/fa6";

import { usePostHog } from "@posthog/react";

export default function SocialLinks() {
  const posthog = usePostHog();

  return (
    <div className="flex gap-6 text-2xl items-center">
      <a
        href="https://www.linkedin.com/in/ahmedzaki-me"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          posthog.capture("social_click", { platform: "Linkedin" });
        }}
      >
        <FaLinkedin className="text-text hover:text-main duration-300" />
      </a>
      <a
        onClick={() => {
          posthog.capture("social_click", { platform: "Github" });
        }}
        href="https://github.com/ahmedzaki-me"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="text-text hover:text-main duration-300" />
      </a>
      <a
        onClick={() => {
          posthog.capture("social_click", { platform: "Facebook" });
        }}
        href="https://www.facebook.com/share/172y3NuuF3/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="text-text hover:text-main duration-300" />
      </a>
      <a
        onClick={() => {
          posthog.capture("social_click", { platform: "Whatsapp" });
        }}
        href="https://wa.me/201286113602"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-text hover:text-main duration-300" />
      </a>
      <a
        onClick={() => {
          posthog.capture("social_click", { platform: "Telegram" });
        }}
        href="http://t.me/AhmedZaki11103"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTelegram className="text-text hover:text-main duration-300" />
      </a>
    </div>
  );
}
