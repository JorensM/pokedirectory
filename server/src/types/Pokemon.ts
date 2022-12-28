//server/src/types/Pokemon.ts

import type Stats from "./Stats";

export default interface Pokemon {
    id: number,
    name: string,
    stats: Stats,
    abilities: Array<string>,
    types: Array<string>,
    views: number,
    favorites: number
}