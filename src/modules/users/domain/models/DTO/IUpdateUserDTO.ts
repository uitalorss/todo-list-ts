export interface IUpdateUserDTO {
    id: string;
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
}
