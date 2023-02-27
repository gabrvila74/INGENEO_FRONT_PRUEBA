import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TipoProducto } from '../_models/tipo-producto';
import { TipoLogisticaService } from '../_services/tipo-logistica.service';
import { TipoProductoService } from '../_services/tipo-producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent implements OnInit {

  tipoProductos: any = [];
  tipoLogisticas: any = [];
  creacionedicion: boolean = false;
  modoInsertar: boolean = true;
  formTipoProducto!: FormGroup;

  constructor(private tipoProductoService: TipoProductoService, private router: Router,
    private toastr: ToastrService, private formBuilder: FormBuilder,
    private tipoLogisticaService: TipoLogisticaService  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerProductos();
    this.obtenerTipoLogisticas();
  }

  inicializarFormulario() {
    this.formTipoProducto = new FormGroup({
      idTipoProducto: new FormControl(''),
      tipoLogistica: new FormControl('', Validators.required),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(200)])
    })
    this.formTipoProducto.get("idTipoProducto")?.disable();
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

  nuevo(): void {
    this.creacionedicion = true;
    this.modoInsertar = true;
    this.formTipoProducto.patchValue({
      idTipoProducto: '',
      tipoLogistica: '',
      descripcion: ''
    });

  }

  editar(data: any): void {
    this.creacionedicion = true;
    this.modoInsertar = false;
    this.formTipoProducto.patchValue({
      idTipoProducto: data.idTipoProducto,
      tipoLogistica: data.idTipoLogistica,
      descripcion: data.descripcion
    });
  }

  obtenerProductos(): void {
    debugger;
    this.tipoProductoService.obtenerTipoProductos()
      .subscribe((response: any) => {
        this.tipoProductos = response;
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
      idTipoProducto: '0',
      idTipoLogistica: this.formTipoProducto.get('tipoLogistica')?.value,
      descripcion: this.formTipoProducto.get('descripcion')?.value
    }

    if (this.modoInsertar) {
      this.crearTipoProducto(modelo);
    }
    else {
      modelo.idTipoProducto = this.formTipoProducto.get('idTipoProducto')?.value
      this.editarTipoProducto(modelo);
    }

  }

  crearTipoProducto(modelo: any) {

    this.tipoProductoService.insertarTipoProducto(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se insertó la información de manera exitosa.");
          this.obtenerProductos();
          this.creacionedicion = false;
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.message);
        }
      }
    );
  }

  editarTipoProducto(modelo: any) {
    debugger;

    this.tipoProductoService.editarTipoProducto(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se actualizó la información de manera exitosa.");
          this.obtenerProductos();
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

    this.tipoProductoService.eliminarTipoProducto(data.idTipoProducto)
      .subscribe({
        next: () => {
          this.toastr.success("Se eliminó la información de manera exitosa.");
          this.obtenerProductos();
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

}
