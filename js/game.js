var game;
var wheel;
var canSpin;
//var antalslices = prompt("Hvor mange personer er i? (2-100)","18")
var hjulfarver = [0xFF0000, 0xFFFF00]
var hjulradius = 350
var latestHits = [];


// Her indsættes bundesange!!!
// ["Navn", ["youtubeID1", "YoutubeID2", ..], "facebookID ELLER img link"] 100 x 100 size
//https://www.youtube.com/watch?v=
var items = [
    ["Puke",[""],"profil/andrias.jpg"],
    ["Tramp",["QiFBgtgUtfw"], "profil/Daf.jpg"], 
    ["Pony", ["0rjZctQddOo"], "profil/fie.jpg"], 
    ["Bongduella", ["ZyhrYis509A"], "profil/Emilie.jpg"], 
    ["Sir Flex Alot", ["r2LpOUwca94", "OI3shBXlqsw", "VXd3MyFkLOk"], "profil/frederik.jpg"], 
    ["Dakke",["5Dtre2Yiw78" ], "profil/Hannah.png"], 
    ["Vino Blomst", ["N8t078YDojM"],"profil/Jonas.jpg"], 
    ["Træspritten", ["L_jWHffIx5E"], "profil/Helene.jpg"], 
    ["Smølfer", ["dDu_wOTRXIM"], "profil/Louise.jpg"], 
   ["Alle", ["bNJDFlWh2kI"], "profil/Rask.jpg"], 
  ];

var extrafield = ["Alle", ["VEVDcuqW01Y", "AgFeZr5ptV8", "0NTDqqnH9Bk","04854XqcfCY"], "profil/alle.jpg"];
var antalslices = items.length
// KORREKT YOUTUBE URL Med autoplay og start ved 0:30 sek mark
// https://www.youtube.com/embed/2YllipGl2Is?start=30&autoplay=1
// vigtigt: ? ved første yt command og & for hvert efterfølgende command


var prize;
var prizeText;
var player;
var mask;

window.onload = function() {
	game = new Phaser.Game(720, 720, Phaser.AUTO, "hjulet", null, true);

     // adding "PlayGame" state
     game.state.add("PlayGame",playGame);

     // launching "PlayGame" state
     game.state.start("PlayGame");

}

function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}

function addImage(imgsource){
  var url;

  console.log(imgsource)

  if (imgsource.length > 1) {
    url = imgsource;
  } else {
    url = "img/kappa.png";
  }
  return url;
}


// PLAYGAME STATE

var playGame = function(game){};

playGame.prototype = {

     // function to be executed once the state preloads
     preload: function(){

          // preloading graphic assets
          game.load.crossOrigin = "Anonymous";
          game.load.image("wheel", "img/lykkehjulet.png");
          game.load.image("kappa", "img/kappa.png");
		      game.load.image("pin", "img/pin.png");
          if((items.length % 2) == 1){
              items.push(extrafield);
              antalslices++;
          }
          for(var i = 0; i < items.length; i++){
            game.load.image("player"+i, addImage(items[i][2]));
          }
          game.load.audio("spinsound", "sound/spin.mp3");

     },

     // funtion to be executed when the state is created
  	create: function(){

          spinsound = game.add.audio("spinsound");

          // giving some color to background
  		game.stage.backgroundColor = "#880044";

          // adding the wheel in the middle of the canvas
  		//wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");

          var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

          var wheel_layer = game.add.group();

          var textGroup = game.add.group();

          var kappa;

          graphics.lineStyle(0);

          graphics.beginFill(0xFF3300);

          graphics.arc(0, 0, hjulradius, 0, game.math.PI2, false);

          graphics.endFill();


          for(var i = 0; i < antalslices; i++){

               graphics.beginFill(hjulfarver[i%2]);

               graphics.arc(0, 0, hjulradius, 0+(game.math.PI2/antalslices)+(i*(game.math.PI2/antalslices)), game.math.PI2+(i*(game.math.PI2/antalslices)), true, 8000);

               graphics.endFill();

          }

          wheel = game.add.sprite(game.width / 2, game.width / 2, graphics.generateTexture());


          // Tilføjer billeder af spillere på hjulet
          for(var i = 0; i < antalslices; i++){

               sprite = game.make.sprite(0, 0, "player"+i)

               mask = game.add.graphics(0, 0);

                mask.beginFill(0xffffff);
                mask.drawCircle(sprite.x, sprite.y, 80);
                sprite.mask = mask;
                sprite.addChild(mask);

                // Tilføj navn til hjulet
                //if(items[i][2].length == 0){
                  var text = game.add.text(sprite.x, sprite.y+20, items[i][0], { font: "20px Arial", fill: "#ffffff", align: "center", stroke: 'black', strokeThickness: 3 });
                  text.anchor.setTo(0.5);
                  sprite.addChild(text);
                //}

               kappa = wheel.addChild(sprite);

               kappa.anchor.setTo(0.5);

               kappa.pivot.y = 300;

               kappa.rotation = (i*(game.math.PI2/antalslices)+(game.math.PI2/4)+((game.math.PI2/antalslices)/2));


          }

          graphics.destroy();

          // setting wheel registration point in its center
          wheel.anchor.set(0.5);

          wheel_layer.add(wheel);

          // adding the pin in the middle of the canvas
          var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");

          // setting pin registration point in its center
          pin.anchor.set(0.5);

          // adding the text field
          prizeText = game.add.text(game.world.centerX, 580, "");

          // setting text field registration point in its center
          prizeText.anchor.set(0.5);

          // aligning the text to center
          prizeText.align = "center";

          // the game has just started = we can spin the wheel
          canSpin = true;

          // waiting for your input, then calling "spin" function
          game.input.onDown.add(this.spin, this);

         // game.time.events.add(Phaser.Timer.SECOND * 4, this.spin, this);

	},

     // function to spin the wheel
     spin:function(){

          // can we spin the wheel?
          if(canSpin){

               // resetting text field
               prizeText.text = "";

               // the wheel will spin round from 2 to 4 times. This is just coreography
               var rounds = game.rnd.between(10, 14);

               // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
               var degrees = Math.round(Math.random() * 360)

               // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
               prize = antalslices - 1 - Math.floor(degrees / (360 / antalslices));

               // now the wheel cannot spin because it"s already spinning
               canSpin = false;

               // lykkehjul jingle spil!
               spinsound.play();

               // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
               // the quadratic easing will simulate friction
               var spinTween = game.add.tween(wheel).to({

                    angle: (360 * rounds + degrees) + 270

               }, 17000, Phaser.Easing.Quartic.Out, true, 1500);

               // once the tween is completed, call winPrize function
               spinTween.onComplete.add(this.winPrize, this);

          }
     },

     // function to assign the prize
     winPrize:function(){

      // now we can spin the wheel again
      canSpin = true;

      var url;
      var antalsange = game.rnd.between(0, items[prize][1].length-1);



      var winner = items[prize][1][antalsange];
      console.log(items[prize][0]);
      $('#tillykke').html(items[prize][0]+ " har f&#248;dselsdag! Bunde bundee ;)");

      if(winner.length == 11){
        url = "https://www.youtube.com/embed/" + winner + "?autoplay=1&rel=0";
      } else {
        url = "https://www.youtube.com/embed/" + winner + "&autoplay=1&rel=0";
      }

      $("#myModal").on('show.bs.modal', function(){
          $("#youtubeEmbed").attr('src', url);
      });

      $("#myModal").on('hide.bs.modal', function(){
          $("#youtubeEmbed").attr('src', '');
      });

      $('#myModal').modal({
        backdrop: 'static'
      })
    }
}
