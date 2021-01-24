var acc = document.getElementsByClassName('see-more');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
      acc[0].style.display = 'none';
    }
  });
}

var acc = document.getElementsByClassName('see-more');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
      acc[0].style.display = 'none';
    }
  });
}

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

document.body.onload = renderProducts;
var countBuy = 0;

function renderProducts() {
  var div = document.createElement('div');
  div.className = 'div-main';
  var divDesktop = document.querySelectorAll('.render-products')[0];
  var divMobile = document.querySelectorAll('.render-products')[1];
  var count;

  for (count = 0; count < products.itensLoad; count++) {
    var divItem = loadProducts(count);
    div.appendChild(divItem);
  }

  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.flexWrap = 'wrap';
  div.style.flexDirection = 'row';
  div.style.margin = '10px 0';
  div.style.padding = '0';
  var divM = div.cloneNode(true);
  divDesktop.appendChild(divM);
  divMobile.appendChild(div);
  addBuyClick();
}

function addBuyClick() {
  var acc = document.getElementsByClassName('btn-buy');
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
      var buySelected = document.getElementById('minicart');
      countBuy += 1;
      buySelected.innerText = countBuy;
    });
  }
}

function loadMore() {
  var divDesktop = document.getElementsByClassName('div-main')[0];
  var divMobile = document.getElementsByClassName('div-main')[1];
  var spanDesktop = document.getElementsByClassName(
    'see-more-render-photos'
  )[0];
  var spanMobile = document.getElementsByClassName('see-more-render-photos')[1];
  for (var i = products.itensLoad; i < products.itensFiltred.length; i++) {
    var load = loadProducts(i);
    var divM = load.cloneNode(true);
    divDesktop.appendChild(divM);
    divMobile.appendChild(load);
  }
  spanDesktop.style.display = 'none';
  spanMobile.style.display = 'none';
  addBuyClick();
}

function loadProducts(count) {
  var divItem = document.createElement('div');

  var img = document.createElement('img');
  img.setAttribute('src', products.itensFiltred[count].src);
  img.style.maxWidth = '100%';
  img.style.display = 'block';

  var name = document.createElement('p');
  name.innerHTML = products.itensFiltred[count].name;
  name.style.textAlign = 'center';
  name.style.textTransform = 'uppercase';
  name.style.letterSpacing = '0.5px';
  name.style.fontFamily = 'Open sans';
  name.style.fontSize = '0.9em';
  name.style.margin = '12px 0';
  name.style.padding = '0';

  var price = document.createElement('p');
  price.innerHTML = products.itensFiltred[count].price;
  price.style.textAlign = 'center';
  price.style.fontWeight = 'bold';
  price.style.margin = '0';
  price.style.fontSize = '14px';
  price.style.fontFamily = 'sans-serif';
  price.style.padding = '2px 0 0';

  var parcel = document.createElement('p');
  parcel.innerHTML = products.itensFiltred[count].parcel;
  parcel.style.textAlign = 'center';
  parcel.style.margin = '7px 0';
  parcel.style.padding = '0';
  parcel.style.fontSize = '14px';
  parcel.style.fontFamily = 'Open sans';

  var divBuy = document.createElement('div');
  divBuy.setAttribute('class', 'btn-buy');
  divBuy.style.backgroundColor = '#000';
  divBuy.style.cursor = 'pointer';
  var buy = document.createElement('p');

  buy.innerHTML = 'Comprar';
  buy.style.color = '#FFF';
  buy.style.fontWeight = 'bold';
  buy.style.fontFamily = 'sans-serif';
  buy.style.textAlign = 'center';
  buy.style.textTransform = 'uppercase';
  buy.style.fontSize = '12px';
  buy.style.margin = '2px 0 0';
  buy.style.padding = '12px 0';
  buy.style.letterSpacing = '0.8px';
  divBuy.appendChild(buy);

  divItem.appendChild(img);
  divItem.appendChild(name);
  divItem.appendChild(price);
  divItem.appendChild(parcel);
  divItem.appendChild(divBuy);
  divItem.style.padding = '15px';

  divItem.setAttribute('class', 'new-div');
  return divItem;
}

