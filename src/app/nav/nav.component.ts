import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CuentaService } from '../_services/cuenta.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public cuentaService: CuentaService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.cuentaService.login().subscribe({
      next: () => {
        //this.router.navigateByUrl('/tipo-producto')
      },
      error: error => {
       console.log(error);
       this.toastr.error(error.message);
     }
    });
  }

  logout() {
    this.cuentaService.logout();
    this.router.navigateByUrl('/');
  }

}
