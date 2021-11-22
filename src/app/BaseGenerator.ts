import { AGen } from "./AGen";

export type Dependencies = {
    needed: string[],
    dev: string[]
}

export abstract class BaseGenerator {
    constructor(protected parent: AGen) {}
    abstract prompt(): Promise<void>
    abstract copy(): void
    abstract dependencies(): Dependencies
}