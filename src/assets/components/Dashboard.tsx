import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import '../../public/dist/leaflet.css';
import '../../public/Dashboard.css';
 
// Import marker icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Register Chart.js components and plugins
Chart.register(...registerables);
Chart.register(zoomPlugin);

// Configure Leaflet to use custom marker icons
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Dashboard: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [isMapView, setIsMapView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const historicalResponse = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      setHistoricalData(historicalResponse.data);

      const countriesResponse = await axios.get('https://disease.sh/v3/covid-19/countries');
      setCountriesData(countriesResponse.data);

      const globalResponse = await axios.get('https://disease.sh/v3/covid-19/all');
      setGlobalData(globalResponse.data);
    };

    fetchData();
  }, []);

  // Process historical data for chart display
  const processHistoricalData = () => {
    if (!historicalData) return { labels: [], datasets: [] };

    const dates = Object.keys(historicalData.cases);
    const cases = Object.values(historicalData.cases);
    const deaths = Object.values(historicalData.deaths);
    const recovered = Object.values(historicalData.recovered);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Total Covid Cases',
          data: cases,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Recovered',
          data: recovered,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    };
  };

  // Chart.js options for zoom and pan
  const chartOptions = {
    responsive: true,
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy' as 'xy', // Explicitly cast to the expected type
        },
        pan: {
          enabled: true,
          mode: 'xy' as 'xy', // Explicitly cast to the expected type
        },
      },
    },
  };

  // Render map with country markers
  const renderMap = () => (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countriesData.map(country => (
        <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
          <Popup>
            <div>
              <img src={country.countryInfo.flag} alt={country.country} width="60" />
              <h3>{country.country}</h3>
              <p>Active: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  return (
    <div className="dashboard">
      <div className="flex items-center justify-center mt-2 mb-3">
        <div
          className="relative inline-flex items-center h-12 rounded-full w-52 bg-gray-300 cursor-pointer transition-all duration-300"
          onClick={() => setIsMapView(!isMapView)}
        >
          <span
            className={`absolute left-0 w-1/2 h-full flex items-center justify-center rounded-full transition-colors duration-300 ${
              isMapView ? 'bg-gray-300 text-gray-700' : 'bg-blue-500 text-white'
            }`}
          >
            Graph View
          </span>
          <span
            className={`absolute right-0 w-1/2 h-full flex items-center justify-center rounded-full transition-colors duration-300 ${
              isMapView ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            Map View
          </span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">COVID-19 Dashboard</h2>

      <div className="graph-container">
        {isMapView ? (
          renderMap()
        ) : (
          <Line data={processHistoricalData()} options={chartOptions} />
        )}
      </div>
      {globalData && (
        <div className="global-data mt-5 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Global COVID-19 Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-box p-4 bg-blue-100 rounded-lg">
              <h4 className="font-bold">Total Cases</h4>
              <p>{globalData.cases.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-green-100 rounded-lg">
              <h4 className="font-bold">Total Recovered</h4>
              <p>{globalData.recovered.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-red-100 rounded-lg">
              <h4 className="font-bold">Total Deaths</h4>
              <p>{globalData.deaths.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-yellow-100 rounded-lg">
              <h4 className="font-bold">Active Cases</h4>
              <p>{globalData.active.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-purple-100 rounded-lg">
              <h4 className="font-bold">Affected Countries</h4>
              <p>{globalData.affectedCountries.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-pink-100 rounded-lg">
              <h4 className="font-bold">Today's Active Cases</h4>
              <p>{globalData.todayCases.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-gray-100 rounded-lg">
              <h4 className="font-bold">Today's Death Cases</h4>
              <p>{globalData.todayDeaths.toLocaleString()}</p>
            </div>
            <div className="stat-box p-4 bg-indigo-100 rounded-lg">
              <h4 className="font-bold">Today's Recovered Cases</h4>
              <p>{globalData.todayRecovered.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
