import App, { Container } from "next/app";
import { connect, Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Head from 'next/head'
import { configureStore } from "../store";

import { Lasts } from "../actions";

class MyApp extends App {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(Lasts());
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <React.Fragment>
                        <Head>
                            <title>Last Stock</title>
                        </Head>
                        <Component {...pageProps} />
                    </React.Fragment>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(configureStore)(connect(state => state)(MyApp));