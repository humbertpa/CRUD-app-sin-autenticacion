import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../servicios/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: any[] = []
  empresa = {
    "id": '',
    "tipo": '',
    "nombre": '',
    "favorita": false,
    "comentarios": '',
    "constitucion": ''
  }
  id_eliminar: string = '';
  id_editar: string = '';
  error_editar: boolean = false;

  constructor(private empresaService: EmpresaService) {
  }

  ngOnInit(): void {

    const sin_empresas = document.getElementById("vacio")
    const con_empresas = document.getElementById("lista-empresas")
    const no_conectado = document.getElementById("no-conectado")

    this.empresaService.consultar().subscribe(
      (response: any) => {
        this.empresas = response.data;
        if (response.status == 200) {
          this.empresas = this.empresas.sort((a, b) => a.nombre.localeCompare(b.nombre));
          if (this.empresas.length == 0) {
            if (sin_empresas) sin_empresas.style.display = "block"
            if (con_empresas) con_empresas.style.display = "none"
          } else {
            if (con_empresas) con_empresas.style.display = "block"
          }
        } else {
          if (sin_empresas) sin_empresas.style.display = "none"
          if (con_empresas) con_empresas.style.display = "none"
          if (no_conectado) no_conectado.style.display = "block"
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
      "formulario": "modal-formulario",
      "eliminar": "modal-confirmacion"
    }

    const oculto = (accion == "formulario") ? "modal-formulario" : "modal-confirmacion";
    const visible = elementos[accion as keyof typeof elementos];

    const modal_oculto = document.getElementById(oculto)
    const modal_visible = document.getElementById(visible)

    const titulo = document.getElementById("titulo")

    if (accion == 'formulario') {
      this.id_editar = id
      if (id != "-1") {
        if (titulo) titulo.innerHTML = "Editar empresa"
      } else {
        if (titulo) titulo.innerHTML = "Alta de empresa"
      }
    }

    if (accion == 'eliminar')
      this.id_eliminar = id;

    if (modal_oculto) modal_oculto.style.display = 'none'

    if (modal_visible) modal_visible.style.display = 'block'

    const modal = document.getElementById("modal") as HTMLElement
    if (modal) modal.style.display = 'block'
  }
}
