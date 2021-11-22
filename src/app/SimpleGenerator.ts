import Generator from "yeoman-generator";
import { AGen } from "./AGen";
import { BaseGenerator, Dependencies } from "./BaseGenerator";

type Answers = {
    language: "js" | "ts"
}

export class SimpleGenerator extends BaseGenerator {

    private answers!: Answers

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

        this.answers = await this.parent.prompt<Answers>(prompts);
    }

    dependencies(): Dependencies {
        if(this.answers.language === "js")
            return { needed: [], dev: ["nodemon"] }

        return {
            needed: ["typescript", "ts-node"],
            dev: ["@types/node", "ts-node-dev"]
        }
    }

    copy() {
        const fs = this.parent.fs;

        const ejsContext = {
            appName: this.parent.answers.appName,
            ext: this.answers.language
        }

        // create index file
        fs.write(this.parent.destinationPath(`src/index.${this.answers.language}`), "");
        if(this.parent.answers.initGit)
            fs.copyTpl(this.parent.templatePath("simple/gitignore"), this.parent.destinationPath(".gitignore"));

        this.parent._copyPackageJson("simple/package.json", ejsContext);
    }

}