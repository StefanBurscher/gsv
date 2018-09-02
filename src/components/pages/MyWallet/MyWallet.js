import React from 'react';
import namor from "namor";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import InstagramEmbed from 'react-instagram-embed'
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Table,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  Media
} from 'reactstrap';
import classnames from 'classnames';
import './MyWallet.css';
import currencyList from '../../../utils/currency_list';
import axios from 'axios';

export default class MyWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeTab: '1',
      toggleInvestment: false,
      toggleMarket: false,
      toggleClassification: false,
      toggleCoin: false,
      posts: [],
      hashtags: []
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleInvestment = this.toggleInvestment.bind(this);
    this.toggleMarket = this.toggleMarket.bind(this);
    this.toggleClassification = this.toggleClassification.bind(this);
    this.toggleCoin = this.toggleCoin.bind(this);
    this.renderHashtags = this.renderHashtags.bind(this);
    this.renderPost = this.renderPost.bind(this);
  }
  componentDidMount() {
    // axios.post('http://173.249.46.156/api/v1/get_hashtags_by_day/1')
    //   .then(response => {
    //     console.log(response);
    //     this.setState({
    //       hastags: response
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // var a = {
    //   "LTC": 250,
    //   "BTC": 1474,
    //   "TRC": 0,
    //   "NVC": 0,
    // }
    // this.setState({
    //   hastags: a
    // })
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res);
      })
    axios.get('http://173.249.46.156/api/v1/get_count_hashtags/30')
      .then(response => {
        console.log(response);
        this.setState({
          hastags: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('http://173.249.46.156/api/v1/get_posts')
      .then(response => {
        this.setState({
          posts: response.data.data.items
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleInvestment() {
    this.setState({
      toggleInvestment: !this.state.toggleInvestment,
      toggleMarket: false,
      toggleClassification: false,
      toggleCoin: false
    });
  }
  toggleMarket() {
    this.setState({
      toggleInvestment: false,
      toggleMarket: !this.state.toggleMarket,
      toggleClassification: false,
      toggleCoin: false
    });
  }
  toggleClassification() {
    this.setState({
      toggleInvestment: false,
      toggleMarket: false,
      toggleClassification: !this.state.toggleClassification,
      toggleCoin: false
    });
  }
  toggleCoin() {
    this.setState({
      toggleInvestment: false,
      toggleMarket: false,
      toggleClassification: false,
      toggleCoin: !this.state.toggleCoin
    });
  }

  renderTable() {
    var elem = [];
    for (var k in currencyList) {
      elem.push(
        <tr>
          <th scope="row" className="text-center">{k}</th>
          <td>Coin name</td>
          <td><img src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + currencyList[k] + '.png'} alt={k} width="32" className="m-auto d-block" /></td>
          <td>Blockchain <br />infrastructure</td>
          <td>coin price</td>
          <td>coin market capitalization</td>
        </tr>
      )
    }
    return elem;
  }

  renderHashtags() {
    var elem = [];
    var hastagsList = this.state.hastags;
    for (var k in hastagsList) {
      elem.push(
        <span className="maequeeFirstLine">{k}<span className="maequeeFirstLineValue">{' ' + hastagsList[k]}</span></span>
      )
    }
    return elem;
  }
  renderPost() {
    var elem = [];
    var postList = this.state.posts;
    for (var index = 0; index < postList.length; index++) {
      const element = postList[index];
      if (element.type == 'tweet') {
        elem.push(
          <TwitterTweetEmbed
            tweetId={element.id_post}
          />
        )
      }

    }
    return elem;
  }

  newPerson = () => {
    const statusChance = Math.random();
    return {
      myBag: namor.generate({ words: 1, numbers: 0 }),
      id: 'ID' + Math.floor(Math.random() * 30),
      units: Math.floor(Math.random() * 30),
      price: Math.floor(Math.random() * 30),
      marketValue: Math.floor(Math.random() * 30),
      satoshi: Math.floor(Math.random() * 30),
      amount: Math.floor(Math.random() * 30),
      beta: Math.floor(Math.random() * 30),
      mctr: Math.floor(Math.random() * 30),
      actr: Math.floor(Math.random() * 30),
      "3d": 'PERF',
      "3w": 'PERF',
      "3m": 'PERF',
      "3w": 'PERF',
      "1m": 'PERF',
      "3m": 'PERF',
      "si": 'PERF',
    };
  };

  render() {
    var data = [];
    for (let index = 0; index < 100; index++) {
      data.push(this.newPerson())
    }
    const columns = [
      {
        Header: "HOLDINGS",
        columns: [
          {
            Header: 'My Bag',
            accessor: 'myBag'
          }, {
            Header: 'ID',
            accessor: 'id'
          }, {
            Header: 'UNITS',
            accessor: 'units' // String-based value accessors!
          }, {
            Header: 'PRICE USD',
            accessor: 'price' // String-based value accessors!
          }, {
            Header: 'MARKET VALUE',
            accessor: 'marketValue' // String-based value accessors!
          }, {
            Header: 'SATOSHI',
            accessor: 'satoshi' // String-based value accessors!
          }, {
            Header: 'Amount',
            accessor: 'amount' // String-based value accessors!
          }
        ]
      }, {
        Header: "FINANCIAL METRICS",
        columns: [
          {
            Header: 'BETA',
            accessor: 'beta' // String-based value accessors!
          }, {
            Header: 'MCTR',
            accessor: 'mctr' // String-based value accessors!
          }, {
            Header: 'ACTR',
            accessor: 'actr' // String-based value accessors!
          },
          {
            Header: 'ANNUALIZED VOLATILITY',
            accessor: 'beta' // String-based value accessors!
          }, {
            Header: 'SHARPE RATIO',
            accessor: 'mctr' // String-based value accessors!
          }, {
            Header: 'TREYNOR RATIO',
            accessor: 'actr' // String-based value accessors!
          },
          {
            Header: 'RoMAD',
            accessor: 'beta' // String-based value accessors!
          },
          {
            Header: 'SORTINO RATIO',
            accessor: 'beta' // String-based value accessors!
          }
        ]
      }, {
        Header: "PERFORMANCE",
        columns: [
          {
            Header: '3D',
            accessor: '3d' // String-based value accessors!
          }, {
            Header: '3W',
            accessor: '3w' // String-based value accessors!
          }, {
            Header: '3M',
            accessor: '3m' // String-based value accessors!
          },
          {
            Header: '3W',
            accessor: '3w' // String-based value accessors!
          }, {
            Header: '1M',
            accessor: '1m' // String-based value accessors!
          }, {
            Header: '3M',
            accessor: '3m' // String-based value accessors!
          },
          {
            Header: 'SI',
            accessor: 'si' // String-based value accessors!
          }
        ]
      }
    ]
    return (
      <div style={{ color: '#000' }}>
        <Navbar light expand="md">
          <Col md="4">
            <NavbarBrand href="/">
              My wallet
            </NavbarBrand>
          </Col>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Col md="8">
            </Col>
            <Col md="4">
              <Nav className="m-auto" navbar>
                <NavbarBrand href="/">
                  <Media object src="/GSV.png" width="100%" alt="gsv" />
                </NavbarBrand>
              </Nav>
            </Col>
          </Collapse>
        </Navbar>

        <ReactTable
          data={data}
          columns={columns}
        />
      </div>
    );
  }
}