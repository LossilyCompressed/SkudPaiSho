// Key Pai Sho Game Manager

KeyPaiSho.GameManager = function (actuator, ignoreActuate, isCopy) {
    this.gameLogText = '';
    this.isCopy = isCopy;

    this.actuator = actuator;

    this.tileManager = new KeyPaiSho.TileManager();
    this.markingManager = new PaiShoMarkingManager();

    this.setup(ignoreActuate);
    this.endGameWinners = [];
}

// Set up the game
KeyPaiSho.GameManager.prototype.setup = function (ignoreActuate) {
    this.board = new KeyPaiSho.Board();

    this.board.setHarmonyMinima(4);	// Default value

    this.centerGateActive = false;

    // Update the actuator
    if (!ignoreActuate) {
        this.actuate();
    }
};

// Sends the updated board to the actuator
KeyPaiSho.GameManager.prototype.actuate = function (moveToAnimate, moveAnimationBeginStep, hideCenterPointTile) {
    if (this.isCopy) {
        return;
    }
    this.actuator.actuate(this.board, this.tileManager, this.markingManager, moveToAnimate, moveAnimationBeginStep, hideCenterPointTile);
    setGameLogText(this.gameLogText);
};

KeyPaiSho.GameManager.prototype.runNotationMove = function (move, withActuate, moveAnimationBeginStep) {
    debug("Running Move(" + (withActuate ? "" : "Not ") + "Actuated): " + move.fullMoveText);

    if (this.centerGateActive && move.player === this.board.getBoardPoint(8, 8).tile.ownerName) {
        this.centerGateActive = false;
    }

    if (move.moveNum === 0 && move.accentTiles) {
        var self = this;
        var allSpecialCodes = [
            KeyPaiSho.TileCodes.Stone,
            KeyPaiSho.TileCodes.Wheel,
            KeyPaiSho.TileCodes.Knotweed,
            KeyPaiSho.TileCodes.Boat,
            KeyPaiSho.TileCodes.Dragon,
            KeyPaiSho.TileCodes.Koi,
            KeyPaiSho.TileCodes.Badgermole,
            KeyPaiSho.TileCodes.SkyBison,
            KeyPaiSho.TileCodes.Lotus,
            KeyPaiSho.TileCodes.Orchid,
            KeyPaiSho.TileCodes.Dahlia,
            KeyPaiSho.TileCodes.FireLily
        ];
        move.accentTiles.forEach(function (tileCode) {
            var i = allSpecialCodes.indexOf(tileCode);
            if (i >= 0) {
                allSpecialCodes.splice(i, 1);
            }
        });
        allSpecialCodes.forEach(function (tileCode) {
            self.tileManager.grabTile(move.player, tileCode);
        });
        self.tileManager.unselectTiles(move.player);

        this.buildChooseAccentTileGameLogText(move);
    } else if (move.moveNum === 1) {
        this.tileManager.unselectTiles(GUEST);
        this.tileManager.unselectTiles(HOST);
    }

    if (move.moveType === PLANTING) {
        // // Check if valid plant
        if (!this.board.pointIsOpenGate(move.endPoint)
            && !this.board.pointIsOpenCenterGate(move.endPoint)) {
            // invalid
            debug("Key Pai Sho Invalid planting point: " + move.endPoint.pointText);
            errorFound = true;
            return false;
        }
        // Just placing tile on board
        var tile = this.tileManager.grabTile(move.player, move.playedTile);
        var placeTileResults = this.board.placeTile(tile, move.endPoint);

        if (placeTileResults.openGardenGate) {
            this.centerGateActive = true;
        }

        this.buildPlantingGameLogText(move, tile);
    } else if (move.moveType === PLACING) {
        var tile = this.tileManager.grabTile(move.player, move.playedTile);
        this.board.placeTile(tile, move.endPoint, move.extraStonePlacementPoint);
    } else if (move.moveType === MOVING) {
        moveResults = this.board.moveTile(move.player, move.startPoint, move.endPoint);
        move.capturedTile = moveResults.capturedTile;
        this.buildMovingGameLogText(move, moveResults);
    }

    if (withActuate) {
        this.actuate(move, moveAnimationBeginStep);
    }
};

KeyPaiSho.GameManager.prototype.buildChooseAccentTileGameLogText = function (move) {
    this.gameLogText = move.moveNum + move.playerCode + '. '
        + move.player + ' chose Accent Tiles ' + move.accentTiles;
};

KeyPaiSho.GameManager.prototype.buildPlantingGameLogText = function (move, tile) {
    this.gameLogText = move.moveNum + move.playerCode + '. '
        + move.player + ' Planted ' + tile.getName() + ' at ' + move.endPoint.pointText;
};

