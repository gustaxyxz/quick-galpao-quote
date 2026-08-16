# Metalúrgica Oliveira — Site + Sistema Interno de Pedidos e Pagamentos

Reconstruir o site atual (PHP) neste projeto e adicionar uma área interna (com login) para controlar pedidos, pagamentos parcelados e comprovantes anexados, além de gerar PDFs bem organizados.

## O problema que estamos resolvendo

Hoje o controle é "anotado no caderno": o cliente paga R$ 5.000 de entrada, não retira a estrutura e vai pagando aos poucos. Ninguém sabe com precisão quanto falta, quando pagou e onde está o comprovante. A solução: cada pedido tem uma ficha financeira com lançamentos de pagamento, comprovante anexado (PDF ou foto do banco) e saldo calculado automaticamente.

## Parte 1 — Site público (mesmo visual preto e amarelo)

- `/` Início — banner, diferenciais, destaques de produtos, CTAs (Simular Orçamento / WhatsApp)
- `/produtos` — catálogo com filtro por faixa de preço
- `/calculadora` — simulador em etapas (medidas, tesoura, cobertura) com resumo lateral e valor estimado
- `/orcamento` — pedido de orçamento (nome, telefone, e-mail, produto, quantidade) gravado no banco
- `/contato` — WhatsApp, telefone, localização e formulário

Identidade mantida: preto, amarelo (#ffc107), tipografia forte, ícones. Sem Bootstrap — recriado com o design system do projeto (mesma aparência, mais leve e responsivo).

## Parte 2 — Área interna (login, só empresa)

Rotas protegidas em `/painel`:

- **Pedidos** — lista com cliente, produto, valor total, valor pago, saldo, status (Pendente / Em pagamento / Quitado / Retirado). Busca por nome/telefone.
- **Ficha do pedido** — dados do cliente, itens/materiais, valor negociado, e a linha do tempo de pagamentos.
- **Lançar pagamento** — data, valor, forma (PIX, dinheiro, transferência, cartão, boleto), observação e **anexo do comprovante** (PDF ou foto). O saldo e o status se atualizam sozinhos.
- **Comprovantes** — cada pagamento mostra o anexo para abrir/baixar; arquivos ficam em bucket privado com link temporário (só quem tem login vê).
- **Clientes** — lista com histórico de pedidos e total em aberto.
- **Orçamentos recebidos** — o que entrou pelo site, com status.

## Parte 3 — PDFs organizados (padrão de empresa séria)

Três documentos, mesmo cabeçalho/rodapé, layout limpo e profissional (nem "peba" nem exagerado):

1. **Proposta / Orçamento** — cabeçalho com logo e dados da empresa, número e data, dados do cliente, tabela de materiais e serviços do pedido, subtotal/desconto/total, condições de pagamento, validade, campo de assinatura.
2. **Extrato de pagamentos do pedido** — total negociado, tabela de pagamentos (data, forma, valor), total pago, saldo devedor, e indicação de quais pagamentos têm comprovante anexado.
3. **Recibo de pagamento** — comprovante próprio de um lançamento específico.

Padrão visual: faixa preta com logo, detalhe amarelo, tabelas com linhas alternadas, valores alinhados à direita, rodapé com CNPJ/telefone/endereço e numeração de página.

## Estrutura de dados

Tabelas: `clientes`, `produtos`, `pedidos`, `pedido_itens`, `pagamentos` (com referência ao arquivo do comprovante), `orcamentos` + `orcamento_itens`, `perfis`/`user_roles` (acesso interno) e um bucket privado `comprovantes`.

Como você já criou o projeto e rodou o SQL, na primeira etapa eu leio seu esquema e **adapto**: uso as tabelas que já existem e crio apenas o que faltar (principalmente `pagamentos`, o bucket de comprovantes e o controle de acesso).

## Detalhes técnicos

- Backend no **seu** projeto Supabase existente: você me envia `URL do projeto`, `publishable/anon key` e `service role key` (eu guardo como segredo, nunca no código).
- Login por e-mail e senha; área interna sob layout protegido `_authenticated`. RLS ativa: dados de pedidos/pagamentos só para usuários autenticados da empresa; site público lê apenas produtos.
- Leituras e escritas por `createServerFn`; upload de comprovante direto ao Storage privado com URL assinada para visualizar.
- PDFs gerados no servidor com biblioteca compatível com o runtime (pdf-lib), a partir dos dados reais do pedido — sem depender de impressão do navegador.

## Ordem de execução

1. Conectar seu Supabase (chaves) e mapear o esquema atual; migração complementar do que faltar.
2. Site público completo (5 páginas) com o visual atual.
3. Login + painel de pedidos/clientes/orçamentos.
4. Pagamentos com anexo de comprovante e saldo automático.
5. Os três PDFs com identidade da empresa.
