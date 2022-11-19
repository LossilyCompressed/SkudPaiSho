/* Key Pai Sho Tile Manager */

KeyPaiSho.TileManager = function (forActuating) {
    if (forActuating) {
        this.hostTiles = this.loadOneOfEach('H');
        this.guestTiles = this.loadOneOfEach('G');
        return;
    }
    this.hostTiles = this.loadTileSet('H');
    this.guestTiles = this.loadTileSet('G');
}

KeyPaiSho.TileManager.prototype.loadTileSet = function (ownerCode) {
    var tiles = [];

    if (!gameOptionEnabled(NO_EFFECT_TILES)) {
        // 1 of each accent tile
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Stone, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Wheel, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Knotweed, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Boat, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Dragon, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Koi, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.SkyBison, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Badgermole, ownerCode));

        // 1 of each special flower
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Lotus, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Orchid, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Dahlia, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.FireLily, ownerCode));


        tiles.forEach(function (tile) {
            tile.selectedFromPile = true;
        });
    }

    // 3 of each basic flower
    for (var i = 0; i < 3; i++) {
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Red3, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.RedO, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.RedD, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.White3, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.WhiteO, ownerCode));
        tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.WhiteD, ownerCode));
    }

    return tiles;
};

KeyPaiSho.TileManager.prototype.loadOneOfEach = function (ownerCode) {
    var tiles = [];

    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Stone, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Wheel, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Knotweed, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Boat, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Dragon, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Koi, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.SkyBison, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Badgermole, ownerCode));

    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Red3, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.RedO, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.RedD, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.White3, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.WhiteO, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.WhiteD, ownerCode));

    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Lotus, ownerCode));
    tiles.push(new KeyPaiSho.Tile(KeyPaiSho.TileCodes.Orchid, ownerCode));

    return tiles;
};

KeyPaiSho.TileManager.prototype.grabTile = function (player, tileCode) {
    var tilePile = this.hostTiles;
    if (player === GUEST) {
        tilePile = this.guestTiles;
    }

    var tile;
    for (var i = 0; i < tilePile.length; i++) {
        if (tilePile[i].code === tileCode) {
            newTileArr = tilePile.splice(i, 1);
            tile = newTileArr[0];
            break;
        }
    }

    if (!tile) {
        debug("NONE OF THAT TILE FOUND");
    }

    return tile;
};

KeyPaiSho.TileManager.prototype.numberOfAccentTilesPerPlayerSet = function () {
    var tileSet = this.loadTileSet(hostPlayerCode);
    var accentTileCount = 0;
    for (var i = 0; i < tileSet.length; i++) {
        if (tileSet[i].type === ACCENT_TILE) {
            accentTileCount++;
        }
    }
    return accentTileCount;
};

KeyPaiSho.TileManager.prototype.peekTile = function (player, tileCode, tileId) {
    var tilePile = this.hostTiles;
    if (player === GUEST) {
        tilePile = this.guestTiles;
    }

    var tile;
    if (tileId) {
        for (var i = 0; i < tilePile.length; i++) {
            if (tilePile[i].id === tileId) {
                return tilePile[i];
            }
        }
    }

    for (var i = 0; i < tilePile.length; i++) {
        if (tilePile[i].code === tileCode) {
            tile = tilePile[i];
            break;
        }
    }

    if (!tile) {
        debug("NONE OF THAT TILE FOUND");
    }

    return tile;
};

KeyPaiSho.TileManager.prototype.removeSelectedTileFlags = function () {
    this.hostTiles.forEach(function (tile) {
        tile.selectedFromPile = false;
    });
    this.guestTiles.forEach(function (tile) {
        tile.selectedFromPile = false;
    });
};

KeyPaiSho.TileManager.prototype.unselectTiles = function (player) {
    var tilePile = this.hostTiles;
    if (player === GUEST) {
        tilePile = this.guestTiles;
    }

    tilePile.forEach(function (tile) {
        tile.selectedFromPile = false;
    });
}

KeyPaiSho.TileManager.prototype.putTileBack = function (tile) {
    var player = tile.ownerName;
    var tilePile = this.hostTiles;
    if (player === GUEST) {
        tilePile = this.guestTiles;
    }

    tilePile.push(tile);
};

KeyPaiSho.TileManager.prototype.aPlayerIsOutOfBasicFlowerTiles = function () {
    // Check Host
    var hostHasBasic = false;
    for (var i = 0; i < this.hostTiles.length; i++) {
        if (this.hostTiles[i].type === BASIC_FLOWER) {
            hostHasBasic = true;
            break;
        }
    }

    var guestHasBasic = false;
    for (var i = 0; i < this.guestTiles.length; i++) {
        if (this.guestTiles[i].type === BASIC_FLOWER) {
            guestHasBasic = true;
            break;
        }
    }

    if (!hostHasBasic && guestHasBasic) {
        return HOST;
    } else if (!guestHasBasic && hostHasBasic) {
        return GUEST;
    } else if (!guestHasBasic && !hostHasBasic) {
        return "BOTH PLAYERS";
    }
};

KeyPaiSho.TileManager.prototype.getPlayerWithMoreAccentTiles = function () {
    var hostCount = 0;
    for (var i = 0; i < this.hostTiles.length; i++) {
        if (this.hostTiles[i].type === ACCENT_TILE) {
            hostCount++;
        }
    }

    var guestCount = 0;
    for (var i = 0; i < this.guestTiles.length; i++) {
        if (this.guestTiles[i].type === ACCENT_TILE) {
            guestCount++;
        }
    }

    if (hostCount > guestCount) {
        return HOST;
    } else if (guestCount > hostCount) {
        return GUEST;
    }
};

KeyPaiSho.TileManager.prototype.playerHasBothSpecialTilesRemaining = function (player) {
    var tilePile = this.hostTiles;
    if (player === GUEST) {
        tilePile = this.guestTiles;
    }

    var specialTileCount = 0;

    tilePile.forEach(function (tile) {
        if (tile.type === SPECIAL_FLOWER) {
            specialTileCount++;
        }
    });

    return specialTileCount > 1;
};

KeyPaiSho.TileManager.prototype.getCopy = function () {
    var copy = new KeyPaiSho.TileManager();

    // copy this.hostTiles and this.guestTiles
    copy.hostTiles = copyArray(this.hostTiles);
    copy.guestTiles = copyArray(this.guestTiles);

    return copy;
};

