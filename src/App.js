import React, { Component } from "react";
import axios from "axios";
import Card from "./components/Card";
import "./source.css";
import { IoIosCloseCircle as CloseBtn } from "react-icons/io";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      movies: [],
    };
  }

  render() {
    const { movies } = this.state;
    let iterator = 1;
    return (
      <>
        <div
          className={`w-full bg-slate-900 min-h-screen flex flex-col justify-center items-center bg-divspan bg-cover bg-fixed`}
        >
          <h1 className="text-center text-white text-5xl font-bold capitalize">
            Divspan Corp Cinema
          </h1>
          <div className="my-3 w-full text-center">
            <label
              htmlFor=""
              className="block text-white text-center text-3xl font-bold font-sans"
            >
              Search Movie
            </label>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                if (this.state.title != "") {
                  axios
                    .get(
                      "http://www.omdbapi.com/?apikey=2c1ddfdf&s=" +
                        this.state.title
                    )
                    .then((response) => {
                      this.setState({
                        movies: response.data.Search,
                      });
                      console.log(this.state.movies);
                    })
                    .catch((err) => console.log(err));
                  this.setState({ title: "" });
                }
              }}
              className="w-1/2 flex mx-auto"
            >
              <input
                type="text"
                className="border-2 rounded-l-lg p-2 border-white w-full "
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <button
                type="submit"
                className="py-2 px-4 text-white font-semibold rounded-r-md bg-blue-600 hover:bg-blue-800"
              >
                Search
              </button>
            </form>
          </div>
          <div className="movie">
            {movies.length > 0
              ? movies.map((movie) =>
                  movie.Poster != "N/A" ? (
                    <div key={iterator++}>
                      <Card
                        img={movie.Poster}
                        year={movie.Year}
                        title={movie.Title}
                        imdb={movie.imdbID}
                      />
                    </div>
                  ) : null
                )
              : ""}
          </div>
        </div>
        <div className="fixed hidden modal px-4 bg-black/50 w-full min-h-screen top-0 left-0">
          <div className="flex justify-center w-full min-h-screen items-center">
            <div className="bg-white overflow-hidden w-full lg:w-1/2 rounded-lg">
              <div className="flex justify-between items-center px-4">
                <div className="p-3 font-bold capitalize tracking-wide">
                  Divspan Corp
                </div>
                <CloseBtn
                  onClick={() =>
                    document.querySelector(".modal").classList.toggle("hidden")
                  }
                  className="text-3xl hover:cursor-pointer hover:text-blue-600"
                />
              </div>
              <hr />
              <div className="p-3 modal-detail"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
