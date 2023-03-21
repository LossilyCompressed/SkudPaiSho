/* Skud Pai Sho Board */

KeyPaiSho.Board = function () {
    this.size = new RowAndColumn(18, 18);
    this.cells = this.brandNew();

    this.harmonyManager = new KeyPaiSho.HarmonyManager();

    this.playedWhiteLotusTiles = [];
    this.winners = [];
};

KeyPaiSho.Board.prototype.setHarmonyMinima = function (harmonyMinima) {
    this.harmonyManager.setHarmonyMinima(harmonyMinima);
};

KeyPaiSho.Board.prototype.brandNew = function () {
    var cells = [];

    cells[0] = this.newRow(6,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.gate(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[1] = this.newRow(10,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[2] = this.newRow(12,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[3] = this.newRow(14,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[4] = this.newRow(16,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[5] = this.newRow(16,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[6] = this.newRow(18,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[7] = this.newRow(18,
        [KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.nonPlayable()
        ]);

    cells[8] = this.newRow(18,
        [KeyPaiSho.BoardPoint.gate(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.gate(),
        KeyPaiSho.BoardPoint.nonPlayable()
        ]);

    cells[9] = this.newRow(18,
        [KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable()
        ]);

    cells[10] = this.newRow(18,
        [KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.nonPlayable()
        ]);

    cells[11] = this.newRow(18,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[12] = this.newRow(16,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[13] = this.newRow(16,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[14] = this.newRow(14,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.red(),
        KeyPaiSho.BoardPoint.white(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[15] = this.newRow(12,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.redNeutral(),
        KeyPaiSho.BoardPoint.whiteNeutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[16] = this.newRow(10,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.gate(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    cells[17] = this.newRow(6,
        [KeyPaiSho.BoardPoint.neutral(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.nonPlayable(),
        KeyPaiSho.BoardPoint.neutral()
        ]);

    for (var row = 0; row < cells.length; row++) {
        for (var col = 0; col < cells[row].length; col++) {
            cells[row][col].row = row;
            cells[row][col].col = col;
        }
    }

    return cells;
};

KeyPaiSho.Board.prototype.newRow = function (numColumns, points) {
    var cells = [];

    var numBlanksOnSides = (this.size.row - numColumns) / 2;

    var nonPoint = new KeyPaiSho.BoardPoint();
    nonPoint.addType(NON_PLAYABLE);

    for (var i = 0; i < this.size.row; i++) {
        if (i < numBlanksOnSides) {
            cells[i] = nonPoint;
        } else if (i < numBlanksOnSides + numColumns) {
            if (points) {
                cells[i] = points[i - numBlanksOnSides];
            } else {
                cells[i] = nonPoint;
            }
        } else {
            cells[i] = nonPoint;
        }
    }

    return cells;
};

KeyPaiSho.Board.prototype.forEachBoardPoint = function (forEachFunc) {
    this.cells.forEach(function (row) {
        row.forEach(function (boardPoint) {
            if (!boardPoint.isType(NON_PLAYABLE)) {
                forEachFunc(boardPoint);
            }
        });
    });
};

KeyPaiSho.Board.prototype.forEachBoardPointInDirection = function (sourcePoint, rowChange, colChange, forEachFunc) {
    var rowToCheck = sourcePoint.row + rowChange;
    var colToCheck = sourcePoint.col + colChange;

    var checkPoint = this.getBoardPoint(rowToCheck, colToCheck);

    while (this.isValidRowCol(checkPoint) && !checkPoint.isType(GATE)) {
        forEachFunc(checkPoint);
        rowToCheck += rowChange;
        colToCheck += colChange;
        checkPoint = this.getBoardPoint(rowToCheck, colToCheck);
    }
}

KeyPaiSho.Board.prototype.forEachBoardPointWithTile = function (forEachFunc) {
    this.forEachBoardPoint(function (boardPoint) {
        if (boardPoint.hasTile()) {
            forEachFunc(boardPoint);
        }
    });
};

KeyPaiSho.Board.prototype.placeTile = function (tile, notationPoint, extraPlacementPoint) {
    var returnValues = {};

    if (tile.type === ACCENT_TILE) {
        this.placeAccent(tile, notationPoint, extraPlacementPoint);
    } else {
        if (tile.code === KeyPaiSho.TileCodes.Lotus
            && notationPoint.rowAndColumn.row === 8
            && notationPoint.rowAndColumn.col === 8) {
            this.openTheGardenGate();
            returnValues.openGardenGate = true;
        }
        this.putTileOnPoint(tile, notationPoint);
    }
    // Things to do after a tile is placed
    this.flagAllTrappedAndDrainedTiles();
    this.analyzeHarmonies();

    return returnValues;
};

KeyPaiSho.Board.prototype.putTileOnPoint = function (tile, notationPoint) {
    var point = notationPoint.rowAndColumn;
    point = this.cells[point.row][point.col];

    point.putTile(tile);
};

KeyPaiSho.Board.prototype.canPlaceAccentTile = function (point, player, tileCode) {
    if (tileCode === KeyPaiSho.TileCodes.Stone) {
        return !point.hasTile() && !point.isType(GATE);
    }
    return point.tile && point.tile.ownerName === player && !point.isType(GATE) && point.tile.type !== ACCENT_TILE;
};

KeyPaiSho.Board.prototype.placeAccent = function (tile, notationPoint, extraPlacementPoint) {
    var rowAndCol = notationPoint.rowAndColumn;
    var boardPoint = this.cells[rowAndCol.row][rowAndCol.col];
    var previousTile;

    if (boardPoint.hasTile()) {
        previousTile = boardPoint.removeTile();
    }

    if (extraPlacementPoint) {
        var extraRowAndCol = extraPlacementPoint.rowAndColumn;
        boardPoint = this.cells[extraRowAndCol.row][extraRowAndCol.col];
    }

    boardPoint.putTile(tile);
    return previousTile;
};

KeyPaiSho.Board.prototype.getClockwiseRowCol = function (center, rowCol) {
    if (rowCol.row < center.row && rowCol.col <= center.col) {
        return new RowAndColumn(rowCol.row, rowCol.col + 1);
    } else if (rowCol.col > center.col && rowCol.row <= center.row) {
        return new RowAndColumn(rowCol.row + 1, rowCol.col);
    } else if (rowCol.row > center.row && rowCol.col >= center.col) {
        return new RowAndColumn(rowCol.row, rowCol.col - 1);
    } else if (rowCol.col < center.col && rowCol.row >= center.row) {
        return new RowAndColumn(rowCol.row - 1, rowCol.col);
    } else {
        debug("ERROR CLOCKWISE CALCULATING");
    }
}

KeyPaiSho.Board.prototype.getSurroundingRowAndCols = function (rowAndCol) {
    var rowAndCols = [];
    for (var row = rowAndCol.row - 1; row <= rowAndCol.row + 1; row++) {
        for (var col = rowAndCol.col - 1; col <= rowAndCol.col + 1; col++) {
            if ((row !== rowAndCol.row || col !== rowAndCol.col)	// Not the center given point
                && (row >= 0 && col >= 0) && (row < 17 && col < 17)) {	// Not outside range of the grid
                var boardPoint = this.cells[row][col];
                if (!boardPoint.isType(NON_PLAYABLE)) {	// Not non-playable
                    rowAndCols.push(new RowAndColumn(row, col));
                }
            }
        }
    }
    return rowAndCols;
};

KeyPaiSho.Board.prototype.pointIsOpenGate = function (notationPoint) {
    var point = notationPoint.rowAndColumn;
    point = this.cells[point.row][point.col];

    /* return point.isOpenGate() || this.pointIsOpenAndSurroundsPond(point); */
    return point.isOpenGate();
};

KeyPaiSho.Board.prototype.pointIsOpenCenterGate = function (notationPoint) {
    var point = notationPoint.rowAndColumn;
    var centerPoint = this.getBoardPoint(point.row, point.col);

    if (!centerPoint.hasTile() && centerPoint.row == 8 && centerPoint.col == 8) {
        var centerPoint2 = this.getBoardPoint(8, 9);
        var centerPoint3 = this.getBoardPoint(9, 8);
        var centerPoint4 = this.getBoardPoint(9, 9);

        return !centerPoint2.hasTile()
            && !centerPoint3.hasTile()
            && !centerPoint4.hasTile();
    }
    return false;
};

KeyPaiSho.Board.prototype.isValidRowCol = function (rowCol) {
    return rowCol && rowCol.row >= 0 && rowCol.col >= 0 && rowCol.row <= this.size.row - 1 && rowCol.col <= this.size.col - 1;
};

KeyPaiSho.Board.prototype.moveTile = function (boardPointStart, boardPointEnd, tileNum) {
    var tile = boardPointStart.removeTile(tileNum);
    var capturedTile = boardPointEnd.tile;

    if (!tile) {
        debug("Error: No tile to move!");
    }

    if (this.getBoardPoint(8, 8).isType(GATE)) {
        this.closeTheGardenGate();
    }

    var error = boardPointEnd.putTile(tile);

    if (error) {
        debug("Error moving tile. It probably didn't get moved.");
        return false;
    }

    // Check for tile "trapped" by opponent Orchid
    this.flagAllTrappedAndDrainedTiles();

    if (gameOptionEnabled(EVERYTHING_CAPTURE)) {
        this.refreshRockRowAndCols();
    }

    // Check for harmonies
    this.analyzeHarmonies();

    var pickedUpTile = false;
    if (this.canCarry(tile, boardPointEnd)) {
        tile.heldTile = capturedTile;
        capturedTile = null;
        pickedUpTile = true;
    }

    return {
        movedTile: tile,
        capturedTile: capturedTile,
        pickedUpTile: pickedUpTile
    }
};

KeyPaiSho.Board.prototype.flagAllTrappedAndDrainedTiles = function () {
    // First, untrap
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.hasTile()) {
                bp.tile.trapped = false;
                bp.tile.drained = false;
            }
        }
    }
    // Find Knotweed tiles, then check surrounding opposite-player Basic Flower tiles and flag them
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            this.drainAndTrapTilesSurroundingPointIfNeeded(bp);
        }
    }
};

KeyPaiSho.Board.prototype.drainAndTrapTilesSurroundingPointIfNeeded = function (boardPoint) {
    if (!boardPoint.hasTile()) {
        return;
    }
    if (boardPoint.tile.code !== KeyPaiSho.TileCodes.Knotweed) {
        return;
    }

    // get surrounding RowAndColumn values
    var rowCols = this.getSurroundingRowAndCols(boardPoint);

    for (var i = 0; i < rowCols.length; i++) {
        var bp = this.cells[rowCols[i].row][rowCols[i].col];
        if (bp.hasTile() && !bp.isType(GATE) && bp.tile.type !== ACCENT_TILE) {
            bp.tile.drained = true;
            bp.tile.trapped = true;
        }
    }
};

KeyPaiSho.Board.prototype.canCapture = function (tile, boardPointEnd) {
    return tile.code === KeyPaiSho.TileCodes.Dragon
        && (boardPointEnd.tile.code !== KeyPaiSho.TileCodes.Badgermole || boardPointEnd.tile.heldTile === null);
};

KeyPaiSho.Board.prototype.canCarry = function (tile, boardPointEnd) {
    return (tile.code === KeyPaiSho.TileCodes.SkyBison || tile.code === KeyPaiSho.TileCodes.Badgermole)
        && !tile.heldTile && boardPointEnd.tile && !boardPointEnd.tile.heldTile;
}

/* Does no verifying that tile can reach target point with standard movement */
KeyPaiSho.Board.prototype.couldMoveTileToPoint = function (player, boardPointStart, boardPointEnd, tile) {
    // must have a tile
    if (!tile && boardPointStart.hasTile()) {
        tile = boardPointStart.tile;
    }
    if (!tile) {
        return false;
    }

    // Tile must belong to player
    if (tile.ownerName !== player) {
        return false;
    }

    // Cannot move trapped tile
    if (tile.trapped) {
        return false;
    }

    // If endpoint is a Gate, that's wrong.
    if (boardPointEnd.isType(GATE)) {
        return false;
    }

    var canCapture = false;
    if (boardPointEnd.hasTile()) {
        canCapture = this.canCapture(tile, boardPointEnd);
    }

    var canCarry = false;
    if (boardPointEnd.hasTile()) {
        canCarry = this.canCarry(tile, boardPointEnd);
    }

    // If endpoint has a tile there that can't be captured or carried, that is wrong.
    if (boardPointEnd.hasTile() && !canCapture && !canCarry) {
        return false;
    }

    if (!boardPointEnd.canHoldTile(tile, (canCapture || canCarry))) {
        return false;
    }

    // I guess we made it through
    return true;
};

KeyPaiSho.Board.prototype.canMoveTileToPoint = function (player, boardPointStart, boardPointEnd) {
    // start point must have a tile
    if (!boardPointStart.hasTile()) {
        return false;
    }

    // Tile must belong to player
    if (boardPointStart.tile.ownerName !== player) {
        return false;
    }

    // Cannot move trapped tile
    if (boardPointStart.tile.trapped) {
        return false;
    }

    // If endpoint is a Gate, that's wrong.
    if (boardPointEnd.isType(GATE)) {
        return false;
    }

    var canCapture = false;
    if (boardPointEnd.hasTile()) {
        canCapture = this.canCapture(tile, boardPointEnd);
    }

    var canCarry = false;
    if (boardPointEnd.hasTile()) {
        canCarry = this.canCarry(tile, boardPointEnd);
    }

    // If endpoint has a tile there that can't be captured, that is wrong.
    if (boardPointEnd.hasTile() && !canCapture && !canCarry) {
        return false;
    }

    if (!boardPointEnd.canHoldTile(boardPointStart.tile, (canCapture || canCarry))) {
        return false;
    }

    // If endpoint is too far away, that is wrong.
    var numMoves = boardPointStart.tile.getMoveDistance();
    if (Math.abs(boardPointStart.row - boardPointEnd.row) + Math.abs(boardPointStart.col - boardPointEnd.col) > numMoves) {
        // end point is too far away, can't move that far
        return false;
    } else {
        // Move may be possible. But there may be tiles in the way...
        if (!this.verifyAbleToReach(boardPointStart, boardPointEnd, numMoves)) {
            // debug("Tiles are in the way, so you can't reach that spot.");
            return false;
        }
    }

    // I guess we made it through
    return true;
};

KeyPaiSho.Board.prototype.canTransportTileToPointWithBoat = function (boardPointStart, boardPointEnd) {
    // Transport Tile: used in Boat special ability

    // start point must have a tile
    if (!boardPointStart.hasTile()) {
        return false;
    }

    // If endpoint is a Gate, that's wrong.
    if (boardPointEnd.isType(GATE)) {
        return false;
    }

    // If endpoint has a tile, that is wrong.
    if (boardPointEnd.hasTile()) {
        return false;
    }

    if (!boardPointEnd.canHoldTile(boardPointStart.tile)) {
        return false;
    }

    // I guess we made it through
    return true;
};

KeyPaiSho.Board.prototype.verifyAbleToReach = function (boardPointStart, boardPointEnd, numMoves) {
    // Recursion!
    return this.pathFound(boardPointStart, boardPointEnd, numMoves);
};

KeyPaiSho.Board.prototype.pathFound = function (boardPointStart, boardPointEnd, numMoves) {
    if (!boardPointStart || !boardPointEnd) {
        return false; // start or end point not given
    }

    if (boardPointStart.isType(NON_PLAYABLE) || boardPointEnd.isType(NON_PLAYABLE)) {
        return false;	// Paths must be through playable points
    }

    if (boardPointStart.row === boardPointEnd.row && boardPointStart.col === boardPointEnd.col) {
        return true; // Yay! start point equals end point
    }
    if (numMoves <= 0) {
        return false; // No more moves left
    }

    // Idea: Get min num moves necessary!
    var minMoves = Math.abs(boardPointStart.row - boardPointEnd.row) + Math.abs(boardPointStart.col - boardPointEnd.col);

    if (minMoves === 1) {
        return true; // Yay! Only 1 space away (and remember, numMoves is more than 0)
    }

    // Check moving UP
    var nextRow = boardPointStart.row - 1;
    if (nextRow >= 0) {
        var nextPoint = this.cells[nextRow][boardPointStart.col];
        if (!nextPoint.hasTile() && this.pathFound(nextPoint, boardPointEnd, numMoves - 1)) {
            return true; // Yay!
        }
    }

    // Check moving DOWN
    nextRow = boardPointStart.row + 1;
    if (nextRow < 17) {
        var nextPoint = this.cells[nextRow][boardPointStart.col];
        if (!nextPoint.hasTile() && this.pathFound(nextPoint, boardPointEnd, numMoves - 1)) {
            return true; // Yay!
        }
    }

    // Check moving LEFT
    var nextCol = boardPointStart.col - 1;
    if (nextCol >= 0) {
        var nextPoint = this.cells[boardPointStart.row][nextCol];
        if (!nextPoint.hasTile() && this.pathFound(nextPoint, boardPointEnd, numMoves - 1)) {
            return true; // Yay!
        }
    }

    // Check moving RIGHT
    nextCol = boardPointStart.col + 1;
    if (nextCol < 17) {
        var nextPoint = this.cells[boardPointStart.row][nextCol];
        if (!nextPoint.hasTile() && this.pathFound(nextPoint, boardPointEnd, numMoves - 1)) {
            return true; // Yay!
        }
    }
};

KeyPaiSho.Board.prototype.markSpacesBetweenHarmonies = function () {
    // Unmark all
    this.cells.forEach(function (row) {
        row.forEach(function (boardPoint) {
            boardPoint.betweenHarmony = false;
            boardPoint.betweenHarmonyHost = false;
            boardPoint.betweenHarmonyGuest = false;
        });
    });

    // Go through harmonies, mark the spaces between them
    var self = this;
    this.harmonyManager.harmonies.forEach(function (harmony) {
        // harmony.tile1Pos.row (for example)
        // Harmony will be in same row or same col OR diagonal

        var firstCol = harmony.tile1Pos.col;
        var lastCol = harmony.tile2Pos.col;

        var colChange = 0;
        if (lastCol > firstCol) {
            colChange = 1;
        } else if (firstCol > lastCol) {
            colChange = -1;
        }

        var firstRow = harmony.tile1Pos.row;
        var lastRow = harmony.tile2Pos.row;

        var rowChange = 0;
        if (lastRow > firstRow) {
            rowChange = 1;
        } else if (firstRow > lastRow) {
            rowChange = -1;
        }

        var row = firstRow;
        var col = firstCol;
        while (row !== lastRow || col !== lastCol) {
            self.cells[row][col].betweenHarmony = true;
            if (harmony.hasOwner(GUEST)) {
                self.cells[row][col].betweenHarmonyGuest = true;
            }
            if (harmony.hasOwner(HOST)) {
                self.cells[row][col].betweenHarmonyHost = true;
            }

            row += rowChange;
            col += colChange;
        }
    });
};

KeyPaiSho.Board.prototype.analyzeHarmonies = function () {
    // We're going to find all harmonies on the board

    // Check along all rows, then along all columns.. Or just check all tiles?
    this.harmonyManager.clearList();

    this.forEachBoardPointWithTile(boardPoint => {
        var tileHarmonies = this.getTileHarmonies(boardPoint);
        this.harmonyManager.addHarmonies(tileHarmonies);

        boardPoint.tile.harmonyOwners = [];

        for (var i = 0; i < tileHarmonies.length; i++) {
            for (var j = 0; j < tileHarmonies[i].owners.length; j++) {
                var harmonyOwnerName = tileHarmonies[i].owners[j].ownerName;
                var harmonyTile1 = tileHarmonies[i].tile1;
                var harmonyTile2 = tileHarmonies[i].tile2;

                if (!harmonyTile1.harmonyOwners) {
                    harmonyTile1.harmonyOwners = [];
                }
                if (!harmonyTile2.harmonyOwners) {
                    harmonyTile2.harmonyOwners = [];
                }

                if (!harmonyTile1.harmonyOwners.includes(harmonyOwnerName)) {
                    harmonyTile1.harmonyOwners.push(harmonyOwnerName);
                }
                if (!harmonyTile2.harmonyOwners.includes(harmonyOwnerName)) {
                    harmonyTile2.harmonyOwners.push(harmonyOwnerName);
                }
            }
        }
    });

    this.markSpacesBetweenHarmonies();

    // this.harmonyManager.printHarmonies();

    this.winners = [];
    var self = this;
    var harmonyRingOwners = this.harmonyManager.harmonyRingExists();
    if (harmonyRingOwners.length > 0) {
        harmonyRingOwners.forEach(function (player) {
            if (!self.winners.includes(player)) {
                self.winners.push(player);
            }
        });
    }
};

KeyPaiSho.Board.prototype.getTileHarmonies = function (boardPoint) {
    var tile = boardPoint.tile;
    var rowAndCol = boardPoint;
    var tileHarmonies = [];

    if (tile.heldTile) {
        tile = tile.heldTile;
    }

    if (this.cells[rowAndCol.row][rowAndCol.col].isType(GATE) || tile.type === ACCENT_TILE) {
        return tileHarmonies;
    }

    var harmonyDistance = tile.getHarmonyDistance();

    if (tile.hasOrthogonalMovement()) {
        var harmony = this.getHarmonyInDirection(tile, boardPoint, 0, -1, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }

        harmony = this.getHarmonyInDirection(tile, boardPoint, 0, 1, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }

        harmony = this.getHarmonyInDirection(tile, boardPoint, -1, 0, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }

        var harmony = this.getHarmonyInDirection(tile, boardPoint, 1, 0, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }
    }

    if (tile.hasDiagonalMovement()) {
        var harmony = this.getHarmonyInDirection(tile, boardPoint, 1, -1, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }

        harmony = this.getHarmonyInDirection(tile, boardPoint, 1, 1, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }

        harmony = this.getHarmonyInDirection(tile, boardPoint, -1, 1, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }

        harmony = this.getHarmonyInDirection(tile, boardPoint, -1, -1, harmonyDistance);
        if (harmony) {
            tileHarmonies.push(harmony);
        }
    }

    return tileHarmonies;
};

KeyPaiSho.Board.prototype.getHarmonyInDirection = function (tile, fromPoint, rowChange, colChange, maxDistance) {
    /* Possible Harmony begins two steps away */
    var startDistance = 2;
    if (tile.code === KeyPaiSho.TileCodes.Lotus) {
        startDistance = 1;
    }

    var rowToCheck = fromPoint.row + rowChange;
    var colToCheck = fromPoint.col + colChange;

    var distance = 1;

    var checkPoint = this.getBoardPoint(rowToCheck, colToCheck);

    while (this.isValidRowCol(checkPoint) && !checkPoint.hasTileOfType([BASIC_FLOWER, SPECIAL_FLOWER]) && !checkPoint.isType(GATE) && distance <= maxDistance) {
        distance++;
        rowToCheck += rowChange;
        colToCheck += colChange;
        checkPoint = this.getBoardPoint(rowToCheck, colToCheck);
    }

    if (distance >= startDistance && distance <= maxDistance && this.isValidRowCol(checkPoint)
        && !checkPoint.isType(GATE) && tile.formsHarmonyWith(checkPoint.tile)
        && !this.slopeCrossesCenterPoint(fromPoint, checkPoint)) {
        var harmony = new KeyPaiSho.Harmony(tile, fromPoint, checkPoint.tile, checkPoint);
        return harmony;
    }
};

KeyPaiSho.Board.prototype.calculateSlopeBetweenPoints = function (p1, p2) {
    var rise = p2.row - p1.row;
    var run = p2.col - p1.col;
    var slope = run === 0 ? 0 : rise / run;
    return slope;
};

KeyPaiSho.Board.prototype.slopeCrossesCenterPoint = function (p1, p2) {
    var slope = this.calculateSlopeBetweenPoints(p1, p2);
    if (slope === 1 || slope === -1) {
        debug("slope might cross center point");
        var rowAndCol1 = new RowAndColumn(p1.row, p1.col);
        var rowAndCol2 = new RowAndColumn(p2.row, p2.col);
        rowAndCol1.x = rowAndCol1.x - 0.5;
        rowAndCol1.y = rowAndCol1.y + 0.5;
        rowAndCol2.x = rowAndCol2.x - 0.5;
        rowAndCol2.y = rowAndCol2.y + 0.5;

        return (rowAndCol1.x === rowAndCol1.y && rowAndCol2.x === rowAndCol2.y)
            || (-rowAndCol1.x === rowAndCol1.y && -rowAndCol2.x === rowAndCol2.y);
    }
};

KeyPaiSho.Board.prototype.getAdjacentPointsPotentialPossibleMoves = function (pointAlongTheWay, originPoint, mustPreserveDirection, movementInfo) {
    var potentialMovePoints = [];

    if (!pointAlongTheWay) {
        pointAlongTheWay = originPoint;
    }
    var rowDifference = originPoint.row - pointAlongTheWay.row;
    var colDifference = originPoint.col - pointAlongTheWay.col;

    if (pointAlongTheWay.row > 0) {
        potentialMovePoints.push(this.cells[pointAlongTheWay.row - 1][pointAlongTheWay.col]);
    }
    if (pointAlongTheWay.row < paiShoBoardMaxRowOrCol) {
        potentialMovePoints.push(this.cells[pointAlongTheWay.row + 1][pointAlongTheWay.col]);
    }
    if (pointAlongTheWay.col > 0) {
        potentialMovePoints.push(this.cells[pointAlongTheWay.row][pointAlongTheWay.col - 1]);
    }
    if (pointAlongTheWay.col < paiShoBoardMaxRowOrCol) {
        potentialMovePoints.push(this.cells[pointAlongTheWay.row][pointAlongTheWay.col + 1]);
    }

    var finalPoints = [];

    potentialMovePoints.forEach(function (potentialMovePoint) {
        if (!potentialMovePoint.isType(NON_PLAYABLE)) {
            var newRowDiff = originPoint.row - potentialMovePoint.row;
            var newColDiff = originPoint.col - potentialMovePoint.col;
            if (!mustPreserveDirection
                || (rowDifference >= 0 && newRowDiff >= 0 && newColDiff === 0)
                || (rowDifference <= 0 && newRowDiff <= 0 && newColDiff === 0)
                || (colDifference >= 0 && newColDiff >= 0 && newRowDiff === 0)
                || (colDifference <= 0 && newColDiff <= 0 && newRowDiff === 0)
            ) {
                finalPoints.push(potentialMovePoint);
            }
        }
    });

    return finalPoints;
};

KeyPaiSho.Board.prototype.getAdjacentDiagonalPointsPotentialPossibleMoves = function (pointAlongTheWay, originPoint, mustPreserveDirection, movementInfo) {
    var diagonalPoints = [];

    if (!pointAlongTheWay) {
        pointAlongTheWay = originPoint;
    }
    var rowDifference = originPoint.row - pointAlongTheWay.row;
    var colDifference = originPoint.col - pointAlongTheWay.col;

    if (
        (!mustPreserveDirection || (mustPreserveDirection && rowDifference >= 0 && colDifference >= 0))
        && (pointAlongTheWay.row > 0 && pointAlongTheWay.col > 0)
    ) {
        var adjacentPoint = this.cells[pointAlongTheWay.row - 1][pointAlongTheWay.col - 1];
        if (!adjacentPoint.isType(NON_PLAYABLE)) {
            diagonalPoints.push(adjacentPoint);
        }
    }
    if (
        (!mustPreserveDirection || (mustPreserveDirection && rowDifference <= 0 && colDifference <= 0))
        && (pointAlongTheWay.row < paiShoBoardMaxRowOrCol && pointAlongTheWay.col < paiShoBoardMaxRowOrCol)
    ) {
        var adjacentPoint = this.cells[pointAlongTheWay.row + 1][pointAlongTheWay.col + 1];
        if (!adjacentPoint.isType(NON_PLAYABLE)) {
            diagonalPoints.push(adjacentPoint);
        }
    }
    if (
        (!mustPreserveDirection || (mustPreserveDirection && colDifference >= 0 && rowDifference <= 0))
        && (pointAlongTheWay.col > 0 && pointAlongTheWay.row < paiShoBoardMaxRowOrCol)
    ) {
        var adjacentPoint = this.cells[pointAlongTheWay.row + 1][pointAlongTheWay.col - 1];
        if (!adjacentPoint.isType(NON_PLAYABLE)) {
            diagonalPoints.push(adjacentPoint);
        }
    }
    if (
        (!mustPreserveDirection || (mustPreserveDirection && colDifference <= 0 && rowDifference >= 0))
        && (pointAlongTheWay.col < paiShoBoardMaxRowOrCol && pointAlongTheWay.row > 0)
    ) {
        var adjacentPoint = this.cells[pointAlongTheWay.row - 1][pointAlongTheWay.col + 1];
        if (!adjacentPoint.isType(NON_PLAYABLE)) {
            diagonalPoints.push(adjacentPoint);
        }
    }

    return diagonalPoints;
};

KeyPaiSho.Board.prototype.targetPointHasTileThatCanBeCaptured = function (tile, movementInfo, originPoint, targetPoint, isDeploy) {
    return targetPoint.hasTile()
        && this.canCapture(tile, targetPoint);
};

KeyPaiSho.Board.prototype.tileCanMoveThroughPoint = function (tile, movementInfo, targetPoint, fromPoint) {
    // Can also check anything else that restricts tile movement through spaces on the board
    return !targetPoint.hasTile();
};

KeyPaiSho.Board.prototype.canMoveHereMoreEfficientlyAlready = function (boardPoint, distanceRemaining, movementInfo) {
    return boardPoint.getMoveDistanceRemaining(movementInfo) >= distanceRemaining;
};

KeyPaiSho.Board.prototype.getStartPointsFromGatePoint = function (boardPoint) {
    if (boardPoint.isType(GATE)) {
        var moveStartPoints = [];
        if (boardPoint.row === 16 && boardPoint.col === 8) {
            moveStartPoints = [
                this.cells[16][7],
                this.cells[15][7],
                this.cells[15][8],
                this.cells[15][9],
                this.cells[15][10],
                this.cells[16][10]
            ];
        } else if (boardPoint.row === 8 && boardPoint.col === 16) {
            moveStartPoints = [
                this.cells[10][16],
                this.cells[10][15],
                this.cells[9][15],
                this.cells[8][15],
                this.cells[7][15],
                this.cells[7][16]
            ];
        } else if (boardPoint.row === 0 && boardPoint.col === 8) {
            moveStartPoints = [
                this.cells[1][7],
                this.cells[2][7],
                this.cells[2][8],
                this.cells[2][9],
                this.cells[2][10],
                this.cells[1][10]
            ];
        } else if (boardPoint.row === 8 && boardPoint.col === 0) {
            moveStartPoints = [
                this.cells[7][1],
                this.cells[7][2],
                this.cells[8][2],
                this.cells[9][2],
                this.cells[10][2],
                this.cells[10][1]
            ];
        } else if (boardPoint.row === 8 && boardPoint.col === 8) {
            moveStartPoints = [
                this.cells[8][8],
                this.cells[8][9],
                this.cells[9][8],
                this.cells[9][9]
            ];
        }
        return moveStartPoints;
    }
};

KeyPaiSho.Board.prototype.setPossibleMovePoints = function (boardPointStart, tileNum = 0) {
    if (boardPointStart.hasTile()) {
        if (boardPointStart.isType(GATE)) {
            var moveStartPoints = this.getStartPointsFromGatePoint(boardPointStart);
            var movingTile = boardPointStart.tile;
            if (boardPointStart.row === 8 && boardPointStart.col === 8) {
                boardPointStart.removeTile();
                this.closeTheGardenGate();
            }
            moveStartPoints.forEach(startPoint => {
                if (!startPoint.hasTile()
                    && this.tileCanMoveOntoPoint(movingTile, null, startPoint, boardPointStart, boardPointStart)) {
                    this.setPointAsPossibleMovement(startPoint, movingTile, boardPointStart);
                    this.setPossibleMovesForMovement(
                        {
                            distance: movingTile.getMoveDistance() - 1,
                            orthogonalMovement: movingTile.hasOrthogonalMovement(),
                            diagonalMovement: movingTile.hasDiagonalMovement(),
                            mustPreserveDirection: movingTile.movementMustPreserveDirection()
                        }, startPoint,
                        movingTile);
                    this.forEachBoardPoint(boardPoint => { boardPoint.clearPossibleMovementTypes(); });
                }
            });
            if (boardPointStart.row === 8 && boardPointStart.col === 8) {
                boardPointStart.putTile(movingTile);
            }
        } else {
            var tile = boardPointStart.tile;
            for (i = 0; i < tileNum; i++) {
                if (tile.heldTile) {
                    tile = tile.heldTile;
                }
            }
            this.setPossibleMovesForMovement(
                {
                    distance: tile.getMoveDistance(),
                    orthogonalMovement: tile.hasOrthogonalMovement(),
                    diagonalMovement: tile.hasDiagonalMovement(),
                    mustPreserveDirection: tile.movementMustPreserveDirection()
                },
                boardPointStart
            );
        }
    }
};

KeyPaiSho.Board.prototype.setPossibleMovesForMovement = function (movementInfo, boardPointStart, tile) {
    if (!tile) {
        tile = boardPointStart.tile;
    }
    if (movementInfo.orthogonalMovement && movementInfo.diagonalMovement && !movementInfo.mustPreserveDirection) {
        this.setPossibleMovementPointsFromMovePoints([boardPointStart], KeyPaiSho.Board.standardPlusDiagonalMovementFunction, tile, movementInfo, boardPointStart, movementInfo.distance, 0);
    } else {
        if (movementInfo.orthogonalMovement) {
            this.setPossibleMovementPointsFromMovePoints([boardPointStart], KeyPaiSho.Board.standardMovementFunction, tile, movementInfo, boardPointStart, movementInfo.distance, 0);
        } if (movementInfo.diagonalMovement) {
            this.setPossibleMovementPointsFromMovePoints([boardPointStart], KeyPaiSho.Board.diagonalMovementFunction, tile, movementInfo, boardPointStart, movementInfo.distance, 0);
        }
    }
};

KeyPaiSho.Board.standardMovementFunction = function (board, originPoint, boardPointAlongTheWay, movementInfo, moveStepNumber) {
    var mustPreserveDirection = movementInfo.mustPreserveDirection;	// True means the tile couldn't turn as it goes
    return board.getAdjacentPointsPotentialPossibleMoves(boardPointAlongTheWay, originPoint, mustPreserveDirection, movementInfo);
};

KeyPaiSho.Board.diagonalMovementFunction = function (board, originPoint, boardPointAlongTheWay, movementInfo, moveStepNumber) {
    var mustPreserveDirection = movementInfo.mustPreserveDirection;
    return board.getAdjacentDiagonalPointsPotentialPossibleMoves(boardPointAlongTheWay, originPoint, mustPreserveDirection, movementInfo);
};

KeyPaiSho.Board.standardPlusDiagonalMovementFunction = function (board, originPoint, boardPointAlongTheWay, movementInfo, moveStepNumber) {
    /* Preserve direction is not working for this... */
    var mustPreserveDirection = movementInfo.mustPreserveDirection;
    var movePoints = board.getAdjacentPointsPotentialPossibleMoves(boardPointAlongTheWay, originPoint, mustPreserveDirection, movementInfo);
    return movePoints.concat(board.getAdjacentDiagonalPointsPotentialPossibleMoves(boardPointAlongTheWay, originPoint, mustPreserveDirection, movementInfo));
};

KeyPaiSho.Board.prototype.setPossibleMovementPointsFromMovePoints = function (movePoints, nextPossibleMovementPointsFunction, tile, movementInfo, originPoint, distanceRemaining, moveStepNumber) {
    if (distanceRemaining === 0
        || !movePoints
        || movePoints.length <= 0) {
        return;	// Complete
    }

    var self = this;
    var nextPointsConfirmed = [];
    movePoints.forEach(function (recentPoint) {
        var nextPossiblePoints = nextPossibleMovementPointsFunction(self, originPoint, recentPoint, movementInfo, moveStepNumber);
        nextPossiblePoints.forEach(function (adjacentPoint) {
            if (!self.canMoveHereMoreEfficientlyAlready(adjacentPoint, distanceRemaining, movementInfo)) {
                adjacentPoint.setMoveDistanceRemaining(movementInfo, distanceRemaining);

                var canMoveThroughPoint = self.tileCanMoveThroughPoint(tile, movementInfo, adjacentPoint, recentPoint);

                /* If cannot move through point, then the distance remaining is 0, none! */
                if (!canMoveThroughPoint) {
                    adjacentPoint.setMoveDistanceRemaining(movementInfo, 0);
                }

                if (self.tileCanMoveOntoPoint(tile, movementInfo, adjacentPoint, recentPoint, originPoint)) {
                    var movementOk = self.setPointAsPossibleMovement(adjacentPoint, tile, originPoint);
                    if (movementOk) {
                        if (!adjacentPoint.hasTile() || canMoveThroughPoint) {
                            nextPointsConfirmed.push(adjacentPoint);
                        }
                    }
                } else if (canMoveThroughPoint) {
                    nextPointsConfirmed.push(adjacentPoint);
                }
            }
        });
    });

    this.setPossibleMovementPointsFromMovePoints(nextPointsConfirmed,
        nextPossibleMovementPointsFunction,
        tile,
        movementInfo,
        originPoint,
        distanceRemaining - 1,
        moveStepNumber + 1);
};

KeyPaiSho.Board.prototype.setPointAsPossibleMovement = function (targetPoint, tileBeingMoved, originPoint, currentMovementPath) {
    targetPoint.addType(POSSIBLE_MOVE);
    return true;
};

KeyPaiSho.Board.prototype.tileCanMoveOntoPoint = function (tile, movementInfo, targetPoint, fromPoint, originPoint) {
    return this.couldMoveTileToPoint(tile.ownerName, originPoint, targetPoint, tile);
};

KeyPaiSho.Board.prototype.removePossibleMovePoints = function () {
    this.cells.forEach(function (row) {
        row.forEach(function (boardPoint) {
            boardPoint.removeType(POSSIBLE_MOVE);
            boardPoint.clearPossibleMovementTypes();
        });
    });
};

KeyPaiSho.Board.prototype.setOpenGatePossibleMoves = function (player, tile) {
    // Apply "open gate" type to applicable boardPoints
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.isOpenGate()) {
                this.cells[row][col].addType(POSSIBLE_MOVE);
            }
        }
    }
};

KeyPaiSho.Board.prototype.setCenterPointGatePossibleMove = function (player, tile) {
    var centerPoint = this.openTheGardenGate();
    if (centerPoint) {
        centerPoint.addType(POSSIBLE_MOVE);
    }
};

KeyPaiSho.Board.prototype.ensureCenterPointGateNotPossibleMove = function (player, tile) {
    var centerPoint = this.closeTheGardenGate();
    var centerPoint2 = this.getBoardPoint(8, 9);
    var centerPoint3 = this.getBoardPoint(9, 8);
    var centerPoint4 = this.getBoardPoint(9, 9);
    if (centerPoint) {
        centerPoint.removeType(POSSIBLE_MOVE);
        centerPoint2.removeType(POSSIBLE_MOVE);
        centerPoint3.removeType(POSSIBLE_MOVE);
        centerPoint4.removeType(POSSIBLE_MOVE);
    }
};

KeyPaiSho.Board.prototype.openTheGardenGate = function () {
    /* Lotus: Opening The Garden Gate */
    var centerPoint = this.getBoardPoint(8, 8);
    var centerPoint2 = this.getBoardPoint(8, 9);
    var centerPoint3 = this.getBoardPoint(9, 8);
    var centerPoint4 = this.getBoardPoint(9, 9);

    if (!centerPoint.hasTile() && !centerPoint2.hasTile() && !centerPoint3.hasTile() && !centerPoint4.hasTile()) {
        centerPoint.addType(GATE);
        centerPoint2.addType(GATE);
        centerPoint3.addType(GATE);
        centerPoint4.addType(GATE);
        centerPoint2.addType(NON_PLAYABLE);
        centerPoint3.addType(NON_PLAYABLE);
        centerPoint4.addType(NON_PLAYABLE);

        return centerPoint;
    }
};

KeyPaiSho.Board.prototype.closeTheGardenGate = function () {
    var centerPoint = this.getBoardPoint(8, 8);
    var centerPoint2 = this.getBoardPoint(8, 9);
    var centerPoint3 = this.getBoardPoint(9, 8);
    var centerPoint4 = this.getBoardPoint(9, 9);

    if (!centerPoint.hasTile() && !centerPoint2.hasTile() && !centerPoint3.hasTile() && !centerPoint4.hasTile()) {
        centerPoint.removeType(GATE);
        centerPoint2.removeType(GATE);
        centerPoint3.removeType(GATE);
        centerPoint4.removeType(GATE);
        centerPoint2.removeType(NON_PLAYABLE);
        centerPoint3.removeType(NON_PLAYABLE);
        centerPoint4.removeType(NON_PLAYABLE);

        return centerPoint;
    }
};

KeyPaiSho.Board.prototype.getBoardPoint = function (row, col) {
    return this.cells[row] && this.cells[row][col];
};

KeyPaiSho.Board.prototype.playerControlsLessThanTwoGates = function (player) {
    var count = 0;
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.isType(GATE) && bp.hasTile() && bp.tile.ownerName === player) {
                count++;
            }
        }
    }

    return count < 2;
};

KeyPaiSho.Board.prototype.playerHasNoGrowingFlowers = function (player) {
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.isType(GATE) && bp.hasTile() && bp.tile.ownerName === player) {
                return false;
            }
        }
    }

    return true;
};

KeyPaiSho.Board.prototype.playerHasCenterPointGate = function (player) {
    var centerPoint = this.cells[8][8];
    return centerPoint.isType(GATE)
        && centerPoint.hasTile()
        && centerPoint.tile.ownerName === player;
};

KeyPaiSho.Board.prototype.revealSpecialFlowerPlacementPoints = function (player) {
    // Check each Gate for tile belonging to player, then check gate edge points
    var bpCheckList = [];

    var row = 0;
    var col = 8;
    var bp = this.cells[row][col];
    if (bp.hasTile() && bp.tile.ownerName === player) {
        bpCheckList.push(this.cells[row][col - 1]);
        bpCheckList.push(this.cells[row][col + 1]);
    }

    row = 16;
    var bp = this.cells[row][col];
    if (bp.hasTile() && bp.tile.ownerName === player) {
        bpCheckList.push(this.cells[row][col - 1]);
        bpCheckList.push(this.cells[row][col + 1]);
    }

    row = 8;
    col = 0;
    var bp = this.cells[row][col];
    if (bp.hasTile() && bp.tile.ownerName === player) {
        bpCheckList.push(this.cells[row - 1][col]);
        bpCheckList.push(this.cells[row + 1][col]);
    }

    col = 16;
    var bp = this.cells[row][col];
    if (bp.hasTile() && bp.tile.ownerName === player) {
        bpCheckList.push(this.cells[row - 1][col]);
        bpCheckList.push(this.cells[row + 1][col]);
    }

    bpCheckList.forEach(function (bp) {
        if (!bp.hasTile()) {
            bp.addType(POSSIBLE_MOVE);
        }
    });
};

KeyPaiSho.Board.prototype.setGuestGateOpen = function () {
    var row = 16;
    var col = 8;
    if (this.cells[row][col].isOpenGate()) {
        this.cells[row][col].addType(POSSIBLE_MOVE);
    }
};

KeyPaiSho.Board.prototype.revealPossibleAccentPlacementPoints = function (player, tileCode) {
    var board = this;
    this.cells.forEach(function (row) {
        row.forEach(function (boardPoint) {
            if (board.canPlaceAccentTile(boardPoint, player, tileCode)) {
                boardPoint.addType(POSSIBLE_MOVE);
            }
        });
    });
};

KeyPaiSho.Board.prototype.setPossiblePlacementPoint = function (notationPoint) {
    this.cells[notationPoint.rowAndColumn.row][notationPoint.rowAndColumn.col].addType(POSSIBLE_MOVE);
};

KeyPaiSho.Board.prototype.getCopy = function () {
    var copyBoard = new KeyPaiSho.Board();

    // cells
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            copyBoard.cells[row][col] = this.cells[row][col].getCopy();
        }
    }

    // playedWhiteLotusTiles
    for (var i = 0; i < this.playedWhiteLotusTiles.length; i++) {
        copyBoard.playedWhiteLotusTiles.push(this.playedWhiteLotusTiles[i].getCopy());
    }

    // Everything else...
    copyBoard.analyzeHarmonies();

    return copyBoard;
};

KeyPaiSho.Board.prototype.numTilesInGardensForPlayer = function (player) {
    var count = 0;
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.types.length === 1 && bp.hasTile()) {
                if (bp.isType(bp.tile.basicColorName)) {
                    count++;
                }
            }
        }
    }
    return count;
};

