/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
const { kakao } = window;

export default function Map(props) {
  const inputValue = props.kakaovalue;
  const searchinputvalue = props.kakaoinputvalue;
  console.log(inputValue)
  console.log(searchinputvalue)

  let fetchF = () => { }
  let start = () => { }
  const [locName, setlocName] = useState("");
  const [fooditems, setFooditems] = useState("");
  const [cafeitems, setCafeitems] = useState("");
  const [parkitems, setParkitems] = useState("");
  const [houseitems, setHouseitems] = useState("");
  const [hospitalitems, setHospitalitems] = useState("");

  const [resultmessage, setResultmessage] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [raddr, setRaddr] = useState("");
  const [tel, setTel] = useState("");
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")

  let result;
  const [message, setMessage] = useState();

  if (searchinputvalue === undefined) {
    fetchF = () => {
      fetch(
        `http://ec2-13-209-237-25.ap-northeast-2.compute.amazonaws.com:8081/nuri/search/${inputValue}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (
            res["restaurant"] === undefined &&
            res["cafe"] === undefined &&
            res["park"] === undefined &&
            res["hospital"] === undefined &&
            res["house"] === undefined
          ) {
            setResultmessage("검색 결과가 없습니다.");
            setMessage(0);
          } else {
            setMessage(1);
            setFooditems(res["restaurant"]);
            setCafeitems(res["cafe"]);
            setParkitems(res["park"]);
            setHospitalitems(res["hospital"]);
            setHouseitems(res["house"]);
          }
        });
    };

    start = () => {
      let contentDiv = [];
      let contentlng = [];
      let contentlat = [];

      var positions = [
        {
          // title: "카카오123",
          // content: "<div>33333</div>",
          // latlng: new kakao.maps.LatLng(37.5642135, 127.0016985),
        },
      ];

      let positionContent = {};

      // 음식점

      const foodkeys = Object.keys(fooditems);
      for (let i = 0; i < foodkeys.length; i++) {
        const k = foodkeys[i];
        const d = fooditems[k].locationName;
        const lng = fooditems[k].locationLng;
        const lat = fooditems[k].locationLat;
        contentDiv.push(d);
        contentlng.push(lng);
        contentlat.push(lat);
      }

      for (let i = 0; i < foodkeys.length; i++) {
        // console.log(contentDiv[i], contentlat[i], contentlng[i]);

        positionContent = {
          title: contentDiv[i],
          content:
            "<div style='font-size:14px;word-break:keep-all;background:#fff;text-align:center;display:flex;align-items:center;'>" +
            "<i class='fa-solid fa-utensils' style='display:block;margin: 5px;color:#F3887C'></i>" +
            "<p style='margin-bottom:0px'>" +
            contentDiv[i] +
            "</p>" +
            "</div>",
          latlng: new kakao.maps.LatLng(contentlat[i], contentlng[i]),
        };
        positions.push(positionContent);
        // setLoading(false);
      }

      // 카페

      const cafekeys = Object.keys(cafeitems);
      for (let i = 0; i < cafekeys.length; i++) {
        const k = cafekeys[i];
        const d = cafeitems[k].locationName;
        const lng = cafeitems[k].locationLng;
        const lat = cafeitems[k].locationLat;
        contentDiv.push(d);
        contentlng.push(lng);
        contentlat.push(lat);
      }

      const foodlen = foodkeys.length;

      for (let i = foodlen; i < contentDiv.length; i++) {
        // console.log(contentDiv[i], contentlat[i], contentlng[i]);

        positionContent = {
          title: contentDiv[i],
          content:
            "<div style='font-size:14px;word-break:keep-all;background:#fff;text-align:center;display:flex;align-items:center;'>" +
            "<i class='fa-solid fa-mug-saucer' style='display:block;margin: 5px;color:#F3887C'></i>" +
            "<p style='margin-bottom:0px'>" +
            contentDiv[i] +
            "</p>" +
            "</div>",
          latlng: new kakao.maps.LatLng(contentlat[i], contentlng[i]),
        };
        positions.push(positionContent);
        // setLoading(false);
      }

      // 공원

      const parkkeys = Object.keys(parkitems);
      for (let i = 0; i < parkkeys.length; i++) {
        const k = parkkeys[i];
        const d = parkitems[k].locationName;
        const lng = parkitems[k].locationLng;
        const lat = parkitems[k].locationLat;
        contentDiv.push(d);
        contentlng.push(lng);
        contentlat.push(lat);
      }

      const cafelen = cafekeys.length;

      for (let i = foodlen + cafelen; i < contentDiv.length; i++) {
        // console.log(contentDiv[i], contentlat[i], contentlng[i]);

        positionContent = {
          title: contentDiv[i],
          content:
            "<div style='font-size:14px;word-break:keep-all;background:#fff;text-align:center;display:flex;align-items:center;border-bottom:1px solid rgb(118, 129, 168)'>" +
            '<i class="fa-solid fa-tree" style="display:block;margin: 5px;color:#77B559"></i>' +
            "<p style='margin-bottom:0px'>" +
            contentDiv[i] +
            "</p>" +
            "</div>",
          latlng: new kakao.maps.LatLng(contentlat[i], contentlng[i]),
        };
        positions.push(positionContent);
        // setLoading(false);
      }

      // 펜션

      const housekeys = Object.keys(houseitems);
      for (let i = 0; i < housekeys.length; i++) {
        const k = housekeys[i];
        const d = houseitems[k].locationName;
        const lng = houseitems[k].locationLng;
        const lat = houseitems[k].locationLat;
        contentDiv.push(d);
        contentlng.push(lng);
        contentlat.push(lat);
      }

      const parklen = parkkeys.length;

      for (let i = foodlen + cafelen + parklen; i < contentDiv.length; i++) {
        // console.log(contentDiv[i], contentlat[i], contentlng[i]);

        positionContent = {
          title: contentDiv[i],
          content:
            "<div style='font-size:14px;word-break:keep-all;background:#fff;text-align:center;display:flex;align-items:center;border-bottom:1px solid rgb(118, 129, 168)'>" +
            '<i class="fa-solid fa-hotel" style="display:block;margin: 5px;color:#77B559"></i>' +
            "<p style='margin-bottom:0px'>" +
            contentDiv[i] +
            "</p>" +
            "</div>",
          latlng: new kakao.maps.LatLng(contentlat[i], contentlng[i]),
        };
        positions.push(positionContent);
        // setLoading(false);
      }

      // 병원

      const hospitalkeys = Object.keys(hospitalitems);
      for (let i = 0; i < hospitalkeys.length; i++) {
        const k = hospitalkeys[i];
        const d = hospitalitems[k].locationName;
        const lng = hospitalitems[k].locationLng;
        const lat = hospitalitems[k].locationLat;
        contentDiv.push(d);
        contentlng.push(lng);
        contentlat.push(lat);
      }

      const houselen = housekeys.length;

      for (
        let i = foodlen + cafelen + parklen + houselen;
        i < contentDiv.length;
        i++
      ) {
        // console.log(contentDiv[i], contentlat[i], contentlng[i]);

        positionContent = {
          title: contentDiv[i],
          content:
            "<div style='font-size:14px; word-break:keep-all;background:#fff;text-align:center;display:flex;align-items:center;border-bottom:1px solid rgb(118, 129, 168)'>" +
            '<i class="fa-solid fa-briefcase-medical" style="display:block;margin: 5px;color:rgb(116, 192, 252)"></i>' +
            "<p style='margin-bottom:0px'>" +
            contentDiv[i] +
            "</p>" +
            "</div>",
          latlng: new kakao.maps.LatLng(contentlat[i], contentlng[i]),
        };
        positions.push(positionContent);
        // setLoading(false);
      }

      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.551425, 126.988),
        level: 7,
      };
      //map
      const map = new kakao.maps.Map(container, options);

      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      let marker;

      for (let i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
        // 마커에 표시할 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }

      marker.setMap(map);
    };
  }
  else {
    fetchF = () => {
      fetch(
        `http://ec2-13-209-237-25.ap-northeast-2.compute.amazonaws.com:8081/nuri/detail/${searchinputvalue}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("성공");
          setName(res["location"].locationName);
          setAddr(res["location"].locationAddr);
          setRaddr(res["location"].locationRoadAddr);
          setTel(res["location"].locationTel);
          setLat(res["location"].locationLat);
          setLng(res["location"].locationLng);
        });
    };

    start = () => {
      //   let contentDiv = [];
      //   let contentlng = [];
      //   let contentlat = [];

        var positions = [
          {
            // title: "카카오123",
            // content: "<div>33333</div>",
            // latlng: new kakao.maps.LatLng(37.5642135, 127.0016985),
          },
        ];

      let positionContent = {};
      
        positionContent = {
            title: name,
            content:
              "<div style='font-size:14px;word-break:keep-all;background:#fff;text-align:center;display:flex;align-items:center;'>" +
              "<p style='margin-bottom:0px'>" +
              name +
              "</p>" +
              "</div>",
            latlng: new kakao.maps.LatLng(lat, lng),
          };
          positions.push(positionContent);
          // setLoading(false);
        

        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 7,
        };
        //map
      
      console.log(lat, lng)
      let map = new kakao.maps.Map(container, options);
      
      let marker;
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (let i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
        // 마커에 표시할 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content, // 인포윈도우에 표시할 내용
        });

        // var bounds = new kakao.maps.LatLngBounds();

        // function setBounds() {
        //   // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
        //   // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
        //   map.setBounds(positions[i].latlng);
        // }

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
      marker.setMap(map);
    }    
  }
  

  useEffect(() => {
    fetchF();
  }, [inputValue, searchinputvalue]);

  useEffect(() => {
    start();
  }, [fetchF]);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}
