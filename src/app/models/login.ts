export class Login {
    username: string;
    password: string;
    openstackServerIp: string;
    port: string;
    tenant: string;
    isLiberty: boolean;

    constructor(username: string, password: string, openstackServerIp: string, port: string, tenant: string, isLiberty: boolean) {
        this.username = username;
        this.password = password;
        this.openstackServerIp = openstackServerIp;
        this.port = port;
        this.tenant = tenant;
        this.isLiberty = isLiberty;
    }
}