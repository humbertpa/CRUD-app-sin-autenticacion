import { Component, Input, OnInit } from '@angular/core';
import { every } from 'rxjs';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {

  empresa_editable = {
    id: '',
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

    const titulo = document.getElementById("etitulo")
    const exito = document.getElementById("eexito")
    const formulario = document.getElementById("eformulario")
    const boton = document.getElementById("esubmit-button")
    const error_guardar = document.getElementById("error-guardar")

    this.empresaService.editar(this.empresa_editable).subscribe(
      response => {
        console.log(response)
        if (response.status == 200) {
          console.log(response.mensaje);
          if (exito) exito.style.display = "block";
          if (titulo) titulo.style.display = "none";
          if (formulario) formulario.style.display = "none";
          if (boton) boton.style.display = "none";
        } else {
          if (titulo) titulo.style.display = "none";
          if (formulario) formulario.style.display = "none";
          if (boton) boton.style.display = "none";
          if (error_guardar) error_guardar.style.display = "block"
        }

        ///////////////////////se uso chatgpt para el setTimeout para establecer un tiempo de espera durante
        /////////////////////// el cual se vera el aviso de confirmacion de eliminacion exitosa
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      },
      error => {
        console.error('Error al editar la empresa:', error);
      }
    );
  }
}
