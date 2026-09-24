import Icon from "@/components/Icon";

export default function WhatsAppWidget({ whatsappHref }: { whatsappHref: string }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[90px] right-[20px] z-50 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_18px_rgba(37,211,102,0.45)] transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#128C7E]"
      style={{ color: "#ffffff" }}
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" size={30} className="!text-white fill-white" />
    </a>
  );
}
