import React from "react";
import ReactDOM from "react-dom";<% if(router) { %>
import { BrowserRouter } from "react-router-dom"<% } %><% if(styledComponents) { %>
import { createGlobalStyle } from "styled-components"<% } %><% if(state) { %>
import { store } from "./state";
import { StoreProvider } from "easy-peasy"<% } %>

import App from "./components/App"
<% if(styledComponents) { %>
const GlobalStyle = createGlobalStyle`
    * {
        font-family: Roboto, Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`<% } %>

ReactDOM.render(
    <React.StrictMode><% if(styledComponents) { %>
        <GlobalStyle /><% } %><% if(state) { %>
        <StoreProvider store={store}><% if(router) { %>
            <BrowserRouter>
                <App />
            </BrowserRouter><% } else { %><App /><% } %>
        </StoreProvider><% } else { %><% if(router) { %>
        <BrowserRouter>
            <App />
        </BrowserRouter><% } else { %>
        <App /><% } %><% } %>
    </React.StrictMode>,
    document.getElementById("root")
)