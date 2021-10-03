import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../models/user.models";

const apiURL = 'https://noroff-assignment-api-lit.herokuapp.com'

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private _user: User | undefined;
    public loggedIn: boolean = false;

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
        ) {

        const storedUser = localStorage.getItem('user')
        if(storedUser) {
            this._user = JSON.parse(storedUser) as User;
            this.checkUser(this._user.username)
            this.loggedIn = true;
        }
    }

    private async checkUser(username: string ) {
        await this.http.get<User[]>(`${apiURL}/trainers?username=${username}`)
            .subscribe(
                (user) => {
                    if(user.length) {
                        this.loggedIn = true;
                    }
                    else {
                        this.logout();
                    }
                }
            )
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
        this.router.navigate(['start'])
    }
}
