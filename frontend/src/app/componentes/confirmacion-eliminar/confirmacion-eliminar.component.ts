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
        console.log("De regreso en empresas.component.ts");
        //Estas lineas seccion para refrescar la pagina se obtuvo usando chatgpt
        this.router.navigateByUrl('/empresas', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
      }, (error) => {
        console.error(error);
      }
    )
  }

  cancelar() {

  }
}
