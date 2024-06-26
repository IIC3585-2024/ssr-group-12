import React, { useState, useEffect } from "react";
import { fetchPoster } from "@/lib/tmdb";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const SerieCard = ({ serie }) => {
  return (
    <div
      key={serie.id}
      className="flex bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105 cursor-pointer"
    >
      {/* <img
        src={serie.image}
        alt={`${serie.name} poster`}
        className="w-32 h-48 object-cover rounded-lg mr-6"
      /> */}
      <Image
        src={serie.image}
        alt={`${serie.name} poster`}
        width={150}
        height={300}
        className="w-32 h-48 object-cover rounded-lg mr-6"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{serie.name}</h2>
        <p className="text-gray-600">
          <strong className="font-semibold">Streaming Service:</strong>{" "}
          {serie.streaming_service}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Category:</strong> {serie.category}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Stars:</strong> {serie.vote_average}{" "}
          / 10 ⭐
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Seasons:</strong>{" "}
          {serie.number_of_seasons}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Episodes per Season:</strong>{" "}
          {serie.episodes_per_season}
        </p>
      </div>
    </div>
  );
};

export default SerieCard;
