import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { Observable, of, throwError } from "rxjs";
import { User } from "../models/user.models";
import { SessionService } from "./session.service";
import { catchError, finalize, switchMap, tap } from "rxjs/operators";

const apiURL = 'https://noroff-assignment-api-lit.herokuapp.com'
const apiKey = "ByvuHqRoCVXC9G9Z06xa3ec9rDXYgZyJZRDXJ9k3arjVxy2AuUXX6c34Z2dgnlx2";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    public tryingToLog: boolean = false;
    public error: string = '';

    constructor(private readonly http: HttpClient, private sessionService: SessionService){}

    // GET fetch to check if user is in API
    private checkUser(username: NgForm | string ): Observable<User[]> {
        return this.http.get<User[]>(`${apiURL}/trainers?username=${username}`)
    }

    // POST request to create new user
    private createUser(username: NgForm): Observable<User> {
        const headers = new HttpHeaders({
        'x-api-key': apiKey
        })
        return this.http.post<User>(`${apiURL}/trainers`, { username, pokemon:[] }, { headers })
    }

    // Checks first if user exists in API, if not creates new user
    public handleLogin(username: NgForm, onSuccess: () => void): void {
        this.tryingToLog = true
        // Checks if user already in API
        this.checkUser(username)
        .pipe(
            switchMap((users: User[]) => {
            // If users exists returns user 
            if (users.length)
                return of(users[0])
            
            // New user is created if user is not it API, returns created user
            return this.createUser(username)
            }),
            // Sets returned user from GET/POST call
            tap(user => this.sessionService.setUser(user)),
            catchError((user: User) => throwError(`Could not create ${user}`)),
            finalize(() => this.tryingToLog = false)
        )
        .subscribe(
                    (user: User) => {
                        // On success returns void function
                        if(user.id)
                           onSuccess()
                    },
                    (error: string) => {
                        // On error set error
                        this.error = error;
                    }
                )
    }

}