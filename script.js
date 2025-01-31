const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

// Função para remover acentos
function removeAccents(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function requestApi(searchTerm) {
    const url = `https://spotify-clone-gbcf.onrender.com`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            // Remove acentos da busca e dos artistas antes de comparar
            const filteredResults = result.filter(artist => 
                removeAccents(artist.name).startsWith(removeAccents(searchTerm)) || 
                removeAccents(artist.genre).includes(removeAccents(searchTerm))
            );
            displayResults(filteredResults);
        })
        .catch((error) => console.error('Erro na requisição:', error));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");

    const container = document.querySelector(".grid-container");
    container.innerHTML = ""; // Limpa resultados anteriores

    if (result.length === 0) {
        container.innerHTML = "<p class='error-message'>Nenhum artista encontrado</p>";
        return;
    }

    result.forEach(element => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${element.urlImg}" alt="${element.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">${element.genre}</span>
            </div>
        `;

        container.appendChild(artistCard);
    });
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    requestApi(searchTerm);
});
