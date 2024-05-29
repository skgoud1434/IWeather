import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function App() {
  let [yes, setYes] = useState(true);
  let [data, setData] = useState("");
  let [temp, setTemp] = useState("");
  let [wind, setWind] = useState("");
  let [last, setLast] = useState("");
  let [con, setCon] = useState("");
  let [hum, setHum] = useState("");
  let [cloud, setCloud] = useState("");
  let [img, setImage] = useState("");
  let [country, setCountry] = useState("");

  useEffect(() => {
    let details;
    if (data) {
      try {
        setYes(true);
        details = setTimeout(() => {
          axios
            .get(
              `https://api.weatherapi.com/v1/current.json?key=b5f386c348a7412c830183101240701&q=${data}&aqi=no`
            )
            .then((res) => {
              const location = res.data.location;
              const current = res.data.current;

              setWind(current.wind_kph);
              setTemp(current.temp_c);
              setCon(current.condition.text);
              setCloud(current.cloud);
              setHum(current.humidity);
              setLast(current.last_updated);
              setImage(current.condition.icon);
              setCountry(location.region);
            })
            .catch((err) => {
              console.log("No Matching Location found");
              setYes(false);
            });
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    }
    return () => {
      clearTimeout(details);
    };
  }, [data]);

  return (
    <div className="App">
      <TextField
        id="standard-basic"
        label="Enter city"
        variant="standard"
        className="TextField"
        onChange={(e) => {
          setData(e.target.value);
        }}
      />

      {yes ? (
        <Card className="Card" sx={{ minWidth: 275 }}>
          <CardContent className="CardContent">
            {data && (
              <>
                <Typography variant="h5" component="div" className="Typography">
                  Weather in {data}, {country}
                </Typography>
                <img src={img} alt="Weather Icon" className="WeatherIcon" />
                <Typography variant="body2" className="Temperature">
                  Temperature: {temp}°C
                </Typography>
                <Typography variant="body2" className="Condition">
                  Condition: {con}
                </Typography>
                <Typography variant="body2" className="Detail">
                  Wind: {wind} kph
                </Typography>
                <Typography variant="body2" className="Detail">
                  Humidity: {hum}%
                </Typography>
                <Typography variant="body2" className="Detail">
                  Cloud Coverage: {cloud}%
                </Typography>
                <Typography variant="body2" className="Detail">
                  Last Updated: {last}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="Card" sx={{ minWidth: 275 }}>
          <CardContent className="CardContent">
            <Typography variant="body2" className="Typography">
              Data not found
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
