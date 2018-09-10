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
      currencies: [{ name: '', symbol: '' }],
      hashtags: [],
      kategorija: ''
    };
    this.renderHashtags = this.renderHashtags.bind(this);
  }
  componentDidMount() {
    axios.get('http://173.249.46.156/api/v1/resources/currency_list')
      .then(response => {
        this.setState({ currencies: response.data.data.rows })
        this.setState({ kategorija: this.state.currencies[this.props.match.params.kategorija].symbol })
      })
    this.loadHashtags(30);
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
            <span className="topic">#{this.state.kategorija}</span>
          </Breadcrumb>
          <p>Topic</p>
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