# LB Serviços Elétricos — site LB Serviços Elétricos

Projeto estático com cabeçalho, banner, Serviços, Galeria, Depoimentos, Regiões e Dúvidas, em HTML, CSS e JavaScript separados. A foto original é usada no fundo; títulos, menu, botões e destaques são HTML. Sem dependências externas.

## Abrir e publicar

Para conferir localmente, abra `index.html`. Para uma prévia por servidor, execute `python3 -m http.server 8000` dentro desta pasta e visite `http://localhost:8000`.

### GitHub Pages

1. Extraia o ZIP. Envie **o conteúdo de `LB/`** para a raiz do repositório; o arquivo `index.html` deve ficar na raiz.
2. No GitHub, entre em **Settings → Pages**.
3. Selecione **Deploy from a branch**, a branch principal e **/(root)**.
4. Aguarde a publicação e abra a URL informada pelo GitHub.

### Netlify

Extraia o ZIP e arraste a pasta `LB` para a área de publicação manual do Netlify. O nível enviado deve conter `index.html`, `styles.css`, `script.js` e `assets/`. Não é necessário comando de build. Para atualizar, envie a pasta completa com os arquivos modificados na área de deploys do mesmo site.

## Onde editar

- **Foto:** `assets/images/cozinha-original.jpg`. É a foto original da cozinha, sem textos incorporados. Ao substituir, atualize as dimensões no HTML e confira `object-position` da `.scene img` em `styles.css`, especialmente no mobile.
- **Logo:** `assets/logo/lb-servicos-eletricos.png`. O arquivo aprovado e sua transparência foram preservados. O CSS mantém o canvas inteiro sem corte ou deformação; as margens transparentes são compensadas no posicionamento. Ao substituir, atualize as dimensões no HTML.
- **Telefone e mensagem:** `WHATSAPP_NUMBER` e `WHATSAPP_MESSAGE` no início de `script.js`. O número atual é `5541996138842`. Atualize também os quatro `href` de fallback com `data-whatsapp` no `index.html`, para manter o contato correto caso o JavaScript seja desativado. Os quatro contatos são: cabeçalho desktop, botão principal, seção Serviços e botão flutuante.
- **Cores, fonte e espaçamentos:** variáveis em `:root` no início de `styles.css`. Laranja da marca: `#F58200`.
- **Texto do banner:** bloco `.hero-content` em `index.html`. Há apenas um H1. Cada linha desktop é um `span`; no mobile as linhas podem quebrar naturalmente.

## Próximas seções

O menu exibe os nomes das seções futuras, informa que elas estão em preparação e não navega para destinos inexistentes. No mobile, selecionar um item fecha o painel. Não foram criadas seções vazias.

Depois de adicionar conteúdo real, crie os seguintes IDs e transforme os botões `data-menu-item` em links:

| Item | Destino futuro |
| --- | --- |
| Quem Somos | `#quem-somos` |
| Depoimentos | `#depoimentos` |
| Regiões | `#regioes` |
| Dúvidas | `#duvidas` |

Atualize o seletor de fechamento do menu no JavaScript para incluir os novos links. Remova a descrição e a nota de “Seções em preparação” quando todos os destinos existirem.

**Conhecer serviços e Serviços:** links ativos para `#servicos`, com fechamento do menu mobile.

Fotos futuras de serviços/projetos podem ficar em `assets/images/galeria/`; fotos ou capturas autorizadas de avaliações podem ficar em `assets/images/avaliacoes/`. Inclua apenas dados e conteúdo reais.

## Interações e acessibilidade

O menu mobile usa `aria-expanded`, pode ser aberto e fechado pelo botão, fecha com Escape (devolvendo o foco), ao selecionar uma opção e ao clicar fora. A entrada do conteúdo e o movimento discreto da foto respeitam `prefers-reduced-motion`. Em telas pequenas ou sem ponteiro fino, a cena fica estática. Camadas decorativas usam `pointer-events: none`.

Não há promessa de atendimento 24 horas, endereço ou domínio inventados. A empresa atende em horário comercial, informação que não foi incluída no banner conforme solicitado.


## Seção Serviços

Implementada em HTML abaixo do banner, com fundo off-white, quatro cards e botão de orçamento. Serviços no menu e Conhecer serviços no banner apontam para #servicos. Os demais itens continuam em preparação. O menu mobile fecha ao selecionar Serviços.

