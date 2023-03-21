/* Key Pai Sho specific UI interaction logic */

function KeyPaiSho() { }

KeyPaiSho.Controller = function (gameContainer, isMobile) {
    /* Default game option until Effect Tiles are implemented */
    //addOption(NO_EFFECT_TILES);
    /* --- */
    new KeyPaiSho.Options();	// Initialize
    this.actuator = new KeyPaiSho.Actuator(gameContainer, isMobile, isAnimationsOn());

    this.resetGameManager();
    this.turnBuilder = new KeyPaiSho.TurnBuilder(GUEST, this.theGame, playingOnlineGame());
    document.getElementById('endTurnButton').onclick = () => {
        this.turnBuilder.endTurn();
        KeyPaiSho.Controller.hideEndTurnButton();
    };

    document.getElementById('useAccentButton').onclick = () => {
        this.turnBuilder.addToAction({ usingAccentTile: true });
        this.callActuate();
    };

    this.hostAccentTiles = [];
    this.guestAccentTiles = [];

    this.isPaiShoGame = true;
    this.supportsMoveLogMessages = true;
}

KeyPaiSho.Controller.hideHarmonyAidsKey = "HideHarmonyAids";

KeyPaiSho.Controller.prototype.completeSetup = function () {
    /* Nothing to do */
};

KeyPaiSho.Controller.prototype.getGameTypeId = function () {
    return GameType.KeyPaiSho.id;
};

KeyPaiSho.Controller.prototype.resetGameManager = function () {
    this.theGame = new KeyPaiSho.GameManager(this.actuator);
};

KeyPaiSho.Controller.prototype.resetNotationBuilder = function () {
    this.notationBuilder = new KeyPaiSho.NotationBuilder();
};

KeyPaiSho.Controller.prototype.resetGameNotation = function () {
    this.gameNotation = this.getNewGameNotation();
};

KeyPaiSho.Controller.prototype.getNewGameNotation = function () {
    return new KeyPaiSho.GameNotation();
};

KeyPaiSho.Controller.getHostTilesContainerDivs = function () {
    var divs = ' \
        <button id="useAccentButton" style="width:91%; box-shadow: 0px 0px 4px 1px var(--color); margin-bottom:10%;"> \
            Activate Accent Tile \
        </button> \
            <div class="H' + KeyPaiSho.TileCodes.Red3 + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.White3 + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.RedO + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.WhiteO + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.RedD + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.WhiteD + '"></div> \
        <br class="clear" /> \
            <div class="H' + KeyPaiSho.TileCodes.Stone + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Wheel + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Knotweed + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Boat + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Lotus + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Orchid + '"></div> \
        <br class="clear" /> \
            <div class="H' + KeyPaiSho.TileCodes.Badgermole + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Dragon + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Koi + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.SkyBison + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.Dahlia + '"></div> \
            <div class="H' + KeyPaiSho.TileCodes.FireLily + '"></div> \
    ';
    return divs;
};

KeyPaiSho.Controller.getGuestTilesContainerDivs = function () {
    var divs = ' \
            <div class="G' + KeyPaiSho.TileCodes.Red3 + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.White3 + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.RedO + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.WhiteO + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.RedD + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.WhiteD + '"></div> \
        <br class="clear" /> \
            <div class="G' + KeyPaiSho.TileCodes.Stone + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Wheel + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Knotweed + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Boat + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Lotus + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Orchid + '"></div> \
        <br class="clear" /> \
            <div class="G' + KeyPaiSho.TileCodes.Badgermole + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Dragon + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Koi + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.SkyBison + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.Dahlia + '"></div> \
            <div class="G' + KeyPaiSho.TileCodes.FireLily + '"></div> \
        <button id="endTurnButton" class="gone" style="width:91%; box-shadow: 0px 0px 4px 1px var(--color); margin-top:10%;"> \
            End Turn \
        </button> \
    ';
    return divs;
};

KeyPaiSho.Controller.showEndTurnButton = function () {
    document.getElementById('endTurnButton').classList.remove('gone');
};

KeyPaiSho.Controller.hideEndTurnButton = function () {
    document.getElementById('endTurnButton').classList.add('gone');
};

