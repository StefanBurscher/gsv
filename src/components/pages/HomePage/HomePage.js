import React from 'react';
import { withRouter } from 'react-router-dom';
import { TwitterTweetEmbed } from 'react-twitter-embed';
// import TweetEmbed from 'react-tweet-embed'
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
import './HomePage.css';
import Pagination from '../../atoms/Pagination/Pagination';
import axios from 'axios';

class HomePage extends React.Component {
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
      hashtags: [],
      coinsTableData: [],
      currencies: [{ symbol: '', name: '' }],
      ordersPagination: {
        count: 1500,
        offset: 0,
        limit: 10
      },
      sort_order: 'ASC',
      sort_column: 'currency_id'
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleInvestment = this.toggleInvestment.bind(this);
    this.toggleMarket = this.toggleMarket.bind(this);
    this.toggleClassification = this.toggleClassification.bind(this);
    this.toggleCoin = this.toggleCoin.bind(this);
    this.renderHashtags = this.renderHashtags.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.loadTableData = this.loadTableData.bind(this);
    this.loadHashtags = this.loadHashtags.bind(this);
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

    // axios.get('http://173.249.46.156/api/v1/resources/ticker_list')
    //   .then(response => {
    //     console.log(response.data.data.rows)
    //     this.setState({ coinsTableData: response.data.data.rows })
    //   })

    axios.get('http://173.249.46.156/api/v1/resources/currency_list')
      .then(response => {
        this.setState({ currencies: response.data.data.rows }, () => {
          this.loadTableData(0, this.state.ordersPagination.limit)
        })
      })
    this.loadHashtags(30);
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

