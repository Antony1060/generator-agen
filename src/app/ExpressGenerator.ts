import Generator from "yeoman-generator";
import { AGen } from "./AGen";
import { BaseGenerator } from "./BaseGenerator";

type Answers = {
    logging: boolean,
    env: boolean,
    fixedDependencies: string[]
}

export class ExpressGenerator extends BaseGenerator {

    constructor(parent: AGen) {
        super(parent)
    }

    async prompt() {
        const prompts: Generator.Question[] = [
            {
                type: "confirm",
                name: "env",
                message: "Support enviornment variables?",
                default: true
            },
            {
                type: "confirm",
                name: "logging",
                message: "Install logging utility?",
                default: true
            },
            {
                type: "checkbox",
                name: "fixedDependencies",
                message: "Select extra dependencies",
                choices: [
                    { name: "CORS", value: "cors" },
                    { name: "Body Parser", value: "body-parser" },
                    { name: "Axios", value: "axios" }
                ]
            }
        ]

        await this.parent.prompt<Answers>(prompts);
    }

    dependencies() {
        return { needed: [], dev: [] }
    }

    copy() {

    }

}