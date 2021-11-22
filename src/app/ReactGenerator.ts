import Generator from "yeoman-generator";
import { AGen } from "./AGen";
import { BaseGenerator } from "./BaseGenerator";

type Answers = {
    stateManagement: "easy-peasy" | "zustand" | null
    fixedDependencies: string[]
}

export class ReactGenerator extends BaseGenerator {

    constructor(parent: AGen) {
        super(parent)
    }

    async prompt() {
        const prompts: Generator.Question[] = [
            {
                type: "list",
                name: "stateManagement",
                message: "Select preferred state management library",
                choices: [
                    { name: "None", value: null },
                    { name: "Easy Peasy", value: "easy-peasy" },
                    { name: "Zustand", value: "zustand" }
                ]
            },
            {
                type: "checkbox",
                name: "fixedDependencies",
                message: "Select extra dependencies",
                choices: [
                    { name: "Style Components", value: "styled-components", checked: true },
                    { name: "React Router", value: "react-router-dom", checked: true },
                    { name: "Axios", value: "axios" },
                    { name: "Formik", value: "formik" },
                    { name: "yup", value: "yup" }
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