import { connect } from "react-redux";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

import Header from "../components/styles/blocks/header";
import Form from "../components/styles/blocks/form";
import Box from "../components/styles/blocks/box";
import Container from "../components/styles/blocks/container";
import H1 from "../components/styles/elements/h1";

import { getLastPrice, getChartInfo, searchSymbol } from "../actions";

class Index extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            symbol: ""
        }

        this.changeInput = this.changeInput.bind(this);
        this.sendSymbol = this.sendSymbol.bind(this);
    }

    changeInput(e) {
        if(e.keyCode == 13) {
            this.sendSymbol();
        }else {
            let symbol = e.target.value;
            this.setState({ symbol });
            this.props.dispatch(searchSymbol(symbol));
        }
    }

    sendSymbol(s) {
        let symbol = s || this.state.symbol.toLowerCase();
        this.props.dispatch(getLastPrice(symbol));
        this.props.dispatch(getChartInfo(symbol));

        this.setState({ symbol: "" });
    }

    render() {
        const { symbol } = this.state;
        const { company, searchList, companiesList } = this.props;

        return(
            <React.Fragment>
                <Header>
                    {
                        !!Object.values(companiesList).length &&
                        <Header.List>
                        {
                            Object.values(companiesList).map((v, i) => 
                                <Header.Item key={i}>
                                    <Header.Name>{v.companyName}</Header.Name>
                                    <Header.DateTime>{v.latestUpdate}</Header.DateTime>
                                    <Header.Price>$ {v.lastSalePrice}</Header.Price>
                                    <Header.Variation>% {v.marketPercent}</Header.Variation>
                                </Header.Item>
                            )
                        }
                        </Header.List>
                    }
                </Header>
                <Container>
                    <H1>Last Stock</H1>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Title>Search a company:</Form.Title>
                        <Form.Input defaultValue={symbol} onKeyUp={this.changeInput} />
                        <Form.Button>OK</Form.Button>
                        {
                            !!symbol &&
                            <Form.List>
                                {
                                    searchList.length ?
                                        searchList.map(({ s, n }, i) => <Form.Item onClick={this.sendSymbol.bind(this, s)} key={i}>{s} - {n}</Form.Item>) :
                                        <Form.Item>No results</Form.Item>
                                }
                            </Form.List>
                        }
                    </Form>
                    {
                        company.loading ?
                            <Box><Box.Loading src="/static/img/loading.svg" /></Box> :
                            !!company.info &&
                            <Box>
                                {
                                    company.info.error ?
                                        <Box.DateTime>{company.info.error}</Box.DateTime> :
                                        <React.Fragment>
                                            <Box.Title>{company.info.companyName}</Box.Title>
                                            <Box.Price>$ {company.info.latestPrice}</Box.Price>
                                            <Box.DateTime>{company.info.latestUpdate}</Box.DateTime>
                                            {
                                                !!company.graphData &&
                                                <LineChart width={400} height={200} data={company.graphData} margin={{ top: 20 }}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="price" stroke="#045285" />
                                                </LineChart>
                                            }
                                        </React.Fragment>
                                }
                            </Box>
                    }
                </Container>
                <div style={{ position: "absolute", top: "0", width: "100%", height: "100%", zIndex: "-1", backgroundColor: "rgba(14, 46, 71, 0.85)" }}></div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { company, searchList, companiesList } = state;
    return { company, searchList: searchList.searchList, companiesList }
}

export default connect(mapStateToProps)(Index);