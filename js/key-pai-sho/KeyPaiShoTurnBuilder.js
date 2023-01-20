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
 * Represents a turn in progress.
 * Manages all of the actions a player will take on a single turn, while updating the board state.
 * Called at the end to return the turn info as JSON to be sent to the opponent.
 * Also contains functions for implementing moves on the board from JSON.
 * @constructor
 * @param {number} moveNum The number of the move in the game.
 * @param {string} player The player taking the move.
 * @param {KeyPaiSho.GameManager} game The object holding the current game state.
 */
KeyPaiSho.TurnBuilder = function (moveNum, player, game) {
    this.turnStatus = BRAND_NEW;
    this.waitingForNewAction = true;
    this.game = game;
    this.move = {
        'moveNum': moveNum,
        'player': player,
        'actions': []
    };
    this.accentTilesUsedIds = [];
};

/**
 * Attempts to end the turn.
 * @throws Will throw an error if the turn cannot be ended at this time.
 * @returns The JSON representation of the turn.
 */
KeyPaiSho.TurnBuilder.prototype.endTurn = function () {
    if (this.move.actions.length === 0) {
        throw 'Must do something on your turn.';
    }

    if (!this.waitingForNewAction) {
        throw 'There is an action in progress.';
    }

    // TODO: Send Action data and change turn
};

/**
 * Adds additional information to the turn when the player takes an action.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns {KeyPaiSho.TurnReturnStatus} The result of attempting to add the data to the turn.
 */
KeyPaiSho.TurnBuilder.prototype.addToAction = function (additionalInfo) {
    this.game.hidePossibleMovePoints();

    // If additionalInfo is false, cancel the current action.
    if (additionalInfo === false) {
        this.cancelCurrentAction();
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }

    // If waitingForNewAction is true, this is the first information of a new action.
    if (this.waitingForNewAction) {
        this.currentAction = {
            'type': null
        };

        if (additionalInfo.usingAccentTile) {
            this.currentAction.type = USING_ACCENT;
        } else if (additionalInfo.position) {
            if (this.turnStatus === WAITING_FOR_MAIN_ACTION || this.turnStatus === BRAND_NEW) {
                this.currentAction.type = MOVING;
            }
        } else if (additionalInfo.tile) {
            if (additionalInfo.tile.type === ACCENT_TILE && (this.turnStatus === WAITING_FOR_ACCENT_TILE || this.turnStatus === BRAND_NEW)
                && this.game.board.numBloomingFlowersOnBoard() > 5) {
                this.currentAction.type = PLACING;
            }

            if (additionalInfo.tile.type !== ACCENT_TILE && (this.turnStatus === WAITING_FOR_MAIN_ACTION || this.turnStatus === BRAND_NEW)) {
                this.currentAction = PLACING;
            }
        }

        if (this.currentAction.type === null) {
            return KeyPaiSho.TurnReturnStatus.INVALID_INPUT;
        }

        this.waitingForNewAction = false;
    }

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
 * Adds additional information to the action when the player is moving a tile.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns {KeyPaiSho.TurnReturnStatus} The result of attempting to add the data to the action.
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
        this.game.revealPossibleMovePoints(this.move.player, additionalInfo.position, 0);
        return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
    }

    // If there is already a source position, and the player has selected it again, they are either attempting to move a stacked tile or cancelling the move
    if (additionalInfo.position === this.currentAction.sourcePosition) {
        if (this.turnStatus === WAITING_FOR_MAIN_ACTION || this.turnStatus === BRAND_NEW) {
            this.currentAction.sourceTileNum = this.currentAction.sourceTileNum === 1 ? 0 : 1;
            this.game.hidePossibleMovementPoints();
            this.game.revealPossibleMovePoints(this.move.player, additionalInfo.position, this.currentAction.sourceTileNum);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        } else {
            this.cancelCurrentAction();
            return ACTION_DONE;
        }
    }

    // The player has selected another point, which they are attempting to move the tile to
    this.currentAction.targetPosition = additionalInfo.position;
    moveResult = this.game.board.moveTile(this.currentAction.sourcePosition, this.currentAction.targetPosition, this.currentAction.sourceTileNum);
    if (moveResult) {
        this.game.hidePossibleMovementPoints();
        this.currentAction.capturedTile = moveResult.capturedTile;
        this.currentAction.tile = moveResult.movedTile;
        this.move.actions.push(this.currentAction);
        this.turnStatus = this.turnStatus === BRAND_NEW ? WAITING_FOR_ACCENT_TILE : WAITING_FOR_ACCENT_ABILITIES;
        // If the tile moved is a Sky Bison holding a tile, the tile on top can be moved
        if (this.currentAction.tile.code === KeyPaiSho.TileCodes.SkyBison && this.currentAction.tile.heldTile) {
            this.currentAction = {
                'type': MOVING,
                'sourcePosition': this.currentAction.targetPosition,
                'sourceTileNum': 1
            };
            this.game.revealPossibleMovePoints(this.currentAction.sourcePosition, 1);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        } else {
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
 * @returns {KeyPaiSho.TurnReturnStatus} The result of attempting to add the data to the action.
 */
KeyPaiSho.TurnBuilder.prototype.addToPlaceAction = function (additionalInfo) {
    // The first piece of info in placing a tile is the tile to place
    if (!this.currentAction.tile) {
        this.currentAction.tile = additionalInfo.tile;
        this.game.revealPossiblePlacementPoints(this.move.player, this.currentAction.tile);
        return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
    }

    // Next is the board position that the tile is placed on
    if (!this.additionalInfo.position) {
        this.cancelCurrentAction();
        return KeyPaiSho.TurnReturnStatus.INVALID_INPUT;
    }

    // If there is not already a target position, the player is selecting where to play the tile
    if (!this.currentAction.targetPosition) {
        this.currentAction.targetPosition = additionalInfo.position;
        // If the player is playing a stone, they have just selected the flower tile to play, and need to select an additional point
        if (this.currentAction.tile.code === KeyPaiSho.TileCodes.Stone) {
            this.game.hidePossibleMovePoints();
            this.game.revealPossiblePlacementPoints(this.move.player, this.currentAction.tile, [this.currentAction.targetPosition]);
            return KeyPaiSho.TurnReturnStatus.NEED_MORE_INPUT;
        }
        this.currentAction.removedTile = this.currentAction.targetPosition.removeTile();
        this.currentAction.targetPosition.putTile(this.currentAction.tile);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    } else {    // If there is already a target position, the player is playing a stone, and is selecting where to play the stone
        this.currentAction.removedTile = this.currentAction.targetPosition.removeTile();
        this.currentAction.extraStonePlacementPoint = additionalInfo.extraStonePlacementPoint;
        this.currentAction.targetPosition.putTile(this.currentAction.tile);
        return KeyPaiSho.TurnReturnStatus.ACTION_DONE;
    }
};

/**
 * Adds additional information to the action when the player is using an accent ability.
 * @param {object} additionalInfo The additional input the player has generated.
 * @returns {KeyPaiSho.TurnReturnStatus} The result of attempting to add the data to the action.
 */
KeyPaiSho.TurnBuilder.prototype.addToAccentAction = function (additionalInfo) {
    // When the player has first decided to activate an accent tile, the need to select which one
    if (additionalInfo.usingAccentTile) {
        this.game.revealPossibleAccentTiles(this.accentTilesUsedIds, this.turnStatus);
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

KeyPaiSho.TurnBuilder.prototype.cancelCurrentAction = function () {
    this.game.hidePossibleMovePoints();
    this.waitingForNewAction = true;
};