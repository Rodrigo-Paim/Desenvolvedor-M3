var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}

var produtosMostrar = 9;
var coresMostrar = 5;
var qtd = [];
var carrinho = [];
var quantidadeNoCarrinhoInvidual = [];
var quantidadeNoCarrinho = 0;
var totalCompra = 0;
var preco = document.getElementsByName('preco');
var cor = document.getElementsByName('cor');
var tamanho = document.getElementsByName('tamanho');
var containerCarrinho = document.querySelector('.carrinhoDeCompras');
var containerCores = document.querySelector('.cores');
var containerTamanhos = document.querySelector('.tamanhos');
var containerPrecoFiltro = document.querySelector('.precoFiltro');
var containerQtd = document.querySelector('.totalCarrinho');
var containerQtdTotal = document.querySelector('.qtdProd');
var containerProdutos = document.querySelector('.produtos');

carregarProdutos = (prod) => {
  containerProdutos.innerHTML += ` 
        <div class = "item">
            <img src="${prod.img}"/>
            <h2>${prod.nome}</h2>
            <h3>${formataMoeda(prod.preco)}</h3>
            <h4>até ${prod.parcelamento}x de ${formataMoeda(
    prod.preco / prod.parcelamento
  )}</h4>
            <input type="button" value="Comprar" onclick="comprar(${prod.id})">
        </div>
    `;
};

limparTelaProdutos = () => {
  containerProdutos.innerHTML = ``;
};

formataMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

contarProdutosRepetidosCarrinho = () => {
  qtd.reduce(function (object, item) {
    if (!object[item]) {
      object[item] = 1;
    } else {
      object[item]++;
    }
    return (quantidadeNoCarrinhoInvidual = object);
  }, {});
};

carregarCarrinho = () => {
  carrinho.map((item) => {
    containerCarrinho.innerHTML += `
            <div class = "carrinho">
                <img class="fotoCarrinho" src="${item.img}"/>
                <a>${item.nome} | ${formataMoeda(item.preco)} | ${
      quantidadeNoCarrinhoInvidual[item.id]
    } </a>
                <button class="excluir" onclick="excluir(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            <div>
        `;
  });

  containerQtd.innerHTML = `
    <p>Total da compra: ${formataMoeda(totalCompra)}</p>
    `;
  containerQtdTotal.innerHTML = `
    <a class="qtdProdutos">${quantidadeNoCarrinho}</a>
    `;
};

carregarMaisProdutos = () => {
  produtosMostrar += 3;

  for (var i = 0; i < produtosMostrar; i++) {
    $('.item').eq(i).show();
  }
};

carregarMaisCores = () => {
  coresMostrar += 4;

  for (var i = 0; i < coresMostrar; i++) {
    $('.cor').eq(i).show();
  }
};

esconderProdutos = () => {
  $('.item').slice(produtosMostrar).hide();
};

criarFiltroCor = () => {
  cores.map((cor) => {
    containerCores.innerHTML += `
            <div class="cor">
                <input type="radio" name="cor" value="${cor}" id="${cor}" onclick="filtrarPorCor()">
                <label for="${cor}">${cor}</label><br>
            </div>
        `;
  });
};

criarFiltroTamanho = () => {
  tamanhos.map((tamanho) => {
    containerTamanhos.innerHTML += `
        <div class="tamanho">
            <input type="radio" name="tamanho" value="${tamanho}" id="${tamanho}" onclick="filtrarPorTamanho()">
            <label for="${tamanho}">${tamanho}</label><br>
        </div>  
        `;
  });
};

criarFiltroPreco = () => {
  precoFiltro.map((preco) => {
    containerPrecoFiltro.innerHTML += `
                <input type="radio" name="preco" value="${preco}" id="${preco}" onclick="filtrarPorPreco()">
                <label for="${preco}">${preco}</label><br>
        `;
  });
};

filtrarPorCor = () => {
  var valorCor = document.querySelector('input[name="cor"]:checked').value;

  for (var i = 0; i < preco.length; i++) preco[i].checked = false;

  for (var i = 0; i < tamanho.length; i++) tamanho[i].checked = false;

  limparTelaProdutos();

  produtos.map((item) => {
    if (item.cor === valorCor) {
      carregarProdutos(item);
      esconderProdutos();
    }
  });
};