KeyPaiSho.Controller.showUseAccentButton = function () {
    document.getElementById('useAccentButton').classList.remove('gone');
};

KeyPaiSho.Controller.hideUseAccentButton = function () {
    document.getElementById('useAccentButton').classList.add('gone');
};

KeyPaiSho.Controller.prototype.callActuate = function () {
    this.theGame.actuate();
};

KeyPaiSho.Controller.prototype.resetMove = function () {
    if (this.notationBuilder.status === BRAND_NEW) {
        // Remove last move
        this.gameNotation.removeLastMove();
        if (this.gameNotation.moves.length === 3) {
            this.gameNotation.removeLastMove();	// Special case for automatic Host first move
        }
    } else if (this.notationBuilder.status === READY_FOR_BONUS) {
        // Just rerun
    }

    if (this.gameNotation.moves.length <= 1) {
        // Choosing Accent Tiles
        if (getCurrentPlayer() === GUEST) {
            this.guestAccentTiles = [];
        } else if (getCurrentPlayer() === HOST) {
            this.hostAccentTiles = [];
        }
    }
};

KeyPaiSho.Controller.prototype.getDefaultHelpMessageText = function () {
    return "<h4>Key Pai Sho</h4>"
        + "<p>This game is still being programmed, but can be played with the tiles currently available. Effect Tiles will be added periodically until the complete set is available. Thank you.</p>"
        + "<p>Key Pai Sho is a game of harmony and skill. The aim is to form an unbroken chain of harmonies around the center of the board. Harmonies follow 4 important Rules:</p>"
        + "<ul>"
        + "<li>Formed if one Player's Key Flower can move to another of their Flowers' squares.</li>"
        + "<li>Blocked by opposing Flower Tiles.</li>"
        + "<li>Need at least one space in between the Flowers.</li>"
        + "<li>Cannot form between Flowers of the same type.</li>"
        + "</ul>"
        + "<p>During a turn a player can either Plant a Flower in a Gate or Move one of their Tiles. A player can have up to 2 Planted Flowers at once.</p>";
};

KeyPaiSho.Controller.prototype.getAdditionalMessage = function () {
    var msg = "";

    if (this.turnBuilder.moves.length === 0) {
        if (onlinePlayEnabled && gameId < 0 && userIsLoggedIn()) {
            msg += "Click <em>Join Game</em> above to join another player's game. Or, you can start a game that other players can join by making the first move. <br />";
        } else {
            msg += "Select 6 Effect Tiles to play with.";
        }

        if (!playingOnlineGame()) {
            msg += getGameOptionsMessageHtml(GameType.KeyPaiSho.gameOptions);
        }
    }

    if (this.theGame.playerMustMoveCenterLotus(this.getCurrentPlayer())) {
        msg += "<br />Lotus must move out of the center Gate.<br />";
    }

    return msg;
};

KeyPaiSho.Controller.prototype.unplayedTileClicked = function (tileDiv) {
    if (this.theGame.getWinner()) {
        return;
    }
    if (!myTurn()) {
        return;
    }
    /*
    if (currentMoveIndex !== this.turnBuilder.moves.length) {
        debug("Can only interact if all moves are played.");
        return;
    }
    */

    var tile = this.theGame.tileManager.peekTile(this.getCurrentPlayer(), null, parseInt(tileDiv.getAttribute("id")));
    var addResult = this.turnBuilder.addToAction({ tile: tile });
    if (addResult === KeyPaiSho.TurnReturnStatus.ACTION_DONE) {
        this.turnBuilder.endAction();
        KeyPaiSho.Controller.showEndTurnButton();
    }
    this.callActuate();
};


KeyPaiSho.Controller.prototype.RmbDown = function (htmlPoint) {
    var npText = htmlPoint.getAttribute("name");

    var notationPoint = new NotationPoint(npText);
    var rowCol = notationPoint.rowAndColumn;
    this.mouseStartPoint = this.theGame.board.cells[rowCol.row][rowCol.col];
}

