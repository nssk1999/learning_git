"use strict";

function initMap() {
  //#####################################################################################
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: new google.maps.LatLng(17.423635, 78.503822),
    styles: mapstyle,
  });

  //#######################################################################################

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        map.setCenter(pos);
        map.setZoom(11);
      },
      function () {
        console.log("got the loaction");
        // handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    console.log("didn't get  the loaction");
    // handleLocationError(false, infoWindow, map.getCenter());
  }

  //#######################################################################################
  class Hospital {
    constructor(item, image) {
      this.contentString = `<h2>${item["name"]}</h2> 
      <h3>${item["area"]}</h3>
      <table>
      <tbody>
        <tr>
          <td>Total Bed Capacity</td>
          <td>${item["obeds"]["TBC"]}</td>
        </tr>
        <tr>
          <td>No.of Patients in ICU</td>
          <td>${item["obeds"]["ICU"]}</td>
        </tr>
        <tr>
          <td>No.of Patients with CPAP</td>
          <td>${item["obeds"]["CPAP"]}</td>
        </tr>
        <tr>
          <td>No.of Patients Wards</td>
          <td>${item["obeds"]["wards"]}</td>
        </tr>
        <tr>
          <td>Total no.of Patients</td>
          <td>${item["obeds"]["tnp"]}</td>
        </tr>
        <tr>
          <td>Total no.of Beds Available</td>
          <td style="font-size: large; font-weight: bold;">${item["abeds"]}</td>
        </tr>
      </tbody>
    </table>  
      `;

      this.infowindow = new google.maps.InfoWindow({
        content: this.contentString,
      });
      this.marker = new google.maps.Marker({
        position: {
          lat: item["location"]["lat"],
          lng: item["location"]["lng"],
        },
        map: map,
        icon: image,
        title: item["name"],
        map,
        icon: {
          url: image,
          labelOrigin: { x: 75, y: 10 },
        },
        label: {
          text: item["abeds"].toLocaleString(),
          fontSize: "2.5em",
        },
      });
      this.marker.addListener("click", () => {
        this.infowindow.open(map, this.marker);
      });
    }
  }
  var image = "pmarker.svg";
  var ghospitals = new Array();
  const _displayhps = (data) => {
    var i = 0;
    data["hptls"].forEach((item) => {
      if (item["type"] == "private") image = "./assets/pmarker.svg";
      else image = "./assets/gmarker.svg";
      ghospitals[i] = new Hospital(item, image);
      i++;
    });
  };
  const urili = "https://nssk1999.github.io/covid19/hps.json";
  const geths = () => {
    fetch(urili)
      .then((response) => response.json())
      .then((data) => _displayhps(data))
      .catch((error) => console.error("Unable to get items.", error));
  };
  geths();
}
