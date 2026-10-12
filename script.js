// =====================================================
// HELPERS DE IMAGEM
// =====================================================

// gerarImagens("Air-Jordan-4-bred", 6, "jpeg")
//   -> img/Air-Jordan-4-bred-1.jpeg ... img/Air-Jordan-4-bred-6.jpeg
function gerarImagens(prefixo, quantidade, extensao = "jpeg") {
  return Array.from({ length: quantidade }, (_, i) => `img/${prefixo}-${i + 1}.${extensao}`);
}

// Imagem de reserva (SVG embutido) quando um arquivo não for encontrado
const IMG_RESERVA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
    '<rect width="100%" height="100%" fill="#eee"/>' +
    '<text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial" font-size="20">Sem imagem</text>' +
    '</svg>'
  );
window.IMG_RESERVA = IMG_RESERVA;

// =====================================================
// CONFIGURAÇÕES DA LOJA
// =====================================================
const VALOR_FRETE = 29.90;
const CHAVE_CARRINHO = "vault-carrinho-v2";

// =====================================================
// CONFIGURAÇÃO DO "FALE CONOSCO"
// =====================================================
const CONTATO = {
  email: "contato@vaultsneakers.com",  // para onde vai a mensagem (modo e-mail)
  whatsapp: "",                         // AJUSTE: só números com DDI+DDD, ex.: "5511999999999" (vazio = botão escondido)
  endpoint: ""                          // OPCIONAL: URL do Formspree/Getform p/ envio direto, ex.: "https://formspree.io/f/xxxxxxx"
};

// =====================================================
// CRIAÇÃO DE PRODUTOS (calcula os preços sozinho)
// =====================================================
const DESCRICOES = {
  "Air Force": "O ícone do basquete que virou clássico das ruas: visual limpo, construção em couro e amortecimento Air para o dia todo.",
  "Jordan": "Herança do basquete em um design inconfundível. Conforto, estilo e a atitude Jordan em cada passo.",
  "Air Max": "Amortecimento Air visível e visual marcante, feito para quem quer conforto e presença em qualquer ocasião.",
  "Dunk": "Nascido nas quadras e adotado pela cultura de rua: silhueta clássica e combinações de cores que chamam atenção.",
  "Casual": "Estilo versátil para o dia a dia, combinando com qualquer look e confortável do começo ao fim do dia.",
  "Shox": "Amortecimento com molas no calcanhar e visual futurista, direto do início dos anos 2000."
};

function criarProduto(id, dados) {
  const { nome, categoria, prefixo, qtd, preco, desconto, extensao = "jpeg", imagens } = dados;

  const temDesconto = desconto > 0;
  const precoDe = temDesconto ? Math.round(preco / (1 - desconto / 100) / 10) * 10 - 0.10 : 0;
  const precoPix = temDesconto ? Math.floor(preco * (1 - desconto / 100) * 100) / 100 : 0;
  const parcela = preco / 10;
  const br = (v) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    id,
    nome,
    marca: "Nike",
    categoria,
    logoMarca: "NIKE",
    desconto: temDesconto ? `${desconto}% OFF` : "",
    freteGratis: dados.freteGratis === true,
    precoPorNum: preco,
    precoPor: br(preco),
    precoPix: temDesconto ? `${br(precoPix)} no PIX` : "",
    precoDe: temDesconto ? br(precoDe) : "",
    parcelas: `ou 10x de ${br(parcela)} sem juros`,
    descricao: dados.descricao || DESCRICOES[categoria] || "",
    imagens: imagens || gerarImagens(prefixo, qtd, extensao)
  };
}

