$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
    $('#searchForm i').on('click', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {

    axios.get(`http://www.omdbapi.com/?apikey=905820ff&s=${searchText}`)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            let counter = 0;
            $.each(movies, (index, movie) => {
                counter++;
                if (index % 4 == 0) output += `<div class="row">`;
                output += `
            <div class="col-md-3">
              <div class="card card-body bg-light text-center movie-card">                
                  <img src="${movie.Poster}" class="card-img" alt="${movie.Title} poster">
                  <h5>${movie.Title}</h5>
                  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>                
              </div>
            </div>
            `;
                if (counter == 4) {
                    output += `</div>`;
                    counter = 0;
                }
            });
            console.log(counter);
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    const movieId = sessionStorage.getItem('movieId');
    axios.get(`http://www.omdbapi.com/?apikey=905820ff&i=${movieId}`)
        .then((response) => {
            console.log(response);
            const movie = response.data;
            const output = `
            <div class= "row">
               <div class="col-md-4">
                 <img src="${movie.Poster}" class="card card-img bg-dark" alt="${movie.Title} poster">
               </div>
               <div class ="col-md-8">
                    <div class="card-title text-center">
                        <h2>${movie.Title}</h2>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
               </div>
            </div>
            <div class="row">
                <div class="card card-body bg-transparent">
                    <h3>Plot</h3>
                    <p> ${movie.Plot}</p>
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
                </div>
            </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}