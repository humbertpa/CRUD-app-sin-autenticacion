import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-confirmacion-eliminar',
  templateUrl: './confirmacion-eliminar.component.html',
  styleUrls: ['./confirmacion-eliminar.component.css']
})
export class ConfirmacionEliminarComponent {
  @Input() id_eliminar: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) { }

  eliminar() {
    console.log(`eliminar empresa \nel id de la empresa es ${this.id_eliminar}`)
    /////////////Esto se debe eliminar y colocar en el boton de eliminar
    this.empresaService.eliminar(this.id_eliminar).subscribe(
      (response: any) => {
        const pregunta = document.getElementById("pregunta")
        const confirmacion = document.getElementById("confirmacion")
        const botones = document.getElementById("botones")
        const error_eliminar = document.getElementById("error-eliminar")
        if (response.status == 200) {
          console.log("Se elimino la empresa");
          if (pregunta) pregunta.style.display = "none";
          if (botones) botones.style.display = "none";
          if (confirmacion) confirmacion.style.display = "block";

        } else {
          if (pregunta) pregunta.style.display = "none";
          if (botones) botones.style.display = "none";
          if (error_eliminar) error_eliminar.style.display = "block";
        }
        ///////////////////////se uso chatgpt para el setTimeout para establecer un tiempo de espera durante
        /////////////////////// el cual se vera el aviso de confirmacion de eliminacion exitosa
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }, (error) => {
        console.error(error);
      }
    )
  }

  cancelar() {
    window.location.reload();
  }
}