KeyPaiSho.Controller.prototype.RmbUp = function (htmlPoint) {
    var npText = htmlPoint.getAttribute("name");

    var notationPoint = new NotationPoint(npText);
    var rowCol = notationPoint.rowAndColumn;
    var mouseEndPoint = this.theGame.board.cells[rowCol.row][rowCol.col];

    if (mouseEndPoint == this.mouseStartPoint) {
        this.theGame.markingManager.toggleMarkedPoint(mouseEndPoint);
    }
    else if (this.mouseStartPoint) {
        this.theGame.markingManager.toggleMarkedArrow(this.mouseStartPoint, mouseEndPoint);
    }
    this.mouseStartPoint = null;

    this.callActuate();
}

KeyPaiSho.Controller.prototype.pointClicked = function (htmlPoint) {
    if (this.theGame.getWinner()) {
        return;
    }
    if (!myTurn()) {
        return;
    }
    /*
    if (currentMoveIndex !== this.turnBuilder.moves.length) {
        debug("Can only interact if all moves are played.");
        return;
    }
    */

    var point = new NotationPoint(htmlPoint.getAttribute("name"));
    var boardPoint = this.theGame.board.getBoardPoint(point.rowAndColumn.row, point.rowAndColumn.col);
    var addResult = this.turnBuilder.addToAction({ position: boardPoint });
    if (addResult === KeyPaiSho.TurnReturnStatus.ACTION_DONE) {
        this.turnBuilder.endAction();
        KeyPaiSho.Controller.showEndTurnButton();
    }
    this.callActuate();
};

KeyPaiSho.Controller.prototype.getTileMessage = function (tileDiv) {
    var divName = tileDiv.getAttribute("name");	// Like: GWD or HL
    var tile = new KeyPaiSho.Tile(divName.substring(1), divName.charAt(0));
    var tileMessage = this.getHelpMessageForTile(tile);

    return {
        heading: tileMessage.heading,
        message: tileMessage.message
    }
};

KeyPaiSho.Controller.prototype.getPointMessage = function (htmlPoint) {
    var npText = htmlPoint.getAttribute("name");

    var notationPoint = new NotationPoint(npText);
    var rowCol = notationPoint.rowAndColumn;
    var boardPoint = this.theGame.board.cells[rowCol.row][rowCol.col];

    var heading;
    var message = [];

    if (boardPoint.isType(NEUTRAL)) {
        message.push(this.getNeutralSpaceMessage());
    } else if (boardPoint.isType(RED)) {
        message.push(this.getRedSpaceMessage());
    } else if (boardPoint.isType(WHITE)) {
        message.push(this.getWhiteSpaceMessage());
    } else if (boardPoint.isType(GATE)) {
        message.push(this.getGatePointMessage());
    }

    return {
        heading: heading,
        message: message
    }
};

KeyPaiSho.Controller.prototype.getNeutralSpaceMessage = function () {
    var msg = "<h4>Neutral Square</h4>";
    return msg;
};

KeyPaiSho.Controller.prototype.getRedSpaceMessage = function () {
    var msg = "<h4>Red Square</h4>";
    return msg;
};

KeyPaiSho.Controller.prototype.getWhiteSpaceMessage = function () {
    var msg = "<h4>White Square</h4>";
    return msg;
};

KeyPaiSho.Controller.prototype.getGatePointMessage = function () {
    var msg = "<h4>Gate</h4>";
    return msg;
};

KeyPaiSho.Controller.prototype.getHelpMessageForTile = function (tile) {
    var message = [];

    var tileCode = tile.code;

    var heading = KeyPaiSho.Tile.getTileName(tileCode);

    message.push(tile.ownerName + "'s tile");

    if (tile.type === BASIC_FLOWER) {
        var colorCode = tileCode.charAt(0);

        var noLandInColor = "Dark";
        if (colorCode === "R") {
            noLandInColor = "Light";
        }

        message.push("Key Flower Tile");
        message.push("Cannot enter fully " + noLandInColor + " Garden Squares");
        message.push("Cannot Move over other Tiles");
        message.push("Can Move and Harmonize up to " + tile.getMoveDistance() + " spaces " + tile.getMovementDirectionWording());
    }

    return {
        heading: heading,
        message: message
    }
};

