import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import "rxjs/Rx";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public input: any;
    public accounts: any;
    private host: string;

    constructor(private http: Http, private router: Router) {
        this.input = {
            "email": "",
            "password": ""
        };
      this.accounts = [];
      this.host = "https://alycante-e1ecf.appspot.com";
      //this.host = "http://localhost:8080";
    }
  
    public ngOnInit() {
            this.http.get(this.host+"/query/accounts")
                .map(result => result.json())
                .subscribe(result => {
                    this.accounts = result;
                    console.log(this.accounts);
                });
       
    }

    public login() {
        if(this.input.email && this.input.password) {
            let headers = new Headers({ "content-type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.host+"/login", JSON.stringify(this.input), options)
                .map(result => result.json())
                .subscribe(result => {
                    this.router.navigate(["/blogs"], { "queryParams": result });
                });
        }
    }

    public	itemTapped(event, item) {
		this.input.email = item.email;
	}

}