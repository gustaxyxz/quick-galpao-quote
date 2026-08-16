export const EMPRESA = {
  nome: "Metalúrgica Oliveira",
  slogan: "Estruturas metálicas para galpões",
  cidade: "Engenheiro Beltrão - PR",
  regiao: "Engenheiro Beltrão, Maringá, Campo Mourão e Região",
  telefone: "(44) 99767-1935",
  whatsapp: "5544997671935",
  email: "contato@metalurgicaoliveira.com.br",
  endereco: "Engenheiro Beltrão — Paraná",
};

export function whatsappLink(mensagem: string): string {
  return `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
