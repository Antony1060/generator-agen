import Generator from "yeoman-generator";

export type Dependencies = {
    needed: string[],
    dev: string[]
}

export abstract class BaseGenerator {
    constructor(protected parent: Generator) {}
    abstract prompt(): Promise<void>
    abstract copy(): void
    abstract dependencies(): Dependencies
}