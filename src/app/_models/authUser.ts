export class AuthUser {
    username: string;
    token: string;
    vitrageUrl: string;
    tokenValidUntil?: Date;


    constructor(username: string, token: string, vitrageUrl: string, tokenValidUntil?: Date) {
        this.username = username;
        this.token = token;
        this.vitrageUrl = vitrageUrl;
        this.tokenValidUntil = tokenValidUntil;        
    }
}