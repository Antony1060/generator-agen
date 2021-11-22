import Generator from "yeoman-generator";
import { AGen } from "./AGen";
import { BaseGenerator, Dependencies } from "./BaseGenerator";

type Answers = {
    stateManagement: "easy-peasy" | "zustand" | null
    fixedDependencies: string[]
}

export class ReactGenerator extends BaseGenerator {

    private answers!: Answers;

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
                    { name: "React Query", value: "react-query" },
                    { name: "Axios", value: "axios" },
                    { name: "Formik", value: "formik" },
                    { name: "yup", value: "yup" }
                ]
            }
        ]

        this.answers = await this.parent.prompt<Answers>(prompts);
    }

    dependencies(): Dependencies {
        const needed = [...this.answers.fixedDependencies];
        if(this.answers.stateManagement)
            needed.push(this.answers.stateManagement)
        const needTypes = ["styled-components", "react-router-dom", "yup"]
        const dev = [
            "typescript", "parcel",
            ...this.answers.fixedDependencies.filter(dep => needTypes.includes(dep)).map(dep => `@types/${dep}`)
        ];
        return {
            needed,
            dev
        }
    }

    copy() {

    }

}