// const start = document.getElementById("start") as HTMLButtonElement;

// const stack = [[4,3,2,1],[],[]];

//     start.addEventListener("click", () => {
//         const input = prompt("Enter two numbers separated by a space (e.g., '1 2') to move a disk:");
//         if (!input) {
//             return;
//         }

//         const parsedInput = input.split(" ").map(Number);
//         const from = parsedInput[0];
//         const to = parsedInput[1];

//         if (typeof from !== "number" || typeof to !== "number" || from === to || stack[from - 1]?.length === 0) {
//             alert("Invalid input or move!");
//             return;
//         }

//         const fromStack = stack[from - 1];
//         const toStack = stack[to - 1];

//         if (!fromStack || !toStack) {
//             alert("Invalid move! One of the stacks does not exist.");
//             return;
//         }

//         const disk = fromStack[fromStack.length - 1]; // Peek at the top disk
//         if (disk === null || disk === undefined) {
//             alert("Invalid move! The disk is null or undefined.");
//             return;
//         }

//         if (toStack.length && !(disk < (toStack[toStack.length - 1] ?? Infinity))) { 
//             alert("Invalid move! You cannot place a larger disk on a smaller one.");
//             return;
//         }

//         toStack.push(fromStack.pop()!); // Pop and push only if valid
//     });

// console.log(stack);
import { Disk } from "./disk";

export class Game {
  private stacks: number[][] = [[4,3,2,1], [], []];
  private click: number | undefined;

  button1 = document.getElementById('button1') as HTMLButtonElement;
  button2 = document.getElementById('button2') as HTMLButtonElement;
  button3 = document.getElementById('button3') as HTMLButtonElement;
  constructor() {
    this.button1.addEventListener('click', () => {
      this.moving(1);
    });
    this.button2.addEventListener('click', () => {
      this.moving(2);
    });
    this.button3.addEventListener('click', () => {
      this.moving(3);
    });
  }

  moving(numberOfButton: number) {
    const disk = new Disk();
    if (this.click) {
      if (this.click !== numberOfButton) {
        if(this.stacks[this.click - 1]){
          if(this.stacks[this.click - 1]! >= this.stacks[this.click]! && this.stacks[this.click] !== undefined){
          disk.moveDiskToRight()
          } else if(this.stacks[this.click - 1]! <= this.stacks[this.click - 2]! && this.stacks[this.click - 2] !== undefined){
            disk.moveDiskToLeft()
          } else{
            return
          }
            this.stacks[numberOfButton - 1]!.push(this.stacks[this.click - 1]![0]!)
            this.stacks[this.click - 1]!.splice(0, 1)
            this.click = undefined
            console.log(this.stacks)
        }
      } else {
        console.log('not possible');
        this.click = undefined;
      }
    } else {
      this.click = numberOfButton;
    }
  }
}
