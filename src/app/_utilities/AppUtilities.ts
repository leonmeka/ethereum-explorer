import { ElectronService } from "ngx-electron";

export class AppUtilities {
  public static calculateDollarValue(number: number): number {
    return Number(Math.round(number / 10000000000000000) + "e-2");
  }

  public formatMoney(number) {
    return number.toLocaleString('en-US');
  }
}