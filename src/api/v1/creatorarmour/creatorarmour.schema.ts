type CreatedWorkType = {
    [key: string]: any;
};

export interface CreatedWork extends CreatedWorkType {
    image : string,
    creatorId : string,
    nameOfWork : string,
    medium : string,
    altMedium?: string
    timeStamp : string,
    license : string
}