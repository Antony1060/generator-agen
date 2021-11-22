import Generator from "yeoman-generator";
import { AGen } from "./AGen";
import { BaseGenerator } from "./BaseGenerator";

type Answers = {
    language: "js" | "ts"
}

export class SimpleGenerator extends BaseGenerator {

    constructor(parent: AGen) {
        super(parent)
    }

    async prompt() {
        const prompts: Generator.Question[] = [
            {
                type: "list",
                name: "language",
                message: "Select language",
                choices: [
                    { name: "JavaScript", value: "js" },
                    { name: "TypeScript", value: "ts" }
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