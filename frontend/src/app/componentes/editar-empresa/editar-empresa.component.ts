import { Component, Input, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {

  empresa_editable = {
    id:'',
    tipo: '',
    nombre: '',
    favorita: false,
    comentarios: '',
    constitucion: ''
  }
  
  @Input() id_editar: string = '';

  constructor(private empresaService: EmpresaService) {
  }

  editar() {
    console.log(`editar empresa \n el id de la empresa es ${this.id_editar}`)
    this.empresa_editable.id = this.id_editar
    this.empresa_editable.tipo = (document.getElementById("tipo") as HTMLInputElement).value;
    this.empresa_editable.nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    this.empresa_editable.favorita = (document.getElementById("favorita") as HTMLInputElement).checked;
    this.empresa_editable.comentarios = (document.getElementById("comentarios") as HTMLInputElement).value;
    this.empresa_editable.constitucion = (document.getElementById("constitucion") as HTMLInputElement).value;

    console.log("empresa editada ", this.empresa_editable)

    this.empresaService.editar(this.empresa_editable).subscribe(
      response => {
        console.log('Empresa editada:', response);
      },
      error => {
        console.error('Error al editar la empresa:', error);
      }
    );
  }
}
