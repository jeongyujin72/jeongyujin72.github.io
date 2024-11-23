import { meanMarker, radius } from './middle-point.js'

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map);  

// import 해온 반경을 업데이트 하기 위해 새로운 변수에 저장한다
var circleRadius = radius;
console.log("circleRadius에 원의 반경 저장됨", circleRadius);

document.addEventListener("DOMContentLoaded", function () {
    const completeButton = document.getElementById("complete-button");

    if (completeButton) {
        completeButton.addEventListener("click", async function () {
            console.log("완료 버튼 클릭됨!");

            let markerCount = 0; // 원 내부의 마커 개수

            // 최대 10번까지 반경 확대
            for (let i = 0; i < 10; i++) {
                console.log((i + 1) + "번째 루프 진행 중...");

                // 원 내부의 마커 검색
                markerCount = await new Promise((resolve) => {
                    ps.categorySearch(
                        'SW8',
                        function placesSearchCB(data, status) {
                            if (status === kakao.maps.services.Status.OK) {
                                console.log(`data.length: ${data.length}`);
                                resolve(data.length); // 마커 개수를 반환
                            } else {
                                resolve(0); // 검색 실패 시 0개로 처리
                            }
                        },
                        {
                            location: meanMarker.getPosition(),
                            radius: circleRadius,
                        }
                    );
                });

                console.log("현재 원 내부 마커 개수:", markerCount);

                // 원 내부에 지하철역이 있으면 루프 종료
                if (markerCount >= 1) {
                    console.log("원 내부에 마커가 존재합니다. 루프 종료.");
                    break;
                }

                // 원 내부에 마커가 없으면 반경을 확장
                circleRadius += 1000;
                console.log("원의 반경이 확대되었습니다:", circleRadius);
            }

            if (markerCount < 1) {
                console.log("반복이 끝난 후에도 원 내부에 마커가 없습니다.");
            }
        });
    }
});


// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}
