import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ListParticipantsResponse, Participant } from "../model/participant.model";

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.participant;

  constructor(private http: HttpClient) {}

  createParticipant<T>(request: any): Observable<any> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }

  getParticipantById(id: string): Observable<any> {
    return this.http.get<Participant>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }

  updateParticipant<T>(id: string, request: FormData): Observable<any> {
    return this.http.patch<T>(`${this.apiUrl}/${this.endpoints.base}/${id}`, request, { withCredentials: true });
  }

  deleteParticipant(id: string): Observable<any> {
    return this.http.delete<Participant>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }

  listParticipants(page: number = 1, size: number = 10): Observable<ListParticipantsResponse> {
    return this.http.get<ListParticipantsResponse>(`${this.apiUrl}/${this.endpoints.list}?page=${page}&size=${size}`, { withCredentials: true });
  }

  getFile({ id }: { id: string; }, fileName: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.apiUrl}/participants/${id}/${fileName}`, { withCredentials: true });
  }

  getFoto(id: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.apiUrl}/participants/${id}/foto`, { withCredentials: true });
  }

  getQrCode(id: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.apiUrl}/participants/${id}/qr-code`, { withCredentials: true });
  }

  downloadIdCard(id: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${this.endpoints.base}/${id}/${this.endpoints.download_id_card}`, {
      withCredentials: true,
      responseType: 'blob' as 'json' // Set response type to 'blob'
    });
  }

  viewIdCard(id: string): Observable<string> {
      return this.http.get<string>(`${this.apiUrl}/${this.endpoints.base}/${id}/${this.endpoints.id_card}`, {
          responseType: 'text' as 'json', // Mengatur responseType ke 'text'
          withCredentials: true
      });
  }

  searchParticipant(q: string, page: number = 1, size: number = 10): Observable<ListParticipantsResponse> {
    return this.http.get<ListParticipantsResponse>(
      `${this.apiUrl}/${this.endpoints.search}?q=${q}&page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }
}
