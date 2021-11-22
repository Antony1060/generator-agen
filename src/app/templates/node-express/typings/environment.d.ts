// for autocomplete purposes
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            DEBUG: string
        }
    }
}

export {};