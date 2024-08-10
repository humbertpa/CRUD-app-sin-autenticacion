import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  consultar() {
    console.log("=========================Entro a consultar en empresa.service");
    return this.httpClient.get('http://localhost:3000' + '/consultar');
  }

  agregar(empresa: any): Observable<any> {
    console.log("=========================Entro a agregar en empresa.service");
    return this.httpClient.post('http://localhost:3000/alta', empresa, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  editar(empresa: any): Observable<any> {
    console.log("=========================Entro a agregar en empresa.service");
    return this.httpClient.put('http://localhost:3000/editar', empresa, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  consultar_id(id: string) {
    console.log("=========================Entro a consultar con id en empresa.service");
    return this.httpClient.get('http://localhost:3000' + '/consultar/' + id);
  }

  eliminar(id: string) {
    console.log("=========================Entro a eliminar en empresa.service");
    return this.httpClient.delete('http://localhost:3000' + '/baja/' + id);
  }
}