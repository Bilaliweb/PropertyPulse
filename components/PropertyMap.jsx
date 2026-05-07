"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
import Map, { Marker } from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css'

const PropertyMap = ({ property }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeoCodeError] = useState(false);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        setDefaults({
          key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
          language: "en",
          region: "pk"
        });

        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipCode}`,
        );

        if (!res.results?.length) {
          setGeoCodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      } catch (error) {
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, [property]);

  if (loading) {
    return <Spinner />;
  }

  if (geocodeError) {
    return <div className="text-xl">No Location data found</div>;
  }

  if (!mapboxToken) {
    return <div className="text-xl">Map cannot be displayed right now.</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker latitude={latitude} longitude={longitude}>
            <Image src={pin} alt="location" width={40} height={40}/>
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
