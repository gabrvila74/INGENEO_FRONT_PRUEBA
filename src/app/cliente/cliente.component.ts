import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/cliente';
import { ClienteService } from '../_services/cliente.service';
import { TipoDocumentoService } from '../_services/tipo-documento.service';
import { TipoProductoService } from '../_services/tipo-producto.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: any = [];
  tipoDocumentos: any = [];
  creacionedicion: boolean = false;
  modoInsertar: boolean = true;
  formCliente!: FormGroup;

  constructor(private clienteService: ClienteService, private router: Router,
    private toastr: ToastrService, private formBuilder: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerClientes();
    this.obtenerTipoDocumentos();
  }

  inicializarFormulario() {
    this.formCliente = new FormGroup({
      idCliente: new FormControl(''),
      tipoDocumento: new FormControl('', Validators.required),
      documento: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    })
    this.formCliente.get("idCliente")?.disable();
  }

  obtenerTipoDocumentos(): void {
    debugger;
    this.tipoDocumentoService.obtenerTipoDocumentos()
      .subscribe((response: any) => {
        this.tipoDocumentos = response;
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
    this.formCliente.patchValue({
      idCliente: '',
      tipoDocumento: '',
      documento: '',
      nombre: '',
      direccion: '',
      telefono: ''
    });

  }

  editar(data: any): void {
    console.log(data);
    this.creacionedicion = true;
    this.modoInsertar = false;
    this.formCliente.patchValue({
      idCliente: data.idCliente,
      tipoDocumento: data.idTipoDocumento,
      documento: data.documento,
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono
    });
  }

  obtenerClientes(): void {
    debugger;
    this.clienteService.obtenerClientes()
      .subscribe((response: any) => {
        this.clientes = response;
      },
        error => {
          console.log(error);
          if (error.status = 401) {
            this.toastr.error(error.error);
            this.router.navigateByUrl('/');
          }
          else
            this.toastr.error(error.message);
        }
      );
  }

  guardar(): void {
    
    let modelo = {
      idCliente: '0',
      idTipoDocumento: this.formCliente.get('tipoDocumento')?.value,
      documento: this.formCliente.get('documento')?.value,
      nombre: this.formCliente.get('nombre')?.value,
      direccion: this.formCliente.get('direccion')?.value,
      telefono: this.formCliente.get('telefono')?.value,
    }

    if (this.modoInsertar) {
      this.crearCliente(modelo);
    }
    else {
      modelo.idCliente = this.formCliente.get('idCliente')?.value
      console.log('modelo', modelo);
      this.editarCliente(modelo);
    }

  }

  crearCliente(modelo: any) {

    this.clienteService.insertarCliente(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se insertó la información de manera exitosa.");
          this.obtenerClientes();
          this.creacionedicion = false;
        },
        error: (error) => {
          console.log(error);
            this.toastr.error(error.message);
        }
      }
      );
  }

  editarCliente(modelo: any) {
    debugger;

    this.clienteService.editarCliente(modelo)
      .subscribe({
        next: () => {
          this.toastr.success("Se actualizó la información de manera exitosa.");
          this.obtenerClientes();
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

    this.clienteService.eliminarCliente(data.idCliente)
      .subscribe({
        next: () => {
          this.toastr.success("Se eliminó la información de manera exitosa.");
          this.obtenerClientes();
        },
        error: (error) => {
          console.log('error', error);
          this.toastr.error(error.message);
        }
      }
      );
  }

  cancelar(): void {
    this.creacionedicion = false;
  }

}
