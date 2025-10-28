const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('.'));

const mockApiConfig = {
  nome_da_api: "NEEXT API",
  interface: {
    titulo_paginas: "NEEXT API - Documentação",
    descricao_paginas: "API REST completa com diversos geradores e ferramentas",
    foto_dash: "https://telegra.ph/file/957afb9bc37658339c603.jpg",
    logotipo_url: "https://telegra.ph/file/957afb9bc37658339c603.jpg",
    favicon_url: "https://telegra.ph/file/957afb9bc37658339c603.jpg",
    foto_inicio: "https://telegra.ph/file/957afb9bc37658339c603.jpg",
    foto_loja: "https://telegra.ph/file/957afb9bc37658339c603.jpg",
    foto_login: "https://telegra.ph/file/d9ff95e4db542069612c0.jpg",
    foto_rg: "https://telegra.ph/file/957afb9bc37658339c603.jpg"
  },
  contato: {
    url_instagram: "https://instagram.com",
    url_whatsapp_group: "https://wa.me/18092572502",
    url_whatsapp_group2: "https://wa.me/18092572502",
    url_youtube: "https://youtube.com",
    insta: "@neext_api"
  },
  creditos: {
    by: "NEEXT"
  },
  preco1000RequetsCustar: 10.00
};

app.get('/statusapi/info', (req, res) => {
  res.json(mockApiConfig);
});

app.get('/api/users/count', (req, res) => {
  res.json({ count: 1234 });
});

app.get('/api/keyerrada/', (req, res) => {
  const apikey = req.query.apikey;
  
  if (apikey && apikey !== 'SuaApiKey' && apikey !== 'SuaApikey') {
    res.json({
      key: "✅ APIKEY VÁLIDA",
      apikey: apikey,
      request: 5000
    });
  } else {
    res.json({
      key: "❌ APIKEY INVÁLIDA",
      apikey: apikey || "não fornecida",
      request: 0
    });
  }
});

app.get('/gerar/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const apikey = req.query.apikey;
  
  const geradores = {
    'cpf': { resultado: '123.456.789-00' },
    'cnpj': { resultado: '12.345.678/0001-00' },
    'placa': { resultado: 'ABC-1234' },
    'rg': { resultado: '12.345.678-9' },
    'titulo-eleitor': { resultado: '1234 5678 9012' },
    'data-nascimento': { resultado: '01/01/1990' },
    'telefone': { resultado: '(11) 98765-4321' },
    'cartao-credito': { resultado: '5555 4444 3333 2222' },
    'email': { resultado: 'usuario@exemplo.com' },
    'endereco': { resultado: 'Rua Exemplo, 123, São Paulo - SP' },
    'nick': { resultado: 'UserNick123' },
    'senha': { resultado: 'S3nh@F0rt3!' },
    'nome-completo': { resultado: 'João da Silva Santos' },
    'numero-aleatorio': { resultado: Math.floor(Math.random() * 1000000) },
    'genero': { resultado: 'Masculino' },
    'estado-civil': { resultado: 'Solteiro' },
    'profissao': { resultado: 'Desenvolvedor' },
    'altura': { resultado: '1.75m' },
    'peso': { resultado: '75kg' },
    'tipo-sanguineo': { resultado: 'O+' },
    'pais': { resultado: 'Brasil' },
    'estado': { resultado: 'São Paulo' },
    'cidade': { resultado: 'São Paulo' },
    'cep': { resultado: '01234-567' },
    'usuario': { resultado: 'usuario123' },
    'url': { resultado: 'https://exemplo.com' },
    'codigo-barras': { resultado: '7891234567890' },
    'numero-registro': { resultado: 'REG-123456' },
    'id': { resultado: 'ID-' + Math.random().toString(36).substr(2, 9) },
    'codigo-verificacao': { resultado: Math.floor(100000 + Math.random() * 900000) }
  };
  
  const resultado = geradores[tipo] || { resultado: 'Tipo não encontrado' };
  res.json({
    status: 'success',
    tipo: tipo,
    apikey: apikey,
    ...resultado
  });
});

app.get('/gerarpro/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const quantidade = parseInt(req.query.query) || 10;
  const apikey = req.query.apikey;
  
  const resultados = [];
  
  for (let i = 0; i < quantidade; i++) {
    switch(tipo) {
      case 'cpf':
        resultados.push(`${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}`);
        break;
      case 'cnpj':
        resultados.push(`${Math.floor(10 + Math.random() * 90)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}/0001-${Math.floor(10 + Math.random() * 90)}`);
        break;
      case 'rg':
        resultados.push(`${Math.floor(10 + Math.random() * 90)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}-${Math.floor(1 + Math.random() * 9)}`);
        break;
      case 'cep':
        resultados.push(`${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)}`);
        break;
      case 'numeros':
        resultados.push(Math.floor(Math.random() * 1000000));
        break;
      case 'uuid':
        resultados.push(`${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`);
        break;
      case 'data':
        resultados.push(`${Math.floor(1 + Math.random() * 28)}/${Math.floor(1 + Math.random() * 12)}/${Math.floor(1950 + Math.random() * 70)}`);
        break;
      case 'nome':
        const nomes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza'];
        resultados.push(nomes[Math.floor(Math.random() * nomes.length)]);
        break;
      case 'email':
        resultados.push(`usuario${i}@exemplo.com`);
        break;
      case 'telefone':
        resultados.push(`(${Math.floor(10 + Math.random() * 90)}) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`);
        break;
      default:
        resultados.push('Dado gerado ' + (i + 1));
    }
  }
  
  res.json({
    status: 'success',
    tipo: tipo,
    quantidade: quantidade,
    apikey: apikey,
    resultados: resultados
  });
});

app.get('/filtro/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const img = req.query.img;
  const apikey = req.query.apikey;
  
  res.json({
    status: 'success',
    filtro: tipo,
    imagem_original: img,
    imagem_processada: img,
    apikey: apikey,
    mensagem: 'Filtro aplicado com sucesso (mock)'
  });
});

app.get('/youtube/:acao', (req, res) => {
  const acao = req.params.acao;
  const query = req.query.query;
  const url = req.query.url;
  const apikey = req.query.apikey;
  
  res.json({
    status: 'success',
    acao: acao,
    query: query,
    url: url,
    apikey: apikey,
    resultado: 'Mock de resultado do YouTube'
  });
});

app.get('/api/:endpoint', (req, res) => {
  const endpoint = req.params.endpoint;
  const apikey = req.query.apikey;
  
  res.json({
    status: 'success',
    endpoint: endpoint,
    apikey: apikey,
    mensagem: 'Mock API response',
    dados: {
      exemplo: 'Dados de exemplo'
    }
  });
});

app.get('/download/:servico', (req, res) => {
  const servico = req.params.servico;
  const url = req.query.url;
  const apikey = req.query.apikey;
  
  res.json({
    status: 'success',
    servico: servico,
    url: url,
    apikey: apikey,
    download_url: 'https://exemplo.com/mock-download.mp4'
  });
});

app.get('/search/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const q = req.query.q;
  const apikey = req.query.apikey;
  
  res.json({
    status: 'success',
    tipo: tipo,
    query: q,
    apikey: apikey,
    resultados: ['Resultado 1', 'Resultado 2', 'Resultado 3']
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs.html'));
});

app.get('/runtime', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs.html'));
});

app.get('/panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'paineis', 'painel_consultas.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
  console.log(`📚 API documentation disponível em /`);
  console.log(`⚡ Mock API endpoints configurados`);
});
