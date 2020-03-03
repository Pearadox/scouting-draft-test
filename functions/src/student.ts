interface Usercheck {
  key: string;
  name: string;
  status: string;
}

export class Student implements Usercheck {
  constructor(public key: string, public name: string, public status: string) {
    this.key = key;
    this.name = name;
    this.status = status;
  }
}