  loadTableData(offset, limit) {
    this.setState({ ordersLoading: true });
    axios.get('http://173.249.46.156/api/v1/resources/ticker_list?offset=' + offset + '&limit=' + limit + '&sort_column=' + this.state.sort_column + '&sort_order=' + this.state.sort_order)
      .then(response => {
        this.setState(() => ({
          coinsTableData: response.data.data.rows,
          ordersLoading: false,
          ordersPagination: {
            limit: 10,
            count: response.data.data.count,
            offset: offset
          }
        })
        );
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push('/login');
        } else {
          this.setState({ somethingWentWrong: true })
        }
      })
  }

  loadHashtags(days) {
    axios.get('http://173.249.46.156/api/v1/get_count_hashtags/' + days)
      .then(response => {
        this.setState({
          hastags: response.data
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

  // renderTable() {
  //   var elem = [];
  //   for (var k in currencyList) {
  //     elem.push(
  //       <tr>
  //         <th scope="row" className="text-center">{k}</th>
  //         <td>Coin name</td>
  //         <td><img src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + currencyList[k] + '.png'} alt={k} width="32" className="m-auto d-block" /></td>
  //         <td>Blockchain <br />infrastructure</td>
  //         <td>coin price</td>
  //         <td>coin market capitalization</td>
  //       </tr>
  //     )
  //   }
  //   return elem;
  // }

  renderHashtags() {
    var elem = [];
    var hastagsList = this.state.hastags;
    for (var k in hastagsList) {
      elem.push(
        <span className="maequeeFirstLine" key={k}>{k}<span className="maequeeFirstLineValue">{' ' + hastagsList[k]}</span></span>
      )
    }
    return elem;
  }
  renderPost() {
    var elem = [];
    var postList = this.state.posts;
    for (var index = 0; index < postList.length; index++) {
      const element = postList[index];
      if (element.type === 'tweet') {
        elem.push(
          <TwitterTweetEmbed key={index} tweetId={element.id_post} />
        )
      }

    }
    return elem;
  }

  openForum(index) {
    this.props.history.push('/forum/' + index);
  }

  renderTable(data) {
    console.log(data)
    return data.length ?
      (
        data.map((item, index) => {
          // console.log(item)
          return (
            <tr key={index} onClick={() => this.openForum(item.currency_id)} style={{ cursor: 'pointer' }}>
              <th scope="row" style={{ lineHeight: '50px' }}>{item.currency_id}</th>
              <td style={{ paddingRight: 5 }}>
                <img style={{ paddingTop: 9 }} src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + item.currency_id + '.png'} alt={'BTC'} width="32" className="m-auto d-block" />
              </td>
              <td style={{ paddingLeft: 5 }}>
                <strong>{this.state.currencies[item.currency_id].symbol}</strong> <br /> {this.state.currencies[item.currency_id].name}
              </td>
              <td style={{ lineHeight: '50px' }}><span className={index % 2 ? "priceSpan" : "priceSpanSecond"}>{'$' + (item.price_usd).formatMoney(2, '.', ',')}</span></td>
              <td style={{ lineHeight: '50px' }}><span style={{ color: item.change_24h > 0 ? '#40b057' : '#cf2526' }}>{item.change_24h}%</span></td>
              <td style={{ lineHeight: '50px' }}>${Number(item.market_cap).formatMoney(0, '.', ',')}</td>
              <td style={{ lineHeight: '50px' }}>${Number(item.daily_volume).formatMoney(0, '.', ',')}</td>
            </tr>
          )
        })
      )
      : null;
  }
  sort(sort_column) {
    const sort_order = (this.state.sort_order == 'ASC' ? 'DESC' : 'ASC');
    this.setState(
      { sort_order: sort_order, sort_column: sort_column },
      () => this.loadTableData(0, this.state.ordersPagination.limit)
    );
  }

  coinFormatter(num) {
    if (num > 999999) {
      return num > 999 ? (num / 1000000).formatMoney(2, '.', ',') + 'M' : num
    } else if (num > 999) {
      return (num / 1000).formatMoney(2, '.', ',') + 'K';
    } else {
      return num;
    }
    return num > 999 ? (num / 1000).formatMoney(2, '.', ',') + 'k' : num
  }

  render() {
    return (
      <div style={{ color: '#fff' }}>

        <Navbar light expand="md">
          <Col md="4">
            <NavbarBrand href="/">
              {/* <Media object src="log.png" width="100%" alt="gsv" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} /> */}
              <Media object src="log.png" width="100%" alt="gsv" />
            </NavbarBrand>
          </Col>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Col md="10">
              <Nav className="m-auto" navbar>
                <NavItem className="m-auto" style={{ width: '100%' }}>
                  <marquee>
                    <this.renderHashtags />
                  </marquee>
                  <marquee>
                    {/* <span className="maequeeFirstLine">TRC <span className="maequeeFirstLineValue">+7</span></span>
                    <span className="maequeeFirstLine">MNC <span className="maequeeFirstLineValue">-2.4</span></span>
                    <span className="maequeeFirstLine">BTC <span className="maequeeFirstLineValue">+4</span></span>
                    <span className="maequeeFirstLine">NMC <span className="maequeeFirstLineValue">-4</span></span>
                    <span className="maequeeFirstLine">LTC <span className="maequeeFirstLineValue">-2</span></span>
                    <span className="maequeeFirstLine">LTC <span className="maequeeFirstLineValue">+2.8</span></span>
                    <span className="maequeeFirstLine">PPC <span className="maequeeFirstLineValue">-4</span></span>
                    <span className="maequeeFirstLine">NMC <span className="maequeeFirstLineValue">-4</span></span>
                    <span className="maequeeFirstLine">NVC <span className="maequeeFirstLineValue">+5</span></span>
                    <span className="maequeeFirstLine">PPC <span className="maequeeFirstLineValue">+4</span></span>
                    <span className="maequeeFirstLine">NVC <span className="maequeeFirstLineValue">+4</span></span>
                    <span className="maequeeFirstLine">FTC <span className="maequeeFirstLineValue">-4</span></span>
                    <span className="maequeeFirstLine">MNC <span className="maequeeFirstLineValue">-1.1</span></span>
                    <span className="maequeeFirstLine">FTC <span className="maequeeFirstLineValue">+1</span></span>
                    <span className="maequeeFirstLine">BTC <span className="maequeeFirstLineValue">-4</span></span>
                    <span className="maequeeFirstLine">TRC <span className="maequeeFirstLineValue">+4</span></span> */}
                  </marquee>
                </NavItem>
                <Card className="classificationToggleCard" style={{ margin: '0 10px' }}>
                  <CardBody className="classificationToggleCardBody" style={{ padding: 5, width: 70 }}>
                    <span>Twitter</span>
                    <FormGroup check>
                      <Label check>
                        <Input id="tw1" onClick={() => this.loadHashtags(1)} type="radio" name="radioTwiter" />{' '}
                        <span>1D</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input id="tw2" onClick={() => this.loadHashtags(7)} type="radio" name="radioTwiter" />{' '}
                        <span>1W</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input id="tw3" onClick={() => this.loadHashtags(30)} type="radio" name="radioTwiter" defaultChecked />{' '}
                        <span>1M</span>
                      </Label>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Nav>
            </Col>
            <Col md="2">
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Collapse>
        </Navbar>

        <div style={{ padding: '0 15px' }}>
          <br />
          <Row>
            <Col md="3">
              <this.renderPost />
              {/* <InstagramEmbed
                url='https://instagr.am/p/BlWXjaFFghd/'
              />*/}
            </Col>
            <Col md="9">
              <Row>
                <Col md="8">
                  <div className="m-auto toggleDiv" style={{ display: 'table' }}>
                    <div className="buttonsToggleDiv">
                      <Button className="classification" color="primary" onClick={this.toggleInvestment}>Global Investable Market</Button>
                      <Button className="classification" color="primary" onClick={this.toggleClassification}>Classification</Button>
                      <Button className="classification" color="primary" onClick={this.toggleCoin}>Coin or Token</Button>
                    </div>
                    <Collapse isOpen={this.state.toggleInvestment}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 600</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 100</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 50</span>
                            </Label>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <Collapse isOpen={this.state.toggleClassification}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Blockchain Infrastructure</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Financial Services</span>
                            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Trading and Exchanges</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Computing and AI</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Network and Communications</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Gaming and VR</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Commerce and Advertising</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Media and Content</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Funding and Venture Capital</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Tokenization</span>
                            </Label>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <Collapse isOpen={this.state.toggleCoin}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio3" />{' '}
                              <span>Coin</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio3" />{' '}
                              <span>Token</span>
                            </Label>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <br />
                  <Table>
                    <thead>
                      <tr>
                        <th><p onClick={() => this.sort('currency_id')}>No.{this.state.sort_order == 'ASC' ? <span style={{ fontSize: 10, padding: 7 }}>&#9650;</span> : <span style={{ fontSize: 10, padding: 7 }}>&#9660;</span>}</p></th>
                        <th colSpan="2">Name</th>
                        <th><p onClick={() => this.sort('price_usd')}>Price {this.state.sort_order == 'ASC' ? <span style={{ fontSize: 10, padding: 7 }}>&#9650;</span> : <span style={{ fontSize: 10, padding: 7 }}>&#9660;</span>}</p></th>
                        <th><p onClick={() => this.sort('change_24h')}>24h Change{this.state.sort_order == 'ASC' ? <span style={{ fontSize: 10, padding: 7 }}>&#9650;</span> : <span style={{ fontSize: 10, padding: 7 }}>&#9660;</span>}</p></th>
                        <th><p onClick={() => this.sort('market_cap')}>Market Cap{this.state.sort_order == 'ASC' ? <span style={{ fontSize: 10, padding: 7 }}>&#9650;</span> : <span style={{ fontSize: 10, padding: 7 }}>&#9660;</span>}</p></th>
                        <th><p onClick={() => this.sort('daily_volume')}>24h Vol(Global){this.state.sort_order == 'ASC' ? <span style={{ fontSize: 10, padding: 7 }}>&#9650;</span> : <span style={{ fontSize: 10, padding: 7 }}>&#9660;</span>}</p></th>
                      </tr >
                    </thead >
                    <tbody>
                      {/* <this.renderTable data={this.state.coinsTableData} /> */}
                      {this.state.coinsTableData.length ?
                        (
                          this.state.coinsTableData.map((item, index) => {
                            // console.log(item)
                            return (
                              <tr key={index} onClick={() => this.openForum(item.currency_id)} style={{ cursor: 'pointer' }}>
                                <td scope="row" style={{ lineHeight: '50px', textAlign: 'center' }}><b>{item.currency_id}</b></td>
                                <td style={{ paddingRight: 5 }}>
                                  <img style={{ paddingTop: 9 }} src={'https://s2.coinmarketcap.com/static/img/coins/32x32/' + item.currency_id + '.png'} alt={'BTC'} width="32" className="m-auto d-block" />
                                </td>
                                <td style={{ paddingLeft: 5 }}>
                                  <strong>{this.state.currencies[item.currency_id].symbol}</strong> <br /> {this.state.currencies[item.currency_id].name}
                                </td>
                                <td style={{ lineHeight: '50px' }}><span className={index % 2 ? "priceSpan" : "priceSpanSecond"}>{'$' + (item.price_usd).formatMoney(2, '.', ',')}</span></td>
                                <td style={{ lineHeight: '50px' }}><span style={{ color: item.change_24h > 0 ? '#40b057' : '#cf2526' }}>{item.change_24h}%</span></td>
                                <td style={{ lineHeight: '50px' }}>${this.coinFormatter(Number(item.market_cap))}</td>
                                <td style={{ lineHeight: '50px' }}>${this.coinFormatter(Number(item.daily_volume))}</td>
                              </tr>
                            )
                          })
                        )
                        : null}
                    </tbody>
                  </Table >
                  {/* <div style={{ display: 'table', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '0.5rem' }}> */}
                  < div style={{ display: 'table', margin: 'auto', color: '#000' }}>
                    <Pagination
                      count={this.state.ordersPagination.count}
                      offset={this.state.ordersPagination.offset}
                      limit={this.state.ordersPagination.limit}
                      changePage={this.loadTableData}
                    />
                  </div >
                  <br /> <br />
                </Col >
                <Col md="4">
                  <Card body inverse color="info">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                  </Card>
                  <br />
                  <Card body inverse color="warning">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                  </Card>
                  <br />
                  <Card body inverse color="danger">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                  </Card>
                </Col>
              </Row >
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggleTab('1'); }}
                      >
                        Behavioral Finance
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggleTab('2'); }}
                      >
                        Performance appraisals
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggleTab('3'); }}
                      >
                        ICO's/ITO's calender
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggleTab('4'); }}
                      >
                        Oversight rules and regulations
            </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          Cognitive Errors are basic statistical, information-processing, or memory errors that can cause decision to deviation from the rational decisions from traditional finance. Cognitive Errors can be thought of as blind spots or distortions in traders head. They stem from faulty reasoning so better information, education, and advice ca often correct for them: they can be moderated, and we are hoping that at GSV we’ll help users with data and information.<br /><br />
                          Conservatism Bias – traders tend to maintain their prior views, forecasts or believes despite availability and release of new material information. The traders will  be tend slower adopting to new information and they might not adequately incorporate it into decision making. Conservatism will cause traders to overweight their initial beliefs about probabilities and outcomes and under-react to new information. Traders may correct for this bias by assigning higher probability to newer information.<br /><br />
                          Confirmation Bias – is a belief perseverance bias in which traders tend to look for and notice what confirms their beliefs, and to ignore or undervalue what contradicts their beliefs. Traders often place greater weight on information that supports their beliefs. One way to correct for this bias is actively seeking out information that challenges trader’s beliefs.<br /><br />
                          Representativeness Bias – is a belief perseverance bias too in which traders tend to #1 classify new information based on the past experiences & would wrongfully classify certain investments, or #2 they might mistakenly believe that a small sample is a representative of the true ‘population’ value. Even well-informed decisions can lead to unfavorable results; however, making the extra effort (taking time) to gather ‘complete’ information, positive or negative will likely result in better decisions. Traders may correct this bias by viewing a periodic table of investments returns by calendar month.<br /><br />
                          Illusion of Control Bias – guidelines for overcoming illusion of control is by recognizing that successful investing is a probabilistic activity of any investment outcome is a function of a rather complex global trading processes and broad capital markets activity. Write a trading journal, traders should maintain records of their transactions, including keeping track of remarks and important features of each investment made.<br /><br />
                          Hindsight Bias – is a selective perception bias as traders may see ‘past’ events as having been predictable and reasonable to expect. The outcomes that did occur are more readily evident that outcomes that did not occur. To alleviate the discomfort associated with the unexpected, traders tend to view things that have already happened as being relatively inevitable and predictable. A way to correct this the hindsight bias for traders to stay disciplined and honor their decision making process.<br /><br />
                          Framing Bias – is an information processing bias in which a trader answers a question differently based on the way in which is asked ‘framed’. How information is processed might be influenced how the question is framed. For instance traders might take opposing views even though outcomes are identical (70% chance of success) or (30% chance of failure) merely in the way questions are framed. This is often related to short term price fluctuation and we suggest for traders to focus on their strategic decision making processes.<br /><br />
                          Availability Bias – is an information processing bias in which people take a ‘heuristic’ approach to estimating probability of an outcome based on how easily the outcome comes to mind. Easily recalled outcomes are often perceived as being more likely than those that are harder to RECALL or UNDERSTAND. The traders have to be open minded to overcome the availability bias and explore options and investment suggestions that do not come naturally to them, widen their investment opportunity set, fail to diversify their positions across the opportunity set.<br />
                          <hr style={{ borderTop: '1px solid rgba(255,255,255,0.4)' }} />
                          Emotional biases arise spontaneously as a result of attitudes and feelings. Although an ‘emotion’ has no specific definition, it is often viewed as a mental state (of traders) that arises spontaneously rather than through conscious effort. Emotional biases are harder to correct than cognitive errors because they originate from impulse or intuition rather than conscious calculations.
                          Loss Aversion Bias – is emotional bias exhibited by traders whereabout they exhibit risk-eversion tendencies. It was presented through a prospect theory (strongly prefer avoid losses as opposed to achieving gains) and further in practice by trader as the disposition effect. Loss averse traders tend to sell their winners (investments) realizing positive P&L. Also loss averse investors are likely to respond by continuing to hold the losing investments unfortunately. The idea of actually losing money is so painful that the first reaction is to hold the investment until it breaks even. The investor is acting based on emotions, not cognitive reasoning. Goal based investing can be used to prevent this bias and traders can install target ROR or stop loss trading instructions.
<br /><br />
                          Overconfidence Bias – is a bias in which people demonstrate unwarranted faith in their own intuitive reasoning, judgements and or cognitive abilities and it might be the result of overestimating knowledge levels, abilities and access to information (all of three factors should be evaluated separately). Overconfidence bias may be intensified when combined with self-attribution bias when traders take credit for successes and assign  responsibility for failures. Traders tend to overestimate their abilities (sometimes) and expected returns and underestimate  risks that might result in poorly diversified portfolios and excessive trading. Investors can mitigate for these tendencies by performing post-investment analysis on both successful and unsuccessful trades.
<br /><br />
                          Self-Control Bias – is a self-discipline problem in which people tend deviate from their investment objectives in pursuit of tempting short term gains. There is inherent conflict between short term satisfaction and achievement of some long term gains. This is especially reflected in the volatility of investments whereby traders are likely to accept too much risk ‘volatility’ in their attempt to generate higher returns. Goal based investing is recommended to correct for this bias with traders forming investment layers targeting risk exposures in constructing their portfolios.
                          Status Quo Bias – is an emotional bias in which traders do nothing and maintain the status quo instead of making a change in regard to their investment decision. This is especially relevant with the existing positions when traders are more comfortable keeping things the same than with change and thus not look for trading opportunities. Traders should have a goal in mind researching a particular number of new trades and fundamentally analyzing new options to invest.
                          Endowment Bias – is an emotional bias in which traders value an asset more when they hold rights to than when they do not. Endowment bias swill often result in traders irrationally holding the assets they own. This might be especially relevant when financial goals are in jeopardy, our emotional attachment must be moderated. Traders may believe they understand the characteristics of the investments they already own and may be reluctant to purchase assets which they have less experience. Traders can mitigate this bias by focusing on the investment selection process and quantitative measures (provided by our app!).
                          Regret Aversion Bias – is an emotional bias in which people tend to avoid making decisions that will result in action out of fear that the decision will turn out poorly. Traders at times will try to avoid the pain of regret associate with bad decision. Regret aversion can keep traders out of a market that has recently generated sharp losses or gains. Having experienced losses, traders might think that continued investing is not prudent yet a periods of depressed prices may represent great buying opportunities. Regret aversion may also persuade traders to stay out of the stock market due to a fear of getting in the high point. One way to correct for this bias is to keep track of the Average Weighted Cost of the traded assets, and also formulate exit points and the notional amount.
<br /><br />

                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="6">
                          <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                          </Card>
                        </Col>
                        <Col sm="6">
                          <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 3 Contents</h4>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 4 Contents</h4>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Col >
          </Row >
        </div >
        {/* <Media object src="log.png" width="100%" alt="Generic placeholder image" /> */}
      </div >
    );
  }
}

export default withRouter(HomePage);