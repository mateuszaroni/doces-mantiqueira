// Dados do negócio num lugar só. Troque aqui e o site inteiro acompanha.

export const negocio = {
  nome: 'Doces Mantiqueira',
  razaoSocial: 'Doces Mantiqueira Piquete Ltda',
  cnpj: '01.569.365/0001-02',
  desde: 1985,
  endereco: {
    rua: 'Rua São Benedito, 8',
    bairro: 'Centro',
    cidade: 'Piquete',
    uf: 'SP',
    cep: '12620-000',
  },
  horario: {
    texto: 'Todos os dias, das 8h às 18h',
    abre: '08:00',
    fecha: '18:00',
  },
  // PROVISÓRIA: confirmar com o Mateus.
  cidadesAtendidas: [
    'Piquete',
    'Lorena',
    'Guaratinguetá',
    'Cruzeiro',
    'Cachoeira Paulista',
    'Aparecida',
    'Pindamonhangaba',
    'Taubaté',
    'São José dos Campos',
  ],
  cidadesAtendidasResumo: 'todo o Vale do Paraíba, até Resende (RJ)',
  redes: {
    instagram: 'https://www.instagram.com/doces.mantiqueira/',
    // Dois "a" no final: está certo assim.
    facebook: 'https://www.facebook.com/doces.mantiqueiraa/',
  },
  reportagemG1:
    'https://g1.globo.com/sp/vale-do-paraiba-regiao/noticia/2023/06/27/festas-juninas-aquecem-mercado-de-doces-tradicionais-no-vale-do-paraiba.ghtml',
} as const;

export const enderecoCompleto = `${negocio.endereco.rua} — ${negocio.endereco.bairro}, ${negocio.endereco.cidade} - ${negocio.endereco.uf}, ${negocio.endereco.cep}`;

// Abre o Google Maps já com o endereço (sem iframe: nada de cookies de terceiros no site).
const consultaMapa = `${negocio.endereco.rua}, ${negocio.endereco.bairro}, ${negocio.endereco.cidade} - ${negocio.endereco.uf}, ${negocio.endereco.cep}`;
export const linkComoChegar = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consultaMapa)}`;

// Só dígitos, no formato do wa.me: 55 + DDD + número.
// PENDENTE: número do Felipe (pedir ao Mateus). Vazio, os links abrem o WhatsApp sem destinatário.
export const whatsappFelipe = '';

export const mensagens = {
  varejo: 'Olá, Felipe! Vim pelo site e quero fazer um pedido / orçamento para festa.',
  revenda: 'Olá, Felipe! Vim pelo site e tenho interesse em revender os Doces Mantiqueira.',
  festas: 'Olá, Felipe! Vim pelo site e quero um orçamento para festa / quermesse.',
  flutuante: 'Olá, Felipe! Vim pelo site e queria mais informações.',
  produto: (artigo: string, nomeDoce: string) => `Olá, Felipe! Vim pelo site e quero ${artigo} ${nomeDoce}.`,
};

/** Único gerador de links de WhatsApp do site. */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${whatsappFelipe}?text=${encodeURIComponent(mensagem)}`;
}

// PUBLIC_INDEXAVEL=true quando o domínio próprio entrar (Portão 2).
export const indexavel = import.meta.env.PUBLIC_INDEXAVEL === 'true';