// =====================================================
// CATÁLOGO
// =====================================================
// Cada linha: o "prefixo" é o nome do arquivo SEM o "-número.jpeg".
// AJUSTE os preços e descontos como quiser.
const DADOS_PRODUTOS = [
  // ---------- AIR FORCE 1 ----------
  { nome: "Air force 1 low panda", freteGratis: true, categoria: "Air Force", prefixo: "Air-force-1-low-panda", qtd: 8, preco: 799.90, desconto: 20,
    descricao: "O brilho continua vivo no Nike Air force 1 low panda, o ícone do basquete que dá um toque moderno naquilo que você conhece bem." },
  { nome: "Nike Air Force 1 Low Blue White", categoria: "Air Force", prefixo: "Air-force-1-blue-white", qtd: 8, preco: 799.90, desconto: 0,
    // a foto nº 1 tem o nome "Air-force-1 blue-&-white-1.jpeg" (com espaço e &)
    imagens: ["img/Air-force-1 blue-&-white-1.jpeg", ...gerarImagens("Air-force-1-blue-white", 8).slice(1)] },
  { nome: "Nike Air Force 1 Low Triple Black", categoria: "Air Force", prefixo: "Air-force-1-triple-black", qtd: 8, preco: 799.90, desconto: 0 },
  { nome: "Nike Air Force 1 Low Triple White", categoria: "Air Force", prefixo: "Air-force-1-triple-white", qtd: 8, preco: 799.90, desconto: 10 },
  { nome: "Nike Air Force 1 Low WB", categoria: "Air Force", prefixo: "Air-force-1-wb", qtd: 8, preco: 799.90, desconto: 0 },
  { nome: "Nike Air Force 1 Low White Grey", categoria: "Air Force", prefixo: "Air-force-1-white-grey", qtd: 8, preco: 799.90, desconto: 0 },

  // ---------- JORDAN 4 ----------
  { nome: "Nike Air Jordan 4 Black Cat", freteGratis: true, categoria: "Jordan", prefixo: "Air-Jordan-4-Black-Cat", qtd: 6, preco: 1499.90, desconto: 10 },
  { nome: "Nike Air Jordan 4 Bred", categoria: "Jordan", prefixo: "Air-Jordan-4-bred", qtd: 6, preco: 1499.90, desconto: 10 },
  { nome: "Nike Air Jordan 4 Midnight Navy", categoria: "Jordan", prefixo: "Air-Jordan-4-Midnight-Navy", qtd: 6, preco: 1499.90, desconto: 0 },
  { nome: "Nike Air Jordan 4 Military Black", categoria: "Jordan", prefixo: "Air-Jordan-4-Military-Black", qtd: 6, preco: 1499.90, desconto: 0 },
  { nome: "Nike Air Jordan 4 Taupe Haze", categoria: "Jordan", prefixo: "Air-Jordan-4-Taupe-Haze", qtd: 6, preco: 1499.90, desconto: 0 },
  { nome: "Nike Air Jordan 4 University Blue", categoria: "Jordan", prefixo: "Air-Jordan-4-University-Blue", qtd: 6, preco: 1499.90, desconto: 0 },

  // ---------- AIR MAX 95 ----------
  { nome: "Nike Air Max 95 Big Bubble Comet Red", categoria: "Air Max", prefixo: "Air-Max-95-Big-Bubble-Comet-Red", qtd: 8, preco: 999.90, desconto: 0 },
  { nome: "Nike Air Max 95 Neon", freteGratis: true, categoria: "Air Max", prefixo: "Air-Max-95-Neon", qtd: 8, preco: 999.90, desconto: 20 },
  { nome: "Nike Air Max 95 Pink Foam", categoria: "Air Max", prefixo: "Air-Max-95-Pink-Foam", qtd: 8, preco: 999.90, desconto: 20 },
  { nome: "Nike Air Max 95 Triple White", categoria: "Air Max", prefixo: "Air-Max-95-Triple-White", qtd: 8, preco: 999.90, desconto: 0 },

  // ---------- AIR MAX DN ----------
  { nome: "Nike Air Max Dn Medium Violet", categoria: "Air Max", prefixo: "Air-Max-Dn-Medium-Violet", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn NRG Marrom", categoria: "Air Max", prefixo: "Air-Max-Dn-NRG-Marrom", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn Photon Dust White", categoria: "Air Max", prefixo: "Air-Max-Dn-Photon-Dust-White", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn Roam Black", categoria: "Air Max", prefixo: "Air-Max-Dn-Roam-Black", qtd: 8, preco: 1199.90, desconto: 10 },
  { nome: "Nike Air Max Dn Triple White", categoria: "Air Max", prefixo: "Air-Max-Dn-Triple-White", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn University Blue", categoria: "Air Max", prefixo: "Air-Max-Dn-University-Blue", qtd: 8, preco: 1199.90, desconto: 0 },

  // ---------- AIR MAX PLUS TN ----------
  { nome: "Nike Air Max Plus TN Hyper Pink Volt", categoria: "Air Max", prefixo: "Air-max-plus-Tn-Hyper-PinkVolt", qtd: 8, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN Tough Red Black", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Tough-RedBlack", qtd: 8, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN Triple Black", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Triple-Black", qtd: 6, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN Triple White", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Triple-White", qtd: 6, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN White Blue Crystal", categoria: "Air Max", prefixo: "Air-max-plus-Tn-White-Blue-Crystal", qtd: 8, preco: 1099.90, desconto: 0 },

  // ---------- DUNK LOW ----------
  { nome: "Nike Dunk Low Blue White", categoria: "Dunk", prefixo: "Dunk-Low-Blue-white", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Burgundy Crush", categoria: "Dunk", prefixo: "Dunk-Low-Burgundy-Crush", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Grey Fog", categoria: "Dunk", prefixo: "Dunk-Low-Grey-Fog", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Panda", freteGratis: true, categoria: "Dunk", prefixo: "Dunk-Low-panda", qtd: 8, preco: 899.90, desconto: 20 },
  { nome: "Nike Dunk Low Syracuse", categoria: "Dunk", prefixo: "Dunk-Low-Syracuse", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Varsity Green", categoria: "Dunk", prefixo: "Dunk-Low-Varsity-Green", qtd: 8, preco: 899.90, desconto: 0 },

  // ---------- AIR MAX EXCEE ----------
  { nome: "Nike Air Max Excee White Grey", categoria: "Casual", prefixo: "Nike-Air-Max-Excee-White-Grey", qtd: 6, preco: 599.90, desconto: 0 },

  // ---------- COURT VISION ----------
  { nome: "Nike Court Vision Low", freteGratis: true, categoria: "Casual", prefixo: "Nike-Court-Vision-Low-White", qtd: 6, preco: 499.90, desconto: 10,
    descricao: "Combina o estilo de ataque do basquete dos anos 80 com a cultura acelerada do jogo atual." },
  { nome: "Nike Court Vision Alta Black White", categoria: "Casual", prefixo: "Nike-Court-Vision-Alta-Black-White", qtd: 6, preco: 549.90, desconto: 0 },
  { nome: "Nike Court Vision Alta Triple White", categoria: "Casual", prefixo: "Nike-Court-Vision-Alta-Triple-White", qtd: 6, preco: 549.90, desconto: 0 },

  // ---------- SHOX R4 ----------
  { nome: "Nike Shox R4 Black Pinksicle", categoria: "Shox", prefixo: "Nike-Shox-R4-Black-Pinksicle", qtd: 6, preco: 899.90, desconto: 10 },
  { nome: "Nike Shox R4 Blue Lagoon", categoria: "Shox", prefixo: "Nike-shox-R4-Blue-Lagoon", qtd: 6, preco: 899.90, desconto: 0 },
  { nome: "Nike Shox R4 Phantom Picante Red", categoria: "Shox", prefixo: "Nike-Shox-R4-Phantom-Picante-Red", qtd: 6, preco: 899.90, desconto: 0 },
  { nome: "Nike Shox R4 White Metallic", categoria: "Shox", prefixo: "Nike-Shox-R4-White-Metallic", qtd: 6, preco: 899.90, desconto: 0 }

  // ---------- PENDENTES (nomes cortados no print; cole o nome completo e descomente) ----------
  // { nome: "Nike Air Max 95 Big Bubble Laser Paisley", categoria: "Air Max", prefixo: "Air-Max-95-Big-Bubble-Laser-Paisley-Gr...", qtd: 8, preco: 999.90, desconto: 0 },
  // { nome: "Nike Air Max 95 Big Bubble SE Obsidian", categoria: "Air Max", prefixo: "Air-Max-95-Big-Bubble-SE-Obsidian-W...", qtd: 8, preco: 999.90, desconto: 0 },
  // { nome: "Nike Air Max Plus TN Black Light Smoke Grey", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Black-Light-Smoke-Gre...", qtd: 8, preco: 1099.90, desconto: 0 },
];

const produtos = DADOS_PRODUTOS.map((dados, i) => criarProduto(i + 1, dados));

// =====================================================
// ESTADO
// =====================================================
let carrinho = [];
let tamanhoSelecionado = null;
let contadorItemCarrinho = 0;
let filtroAtual = "todos";
let termoBusca = "";

// =====================================================
// UTILITÁRIOS
// =====================================================
function formatarPreco(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function mostrarAviso(mensagem) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = mensagem;
  toast.classList.add("show");
  clearTimeout(mostrarAviso._timer);
  mostrarAviso._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// =====================================================
// NAVEGAÇÃO ENTRE PÁGINAS
// =====================================================
function mudarPagina(idSecao) {
  const secaoAlvo = document.getElementById(idSecao);
  if (!secaoAlvo) return;
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
  secaoAlvo.classList.add("active");
  window.scrollTo(0, 0);
}

// =====================================================
// FILTROS (gerados automaticamente a partir dos produtos)
// =====================================================
function gerarFiltros() {
  const container = document.querySelector(".filters");
  if (!container) return;

  const categorias = [...new Set(produtos.map(p => p.categoria))];
  const nomes = ["Todos", "Nike", ...categorias];

  container.innerHTML = nomes.map((nome, i) => {
    const valor = nome === "Todos" ? "todos" : nome;
    return `<button class="filter-btn${i === 0 ? " active" : ""}" data-filtro="${valor}">${nome}</button>`;
  }).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => filtrarProdutos(btn.dataset.filtro, btn));
  });
}

// =====================================================
// RENDERIZAÇÃO DOS PRODUTOS
// =====================================================
function renderizarProdutos(lista) {
  const grid = document.getElementById("grid-produtos");
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>';
    return;
  }

  grid.innerHTML = lista.map(prod => {
    const tagDesconto = prod.desconto ? `<span class="tag-off">${prod.desconto}</span>` : "";
    const tagFrete = prod.freteGratis ? `<span class="tag-frete">FRETE GRÁTIS</span>` : "";
    const precoDeHTML = prod.precoDe ? `<span class="price-old">${prod.precoDe}</span>` : "";
    const precoPixHTML = prod.precoPix ? `<span class="price-promo">${prod.precoPix}</span>` : "";

    return `
      <div class="product-card" onclick="abrirDetalhes(${prod.id})">
        <div class="card-top">
          <div class="brand-badge">${prod.logoMarca}</div>
          <div class="top-tags">
            ${tagDesconto}
            ${tagFrete}
          </div>
          <img src="${encodeURI(prod.imagens[0])}" alt="${prod.nome}" loading="lazy" onerror="this.onerror=null; this.src=IMG_RESERVA;">
        </div>
        <div class="product-info-box">
          <h3 class="product-title-text">${prod.nome}</h3>
          <div class="price-row">
            <span class="price-main">${prod.precoPor}</span>
            ${precoDeHTML}
            ${precoPixHTML}
          </div>
          <div class="price-installments">${prod.parcelas}</div>
        </div>
      </div>
    `;
  }).join("");
}

// =====================================================
// BUSCA + FILTRO (trabalham juntos)
// =====================================================
function aplicarFiltros() {
  const termo = termoBusca.toLowerCase().trim();
  const filtro = filtroAtual.toLowerCase();

  const resultado = produtos.filter(p => {
    const passaFiltro =
      filtro === "todos" ||
      p.categoria.toLowerCase() === filtro ||
      p.marca.toLowerCase() === filtro;

    const passaBusca =
      termo === "" ||
      p.nome.toLowerCase().includes(termo) ||
      p.marca.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo);

    return passaFiltro && passaBusca;
  });

  renderizarProdutos(resultado);
}

function buscarProduto(termo) {
  termoBusca = termo || "";
  aplicarFiltros();
  if (termoBusca.trim() !== "") mudarPagina("home");
}

function filtrarProdutos(filtro, elementoBotao) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (elementoBotao) elementoBotao.classList.add("active");
  filtroAtual = filtro;
  aplicarFiltros();
}

