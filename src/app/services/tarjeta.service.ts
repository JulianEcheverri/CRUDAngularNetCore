import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TarjetaModel } from '../models/TarjetaModel';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private readonly myAppUrl: string = "https://localhost:44334/";
  private readonly myApiUrl: string = "api/tarjetadecredito/";
  tarjetasList: TarjetaModel[];
  // Variable para comunicar el componente tarjeta con el componente tarjetas list
  private actualizarFormulario = new BehaviorSubject<TarjetaModel>({} as any);

  constructor(private http: HttpClient) { }

  obtenerTarjetas() {
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).toPromise().then(data => {
      this.tarjetasList = data as TarjetaModel[];
    });
  }

  guardarTarjeta(tarjeta: TarjetaModel): Observable<TarjetaModel> {
    return this.http.post<TarjetaModel>(`${this.myAppUrl}${this.myApiUrl}`, tarjeta);
  }

  actualizarTarjeta(id:number, tarjeta: TarjetaModel): Observable<TarjetaModel> {
    return this.http.put<TarjetaModel>(`${this.myAppUrl}${this.myApiUrl}${id}`, tarjeta);
  }

  eliminarTarjeta(id: number): Observable<TarjetaModel> {
    return this.http.delete<TarjetaModel>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }


  actualizarTarjetaEnComponente(tarjeta: TarjetaModel) {
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjetaEnComponente(): Observable<TarjetaModel> {
    return this.actualizarFormulario.asObservable();
  }
}
