import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  _id: any;
  error: any;
  product: any;
  newID; 

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.product = { name: " ", quantify: "", price: ""};
    this._route.params.subscribe((params: Params) => this._id = params['id']);
  }


  onSubmit() {
    if(this.product.name.length < 3 || this.product.quantity < 2 || this.product.price.length < 1){ 
      this.error = "You need to tell us more";
    }
    else{
      this.newID = Math.floor(Math.random() * 100)+1;
      this.product.manage_id = this.newID;
      console.log(this.newID)
      let tempObservable = this._httpService.create(this.product)
      tempObservable.subscribe(data => {
        console.log(data);
        if((data as any).message == "Unique Error"){
          this.error = data["error"];
        }
        else if((data as any).message == "Error"){
          // console.log("See this particular user", data );
          this.error = data["error"];
          console.log("==========32454321345=======================" + data)
          console.log(this.error);
        }
        else{
          console.log("37489032479824")
          console.log(data['data']);
          this._router.navigate(['/all']); 
        }
      }); 
    }  
  }

  // addReview(_id, data) {

  //     if(data.stars == "5"){
  //       data.stars = 5;
  //     }
  //     else if(data.stars == "4"){
  //       data.stars = 4;
  //     }
  //     else if(data.stars == "3"){
  //       data.stars = 3;
  //     }
  //     else if(data.stars == "2"){
  //       data.stars = 2;
  //     }
  //     else{
  //       data.stars = 1;
  //     }
  //   console.log("WERE EHR!!!!!!!!!++++++++++++")
  //   console.log(_id)
  //   console.log(data)
  //   console.log(data.stars)
  //   console.log(data.review);
  //   console.log("WERE EHR!!!!!!!!!++++++++++++")

  //     this.message = { name: data.name, stars: data.stars, review: data.review };
  //     console.log(this.message);
  //     let tempObservable = this._httpService.addReview(_id, this.message)
  //     tempObservable.subscribe(data => {
  //       // console.log("See this particular user", data );
  //       this.error = data;
  //       console.log("==========32454321345=======================" + data)
  //       console.log(this.error);
        
  //     })
  //     this._router.navigate(['/all']); 
  // }
}
