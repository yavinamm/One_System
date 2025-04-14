"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { RiPhoneFill, RiTelegram2Fill } from "react-icons/ri";
import Image from "next/image";
import RainEffect from "../RainEffect";

const ContactForm = () => {
  type ContactField =
    | "full_name"
    | "phone"
    | "telegram"
    | "service_needed"
    | "project_info"
    | "budget"
    | "currency"
    | "similar_project";

  const [formData, setFormData] = useState<Record<ContactField, string>>({
    full_name: "",
    phone: "",
    telegram: "",
    service_needed: "",
    project_info: "",
    budget: "",
    similar_project: "",
    currency: "USD",
  });

  const [formErrors, setFormErrors] = useState<Record<ContactField, string>>({
    full_name: "",
    phone: "",
    telegram: "",
    service_needed: "",
    project_info: "",
    budget: "",
    similar_project: "",
    currency: "USD",
  });

  const [showModal, setShowModal] = useState<null | "success" | "error">(null);

  const BOT_TOKEN = "6925559864:AAG5RERmJmYYhUphhDoI1jk2OtYAi0IvwfE";
  const CHAT_ID = "892568030";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (value.trim() !== "") {
      setFormErrors({ ...formErrors, [id]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        errors[key] = "Bu maydon to'ldirilishi shart!";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const message = `
📩 *Yangi Murojaat!*\n
🏷 *Ismi:* ${formData.full_name}
✉️ *Telefon raqam:* ${formData.phone}
🛸 *Telegram Username:* ${formData.telegram}
🏠 *Xizmat turi:* ${formData.service_needed}
📝 *Loyihangiz haqida:* ${formData.project_info}
💰 *Loyiha budjeti:* ${formData.budget} ${formData.currency}
🔗 *O'xshash loyiha:* ${formData.similar_project}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      setShowModal("success");
      setFormData({
        full_name: "",
        phone: "",
        telegram: "",
        service_needed: "",
        project_info: "",
        budget: "",
        similar_project: "",
        currency: "USD",
      });
    } catch (error) {
      console.error("Xatolik:", error);
      setShowModal("error");
    }
  };

  const inputClass = (field: keyof typeof formErrors) =>
    `bg-zinc-900 text-slate-50 border ${
      formErrors[field] ? "border-red-500" : "border-zinc-700"
    } focus:border-yellow-500 focus:ring-yellow-500 placeholder:text-zinc-600 rounded-lg shadow-inner transition-all duration-300 hover:scale-105 transform`;

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <RainEffect />
        <div className="max-w-lg w-full bg-zinc-800 bg-opacity-70 p-8 rounded-3xl shadow-2xl backdrop-blur-lg">
          <div className="flex justify-center mb-6">
            <Image
              src="/one_system.png"
              alt="One System Logo"
              width={100}
              height={100}
              className="rounded-full object-cover mb-3"
            />
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {[
  { id: "full_name", label: "To'liq Ism", placeholder: "Ismingiz" },
  { id: "phone", label: "Telefon raqam", placeholder: "+998..." },
  { id: "telegram", label: "Telegram Username", placeholder: "@yourusername" },
  { id: "similar_project", label: "O'xshash loyiha", placeholder: "Website nomi yoki link" },
].map(({ id, label, placeholder }) => (
  <div className="flex flex-col gap-2" key={id}>
    <Label htmlFor={id} className="text-sm text-yellow-500 font-medium">
      {label}
    </Label>
    <Input
      id={id}
      placeholder={placeholder}
      value={formData[id as ContactField]}
      onChange={handleChange}
      className={inputClass(id as ContactField)}
    />
    {formErrors[id as ContactField] && (
      <span className="text-red-500 text-xs">{formErrors[id as ContactField]}</span>
    )}
  </div>
))}




<div className="flex flex-col gap-2">
  <Label htmlFor="service_needed" className="text-sm text-yellow-500 font-medium">
    Qanday xizmat kerak?
  </Label>
  <select
    id="service_needed"
    value={formData.service_needed}
    onChange={handleChange}
    className={
      inputClass("service_needed") +
      " p-3 text-sm bg-zinc-900 text-yellow-500"
    }
  >
    <option className="text-yellow-500" value="Telegram bot">Telegram bot</option>
    <option className="text-yellow-500" value="Web sayt">Web sayt</option>
    <option className="text-yellow-500" value="Mobil ilova">Mobil ilova</option>
    <option className="text-yellow-500" value="CRM/ERP tizimi">CRM/ERP tizimi</option>
    <option className="text-yellow-500" value="Boshqa">Boshqa</option>
  </select>
  {formErrors.service_needed && (
    <span className="text-red-500 text-xs">{formErrors.service_needed}</span>
  )}
</div>



            <div className="flex flex-col gap-2">
              <Label htmlFor="project_info" className="text-sm text-yellow-500 font-medium">
                Loyihangiz haqida
              </Label>
              <Textarea
                id="project_info"
                value={formData.project_info}
                onChange={handleChange}
                className={inputClass("project_info") + " h-32 resize-none"}
                placeholder="Loyiha haqida qisqacha yozing"
              />
              {formErrors.project_info && (
                <span className="text-red-500 text-xs">{formErrors.project_info}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="budget" className="text-sm text-yellow-500 font-medium">
                Budjet
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Loyiha uchun ajratmoqchi bo'lgan budjet"
                  className={inputClass("budget")}
                />
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="bg-zinc-900 text-yellow-500 font-bold border border-zinc-700 rounded-lg p-2"
                >
                  <option value="UZS">UZS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              {formErrors.budget && (
                <span className="text-red-500 text-xs">{formErrors.budget}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
              <Button
                type="submit"
                className="flex-1 min-h-[50px] bg-gradient-to-r from-yellow-400 to-yellow-600 text-zinc-900 hover:bg-yellow-400 font-medium px-4 py-3 text-sm rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform flex items-center justify-center text-center"
              >
                Yuborish
                <RiTelegram2Fill className="w-5 h-5 ml-2" />
              </Button>

              <a
                href="tel:+998940811222"
                className="flex-1 min-h-[50px] bg-gradient-to-r from-yellow-400 to-yellow-600 text-zinc-900 hover:bg-yellow-400 font-medium px-4 py-3 text-sm rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform flex items-center justify-center text-center"
              >
                Tezkor bog&apos;lanish
                <RiPhoneFill className="w-5 h-5 ml-2" />
              </a>
            </div>





          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 text-center shadow-lg w-80"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-2 text-zinc-800">
                {showModal === "success" ? "Tez orada sizga aloqaga chiqamiz ✅" : "Xatolik ❌"}
              </h2>
              <p className="text-sm text-zinc-600">
                {showModal === "success"
                  ? "Sizning xabaringiz muvaffaqiyatli yuborildi!"
                  : "Xabar yuborishda xatolik yuz berdi. Qayta urinib koring."}
              </p>
              <Button
                className="mt-4 bg-yellow-500 hover:bg-yellow-500 text-black"
                onClick={() => setShowModal(null)}
              >
                OK
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;
