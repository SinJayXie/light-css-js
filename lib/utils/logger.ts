
export class Logger {
  public enabled: boolean = true;
  log(log: unknown, ...args: unknown[]) {
    if (this.enabled) console.log(log, ...args);
  }
  warn(log: unknown, ...args: unknown[]) {
    if (this.enabled) console.warn(log, ...args);
  }
  error(log: unknown, ...args: unknown[]) {
    if (this.enabled) console.error(log, ...args);
  }
}

export const logger = new Logger();
