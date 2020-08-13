import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TarjetaService } from '../../../services/tarjeta.service';
import { TarjetaModel } from '../../../models/TarjetaModel';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  suscription: Subscription;
  tarjeta: TarjetaModel;
  id = 0;

  constructor(private formBuilder: FormBuilder, private tarjetaService: TarjetaService, private toastrService: ToastrService) {
    this.formulario = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroDeTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.suscription = this.tarjetaService.obtenerTarjetaEnComponente().subscribe(data => {
      this.tarjeta = data;
      this.formulario.patchValue({
        titular: this.tarjeta.titular,
        numeroDeTarjeta: this.tarjeta.numeroDeTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv,
      });
      this.id = this.tarjeta.id;
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  guardarTarjeta() {
    if (this.id === 0) {
      this.agregarTarjeta();
    }
    else{
      this.editarTarjeta();
    }
  }

  agregarTarjeta() {
    // Obtenemos los valores del formulario
    const tarjeta: TarjetaModel = {
      titular: this.formulario.get('titular').value,
      numeroDeTarjeta: this.formulario.get('numeroDeTarjeta').value,
      fechaExpiracion: this.formulario.get('fechaExpiracion').value,
      cvv: this.formulario.get('cvv').value
    };

    // Nos subscripbimos por que es un observable
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
      this.toastrService.success('Registro agregado', 'La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetas();
      this.formulario.reset();
    });
  }

  editarTarjeta() {
    const tarjetaForm: TarjetaModel = {
      id: this.tarjeta.id,
      titular: this.formulario.get('titular').value,
      numeroDeTarjeta: this.formulario.get('numeroDeTarjeta').value,
      fechaExpiracion: this.formulario.get('fechaExpiracion').value,
      cvv: this.formulario.get('cvv').value
    };

    this.tarjetaService.actualizarTarjeta(this.tarjeta.id, tarjetaForm).subscribe(data => {
      this.toastrService.info('Registro actualizado', 'La tarjeta fue actualizada');
      this.tarjetaService.obtenerTarjetas();
      this.formulario.reset();
      this.id = 0;
    });
  }


}
