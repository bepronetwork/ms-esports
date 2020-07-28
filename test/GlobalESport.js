class GlobalESport {
    constructor(){
        this.user  = {};
        this.admin = {};
        this.app   = {};
    }

    getUser() {
        return this.user;
    }
    getAdmin() {
        return this.admin;
    }
    getApp() {
        return this.app;
    }

    setUser(user) {
        this.user = user;
    }
    setAdmin(admin) {
        this.admin = admin;
    }
    setApp(app) {
        this.app = app;
    }
}

const GlobalESportSingleton = new GlobalESport();
export {GlobalESportSingleton};