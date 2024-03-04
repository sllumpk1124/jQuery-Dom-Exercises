$(document).ready(function() {
    // Movie array to store added movies
    const movies = [];

    // Event listener for form submission
    $('#movieForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get values from the form
        const title = $('#title').val();
        const rating = $('#rating').val();

        // Validate title length
        if (title.length < 2) {
            alert('Title must have at least 2 characters.');
            return;
        }

        // Append movie item to the DOM and add to the movies array
        appendMovieItem(title, rating);
        movies.push({ title: title, rating: parseInt(rating) });

        // Clear the form inputs
        $('#title').val('');
        $('#rating').val('');
    });

    // Event listener for remove buttons
    $('#movieList').on('click', '.remove-btn', function() {
        // Remove the movie item from the DOM
        const index = $(this).closest('.movie-item').index();
        movies.splice(index, 1); // Remove the movie from the array
        $(this).closest('.movie-item').remove();
    });

    // Event listener for sort buttons
    $('#sortTitleAscBtn').click(function() {
        sortMovies('title', 'asc');
    });

    $('#sortTitleDescBtn').click(function() {
        sortMovies('title', 'desc');
    });

    $('#sortRatingAscBtn').click(function() {
        sortMovies('rating', 'asc');
    });

    $('#sortRatingDescBtn').click(function() {
        sortMovies('rating', 'desc');
    });

    // Function to append a movie item to the DOM
    function appendMovieItem(title, rating) {
        const movieItem = $('<div class="movie-item">');
        movieItem.append('<div class="movie-info"><p class="title-container">Title: ' 
        + title + '</p><p class="rating-container">Rating: ' 
        + rating + '</p></div>');
        movieItem.append('<button class="remove-btn">Remove</button>');

        // Append the movie item to the movie list
        $('#movieList').append(movieItem);
    }

    // Function to sort movies by title or rating
    function sortMovies(property, order) {
        movies.sort(function(a, b) {
            let aValue = a[property];
            let bValue = b[property];

            if (property === 'title') {
                // Case-insensitive string comparison for titles
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            } else if (property === 'rating') {
                // Convert ratings to numbers for correct numerical sorting
                aValue = parseInt(aValue);
                bValue = parseInt(bValue);
            }

            if (order === 'asc') {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
            }
        });

        // Clear the movie list
        $('#movieList').empty();

        // Append sorted movies to the DOM
        movies.forEach(function(movie) {
            appendMovieItem(movie.title, movie.rating);
        });
    }
});
