import React from "react";
import HomeCarousel from "../HomeCarousel/HomeCarousel";

export default function HomePage() {
  const slides = [
    {
      title: "Inception",
      genre: "Sci-Fi",
      imgSrc: "https://via.placeholder.com/800x400?text=Inception",
    },
    {
      title: "The Shawshank Redemption",
      genre: "Drama",
      imgSrc: "https://via.placeholder.com/800x400?text=Shawshank",
    },
    {
      title: "The Dark Knight",
      genre: "Action",
      imgSrc: "https://via.placeholder.com/800x400?text=Dark+Knight",
    },
  ];

  return (
    <div>
      <HomeCarousel slides={slides} />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Welcome to the Movies Collection</h2>
        <p>Explore our featured and trending movies.</p>
      </div>
    </div>
  );
}
