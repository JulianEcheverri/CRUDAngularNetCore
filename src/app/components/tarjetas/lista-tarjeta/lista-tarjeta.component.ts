import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { TarjetaModel } from '../../../models/TarjetaModel';

@Component({
  selector: 'app-lista-tarjeta',
  templateUrl: './lista-tarjeta.component.html',
  styleUrls: ['./lista-tarjeta.component.css']
})
export class ListaTarjetaComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService, public toastrService: ToastrService) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetas();
  }

  eliminarTarjeta(id: number) {
    if (confirm('¿Está seguro que desea eliminar el registro?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
      this.toastrService.warning('Registro eliminado', 'La tarjeta fue eliminada');
        this.tarjetaService.obtenerTarjetas();
      })
    }
  }

  editarTarjeta(tarjeta: TarjetaModel){
    this.tarjetaService.actualizarTarjetaEnComponente(tarjeta);
  }
}