KeyPaiSho.Controller.prototype.playAiTurn = function (finalizeMove) {
    if (this.theGame.getWinner()) {
        return;
    }
    var theAi = activeAi;
    if (activeAi2) {
        if (activeAi2.player === getCurrentPlayer()) {
            theAi = activeAi2;
        }
    }

    var playerMoveNum = this.gameNotation.getPlayerMoveNum();

    if (playerMoveNum === 1 && getCurrentPlayer() === HOST) {
        // Auto mirror guest move
        // Host auto-copies Guest's first Plant
        var hostMoveBuilder = this.notationBuilder.getFirstMoveForHost(this.gameNotation.moves[this.gameNotation.moves.length - 1].playedTile);
        this.gameNotation.addMove(this.gameNotation.getNotationMoveFromBuilder(hostMoveBuilder));
        finalizeMove();
    } else if (playerMoveNum < 3) {
        var move = theAi.getMove(this.theGame.getCopy(), playerMoveNum);
        if (!move) {
            debug("No move given...");
            return;
        }
        this.gameNotation.addMove(move);
        finalizeMove();
    } else {
        var self = this;
        setTimeout(function () {
            var move = theAi.getMove(self.theGame.getCopy(), playerMoveNum);
            if (!move) {
                debug("No move given...");
                return;
            }
            self.gameNotation.addMove(move);
            finalizeMove();
        }, 10);
    }
};

KeyPaiSho.Controller.prototype.startAiGame = function (finalizeMove) {
    this.playAiTurn(finalizeMove);
    if (this.gameNotation.getPlayerMoveNum() === 1) {
        this.playAiTurn(finalizeMove);
    }
    if (this.gameNotation.getPlayerMoveNum() === 1) {
        // Host auto-copies Guest's first Plant
        var hostMoveBuilder = this.notationBuilder.getFirstMoveForHost(this.gameNotation.moves[this.gameNotation.moves.length - 1].playedTile);
        this.gameNotation.addMove(this.gameNotation.getNotationMoveFromBuilder(hostMoveBuilder));
        finalizeMove();
    }
    if (this.gameNotation.getPlayerMoveNum() === 2 && getCurrentPlayer() === GUEST) {
        this.playAiTurn(finalizeMove);
    }
};

KeyPaiSho.Controller.prototype.getAiList = function () {
    return [];
};

KeyPaiSho.Controller.prototype.getCurrentPlayer = function () {
    return this.turnBuilder.currentMove.player;
};

KeyPaiSho.Controller.prototype.cleanup = function () {
    // Nothing.
};

KeyPaiSho.Controller.prototype.isSolitaire = function () {
    return false;
};

KeyPaiSho.Controller.prototype.setGameNotation = function (newGameNotation) {
    this.gameNotation.setNotationText(newGameNotation);
};

KeyPaiSho.Controller.prototype.getAdditionalHelpTabDiv = function () {
    var settingsDiv = document.createElement("div");
    return settingsDiv;
};

KeyPaiSho.Controller.prototype.buildToggleHarmonyAidsDiv = function () {
    var div = document.createElement("div");
    var onOrOff = getUserGamePreference(KeyPaiSho.Controller.hideHarmonyAidsKey) !== "true" ? "on" : "off";
    div.innerHTML = "Harmony aids are " + onOrOff + ": <span class='skipBonus' onclick='gameController.toggleHarmonyAids();'>toggle</span>";
    if (gameOptionEnabled(NO_HARMONY_VISUAL_AIDS)) {
        div.innerHTML += " (Will not affect games with " + NO_HARMONY_VISUAL_AIDS + " game option)";
    }
    return div;
};

KeyPaiSho.Controller.prototype.toggleHarmonyAids = function () {
    setUserGamePreference(KeyPaiSho.Controller.hideHarmonyAidsKey,
        getUserGamePreference(KeyPaiSho.Controller.hideHarmonyAidsKey) !== "true");
    clearMessage();
    this.callActuate();
};

KeyPaiSho.Controller.prototype.setAnimationsOn = function (isAnimationsOn) {
    this.actuator.setAnimationOn(isAnimationsOn);
};

KeyPaiSho.Controller.isUsingCustomTileDesigns = function () {
    return localStorage.getItem(KeyPaiSho.Options.tileDesignTypeKey) === "custom";
};
