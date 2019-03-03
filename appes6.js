class VideoGame {
    constructor(title, developer, year){
        this.title = title;
        this.developer = developer;
        this.year = year;
    }
}
class UI {
    addVideoGameToList(videoGame){
        const list = document.getElementById('video-game-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
        <td>${videoGame.title}</td>
        <td>${videoGame.developer}</td>
        <td>${videoGame.year}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    
    list.appendChild(row);
    }
    
    showAlert(message, className){
        //create div
    const div = document.createElement('div');
    //add class name
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#video-game-form');
    //insert alert
    container.insertBefore(div, form);
    
    //timeout after 3 secs
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
    }
    
    deleteGame(target){
        if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
    }
    
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('developer').value = '';
        document.getElementById('year').value = '';
    }
}

// local storage class
class Store {
    static getVideoGames(){
        let games;
        if(localStorage.getItem('games') === null){
            games = [];
        } else {
            games = JSON.parse(localStorage.getItem('games'));
        }
        
        return games;
    }
    
    static displayVideoGames(){
        const games = Store.getVideoGames();
        
        games.forEach(function(game){
            const ui = new UI;
            
            //add book to UI
            ui.addVideoGameToList(game);
        });
    }
    
    static addVideoGame(videoGame){
        const games = Store.getVideoGames();
        
        games.push(videoGame);
        
        localStorage.setItem('games', JSON.stringify(games));
    }
    
    static removeVideoGame(year){
        const games = Store.getVideoGames();
        
        games.forEach(function(game, index){
            if(game.year === year){
                games.splice(index, 1);
            }
        });
        
        localStorage.setItem('games', JSON.stringify(games));
    }
}

// DOM load event
document.addEventListener('DOMContentLoaded', 
Store.displayVideoGames());

//event listener for add video game

document.getElementById('video-game-form').addEventListener('submit', 
function(e){
    // get form values
    const title = document.getElementById('title').value, 
          developer = document.getElementById('developer').value,
          year = document.getElementById('year').value;
          
          //instatiate video game
          const videoGame = new VideoGame(title, developer, year);
          
          //instantiate UI
          const ui = new UI();
          
          //validate
          if(title === '' && developer === '' && year === ''){
            // error alert
            ui.showAlert('Please enter something.', 'error');
          } else {
            //add video game to list
            ui.addVideoGameToList(videoGame);
            //add to local storage
            Store.addVideoGame(videoGame);
          
          //show success
            ui.showAlert('Vidya added!', 'success');
          
          //clear fields
            ui.clearFields();
          }
          e.preventDefault();
});

//event listener for delete
document.getElementById('video-game-list').addEventListener
('click', function(e){
    //instantiate UI
    const ui = new UI();
    
    //delete game
    ui.deleteGame(e.target);
    
    //remove from local storage
    Store.removeVideoGame(e.target.parentElement.previousElementSibling.
    textContent);
    
    //show message
    ui.showAlert('Game removed', 'success');
    e.preventDefault();
});


    //alphabetize event listener
document.getElementById("alphabetize-button").addEventListener
('click', function(e){
    const ui = new UI();
    let parent = document.getElementById("video-game-list"),
    itemsArray = Array.prototype.slice.call(parent.children);
    itemsArray.sort(function (a, b) {
    if (a.innerText < b.innerText) return -1;
    if (a.innerText > b.innerText) return 1;
    return 0;
});

    itemsArray.forEach(function (item) {
    parent.appendChild(item);
});
    ui.showAlert('Bam! Alphabetized!', 'success');
    e.preventDefault();
});



