import React, {useContext} from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';
import {useSnackbar} from 'notistack';
import {IMovie} from '../../../../movieseat';
import localforage from 'localforage';
import {MovieContext} from '../../../../context/MovieContext';

const DeleteButton = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;  
  width: 100%;
  padding-bottom: 8px;
  svg {
    cursor: pointer;
  }
`;
const RemoveMovieFromDashboard = ({movie}: {movie: IMovie}) => {
  const [, setMovies] = useContext(MovieContext);
  const {enqueueSnackbar} = useSnackbar();

  const removeMovieFromList = async (movie) => {
    const value = await localforage.getItem<IMovie []>('trackedMovies');
    if (value) {
      value.forEach((item, index) => {
        if (item.id === movie.id) {
          value.splice(index, 1);
          localforage.setItem('trackedMovies', value);
          setMovies(value);
        }
      });
    }

    enqueueSnackbar(
        'Removed ' + movie.original_title + ' from your watchlist.',
        {variant: 'success'},
    );
  };

  return (
    <DeleteButton onClick={() => removeMovieFromList(movie)}>
      <DeleteForeverIcon/>
    </DeleteButton>
  );
};

export default RemoveMovieFromDashboard;
