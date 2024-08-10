import { Component } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.css']
})
export class NuevaEmpresaComponent {

  nueva_empresa = {
    tipo: '',
    nombre: '',
    favorita: false,
    comentarios: '',
    constitucion: ''
  }

  constructor(
    private empresaService: EmpresaService) {
  }
  agregar() {
    this.nueva_empresa.tipo = (document.getElementById("ntipo") as HTMLInputElement).value;
    this.nueva_empresa.nombre = (document.getElementById("nnombre") as HTMLInputElement).value;
    this.nueva_empresa.favorita = (document.getElementById("nfavorita") as HTMLInputElement).checked;
    this.nueva_empresa.comentarios = (document.getElementById("ncomentarios") as HTMLInputElement).value;
    this.nueva_empresa.constitucion = (document.getElementById("nconstitucion") as HTMLInputElement).value;

    this.empresaService.agregar(this.nueva_empresa).subscribe(
      response => {
        console.log('Empresa agregada:', response);
      },
      error => {
        console.error('Error al agregar la empresa:', error);
      }
    );
  }
}
