<% if(envSupport) { %>import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
<% } %>import Express from 'express';
<% if(bodyParser) { %>import BodyParser from 'body-parser';<% } %>
<% if(cors) { %>import cors from 'cors';<% } %>
<% if(logging) { %>import { log } from './util/log'<% } %>

const app = Express();

<% if(bodyParser) { %>app.use(BodyParser.json());<% } %>
<% if(cors) { %>app.use(cors());<% } %>

const _PORT = <% if(envSupport) { %>process.env.PORT<% } else { %>8080<% } %>;
app.listen(_PORT, () => {
    <% if(logging) { %>log("INFO", `Listening on ${_PORT}`);<% } else { %>console.log(`Listening on ${8080}`)<% } %>
})