// https://www.omdbapi.com/?i=tt3896198&apikey=ffb1115e
const moviesearchbox=document.getElementById('movie-search-box');
const searchlist=document.getElementById('search-list');
const resultGrid=document.getElementById('result-grid');
//load movie from api


async function loadmovie(searchTerm){
    const URL=`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=ffb1115e`;
    const res= await fetch(`${URL}`);
    const data=await res.json();
    // console.log(data);
    if(data.Response=='True'){
         displayMovie(data.Search);
    }
}
// loadmovie('Lord of the rings');
// function findM
function findmovies(){
    let searchTerm=(moviesearchbox.value).trim();
    if(searchTerm.length>0){
        searchlist.classList.remove('hide-containor');
        loadmovie(searchTerm);
    } else {
        searchlist.classList.add('hide-containor');
    }
}
function displayMovie(movies){
    searchlist.innerHTML=" ";
    for(let i=0; i<movies.length; i++){
        let moviesitem=document.createElement('div');
        // console.log(moviesitem);\
        moviesitem.dataset.id=movies[i].imdbID;
        moviesitem.classList.add('search-list-item');
        if(movies[i].Poster!="N/A"){
            movviePoster=movies[i].Poster;
        } else {
            movviePoster="image_not_found.png";
        }
        moviesitem.innerHTML=`<div class="search-item-thumbnail">
        <img src="${movviePoster}">
      </div>
      <div class="search-item-info">
       <h3> ${movies[i].Title}</h3>
       <p>${movies[i].Year}</p>
      </div>`;
      searchlist.appendChild(moviesitem);
    
    }
 loadmoviedetails();
}
 function loadmoviedetails(){
    const searchlistMovies=searchlist.querySelectorAll('.search-list-item');
    searchlistMovies.forEach(movie=>{
        movie.addEventListener('click' ,async () =>{
            // console.log(movie.dataset.id);
            searchlist.classList.add('hide-containor');
            moviesearchbox.value=" ";  
             const result1=await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=ffb1115e`);
             const movieDetails=await result1.json();
              displayMoviedetails(movieDetails);                                                                                                                                                                                                                  
        });
    });
 }
// var searchid;
 function displayMoviedetails(movieDetails){
    //  searchid=`${movieDetails.imdbID}`;
      
    // console.log(searchid);
    
    resultGrid.innerHTML=`
       <div class="movie-poster">
        <img src="${(movieDetails.Poster!="N/A")?movieDetails.Poster:"image_not_found.png"}" alt="movie poster">
     </div>
      <div class="movie-info">
        <h3 class="movie-title">${movieDetails.Title} </h3>
      <ul class="movie-misc-info">
      <li class="year">${movieDetails.Year}</li>
      <li class="rated">${movieDetails.Rated}</li>
      <li class="released">${movieDetails.Released} </li>
      </ul>
      <p class="genre"> <b> Genre:</b> ${movieDetails.Genre}</p>
      <p class="writer"><b>Writer:</b> ${movieDetails.Writer}</p>
      <p class="actor"><b> Actors:</b>${movieDetails.Actors}</p>
     <p class="plot"><b>Plot:</b>  ${movieDetails.Plot}
     </p>
     <p class="language"><b> Language:</b> ${movieDetails.Language}</p>
     <p class="award">
    <b> <i class="fa-solid fa-award"></i></b>  ${movieDetails.Awards}
        </p>
                           <div class="fav-movie" >
                                  <button  onclick="repoin(this)" data-id="${movieDetails.imdbID}" style=" padding: 10px;
                                  font-size: 1rem;
                                  background-color: var(--md-dark-color);
                                  color: white;
                                  border-color: white;
                                  font-weight: 600;
                                  width:200px;
                                  cursor:pointer;"> Add to favirote</button>
                               </div>
    `;

 }
 window.addEventListener('click',function(event){
if(event.target.className!="form-controle"){
    searchlist.classList.add('hide-containor');
}});
 


async function repoin(e){
    const id=e.getAttribute('data-id');
    const res=await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ffb1115e`);
    const data=await res.json();
    add(data);
}
const fav=document.getElementById('fav-movie')
function add(x){
    console.log(x);
     
 
localStorage.setItem("moviedetails",JSON.stringify(x));
 let ans =JSON.stringify(localStorage.getItem("moviedetails"));
 let m=JSON.stringify((localStorage.getItem("Title",JSON.stringify(("${ans.Title}")))));
 console.log(m);
   
   
 const inrdiv=document.createElement('div');
  
inrdiv.innerHTML=`
 <img src=${x.Poster}>
 <i class="fa-solid fa-trash" onclick="delete1(fav)"></i>
`;
 fav.append(inrdiv);

 
}

function delete1(fav){
   fav.remove();
};