Ícones originais, sem cortes, em assets/icons/: quadro-distribuicao.png, tomadas-interruptores-iluminacao.png, fiacao-infraestrutura.png e padrao-concessionaria.png. Para substituir, mantenha proporções e transparência e atualize width/height no HTML. Conteúdo no index.html; cores, espaçamentos e transição no styles.css; entrada ao rolar no script.js. Animações respeitam movimento reduzido e o conteúdo permanece visível sem JavaScript.

## Conferência desta entrega

Verificados caminhos dos arquivos, quatro cards, único H1, links para #servicos e sintaxe JavaScript. A renderização e capturas não puderam ser realizadas: o navegador não estava disponível e seu download falhou. A conferência visual em desktop e nas larguras de 360, 390 e 430 px ainda precisa ser realizada.


## Galeria

A seção #galeria está logo após Serviços, com o mesmo fundo cinza. Galeria no menu aponta para essa seção e fecha o menu mobile. São três duplas alternadas 60/40, 40/60, 60/40 no desktop; no mobile as fotos aparecem inteiras, em uma coluna.

Fotos originais em assets/images/galeria/, na ordem:
1. 01-pendente-escuro.jpg
2. 02-arandela-porta.jpg
3. 03-iluminacao-linear.jpg
4. 04-pendente-aneis.jpg
5. 05-corredor-pedra.jpg
6. 06-iluminacao-embutida.jpg

Para trocar, substitua o arquivo correspondente e atualize width, height e alt no index.html. A ordem é definida pelos links data-gallery-photo no HTML; o modal reutiliza essa mesma ordem. Atualize tanto href quanto src ao renomear arquivos. As posições desktop individuais estão nas classes .gallery-photo-1 a .gallery-photo-6 do styles.css. No mobile e no modal as fotos não são cortadas.

A ampliação usa dialog nativo, com Escape, setas, foco contido e devolvido à foto de origem. A rolagem fica bloqueada até fechar. Não há avanço automático. Sem JavaScript, os links abrem as imagens originais. O botão de orçamento reutiliza data-whatsapp; ao trocar o telefone, atualize também o href de fallback desse botão.

### Validação da Galeria nesta entrega

Sintaxe JavaScript, caminhos e dimensões das seis fotos e preservação das seções anteriores conferidos. A lógica de abertura, navegação circular, setas, contenção/retorno do foco e restauração de rolagem foi verificada em DOM simulado. O navegador de renderização não está disponível neste ambiente; capturas e conferência visual desktop/360/390/430 px permanecem pendentes. Escape usa o comportamento nativo de dialog e também precisa de conferência no navegador.


## Depoimentos

Seção #depoimentos após Galeria; item existente do menu ativado, com fechamento no mobile. Edite nomes e textos diretamente nos quatro artigos .review-card no index.html. Preserve a ordem da lista .reviews-track; Daniel usa uma quebra de linha preservada por white-space: pre-line. Sem JavaScript, as quatro avaliações ficam em grade/lista.

O carrossel manual mostra dois cards no desktop e um abaixo de 851px, com setas, indicadores, swipe e teclas esquerda/direita nos controles. Não há autoplay. O limite de posição é recalculado ao redimensionar; os cards fora de vista ficam inert/aria-hidden.

Logo oficial Google: assets/icons/google-logo.png, obtida de https://developers.google.com/static/identity/images/g-logo.png, mantida sem redesenho. Para substituir, use um asset oficial com proporção preservada e atualize width e height. Link do perfil no botão Ver avaliações no Google: https://maps.app.goo.gl/JUHNTYoFUC4mtHCz9 — edite seu href no HTML.

### Validação de Depoimentos

Página renderizada a partir desta pasta em desktop de 1440px e mobile de 360, 390 e 430px. Verificados dois/um cards, alturas iguais, imagens carregadas, ausência de overflow horizontal, navegação até a última avaliação, swipe via eventos de toque, teclado, redimensionamento, link/menu, movimento reduzido e quatro avaliações visíveis sem JavaScript. Capturas reais geradas em desktop e 390px. As limitações de renderização relatadas nas entregas anteriores foram superadas nesta entrega.


## Regiões

Seção #regioes após Depoimentos, com dez cidades na ordem da lista .regions-cities no index.html. Edite os li para atualizar a área de atendimento. Não acrescente cidades sem confirmação da empresa.

