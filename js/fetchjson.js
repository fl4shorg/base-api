const fetchJson = async url => (await fetch(url)).json();

// Variável para armazenar o valor do preço
let preco1000RequetsCustar;

async function initializePage() {
    var config = await fetchJson(`statusapi/info`);
    console.log(config); // Adicione isto para verificar o conteúdo da resposta

    const {
        nome_da_api: nomeApi,
        interface: { titulo_paginas: tituloPaginas, descricao_paginas: descricaoPaginas, foto_dash: imgdash, logotipo_url: logotipoUrl, favicon_url: faviconUrl },
        contato: { url_instagram, url_whatsapp_group, url_whatsapp_group2, url_youtube, insta },
        creditos: { by: creditos },
        preco1000RequetsCustar: preco // Renomeie a propriedade na API para algo sem números no começo
    } = config;

    // Armazena o valor do preço
    preco1000RequetsCustar = preco;

    // Atualiza o preço por requisição
    var precoform = preco1000RequetsCustar / 1000;

    // Atualizar título da página
    document.title = tituloPaginas;

    // Atualizar favicon
    const linkFavicon = document.querySelector('link[rel="icon"]');
    if (linkFavicon) linkFavicon.href = faviconUrl;

    // Atualizar logotipo
    const logoElement = document.querySelector('.sidebar-brand.brand-logo-mini img');
    if (logoElement) logoElement.src = logotipoUrl;
  
  //inicio img
      const logoElementredec= document.getElementById('imginicio');
    if (logoElementredec) logoElementredec.src = config.interface.foto_inicio;
  
  //planos img
      const logoElementstore = document.getElementById('imgstore');
    if (logoElementstore) logoElementstore.src = config.interface.foto_loja;
  
  //login img
      const logoElementlogin = document.getElementById('imglogin');
    if (logoElementlogin) logoElementlogin.src = config.interface.foto_login;
    
      //rg img
      const logoElementrg = document.getElementById('imgrg');
    if (logoElementrg) logoElementrg.src = config.interface.foto_rg;
  

    // Atualizar imagens pela imagem da API (imgdash)
    document.querySelectorAll('img.img-xs.rounded-circle, a.sidebar-brand.brand-logo-mini img').forEach(img => {
        img.src = imgdash;
    });

    // Atualizar meta descrição
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descricaoPaginas);
    
    const nome2listElement = document.getElementById('nomeapi2');
    if (nome2listElement) nome2listElement.innerText = nomeApi;
    
        const nome3listElement = document.getElementById('nomeapi3');
    if (nome3listElement) nome3listElement.innerText = nomeApi;

    const nome10listElement = document.getElementById('bemvind');
    if (nome10listElement) nome10listElement.innerText = `Seja bem vindo a ${nomeApi}`;
    
    const nome1listinicioElement = document.getElementById('nomeapi');
    if (nome1listinicioElement) nome1listinicioElement.innerText = nomeApi;
    
    // Atualizar links de suporte
    const instaElement = document.querySelectorAll('suporte_instagram');
    if (instaElement) instaElement.href = url_instagram;

    const whatsapp1 = document.querySelectorAll('suporte_whatsapp1');
    if (whatsapp1) whatsapp1.href = url_whatsapp_group;
    
        const whatsapp1redec = document.querySelectorAll('suporte_whatsapp1redec');
    if (whatsapp1redec) whatsapp1redec.href = url_whatsapp_group;

    const whatsapp2 = document.getElementById('suporte_whatsapp2');
    if (whatsapp2) whatsapp2.href = url_whatsapp_group2;

    const yt = document.getElementById('suporte_youtube');
    if (yt) yt.href = url_youtube;

    // Atualizar créditos
    document.querySelectorAll('.text-muted.d-block.text-center.text-sm-left.d-sm-inline-block').forEach(ele => {
        ele.innerHTML = `Copyright © <span id="Years">2025</span> ${creditos}`;
    });

    // Exibir alerta de boas-vindas
    Swal.fire({
        title: nomeApi,
        text: 'Seja Bem Vindo(a) Usuário(a)',
        imageUrl: imgdash,
        footer: `By: ${insta}`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: ':)',
        animation: true
    });

    setTimeout(() => {
        Swal.fire({
            title: "⚠️PROMOÇÃO IMPERDÍVEL🚨",
            text: `💘1000 REQUESTS POR R$${preco1000RequetsCustar}💝`,
            imageUrl: imgdash,
            footer: `By: ${insta}`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: ':)',
            animation: true
        });
    }, 5000);

    // Atualiza o cálculo ao carregar a página
    calculateTotal();
}

// Função para calcular o valor total dinamicamente
function calculateTotal() {
    if (!preco1000RequetsCustar) return; // Verifica se o preço está definido

    var request = document.getElementById('request').value;
    var precoform = preco1000RequetsCustar / 1000; // Preço por requisição
    var total = parseFloat(request) * precoform;

    if (isNaN(total)) { // Corrige a verificação de NaN
        document.getElementById('totalValue').textContent = 'R$ 0.00';
        return false;
    } else {
        document.getElementById('totalValue').textContent = 'R$ ' + total.toFixed(2);
        return total.toFixed(2);
    }
}

// Função para enviar via WhatsApp (a ser implementada)
function whatsapp() {
    var request = document.getElementById('request').value;
    var apikey = document.getElementById('apikey').value;
    var totalpag = calculateTotal();
    var textopag = `LOJA DE REQUEST
    APIKEY: ${apikey}
    REQUEST's: ${request}
    TOTAL: ${totalpag}`;
    var url = `https://wa.me/+557488693488?text=${encodeURIComponent(textopag)}`;
    location.href = url;
}

// Atualiza o cálculo a cada segundo (opcional)
setInterval(calculateTotal, 1000);

// Chame a função assíncrona quando a página carregar
window.addEventListener('load', initializePage);