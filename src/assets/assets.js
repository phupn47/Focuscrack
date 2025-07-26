import egg_home from './eggcrack_home.png'
import egg_crack1 from './eggcrack1.gif'
import egg_crack2 from './eggcrack2.gif'
import egg_crack3 from './eggcrack3.gif'
import alex from './monster_alex.gif'
import vendy from './monster_vendy.gif'
import sam from './monster_sam.gif'
import monster_unlock from './monster_unlock.png'

export const assets = {
    egg_home,
    egg_crack1,
    egg_crack2,
    egg_crack3,
    alex,
    vendy,
    sam,
    monster_unlock
}

export const eggs = [
    {
        id: 0,
        name: "Crack1",
        image: egg_crack1,
        min_percent: 0,
        max_percent: 49
    },
    {
        id: 1,
        name: "Crack2",
        image: egg_crack2,
        min_percent: 50,
        max_percent: 79
    },
    {
        id: 2,
        name: "Crack3",
        image: egg_crack3,
        min_percent: 80,
        max_percent: 100
    }
]

export const monsters = [
    {
        id: 0,
        name: "Alex",
        image: alex,
        chance: 50
    },
    {
        id: 1,
        name: "Vendy",
        image: vendy,
        chance: 40
    },
    {
        id: 2,
        name: "Sam",
        image: sam,
        chance: 10
    }
]