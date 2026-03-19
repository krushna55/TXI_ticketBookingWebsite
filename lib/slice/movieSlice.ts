import { getDate } from "@/utils/getDate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface movieDetail {
  movie_id: string;
  showtime_id: string;
  showtime_slot: string;
  Movie_date: string;
}
const todayData = getDate(0)
const todayFormatted = `${todayData.year}-${todayData.month}-${todayData["Date"]}`

const initialState: movieDetail = {
  movie_id: "",
  showtime_id: "",
  showtime_slot: "",
  Movie_date: todayFormatted,
};

export const movieSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movie_id = action.payload;
    },
    setShowtimeId: (state, action: PayloadAction<string>) => {
      state.showtime_id = action.payload;
    },
    setShowtimeSlot: (state, action: PayloadAction<string>) => {
      state.showtime_slot = action.payload;
    },
    setMovieDate: (state, action: PayloadAction<string>) => {
      state.Movie_date = action.payload;
    },
  },
});

export const { setMovieId, setShowtimeId, setShowtimeSlot,setMovieDate } =
  movieSlice.actions;
export default movieSlice.reducer;
