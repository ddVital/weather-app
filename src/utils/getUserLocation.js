var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// get the user geolocation
const getUserLocaction = () => {
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        }
      });
  } else {
    alert("can't access location. Loading default location");
  }
};

// succeded getting the user location
function success(pos) {
  var crd = pos.coords;
  setLat(crd.latitude);
  setLon(crd.longitude);
}

// error to get the user location
function errors(err) {
  console.warn(`ERROR (${err.code}): ${err.message}`);
}
