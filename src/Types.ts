export type DbPost = {
    caption?: string,
    date: number,
    image: string,
    postedBy: string,
    likedBy: string[],
    id: string,
};

// TODO save dbuser to db
export type DbUser = {
    uid: string,
    photoURL: string,
    displayName: string
}