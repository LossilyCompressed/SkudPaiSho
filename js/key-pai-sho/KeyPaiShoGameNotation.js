/* Key Pai Sho Notation */

KeyPaiSho.NotationMove = function (text) {
    this.fullMoveText = text;
    this.analyzeMove();
}

KeyPaiSho.NotationMove.prototype.analyzeMove = function () {
    this.valid = true;

    // Get move number
    var parts = this.fullMoveText.split(".");

    var moveNumAndPlayer = parts[0];

    this.moveNum = parseInt(moveNumAndPlayer.slice(0, -1));
    this.playerCode = moveNumAndPlayer.charAt(moveNumAndPlayer.length - 1);

    // Get player (Guest or Host)
    if (this.playerCode === 'G') {
        this.player = GUEST;
    } else if (this.playerCode === 'H') {
        this.player = HOST;
    }

    var moveText = parts[1];
    this.moveTextOnly = moveText;

    // If no move text, ignore and move on to next
    if (!moveText) {
        return;
    }

    if (!gameOptionEnabled(NO_EFFECT_TILES) && this.moveNum === 0) {
        // Keep the accent tiles listed in move
        // Examples: 0H.R,R,B,K ; 0G.B,W,K,K ;
        this.accentTiles = moveText.split(',');
        return;
    }

    /* Set Move Type */
    var char0 = moveText.charAt(0);
    if (char0 === '(') {
        // Arranging move stuff
        this.moveType = MOVING;
        // Get the two points from string like: (-8,0)-(-6,3)
        var parts = moveText.substring(moveText.indexOf('(') + 1).split(')-(');
        this.startPoint = new NotationPoint(parts[0]);
        this.endPoint = new NotationPoint(parts[1].substring(0, parts[1].indexOf(')')));
    } else {
        // Playing move stuff
        this.playedTile = moveText.substring(0, moveText.indexOf('('));
        this.moveType = new KeyPaiSho.Tile(this.playedTile, 'H').type === ACCENT_TILE ? PLACING : PLANTING;
        if (moveText.endsWith(')')) {
            this.endPoint = new NotationPoint(moveText.substring(moveText.indexOf('(') + 1, moveText.indexOf(')')));
        } else {
            this.valid = false;
        }
    }
};

KeyPaiSho.NotationMove.prototype.isValidNotation = function () {
    return this.valid;
};

KeyPaiSho.NotationMove.prototype.equals = function (otherMove) {
    return this.fullMoveText === otherMove.fullMoveText;
};



// --------------------------------------- //

KeyPaiSho.NotationBuilder = function () {
    // this.moveNum;	// Let's try making this magic
    // this.player;		// Magic
    this.moveType;

    // PLANTING AND PLACING
    this.playedTile;
    this.endPoint;

    // ARRANGING
    this.startPoint;
    //this.endPoint; // Also used in Planting
    this.bonusTileCode;
    this.bonusEndPoint;
    this.boatBonusPoint;

    this.status = BRAND_NEW;
}

KeyPaiSho.NotationBuilder.prototype.getNotationMove = function (moveNum, player) {
    var notationLine = moveNum + player.charAt(0) + ".";
    if (this.moveType === MOVING) {
        notationLine += "(" + this.startPoint.pointText + ")-(" + this.endPoint.pointText + ")";
    } else {
        notationLine += this.playedTile + "(" + this.endPoint.pointText + ")";
    }

    return new KeyPaiSho.NotationMove(notationLine);
};

// --------------------------------------- //



KeyPaiSho.GameNotation = function () {
    this.notationText = "";
    this.moves = [];
}

KeyPaiSho.GameNotation.prototype.setNotationText = function (text) {
    this.notationText = text;
    this.loadMoves();
};

KeyPaiSho.GameNotation.prototype.addNotationLine = function (text) {
    this.notationText += ";" + text.trim();
    this.loadMoves();
};

KeyPaiSho.GameNotation.prototype.addMove = function (move) {
    if (this.notationText) {
        this.notationText += ";" + move.fullMoveText;
    } else {
        this.notationText = move.fullMoveText;
    }
    this.loadMoves();
};

KeyPaiSho.GameNotation.prototype.removeLastMove = function () {
    this.notationText = this.notationText.substring(0, this.notationText.lastIndexOf(";"));
    this.loadMoves();
};

KeyPaiSho.GameNotation.prototype.getPlayerMoveNum = function () {
    var moveNum = 0;
    var lastMove = this.moves[this.moves.length - 1];

    if (lastMove) {
        moveNum = lastMove.moveNum;
        // At game beginning:
        if (!gameOptionEnabled(NO_EFFECT_TILES)) {
            if (lastMove.moveNum === 0 && lastMove.player === HOST) {
                player = GUEST;
            } else if (lastMove.moveNum === 0 && lastMove.player === GUEST) {
                moveNum++;
                player = GUEST;
            }
        } else if (lastMove.player === HOST) {	// Usual
            moveNum++;
        } else {
            player = HOST;
        }
    }
    return moveNum;
};

KeyPaiSho.GameNotation.prototype.getNotationMoveFromBuilder = function (builder) {
    // Example simple Arranging move: 7G.(8,0)-(7,1)
    var moveNum = 0;
    var player = HOST;
    var lastMove = this.moves[this.moves.length - 1];

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

KeyPaiSho.GameNotation.prototype.loadMoves = function () {
    this.moves = [];
    var lines = [];
    if (this.notationText) {
        if (this.notationText.includes(';')) {
            lines = this.notationText.split(";");
        } else {
            lines = [this.notationText];
        }
    }

    var self = this;
    var lastPlayer = GUEST;
    lines.forEach(function (line) {
        var move = new KeyPaiSho.NotationMove(line);
        if (move.isValidNotation() && move.player !== lastPlayer) {
            self.moves.push(move);
            lastPlayer = move.player;
        } else {
            debug("the player check is broken?");
        }
    });
};

KeyPaiSho.GameNotation.prototype.getNotationHtml = function () {
    var lines = [];
    if (this.notationText) {
        if (this.notationText.includes(';')) {
            lines = this.notationText.split(";");
        } else {
            lines = [this.notationText];
        }
    }

    var notationHtml = "";

    lines.forEach(function (line) {
        notationHtml += line + "<br />";
    });

    return notationHtml;
};

KeyPaiSho.GameNotation.prototype.getNotationForEmail = function () {
    var lines = [];
    if (this.notationText) {
        if (this.notationText.includes(';')) {
            lines = this.notationText.split(";");
        } else {
            lines = [this.notationText];
        }
    }

    var notationHtml = "";

    lines.forEach(function (line) {
        notationHtml += line + "[BR]";
    });

    return notationHtml;
};

KeyPaiSho.GameNotation.prototype.notationTextForUrl = function () {
    var str = this.notationText;
    return str;
};

KeyPaiSho.GameNotation.prototype.getLastMoveText = function () {
    return this.moves[this.moves.length - 1].fullMoveText;
};

KeyPaiSho.GameNotation.prototype.getLastMoveNumber = function () {
    return this.moves[this.moves.length - 1].moveNum;
};


