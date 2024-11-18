document.addEventListener("DOMContentLoaded", function () {
    const completeButton = document.getElementById("complete-button");

    if (completeButton) {
        completeButton.addEventListener("click", function () {
            // 중간 지점 계산 로직 호출
            console.log("완료 버튼 클릭됨!");
            addMeanMarker(); // 중간 지점 계산 함수 실행
        });
    }
});

function calculateMeanCoordinates() {
        var sumX = 0, sumY = 0;

        coordinates.forEach(coord => {
            sumX += coord.x;
            sumY += coord.y;
        });

        var mean = {
            x: sumX / coordinates.length,
            y: sumY / coordinates.length
        };
        console.log("계산된 평균 좌표:", mean);
      return mean;
    }

    var meanMarker = null; // 평균 마커를 저장할 변수

    function addMeanMarker() {
        if (coordinates.length === 0) return;

        var meanCoord = calculateMeanCoordinates();
        var meanLatLng = new daum.maps.LatLng(meanCoord.y, meanCoord.x);

        // 기존 평균 마커가 있으면 제거
        if (meanMarker) {
            meanMarker.setMap(null);
        }

        // 새로운 평균 마커 추가
        meanMarker = new daum.maps.Marker({
            position: meanLatLng,
            map: map,
            title: "평균 위치"
        });
      map.setCenter(meanLatLng);
      console.log("평균 마커가 추가되었습니다:", meanCoord);
    }
