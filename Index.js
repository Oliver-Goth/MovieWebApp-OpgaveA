BaseUrl = "https://reasourcegroup1.azurewebsites.net"



// Simuleret liste af Movie-objekter
async function fetchMovies() {
    try {
        const response = await fetch(BaseUrl + '/api/movies'); // Erstat URL'en med din faktiske API URL
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fejl ved hentning af Movie-data:', error);
    }
}

// Funktion til at generere tabellen
async function generateTable() {
    var tableBody = document.getElementById('movieTable').getElementsByTagName('tbody')[0];

    // Hent Movie-data fra API'en
    var movies = await fetchMovies();

    // Fjern eksisterende rækker
    tableBody.innerHTML = '';

    // Tilføj rækker baseret på Movie-objekter
    movies.forEach(function (movie) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = movie.id;
        cell2.innerHTML = movie.title;
        cell3.innerHTML = movie.releaseYear;
    });
}

// Funktion til at hente detaljerne for et Movie-objekt baseret på ID
async function fetchMovieById(movieId) {
    try {
        const response = await fetch(BaseUrl + `/api/movies/${movieId}`); // Erstat URL'en med din faktiske API URL
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fejl ved hentning af Movie med ID ${movieId}:`, error);
    }
}

// Funktion til at vise detaljer for en film baseret på ID
async function showMovieDetails() {
    var detailsContainer = document.getElementById('movieDetails');
    var movieIdInput = document.getElementById('movieIdInput');

    // Hent filmdata fra API'en baseret på indtastet ID
    var movieId = movieIdInput.value;
    
    if (!movieId) {
        alert('Indtast venligst et film-ID.');
        return;
    }

    var movie = await fetchMovieById(movieId);

    // Opdater HTML-containeren med detaljerne for den specifikke film
    detailsContainer.innerHTML = `
    <p><strong>Id:</strong> ${movie.id}</p>
    <p><strong>Title:</strong> ${movie.title}</p>
    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
    `;
}

// Funktion til at tilføje et nyt Movie-objekt til listen
async function addMovie() {
    var idInput = document.getElementById('idInput').value;
    var titleInput = document.getElementById('titleInput').value;
    var releaseYearInput = document.getElementById('releaseYearInput').value;

    // Simuleret objekt med brugerens indtastede data
    var newMovie = {
        id: idInput,
        title: titleInput,
        releaseYear: releaseYearInput
    };

    try {
        // Send data til API'en (erstat URL'en med den faktiske API URL og metode)
        const response = await fetch(BaseUrl + '/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
            throw new Error('Fejl ved tilføjelse af film.');
        }

        // Genindlæs tabellen med de opdaterede data
        generateTable();
    } catch (error) {
        console.error('Fejl ved tilføjelse af film:', error);
    }
}

// Funktion til at slette et Movie-objekt baseret på ID
async function deleteMovie(movieId) {
    try {
        // Send sletningsanmodningen til API'en (erstat URL'en med den faktiske API URL og metode)
        const response = await fetch(BaseUrl + `/api/movies/${movieId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Fejl ved sletning af film.');
        }

        // Genindlæs tabellen med de opdaterede data
        generateTable();
    } catch (error) {
        console.error('Fejl ved sletning af film:', error);
    }
}

// Kald funktionen for at generere tabellen ved indlæsning af siden
generateTable();