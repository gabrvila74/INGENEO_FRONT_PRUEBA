import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PuntoEntregaService } from '../_services/punto-entrega.service';
import { TipoLogisticaService } from '../_services/tipo-logistica.service';
import { TipoProductoService } from '../_services/tipo-producto.service';
import { TipoPuntoEntregaService } from '../_services/tipo-punto-entrega.service';

@Component({
  selector: 'app-punto-entrega',
  templateUrl: './punto-entrega.component.html',
  styleUrls: ['./punto-entrega.component.css']
})
export class PuntoEntregaComponent implements OnInit {

  puntoEntregas: any = [];
  tipoLogisticas: any = [];
  tipoPuntoEntregas: any = [];
  tipoPuntoEntregasFiltrado: any = [];
  creacionedicion: boolean = false;
  modoInsertar: boolean = true;
  formPuntoEntrega!: FormGroup;

  constructor(private puntoEntregaService: PuntoEntregaService, private router: Router,
    private toastr: ToastrService, private formBuilder: FormBuilder,
    private tipoLogisticaService: TipoLogisticaService,
    private tipoPuntoEntregaService: TipoPuntoEntregaService) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerPuntoEntregas();
    this.obtenerTipoLogisticas();
    this.obtenerTipoPuntoEntregas();
  }

  inicializarFormulario() {
    this.formPuntoEntrega = new FormGroup({
      idPuntoEntrega: new FormControl(''),
      tipoLogistica: new FormControl('', Validators.required),
      tipoPuntoEntrega: new FormControl('', Validators.required),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(300)])
    })
    this.formPuntoEntrega.get("idPuntoEntrega")?.disable();
  }

  obtenerTipoLogisticas(): void {
    debugger;
    this.tipoLogisticaService.obtenerTipoLogisticas()
      .subscribe((response: any) => {
        this.tipoLogisticas = response;
      },
        error => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      );
  }

  obtenerTipoPuntoEntregas(): void {
    debugger;
    this.tipoPuntoEntregaService.obtenerTipoPuntoEntregas()
      .subscribe((response: any) => {
        this.tipoPuntoEntregas = response;
      },
        error => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      );
  }

  nuevo(): void {
    this.creacionedicion = true;
    this.modoInsertar = true;
    this.tipoPuntoEntregasFiltrado = [];
    this.formPuntoEntrega.patchValue({
      idPuntoEntrega: '',
      idTipoPuntoEntrega: '',
      tipoLogistica: '',
      nombre: '',
      direccion: ''
    });

  }

  editar(data: any): void {
    console.log('editar',data);
    this.creacionedicion = true;
    this.modoInsertar = false;
    this.formPuntoEntrega.patchValue({
      idPuntoEntrega: data.idPuntoEntrega,
      tipoLogistica: 1,
      nombre: data.nombre,
      direccion: data.direccion
    });
  }

  obtenerPuntoEntregas(): void {
    debugger;
    this.puntoEntregaService.obtenerPuntoEntregas()
      .subscribe((response: any) => {
        this.puntoEntregas = response;
      },
        error => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      );
  }

  guardar(): void {

    let modelo = {
      idPuntoEntrega: '0',
      idTipoPuntoEntrega: this.formPuntoEntrega.get('tipoPuntoEntrega')?.value,
      nombre: this.formPuntoEntrega.get('nombre')?.value,
      direccion: this.formPuntoEntrega.get('direccion')?.value,
    }

    if (this.modoInsertar) {
      this.crearPuntoEntrega(modelo);
    }
    else {
      modelo.idPuntoEntrega = this.formPuntoEntrega.get('idPuntoEntrega')?.value
      this.editarPuntoEntrega(modelo);
    }

  }

  crearPuntoEntrega(modelo: any) {

    this.puntoEntregaService.insertarPuntoEntrega(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se insertó la información de manera exitosa.");
          this.obtenerPuntoEntregas();
          this.creacionedicion = false;
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.message);
        }
      }
      );
  }

  editarPuntoEntrega(modelo: any) {
    debugger;

    this.puntoEntregaService.editarPuntoEntrega(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se actualizó la información de manera exitosa.");
          this.obtenerPuntoEntregas();
          this.creacionedicion = false;
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.message);
        }
      }
      );
  }

  eliminar(data: any): void {

    this.puntoEntregaService.eliminarPuntoEntrega(data.idPuntoEntrega)
      .subscribe({
        next: () => {
          this.toastr.success("Se eliminó la información de manera exitosa.");
          this.obtenerPuntoEntregas();
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.message);
        }
      }
      );
  }

  cancelar(): void {
    this.creacionedicion = false;
  }

  onChange(value: string) {
    let idTipoLogistica: number = parseInt(value.split(':')[1].trim());
    this.tipoPuntoEntregasFiltrado = this.tipoPuntoEntregas.filter((y: { idTipoLogistica: number; }) => y.idTipoLogistica == idTipoLogistica)
  }

  setValue(value: any) {
    console.log(value);
  }
}
