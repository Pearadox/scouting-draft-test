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

interface IMatch {
  team_num: string;
  tele_CargoLPan1: boolean;
  tele_CargoLPan2: boolean;
  tele_CargoLPan3: boolean;
  tele_CargoRPan1: boolean;
  tele_CargoRPan2: boolean;
  tele_CargoRPan3: boolean;
  // CargoLPanCount: number;
  // CargoRPanCount: number;
}

export class Match implements IMatch {
  CargoLPanCount: number;
  CargoRPanCount: number;
  constructor(
    public team_num: string,
    public tele_CargoLPan1: boolean,
    public tele_CargoLPan2: boolean,
    public tele_CargoLPan3: boolean,
    public tele_CargoRPan1: boolean,
    public tele_CargoRPan2: boolean,
    public tele_CargoRPan3: boolean
  ) {
    this.team_num = team_num;
    this.tele_CargoLPan1 = tele_CargoLPan1;
    this.tele_CargoLPan2 = tele_CargoLPan2;
    this.tele_CargoLPan3 = tele_CargoLPan3;
    this.tele_CargoRPan1 = tele_CargoRPan1;
    this.tele_CargoRPan2 = tele_CargoRPan2;
    this.tele_CargoRPan3 = tele_CargoRPan3;
    this.CargoLPanCount =
      (tele_CargoLPan1 ? 1 : 0) +
      (tele_CargoLPan2 ? 1 : 0) +
      (tele_CargoLPan3 ? 1 : 0);
    this.CargoRPanCount =
      (tele_CargoRPan1 ? 1 : 0) +
      (tele_CargoRPan2 ? 1 : 0) +
      (tele_CargoRPan3 ? 1 : 0);
  }
}
