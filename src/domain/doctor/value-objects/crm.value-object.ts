import { ValueObject } from '@/common/domain/value-object/value-object';

interface CrmProps {
  value: string;
}

export class CRM extends ValueObject<CrmProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: CrmProps) {
    super(props);
  }

  public static create(value: string): CRM {
    const trimmedValue = value.replace(/[^\w]|_/g, '').toUpperCase();

    CRM.validate(trimmedValue);
    return new CRM({ value: trimmedValue.trim().toUpperCase() });
  }
  private static validate(value: string): void {
    if (!value || value.trim() === '') {
      throw new Error('CRM não pode ser vazio.');
    }

    const crmRegex = /^[A-Z]{2}[0-9]+$/;
    if (!crmRegex.test(value)) {
      throw new Error('Formato de CRM inválido. Deve seguir o padrão: XXNNNNN... (ex: SP123456).');
    }

    const state = value.substring(0, 2);
    const numbers = value.substring(2);

    if (state.length !== 2) {
      throw new Error('O CRM deve começar com duas letras representando o estado.');
    }

    if (numbers.length === 0 || Number.isNaN(parseInt(numbers, 10))) {
      throw new Error('O CRM deve conter números após a sigla do estado.');
    }
  }
}
