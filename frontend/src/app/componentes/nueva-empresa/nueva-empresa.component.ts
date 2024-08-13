import { Component, OnInit } from '@angular/core';
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

  validar() {
    return ((document.getElementById("ntipo") as HTMLInputElement).value != ''
      && (document.getElementById("nnombre") as HTMLInputElement).value != ''
      && (document.getElementById("nconstitucion") as HTMLInputElement).value != '')
  }

  agregar() {

    this.nueva_empresa.tipo = (document.getElementById("ntipo") as HTMLInputElement).value;
    this.nueva_empresa.nombre = (document.getElementById("nnombre") as HTMLInputElement).value;
    this.nueva_empresa.favorita = (document.getElementById("nfavorita") as HTMLInputElement).checked;
    this.nueva_empresa.comentarios = (document.getElementById("ncomentarios") as HTMLInputElement).value;
    this.nueva_empresa.constitucion = (document.getElementById("nconstitucion") as HTMLInputElement).value;

    const titulo = document.getElementById("ctitulo")
    const exito = document.getElementById("cexito")
    const formulario = document.getElementById("cformulario")
    const boton = document.getElementById("csubmit-button")
    const error_crear = document.getElementById("error-crear")

    console.log(this.validar())
    if (this.validar()) {
      this.empresaService.agregar(this.nueva_empresa).subscribe(
        response => {
          console.log(response)
          if (response.status == 200) {
            console.log(titulo, formulario, boton, exito)
            if (titulo) titulo.style.display = "none"
            if (formulario) formulario.style.display = "none"
            if (boton) boton.style.display = "none"
            if (exito) exito.style.display = "block"
          } else {
            if (titulo) titulo.style.display = "none"
            if (formulario) formulario.style.display = "none"
            if (boton) boton.style.display = "none"
            if (error_crear) error_crear.style.display = "block"
          }
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        },
        error => {
          console.error('Error al agregar la empresa:', error);
        }
      );
    } else {
      alert("Por favor rellene los campos marcados con (*)")
      return
    }
  }
}
