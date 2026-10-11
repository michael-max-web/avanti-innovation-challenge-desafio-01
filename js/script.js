const PRODUTO_PADRAO = {
    imagem: "assets/camiseta.png",
    nome: "Lorem ipsum dolor sit amet consectetuer adipiscing elit",
    precoAnterior: "R$ 100,00",
    preco: "R$79,90",
    desconto: "10% OFF"
};

const produtos = Array(8).fill(PRODUTO_PADRAO);

const selecionar = (seletor, contexto = document) => contexto.querySelector(seletor);
const selecionarTodos = (seletor, contexto = document) => [...contexto.querySelectorAll(seletor)];

function configurarBusca() {
    const formulario = selecionar("#formBusca");
    const campo = selecionar("#busca");
    if (!formulario || !campo) return;

    let temporizador;

    function obterResultado() {
        let resultado = selecionar("#resultadoBusca");

        if (!resultado) {
            resultado = document.createElement("p");
            resultado.id = "resultadoBusca";
            resultado.className = "resultado-busca";
            resultado.setAttribute("role", "status");
            formulario.appendChild(resultado);
        }

        return resultado;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const termo = campo.value.trim();
        const resultado = obterResultado();

        resultado.textContent = termo
            ? `Você buscou por: '${termo}'`
            : "Por favor, insira algo na busca";
        resultado.hidden = false;

        clearTimeout(temporizador);
        temporizador = setTimeout(() => { resultado.hidden = true; }, 2500);
    });
}

function configurarMenu() {
    const botaoCategorias = selecionar("#botaoCategorias");
    const menuCategorias = selecionar("#menuCategorias");
    if (!botaoCategorias || !menuCategorias) return;

    const navegacao = selecionar("#navegacao");
    const botaoMenuMobile = selecionar("#botaoMenuMobile");
    const linksNavegacao = selecionarTodos(".links-categorias a[data-departamento]");
    const linksDepartamentos = selecionarTodos(".mega-departamentos a");
    const tituloDepartamento = selecionar(".mega-titulo", menuCategorias);

    const estaAberto = (tipo) => menuCategorias.classList.contains("aberto")
        && menuCategorias.classList.contains(tipo);

    function fechar() {
        menuCategorias.classList.remove("aberto", "menu-geral", "menu-departamento");
        botaoCategorias.classList.remove("ativo");
        botaoCategorias.setAttribute("aria-expanded", "false");

        linksNavegacao.forEach((link) => {
            link.classList.remove("selecionado");
            link.setAttribute("aria-expanded", "false");
        });
    }

    function abrirGeral() {
        fechar();
        menuCategorias.classList.add("aberto", "menu-geral");
        botaoCategorias.classList.add("ativo");
        botaoCategorias.setAttribute("aria-expanded", "true");
    }

    function abrirDepartamento(link) {
        fechar();
        menuCategorias.classList.add("aberto", "menu-departamento");
        link.classList.add("selecionado");
        link.setAttribute("aria-expanded", "true");

        if (tituloDepartamento) {
            tituloDepartamento.textContent = link.dataset.departamento || link.textContent.trim();
        }
    }


    botaoCategorias.addEventListener("click", () => {
        estaAberto("menu-geral") ? fechar() : abrirGeral();
    });

    linksNavegacao.forEach((link) => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault();
            const mesmoAberto = estaAberto("menu-departamento") && link.classList.contains("selecionado");
            mesmoAberto ? fechar() : abrirDepartamento(link);
        });
    });

    
    linksDepartamentos.forEach((link) => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault();
            linksDepartamentos.forEach((item) => item.classList.toggle("selecionado", item === link));
        });
    });

    
    document.addEventListener("click", ({ target }) => {
        const clicouFora = !menuCategorias.contains(target)
            && !botaoCategorias.contains(target)
            && !target.closest(".links-categorias");

        if (clicouFora) fechar();
    });

    document.addEventListener("keydown", ({ key }) => {
        if (key === "Escape") fechar();
    });

    
    botaoMenuMobile?.addEventListener("click", () => {
        const aberto = navegacao?.classList.toggle("menu-aberto") ?? false;
        botaoMenuMobile.setAttribute("aria-expanded", String(aberto));
    });
}


function criarCardProduto({ imagem, nome, precoAnterior, preco, desconto }) {
    return `
        <article class="card-produto">
            <span class="selo-novo">NOVO</span>
            <div class="imagem-produto">
                <img src="${imagem}" alt="Pessoa vestindo camiseta branca">
            </div>
            <div class="informacoes-produto">
                <h3>${nome}</h3>
                <span class="preco-anterior">${precoAnterior}</span>
                <div class="linha-preco">
                    <strong>${preco}</strong>
                    <span class="selo-desconto">${desconto}</span>
                </div>
                <small>Ou em até <strong>10x de R$ 7,90</strong></small>
                <button type="button">Comprar</button>
            </div>
        </article>`;
}