// =====================================================
// PÁGINA DE DETALHES DO PRODUTO
// =====================================================
function abrirDetalhes(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;

  tamanhoSelecionado = null;
  const container = document.getElementById("detalhes-conteudo");
  if (!container) return;

  // Se uma foto não existir, a miniatura some sozinha
  const thumbsHTML = prod.imagens.map((img, index) =>
    `<img src="${encodeURI(img)}" data-src="${encodeURI(img)}" class="${index === 0 ? "active-thumb" : ""}" onclick="trocarFotoPrincipal(this)" onerror="this.remove()" alt="Foto ${index + 1} de ${prod.nome}">`
  ).join("");

  const tamanhosHTML = ["37", "38", "39", "40", "41", "42"].map(t =>
    `<button class="size-btn" onclick="selecionarTamanho(this, '${t}')">${t}</button>`
  ).join("");

  container.innerHTML = `
    <div>
      <img id="foto-principal" class="gallery-main" src="${encodeURI(prod.imagens[0])}" alt="${prod.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
      <div class="gallery-thumbs">
        ${thumbsHTML}
      </div>
    </div>
    <div class="product-details-info">
      <span class="detail-tag">${prod.marca} • ${prod.categoria}</span>
      <h2>${prod.nome}</h2>
      <div class="detail-price-row">
        <strong class="detail-price">${prod.precoPor}</strong>
        ${prod.precoDe ? `<span class="detail-old">${prod.precoDe}</span>` : ""}
      </div>
      ${prod.precoPix ? `${prod.precoPix ? `<p class="detail-pix">${prod.precoPix}</p>` : ""}` : ""}
      <p class="detail-installments">${prod.parcelas}</p>
      <p class="detail-desc">${prod.descricao}</p>

      <div class="sizes-container">
        <label>Selecione o Tamanho:</label>
        <div class="sizes-grid">
          ${tamanhosHTML}
        </div>
      </div>

      <button class="btn-buy" onclick="adicionarAoCarrinho(${prod.id})">Adicionar à Sacola 🛒</button>
    </div>
  `;

  mudarPagina("detalhes");
}

