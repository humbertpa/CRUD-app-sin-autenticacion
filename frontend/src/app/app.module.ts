import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { NuevaEmpresaComponent } from './componentes/nueva-empresa/nueva-empresa.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmacionEliminarComponent } from './componentes/confirmacion-eliminar/confirmacion-eliminar.component';
import { EditarEmpresaComponent } from './componentes/editar-empresa/editar-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresasComponent,
    NuevaEmpresaComponent,
    ConfirmacionEliminarComponent,
    EditarEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