function iniciarCarrossel(listaId, anteriorId, proximoId, indicadoresId) {
    const lista = document.getElementById(listaId);
    const botaoAnterior = document.getElementById(anteriorId);
    const botaoProximo = document.getElementById(proximoId);
    const indicadores = document.getElementById(indicadoresId);
    if (!lista || !botaoAnterior || !botaoProximo || !indicadores) return;

    const quantidadePaginas = 3;
    let paginaAtual = 0;

    lista.innerHTML = produtos.map(criarCardProduto).join("");
    indicadores.innerHTML = "";

    function atualizarCarrossel() {
        const card = selecionar(".card-produto", lista);
        if (!card) return;

        const espaco = parseFloat(getComputedStyle(lista).gap) || 0;
        const intervalo = card.getBoundingClientRect().width + espaco;
        const larguraJanela = lista.parentElement.getBoundingClientRect().width;
        const cardsVisiveis = Math.max(1, Math.floor((larguraJanela + espaco) / intervalo));
        const deslocamentoMaximo = Math.max(0, produtos.length - cardsVisiveis);
        const cardsDeslocados = Math.round(deslocamentoMaximo * paginaAtual / (quantidadePaginas - 1));

        lista.style.transform = `translateX(-${cardsDeslocados * intervalo}px)`;

        selecionarTodos(".indicador", indicadores).forEach((indicador, indice) => {
            const ativo = indice === paginaAtual;
            indicador.classList.toggle("ativo", ativo);
            indicador.setAttribute("aria-current", String(ativo));
        });
    }

    function irParaPagina(pagina) {
        paginaAtual = (pagina + quantidadePaginas) % quantidadePaginas;
        atualizarCarrossel();
    }

    for (let indice = 0; indice < quantidadePaginas; indice++) {
        const indicador = document.createElement("button");
        indicador.type = "button";
        indicador.className = "indicador";
        indicador.setAttribute("aria-label", `Ir para a página ${indice + 1}`);
        indicador.addEventListener("click", () => irParaPagina(indice));
        indicadores.appendChild(indicador);
    }

    botaoAnterior.addEventListener("click", () => irParaPagina(paginaAtual - 1));
    botaoProximo.addEventListener("click", () => irParaPagina(paginaAtual + 1));
    window.addEventListener("resize", atualizarCarrossel);
    atualizarCarrossel();
}


function configurarNewsletter() {
    const formulario = selecionar("#formNewsletter");
    const mensagem = selecionar("#mensagemNewsletter");
    const campoNome = selecionar("#nomeNewsletter");
    const campoEmail = selecionar("#emailNewsletter");
    const aceite = selecionar("#aceiteNewsletter");
    if (!formulario || !mensagem || !campoNome || !campoEmail || !aceite) return;

    const emailEhValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function validar(nome, email) {
        if (!nome || !email) return "Preencha seu nome e e-mail corretamente.";
        if (!emailEhValido(email)) return "Informe um e-mail válido.";
        if (!aceite.checked) return "Aceite a Política de Privacidade para continuar.";
        return "";
    }

    function mostrarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.classList.remove("erro", "sucesso");
        mensagem.classList.add(tipo);
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = campoNome.value.trim();
        const email = campoEmail.value.trim();
        const erro = validar(nome, email);

        if (erro) {
            mostrarMensagem(erro, "erro");
            return;
        }

        mostrarMensagem(`Cadastro realizado com sucesso, ${nome}!`, "sucesso");
        formulario.reset();
    });
}


function configurarAcordeaoRodape() {
    const colunas = selecionarTodos(".rodape-coluna");
    const ehDesktop = () => window.matchMedia("(min-width: 768px)").matches;

    function definirColuna(coluna, aberta) {
        coluna.classList.toggle("aberto", aberta);
        selecionar("h4", coluna)?.setAttribute("aria-expanded", String(aberta));
    }

    colunas.forEach((coluna) => {
        const titulo = selecionar("h4", coluna);
        if (!titulo) return;

        titulo.setAttribute("tabindex", "0");
        titulo.setAttribute("role", "button");
        titulo.setAttribute("aria-expanded", "false");

        function alternar() {
            if (ehDesktop()) return;

            const estavaAberta = coluna.classList.contains("aberto");
            colunas.forEach((item) => definirColuna(item, false));
            if (!estavaAberta) definirColuna(coluna, true);
        }

        titulo.addEventListener("click", alternar);
        titulo.addEventListener("keydown", (evento) => {
            if (evento.key !== "Enter" && evento.key !== " ") return;
            evento.preventDefault();
            alternar();
        });
    });
}


function configurarEfeitoBotoes() {
    const temporizadores = new WeakMap();

    document.addEventListener("click", ({ target }) => {
        const botao = target.closest?.("button");
        if (!botao) return;

        botao.classList.add("estado-temporario");
        clearTimeout(temporizadores.get(botao));
        temporizadores.set(botao, setTimeout(() => {
            botao.classList.remove("estado-temporario");
            temporizadores.delete(botao);
        }, 1200));
    });
}


function iniciar() {
    configurarBusca();
    configurarMenu();
    iniciarCarrossel("listaProdutos", "produtosAnterior", "produtosProximo", "indicadoresProdutos");
    iniciarCarrossel("listaProdutos2", "produtosAnterior2", "produtosProximo2", "indicadoresProdutos2");
    configurarNewsletter();
    configurarAcordeaoRodape();
    configurarEfeitoBotoes();
}

iniciar();