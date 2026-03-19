/**
 * Describes where in the train a part is allowed to be placed.
 *
 * - `MustBeFirst` — this part may only be added when the train is empty (e.g. a locomotive).
 * - `MustBeLast`  — once this part is added, nothing can be appended after it (e.g. a caboose).
 * - `None`        — no positional restriction; the part can be placed anywhere after the locomotive.
 */
export enum PartRestriction {
    MustBeFirst,
    MustBeLast,
    None,
}

/**
 * Abstract base class for every part that can be added to a train.
 *
 * Every concrete wagon class (Locomotive, PassengerWagon, CargoWagon, …) must extend
 * this class and implement (or override) the three members below.
 *
 * The `Train` class works exclusively with `TrainPart` references, so all logic
 * that the train needs must be accessible through this base class.
 */
export abstract class TrainPart {
    /**
     * Positional restriction for this part.
     *
     * The `Train` class reads this value to enforce ordering rules without
     * needing to know the concrete type of the part.
     *
     * Each subclass must declare this as a `readonly` property and initialise
     * it with the appropriate `PartRestriction` member.
     */
    abstract readonly restriction: PartRestriction;

    /**
     * The maximum cargo weight this part contributes, in tons.
     *
     * The default implementation returns `0`, which is correct for every part
     * that carries no cargo (locomotive, passenger wagon, dining wagon, caboose).
     *
     * **Override this getter in `CargoWagon`** to return the actual maximum
     * weight so that the heavy-cargo warning can be computed without
     * `instanceof` checks.
     */
    get cargoWeightTons(): number {
        return 0;
    }

    /**
     * Creates and returns the `HTMLElement` that visually represents this part.
     *
     * The returned element will be appended directly to the train preview
     * container by `Train.render()`.  Use `document.createElement` to build
     * the element, set an appropriate CSS class, and populate it with the
     * part's data (title, detail value, …).
     */
    abstract render(): HTMLElement;
}

export class Train {
    private items: TrainPart[] = [];
    private train: HTMLElement;
    private Error: HTMLElement;

    constructor() {
        this.train = document.getElementById('train') as HTMLDivElement;
        this.Error = document.getElementById('undoBtn') as HTMLButtonElement;

        this.Error.addEventListener('click', () => {
            this.undo();
        });
    }

    addPart(option: string) {
        switch (option) {
            case 'locomotive':
                this.addLocomotive();
                break;
            case 'passenger':
                this.addPassenger();
                break;
            case 'cargo':
                this.addCargo();
                break;
            case 'dining':
                this.addDining();
                break;
            case 'caboose':
                this.addCaboose();
                break;
        }
        this.render();
    }

    private render(): void {
        this.train.innerHTML = '';
        for (const item of this.items) {
            this.train.appendChild(item.render());
        }
    }

    private undo() {
        this.items.splice(this.items.length - 1, 1);
        this.render();
    }

    private addLocomotive() {
        const loco = new Locomotive();
        this.items.push(loco);
        this.render();
    }

    private addPassenger() {
        const pass = new PassengerWagon();
        this.items.push(pass);
        this.render();
    }

    private addCargo() {
        const cargo = new CargoWagon();
        this.items.push(cargo);
        this.render();
    }

    private addDining() {
        const dini = new DiningWagon();
        this.items.push(dini);
        this.render();
    }
    private addCaboose() {
        const cab = new Caboose();
        this.items.push(cab);
        this.render();
    }
}

export class Locomotive extends TrainPart {
    render(): HTMLElement {
        const locomotive = document.createElement('div');
        locomotive.id = 'train';
        locomotive.classList = 'locomotive';
        locomotive.textContent = 'locomotive \n 2400KW';
        return locomotive;
    }
    readonly restriction: PartRestriction = PartRestriction.MustBeFirst;
}

export class PassengerWagon extends TrainPart {
    render(): HTMLElement {
        const passenger = document.createElement('div');
        passenger.id = 'train';
        passenger.classList = 'passenger';
        passenger.textContent = 'passenger wagon \n 48 seats';
        return passenger;
    }
    readonly restriction: PartRestriction = PartRestriction.None;
}

export class CargoWagon extends TrainPart {
    private x = 0;
    constructor() {
        super();
        this.x + 35;
    }

    render(): HTMLElement {
        const cargowagon = document.createElement('div');
        cargowagon.id = 'train';
        cargowagon.classList = 'cargo';
        cargowagon.textContent = 'cargo wagon \n 35 t';
        return cargowagon;
    }

    // override cargoWeightTons(): number {
    //     return this.x;
    // }
    readonly restriction: PartRestriction = PartRestriction.None;

    // private checkWeight(weight: number): boolean {
    //     if (weight <= 3 * 35) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}

export class DiningWagon extends TrainPart {
    render(): HTMLElement {
        const diningwagon = document.createElement('div');
        diningwagon.id = 'train';
        diningwagon.classList = 'dining';
        diningwagon.textContent = 'dining wagon \n 8 tables';
        return diningwagon;
    }
    readonly restriction: PartRestriction = PartRestriction.None;
}

export class Caboose extends TrainPart {
    render(): HTMLElement {
        const caboose = document.createElement('div');
        caboose.id = 'train';
        caboose.classList = 'caboose';
        caboose.textContent = 'caboose \n 2 crew';
        return caboose;
    }
    readonly restriction: PartRestriction = PartRestriction.MustBeLast;
}
