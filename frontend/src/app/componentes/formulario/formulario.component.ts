import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnChanges {


  @Input() id_editar: string = '';

  constructor(private empresaService: EmpresaService) { }

  empresa = {
    id: '',
    tipo: '',
    nombre: '',
    favorita: false,
    comentarios: '',
    constitucion: ''
  }
  mensaje: string = ''
  esVisible: boolean = true
  titulo:string = ''

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id_editar'] && !changes['id_editar'].isFirstChange()) {
      if (this.id_editar === "-1") {
        this.titulo = 'Alta de empresa'
        this.reset();
      } else {
        this.titulo = 'Editar empresa'
        this.consulta();
      }
    }
  }


  guardar() {
    this.empresa.id = this.id_editar
    this.id_editar == "-1" ? this.agregar() : this.editar();
  }

  agregar() {

    const { id, ...nuevaEmpresa } = this.empresa

    const titulo = document.getElementById("titulo")
    const formulario = document.getElementById("formulario")
    const boton = document.getElementById("submit-button")

    const exito = document.getElementById("exito")
    const error = document.getElementById("error")


    console.log(this.validar())

    if (this.validar()) {
      this.empresaService.agregar(nuevaEmpresa).subscribe(
        response => {
          console.log(response)

          if (titulo) titulo.style.display = "none"
          if (formulario) formulario.style.display = "none"
          if (boton) boton.style.display = "none"

          if (response.status == 200) {

            if (exito) {
              exito.innerHTML = "Empresa creada exitosamente"
              if (titulo) titulo.style.display = "none";
              if (formulario) formulario.style.display = "none";
              if (boton) boton.style.display = "none";
              exito.style.display = "block"
            }

            this.reset()

          } else {
            if (error) {
              error.innerHTML = "Error al editar empresa"
              error.style.display = "block"
            }
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

  editar() {

    console.log(this.validar())
    if (this.validar()) {
      this.empresaService.editar(this.empresa).subscribe(
        response => {
          console.log(response)

          this.mensaje = response.status == 200 ? "Empresa editada exitosamente" : "Error al editar empresa";

          this.esVisible = !this.esVisible

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        },
        error => {
          console.error('Error al editar la empresa:', error);
        }
      );
    } else {
      alert("Por favor rellene los campos marcados con (*)")
      return
    }
  }

  consulta() {
    this.empresaService.consultar_id(this.id_editar).subscribe(
      (response: any) => {
        console.log('respuesta', response)
        if (response.status == 200) {
          this.empresa = response.data;
          console.log("Se pudo consultar la empresa", this.empresa)
        } else {
          console.log(response.mensaje)
        }
      },
      (error) => {
        console.error("hubo un error", error);
      }
    );
  }


  reset() {
    this.empresa = {
      id: '',
      tipo: '',
      nombre: '',
      favorita: false,
      comentarios: '',
      constitucion: ''

    }
  }

  validar() {
    return ((document.getElementById("tipo") as HTMLInputElement).value != ''
      && (document.getElementById("nombre") as HTMLInputElement).value != ''
      && (document.getElementById("constitucion") as HTMLInputElement).value != '')
  }
}
