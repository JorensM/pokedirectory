//server/src/types/User.ts

import type Pokemon from "./Pokemon";

export default interface User {
    username: string,
    favorites: Array<Pokemon>
}