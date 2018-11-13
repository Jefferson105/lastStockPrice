import Moment from "moment";

import AllSymbols from "../data/symbols.json";

import { makeRequest, returnApiUrl, waitTime, socketConnection } from "../utils";
import { SET_INFO_COMPANY, LOADING_COMPANY, UPDATE_INFO_COMPANY, SET_GRAPH_DATA, SEARCH_SYMBOLS, SET_COMPANIES_LIST } from "./actionTypes";

export const Lasts = () => {
    return async (dispatch, getState) => {
        // List companies
        let symbols = ["googl", "msft", "ubnt", "fb","aapl","amzn", "aal", "axas", "alsk", "nws", "fox", "atvi", "cznc", "iova", "mesa", "socl"];
        
        // Socket conection for real time data
        let socket = socketConnection();

        // Wait connection and subscribe all symbols
        socket.on("connection", socket.emit('subscribe', symbols.join(",")));

        // Listen for messages in websocket
        socket.on("message", async message => {
            let { companiesList } = getState();
            let company = JSON.parse(message);
            let symbol = company.symbol.toLowerCase(); 

            // Check if simbol has in object 
            if(!companiesList[symbol]) companiesList[symbol] = { companyName: AllSymbols.filter(({ s }) => s.toLowerCase() == symbol)[0].n };

            // Check if information was updated.
            if(company.lastSalePrice == companiesList[symbol].lastSalePrice) return;

            // Format date
            company.latestUpdate = Moment(message.lastUpdated).format("DD/MM/YY HH:mm");

            // Add ou update data
            companiesList[symbol] = { ...companiesList[symbol], ...company };

            dispatch({ type: SET_COMPANIES_LIST, data: companiesList });
        });
    }
}

export const getLastPrice = (symbol) => {
    return async (dispatch, getState, { socket }) => {
        const { company } = getState();
        const oldSymbol = company.info ? company.info.symbol.toLowerCase() : null;

        if(oldSymbol != symbol) {
            try {
                // empty search
                dispatch({ type: SEARCH_SYMBOLS, data: [] });
                
                // unsubscribe last symbol
                socket.emit("unsubscribe", oldSymbol);

                // Init loading
                dispatch({ type: LOADING_COMPANY });

                let data = await makeRequest({ url: returnApiUrl(symbol) });

                // Check for errors in call
                if(data.error) {
                    dispatch({ type: SET_INFO_COMPANY, data: { error: data.message, symbol }});    
                    return;
                }

                // Format date
                data.latestUpdate = Moment(data.latestUpdate).format("DD/MM/YY HH:mm");

                dispatch({ type: SET_INFO_COMPANY, data });

                // Listen for messages in websocket
                socket.on("message", async message => {
                    let { company } = getState();
                    let newInfo = JSON.parse(message);

                    let info = company.info || {};

                    // Check if information was updated
                    if(newInfo.lastSalePrice == info.lastSalePrice) return;

                    // Format date
                    newInfo.latestUpdate = Moment(newInfo.lastUpdated).format("DD/MM/YY HH:mm");
                    newInfo.latestPrice = newInfo.lastSalePrice;

                    dispatch({ type: UPDATE_INFO_COMPANY, data: newInfo });
                });

                // Subscribe new symbol
                socket.emit("subscribe", symbol);
            }catch(err) {
                dispatch({ type: SET_INFO_COMPANY, data: { error: "An error has ocurred.", symbol }});
            }
        }
    }
}

export const getChartInfo = (symbol) => {
    return async dispatch => {
        try {
            let data = await makeRequest({ url: returnApiUrl(symbol, "chart") });

            // Check for errors
            if(data.error) return;

            // Map data graph information
            data = data.map(({ close, label }) => ({ name: label, price: close }));

            dispatch({ type: SET_GRAPH_DATA, data: data.slice(-6) });
        }catch(err) {
            //console.error(err);
        }
    }
}

export const searchSymbol = (typed) => {
    return dispatch => {
        // Filter companies
        let found = AllSymbols.filter(({ s, n }) => `${s.toLowerCase()}${n.toLowerCase()}`.indexOf(typed.toLowerCase()) > -1);

        dispatch({ type: SEARCH_SYMBOLS, data: found });
    }
}