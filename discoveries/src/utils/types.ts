// export interface Substance {
//     id: number,
//     name: string,
//     description: string,
//     status: number,
//     image: string
// }
export interface Pioneer {
    id: number,
    name: string,
    description: string,
    status: number,
    image: string,
    date_birthday: string,
    date_death: string
}
export interface User {
    id: number,
    name: string,
    email: string
}

// export interface Cosmetic {
//     id: number,
//     status: number,
//     owner: User,
//     moderator: User,
//     date_created: string,
//     date_formation: string,
//     date_complete: string,
//     name: string,
//     description: string,
//     clinical_trial: number
// }

export interface Discovery {
    id: number,
    status: number,
    pioneers:number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    description: string,
    verify: number,
    year:number
}


export interface Option {
    id: number,
    name: string
}