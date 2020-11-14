import {Row, Col} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { default as NumberFormat } from 'react-number-format';
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error } = useSWR('/api/houses', fetcher);

  if (error) return (<div>failed to load</div>)

  return (
    <div className="component-container p-4">
      <h1 className="title m-0 p-2">
      <FontAwesomeIcon icon={fasHome} />
        &nbsp;Your New Home&nbsp;
      <FontAwesomeIcon icon={fasHome} />
      </h1>

      <div className="center-panel">
        <Row>
          {data ? data.map((item) => (
          <Col key={item.data.number} xs={12} sm={6} md={4} className="p-3">              
              <Card className="shadow">
                  <img src={item.data.pic} className="card-img-top img-estate" />
                  <Card.Body>
                    <h5 className="card-title">
                      <NumberFormat value={item.data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      <FontAwesomeIcon icon={farHeart} className="text-danger float-right" />
                    </h5>
                    <h6>{item.data.address}</h6>
                    <h6 className="description" title="{realEstate.description}">
                        <FontAwesomeIcon icon={fasBed} />
                        <span>&nbsp;{item.data.bedrooms}&nbsp;</span>
                        <FontAwesomeIcon icon={fasBath} />
                        <span>&nbsp;{item.data.bathrooms}&nbsp;</span>
                        <FontAwesomeIcon icon={fasCar} />
                        <span>&nbsp;{item.data.cars}&nbsp;</span>
                    </h6>
                  </Card.Body>
              </Card>
          </Col>
          )) : 
          <h3 className="loadingContainer">
            <span className="loading">Loading...</span>
          </h3>
          }
        </Row>
      </div>
    </div>
  )
}

export default Home