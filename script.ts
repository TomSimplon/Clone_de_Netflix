import { API_KEY } from './key';

async function fetchPopularMovies() {
  try {
      // Fetch API pour récupérer les données
      const result: Response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
      const data: any = await result.json();

      // Const récupere scroll
      const listDiv: Element | null = document.querySelector('#section_tendances .list');
      const popularMovies: any = data.results;
      popularMovies.forEach(movie => {

          const domImg: HTMLImageElement = document.createElement('img');
          domImg.setAttribute('src', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
          domImg.id = movie.id.toString();
          listDiv?.appendChild(domImg);
      });

      // Récupération des id des films
      async function getmoviebyId (movieId) {
          const movierequest = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
          const datamovierequest = await movierequest.json();
          return datamovierequest;
      }

      // Récupère les informations du film pour les afficher dans les div correspondantes
      function displayMovieInfo(movie: any): void {
          const title = document.querySelector('#infos h2') as HTMLHeadingElement;
          const date = document.querySelector('#infos .date') as HTMLElement;
          const resume = document.querySelector('#infos .resume') as HTMLElement;
          const actors = document.querySelector('#infos .actors') as HTMLElement;
          const genre = document.querySelector('#infos .genre') as HTMLElement;
          const rated = document.querySelector('#infos .rated') as HTMLElement;
          const infosBanniereSection = document.querySelector('#infos_bannière') as HTMLElement;

          if (title !== null) {
            title.textContent = movie.original_title;
          }
          console.log(title);
          
          if (date !== null) {
            date.textContent = movie.release_date;
          }
                    
          if (resume !== null) {
            resume.textContent = movie.overview;
          }
          
          if (actors !== null) {
            actors.textContent = `Distribution : ${movie.credits.cast.map((actor: any) => actor.name).join(', ')}`;
          }
          
          if (genre !== null) {
            genre.textContent = `Genre : ${movie.genres.map((genre: any) => genre.name).join(', ')}`;
          }
          
          if (rated !== null) {
            rated.textContent = `Recommandé à ${movie.vote_average}%`;
          }
          
          if (infosBanniereSection !== null) {
            infosBanniereSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
          }
      }

      // Récupération des images et ajout d'un écouteur d'événements sur chaque image
      const images: NodeListOf<Element> = document.querySelectorAll('.list img');
      console.log(images);
      images.forEach(image => {
          image.addEventListener('click', async () => {
              const movieId = image.id;
              console.log(movieId);
              const movie: any = await getmoviebyId(movieId);
              console.log(movie);
              displayMovieInfo(movie);
              window.location.href = '/assets_html/info.html';
          });
      });

  } catch (error) {
      console.log(error)
  }
}

// Execute la fonction pour fetch les films à tendance
fetchPopularMovies();

async function fetchTopRatedMovies() {
    try {
        // Fetch API pour récupérer les données
        const result: Response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        const data: any = await result.json()

        const listDiv: Element | null = document.querySelector('#section_top_rated .list');
        const popularMovies: any = data.results;
        popularMovies.forEach(movie => {

        const domImg: HTMLImageElement = document.createElement('img');
        domImg.setAttribute('src', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
        domImg.id = movie.id.toString();
        listDiv?.appendChild(domImg);

    });

     // Récupération des id des films
     async function getmoviebyId (movieId) {
      const movierequest = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
      const datamovierequest = await movierequest.json();
      return datamovierequest;
  }

  // Récupère les informations du film pour les afficher dans les div correspondantes
  function displayMovieInfo(movie: any): void {
      const title = document.querySelector('#infos h2') as HTMLHeadingElement;
      const date = document.querySelector('#infos .date') as HTMLElement;
      const resume = document.querySelector('#infos .resume') as HTMLElement;
      const actors = document.querySelector('#infos .actors') as HTMLElement;
      const genre = document.querySelector('#infos .genre') as HTMLElement;
      const rated = document.querySelector('#infos .rated') as HTMLElement;
      const infosBanniereSection = document.querySelector('#infos_bannière') as HTMLElement;

      
      if (title) {
        title.textContent = movie.original_title;
      }
      console.log(title);
      
      if (date) {
        date.textContent = movie.release_date;
      }
      console.log(date);
                
      if (resume) {
        resume.textContent = movie.overview;
      }
      
      if (actors) {
        actors.textContent = `Distribution : ${movie.credits.cast.map((actor: any) => actor.name).join(', ')}`;
      }
      
      if (genre) {
        genre.textContent = `Genre : ${movie.genres.map((genre: any) => genre.name).join(', ')}`;
      }
      
      if (rated) {
        rated.textContent = `Recommandé à ${movie.vote_average}%`;
      }
      
      if (infosBanniereSection) {
        infosBanniereSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
      }
  }

  // Récupération des images et ajout d'un écouteur d'événements sur chaque image
  const images: NodeListOf<Element> = document.querySelectorAll('.list img');
  images.forEach(image => {
      image.addEventListener('click', async () => {
          const movieId = image.id;
          const movie: any = await getmoviebyId(movieId);
          displayMovieInfo(movie);
          await new Promise(resolve => setTimeout(resolve, 100)); // attendre un peu avant de rediriger
        //  window.location.href = '/assets_html/info.html';
      });
  });

    } catch (error) {
        console.log(error)
    }
}

// Execute la fonction pour fetch les films les mieux notés
fetchTopRatedMovies();

async function fetchTopUpcomingMovies() {
    try {
        // Fetch API pour récupérer les données
        const result: Response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        const data: any = await result.json()

        const listDiv: Element | null = document.querySelector('#section_upcoming .list');
        const popularMovies: any = data.results;
        popularMovies.forEach(movie => {

        const domImg: HTMLImageElement = document.createElement('img');
        domImg.setAttribute('src', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
        domImg.id = movie.id.toString();
        listDiv?.appendChild(domImg);

  });

     // Récupération des id des films
     async function getmoviebyId (movieId) {
      const movierequest = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
      const datamovierequest = await movierequest.json();
      return datamovierequest;
  }

  // Récupère les informations du film pour les afficher dans les div correspondantes
function displayMovieInfo(movie: any): void {
  const title = document.querySelector('#infos h2') as HTMLHeadingElement;
  const date = document.querySelector('#infos .date') as HTMLElement;
  const resume = document.querySelector('#infos .resume') as HTMLElement;
  const actors = document.querySelector('#infos .actors') as HTMLElement;
  const genre = document.querySelector('#infos .genre') as HTMLElement;
  const rated = document.querySelector('#infos .rated') as HTMLElement;
  const infosBanniereSection = document.querySelector('#infos_bannière') as HTMLElement;

  if (title) {
    title.textContent = movie.original_title;
  }
  
  if (date) {
    date.textContent = movie.release_date;
  }
  
  if (resume) {
    resume.textContent = movie.overview;
  }
  
  if (actors) {
    actors.textContent = `Distribution : ${movie.credits.cast.map((actor: any) => actor.name).join(', ')}`;
  }
  
  if (genre) {
    genre.textContent = `Genre : ${movie.genres.map((genre: any) => genre.name).join(', ')}`;
  }
  
  if (rated) {
    rated.textContent = `Recommandé à ${movie.vote_average}%`;
  }
  
  if (infosBanniereSection) {
    infosBanniereSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
  }
}

// Récupération des images et ajout d'un écouteur d'événements sur chaque image
const images: NodeListOf<Element> = document.querySelectorAll('.list img');
images.forEach(image => {
  image.addEventListener('click', async () => {
    const movieId = image.id;
    const movie: any = await getmoviebyId(movieId);
    displayMovieInfo(movie);
    await new Promise(resolve => setTimeout(resolve, 100)); // attendre un peu avant de rediriger
   // window.location.href = '/assets_html/info.html';
  });
});


    } catch (error) {
        console.log(error)
    }
}

// Execute la fonction pour fetch les films à venir
fetchTopUpcomingMovies();



// Barre de recherche et pagination
// Import des éléments nécessaires de la page search.html
const pageTitle = document.querySelector('#search h2') as HTMLHeadingElement;
const resultList = document.querySelector('#search .list') as HTMLDivElement;
const previousPageButton = document.querySelector('#previous-page') as HTMLButtonElement;
const nextPageButton = document.querySelector('#next-page') as HTMLButtonElement;
const pageNumber = document.querySelector('#page-number') as HTMLSpanElement;
const searchForm = document.querySelector('.search-form') as HTMLFormElement;
const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;

// Constantes pour gérer la pagination
const PAGE_SIZE = 20;
let currentPage: number = 1;
let totalResults: number = 0;
let searchContent: string = '';

// Fonction pour récupérer les films de la recherche
async function fetchSearchMovies(page: number) {
  try {
    // Fetch API pour récupérer les données
    const result: Response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchContent)}&page=${page}`);
    const data: any = await result.json();

    const searchMovies = data.results;
    totalResults = data.total_results;
    resultList.innerHTML = '';
    searchMovies.forEach(movie => {
      if (movie.poster_path !== null) {
        console.log(movie.poster_path);

        const domImg: HTMLImageElement = document.createElement('img');
        domImg.setAttribute('src', 'https://image.tmdb.org/t/p/w185' + movie.poster_path);
        domImg.id = movie.id.toString();
        resultList?.appendChild(domImg);
      }
    });

    // Mise à jour du titre de la page de recherche avec le contenu de la recherche
    pageTitle.textContent = `Résultats pour "${searchContent}"`;

    // Mise à jour de la pagination
    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    if(totalPages === 1) {
      previousPageButton.disabled
    }
     if(currentPage === totalPages) {
      nextPageButton.disabled
     }
    pageNumber.textContent = currentPage.toString();
  } catch (error) {
    console.log(error);
  }
}

// Ajout d'un événement submit au formulaire de recherche
searchForm.addEventListener('submit', async (event) => {
  // Empêche le comportement par défaut du formulaire
  event.preventDefault();

  // Récupération du contenu de la recherche
  searchContent = searchInput.value.trim();
  if (searchContent) {
    // Redirection vers la page de recherche
    window.location.href = `/assets_html/search.html?q=${encodeURIComponent(searchContent)}`;
  }
});

// Récupération du contenu de la recherche à partir de l'URL
const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
searchContent = searchParams.get('q') ?? '';
if (searchContent) {
  fetchSearchMovies(currentPage);
}

// Ajout d'un événement "click" sur les boutons de pagination
if (previousPageButton) {
  previousPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchSearchMovies(currentPage);
    }
  });
}

if (nextPageButton) {
  nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    if (currentPage < totalPages) {
      currentPage++;
      fetchSearchMovies(currentPage);
    }
  });
}

searchForm.addEventListener('submit', async (event) => {
  // Empêche le comportement par défaut du formulaire
  event.preventDefault();

  // Récupére le contenu de la recherche
  const searchContent: string = searchInput.value.trim();
  if (searchContent) {
    // Rediriger vers la page de recherche
    window.location.href = `/assets_html/search.html?q=${encodeURIComponent(searchContent)}`;
  }
});









