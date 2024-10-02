import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { CurriculumSyllabusRequest } from "../model/curriculum-syllabus.model";

@Injectable({
  providedIn: 'root'
})
export class CurriculumSyllabusService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = environment.endpoints.curriculumSyllabus;

  createCurriculumSyllabus(request: CurriculumSyllabusRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }
}