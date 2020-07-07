import { environment } from './../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Embark } from './shipped.model';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmbarkService {

  private readonly baseUrl = `${environment.API}embark`;  

  private _embarkLast: Embark;
  public get embarkLast(): Embark {
    return this._embarkLast;
  }
  public set embarkLast(value: Embark) {
    this._embarkLast = value;
  }

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'] 
    })
  }

  

  create(embark: Embark): Observable<Embark> {
    return this.http.post<Embark>(this.baseUrl, embark).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Embark[]> {
    const url = `${this.baseUrl}?_sort=shipmentEnd&_order=desc`
    return this.http.get<Embark[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Embark> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Embark>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  last(id: number): Observable<Embark> {
    const url = `${this.baseUrl}?employeeId=${id}&_sort=shipmentEnd&_order=desc&_limit=1`
    return this.http.get<Embark>(url).pipe(
      map(obj => obj[0]),
      catchError(e => this.errorHandler(e))
    )
  }

  filter(id: number): Observable<Embark[]> {
    const url = `${this.baseUrl}?employeeId=${id}&_sort=shipmentEnd&_order=desc`
    return this.http.get<Embark[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(embark: Embark): Observable<Embark> {
    const url = `${this.baseUrl}/${embark.id}`
    return this.http.put<Embark>(url, embark).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}