KeyPaiSho.GameManager.prototype.buildMovingGameLogText = function (move, moveResults) {
    if (!moveResults) {
        return "Invalid Move :(";
    }
    this.gameLogText = move.moveNum + move.playerCode + '. '
        + move.player + ' moved ' + moveResults.movedTile.getName() + ' ' + move.moveTextOnly;
    if (moveResults.capturedTile) {
        this.gameLogText += ' to capture ' + getOpponentName(move.player) + '\'s ' + moveResults.capturedTile.getName();
    }
    if (moveResults.bonusAllowed && move.hasHarmonyBonus()) {
        this.gameLogText += ' and used ' + KeyPaiSho.Tile.getTileName(move.bonusTileCode) + ' on Harmony Bonus';
    }
};

KeyPaiSho.GameManager.prototype.revealPossibleMovePoints = function (player, boardPoint, tileNum, ignoreActuate) {
    if (!boardPoint.hasTile()) {
        return;
    }

    var hideCenterPointTile = false;

    if (!this.playerMustMoveCenterLotus(player) || (boardPoint.row === 8 && boardPoint.col === 8)) {
        if (boardPoint.row === 8 && boardPoint.col === 8
            && boardPoint.isType(GATE)) {
            hideCenterPointTile = true;
        }

        this.board.setPossibleMovePoints(boardPoint, tileNum);
    }

    if (!ignoreActuate) {
        this.actuate(null, null, hideCenterPointTile);
    }
};

KeyPaiSho.GameManager.prototype.playerMustMoveCenterLotus = function (player) {
    return this.board.playerHasCenterPointGate(player);
};

KeyPaiSho.GameManager.prototype.hidePossibleMovePoints = function (ignoreActuate, moveToAnimate) {
    this.board.removePossibleMovePoints();

    if (this.centerGateActive) {
        var centerTile = this.board.getBoardPoint(8, 8).removeTile();
        this.board.openTheGardenGate();
        this.board.getBoardPoint(8, 8).putTile(centerTile);
    }

    if (!ignoreActuate) {
        this.actuate(moveToAnimate);
    }
};

KeyPaiSho.GameManager.prototype.revealPossiblePlacementPoints = function (player, tile, additionalPoints, ignoreActuate) {
    if (tile === KeyPaiSho.TileCodes.Stone) {
        this.board.revealPossibleAccentPlacementPoints(player, tile);
    } else if (tile.type !== ACCENT_TILE) {
        this.board.setOpenGatePossibleMoves();

        if (tile.code === KeyPaiSho.TileCodes.Lotus && this.board.playerControlsLessThanTwoGates(player)) {
            this.board.setCenterPointGatePossibleMove();
        } else {
            this.board.ensureCenterPointGateNotPossibleMove();
        }
    } else {
        this.board.revealPossibleAccentPlacementPoints(player);
    }

    if (additionalPoints) {
        additionalPoints.forEach((notationPoint) => {
            this.board.setPossiblePlacementPoint(notationPoint);
        });
    }

    if (!ignoreActuate) {
        this.actuate();
    }
};

KeyPaiSho.GameManager.prototype.revealPossibleAccentTiles = function (exceptAccentTileIds, mainActionUsed, player, ignoreActuate) {
    this.board.forEachBoardPointWithTile((boardPoint) => {
        if (boardPoint.tile.ownerName === player && !exceptAccentTileIds.includes(boardPoint.tile.id)) {
            if (boardPoint.tile.code === KeyPaiSho.TileCodes.Wheel || boardPoint.tile.code === KeyPaiSho.TileCodes.Koi
                || (boardPoint.tile.code === KeyPaiSho.TileCodes.Boat && !mainActionUsed)) {
                boardPoint.addType(POSSIBLE_MOVE);
            }
        }
    });

    if (!ignoreActuate) {
        this.actuate();
    }
};

KeyPaiSho.GameManager.prototype.revealPossibleAccentMoves = function (accentPoint, firstTargetPoint) {
    if (accentPoint.tile.code === KeyPaiSho.TileCodes.Boat) {
        this.board.setPossibleMovePoints(accentPoint);
    } else if (accentPoint.tile.code === KeyPaiSho.TileCodes.Koi) {
        var possibleTargetCheck = function (boardPoint) {
            if (boardPoint.hasTile() && boardPoint.tile.code !== KeyPaiSho.TileCodes.Badgermole) {
                boardPoint.addType(POSSIBLE_MOVE);
            }
        };

        if (firstTargetPoint) {
            rowDiff = firstTargetPoint.row - accentPoint.row;
            colDiff = firstTargetPoint.col - accentPoint.col;
            rowChange = rowDiff === 0 ? 0 : rowDiff > 0 ? -1 : 1;
            colChange = colDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
            this.board.forEachBoardPointInDirection(accentPoint, rowChange, colChange, possibleTargetCheck);
        } else {
            this.board.forEachBoardPointInDirection(accentPoint, 0, 1, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, 0, -1, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, 1, 1, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, 1, -1, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, -1, 1, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, -1, -1, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, -1, 0, possibleTargetCheck);
            this.board.forEachBoardPointInDirection(accentPoint, 1, 0, possibleTargetCheck);
        }
    }
};

