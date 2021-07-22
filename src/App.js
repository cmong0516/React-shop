import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import Data from "./data";
import { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import axios from 'axios';

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [more, more변경] = useState(true);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Mong shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link className="Link" as={Link} to="/"> Home </Nav.Link>               
            <Nav.Link className="Link" as={Link} to="/detail"> Detail </Nav.Link>               
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
      <Route exact path="/">
        <div className="background">
          <h1>20% Season Off</h1>
          <p>
            오늘은 React Bootstrap을 이용한 레이아웃 디자인 시간입니다.
            Bootstrap은 CSS 라이브러리인데, 설치하면 미리 이쁘게 디자인 된 버튼,
            메뉴 들을 갖다쓸 수 있습니다. 그니까 이제 복사 붙여넣기만 하면 이쁜
            웹 UI 개발 끝이라는 겁니다.
          </p>
          <Link to="/detail/1">
          <button type="button" class="btn btn-primary">
            할인 품목 바로가기
          </button>
          </Link>
        </div>
        <div className="container">
          <div className="row">
            {shoes.map((a, i) => {
              return <Card shoes={shoes[i]} i={i} key={i} />;
            })}
          </div>
        </div>
      </Route>
      <Route exact path="/detail/:id">
        <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
      </Route>
      </Switch>
      {
        more == true
        ? <More shoes={shoes} shoes변경={shoes변경} more변경={more변경}/>
        : null
      }
      
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content}&{props.shoes.price}
      </p>
    </div>
  );
}

function More(props){
  return (
    <button type="button" class="btn btn-primary" onClick={()=>{
      props.more변경(false);
      axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((result)=>{
        props.shoes변경([...props.shoes,...result.data]);
      })
      .catch((error)=>{console.error(error)})
    }}>더보기</button>
  )
}


export default App;