function trocarFotoPrincipal(elementoThumb) {
  const fotoPrincipal = document.getElementById("foto-principal");
  if (fotoPrincipal) fotoPrincipal.src = elementoThumb.dataset.src;
  document.querySelectorAll(".gallery-thumbs img").forEach(img => img.classList.remove("active-thumb"));
  elementoThumb.classList.add("active-thumb");
}

function selecionarTamanho(elementoBtn, tamanho) {
  document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
  elementoBtn.classList.add("selected");
  tamanhoSelecionado = tamanho;
}

// =====================================================
// CARRINHO
// =====================================================
function salvarCarrinho() {
  try {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  } catch (e) { /* storage indisponível */ }
}

function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
    if (!Array.isArray(salvo)) return;
    // recarrega os dados atuais do produto (preço, frete) e mantém tamanho/id do item
    carrinho = salvo
      .filter(item => produtos.some(p => p.id === item.id && p.nome === item.nome))
      .map(item => ({ ...produtos.find(p => p.id === item.id), tamanho: item.tamanho, cartItemId: item.cartItemId }));
    contadorItemCarrinho = carrinho.reduce((max, item) => Math.max(max, item.cartItemId || 0), 0);
  } catch (e) {
    carrinho = [];
  }
}

function adicionarAoCarrinho(idProduto) {
  if (!tamanhoSelecionado) {
    mostrarAviso("Selecione um tamanho antes de adicionar à sacola.");
    return;
  }
  const prod = produtos.find(p => p.id === idProduto);
  if (!prod) return;

  contadorItemCarrinho++;
  carrinho.push({ ...prod, tamanho: tamanhoSelecionado, cartItemId: contadorItemCarrinho });

  atualizarCarrinho();
  mostrarAviso(`${prod.nome} (Tam. ${tamanhoSelecionado}) adicionado à sacola! 🛒`);
}

