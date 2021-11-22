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
        const needed = ["express", "typescript", "ts-node", ...this.answers.fixedDependencies];
        if(this.answers.env)
            needed.push("dotenv");
        if(this.answers.logging)
            needed.push("chalk");

        const dev = ["@types/express", "@types/node", "ts-node-dev"];
        if(this.answers.fixedDependencies.includes("cors"))
            dev.push("@types/cors");
        return {
            needed,
            dev
        }
    }

    copy() {
        const { needed } = this.dependencies();

        const ejsContext = {
            appName: this.parent.answers.appName,
            envSupport: this.answers.env,
            logging: this.answers.logging,
            bodyParser: needed.includes("body-parser"),
            cors: needed.includes("cors"),
        }

        this.parent._copyTpl(this.parent.templatePath("node-express"), this.parent.destinationPath(), ejsContext);
        if(this.answers.env) {
            this.parent.fs.write(this.parent.destinationPath(".env"), "DEBUG=true\nPORT=8080");
            this.parent.fs.write(this.parent.destinationPath(".env.example"), "DEBUG=true\nPORT=8080");
        } else {
            this.parent.fs.delete(this.parent.destinationPath("typings"));
        }

        if(!this.answers.logging)
            this.parent.fs.delete(this.parent.destinationPath("util"));

        this.parent._copyPackageJson("node-express/package.json", ejsContext);
    }

}