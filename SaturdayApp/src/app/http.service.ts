import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  all(){
    return this._http.get('/all');
  }

  by(id){
      return this._http.get('/by/'+id);
  }

  byName(name){
      return this._http.get('/byName/'+name);
  }

  create(rest){
      return this._http.post('/create', rest);
  }

  edit(id, newTask){
      console.log("====================================")
      console.log(newTask);
      return this._http.post('/edit/'+id, newTask);
  }

  deleteByID(id){
      return this._http.delete('/delete/'+id);
  }

  addReview(id, reviews){
      return this._http.put('/addReview/'+id, reviews);
  }

}
