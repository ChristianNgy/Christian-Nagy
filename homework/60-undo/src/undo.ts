//Command ist eine abstracte Classe, die Funktionen execute, undo und describe herleitet
abstract class Command {
  // Execute nimmt die derzeitige Value, die hergegeben wird und gibt durch das Addieren oder das Subtrahieren eine neue Zahl ab
  abstract execute(currentValue: number): number;
  //Undo macht das Gleiche, nur dass es umgekehrt ist
  abstract undo(currentValue: number): number;
}

//Addiert Werte, die im Input eingegen wurde, zum jetzigen Wert
export class AddCommand extends Command {
  private value: number;
  constructor(value: number) {
    super();
    this.value = value;
  }

  execute(currentValue: number): number {
    return currentValue + this.value;
  }
  undo(currentValue: number): number {
    return currentValue - this.value;
  }

}

//Subtrahiert Werte, die im Input eingegen wurde, zum jetzigen Wert
export class SubtractCommand extends Command {
  private value: number;
  constructor(value: number) {
    super();
    this.value = value;
  }

  execute(currentValue: number): number {
    return currentValue - this.value;
  }
  undo(currentValue: number): number {
    return currentValue + this.value;
  }

}
