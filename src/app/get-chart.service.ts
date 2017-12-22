import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import * as io from 'socket.io-client';

@Injectable()
export class GetChartService {

  private socketUrl = 'https://stock-market-app-ramiel6.c9users.io';
  private socket;
 constructor(private http: HttpClient) { }
  
  
  // private apiUrl = '/api/get-stocks';
  public log:string
      /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', 
                            apiUrl , 
                            fromServer = false, 
                            msg:string = 'Something went wrong!' , 
                            result?: T
                            ) {
      return (error: any): Observable<T> => {
      //https://stackoverflow.com/questions/35326689/how-to-catch-exception-correctly-from-http-request
      let errMsg = `error in ${operation}() retrieving ${apiUrl}`;
        // console.error(error); // log to console instead
        console.log(`${errMsg}:`, error)

          if(error instanceof HttpErrorResponse) {
                // you could extract more info about the error if you want, e.g.:
                // console.log(`status: ${error.status}, ${error.statusText}`);
                errMsg = fromServer? error.error.msg : msg
            }
        // Let the app keep running by returning an empty result.
        // return of(result as T);
        return Observable.throw(errMsg);
      };
    }
    
  
  
  /** GET Charts from the server */
    getChartData (): Observable<any> {
      let apiUrl = '/api/get-stocks'
      return this.http.get<any>(apiUrl)
        .pipe(
          tap(data => console.log('got data')),
          catchError(this.handleError('getChartData', apiUrl))
        );
    }
    updateChart() { let observable = new Observable(observer => { 
      this.socket = io(this.socketUrl); 
      this.socket.on('update-chart', (data) => { 
        console.log({client:data})
        observer.next(); 
      }); return () => { 
        this.socket.disconnect();
      }; 
    }) 
    return observable; } 
     /** Add Stock */
    addStock (addValue:string): Observable<any> {
      let apiUrl = '/api/add-stock'
      return this.http.post<any>(apiUrl, {stockInput:addValue})
        .pipe(
          tap(data => {
            console.log('stock add')
            return this.socket.emit('update-chart', 'Update Chart');
          }),
          catchError(this.handleError('addStock', apiUrl,true))
        );
    }
    
    removeStock (pill:string): Observable<any> {
      let apiUrl = '/api/remove-stock'
      return this.http.post<any>(apiUrl, {stockRemove:pill})
        .pipe(
          tap(data => {
            console.log('stock removed')
            return this.socket.emit('update-chart', 'Update Chart');
          }),
          catchError(this.handleError('removeStock', apiUrl))
        );
    }
}
