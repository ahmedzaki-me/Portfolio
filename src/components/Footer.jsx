import SocialLinks from "./SocialLinks";
import { useTranslation } from "react-i18next";

import DownloadCV from "./DownloadCV";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer className="light:bg-card-bg bg-bg text-text  md:text-xl pb-5 border-t border-[#333] light:border-[#ccc]">
        <div className="container">
          <div className="py-7 flex justify-between gap-5 max-lg:flex-col max-md:items-start max-lg:items-center max-lg:py-5">
            <div className="font-medium text-text">
              {t("Call Me")}: <br className="max-lg:hidden" />
              <a
                href="tel:+201286113602"
                target="_blank"
                className="underline! text-main font-bold decoration-main/30 underline-offset-4 hover:decoration--main transition-colors"
              >
                {t("+20 1286113602")}
              </a>
            </div>

            <div className="font-medium text-text">
              {t("Email")}: <br className="max-lg:hidden" />
              <a
                href="mailto:ahmedzaki.developer@gmail.com"
                className="underline! text-main font-bold decoration-main/30 underline-offset-4 hover:decoration--main transition-colors"
                target="_blank"
              >
                ahmedzaki.developer@gmail.com
              </a>
            </div>

            <div className="font-medium text-text flex gap-3 lg:gap-2 lg:flex-col flex-wrap ">
              {t("Social")}:
              <SocialLinks />
            </div>
            <DownloadCV />
          </div>

          <hr className="text-[#333] light:text-[#aaa]" />

          <div className="pt-5 text-center">
            Made With Love By:
            <span className="bg-linear-to-r from-main to-main bg-clip-text text-transparent font-bold text-xl">
              {" "}
              Ahmed Zaki{" "}
            </span>
            &copy;&nbsp;{new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </>
  );
}
