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
        // Checks if user exists in local storage, if user
        // exist function checks also if user still exists in API. This is
        // because API empties itself periodically and user might still
        // exist in browsers memory but not in API. If user exists in both
        // user data is parsed from local storage
        const storedUser = localStorage.getItem('user')
        if(storedUser) {
            this._user = JSON.parse(storedUser) as User;
            this.checkUser(this._user.username)
        }
    }

    // Helper function that checks if user from local storage still exists in API,
    // if user exists user is marked as logged in, else function calls helper
    // function logout that deletes users data from local storage and redirects
    // user to the front page to sign in again
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

    // Returns private variable: user
    get user(): User | undefined {
        return this._user;
    }

    // On log in function sets user and and saves data also to local storage
    setUser (user: User): void {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user))
        this.loggedIn = true;
    }

    // Log out function that empties user, set logged in to false and redirects
    // user to the start page
    logout() {
        this._user = undefined;
        localStorage.removeItem('user')
        this.loggedIn = false;
        this.router.navigate(['start'])
    }
}
