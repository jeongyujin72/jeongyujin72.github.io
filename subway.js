// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map);  

document.addEventListener("DOMContentLoaded", function () {
    const completeButton = document.getElementById("complete-button");

    if (completeButton) {
        completeButton.addEventListener("click", function () {
            console.log("완료 버튼 클릭됨!");
            
            // 카테고리로 지하철역을 검색
            ps.categorySearch('SW8', placesSearchCB, {
                location: meanLatLng
            });
        });
    }
});

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            console.log("data 배열에 저장된 장소가 마커로 표시되었음.", data[i]);
        }       
    }
}

// 지하철역 마커를 저장할 배열
var subwayMarkers = [];

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
