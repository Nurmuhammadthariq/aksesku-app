export interface CredentialDto {
    username: string
    password: string
}

export interface LoginResultDto {
    token: string
}

export interface UserIdentityDto {
    id: string
    username: string
    fullName: string
    isAsesor?: boolean
    thumbnail?: string
}
