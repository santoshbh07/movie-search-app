document.addEventListener('DOMContentLoaded', () => {
    
    const title = document.getElementById("title-input");
    const getMovieBtn = document.getElementById("get-movie");
    const posterDiv = document.getElementById("poster-div");
    const movieName = document.getElementById("title");
    const year = document.getElementById("year");
    const rated = document.getElementById("rated");
    const runtime = document.getElementById("runtime");
    const genre = document.getElementById("genre");
    const director = document.getElementById("director");
    const actors = document.getElementById("actors");
    const ratings = document.getElementById("ratings");
    const error = document.getElementById("error");
    const boxOffice = document.getElementById("boxOffice");
    const movieContainer = document.getElementById("movie-details-container");

    getMovieBtn.addEventListener('click', async () => {
        const titleText = title.value.trim();
        if(!titleText) return;
        try {
            const movieDetails = await fetchMovie(titleText);
            showDetails(movieDetails);
        } catch (error) {
            showError();
        }
    })

    async function fetchMovie(name) {
        const url = `https://www.omdbapi.com/?t=${name}&apikey=a893ab25`;
        const response = await fetch(url);
        console.log(response)

        if(!response){
            throw new Error("Error fetching movie");
        }
        const details =  await response.json();
        console.log(details);
        return details;
    }

    function showDetails(details) {
        const {Title, Year, Rated, Runtime, Genre, Director, Actors, Ratings, Poster, BoxOffice} = details;
        movieName.textContent = Title;
        year.textContent = `Year: ${Year}`;
        rated.textContent = `Rated: ${Rated}`;
        runtime.textContent = `Runtime: ${Runtime}`;
        genre.textContent = `Genre: ${Genre}`;
        director.textContent = `Director: ${Director}`;
        actors.textContent = `Actors: ${Actors}`;
        ratings.textContent = `IMBD: ${Ratings[0].Value}`;
        boxOffice.textContent = `BoxOffice: ${BoxOffice}`;

        posterDiv.innerHTML = `
            <img src="${Poster}" alt="${Title}" />
        `
        error.classList.add("hidden");
        movieContainer.classList.remove("hidden");
    }

    function showError() {
        error.textContent = "Movie not found!";
        error.classList.remove("hidden");
        movieContainer.classList.add("hidden");
    }
})
