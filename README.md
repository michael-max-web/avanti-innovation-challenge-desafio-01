# AVANTI — Innovation Challenge

Página inicial de e-commerce desenvolvida com HTML5, CSS3 e JavaScript puro, seguindo as referências visuais do Figma para desktop, tablet e celular.

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis, Grid, Flexbox e media queries
- JavaScript puro, sem bibliotecas de interface
- Google Fonts: Nunito Sans e Nunito
- Bootstrap Icons via CDN para ícones de interface

## Funcionalidades

- Busca com mensagem dinâmica e validação para campo vazio.
- Mega menu com dois estados idênticos ao Figma: "Todas as Categorias" (coluna cinza de departamentos com rolagem, categorias e banner) e "Departamento" (título, "Ver tudo", categorias e banner). Cada gatilho abre ao clicar e fecha ao clicar de novo; também fecha ao clicar fora ou com a tecla Esc.
- Menu de navegação para celular.
- Dois carrosséis reutilizando a mesma função JavaScript, com três indicadores e navegação circular.
- Newsletter com validação de nome, e-mail e aceite da Política de Privacidade.
- Rodapé responsivo com acordeões no celular.
- Layout adaptado para desktop, tablet e telas estreitas.

## Estrutura

```text
avanti-projeto-final/
├── assets/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta no VS Code.
3. Abra `index.html` diretamente no navegador ou utilize a extensão Live Server.
4. Para carregar as fontes e os ícones externos, mantenha a conexão com a internet ativa.

## Alterações em relação ao projeto original

- Padronizadas as cores de acordo com as variáveis especificadas no briefing.
- Trocada a tipografia Arial por Nunito Sans e Nunito.
- Reorganizados cabeçalho, banner Super Sale, cards, blocos de caneca, benefícios, banner de região, newsletter e rodapé.
- Aplicadas as proporções e os alinhamentos responsivos de desktop e mobile, incluindo a ordem dos elementos nos blocos de imagem e texto.
- Ocultado o segundo carrossel em telas mobile, conforme solicitado.
- Corrigido o cálculo de deslocamento dos carrosséis para que naveguem em cards inteiros e recalculado o layout ao redimensionar a janela.
- Implementados os dois estados do mega menu, com abrir/fechar por clique (botão e departamentos), fechamento ao clicar fora e com Esc.
- Mega menu refeito para as medidas do Figma: painel de 1280px alinhado ao menu, coluna cinza de 240px com barra de rolagem fina, 3 colunas de categorias e banner de 240px; botão e departamento ativos ficam em azul.
- Ajustada a validação da newsletter e adicionadas mensagens de erro e sucesso.
- Adicionado acordeão acessível para as colunas do rodapé no mobile.
- Renomeados assets para nomes mais claros em português e atualizadas suas referências.
- Corrigida a ordem dos ícones de pagamento e adicionados os selos de rodapé, incluindo um SVG claramente identificado como placeholder para Let's Encrypt.
