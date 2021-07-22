import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss'

let 박스 = styled.div`
padding: 20px;`;

let 제목 = styled.h4`
font-size:25px;
color: ${props=> props.색상}`;

function Detail(props){

    let history = useHistory();
    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id == id
    });
    let [myalert, myalert변경] = useState(true);
    useEffect(()=>{
        let 타이머 = setTimeout(() => {
            myalert변경(false)    
        }, 2000);
        return ()=>{ clearTimeout(타이머) }
    },[]);


    return (
      <div className="container">
      <div className="row">
        <div className="col-md-6"> 
          <img
            src={"https://codingapple1.github.io/shop/shoes"+id+".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <Info 재고={props.재고}></Info>
          <박스>ㅇㅇㅇㅇㅇㅇ</박스>
          <제목 색상={'red'}>제목컴포넌트</제목>
          <제목 색상={'blue'}>제목컴포넌트</제목>
          <button className="btn btn-danger" onClick={()=>{
              props.재고변경([9, 10, 11])
          }}>주문하기</button>
          <button className="btn btn-danger" onClick={()=>{history.goBack()}}>뒤로가기</button>
          <button className="btn btn-danger" onClick={()=>{history.push('/')}}>메인페이지</button>
        </div>
        {
            myalert == true
            ? <Myalert></Myalert>
            : null
        }
      </div>

    </div>
    )
  };



function Myalert(){
    return  (
        <div className="my-alert1">
        <p>재고가 얼마 남지 않았습니다.</p>
        </div>
    )
}

function Info(props){
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}


export default Detail