filtrarPorTamanho = () => {
  var valorTamanho = document.querySelector('input[name="tamanho"]:checked')
    .value;

  for (var i = 0; i < preco.length; i++) preco[i].checked = false;

  for (var i = 0; i < cor.length; i++) cor[i].checked = false;

  limparTelaProdutos();

  produtos.map((item) => {
    if (item.tamanho === valorTamanho) {
      carregarProdutos(item);
    }
  });
};

filtrarPorPreco = () => {
  var valorPreco = document.querySelector('input[name="preco"]:checked').value;

  for (var i = 0; i < tamanho.length; i++) tamanho[i].checked = false;

  for (var i = 0; i < cor.length; i++) cor[i].checked = false;

  limparTelaProdutos();

  produtos.map((item) => {
    switch (valorPreco) {
      case 'De R$0 até R$50':
        if (item.preco >= 0 && item.preco <= 50) carregarProdutos(item);
        esconderProdutos();
        break;

      case 'De R$51 até R$150':
        if (item.preco >= 51 && item.preco <= 150) carregarProdutos(item);
        esconderProdutos();
        break;

      case 'De R$151 até R$300':
        if (item.preco >= 151 && item.preco <= 300) carregarProdutos(item);
        esconderProdutos();
        break;

      case 'De R$301 até R$500':
        if (item.preco >= 301 && item.preco <= 500) carregarProdutos(item);
        esconderProdutos();
        break;

      default:
        carregarProdutos(item);
        esconderProdutos();
    }
  });
};

filtrarPorRecente = () => {
  var select = document.getElementById('ordenar');
  var valor = select.options[select.selectedIndex].value;
  var produtosOrdenados = [];

  for (var i = 0; i < tamanho.length; i++) tamanho[i].checked = false;

  for (var i = 0; i < cor.length; i++) cor[i].checked = false;

  for (var i = 0; i < preco.length; i++) preco[i].checked = false;

  if (valor === 'Mais recentes') {
    limparTelaProdutos();
    produtosOrdenados = produtos.sort(function (a, b) {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });
    produtosOrdenados.map((prod) => {
      carregarProdutos(prod);
    });
  }

  if (valor === 'Maior preco') {
    limparTelaProdutos();
    produtosOrdenados = produtos.sort(function (a, b) {
      return a.preco < b.preco ? 1 : a.preco > b.preco ? -1 : 0;
    });
    produtosOrdenados.map((prod) => {
      carregarProdutos(prod);
    });
  }

  if (valor === 'Menor preco') {
    limparTelaProdutos();
    produtosOrdenados = produtos.sort(function (a, b) {
      return a.preco < b.preco ? -1 : a.preco > b.preco ? 1 : 0;
    });
    produtosOrdenados.map((prod) => {
      carregarProdutos(prod);
    });
  }
};

comprar = (id) => {
  carrinho.push(produtos[id]);
  qtd.push(produtos[id].id);
  totalCompra += produtos[id].preco;
  carrinho = carrinho.filter((este, i) => carrinho.indexOf(este) === i);
  quantidadeNoCarrinho++;
  containerCarrinho.innerHTML = ``;

  contarProdutosRepetidosCarrinho();
  carregarCarrinho();
};

excluir = (id) => {
  totalCompra -= produtos[id].preco * quantidadeNoCarrinhoInvidual[id];

  console.log(qtd);
  qtd = qtd.filter((elemento, index) => qtd.indexOf(elemento) === index);
  console.log(qtd);
  posQtd = carrinho.findIndex((i) => i.id === id);
  qtd.splice(posQtd, 1);
  console.log(qtd);

  pos = carrinho.findIndex((i) => i.id === id);
  carrinho.splice(pos, 1);

  quantidadeNoCarrinho -= quantidadeNoCarrinhoInvidual[id];

  containerCarrinho.innerHTML = ``;

  contarProdutosRepetidosCarrinho();
  carregarCarrinho();
};

inicializarLoja = () => {
  produtos.map((prod) => {
    carregarProdutos(prod);
  });

  esconderProdutos();
  criarFiltroCor();
  $('.cor').slice(coresMostrar).hide();
  criarFiltroTamanho();
  criarFiltroPreco();
};

inicializarLoja();
