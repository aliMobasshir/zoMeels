import { useEffect, useState } from "react";
import api from "../../lib/api"
import { useNavigate } from "react-router-dom";

function useSystemTheme() {
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return dark;
}

const CreateFood = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

   setLoading(true);

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("video", e.target.video.files[0]); 

    try {
      const response = await api.post("/api/food/", formData);
      console.log("Food item created successfully");
      const foodPartnerId = response.data.food.foodPartner;
      navigate(`/foodPartner/${foodPartnerId}`)
    } catch (error) {
      console.error("Food item creation failed:", error.response?.data || error.message);
    } finally{
      setLoading(false)
    }
  }

  const dark = useSystemTheme();
  const pageClass = dark ? "bg-[#09090b]" : "bg-[#f9fafb]";
  const cardClass = dark
    ? "border-[#27272a] bg-[#111113] shadow-[0_32px_80px_rgba(0,0,0,.6)]"
    : "border-[#fee2e2] bg-white shadow-[0_24px_60px_rgba(239,68,68,.10)]";
  const badgeClass = dark
    ? "bg-[#1f1212] text-[#f87171]"
    : "bg-[#fef2f2] text-[#f87171]";
  const labelClass = dark ? "text-[#fafafa]" : "text-[#111827]";
  const textClass = dark ? "text-[#a1a1aa]" : "text-[#374151]";
  const inputClass = dark
    ? "border-[#3f3f46] bg-[#111113] text-[#fafafa] placeholder:text-[#52525b] focus:border-[#f87171] focus:ring-4 focus:ring-[rgba(248,113,113,.16)]"
    : "border-[#fecaca] bg-white text-[#111827] placeholder:text-[#9ca3af] focus:border-[#f87171] focus:ring-4 focus:ring-[rgba(248,113,113,.12)]";
  const fileClass = dark
    ? "border-[#3f3f46] bg-[#1c1c1f] text-[#fafafa] file:mr-3 file:rounded-xl file:border-0 file:bg-[#1f1212] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#f87171]"
    : "border-[#fecaca] bg-[#fff7f7] text-[#111827] file:mr-3 file:rounded-xl file:border-0 file:bg-[#fef2f2] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#f87171]";
  const buttonClass = dark
    ? "bg-[#f87171] text-white"
    : "bg-[#f87171] text-white";

  return (
    <main className={`min-h-screen px-4 py-5 pb-10 transition-colors sm:px-4 ${pageClass}`}>
      <section
        className={`mx-auto max-w-[420px] overflow-hidden rounded-[2rem] border ${cardClass}`}
      >
        <div className="p-5 sm:p-6">
          <div className="mb-[18px]">
            <span
              className={`mb-2.5 inline-block rounded-md px-[9px] py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${badgeClass}`}
            >
              Create Food
            </span>
            <h1 className={`mb-1.5 text-2xl font-semibold leading-[1.2] ${labelClass}`}>
              Add a new food item
            </h1>
            <p className={`text-[13px] leading-[1.6] ${textClass}`}>
              Fill in the details and attach a video.
            </p>
          </div>

          <form className="grid gap-3.5" onSubmit={handleSubmit}>
            <FormField label="Food name" labelClass={labelClass}>
              <input
                type="text"
                name="name"
                placeholder="Enter food name"
                className={`w-full rounded-[0.95rem] border px-[15px] py-[14px] text-sm leading-[1.5] outline-none transition focus:outline-none ${inputClass}`}
              />
            </FormField>

            <FormField label="Description" labelClass={labelClass}>
              <textarea
               name="description"
                rows="5"
                placeholder="Write a short description"
                className={`min-h-[120px] w-full rounded-[0.95rem] border px-[15px] py-[14px] text-sm leading-[1.5] outline-none transition placeholder:leading-[1.5] focus:outline-none ${inputClass}`}
              />
            </FormField>

            <FormField label="Upload video" labelClass={labelClass}>
              <input
                name="video"
                type="file"
                accept="video/*"
                className={`w-full rounded-[0.95rem] border px-[14px] py-3 text-sm outline-none transition focus:outline-none ${fileClass}`}
              />
            </FormField>

            <button
              type="submit"
              disabled={loading}
              className={`mt-1 rounded-[0.95rem] px-4 py-[14px] text-sm font-bold transition hover:opacity-95 ${buttonClass}`}
            >
              {loading? "Uploading" : "Create food"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

function FormField({ label, children, labelClass }) {
  return (
    <div className="grid gap-[7px]">
      <label className={`text-sm font-semibold ${labelClass}`}>{label}</label>
      {children}
    </div>
  );
}

export default CreateFood;
