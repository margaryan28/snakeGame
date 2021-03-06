$(document).ready(function(){ 
	//HELL UNLEASHED

	//DEFINE CANVAS VARS
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext ('2d');
	var w = canvas.width; //width of canvas
	var h = canvas.height; //height of canvas
	var cw = 15; //width of each cell cw cell width
	var d = 'right'; //direction
	var food; //yani food eli :D
	var score; //current game score
	var speed = 130;
	var color = 'green';
	var snakeArray;//snake array

	//INITIALIZER
	function init() {
		d = 'right';
		create_snake();
		create_food();
		score = 0;

		if (typeof game_loop!='undefined') clearInterval(game_loop);
		game_loop=setInterval(paint, speed);
	};
	init(); //RUN INITILIZER

	//CREATE SNAKE 
	function create_snake() {
		var length = 5;
		snakeArray=[];
		for (var i = length - 1; i >= 0; i--) {
			snakeArray.push({x:i, y:0});
		}
	}

	//CREATE FOOD
	function create_food() {
		food={
			x:Math.round(Math.random()*(w-cw)/cw),
			y:Math.round(Math.random()*(h-cw)/cw)
		};
	}

	//PAINT FUNCITON
	function paint() {
		//paint the canvas
		ctx.fillStyle='#000000';
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle='#ffffff';
		ctx.strkeRect=(0, 0, w, h);

		var nx=snakeArray[0].x;
		var ny=snakeArray[0].y;

		if (d=='right') nx++;
		else if(d=='left') nx--;
		else if(d=='up') ny--;
		else if(d=='down') ny++;

		if (nx==-1 || nx==w/cw || ny==-1 || ny==h/cw || check_collision(nx, ny, snakeArray)) {
			//INSERT SCORE INTO FINAL SCORE DIV
			$('#finalScore').html(score);
			//SHOW OVERLAY DIV
			$('#overlay').fadeIn(300)
			return;
		}

		if (nx==food.x && ny==food.y) {
			var tail = {x: nx, y: ny};
			score++;
			//create new food
			create_food();
		}else{
			var tail = snakeArray.pop();
			tail.x=nx; tail.y=ny;
		}
		snakeArray.unshift(tail);

		for (var i = 0; i < snakeArray.length; i++) {
			var c = snakeArray[i];
			paint_cell(c.x,c.y);
		}

		paint_cell(food.x,food.y);

		//CHECK SCORE
		checkScore(score);
		//DISPLAY CURRENT SCORE
		$('#score').html('Score:'+' '+ score)
	}

	function paint_cell(x,y) {
		ctx.fillStyle=color;
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle='#ffffff';
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

	function check_collision(x,y,array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i.x==x && array[i].y==y]) {
				return true;
			}
		}
		return false;
	}

	function checkScore(score){
		//if no highscore
		if (localStorage.getItem('highscore')==null) {
			localStorage.setItem('highscore', score);
		}else{
			if (score>localStorage.getItem('highscore')) {
				localStorage.setItem('highscore', score)
			}
		}
		$('#highScore').html('High Score:'+' '+localStorage.highscore);
	}

	//KEYBOARD CTRL
	$(document).keydown(function(e){
		var key = e.which;
		if (key==37 && d!='right') d = 'left';
		else if(key==38 && d!='down') d = 'up';
		else if(key==39 && d!='left') d = 'right';
		else if(key==40 && d!='up') d = 'down';
	})
});

//RESET SCORE
function resetScore() {
	localStorage.highscore=0;
	//display high score
	var highscorediv = document.getElementById('highScore');
	highscorediv.innerHTML="High Score: 0"
}

//i lost my anal virginity :(