KeyPaiSho.GameManager.prototype.activateAccentTile = function (accentPoint, firstTargetPoint, secondTargetPoint) {
    if (firstTargetPoint) {  // The boat and the koi have one target point
        if (secondTargetPoint) { // Only the koi has 2 target points, swap the tiles
            moveTile = secondTargetPoint.tile;
            secondTargetPoint.tile = firstTargetPoint.tile;
            firstTargetPoint.tile = moveTile;
        } else {    //Only the boat has a single target point, move all of the surrounding tiles
            rowChange = firstTargetPoint.row - accentPoint.row;
            colChange = firstTargetPoint.col - accentPoint.col;
            this.board.getSurroundingRowAndCols(accentPoint).forEach((rowAndCol) => {
                initialPoint = this.board.getBoardPoint(rowAndCol.row, rowAndCol.col);
                targetPoint = this.board.getBoardPoint(rowAndCol.row + rowChange, rowAndCol.col + colChange);
                if (initialPoint.hasTile()) {
                    targetPoint.tile = initialPoint.removeTile();
                }
            });

            firstTargetPoint.tile = accentPoint.removeTile();
        }
    } else {    // Only the wheel has no target points
        var rowCols = this.board.getSurroundingRowAndCols(accentPoint);
        var results = [];
        for (var i = 0; i < rowCols.length; i++) {
            // Save tile and target rowAndCol
            var tile = this.board.cells[rowCols[i].row][rowCols[i].col].removeTile();
            var targetRowCol = this.board.getClockwiseRowCol(accentPoint, rowCols[i]);
            if (this.board.isValidRowCol(targetRowCol)) {
                results.push([tile, targetRowCol]);
            }
        }

        // go through and place tiles in target points
        var self = this;
        results.forEach(function (result) {
            var bp = self.board.cells[result[1].row][result[1].col];
            bp.putTile(result[0]);
        });
    }
};

KeyPaiSho.GameManager.prototype.aPlayerIsOutOfBasicFlowerTiles = function () {
    return this.tileManager.aPlayerIsOutOfBasicFlowerTiles();
};

KeyPaiSho.GameManager.prototype.playerHasNotPlayedEitherSpecialTile = function (playerName) {
    return this.tileManager.playerHasBothSpecialTilesRemaining(playerName);
};

KeyPaiSho.GameManager.prototype.getWinner = function () {
    if (this.board.winners.length === 1) {
        return this.board.winners[0];
    } else if (this.board.winners.length > 1) {
        return "BOTH players";
    } else if (this.endGameWinners.length === 1) {
        return this.endGameWinners[0];
    } else if (this.endGameWinners.length > 1 || this.board.winners.length > 1) {
        return "BOTH players";
    }
};

KeyPaiSho.GameManager.prototype.getWinReason = function () {
    if (this.board.winners.length === 1) {
        return " created a Harmony Ring and won the game!";
    } else if (this.endGameWinners.length === 1) {
        return " won the game with the most Harmonies crossing the midlines.";
    } else if (this.board.winners.length === 2) {
        return " formed Harmony Rings for a tie!";
    } else if (this.endGameWinners.length === 2) {
        return " had the same number of Harmonies crossing the midlines for a tie!";	// Should there be any other tie breaker?
    }
};

KeyPaiSho.GameManager.prototype.getWinResultTypeCode = function () {
    if (this.board.winners.length === 1) {
        return 1;	// Harmony Ring is 1
    } else if (this.endGameWinners.length === 1) {
        return 3;	// Most Harmonies crossing midline
    } else if (this.endGameWinners.length > 1 || this.board.winners.length > 1) {
        return 4;	// Tie
    }
};

KeyPaiSho.GameManager.prototype.getCopy = function () {
    var copyGame = new KeyPaiSho.GameManager(this.actuator, true, true);
    copyGame.board = this.board.getCopy();
    copyGame.tileManager = this.tileManager.getCopy();
    return copyGame;
};
