// ===============================
// 1️⃣ BANCO DE DADOS
// ===============================


const produtos = [
  {
    id: 1,
    nome: "Brasa Clássico",
    descricao: "Pão brioche, hambúrguer 180g e molho especial.",
    preco: 25,
    categoria: "tradicional",
    imagem: "images/burger1.png"
  },
  {
    id: 2,
    nome: "Smash Duplo",
    descricao: "Dois smash burgers com cheddar.",
    preco: 28,
    categoria: "smash",
    imagem: "images/burger2.png"
  },
  {
    id: 3,
    nome: "Combo Família",
    descricao: "2 burgers + fritas + refri.",
    preco: 55,
    categoria: "combo",
    imagem: "images/combo.png"
  }
];


// ===============================
// 2️⃣ ESTADO
// ===============================

let carrinho = [];


// ===============================
// 3️⃣ ELEMENTOS HTML
// ===============================

const container = document.querySelector(".produtos-container");
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const carrinhoContainer = document.querySelector(".carrinho-itens");
const totalElemento = document.querySelector(".total");


// ===============================
// 4️⃣ RENDERIZAR PRODUTOS
// ===============================

function renderizarProdutos(lista) {

  container.innerHTML = "";

  lista.forEach(produto => {

    const card = document.createElement("div");
    card.classList.add("produto-card");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <p class="preco">R$ ${produto.preco}</p>
      <button class="adicionar-btn">Adicionar</button>
    `;

    // 🔥 BOTÃO FUNCIONANDO
    card.querySelector(".adicionar-btn")
      .addEventListener("click", () => {
        adicionarAoCarrinho(produto);
      });

    container.appendChild(card);
  });
}


// ===============================
// 5️⃣ FILTRO
// ===============================

botoesFiltro.forEach(botao => {
  
  botao.addEventListener("click", () => {
    
    document.querySelector(".active").classList.remove("active");
    botao.classList.add("active");
    
    const categoria = botao.getAttribute("data-categoria");
    
    if (categoria === "todos") {
      renderizarProdutos(produtos);
    } else {
      const filtrados = produtos.filter(p => p.categoria === categoria);
      renderizarProdutos(filtrados);
    }
    
  });
  
});


// ===============================
// 6️⃣ ADICIONAR AO CARRINHO
// ===============================

function adicionarAoCarrinho(produto) {
  
  carrinho.push(produto);
  
  atualizarCarrinho();
}


// ===============================
// 7️⃣ ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {
  
  carrinhoContainer.innerHTML = "";
  
  let total = 0;
  
  carrinho.forEach((item, index) => {
    
    total += item.preco;
    
    const div = document.createElement("div");
    div.classList.add("carrinho-item");
    
    div.innerHTML = `
      <p>${item.nome}</p>
      <p>R$ ${item.preco}</p>
      <button class="remover-btn">❌</button>
    `;
    
    // 🔥 BOTÃO REMOVER FUNCIONANDO
    div.querySelector(".remover-btn")
      .addEventListener("click", () => {
        removerDoCarrinho(index);
      });
    
    carrinhoContainer.appendChild(div);
  });
  
  totalElemento.innerText = `Total: R$ ${total}`;
}

function removerDoCarrinho(index) {
  
  carrinho.splice(index, 1); // remove pelo índice
  
  atualizarCarrinho(); // redesenha tudo
}


// ===============================
// 8️⃣ INICIALIZAÇÃO
// ===============================

renderizarProdutos(produtos);

const abrirBtn = document.getElementById("abrirCarrinho");
const fecharBtn = document.getElementById("fecharCarrinho");
const carrinhoAside = document.querySelector(".carrinho");

abrirBtn.addEventListener("click", () => {
  carrinhoAside.classList.add("ativo");
});

fecharBtn.addEventListener("click", () => {
  carrinhoAside.classList.remove("ativo");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("ativo");
});

const btnWhatsapp = document.getElementById("btnWhatsapp");

whatsappBtn.addEventListener("click", () => {
  
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  
  let mensagem = "🍔 *Novo Pedido - Brasa Burger* %0A%0A";
  
  let total = 0;
  
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco} %0A`;
    total += item.preco;
  });
  
  mensagem += `%0A💰 *Total: R$ ${total}*`;
  
  const numero = "5548996732704"; // 🔥 COLOQUE SEU NÚMERO AQUI (com DDI e DDD)
  
  const url = `https://wa.me/${numero}?text=${mensagem}`;
  
  window.open(url, "_blank");
  
});

document.querySelector(".btn-sobre")
  .addEventListener("click", () => {
    document.querySelector("#cardapio")
      .scrollIntoView({ behavior: "smooth" });
  });
  
  document.querySelector(".contato-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! 🔥");
    this.reset();
  });
