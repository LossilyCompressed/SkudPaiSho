/**
 * Enum for the return status of an addition to the turn.
 * @readonly
 * @enum {number}
 */
KeyPaiSho.TurnReturnStatus = {
    ACTION_DONE: 0,
    NEED_MORE_INPUT: 1,
    NEED_OPTIONAL_INPUT: 2,
    UNEXPECTED_INPUT: 3,
    INVALID_INPUT: 4
};

/**
 * Manages the turns taken during a game.
 * Manages all of the actions a player will take on a single turn, while updating the board state.
 * Called at the end to return the turn info as JSON to be sent to the opponent.
 * Also contains functions for implementing moves on the board from JSON.
 * @constructor
 * @param {string} startingPlayer The player taking the first move.
 * @param {KeyPaiSho.GameManager} game The object holding the current game state.
 * @param {boolean} onlineGame Whether or not the game needs to wait for remote plays.
 */
KeyPaiSho.TurnBuilder = function (startingPlayer, game, onlineGame) {
    this.waitingForNewAction = true;
    this.game = game;
    this.currentMove = {
        'moveNum': 0,
        'player': startingPlayer,
        'actions': []
    };
    this.accentTilesUsedIds = [];
    this.moves = [];
    this.onlineGame = onlineGame;
};

/**
 * Attempts to end the turn.
 * @throws Will throw an error if the turn cannot be ended at this time.
 * @returns The JSON representation of the turn.
 */
KeyPaiSho.TurnBuilder.prototype.endTurn = function () {
    if (this.currentMove.actions.length === 0) {
        throw 'Must do something on your turn.';
    }

    if (!this.waitingForNewAction) {
        throw 'There is an action in progress.';
    }

    this.moves.push(this.currentMove);

    this.accentTilesUsedIds = [];
    this.currentMove = {
        'moveNum': this.currentMove.moveNum++,
        'player': this.currentMove.player === GUEST ? HOST : GUEST,
        'actions': []
    };

    return this.moves[this.moves.length - 1];
};

/**
 * Adds additional information to the turn when the player takes an action.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns KeyPaiSho.TurnReturnStatus - The result of attempting to add the data to the turn.
 */
KeyPaiSho.TurnBuilder.prototype.addToAction = function (additionalInfo) {
    if (this.moves.length <= 1) {
        return this.addToSpecialSelectAction(additionalInfo);
    }

    // If additionalInfo is false, cancel the current action.
    if (additionalInfo === false) {
        this.cancelCurrentAction();
        return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
    }

    // If waitingForNewAction is true, this is the first information of a new action.
    if (this.waitingForNewAction) {
        this.currentAction = {
            'type': null
        };

        if (additionalInfo.usingAccentTile) {
            this.currentAction.type = USING_ACCENT;
        } else if (additionalInfo.position && !this.mainActionUsed(additionalInfo.position.tile) && additionalInfo.position.tile.ownerName === this.currentMove.player) {
            this.currentAction.type = MOVING;
        } else if (additionalInfo.tile) {
            if (additionalInfo.tile.type !== ACCENT_TILE && !this.mainActionUsed()) {
                this.currentAction.type = PLACING;
            } else if (additionalInfo.tile.type === ACCENT_TILE && !this.accentPlacementUsed() && this.game.board.numBloomingFlowersOnBoard() > 1) {
                this.currentAction.type = PLACING;
            }
        }

        if (this.currentAction.type === null) {
            return KeyPaiSho.TurnReturnStatus.INVALID_INPUT;
        }

        this.waitingForNewAction = false;
    } else {
        // If an action is in progress, any position must be a possible move to be played
        if (additionalInfo.position && !additionalInfo.position.isType(POSSIBLE_MOVE)) {
            this.cancelCurrentAction();
            return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
        }
    }

    this.game.hidePossibleMovePoints();

    if (this.currentAction.type === MOVING) {
        return this.addToMoveAction(additionalInfo);
    } else if (this.currentAction.type === PLACING) {
        return this.addToPlaceAction(additionalInfo);
    } else if (this.currentAction.type === USING_ACCENT) {
        return this.addToAccentAction(additionalInfo);
    }

    return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
};

/**
 * Adds additional information to the action when the player is selecting their special tiles at the start of the game.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns KeyPaiSho.TurnReturnStatus - The result of attempting to add the data to the action.
 */
