import { Ball, Egg, GummyBall, LightBall, SteelBall } from './ball';

export class BouncingBallGame {
  private readonly box: HTMLDivElement;
  private balls: Ball[] = [];

  constructor(boxId: string) {
    this.box = document.getElementById(boxId)! as HTMLDivElement;
  }

  private getRandomX(): number {
    return Math.random() * this.box.clientWidth;
  }

  public addGummyBall(): void {
    const x = this.getRandomX();
    const ball = new GummyBall(this.box, x, 40);
    this.balls.push(ball);
  }

  public addSteelBall(): void {
    const x = this.getRandomX();
    const ball = new SteelBall(this.box, x, 40);
    this.balls.push(ball);
  }

  public addLightBall(): void {
    const x = this.getRandomX();
    const ball = new LightBall(this.box, x, 40);
    this.balls.push(ball);
  }

  public addEgg(): void {
    const x = this.getRandomX();
    const ball = new Egg(this.box, x, 40);
    this.balls.push(ball);
  }

  private gameLoop = (): void => {
    // Update ALL balls and filter out "dead" ones
    // POLYMORPHISM in action: each ball.update() call might execute
    // different code depending on the actual type of the ball.
    // If update() returns false, the ball is "dead" and should be removed.
    const aliveBalls: Ball[] = [];
    for (const ball of this.balls) {
      const isAlive = ball.update();
      if (!isAlive) {
        // Ball is dead - remove it from the DOM
        ball.remove();
      } else {
        aliveBalls.push(ball);
      }
    }
    this.balls = aliveBalls;

    // Request the next frame
    // This creates a continuous loop that runs at the browser's refresh rate
    requestAnimationFrame(this.gameLoop);
  };

  public start(): void {
    requestAnimationFrame(this.gameLoop)
  }
}