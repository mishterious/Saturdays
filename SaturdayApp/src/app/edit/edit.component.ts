import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() myID;
  _id: any;
  product: any;
  name: any;
  error: any;
  editor: any;


  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.product = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.restByID(this._id);
  }

  restByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.product = data;
      console.log(this.product);
    })
  }

  edit() {

    console.log(this.product);
    // this.editor = { name: this.product.name, stars: this.mystar, review: this.rest.review };
      console.log(this.product);

    let tempObservable = this._httpService.edit(this.product._id, this.product)
    tempObservable.subscribe(data => {
      this.product = data;
    });
    this._router.navigate(['/all']);  
  }
}
