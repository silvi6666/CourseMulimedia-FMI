export default class BlogPost {
    constructor(
        public id: string,
        public date: Date,
        public title: string,
        public author: string,
        public text: number,
        public tags: string[],
        public status: Status = Status.Active,
        public imageURL?: string
    ) {}
}

export enum Status {
    Active, Inactive
}