KeyPaiSho.TurnBuilder.prototype.addToSpecialSelectAction = function (additionalInfo) {
    if (!additionalInfo.tile || additionalInfo.tile.ownerName !== this.currentMove.player || additionalInfo.tile.type === BASIC_FLOWER || this.currentMove.actions.length) {
        return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
    }

    if (this.waitingForNewAction) {
        this.waitingForNewAction = false;
        this.currentAction = {
            'type': SETUP,
            'tiles': []
        }
    }

    if (this.currentAction.tiles.includes(additionalInfo.tile)) {
        this.currentAction.tiles.splice(this.currentAction.tiles.indexOf(additionalInfo.tile), 1);
    } else {
        this.currentAction.tiles.push(additionalInfo.tile);
    }

    additionalInfo.tile.selectedFromPile = !additionalInfo.tile.selectedFromPile;

    if (this.currentAction.tiles.length === 6) {
        this.currentMove.actions.push(this.currentAction);
        this.waitingForNewAction = true;
        this.game.tileManager.removeExcessSpecialTiles(this.currentAction.tiles, this.currentMove.player);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }

    return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
}

/**
 * Adds additional information to the action when the player is moving a tile.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns KeyPaiSho.TurnReturnStatus - The result of attempting to add the data to the action.
 */
KeyPaiSho.TurnBuilder.prototype.addToMoveAction = function (additionalInfo) {
    // The move action always takes positions as input
    if (!additionalInfo.position) {
        this.cancelCurrentAction();
        return KeyPaiSho.TurnReturnStatus.INVALID_INPUT;
    }

    // If there is not already a source position, the player is selecting the tile to move
    if (!this.currentAction.sourcePosition) {
        this.currentAction.sourcePosition = additionalInfo.position;
        this.currentAction.sourceTileNum = 0;
        this.game.revealPossibleMovePoints(this.currentMove.player, additionalInfo.position, 0);
        return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
    }

    // If there is already a source position, and the player has selected it again, they are either attempting to move a stacked tile or cancelling the move
    if (additionalInfo.position === this.currentAction.sourcePosition) {
        if (!this.mainActionUsed()) {
            this.currentAction.sourceTileNum = this.currentAction.sourceTileNum === 1 ? 0 : 1;
            this.game.revealPossibleMovePoints(this.currentMove.player, additionalInfo.position, this.currentAction.sourceTileNum);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        } else {
            this.cancelCurrentAction();
            return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
        }
    }

    // The player has selected another point, which they are attempting to move the tile to
    this.currentAction.targetPosition = additionalInfo.position;
    moveResult = this.game.board.moveTile(this.currentAction.sourcePosition, this.currentAction.targetPosition, this.currentAction.sourceTileNum);
    if (moveResult) {
        this.currentAction.capturedTile = moveResult.capturedTile;
        if (moveResult.capturedTile) {
            this.game.tileManager.putTileBack(moveResult.capturedTile);
        }
        this.currentAction.tile = moveResult.movedTile;
        this.currentMove.actions.push(this.currentAction);
        // If the tile moved is a Sky Bison holding a tile, the tile on top can be moved
        if (this.currentAction.tile.code === KeyPaiSho.TileCodes.SkyBison && this.currentAction.tile.heldTile && !moveResult.pickedUpTile) {
            this.currentAction = {
                'type': MOVING,
                'sourcePosition': this.currentAction.targetPosition,
                'sourceTileNum': 1
            };
            this.game.revealPossibleMovePoints(this.currentMove.player, this.currentAction.sourcePosition, 1);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        } else {
            this.currentMove.actions.push(this.currentAction);
            this.waitingForNewAction = true;
            return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
        }
    } else {
        this.cancelCurrentAction();
        return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
    }
};

/**
 * Adds additional information to the action when the player is playing a tile.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns KeyPaiSho.TurnReturnStatus - The result of attempting to add the data to the action.
 */
KeyPaiSho.TurnBuilder.prototype.addToPlaceAction = function (additionalInfo) {
    // The first piece of info in placing a tile is the tile to place
    if (!this.currentAction.tile) {
        this.currentAction.tile = additionalInfo.tile;
        this.currentAction.tile.selectedFromPile = true;
        this.game.revealPossiblePlacementPoints(this.currentMove.player, this.currentAction.tile);
        return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
    }

    // Next is the board position that the tile is placed on
    if (!additionalInfo.position) {
        this.cancelCurrentAction();
        return KeyPaiSho.TurnReturnStatus.INVALID_INPUT;
    }

    // If there is not already a target position, the player is selecting where to play the tile
    if (!this.currentAction.targetPosition) {
        this.currentAction.targetPosition = additionalInfo.position;
        // If the player is playing a stone, they have just selected the flower tile to play, and need to select an additional point
        if (this.currentAction.tile.code === KeyPaiSho.TileCodes.Stone) {
            this.game.hidePossibleMovePoints();
            this.game.revealPossiblePlacementPoints(this.currentMove.player, this.currentAction.tile, [this.currentAction.targetPosition]);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        }
        this.currentAction.removedTile = this.currentAction.targetPosition.removeTile();
        this.currentAction.targetPosition.putTile(this.currentAction.tile);
        this.game.tileManager.removeTile(this.currentAction.tile, this.currentMove.player);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    } else {    // If there is already a target position, the player is playing a stone, and is selecting where to play the stone
        this.currentAction.removedTile = this.currentAction.targetPosition.removeTile();
        this.currentAction.extraStonePlacementPoint = additionalInfo.extraStonePlacementPoint;
        this.currentAction.targetPosition.putTile(this.currentAction.tile);
        this.game.tileManager.removeTile(this.currentAction.tile, this.currentMove.player);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }
};

