// src/index.ts
// Small Movie Library demonstrating typed arrays, object types with optional & readonly,
// and destructuring (both arrays and objects).

type Rating = {
    source: string;
    value: number; // number between 0 and 10
};

// Movie type:
// - `id` is readonly: once set, it can't be changed
// - `title` and `year` are required
// - `rating` is optional (movie can exist without a rating)
type Movie = {
    readonly id: number;
    title: string;
    year: number;
    genres: string[];       // typed array of strings
    rating?: Rating;        // optional property
};

// Example movie data — strongly typed array of Movie
const movies: Movie[] = [
    {
        id: 1,
        title: "Edge of Tomorrow",
        year: 2014,
        genres: ["Action", "Sci-Fi"],
        rating: { source: "IMDb", value: 7.9 },
    },
    {
        id: 2,
        title: "The Grand Budapest Hotel",
        year: 2014,
        genres: ["Comedy", "Drama"],
        rating: { source: "IMDb", value: 8.1 },
    },
    {
        id: 3,
        title: "Untitled Indie",
        year: 2022,
        genres: ["Drama"],
        // rating is intentionally omitted: demonstrates optional property
    },
];

// Utility: print a single movie with destructuring
function printMovie(movie: Movie): void {
    // Object destructuring with aliases:
    const { id, title, year, genres, rating } = movie;
    // genres is an array; we can destructure the first two genres as well:
    const [primaryGenre, secondaryGenre] = genres; // array destructuring

    console.log(`ID: ${id} — ${title} (${year})`);
    console.log(`Genres: ${genres.join(", ")}`);
    if (rating) {
        // rating exists — safe to access
        const { source, value } = rating; // destructure nested object
        console.log(`Rating: ${value}/10 (${source})`);
    } else {
        console.log("Rating: (not available)");
    }
    console.log("---");
}

// List all movies
function listMovies(list: Movie[]): void {
    console.log("All movies:");
    for (const m of list) {
        printMovie(m); // types guarantee printMovie receives a Movie
    }
}

// Find the highest-rated movie (if any)
// We need to handle the fact that `rating` is optional
function highestRated(list: Movie[]): Movie | null {
    // filter out movies without rating
    const rated = list.filter((m) => m.rating !== undefined) as (Movie & { rating: Rating })[];

    if (rated.length === 0) return null;

    // reduce to the movie with highest rating.value
    return rated.reduce((best, current) => {
        return current.rating!.value > best.rating!.value ? current : best;
    });
}

// Add a movie to the library — demonstrates readonly id stays immutable
function addMovie(list: Movie[], newMovie: Movie): void {
    // TypeScript will prevent reassignment to readonly properties:
    // newMovie.id = 99; // ❌ error if attempted
    list.push(newMovie);
}

// Find movies by year
function findByYear(list: Movie[], year: number): Movie[] {
    return list.filter((m) => m.year === year);
}

// --- Demo usage ---
console.log("=== Movie Library Demo ===\n");
listMovies(movies);

const topMovie = highestRated(movies);
if (topMovie) {
    console.log("Highest rated movie:");
    printMovie(topMovie);
} else {
    console.log("No rated movies found.");
}

// Add a new movie (shows how we create Movie typed object)
const newMovie: Movie = {
    id: 4,
    title: "New Indie Gem",
    year: 2025,
    genres: ["Drama", "Art"],
    rating: { source: "Critic", value: 8.7 },
};

addMovie(movies, newMovie);

console.log("\nAfter adding a new movie:\n");
listMovies(movies);

// Example: destructuring function return
const movies2014 = findByYear(movies, 2014);
console.log(`Movies from 2014 count: ${movies2014.length}`);
for (const movie of movies2014) {
    // destructure the movie to show title and year
    const { title, year } = movie;
    console.log(`- ${title} (${year})`);
}
