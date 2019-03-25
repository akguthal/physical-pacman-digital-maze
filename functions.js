// Initialize Firebase
var config = {
  apiKey: "AIzaSyDFxK5nICfcDDYsfrXvvKy8_YxVFvLYx7w",
  authDomain: "physical-pacman-digital-maze.firebaseapp.com",
  databaseURL: "https://physical-pacman-digital-maze.firebaseio.com",
  projectId: "physical-pacman-digital-maze",
  storageBucket: "physical-pacman-digital-maze.appspot.com",
  messagingSenderId: "836534928022"
};
var fbase = firebase.initializeApp(config);
fbase.database().ref("/").set({ //initialize light to false in firebase
  move: -1
});

var counter = 0;


var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "sprite.png", 50, 50);
    myGameArea.start();
    myGamePiece.update();
    this.interval = setInterval(updateGameArea, 200);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, img, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.image = new Image();
    this.image.src = img;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
}

function move(dir, speed) {
  myGameArea.clear();
  if (dir == 0){
    myGamePiece.x += speed;
    if (myGamePiece.x >= (myGameArea.canvas.width-myGamePiece.width)) {
      myGamePiece.x = (myGameArea.canvas.width-myGamePiece.width);
    }
  }
  else if (dir == 1) {
    myGamePiece.x -= speed;
    if (myGamePiece.x <= 0) {
      myGamePiece.x = 0;
    }    
  }
  else if (dir == 2) {
    myGamePiece.y += speed;
    if (myGamePiece.y >= (myGameArea.canvas.height-myGamePiece.height)) {
      myGamePiece.y = (myGameArea.canvas.height-myGamePiece.height);
    }    
  }
  else if (dir == 3) {
    myGamePiece.y -= speed;
    if (myGamePiece.y <= 0) {
      myGamePiece.y = 0;
    }     
  }
  myGamePiece.update();
}

window.onkeydown = (event) => {
  fbase.database().ref("/").once('value').then(function(snapshot) {
    if (snapshot.val().move == -1) {
      if (event.keyCode == 39) {
        fbase.database().ref("/").set({ //turn light on when we move right
          move: 1
        })
        .then(function(_) {
          move(0, 5);
        });
      }
      if (event.keyCode == 37) {
        fbase.database().ref("/").set({ //turn light off when we move left
          move: 0
        })
        .then(function(_) {
          move(1, 5);
        });
      }
      if (event.keyCode == 40) {
        fbase.database().ref("/").set({ //turn light off when we move left
          move: 3
        })
        .then(function(_) {
          move(2, 5);
        });
      }
      if (event.keyCode == 38) {
        fbase.database().ref("/").set({ //turn light off when we move left
          move: 2
        })
        .then(function(_) {
          move(3, 5);
        }); 
      }
      counter++      
    }
  })
}

// window.onkeyup = (event) => {
//   fbase.database().ref("/").set({
//     move: -1
//   });
// }