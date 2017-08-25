import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import "rxjs/Rx";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    private sid: string;
    public display_name: string;
    public email: string;
    public input: any;
    public id: string;
    public label: any;
    private host: string;
        

    public constructor(private http: Http, private router: Router, private route: ActivatedRoute, private location: Location) {
        this.input = {
            "title": "",
            "content": "",
            "image_url":"",
            "id": ""
        };
        this.host = "https://alycante-e1ecf.appspot.com";
        //this.host = "http://localhost:8080";
        this.label ={"title": "New", "button":"Save"};
    }

    public ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.sid = params["sid"];
            this.display_name = params["display_name"];
            this.email = params["email"];
            if (params["blog"]) {
                this.input = JSON.parse(params["blog"]);
                delete this.input.type, delete this.input.timestamp; 
            }
        });
        if (this.input.id) {
            this.label.title="Edit", this.label.button="Update"}
    }

    public save() {
        if(this.input.title && this.input.content) {
            let headers = new Headers({
                "content-type": "application/json",
                "authorization": "Bearer " + this.sid
            });
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.host+"/blog", JSON.stringify(this.input), options)
                .map(result => result.json())
                .subscribe(result => {
                    this.location.back();
                });
        }
    }

    public navigator(par) {
        this.location.back();
        //this.router.navigate(["/blogs"], { "queryParams": { "sid": this.sid, "display_name": this.display_name } });
    }

}