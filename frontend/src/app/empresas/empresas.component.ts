import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../servicios/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: any[] = []
  empresa_editable = {}
  id_eliminar: string = '';
  id_editar: string = '';

  constructor(private empresaService: EmpresaService) {
  }

  ngOnInit(): void {

    this.empresaService.consultar().subscribe(
      (response: any) => {
        console.log("De regreso en empresas.component.ts");
        this.empresas = response;
        this.empresas = this.empresas.sort((a, b) => a.name.localeCompare(b.name));
        if (this.empresas.length == 0) {
          const sin_empresas = document.getElementById("vacio")
          const con_empresas = document.getElementById("lista-empresas")
          if (sin_empresas) sin_empresas.style.display = "block"
          if (con_empresas) con_empresas.style.display = "none"
        }
      }, (error) => {
        console.error(error);
      }
    )

    this.initModal()
  }

  initModal() {

    const modal = document.getElementById("modal") as HTMLElement
    modal.onclick = function () {
      modal.style.display = 'none'
    }
    ////////////////////////////////////El segmento siguiente se obtuvo con chatgpt
    const modalContent = document.querySelector('.modal-content') as HTMLElement;
    if (modalContent) {
      modalContent.onclick = (event) => {
        event.stopPropagation();
      };
    }
  }

  async mostrar_modal(accion: string, id: string) {

    const elementos = {
      "nuevo": "modal-nuevo",
      "editar": "modal-editar",
      "eliminar": "modal-confirmacion"
    }

    const ocultos = ['nuevo', 'editar', 'eliminar'].filter(val => val != accion)

    for (let acc of ocultos) {
      let modal = elementos[acc as keyof typeof elementos]; // linea obtenida de chatgpt para acceder a atributo de objeto con llave
      if (document.getElementById(modal)) (document.getElementById(modal) as HTMLElement).style.display = 'none'

    }

    let visible = elementos[accion as keyof typeof elementos];


    if (accion == 'editar') {
      this.id_editar = id
      await this.consulta()
    }
    if (accion == 'eliminar')
      this.id_eliminar = id;

    let modal_visible = document.getElementById(visible)
    if (modal_visible) modal_visible.style.display = 'block'

    const modal = document.getElementById("modal") as HTMLElement
    if (modal) modal.style.display = 'block'

  }

  consulta(): Promise<void> {

    return new Promise((resolve, reject) => {
      this.empresaService.consultar_id(this.id_editar).subscribe(
        (response: any) => {
          this.empresa_editable = response;
          document.getElementById("nombre")?.setAttribute("value", response.nombre);
          document.getElementById("constitucion")?.setAttribute("value", response.constitucion);
          document.getElementById("tipo")?.setAttribute("value", response.tipo);
          document.getElementById("comentarios")?.setAttribute("value", response.comentarios);

          const favoritaCheckbox = document.getElementById("favorita") as HTMLInputElement | null;
          if (favoritaCheckbox) {
            favoritaCheckbox.checked = response.favorita === true;
          }

          resolve();  // Resuelve la promesa después de completar
        },
        (error) => {
          console.error(error);
          reject(error);  // Rechaza la promesa en caso de error
        }
      );
    });
  }
}
