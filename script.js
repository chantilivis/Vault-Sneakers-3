// =====================================================
// HELPERS DE IMAGEM
// =====================================================

// Gera os caminhos das imagens a partir do padrão do renomeador:
//   gerarImagens("Air-Jordan-1-Mid", 6, "jpeg")
//   -> img/Air-Jordan-1-Mid-1.jpeg ... img/Air-Jordan-1-Mid-6.jpeg
function gerarImagens(prefixo, quantidade, extensao = "jpg") {
  return Array.from({ length: quantidade }, (_, i) => `img/${prefixo}-${i + 1}.${extensao}`);
}

// Imagem de reserva (SVG embutido) para quando um arquivo não for encontrado
const IMG_RESERVA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
    '<rect width="100%" height="100%" fill="#eee"/>' +
    '<text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial" font-size="20">Sem imagem</text>' +
    '</svg>'
  );

// =====================================================
// PRODUTOS
// =====================================================
// ATENÇÃO: o 1º parâmetro de gerarImagens() precisa ser IGUAL ao nome dos
// arquivos na pasta img (sem o "-número.extensão"), inclusive maiúsculas.
// A extensão (jpg / jpeg / png) também precisa ser igual à do arquivo real.
const produtos = [
  {
    id: 1,
    nome: "Air force 1 low panda",
    marca: "Nike",
    categoria: "Air Force",
    logoMarca: "NIKE",
    desconto: "15% OFF",
    freteGratis: true,
    precoPorNum: 799.90,
    precoPor: "R$ 799,90",
    precoPix: "R$ 679,91 no PIX",
    precoDe: "R$ 939,90",
    parcelas: "ou 10x de R$ 79,99 sem juros",
    descricao: "O brilho continua vivo no Nike Air force 1 low panda, o ícone do basquete que dá um toque moderno naquilo que você conhece bem.",
    imagens: gerarImagens("Air-Force-1-Panda", 8, "jpg")      // 1 a 8
  },
  {
    id: 2,
    nome: "Nike Air Jordan 1 Mid",
    marca: "Nike",
    categoria: "Jordan",
    logoMarca: "NIKE",
    desconto: "10% OFF",
    freteGratis: true,
    precoPorNum: 1099.90,
    precoPor: "R$ 1.099,90",
    precoPix: "R$ 989,91 no PIX",
    precoDe: "R$ 1.219,90",
    parcelas: "ou 10x de R$ 109,99 sem juros",
    descricao: "Inspirado no primeiro AJ1, o tênis Air Jordan 1 Mid oferece aos fãs a oportunidade de seguir os passos da grandeza.",
    imagens: gerarImagens("Air-Jordan-1-Mid", 6, "jpeg")      // AJUSTE: prefixo, quantidade e extensão
  },
  {
    id: 3,
    nome: "Nike Air Max 90",
    marca: "Nike",
    categoria: "Air Max",
    logoMarca: "NIKE",
    desconto: "20% OFF",
    freteGratis: false,
    precoPorNum: 699.90,
    precoPor: "R$ 699,90",
    precoPix: "R$ 629,91 no PIX",
    precoDe: "R$ 874,90",
    parcelas: "ou 10x de R$ 69,99 sem juros",
    descricao: "Nada como o conforto e a tradição comprovada do Nike Air Max 90, com o icônico solado Waffle e amortecimento Air visível.",
    imagens: gerarImagens("Air-Max-90", 6, "jpeg")            // AJUSTE
  },
  {
    id: 4,
    nome: "Nike Court Vision Low",
    marca: "Nike",
    categoria: "Casual",
    logoMarca: "NIKE",
    desconto: "5% OFF",
    freteGratis: true,
    precoPorNum: 499.90,
    precoPor: "R$ 499,90",
    precoPix: "R$ 474,91 no PIX",
    precoDe: "R$ 529,90",
    parcelas: "ou 6x de R$ 83,31 sem juros",
    descricao: "Combina o estilo de ataque do basquete dos anos 80 com a cultura acelerada do jogo atual.",
    imagens: gerarImagens("Nike-Court-Vision-Low", 6, "jpeg") // AJUSTE
  },
  {
    id: 5,
    nome: "Nike Revolution 6 Next Nature",
    marca: "Nike",
    categoria: "Esportivo",
    logoMarca: "NIKE",
    desconto: "25% OFF",
    freteGratis: true,
    precoPorNum: 299.90,
    precoPor: "R$ 299,90",
    precoPix: "R$ 269,91 no PIX",
    precoDe: "R$ 399,90",
    parcelas: "ou 4x de R$ 74,97 sem juros",
    descricao: "Defina o ritmo no início da sua corrida com a sensação de maciez do Nike Revolution 6.",
    imagens: gerarImagens("Nike-Revolution-6", 6, "jpeg")     // AJUSTE
  }
];