O iframe usa um mapa geográfico do Google centrado em Curitiba, sem marcador de endereço da empresa. Para trocar o enquadramento, ajuste ll (latitude/longitude) e z (zoom) no src do iframe; atualize também o link Abrir mapa no Google Maps. Dimensões/altura responsiva estão no styles.css; o mapa é lazy e não depende de chave de API nem bloqueia o restante da seção.

A mensagem exclusiva do botão fica no atributo data-whatsapp-message no HTML. Atualize também seu href de fallback para funcionar sem JavaScript. O telefone é reutilizado de WHATSAPP_NUMBER no script.js; os demais botões continuam com WHATSAPP_MESSAGE. Ao trocar telefone, atualize todos os href de fallback data-whatsapp.

### Validação de Regiões

Página renderizada em desktop (1440px) e 360/390/430px, com dez cidades, fundo cinza compartilhado, links e mensagem do WhatsApp conferidos, movimento reduzido respeitado e nenhuma rolagem horizontal. Capturas reais em 1440px e 390px. O iframe do Google Maps não carregou no ambiente de teste (ERR_EMPTY_RESPONSE); sua interação não foi validada. O mapa precisa ser conferido no navegador após publicação.


## Dúvidas

Seção #duvidas após Regiões. Edite as 12 perguntas nos summary e as respostas nos .faq-answer do index.html. Cada details começa fechado e pode ser aberto independentemente, inclusive sem JavaScript e com teclado. O sinal +/− acompanha o estado nativo; não há animação de altura.

A mensagem do botão Tirar dúvidas pelo WhatsApp fica em data-whatsapp-message; atualize também seu href de fallback ao editar. O número vem de WHATSAPP_NUMBER no script.js, compartilhado com os outros contatos.

A resposta sobre garantia orienta consultar as condições do serviço. A instrução editorial sobre não inventar prazo/cobertura não foi publicada como texto ao cliente; não inclua condições não confirmadas.

### Validação de Dúvidas

Conferido no navegador em 1440px e 360/390/430px: 12 perguntas inicialmente fechadas, abertura independente por clique/toque, Enter/Espaço, todas as respostas sem cortes, funcionamento sem JavaScript, link Dúvidas no menu com fechamento mobile e WhatsApp com telefone/mensagem corretos. Não há overflow horizontal. Capturas reais desktop e mobile com a primeira resposta aberta.


## Rodapé

O footer após Dúvidas usa o mesmo grafite dos Depoimentos. Edite sua descrição, links, horário comercial e direitos no index.html, bloco .site-footer. A frase aprovada é: LB Soluções Elétricas. Todos os direitos reservados.

Logo atual: assets/logo/lb-servicos-eletricos.png. Mantenha o arquivo transparente e atualize width/height se trocar suas dimensões; o rodapé exibe o canvas inteiro com object-fit: contain. O telefone usa data-whatsapp e a configuração padrão WHATSAPP_NUMBER/WHATSAPP_MESSAGE em script.js. Ao alterar, atualize também o número visível e o href de fallback no rodapé.

Espaçamentos e composição estão no bloco Rodapé do styles.css. A altura é natural; o espaçamento inferior de 84px evita sobreposição do WhatsApp flutuante no fim da página. Não há link de Quem Somos no rodapé, pois essa seção ainda não existe.

### Validação do rodapé

Conferido no navegador em desktop (1440px) e mobile de 360/390/430px. Logo carregada, inteira e proporcional; fundo #1B1B1D, frase de direitos exata, cinco links e telefone/mensagem WhatsApp corretos. Sem rolagem horizontal ou sobreposição do botão flutuante com os textos/links no fim da página. Capturas reais desktop e mobile geradas. Cabeçalho, main e JavaScript preservados.


## Degradê entre o banner e Serviços

A transição usa `.hero::after` em `styles.css`, com tons neutros de cinza e término na cor `--services-bg`. A camada não bloqueia cliques e fica abaixo do conteúdo. A altura é ajustada por `--hero-fade-height`, com valores menores no tablet e no celular. Não altera a altura do banner, o enquadramento da foto ou os espaçamentos das seções.

Para ajustar a transição, edite essas variáveis e os pontos do `linear-gradient`. `--hero-fade-gray` define os canais RGB neutros intermediários; o ponto final sempre usa o fundo existente dos serviços.

### Validação do degradê

Conferidos caminhos relativos, sintaxe JavaScript e preservação integral do HTML, JS e assets em comparação com o ZIP original. As regras de altura da transição foram revisadas para desktop, tablet e celular. A renderização visual desta alteração não pôde ser executada: o navegador não estava instalado e seu download falhou.