/**
 * Adds additional information to the action when the player is using an accent ability.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns KeyPaiSho.TurnReturnStatus - The result of attempting to add the data to the action.
 */
KeyPaiSho.TurnBuilder.prototype.addToAccentAction = function (additionalInfo) {
    // When the player has first decided to activate an accent tile, the need to select which one
    if (additionalInfo.usingAccentTile) {
        this.game.revealPossibleAccentTiles(this.accentTilesUsedIds, this.mainActionUsed(true), this.currentMove.player);
        return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
    }

    // The first position is the accent tile they are using
    if (!this.currentAction.sourcePosition) {
        this.currentAction.sourcePosition = additionalInfo.position;
        this.currentAction.tile = this.currentAction.sourcePosition.tile;
        // The only accent tiles which require additional inputs are Koi and Boat
        if (this.currentAction.tile.code === KeyPaiSho.TileCodes.Koi || this.currentAction.tile.code === KeyPaiSho.TileCodes.Boat) {
            this.game.revealPossibleAccentMoves(this.currentAction.sourcePosition);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        }
        this.game.activateAccentTile(this.currentAction.sourcePosition);
        this.accentTilesUsedIds.push(this.currentAction.tile.id);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }

    // The second position is the boat movement or the first tile for the Koi to swap
    if (!this.currentAction.targetPosition) {
        this.currentAction.targetPosition = additionalInfo.position;
        if (this.currentAction.tile.code === KeyPaiSho.TileCodes.Koi) {
            this.game.revealPossibleAccentMoves(this.currentAction.sourcePosition, this.currentAction.targetPosition);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        }
        this.game.activateAccentTile(this.currentAction.sourcePosition, this.currentAction.targetPosition);
        this.accentTilesUsedIds.push(this.currentAction.tile.id);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }

    // The third position is the second tile for the Koi to swap
    if (!this.currentAction.extraKoiSwapPoint) {
        this.currentAction.extraKoiSwapPoint = additionalInfo.position;
        this.game.activateAccentTile(this.currentAction.sourcePosition, this.currentAction.targetPosition, this.currentAction.extraKoiSwapPoint);
        this.accentTilesUsedIds.push(this.currentAction.tile.id);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }

    this.cancelCurrentAction();
    return KeyPaiSho.TurnReturnStatus.UNEXPECTED_INPUT;
};

/**
 * Clears the potential moves on the board and resets for a different action.
 */
KeyPaiSho.TurnBuilder.prototype.cancelCurrentAction = function () {
    this.game.tileManager.removeSelectedTileFlags();
    this.game.hidePossibleMovePoints();
    this.waitingForNewAction = true;
};

/**
 * Checks if the main action of moving or placing a non accent tile has been used during the current turn.
 * @param {KeyPaiSho.Tile} movingTile When checking to take a move action, this should be passed to allow a second move after an orchid move.
 *                                    If there is no specific tile associated with the move yet, this should be passed as true.
 * @returns Boolean - True if a tile has been moved or a flower planted this turn.
 */
KeyPaiSho.TurnBuilder.prototype.mainActionUsed = function (movingTile) {
    var mainActionUsed = false;

    this.currentMove.actions.forEach((action) => {
        if ((action.type === MOVING && (!movingTile || action.tile.code !== KeyPaiSho.TileCodes.Orchid || action.tile === movingTile)) ||
            (action.type === PLACING && action.tile.type !== ACCENT_TILE)) {
            mainActionUsed = true;
        }
    });

    return mainActionUsed;
};

/**
 * Checks if an accent tile has been placed during the current turn.
 * @returns Boolean - True if an accent has been placed this turn.
 */
KeyPaiSho.TurnBuilder.prototype.accentPlacementUsed = function () {
    var accentPlacementUsed = false;

    this.currentMove.actions.forEach((action) => {
        if (action.type === PLACING && action.tile.type === ACCENT_TILE) {
            accentPlacementUsed = true;
        }
    });

    return accentPlacementUsed;
};

/**
 * Adds the action to the move and prepares for a new one.
 */
KeyPaiSho.TurnBuilder.prototype.endAction = function () {
    this.waitingForNewAction = true;
    this.currentMove.actions.push(this.currentAction);
};