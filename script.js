async function sendPokeId () {
	for (let i = 1; i < 26; i++) {
		await fetchPoke(i);
	}
}

async function fetchPoke(id) {
	const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

	const response = await fetch(`${API_URL}${id}`);
	const data = await response.json();

	renderPokeCard(data);
}

function checkId(id) {
	if (id >= 1 && id <= 9) {
		return `00${id}`;
	} else if ( id >= 10 && id <= 99) {
		return `0${id}`;
	} else {
		return `${id}`;
	}
}

function renderPokeCard(data) {
	const div = document.createElement('div');
	div.classList.add('poke-card');

	div.innerHTML = `<h3 class="poke-name">${data.name}</h3>
			<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${checkId(data.id)}.png" alt="pokemon-img" class="poke-img">
			<p class="poke-id">#${data.id}</p>
			<p class="poke-weight">${data.weight} kg</p>
	`

	document.querySelector('.poke-area').appendChild(div);
}

sendPokeId();

