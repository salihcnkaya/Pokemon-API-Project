// async function sendPokeId () {
// 	for (let i = 1; i < 1000; i++) {
// 		await fetchPoke(i);
// 	}
// }

// async function fetchPoke(id) {
// 	const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// 	const response = await fetch(`${API_URL}${id}`);
// 	const data = await response.json();

// 	renderPokeCard(data);
// }

// function checkId(id) {
// 	if (id >= 1 && id <= 9) {
// 		return `00${id}`;
// 	} else if ( id >= 10 && id <= 99) {
// 		return `0${id}`;
// 	} else {
// 		return `${id}`;
// 	}
// }

// function renderPokeCard(data) {
// 	const div = document.createElement('div');
// 	div.classList.add('poke-card');
// 	const contentDiv = document.createElement('div');
// 	contentDiv.classList.add('content');

// 	div.appendChild(contentDiv);
// 	contentDiv.innerHTML = `<h3 class="poke-name">${data.name[0].toUpperCase() + data.name.slice(1)}</h3>
// 			<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${checkId(data.id)}.png" alt="pokemon-img" class="poke-img">
// 			<p class="poke-id">#${data.id}</p>
// 			<p class="poke-weight">${data.weight} kg</p>
// 	`

// 	document.querySelector('.poke-area').appendChild(div);
// }

// sendPokeId();


const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const pokemonList = document.querySelector('.poke-area');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.prev');
let currentUrl = API_URL;

loadPokemonList(currentUrl);

previousButton.addEventListener('click', () => {
    if (!previousButton.disabled) {
        loadPokemonList(previousButton.dataset.url);
    }
});

nextButton.addEventListener('click', () => {
    if (!nextButton.disabled) {
        loadPokemonList(nextButton.dataset.url);
    }
});

async function loadPokemonList(url) {
    const response = await fetch(url);
    const data = await response.json();

    currentUrl = url;

    createPokeCard(data.results);

    previousButton.disabled = !data.previous;
    nextButton.disabled = !data.next;

    if (data.previous) {
        previousButton.dataset.url = data.previous;
    }

    if (data.next) {
        nextButton.dataset.url = data.next;
    }
}

function createPokeCard(pokeResults) {
    pokemonList.innerHTML = ''; // 

    pokeResults.forEach(async pokemon => {
        await fetchAndRenderPokeData(pokemon.url);
    });
}

async function fetchAndRenderPokeData(url) {
    const response = await fetch(url);
    const data = await response.json();
    renderPokeCard(data);
}

function checkId(id) {
    if (id >= 1 && id <= 9) {
        return `00${id}`;
    } else if ( id >= 10 && id <= 99) {
        return `0${id}`;
    } else if ( id >= 100 && id <= 999){
        return `${id}`;
    } else {
		let strId = id.toString();
		let newId = parseInt(strId[0] + strId.substring(2, 5));
		return `${newId}`;
	}
}

function renderPokeCard(data) {
    const div = document.createElement('div');
    div.classList.add('poke-card');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    div.appendChild(contentDiv);
    contentDiv.innerHTML = `<h3 class="poke-name">${data.name[0].toUpperCase() + data.name.slice(1)}</h3>
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${checkId(data.id)}.png" alt="pokemon-img" class="poke-img">
            <p class="poke-id">#${checkId(data.id)}</p>
            <p class="poke-weight">${data.weight} kg</p>
    `

    pokemonList.appendChild(div);
}