var products = {
  itensLoad: 6,
  itensFiltred: [],
  itens: [
    {
      src: './layout/imagens/img_2.png',
      name: 'Camiseta Mescla',
      price: 'R$ 28,00',
      priceInt: 28,
      parcel: 'até 3x de R$9,33',
      color: ['Cinza'],
      size: ['P', 'M', 'G'],
      dateInsert: '2020-05-17',
    },
    {
      src: './layout/imagens/img_3.png',
      name: 'Saia em couro',
      price: 'R$ 398,00',
      priceInt: 398,
      parcel: 'até 5x de R$30,00',
      color: ['Laranja'],
      size: ['P'],
      dateInsert: '2020-02-13',
    },
    {
      src: './layout/imagens/img_4.png',
      name: 'Cardigan tigre',
      price: 'R$ 398,00',
      priceInt: 398,
      parcel: 'até 5x de R$30,00',
      color: ['Laranja', 'Preto', 'Branco'],
      size: ['P', '36', '38', '40', '42'],
      dateInsert: '2020-01-05',
    },
    {
      src: './layout/imagens/img_5.png',
      name: 'Cardigan off white',
      price: 'R$ 99,90',
      priceInt: 99.9,
      parcel: 'até 3x de R$33,30',
      color: ['Branco'],
      size: ['P', 'G', 'GG', 'U', '46'],
      dateInsert: '2020-03-03',
    },
    {
      src: './layout/imagens/img_6.png',
      name: 'Body leopardo',
      price: 'R$ 129,90',
      priceInt: '123.90',
      parcel: 'até 3x de R$43,43',
      color: ['Amarelo'],
      size: ['P'],
      dateInsert: '2020-05-17',
    },
    {
      src: './layout/imagens/img_7.png',
      name: 'Casaco pelos',
      price: 'R$ 398,00',
      priceInt: 398,
      parcel: 'até 5x de R$30,00',
      color: ['Rosa'],
      size: ['P', '36', '42', '46'],
      dateInsert: '2019-12-17',
    },
    {
      src: './layout/imagens/img_8.png',
      name: 'Cropped stripes',
      price: 'R$ 120,00',
      priceInt: 120,
      parcel: 'até 3x de R$40,00',
      color: ['Azul', 'Amarelo', 'Laranja', 'Verde'],
      size: ['M', 'G', 'GG', 'U', '42', '46'],
      dateInsert: '2019-09-20',
    },
    {
      src: './layout/imagens/img_9.png',
      name: 'Camisa transparente',
      price: 'R$ 398,00',
      priceInt: 398,
      parcel: 'até 5x de R$30,00',
      color: ['Preto', 'Transparente'],
      size: ['P', '36', '40', '42'],
      dateInsert: '2020-01-23',
    },
    {
      src: './layout/imagens/img_10.png',
      name: 'Pochete clutch',
      price: 'R$ 99,00',
      priceInt: 99,
      parcel: 'até 3x de R$33,00',
      color: ['Branco'],
      size: ['M', 'G'],
      dateInsert: '2020-02-12',
    },
  ],
};
products.itensFiltred = products.itens;

var colorList = [];
function filterColor(color) {
  if (colorList.length === 0) {
    colorList.push(color);
  } else {
    var aux = colorList.find((item) => item === color);
    if (aux) {
      var filter = colorList.filter((item) => item !== color);
      colorList = filter;
    } else {
      colorList.push(color);
    }
  }
  filterProducts();
}

var sizeList = [];
function filterSize(size) {
  if (sizeList.length === 0) {
    sizeList.push(size);
  } else {
    var aux = sizeList.find((item) => item === size);
    if (aux) {
      var filter = sizeList.filter((item) => item !== size);
      sizeList = filter;
    } else {
      sizeList.push(size);
    }
  }
  filterProducts();
}

