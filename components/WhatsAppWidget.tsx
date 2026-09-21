import Icon from "@/components/Icon";
import { site } from "@/content/site";

export default function WhatsAppWidget() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 sm:h-[3.75rem] sm:w-[3.75rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_18px_rgba(37,211,102,0.45)] transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#128C7E]"
      style={{ color: "#ffffff" }}
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" size={34} className="!text-white fill-white" />
    </a>
  );
}
