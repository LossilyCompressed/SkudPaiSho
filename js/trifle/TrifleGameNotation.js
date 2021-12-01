// Trifle Notation

// --------------------------------------------- // 

Trifle.NotationBuilderStatus = {
	PROMPTING_FOR_TARGET = "PROMPTING_FOR_TARGET"
};

Trifle.NotationMove = function(text, promptTargetData) {
	this.fullMoveText = text;
	this.analyzeMove();
	this.promptTargetData = promptTargetData;
}

Trifle.NotationMove.prototype.analyzeMove = function() {
	this.valid = true;

	this.moveData = JSON.parse(this.fullMoveText);
};

Trifle.NotationMove.prototype.isValidNotation = function() {
	return this.valid;
};

Trifle.NotationMove.prototype.equals = function(otherMove) {
	return this.fullMoveText === otherMove.fullMoveText;
};



// --------------------------------------- //

Trifle.NotationBuilder = function() {
	// this.moveNum;	// Let's try making this magic
	// this.player;		// Magic
	this.moveType;

	// DEPLOY
	this.tileType;
	this.endPoint;

	// MOVE
	this.startPoint;
	//this.endPoint; // Also used in DEPLOY

	this.status = BRAND_NEW;
}

Trifle.NotationBuilder.prototype.getNotationMove = function(moveNum, player) {
	var move = {
		moveNum: moveNum,
		player: player,
		moveType: this.moveType
	};

	if (this.moveType === TEAM_SELECTION) {
		move.teamSelection = this.teamSelection;
	} else if (this.moveType === MOVE) {
		move.startPoint = this.startPoint.pointText;
		move.endPoint = this.endPoint.pointText;
	} else if (this.moveType === DEPLOY) {
		move.tileType = this.tileType;
		move.endPoint = this.endPoint.pointText;
	}

	if (this.promptTargetData) {
		move.promptTargetData = this.promptTargetData;
	}

	if (this.offerDraw) {
		move.offerDraw = true;
	}

	return move;
};

// --------------------------------------- //



Trifle.GameNotation = function() {
	this.notationText = "";
	this.moves = [];
}

Trifle.GameNotation.prototype.setNotationText = function(text) {
	this.notationText = text;
	this.loadMoves();
};

Trifle.GameNotation.prototype.addMove = function(move) {
	this.moves.push(move);
};

Trifle.GameNotation.prototype.removeLastMove = function() {
	var removedMove = this.moves.pop();
	
	debug("Removed Move:");
	debug(removedMove);
};

Trifle.GameNotation.prototype.getPlayerMoveNum = function() {
	var moveNum = 0;
	var lastMove = this.moves[this.moves.length-1];

	if (lastMove) {
		moveNum = lastMove.moveNum;
		if (lastMove.player === GUEST) {
			moveNum++;
		}
	}
	return moveNum;
};

Trifle.GameNotation.prototype.getNotationMoveFromBuilder = function(builder) {
	var moveNum = 0;
	var player = HOST;

	var lastMove = this.moves[this.moves.length-1];

	if (lastMove) {
		moveNum = lastMove.moveNum;
		if (lastMove.player === GUEST) {
			moveNum++;
		} else {
			player = GUEST;
		}
	}

	return builder.getNotationMove(moveNum, player);
};

Trifle.GameNotation.prototype.loadMoves = function() {
	this.moves = [];
	if (this.notationText) {
		this.moves = JSON.parse(this.notationText);
	}
};

Trifle.GameNotation.prototype.buildSimplifiedNotationString = function(move) {
	var playerCode = getPlayerCodeFromName(move.player);
	var moveNum = move.moveNum;

	return moveNum + playerCode + ".¯\\_(ツ)_/¯";	// TODO, obviously
};

Trifle.GameNotation.prototype.getNotationHtml = function() {
	var notationHtml = "";

	this.moves.forEach(function(move) {
		notationHtml += this.buildSimplifiedNotationString(move) + "<br />";
	});

	return notationHtml;
};

Trifle.GameNotation.prototype.notationTextForUrl = function() {
	var str = JSON.stringify(this.moves);
	return str;
};

Trifle.GameNotation.prototype.getNotationForEmail = function() {
	var notationHtml = "";

	this.moves.forEach((move) => {
		notationHtml += this.buildSimplifiedNotationString(move) + "[BR]";
	});

	return notationHtml;
};

Trifle.GameNotation.prototype.getLastMoveText = function() {
	return this.moves[this.moves.length - 1].fullMoveText;
};

Trifle.GameNotation.prototype.getLastMoveNumber = function() {
	return this.moves[this.moves.length - 1].moveNum;
};

Trifle.GameNotation.prototype.lastMoveHasDrawOffer = function() {
	return this.moves[this.moves.length - 1] 
		&& this.moves[this.moves.length - 1].offerDraw;
};