function removerDoCarrinho(cartItemId) {
  carrinho = carrinho.filter(item => item.cartItemId !== cartItemId);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = carrinho.length;
    badge.style.display = carrinho.length ? "flex" : "none";
  }

  const lista = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("cart-subtotal");
  const freteEl = document.getElementById("cart-frete");
  const totalEl = document.getElementById("cart-total");

  const subtotal = carrinho.reduce((soma, item) => soma + item.precoPorNum, 0);
  const todosFreteGratis = carrinho.every(item => item.freteGratis);
  const frete = carrinho.length === 0 || todosFreteGratis ? 0 : VALOR_FRETE;
  const total = subtotal + frete;

  if (lista) {
    if (carrinho.length === 0) {
      lista.innerHTML = '<p class="empty-cart-msg">Sua sacola está vazia.</p>';
    } else {
      lista.innerHTML = carrinho.map(item => `
        <div class="cart-item">
          <img src="${encodeURI(item.imagens[0])}" alt="${item.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
          <div class="cart-item-details">
            <h4>${item.nome}</h4>
            <p>Tamanho: ${item.tamanho}</p>
            <button class="btn-remove" onclick="removerDoCarrinho(${item.cartItemId})">Remover</button>
          </div>
          <div class="cart-item-price">${item.precoPor}</div>
        </div>
      `).join("");
    }
  }

  if (subtotalEl) subtotalEl.textContent = formatarPreco(subtotal);
  if (freteEl) {
    if (carrinho.length === 0) freteEl.textContent = "—";
    else if (frete === 0) freteEl.textContent = "GRÁTIS";
    else freteEl.textContent = formatarPreco(frete);
    freteEl.classList.toggle("frete-gratis", frete === 0 && carrinho.length > 0);
  }
  if (totalEl) totalEl.textContent = formatarPreco(total);

  salvarCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    mostrarAviso("Sua sacola está vazia.");
    return;
  }
  alert("Pedido finalizado com sucesso! 🎉");
  carrinho = [];
  atualizarCarrinho();
  mudarPagina("home");
}

