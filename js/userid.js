document.addEventListener("DOMContentLoaded", function() {
let objeto = {
  texto: `
`
};



    function sub(apikey2) {
        // Substituindo todas as ocorrências de "apikey=SuaApiKey" por "hiara"
        var texto2 = objeto.texto.replace(/apikey=SuaApiKey/g, apikey2);
        var api = document.getElementById('tudo');

        // Verificar se o elemento existe antes de tentar definir sua propriedade
        if (api) {
            api.innerHTML = texto2;
        } else {
            console.error('Elemento com ID "tudo" não encontrado.');
        }
    }
});