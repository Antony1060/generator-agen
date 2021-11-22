import Generator from "yeoman-generator";
import chalk from 'chalk'
import { ReactGenerator } from "./ReactGenerator";
import { ExpressGenerator } from "./ExpressGenerator";
import { SimpleGenerator } from "./SimpleGenerator";
import { BaseGenerator } from "./BaseGenerator";
import ejs, { Options as EJSOptions } from "ejs";

type Answers = {
    appName: string,
    initGit: boolean,
    packageManager: "npm" | "yarn",
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
                type: "confirm",
                name: "initGit",
                message: "Initialize as git repository?",
                default: true
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

    async writing() {
        this.target.copy();
        this.log("Resolving dependencies...");
        await this._installDeps();
    }

    async _installDeps() {
        const dependencies = this.target.dependencies();
        await this.addDependencies(dependencies.needed);
        await this.addDevDependencies(dependencies.dev);
    }

    _copyPackageJson(path: string, context: { [key: string]: unknown }) {
        this.packageJson.merge(JSON.parse(ejs.render(this.fs.read(this.templatePath(path)), context)))
    }

    // this.fs.copyTpl but it ignores package.json
    _copyTpl(paths: string | string[], to: string, context?: { [key: string]: unknown }, ejsOptions?: EJSOptions) {
        this.fs.copyTpl(paths, to, context, ejsOptions, { globOptions: { ignore: "package.json" } });
        if(this.fs.exists(this.destinationPath("gitignore"))) {
            if(this.answers.initGit)
                this.fs.move(this.destinationPath("gitignore"), this.destinationPath(".gitignore"));
            else
                this.fs.delete(this.destinationPath("gitignore"));
        }
    }

    end() {
        this.log(`${chalk.greenBright`${this.target.constructor.name}`} finished!`)
    }

}