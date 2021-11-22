import Generator from "yeoman-generator";
import chalk from 'chalk'
import { ReactGenerator } from "./ReactGenerator";
import { ExpressGenerator } from "./ExpressGenerator";
import { SimpleGenerator } from "./SimpleGenerator";
import { BaseGenerator } from "./BaseGenerator";

type Answers = {
    appName: string,
    packageManager: "npm" | "yarn"
    type: "react" | "express" | "simple"
}

export class AGen extends Generator {

    public answers!: Answers
    private target!: BaseGenerator

    constructor(args: string | string[], opts: any) {
        super(args, opts)
    }

    async prompting() {
        const prompts: Generator.Question[] = [
            {
                type: "input",
                name: "appName",
                message: "Name of your project?",
                default: this.appname
            },
            {
                type: "list",
                name: "packageManager",
                message: "Select preferred package manager",
                choices: [
                    { name: "NPM", value: "npm" },
                    { name: "Yarn", value: "yarn" }
                ]
            },
            {
                type: "list",
                name: "type",
                message: "Select project type",
                choices: [
                    { name: "React app (Parcel/Typescript)", value: "react" },
                    { name: "Express app (Typescript)", value: "express" },
                    { name: "Simple Node app (Javascript|Typescript)", value: "simple" }
                ]
            }
        ]

        this.answers = await this.prompt<Answers>(prompts);
        
        this.env.options.nodePackageManager = this.answers.packageManager;

        switch(this.answers.type) {
            case "react":
                this.target = new ReactGenerator(this);
                break;
            case "express":
                this.target = new ExpressGenerator(this);
                break;
            case "simple":
                this.target = new SimpleGenerator(this);
                break;
        }

        this.log(`Running generator for ${chalk.yellowBright`${this.answers.appName}`}: ${chalk.greenBright`${this.target.constructor.name}`}`)
        
        await this.target.prompt();
    }

    writing() {
        this.target.copy();
    }

    installdeps() {
        const dependencies = this.target.dependencies();
        this.addDevDependencies(dependencies.dev);
        this.addDependencies(dependencies.needed);
    }

    end() {
        this.log(`${chalk.greenBright`${this.target.constructor.name}`} finished!`)
    }

}