import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/Rx";

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

    private sid: string;
    public display_name: string;
    public email: string;
    public pid :string;
    public entries: Array<any>;
    private host: string;

    public constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
        this.entries = [];
    }

    public ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.sid = params["sid"];
            this.pid = params["pid"];
            this.display_name = params["display_name"];
            this.email = params["email"];
            let headers = new Headers({ "authorization": "Bearer " + params["sid"] });
            let options = new RequestOptions({ headers: headers });
            this.http.get("https://alycante-e1ecf.appspot.com/blogs", options)
                .map(result => result.json())
                .subscribe(result => {
                    this.entries = result;
                });
        });
        this.host = "https://alycante-e1ecf.appspot.com";
        //this.host = "http://localhost:8080";
    }

    public create() {
        this.router.navigate(["/blog"], { "queryParams": { "sid": this.sid, "display_name": this.display_name, "email": this.email } });
    }

    public edit(i) {
        this.router.navigate(["/blog"], 
        { "queryParams": { "sid": this.sid, "display_name": this.display_name, "email": this.email, "blog": JSON.stringify(this.entries[i]) } });
    }

    public delete(pid) {
        let headers = new Headers({
            "content-type": "application/json",
            "authorization": "Bearer " + this.sid
        });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.host+"/delete", {"pid": pid, "type": "blog"}, options)
            .map(result => result.json())
            .subscribe(result => {
                this.ngOnInit();
            });
    }

        public deleteAccount(pid) {
        let headers = new Headers({
            "content-type": "application/json",
            "authorization": "Bearer " + this.sid
        });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.host+"/delete", {"pid": pid, "type": "account"}, options)
            .map(result => result.json())
            .subscribe(result => {
                this.router.navigate(["/login"]);
            });
    }
    

}