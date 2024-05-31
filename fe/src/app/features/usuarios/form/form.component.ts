import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation } from '../../../helpers/password.validator';
import { UsuarioService } from '../../../services/usuario.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Usuario, SaveUsuarioDTO, Role } from '../../../interfaces/usuario';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormUsuarioComponent {
  form = this.formBuilder.group({
    nome: ['', Validators.required],
    senha: [''],
    confirmarSenha: [''],
    email: ['', [Validators.required, Validators.email]],
    roles: [[Role.USER], Validators.required],
  });

  hidePassword = true;
  hideConfirmPassword = true;
  editing = false;
  private userId: number = -1;
  roles: { label: string, role: Role }[] = [
    { label: 'Administrador', role: Role.ADMIN },
    { label: 'Usuário', role: Role.USER },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.form.setValidators([
      PasswordValidation.match('senha', 'confirmarSenha'),
    ]);
    this.form.updateValueAndValidity();

    this.route.params.subscribe((params) => {
      this.userId = Number(params['id']);

      if (this.userId > 0) {
        this.editing = true;
        this.usuarioService
          .findById(this.userId)
          .subscribe((usuario: Usuario) => {
            if (usuario) {
              this.form.patchValue({
                nome: usuario.nome,
                email: usuario.email,
                roles: usuario.roles.map((value) => value.role),
              });
            }
          });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['usuarios']);
  }

  salvar(): void {
    if (!this.form.valid) {
      return;
    }

    const { nome, email, senha, roles } = this.form.value;

    if (this.editing) {
      const data: SaveUsuarioDTO = { nome, email, roles };
      this.usuarioService
        .update(this.userId, data)
        .subscribe({
          complete: () => {
            this.router.navigate(['usuarios']);
          },
          error: (error) => this.showError(error),
        });
    } else {
      const data: SaveUsuarioDTO = { nome, email, senha, roles };
      this.usuarioService
        .create(data)
        .subscribe({
          complete: () => {
            this.router.navigate(['usuarios']);
          },
          error: (error) => this.showError(error),
        });
    }
  }

  showError(error: any) {
    const title = 'Ocorreu um erro ao salvar o usuário';
    if (error.message instanceof Array) {
      this.alertService.showErrors(title, error.message);
    } else {
      this.alertService.showError(title, error.message);
    }
  }
}
