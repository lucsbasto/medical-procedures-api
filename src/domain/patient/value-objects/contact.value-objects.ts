import { ValueObject } from '@/common/domain/value-object/value-object';

interface ContactProps {
  phone?: string;
  email?: string;
}

export class Contact extends ValueObject<ContactProps> {
  get phone(): string {
    return this.props.phone;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  private constructor(props: ContactProps) {
    super(props);
  }

  public static create(_phone?: string, _email?: string): Contact {
    const phone = _phone?.replace(/\s/g, '');
    const email = _email?.replace(/\s/g, '');
    Contact.validate(phone, email);
    return new Contact({ phone, email });
  }

  private static validate(phone: string, email?: string): void {
    if (phone && phone.length < 9) {
      throw new Error('Invalid phone number.');
    }
    if (email && email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format.');
    }
  }
}
