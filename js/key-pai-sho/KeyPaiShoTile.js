/* Key Pai Sho Tile */

KeyPaiSho.TileCodes = {
    Red3: 'R3',
    RedO: 'RO',	// Red "Orthogonal"
    RedD: 'RD',	// Red "Diagonal"
    White3: 'W3',
    WhiteO: 'WO',
    WhiteD: 'WD',
    Lotus: 'LO',
    Orchid: 'O',
    FireLily: 'F',
    Dahlia: 'D',
    Stone: 'R',
    Knotweed: 'K',
    Wheel: 'W',
    Boat: 'B',
    Badgermole: 'Badgermole',
    Dragon: 'Dragon',
    SkyBison: 'Bison',
    Koi: 'Koi'
};

KeyPaiSho.TileNames = {};
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Red3] = 'Rose';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.RedO] = 'Chrysanthemum';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.RedD] = 'Rhododendron';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.White3] = 'Lily';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.WhiteO] = 'Jasmine';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.WhiteD] = 'Jade';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Lotus] = 'Lotus';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Orchid] = 'Orchid';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.FireLily] = 'Fire Lily';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Dahlia] = 'Dahlia';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Wheel] = 'Wheel';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Stone] = 'Stone';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Boat] = 'Boat';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Knotweed] = 'Knotweed';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Dragon] = 'Dragon';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.SkyBison] = 'Sky Bison';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Badgermole] = 'Badgermole';
KeyPaiSho.TileNames[KeyPaiSho.TileCodes.Koi] = 'Koi';

KeyPaiSho.Tile = function (code, ownerCode) {
    this.code = code;
    this.ownerCode = ownerCode;
    if (this.ownerCode === 'G') {
        this.ownerName = GUEST;
    } else if (this.ownerCode === 'H') {
        this.ownerName = HOST;
    } else {
        debug("INCORRECT OWNER CODE");
    }
    this.id = tileId++;
    this.drained = false;
    this.selectedFromPile = false;

    if (this.code === KeyPaiSho.TileCodes.Lotus || this.code === KeyPaiSho.TileCodes.Orchid
        || this.code === KeyPaiSho.TileCodes.FireLily || this.code === KeyPaiSho.TileCodes.Dahlia) {
        this.type = SPECIAL_FLOWER;
        //        this.setSpecialFlowerInfo();
    } else if (this.code.length === 2 && (this.code.includes('R') || this.code.includes('W'))) {
        this.type = BASIC_FLOWER;
        this.basicColorCode = this.code.charAt(0);
        this.basicValue = this.code.charAt(1);
        if (this.basicColorCode === 'R') {
            this.basicColorName = RED;
        } else if (this.basicColorCode === 'W') {
            this.basicColorName = WHITE;
        }
    } else if (this.code === KeyPaiSho.TileCodes.Stone || this.code === KeyPaiSho.TileCodes.Knotweed
        || this.code === KeyPaiSho.TileCodes.Wheel || this.code === KeyPaiSho.TileCodes.Boat
        || this.code === KeyPaiSho.TileCodes.Badgermole || this.code === KeyPaiSho.TileCodes.Dragon
        || this.code === KeyPaiSho.TileCodes.Koi || this.code === KeyPaiSho.TileCodes.SkyBison) {
        this.type = ACCENT_TILE;
        //        this.setAccentInfo();
    } else {
        debug("Error: Unknown tile type");
    }
};

KeyPaiSho.Tile.prototype.getConsoleDisplay = function () {
    if (!this.drained) {
        return this.ownerCode + "" + this.code;
    } else {
        return "*" + this.code;
    }
};

KeyPaiSho.Tile.prototype.getImageName = function () {
    return this.ownerCode + "" + this.code;
};

KeyPaiSho.Tile.prototype.formsHarmonyWith = function (otherTile) {
    if (this.type === ACCENT_TILE || otherTile.type === ACCENT_TILE) {
        return false;
    }

    if (this.code === KeyPaiSho.TileCodes.Lotus || otherTile.code === KeyPaiSho.TileCodes.Lotus) {
        return true;
    }

    if (otherTile.ownerName !== this.ownerName) {
        return false;
    }

    if (this.type === SPECIAL_FLOWER && otherTile.type === SPECIAL_FLOWER) {
        return false;
    }

    if (this.code === KeyPaiSho.TileCodes.FireLily || otherTile.code === KeyPaiSho.TileCodes.FireLily) {
        return false;
    }

    return true;
};

KeyPaiSho.Tile.prototype.getMoveDistance = function () {
    if (this.type === BASIC_FLOWER) {
        if (this.basicValue === '3') {
            return 3;
        } else {
            return 5;
        }
    } else if (this.code === KeyPaiSho.TileCodes.Lotus) {
        return 2;
    } else if (this.code === KeyPaiSho.TileCodes.Orchid) {
        return 1;
    } else if (this.code === KeyPaiSho.TileCodes.FireLily) {
        return 6;
    } else if (this.code === KeyPaiSho.TileCodes.Dahlia) {
        return 20;
    } else if (this.code === KeyPaiSho.TileCodes.Knotweed) {
        return 2;
    } else if (this.code === KeyPaiSho.TileCodes.Wheel) {
        return 3;
    } else if (this.code === KeyPaiSho.TileCodes.Boat) {
        return 4;
    } else if (this.code === KeyPaiSho.TileCodes.Stone) {
        return 0;
    }
    return 5;
};

KeyPaiSho.Tile.prototype.getHarmonyDistance = function () {
    if (this.type === BASIC_FLOWER) {
        return this.getMoveDistance();
    } else if (this.code === KeyPaiSho.TileCodes.Lotus) {
        return 20;
    }
};

KeyPaiSho.Tile.prototype.hasOrthogonalMovement = function () {
    return !(this.basicValue === 'D');
};

KeyPaiSho.Tile.prototype.hasDiagonalMovement = function () {
    return !(this.basicValue === 'O');
};

KeyPaiSho.Tile.prototype.getMovementDirectionWording = function () {
    if (this.getMoveDistance() === 0) {
        return "Cannot Move";
    }
    var directionWording = "";
    if (this.hasOrthogonalMovement()) {
        directionWording += "Horizontally/Vertically";
    }
    if (this.hasDiagonalMovement()) {
        if (directionWording.length > 1) {
            directionWording += " and ";
        }
        directionWording += "Diagonally";
    }
    return directionWording;
};

KeyPaiSho.Tile.prototype.movementMustPreserveDirection = function () {
    return !(this.code === KeyPaiSho.TileCodes.Lotus || this.code === KeyPaiSho.TileCodes.Dahlia);
};


KeyPaiSho.Tile.prototype.drain = function () {
    if (this.type === BASIC_FLOWER) {
        this.drained = true;
    }
};

KeyPaiSho.Tile.prototype.restore = function () {
    this.drained = false;
};

KeyPaiSho.Tile.prototype.getName = function () {
    return KeyPaiSho.TileNames[this.code];
};

KeyPaiSho.Tile.prototype.getCopy = function () {
    return new KeyPaiSho.Tile(this.code, this.ownerCode);
};

KeyPaiSho.Tile.getTileName = function (tileCode) {
    return KeyPaiSho.TileNames[tileCode];
};