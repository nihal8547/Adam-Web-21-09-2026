import Icon from "@/components/Icon";
import { site } from "@/content/site";

export default function WhatsAppWidget() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#128C7E]"
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" size={30} />
    </a>
  );
}
