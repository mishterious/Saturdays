import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() myID;
  _id: any;
  rest: any;
  name: any;
  error: any;
  reviews: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.rest = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.restByID(this._id);
  }

  restByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.rest = data;
      console.log(this.rest);
    })
  }

  deleteByID(_id){
    let tempObservable = this._httpService.deleteByID(_id);
    tempObservable.subscribe(data => {
      console.log(data+ "345678765432123456789765432");
    })
    this._router.navigate(['/all']);
  }
}
