import {
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaGithub,
  FaTelegram,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { createElement } from "react";
import { usePostHog } from "@posthog/react";

const SOCIAL_LINKS = [
  {
    platform: "Linkedin",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ahmedzaki-me",
  },
  {
    platform: "Github",
    icon: FaGithub,
    href: "https://github.com/ahmedzaki-me",
  },
  {
    platform: "Whatsapp",
    icon: FaWhatsapp,
    href: "https://wa.me/201286113602",
  },
  {
    platform: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/ahmedzaki.me",
  },
  {
    platform: "Youtube",
    icon: FaYoutube,
    href: "https://youtube.com/@ahmedzakime",
  },
  {
    platform: "Telegram",
    icon: FaTelegram,
    href: "http://t.me/AhmedZaki11103",
  },
  {
    platform: "Twitter",
    icon: FaXTwitter,
    href: "https://x.com/AhmedZaki_dev",
  },
  {
    platform: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/ahmedzaki.me",
  },
  {
    platform: "Tiktok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@ahmedzaki11103",
  },
];

export default function SocialLinks() {
  const posthog = usePostHog();
  const linksClasses =
    "hover:-translate-y-1 text-text hover:text-main duration-300";

  return (
    <div className="flex gap-5 text-2xl items-center flex-wrap">
      {SOCIAL_LINKS.map(({ platform, icon, href }) => (
        <a
          key={platform}
          className={linksClasses}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform}
          onClick={() => posthog?.capture("social_click", { platform })}
        >
          {createElement(icon)}
        </a>
      ))}
    </div>
  );
}
