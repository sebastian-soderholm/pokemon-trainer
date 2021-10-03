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

    private checkUser(username: NgForm | string ): Observable<User[]> {
        return this.http.get<User[]>(`${apiURL}/trainers?username=${username}`)
    }

    private createUser(username: NgForm): Observable<User> {
        const headers = new HttpHeaders({
        'x-api-key': apiKey
        })
        return this.http.post<User>(`${apiURL}/trainers`, { username, pokemon:[] }, { headers })
    }

    public handleLogin(username: NgForm, onSuccess: () => void): void {
        this.tryingToLog = true
        this.checkUser(username)
        .pipe(
            switchMap((users: User[]) => {
            if (users.length)
                return of(users[0])

            return this.createUser(username)
            }),
            tap(user => this.sessionService.setUser(user)),
            catchError((user: User) => throwError(`Could not create ${user}`)),
            finalize(() => this.tryingToLog = false)
        )
        .subscribe(
                    (user: User) => { // Success
                        if(user.id)
                           onSuccess()
                    },
                    (error: string) => { // error
                        this.error = error;
                    }
                )
    }

}