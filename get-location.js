// 위치 추가 함수
function sample5_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        var addr = data.address; // 최종 주소
        geocoder.addressSearch(addr, function (results, status) {
          if (status === daum.maps.services.Status.OK) {
            var result = results[0];
            var coords = new daum.maps.LatLng(result.y, result.x);

            // 입력 필드와 삭제 버튼 생성
            var addressList = document.getElementById("address-list");
            var wrapper = document.createElement("div");
            wrapper.className = "address-wrapper";

            var newInput = document.createElement("input");
            newInput.type = "text";
            newInput.value = addr;
            newInput.disabled = true;
            wrapper.appendChild(newInput);

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.onclick = function () {
              // 삭제 버튼 클릭 시 입력 필드와 좌표 제거
              var index = coordinates.findIndex(
                (coord) => coord.x === parseFloat(result.x) && coord.y === parseFloat(result.y)
              );
              if (index > -1) {
                coordinates.splice(index, 1);
                markers[index].setMap(null);
                markers.splice(index, 1);
                wrapper.remove();
                console.log("삭제된 좌표:", coordinates);
              }
            };
            wrapper.appendChild(deleteButton);
            addressList.appendChild(wrapper);

            // 좌표 추가 (마커는 "완료" 버튼 클릭 시 생성)
            coordinates.push({ x: parseFloat(result.x), y: parseFloat(result.y) });
            console.log("추가된 좌표:", coordinates);
          }
        });
      }
    }).open();
  }