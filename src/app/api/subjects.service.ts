import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { toPromise } from 'rxjs/operator/toPromise';

const BACKEND= "http://localhost:3000";

@Injectable()
export class SubjectsService {
  allSubs: Subject[];
  subToSave: newSubSave;
  userSubs: Subject[];
  constructor(private ajaxTruc: HttpClient) { }
  
  getSubjectsList(groupId) {
    return this.ajaxTruc
      .get(`${BACKEND}/group/${groupId}`)
      .toPromise();
  }

  getSubDetails(subjectId){
    return this.ajaxTruc 
      .get(`${BACKEND}/subject/${subjectId}`)
      .toPromise()
  }

  getSubs(userId){
    return this.ajaxTruc
    .get(`${BACKEND}/subject/user-subs/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.userSubs = apiResponse;
      return apiResponse;
    })
  }

  deleteThisSub(subId, userId){
    return this.ajaxTruc
    .put(`${BACKEND}/subject/subs-of-the-user/${userId}/gr/${subId}`, {new: true})
    .toPromise()
    .then((apiResponse: Subject[])=>{
      this.userSubs = apiResponse;
      return apiResponse;
    })
  }

  newSub(subCred: NewSubject){
    return this.ajaxTruc
    .post(`${BACKEND}/subject/new-subject`,
    subCred,
    {withCredentials: true})
    .toPromise()
    .then((apiResponse:any)=>{  
      this.subToSave = apiResponse;
      console.log(apiResponse)
      return apiResponse;
    })
  }

  getSubInfo(subId){
    return this.ajaxTruc
    .get(`${BACKEND}/subject/${subId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.subToSave = apiResponse;
      console.log(apiResponse)
      return apiResponse;
    })
  }

  getAllTheSubjects(){
    return this.ajaxTruc
    .get(`${BACKEND}/subject/all-subjects`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.allSubs = apiResponse;
      return apiResponse;
    })
  }

  // getThisSub(subId){
  //   return this.ajaxTruc
  //   .
  // }
}

export class Subject {
  _id: string;
  cards: Card[];
  name: string; 
  keyword: string;
}

export class Card {
  _id: string;
  front: string;
  back: string;
}

export class NewSubject{
  name: string;
  admin: string;
  cards: Array<any>
}

export class newSubSave{
  _id: string;
  name: string;
  admin: string;
  cards: Array<any>
}

export class chooseSub{
  name: string
}