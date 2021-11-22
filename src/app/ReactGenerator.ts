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
                    { name: "Styled Components", value: "styled-components", checked: true },
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
        const needed = ["react", "react-dom", ...this.answers.fixedDependencies];
        if(this.answers.stateManagement)
            needed.push(this.answers.stateManagement)
        const needTypes = ["styled-components", "react-router-dom", "yup"]
        const dev = [
            "typescript", "parcel", "@types/react", "@types/react-dom",
            ...this.answers.fixedDependencies.filter(dep => needTypes.includes(dep)).map(dep => `@types/${dep}`)
        ];
        return {
            needed,
            dev
        }
    }

    copy() {
        const { needed } = this.dependencies();

        const ejsContext = {
            appName: this.parent.answers.appName,
            router: needed.includes("react-router-dom"),
            styledComponents: needed.includes("styled-components"),
            state: needed.includes("easy-peasy")
        }

        this.parent._copyTpl(this.parent.templatePath("react-parcel"), this.parent.destinationPath(), ejsContext);

        if(!ejsContext.state)
            this.parent.fs.delete(this.parent.destinationPath("src/state"));

        this.parent.fs.write(this.parent.destinationPath(".env"), "");
        this.parent.fs.write(this.parent.destinationPath(".env.example"), "");
    }

}