import Generator from "yeoman-generator";
import { AGen } from "./AGen";
import { BaseGenerator } from "./BaseGenerator";

type Answers = {
    env: boolean,
    logging: boolean,
    fixedDependencies: string[]
}

export class ExpressGenerator extends BaseGenerator {

    private answers!: Answers;

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

        this.answers = await this.parent.prompt<Answers>(prompts);
    }

    dependencies() {
        const needed = ["typescript", "ts-node", ...this.answers.fixedDependencies];
        if(this.answers.env)
            needed.push("dotenv");
        if(this.answers.logging)
            needed.push("chalk");
        return {
            needed,
            dev: ["@types/node", "ts-node-dev"]
        }
    }

    copy() {

    }

}