let carrinho = [];
let tamanhoSelecionado = null;
let contadorItemCarrinho = 0;

// =====================================================
// NAVEGAÇÃO ENTRE PÁGINAS
// =====================================================
function mudarPagina(idSecao) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  const secaoAlvo = document.getElementById(idSecao);
  if (secaoAlvo) {
    secaoAlvo.classList.add('active');
  }
  window.scrollTo(0, 0);
}

// =====================================================
// RENDERIZAÇÃO DOS PRODUTOS
// =====================================================
function renderizarProdutos(lista) {
  const grid = document.getElementById('grid-produtos');
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>';
    return;
  }

  // Monta tudo numa string e atribui uma única vez (mais rápido que usar += no loop)
  const html = lista.map(prod => {
    const tagDesconto = prod.desconto ? `<span class="tag-off">${prod.desconto}</span>` : '';
    const tagFrete = prod.freteGratis ? `<span class="tag-frete">FRETE GRÁTIS</span>` : '';
    const precoDeHTML = prod.precoDe ? `<span class="price-old">${prod.precoDe}</span>` : '';

    return `
      <div class="product-card" onclick="abrirDetalhes(${prod.id})">
        <div class="card-top">
          <div class="brand-badge">${prod.logoMarca}</div>
          <div class="top-tags">
            ${tagDesconto}
            ${tagFrete}
          </div>
          <img src="${encodeURI(prod.imagens[0])}" alt="${prod.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
        </div>
        <div class="product-info-box">
          <h3 class="product-title-text">${prod.nome}</h3>
          <div class="price-row">
            <span class="price-main">${prod.precoPor}</span>
            ${precoDeHTML}
            <span class="price-promo">${prod.precoPix}</span>
          </div>
          <div class="price-installments">${prod.parcelas}</div>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = html;
}

// =====================================================
// CAMPO DE BUSCA
// =====================================================
function buscarProduto(termo) {
  const termoLimpo = termo.toLowerCase().trim();
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termoLimpo) ||
    p.marca.toLowerCase().includes(termoLimpo) ||
    p.categoria.toLowerCase().includes(termoLimpo)
  );
  renderizarProdutos(filtrados);
}

// =====================================================
// FILTROS DE CATEGORIA
// =====================================================
function filtrarProdutos(filtro, elementoBotao) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (elementoBotao) elementoBotao.classList.add('active');

  if (filtro === 'todos') {
    renderizarProdutos(produtos);
  } else {
    const filtrados = produtos.filter(p => p.categoria.toLowerCase() === filtro.toLowerCase());
    renderizarProdutos(filtrados);
  }
}

// =====================================================
// PÁGINA DE DETALHES DO PRODUTO
// =====================================================
function abrirDetalhes(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;

  tamanhoSelecionado = null;
  const container = document.getElementById('detalhes-conteudo');
  const bc = document.getElementById('detalhes-breadcrumbs');

  if (bc) {
    bc.innerHTML = `<span style="cursor:pointer" onclick="mudarPagina('home')">← Voltar</span> / <span>${prod.marca}</span> / <span>${prod.nome}</span>`;
  }

  if (!container) return;

  // O caminho vai em data-src (e não dentro do onclick), então nomes com
  // espaços ou caracteres especiais não quebram mais o HTML.
  // Se uma imagem não existir (ex.: só tem 5 fotos), a miniatura é removida.
  let thumbsHTML = '';
  prod.imagens.forEach((img, index) => {
    thumbsHTML += `<img src="${encodeURI(img)}" data-src="${encodeURI(img)}" class="${index === 0 ? 'active-thumb' : ''}" onclick="trocarFotoPrincipal(this)" onerror="this.remove()" alt="Foto ${index + 1} de ${prod.nome}">`;
  });

  container.innerHTML = `
    <div>
      <img id="foto-principal" class="gallery-main" src="${encodeURI(prod.imagens[0])}" alt="${prod.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
      <div class="gallery-thumbs">
        ${thumbsHTML}
      </div>
    </div>
    <div class="product-details-info">
      <span style="background:#000; color:#fff; padding:4px 8px; border-radius:4px; display:inline-block; margin-bottom:8px; font-size:0.8rem;">${prod.marca} • ${prod.categoria}</span>
      <h2>${prod.nome}</h2>
      <div style="margin: 10px 0;">
        <strong style="font-size:1.4rem;">${prod.precoPor}</strong>
        <span style="font-size:0.9rem; color:#888; text-decoration:line-through; margin-left:8px;">${prod.precoDe || ''}</span>
      </div>
      <p style="color: #2e7d32; font-weight: bold; margin-bottom: 5px;">${prod.precoPix}</p>
      <p style="color: #666; font-size: 0.9rem;">${prod.parcelas}</p>
      <p style="margin: 15px 0;">${prod.descricao}</p>

      <div style="margin-top:20px;">
        <label style="display:block; margin-bottom:8px; font-weight:bold;">Selecione o Tamanho:</label>
        <div class="sizes-grid">
          <button class="size-btn" onclick="selecionarTamanho(this, '37')">37</button>
          <button class="size-btn" onclick="selecionarTamanho(this, '38')">38</button>
          <button class="size-btn" onclick="selecionarTamanho(this, '39')">39</button>
          <button class="size-btn" onclick="selecionarTamanho(this, '40')">40</button>
          <button class="size-btn" onclick="selecionarTamanho(this, '41')">41</button>
        </div>
      </div>

      <button style="margin-top:20px; padding:12px 24px; background:#ff007a; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="adicionarAoCarrinho(${prod.id})">Adicionar à Sacola 🛒</button>
    </div>
  `;

  mudarPagina('detalhes');
}

// =====================================================
// TROCA DE IMAGEM PRINCIPAL
// =====================================================
function trocarFotoPrincipal(elementoThumb) {
  const fotoPrincipal = document.getElementById('foto-principal');
  if (fotoPrincipal) {
    fotoPrincipal.src = elementoThumb.dataset.src;
  }
  document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active-thumb'));
  elementoThumb.classList.add('active-thumb');
}

// =====================================================
// SELEÇÃO DE TAMANHO DO TÊNIS
// =====================================================
function selecionarTamanho(elementoBtn, tamanho) {
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
  elementoBtn.classList.add('selected');
  tamanhoSelecionado = tamanho;
}

// =====================================================
// CARRINHO
// =====================================================
function adicionarAoCarrinho(idProduto) {
  if (!tamanhoSelecionado) {
    alert('Por favor, selecione um tamanho antes de adicionar à sacola.');
    return;
  }
  const prod = produtos.find(p => p.id === idProduto);

  // ID único por item (contador) para poder remover itens específicos
  contadorItemCarrinho++;
  carrinho.push({ ...prod, tamanho: tamanhoSelecionado, cartItemId: contadorItemCarrinho });

  atualizarCarrinho();
  alert(`Tênis ${prod.nome} (Tamanho ${tamanhoSelecionado}) adicionado à sacola com sucesso! 🛒`);
}

function removerDoCarrinho(cartItemId) {
  carrinho = carrinho.filter(item => item.cartItemId !== cartItemId);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = carrinho.length;

  const containerCarrinho = document.getElementById('carrinho-itens');
  const totalElemento = document.getElementById('carrinho-total');

  if (containerCarrinho) {
    if (carrinho.length === 0) {
      containerCarrinho.innerHTML = '<p>Sua sacola está vazia.</p>';
      if (totalElemento) totalElemento.textContent = 'R$ 0,00';
      return;
    }

    let html = '';
    let total = 0;

    carrinho.forEach(item => {
      total += item.precoPorNum;
      html += `
        <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:8px;">
          <div>
            <strong>${item.nome}</strong> (Tam: ${item.tamanho})<br>
            <small>${item.precoPor}</small>
          </div>
          <button style="background:#e53935; color:#fff; border:none; border-radius:4px; padding:4px 8px; cursor:pointer;" onclick="removerDoCarrinho(${item.cartItemId})">Remover</button>
        </div>
      `;
    });

    containerCarrinho.innerHTML = html;
    if (totalElemento) {
      totalElemento.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos(produtos);

  const inputBusca = document.getElementById('input-busca');
  if (inputBusca) {
    inputBusca.addEventListener('input', (e) => buscarProduto(e.target.value));
  }

  const btnCarrinho = document.getElementById('btn-carrinho');
  if (btnCarrinho) {
    btnCarrinho.addEventListener('click', () => mudarPagina('carrinho'));
  }
});