// =====================================================
// FALE CONOSCO
// =====================================================
function iniciarFormContato() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  const status = document.getElementById("contato-status");
  const btnEnviar = document.getElementById("btn-enviar-contato");
  const btnWhats = document.getElementById("btn-whatsapp");

  if (CONTATO.whatsapp && btnWhats) btnWhats.style.display = "block";

  const mostrarStatus = (texto, tipo) => {
    status.textContent = texto;
    status.className = "form-status " + tipo;
  };

  const pegarDados = () => ({
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    assunto: form.assunto.value,
    mensagem: form.mensagem.value.trim()
  });

  // Validação campo a campo, com mensagem embaixo de cada um
  function validar() {
    const d = pegarDados();
    const regras = [
      { campo: form.nome, ok: d.nome.length >= 2, msg: "Digite seu nome." },
      { campo: form.email, ok: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email), msg: "Digite um e-mail válido." },
      { campo: form.mensagem, ok: d.mensagem.length >= 10, msg: "Escreva pelo menos 10 caracteres." }
    ];
    let tudoOk = true;
    regras.forEach(r => {
      const grupo = r.campo.closest(".input-group");
      grupo.classList.toggle("invalid", !r.ok);
      grupo.querySelector(".field-error").textContent = r.ok ? "" : r.msg;
      if (!r.ok) tudoOk = false;
    });
    return tudoOk;
  }

  // limpa o erro ao digitar
  form.querySelectorAll("input, textarea").forEach(campo => {
    campo.addEventListener("input", () => campo.closest(".input-group")?.classList.remove("invalid"));
  });

  const montarTexto = (d) =>
    `Nome: ${d.nome}\nE-mail: ${d.email}\nAssunto: ${d.assunto}\n\n${d.mensagem}`;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    mostrarStatus("", "");

    // campo isca preenchido = robô, finge que enviou
    if (document.getElementById("contato-site").value) {
      mostrarStatus("Mensagem enviada!", "ok");
      return;
    }
    if (!validar()) return;

    const d = pegarDados();

    // Modo 1: envio direto por endpoint (Formspree etc.)
    if (CONTATO.endpoint) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";
      try {
        const resp = await fetch(CONTATO.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ nome: d.nome, email: d.email, assunto: d.assunto, mensagem: d.mensagem })
        });
        if (!resp.ok) throw new Error("Falha no envio");
        form.reset();
        mostrarStatus("Mensagem enviada com sucesso! Responderemos em breve. 🎉", "ok");
      } catch (err) {
        mostrarStatus("Não foi possível enviar agora. Tente novamente ou use o e-mail " + CONTATO.email, "erro");
      } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar Mensagem";
      }
      return;
    }

    // Modo 2 (padrão): abre o app de e-mail do cliente com a mensagem pronta
    const assuntoEmail = encodeURIComponent(`[Vault Sneakers] ${d.assunto}`);
    const corpo = encodeURIComponent(montarTexto(d));
    window.location.href = `mailto:${CONTATO.email}?subject=${assuntoEmail}&body=${corpo}`;
    mostrarStatus("Abrindo seu aplicativo de e-mail... É só apertar em enviar por lá. ✉️", "ok");
  });

  if (btnWhats) {
    btnWhats.addEventListener("click", () => {
      if (!validar()) return;
      const texto = encodeURIComponent(montarTexto(pegarDados()));
      window.open(`https://wa.me/${CONTATO.whatsapp}?text=${texto}`, "_blank", "noopener");
      mostrarStatus("Abrindo o WhatsApp... 💬", "ok");
    });
  }
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  atualizarCarrinho();
  gerarFiltros();
  aplicarFiltros();
  iniciarFormContato();

  const inputBusca = document.getElementById("input-busca");
  if (inputBusca) {
    inputBusca.addEventListener("input", (e) => buscarProduto(e.target.value));
  }
});