KeyPaiSho.Board.prototype.numTilesOnBoardForPlayer = function (player) {
    var count = 0;
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.hasTile() && bp.tile.ownerName === player) {
                count++;
            }
        }
    }
    return count;
};

KeyPaiSho.Board.prototype.numBloomingFlowersOnBoard = function (player) {
    var count = 0;
    this.forEachBoardPointWithTile((boardPoint) => {
        if (!boardPoint.isType(GATE) && boardPoint.tile.type !== ACCENT_TILE && (!player || boardPoint.tile.ownerName === player)) {
            count++;
        }
    });
    return count;
}

KeyPaiSho.Board.prototype.getSurroundness = function (player) {
    var up = 0;
    var hasUp = 0;
    var down = 0;
    var hasDown = 0;
    var left = 0;
    var hasLeft = 0;
    var right = 0;
    var hasRight = 0;
    for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
            var bp = this.cells[row][col];
            if (bp.hasTile() && bp.tile.ownerName === player) {
                if (bp.row > 8) {
                    down++;
                    hasDown = 1;
                }
                if (bp.row < 8) {
                    up++;
                    hasUp = 1;
                }
                if (bp.col < 8) {
                    left++;
                    hasLeft = 1;
                }
                if (bp.col > 8) {
                    right++;
                    hasRight = 1;
                }
            }
        }
    }
    // Get lowest...
    var lowest = up;
    if (down < lowest) {
        lowest = down;
    }
    if (left < lowest) {
        lowest = left;
    }
    if (right < lowest) {
        lowest = right;
    }

    if (lowest === 0) {
        return hasUp + hasDown + hasLeft + hasRight;
    } else {
        return lowest * 4;
    }
};


