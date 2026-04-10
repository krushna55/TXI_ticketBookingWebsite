import { selectionMovie } from "@/types/movies";
import { getDate } from "@/utils/getDate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todayData = getDate(0);
const todayFormatted = `${todayData.year}-${todayData.month}-${todayData["Date"]}`;

// ✅ Extend selectionMovie, don't nest it
interface movieState extends selectionMovie {
  movie_id: string;
  Movie_date: string;
  selected_seats: string[];
}

const initialState: movieState = {
  movie_id: "",
  Movie_date: todayFormatted,
  screenDetails: {
    id: 0,
    name: "",
    type: null,
    screen_row:0,
    screen_column:0,
  },
  selected_showtime: {
    id: 0,
    show_time: null,
    price: null,
  },
  showtimes: [],
  theaterDetails: {
    id: 0,
    name: "",
    complete_address: null,
    district: null,
    city_id: null,
    brand_name: null,
    brand_logo: "",
    date: null,
    distanceKm: null,
  },
  selected_seats:[]
};

export const movieSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movie_id = action.payload;
    },

    setMovieDate: (state, action: PayloadAction<string>) => {
      state.Movie_date = action.payload;
      // reset downstream selections when date changes
      state.selected_showtime = initialState.selected_showtime;
      state.screenDetails = initialState.screenDetails;
      state.theaterDetails = initialState.theaterDetails;
      state.showtimes = [];
    },
    setSelected_seats:(state,action:PayloadAction<{selected_seats:string[]}>)=>{
      state.selected_seats = action.payload.selected_seats
    },
    setSelectedShowtime:(state,action:PayloadAction<{selected_showtime:selectionMovie['selected_showtime']}>)=>{
      state.selected_showtime = action.payload.selected_showtime
    },
    setSelection: (
      state,
      action: PayloadAction<{
        theaterDetails: selectionMovie["theaterDetails"];
        screenDetails: selectionMovie["screenDetails"];
        selected_showtime: selectionMovie["selected_showtime"];
        showtimes: selectionMovie["showtimes"];
      }>,
    ) => {
      state.theaterDetails = action.payload.theaterDetails;
      state.screenDetails = action.payload.screenDetails;
      state.showtimes = action.payload.showtimes;
      state.selected_showtime = action.payload.selected_showtime;
    },

    setShowtimes: (
      state,
      action: PayloadAction<selectionMovie["showtimes"]>,
    ) => {
      state.showtimes = action.payload;
    },

    resetSelection: () => initialState,
    resetSelectedSession: (state) => {
      state.selected_showtime = {
        id: 0,
        show_time: null,
        price: null,
      }
    }
  },
});

export const {
  setMovieId,
  setMovieDate,
  setSelection,
  setShowtimes,
  resetSelection,
  setSelectedShowtime,
  setSelected_seats,
  resetSelectedSession
} = movieSlice.actions;

export default movieSlice.reducer;
