let weather = {
    apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").style.display = "block";
  
      // Change background image based on weather condition
      this.changeBackground(description);
    },
    changeBackground: function (description) {
      let background = "";
      if (description.includes("rain")) {
        background = "url('https://source.unsplash.com/1600x900/?rain')";
      } else if (description.includes("clear")) {
        background = "url('https://source.unsplash.com/1600x900/?sunny')";
      } else if (description.includes("cloud")) {
        background = "url('https://source.unsplash.com/1600x900/?cloudy')";
      } else if (description.includes("thunderstorm")) {
        background = "url('https://source.unsplash.com/1600x900/?thunder')";
      } else {
        background = "url('https://source.unsplash.com/1600x900/?weather')";
      }
      document.body.style.backgroundImage = background;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    },
    search: function () {
      this.fetchWeather(document.querySelector("#city-input").value);
    },
  };
  
  document.querySelector("#search-btn").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector("#city-input")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  