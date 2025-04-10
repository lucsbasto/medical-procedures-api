import { ValueObject } from '@/common/domain/value-object/value-object';

interface SpecialtyProps {
  value: string;
}

export class Specialty extends ValueObject<SpecialtyProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: SpecialtyProps) {
    super(props);
  }

  public static create(value: string): Specialty {
    if (!value || value.trim() === '') {
      throw new Error('Specialty cannot be empty.');
    }
    const upperCasedValue = value.trim().toUpperCase();
    return new Specialty({ value: upperCasedValue });
  }
}