var priceSelect = null;
function filterPrice(price) {
  var optionList = {
    'de R$0 até R$50': '0-50',
    'de R$51 até R$150': '51-150',
    'de R$151 até R$300': '151-300',
    'de R$301 até R$500': '301-500',
    'a partir de R$1': '1-99999999',
  };
  if (priceSelect === null) {
    priceSelect = optionList[price];
  } else if (priceSelect === optionList[price]) {
    var selected = document.getElementById(optionList[price]);
    selected.checked = false;
    priceSelect = null;
  } else {
    priceSelect = optionList[price];
  }
  filterProducts();
}

var orderSelect = null;
function setOrder(option) {
  var accordion = document.getElementById('order');
  var optionDic = {
    1: 'Mais recentes',
    2: 'Menor preço',
    3: 'Maior preço',
  };

  var select = optionDic[option];
  accordion.innerText = select;
  orderSelect = select;

  var panel = document.getElementById('accordion-options');
  panel.style.display = 'none';
  filterProducts();
}

function sortProducts(list) {
  list.sort((a, b) => {
    if (orderSelect === 'Menor preço') {
      if (a.priceInt > b.priceInt) {
        return 1;
      } else if (a.priceInt < b.priceInt) {
        return -1;
      } else {
        return 0;
      }
    } else if (orderSelect === 'Maior preço') {
      if (a.priceInt > b.priceInt) {
        return -1;
      } else if (a.priceInt < b.priceInt) {
        return 1;
      } else {
        return 0;
      }
    } else {
      var convertA = new Date(a.dateInsert);
      var convertB = new Date(b.dateInsert);
      if (convertA > convertB) {
        return -1;
      } else if (convertA < convertB) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  return list;
}

function filterProducts() {
  var filtred = products.itens
    .filter((item) => {
      if (colorList.length > 0) {
        for (var j = 0; j < colorList.length; j++) {
          if (item.color.includes(colorList[j])) {
            return true;
          }
        }
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (sizeList.length > 0) {
        for (var j = 0; j < sizeList.length; j++) {
          if (item.size.includes(sizeList[j])) {
            return true;
          }
        }
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (priceSelect === null) {
        return true;
      } else {
        var selected = priceSelect.split('-');
        var initial = parseInt(selected[0]);
        var end = parseInt(selected[1]);
        if (item.priceInt >= initial && item.priceInt <= end) {
          return true;
        }
        return false;
      }
    });

  products.itensFiltred = sortProducts(filtred);
  var divDesktop = document.querySelectorAll('.render-products')[0];
  var divMobile = document.querySelectorAll('.render-products')[1];
  while (divDesktop.lastElementChild) {
    divDesktop.removeChild(divDesktop.lastElementChild);
  }

  while (divMobile.lastElementChild) {
    divMobile.removeChild(divMobile.lastElementChild);
  }

  var spanDesktop = document.getElementsByClassName(
    'see-more-render-photos'
  )[0];
  var spanMobile = document.getElementsByClassName('see-more-render-photos')[1];
  if (products.itensFiltred.length <= 6) {
    spanDesktop.style.display = 'none';
    spanMobile.style.display = 'none';
    products.itensLoad = products.itensFiltred.length;
  } else {
    spanDesktop.style.display = 'block';
    spanMobile.style.display = 'block';
    products.itensLoad = 6;
  }

  renderProducts();
}

function openPageMobile(option) {
  var optionList = {
    1: 'filter-mobile',
    2: 'order-mobile',
  };

  var optionClicked = document.getElementById(optionList[option]);
  optionClicked.style.display = 'block';
  var foot = document.getElementById('footer');
  foot.style.display = 'none';
  var divDown = document.getElementsByClassName('render-products')[1];
  divDown.style.display = 'none';
}

function closePageMobile(option) {
  var optionList = {
    1: 'filter-mobile',
    2: 'order-mobile',
  };

  var optionClicked = document.getElementById(optionList[option]);
  optionClicked.style.display = 'none';
  var foot = document.getElementById('footer');
  foot.style.display = 'block';
  var divDown = document.getElementsByClassName('render-products')[1];
  divDown.style.display = 'block';
}

function closePageOrder(option) {
  var optionDic = {
    1: 'Mais recentes',
    2: 'Menor preço',
    3: 'Maior preço',
  };

  closePageMobile(2);
  orderSelect = optionDic[option];
  filterProducts();
}
