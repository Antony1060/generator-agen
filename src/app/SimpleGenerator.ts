import Generator from "yeoman-generator";
import { BaseGenerator } from "./BaseGenerator";

export class SimpleGenerator extends BaseGenerator {

    constructor(parent: Generator) {
        super(parent)
    }

    async prompt() {
        
    }

    dependencies() {
        return { needed: [], dev: [] }
    }

    copy() {

    }

}