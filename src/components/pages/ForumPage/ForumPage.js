import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import {
  Navbar,
  Media,
  Breadcrumb,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from 'reactstrap';
import './ForumPage.css';
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
    console.log(this.props.match.params)
    return (
      <div>
        <Navbar>
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
        </Navbar>
        <Media object src="/GSV.png" width="200" alt="Generic placeholder image" /> CHAT
        <div style={{ padding: '0 15px' }}>
          <Breadcrumb>
            <span className="topic">#Futures</span>
            <span className="topic">#BTCMINING</span>
          </Breadcrumb>
          <p>Topics</p>
          <Breadcrumb>
            <span className="topic">#BTC</span>
            <span className="topic">#BCC</span>
            <span className="topic">#ETH</span>
            <span className="topic">#XRP</span>
            <span className="topic">#XRM</span>
            <span className="topic">#NEO</span>
          </Breadcrumb>
          <p>Coins</p>
          <ListGroup>
            <ListGroupItem>
              <Media className="mt-1">
                <Media left middle href="#">
                  <Media object src="/GSV.png" width="100" alt="Generic placeholder image" />
                </Media>
                <Media body>
                  <Row>
                    <Col>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Fusce condimentum nunc ac nisi vulputate fringilla.
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          Like 25
                        </Col>
                        <Col>
                          Reply 6
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Media>
              </Media>
            </ListGroupItem><ListGroupItem>
              <Media className="mt-1">
                <Media left middle href="#">
                  <Media object src="/GSV.png" width="100" alt="Generic placeholder image" />
                </Media>
                <Media body>
                  <Row>
                    <Col>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Fusce condimentum nunc ac nisi vulputate fringilla.
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          Like 25
                        </Col>
                        <Col>
                          Reply 6
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Media>
              </Media>
            </ListGroupItem><ListGroupItem>
              <Media className="mt-1">
                <Media left middle href="#">
                  <Media object src="/GSV.png" width="100" alt="Generic placeholder image" />
                </Media>
                <Media body>
                  <Row>
                    <Col>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Fusce condimentum nunc ac nisi vulputate fringilla.
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          Like 25
                        </Col>
                        <Col>
                          Reply 6
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Media>
              </Media>
            </ListGroupItem>
          </ListGroup>
        </div>
        {/* <Media object src="log.png" width="100%" alt="Generic placeholder image" /> */}
      </div>
    );
  }
}