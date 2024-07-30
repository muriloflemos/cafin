import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'date-fns';
import { PasswordValidation } from '../../../helpers/password.validator';
import { ClienteService } from '../../../services/cliente.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Cliente, SaveClienteDTO } from '../../../interfaces/cliente';

const formatDate = (date: Date) => {
  const noTimeDate = date.toString().slice(0, 10);
  const year = noTimeDate.substring(0, 4);
  const month = noTimeDate.substring(5, 7);
  const day = noTimeDate.substring(8, 10);
  return `${day}/${month}/${year}`;
}

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormClienteComponent {
  form = this.formBuilder.group({
    nome: ['', Validators.required],
    telefone: [''],
    email: ['', Validators.email],
    dataNascimento: [''],
    cpf: [''],
    rg: [''],
    estadoCivil: [''],
    filhos: [0],
    endereco: [''],
    diagnosticoClinico: [''],
    diagnosticoFisioterapeutico: [''],
  });

  editing = false;
  private clienteId: number = -1;

  telefoneMask = '(000) 0 0000-0000||(000) 0000-0000';
  dateMask = 'd0/M0/0000';
  cpfMask = '000.000.000-00';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.form.setValidators([
      PasswordValidation.match('senha', 'confirmarSenha'),
    ]);
    this.form.updateValueAndValidity();

    this.route.params.subscribe((params) => {
      this.clienteId = Number(params['id']);

      if (this.clienteId > 0) {
        this.editing = true;
        this.clienteService
          .findById(this.clienteId)
          .subscribe((cliente: Cliente) => {
            if (cliente) {
              const { dataNascimento } = cliente;
              this.form.patchValue({
                ...cliente,
                dataNascimento: dataNascimento ? formatDate(dataNascimento) : null,
              });
            }
          });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['clientes']);
  }

  salvar(): void {
    if (!this.form.valid) {
      return;
    }

    let { dataNascimento } = this.form.value;

    try {
      if (dataNascimento) {
        dataNascimento = parse(dataNascimento, 'dd/MM/yyyy', new Date()).toISOString();
      }
    } catch (e) {
      this.alertService.showError('Erro', 'Não foi possivel validar a data de nascimento.');
      return;
    }

    const data: SaveClienteDTO = {
      ...this.form.value,
      dataNascimento,
    };

    if (this.editing) {
      this.clienteService
        .update(this.clienteId, data)
        .subscribe({
          complete: () => {
            this.router.navigate(['clientes']);
          },
          error: (error) => this.showError(error),
        });
    } else {
      this.clienteService
        .create(data)
        .subscribe({
          complete: () => {
            this.router.navigate(['clientes']);
          },
          error: (error) => this.showError(error),
        });
    }
  }

  showError(error: any) {
    const title = 'Ocorreu um erro ao salvar o cliente';
    if (error.message instanceof Array) {
      this.alertService.showErrors(title, error.message);
    } else {
      this.alertService.showError(title, error.message);
    }
  }
}
