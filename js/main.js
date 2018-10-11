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
              <div class="card card-body bg-light text-center">                
                  <img src="${movie.Poster}">
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