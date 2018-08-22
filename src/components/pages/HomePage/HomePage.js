import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
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
import currencyList from '../../../utils/currency_list';
import axios from 'axios';

export default class HomePage extends React.Component {
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

  render() {
    return (
      <div>
        <Navbar light expand="md">
          <Col md="4">
            <NavbarBrand href="/">
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
                    Twitter
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radioTwiter" checked />{' '}
                        <span>1D</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radioTwiter" />{' '}
                        <span>1W</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radioTwiter" />{' '}
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
                      <Button className="classification" color="primary" onClick={this.toggleMarket}>Market capitalization</Button>
                    </div>
                    <Collapse isOpen={this.state.toggleInvestment}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 1250</span>
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
                    <Collapse isOpen={this.state.toggleMarket}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 1250</span>
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
                              <span>Blockchain infrastructure</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Financial services</span>
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
                    <tbody>
                      <this.renderTable />
                    </tbody>
                  </Table>
                </Col>
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
              </Row>
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggleTab('1'); }}
                      >
                        Behaviar Finance
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
                          <h4>Tab 1 Contents</h4>
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
            </Col>
          </Row>
        </div>
        {/* <Media object src="log.png" width="100%" alt="Generic placeholder image" /> */}
      </div>
    );
  }
}