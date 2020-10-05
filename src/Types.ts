export type DbPost = {
    caption?: string,
    date: number,
    image: string,
    postedBy: string,
    likedBy: {},
    comments: DbComment[],
    id: string,
};

export type DbComment = {
    text: string,
    postedBy: string
}

// TODO save dbuser to db
export type DbUser = {
    uid: string,
    photoURL: string,
    displayName: string
}