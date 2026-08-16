import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/empresa";

export function WhatsappFab() {
  return (
    <a
      href={whatsappLink("Olá! Gostaria de um orçamento de galpão.")}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 font-display text-sm font-bold text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Orçamento no WhatsApp</span>
    </a>
  );
}
