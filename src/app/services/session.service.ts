import { Injectable } from "@angular/core";
import { User } from "../models/user.models";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private _user: User | undefined;
    public loggedIn: boolean = false;

    constructor() {
        const storedUser = localStorage.getItem('user')
        if(storedUser) {
            this._user = JSON.parse(storedUser) as User;
            this.loggedIn = true;
        }
    }

    get user(): User | undefined {
        return this._user;
    }

    setUser (user: User): void {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user))
        this.loggedIn = true;
    }

    logout() {
        this._user = undefined;
        localStorage.removeItem('user')
        this.loggedIn = false;
    }
}