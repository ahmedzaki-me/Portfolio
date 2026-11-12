import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import MainImg from "./MainImg";
import { useScrollToRef } from "../hooks/useScrollToRef";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useScrollToRef("contact");
  const [submitStatus, setSubmitStatus] = useState(null);

  const inputStyle =
    "bg-card-bg text-text py-3 px-4 rounded-3xl border-none focus:ring-2 focus:ring-main outline-none placeholder:text-gray-500 transition-all shadow-inner";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      const serviceId =
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_8b1zgch";
      const templateId =
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_147xfri";
      const publicKey =
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "sgyMxdo8u6AFEgcuz";

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          title: data.service,
          message: data.message,
        },
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: t("Thank you! Your message has been sent successfully."),
      });
      reset();
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setSubmitStatus({
        type: "error",
        message: t("Something went wrong. Please try again."),
      });
    }
  };

  return (
    <section className="container py-section-mobile md:py-section flex items-center justify-center lg:flex-row flex-col gap-13 transition-colors duration-300">
      <MainImg />
      <div
        className="scroll-mt-40 max-w-4xl flex flex-col gap-6"
        ref={sectionRef}
        id="contact"
      >
        <div>
          <h2 className="text-3xl md:text-5xl py-4 font-black uppercase text-text tracking-tight">
            {t("Let's work together")}
          </h2>
          <p className="text-lg leading-relaxed text-text">
            {t(
              "Got a project in mind or a role to fill? Drop me a message and let's get to work.",
            )}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl flex flex-col gap-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-main font-semibold text-lg px-1"
                htmlFor="contact-name"
              >
                {t("Name")}
              </label>
              <input
                {...register("name", { required: t("Name is required") })}
                placeholder="Ahmed Zaki"
                className={inputStyle}
                autoComplete="name"
                id="contact-name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <span className="text-red-500 text-sm italic">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-main font-semibold text-lg px-1"
                htmlFor="contact-email"
              >
                {t("Email")}
              </label>
              <input
                {...register("email", {
                  required: t("Email is required"),
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: t("Invalid email address"),
                  },
                })}
                type="email"
                placeholder="ahmedzaki.developer@gmail.com"
                className={inputStyle}
                autoComplete="email"
                id="contact-email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <span className="text-red-500 text-sm italic">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-main font-semibold text-lg px-1"
              htmlFor="contact-service"
            >
              {t("Service Needed?")}
            </label>
            <div className="relative">
              <select
                {...register("service", {
                  required: t("Please select a service"),
                })}
                className="w-full bg-card-bg text-text py-3 px-4 rounded-3xl border-none focus:ring-2 focus:ring-main outline-none appearance-none cursor-pointer shadow-inner"
                autoComplete="off"
                id="contact-service"
                aria-invalid={Boolean(errors.service)}
              >
                <option value="" disabled hidden>
                  {t("Select...")}
                </option>
                <option value="offer">{t("Job Offer")}</option>
                <option value="fullstack">{t("Full-Stack Application")}</option>
                <option value="backend">{t("Backend & APIs")}</option>
                <option value="frontend">{t("Frontend Development")}</option>
              </select>
              <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none text-gray-400">
                <IoIosArrowDown className="w-5 h-5" />
              </div>
            </div>
            {errors.service && (
              <span className="text-red-500 text-sm italic">
                {errors.service.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-main font-semibold text-lg px-1"
              htmlFor="contact-message"
            >
              {t("What Can I Help You?")}
            </label>
            <textarea
              {...register("message", { required: t("Message is required") })}
              rows="6"
              placeholder={t("Hello, I'd like to enquire about...")}
              className="resize-y min-h-40 bg-card-bg text-text p-4 rounded-3xl border-none focus:ring-2 focus:ring-main outline-none placeholder:text-gray-500 transition-all shadow-inner"
              autoComplete="off"
              id="contact-message"
              aria-invalid={Boolean(errors.message)}
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-sm italic">
                {errors.message.message}
              </span>
            )}
          </div>

          {submitStatus && (
            <div
              role={submitStatus.type === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                submitStatus.type === "success"
                  ? "border-green-500/40 bg-green-500/10 text-green-400 light:text-green-700"
                  : "border-red-500/40 bg-red-500/10 text-red-400 light:text-red-600"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
              w-full md:w-fit md:px-16 py-4 rounded-full font-bold text-xl uppercase tracking-widest transition-all duration-300 transform active:scale-95
              ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed opacity-70 text-white"
                  : "text-main border-main border-2 shadow-[0_10px_20px_rgba(0,0,0,0.2)] cursor-pointer relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 hover:text-white before:h-full before:w-0 before:bg-main before:transition-all before:duration-300 before:z-0 hover:before:w-full"
              }
            `}
            >
              <span className="relative z-10">
                {isSubmitting ? t("SUBMITTING...") : t("SUBMIT")}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
