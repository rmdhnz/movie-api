import React from "react";
import axios from "axios";
export default function Card(props) {
  return (
    <div className="flex w-full border-4 bg-yellow-400 rounded-md overflow-hidden mb-3">
      <div className="w-1/3 h-full">
        <img src={props.img} alt="foto" />
      </div>
      <div className="p-2 w-2/3 text-center flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold">Title : {props.title}</h1>
          <h3>Year : {props.year}</h3>
        </div>
        <button
          data-imdb={props.imdb}
          onClick={(e) => {
            document.querySelector(".modal").classList.toggle("hidden");
            axios
              .get(
                "http://www.omdbapi.com/?apikey=2c1ddfdf&i=" +
                  e.target.getAttribute("data-imdb")
              )
              .then((response) => {
                let detail = response.data;
                document.querySelector(
                  ".modal-detail"
                ).innerHTML = `    <div class="p-3 modal-detail lg:flex">
                <div class="mx-auto">
                  <img src="${detail.Poster}" alt="poster" class='mx-auto w-1/2 lg:w-full' />
                </div>
                <div>
                  <ul class='p-2 rounded-lg'>
                    <li><h4>${detail.Title} (${detail.Year})</h4></li>
                    <li>
                      <strong>Director : </strong>${detail.Director}
                    </li>
                    <li>
                      <strong>Actors : </strong>${detail.Actors}
                    </li>
                    <li>
                      <strong>Writer : </strong>${detail.Writer}
                    </li>
                    <li>
                      <strong>Plot : </strong><br />${detail.Plot}
                    </li>
                  </ul>
                </div>
              </div>`;
              });
          }}
          className="py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800"
        >
          More Info
        </button>
      </div>
    </div>
  );
}
