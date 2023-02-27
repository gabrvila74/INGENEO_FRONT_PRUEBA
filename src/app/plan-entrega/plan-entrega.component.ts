import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../_services/cliente.service';
import { PlanEntregaService } from '../_services/plan-entrega.service';
import { PuntoEntregaService } from '../_services/punto-entrega.service';
import { TipoLogisticaService } from '../_services/tipo-logistica.service';
import { TipoProductoService } from '../_services/tipo-producto.service';
import { TipoPuntoEntregaService } from '../_services/tipo-punto-entrega.service';

@Component({
  selector: 'app-plan-entrega',
  templateUrl: './plan-entrega.component.html',
  styleUrls: ['./plan-entrega.component.css']
})
export class PlanEntregaComponent implements OnInit {
  planEntregas: any = [];
  clientes: any = [];
  tipoLogisticas: any = [];
  tipoProductos: any = [];
  tipoPuntoEntregas: any = [];
  puntoEntregas: any = [];

  tipoPuntoEntregasFiltrado: any = [];
  tipoProductosFiltrado: any = [];
  puntoEntregasFiltrado: any = [];

  idTipoLogistica: number = 0;
  creacionedicion: boolean = false;
  modoInsertar: boolean = true;
  formPlanEntrega!: FormGroup;

  constructor(private puntoEntregaService: PuntoEntregaService, private router: Router,
    private toastr: ToastrService, private formBuilder: FormBuilder,
    private tipoLogisticaService: TipoLogisticaService,
    private tipoPuntoEntregaService: TipoPuntoEntregaService,
    private planEntregaService: PlanEntregaService, private clienteService: ClienteService,
    private tipoProductoService: TipoProductoService) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerPlanEntregas();
    this.obtenerTipoLogisticas();
    this.obtenerTipoPuntoEntregas();
    this.obtenerPuntoEntregas();
    this.obtenerClientes();
    this.obtenerProductos();
  }

  inicializarFormulario() {
    this.formPlanEntrega = new FormGroup({
      idPlanEntrega: new FormControl(''),
      tipoLogistica: new FormControl('', Validators.required),
      tipoProducto: new FormControl('', Validators.required),
      tipoPuntoEntrega: new FormControl('', Validators.required),
      puntoEntrega: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      fechaRegistro: new FormControl('', Validators.required),
      fechaEnvio: new FormControl('', Validators.required),
      precioEnvio: new FormControl('', Validators.required),
      numeroGuia: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      identTransporte: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      porcDescuento: new FormControl('0'),
      PrecioEnvioFinal: new FormControl(0),
    })
    this.formPlanEntrega.get("idPlanEntrega")?.disable();
  }

  obtenerPlanEntregas(): void {
    debugger;
    this.planEntregaService.obtenerPlanEntregas()
      .subscribe((response: any) => {
        this.planEntregas = response;
        console.log(this.planEntregas);
      },
        error => {
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      );
  }

  obtenerTipoLogisticas(): void {
    debugger;
    this.tipoLogisticaService.obtenerTipoLogisticas()
      .subscribe((response: any) => {
        this.tipoLogisticas = response;
      },
        error => {
          console.log(error);
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
          this.toastr.error(error.message);
        }
      );
  }

  obtenerPuntoEntregas(): void {
    debugger;
    this.puntoEntregaService.obtenerPuntoEntregas()
      .subscribe((response: any) => {
        this.puntoEntregas = response;
      },
        error => {
          console.log(error);
          this.toastr.error(error.message);
        }
      );
  }

  obtenerProductos(): void {
    debugger;
    this.tipoProductoService.obtenerTipoProductos()
      .subscribe((response: any) => {
        this.tipoProductos = response;
      },
        error => {
          console.log(error);
          this.toastr.error(error.message);
        }
      );
  };

  obtenerClientes(): void {
    debugger;
    this.clienteService.obtenerClientes()
      .subscribe((response: any) => {
        this.clientes = response;
      },
        error => {
          console.log(error);
          this.toastr.error(error.message);
        }
      );
  }

  nuevo(): void {
    this.creacionedicion = true;
    this.modoInsertar = true;
    this.tipoPuntoEntregasFiltrado = [];
    this.formPlanEntrega.patchValue({
      idPlanEntrega: '',
      tipoLogistica: '',
      direccion: '',
      tipoProducto: '',
      tipoPuntoEntrega: '',
      puntoEntrega: '',
      cliente: '',
      cantidad: '',
      fechaRegistro: '',
      fechaEnvio: '',
      precioEnvio: '',
      numeroGuia: '',
      identTransporte: '',
      porcDescuento: '',
      PrecioEnvioFinal: '',
    });

  }

  editar(data: any): void {
    console.log('editar', data);
    this.creacionedicion = true;
    this.modoInsertar = false;
    this.formPlanEntrega.patchValue({
      idPlanEntrega: data.idPlanEntrega,
      tipoLogistica: 1,
      direccion: data.direccion,
      tipoProducto: data.idTipoProducto,
      tipoPuntoEntrega: 0,
      puntoEntrega: data.idPuntoEntrega,
      cliente: data.idCliente,
      cantidad: data.cantidadProducto,
      fechaRegistro: new Date(data.fechaRegistro),
      fechaEnvio: new Date(data.fechaEntrega),
      precioEnvio: data.precioEnvio,
      numeroGuia: data.numeroGuia,
      identTransporte: data.identificacionTransporte,
      porcDescuento: data.porcentajeDescuento,
      PrecioEnvioFinal: data.PrecioEnvioFinal,
    });
  }



  guardar(): void {

    let modelo = {
      idPlanEntrega: '0',
      idCliente: this.formPlanEntrega.get('cliente')?.value,
      idPuntoEntrega: this.formPlanEntrega.get('puntoEntrega')?.value,
      idTipoProducto: this.formPlanEntrega.get('tipoProducto')?.value,
      idTipoPuntoEntrega: this.formPlanEntrega.get('tipoPuntoEntrega')?.value,
      cantidadProducto: this.formPlanEntrega.get('cantidad')?.value,
      fechaRegistro: this.formPlanEntrega.get('fechaRegistro')?.value,
      fechaEntrega: this.formPlanEntrega.get('fechaEnvio')?.value,
      precioEnvio: this.formPlanEntrega.get('precioEnvio')?.value,
      numeroGuia: this.formPlanEntrega.get('numeroGuia')?.value,
      identificacionTransporte: this.formPlanEntrega.get('identTransporte')?.value,
      porcentajeDescuento: this.formPlanEntrega.get('porcDescuento')?.value,
      PrecioEnvioFinal: '0' 
    }

    if (this.modoInsertar) {
      this.crearPlanEntrega(modelo);
    }
    else {
      modelo.idPlanEntrega = this.formPlanEntrega.get('idPlanEntrega')?.value
      this.editarPlanEntrega(modelo);
    }

  }

  crearPlanEntrega(modelo: any) {

    this.planEntregaService.insertarPlanEntrega(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se insertó la información de manera exitosa.");
          this.obtenerPlanEntregas();
          this.creacionedicion = false;
        },
        error: (error) => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      }
      );
  }

  editarPlanEntrega(modelo: any) {
    debugger;

    this.planEntregaService.editarPlanEntrega(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se actualizó la información de manera exitosa.");
          this.obtenerPlanEntregas();
          this.creacionedicion = false;
        },
        error: (error) => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }

      }
      );
  }

  eliminar(data: any): void {

    this.planEntregaService.eliminarPlanEntrega(data.idPlanEntrega)
      .subscribe({
        next: () => {
          this.toastr.success("Se eliminó la información de manera exitosa.");
          this.obtenerPlanEntregas();
        },
        error: (error) => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error("No autorizado");
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      }
      );
  }

  cancelar(): void {
    this.creacionedicion = false;
  }

  onChangeLogistica(value: string) {
    this.idTipoLogistica = parseInt(value.split(':')[1].trim());
    this.tipoPuntoEntregasFiltrado = this.tipoPuntoEntregas.filter((y: { idTipoLogistica: number; }) => y.idTipoLogistica == this.idTipoLogistica)
    this.tipoProductosFiltrado = this.tipoProductos.filter((y: { idTipoLogistica: number; }) => y.idTipoLogistica == this.idTipoLogistica)

    let porcDescuento = 0;
    let cantidad = this.formPlanEntrega.get("cantidad")?.value;

    if (cantidad != "") {
      if (parseInt(cantidad) > 10 && this.idTipoLogistica == 1)
        porcDescuento = 5
      else if (parseInt(cantidad) > 10 && this.idTipoLogistica == 2)
        porcDescuento = 3
      else
        porcDescuento = 0;
    }
    this.formPlanEntrega.patchValue({
      porcDescuento: porcDescuento
    });


  }

  onChangeTipoPuntoEntrega(value: string) {
    let idTipoPuntoEntrega: number = parseInt(value.split(':')[1].trim());
    this.puntoEntregasFiltrado = this.puntoEntregas.filter((y: { idTipoPuntoEntrega: number; }) => y.idTipoPuntoEntrega == idTipoPuntoEntrega)
  }

  onChangeCantidad(value: string) {

    let porcDescuento = 0;
    if (value != "") {
      if (parseInt(value) > 10 && this.idTipoLogistica == 1)
        porcDescuento = 5
      else if (parseInt(value) > 10  && this.idTipoLogistica == 2)
        porcDescuento = 3
      else
        porcDescuento = 0;
    }
    this.formPlanEntrega.patchValue({
      porcDescuento: porcDescuento
    });

    console.log('valor', value);
  }


  setValue(value: any) {
    console.log(value);
  }
}
