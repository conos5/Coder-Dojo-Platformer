namespace SpriteKind {
    export const fly = SpriteKind.create()
    export const doubleJump = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isFacingRight) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
    } else {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, -200, 0)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.jewels.jewel6, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level0`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 12))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -300
        if (doubleJumpOn) {
            jumpsRemaining = 1
        }
    } else {
        if (jumpsRemaining > 0) {
            mySprite.vy = -300
            jumpsRemaining += -1
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    info.setLife(0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.doubleJump, function (sprite, otherSprite) {
    doubleJumpOn = true
    jumpsRemaining = 1
    sprites.destroy(otherSprite, effects.hearts, 500)
    pause(2000)
    doubleJumpOn = false
    jumpsRemaining = 0
})
info.onLifeZero(function () {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.jewels.jewel2, function (sprite, location) {
    if (game.runtime() > invincibleUntil) {
        info.changeLifeBy(-1)
        invincibleUntil = 3000 + game.runtime()
        scene.cameraShake(4, 500)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    controller.moveSprite(mySprite, 200, 0)
    sprites.destroy(otherSprite, effects.confetti, 500)
    pause(5000)
    controller.moveSprite(mySprite, 100, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fountain, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (game.runtime() > invincibleUntil) {
        info.changeLifeBy(-1)
        invincibleUntil = 3000 + game.runtime()
        scene.cameraShake(4, 500)
    }
})
let projectile: Sprite = null
let isFacingRight = false
let jumpsRemaining = 0
let doubleJumpOn = false
let invincibleUntil = 0
let mySprite: Sprite = null
scene.setBackgroundColor(9)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
info.setLife(3)
invincibleUntil = 0
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 12))
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite, 75, 0)
doubleJumpOn = false
jumpsRemaining = 0
mySprite.ay = 1000
let apple = sprites.create(img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `, SpriteKind.Food)
tiles.placeOnTile(apple, tiles.getTileLocation(5, 12))
apple.setScale(0.5, ScaleAnchor.Middle)
let cherry = sprites.create(img`
    . . . . . . . . . . . 6 6 6 6 6 
    . . . . . . . . . 6 6 7 7 7 7 8 
    . . . . . . 8 8 8 7 7 8 8 6 8 8 
    . . e e e e c 6 6 8 8 . 8 7 8 . 
    . e 2 5 4 2 e c 8 . . . 6 7 8 . 
    e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
    e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
    e 2 e e 2 2 2 2 e e e e c 6 8 . 
    c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
    . c 2 e e e 2 e 2 4 2 2 2 2 c . 
    . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
    . . . e c c e c 2 2 2 2 2 2 2 e 
    . . . . . . . c 2 e e 2 2 e 2 c 
    . . . . . . . c e e e e e e 2 c 
    . . . . . . . . c e 2 2 2 2 c . 
    . . . . . . . . . c c c c c . . 
    `, SpriteKind.doubleJump)
tiles.placeOnTile(cherry, tiles.getTileLocation(7, 12))
cherry.setScale(0.5, ScaleAnchor.Middle)
let mySprite2 = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd111111111f......
    ......fd11111111df......
    ......fd11111111df......
    ......fcdd1111ddcff.....
    .......fbcf11fcbfbbf....
    .......ffbdb1bdffff.....
    ........fcbfbfdf........
    ........ffffffff........
    ......ffffffffff........
    .....fcb1bcffff.........
    ......ffbff.............
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Enemy)
tiles.placeOnTile(mySprite2, tiles.getTileLocation(8, 12))
mySprite2.vx = 50
game.onUpdate(function () {
    if (mySprite.vx > 0) {
        mySprite.setImage(assets.image`myImage`)
        isFacingRight = true
    }
    if (mySprite.vx < 0) {
        mySprite.setImage(assets.image`myImage0`)
        isFacingRight = false
    }
})
game.onUpdate(function () {
    if (mySprite2.isHittingTile(CollisionDirection.Left)) {
        mySprite2.vx = 50
    }
    if (mySprite2.isHittingTile(CollisionDirection.Right)) {
        mySprite2.vx = -50
    }
})
