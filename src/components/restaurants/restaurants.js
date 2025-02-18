import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';

import {
  activeRestaurantIdSelector,
  restaurantsListSelector,
  changeRestaurant,
  loadRestaurants,
  restaurantsLoadedSelector,
} from '../../redux/features/restaurants';

function Restaurants({
  activeId,
  restaurants,
  loaded,
  changeRestaurant,
  loadRestaurants,
}) {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  const tabs = useMemo(
    () => restaurants.map(({ id, name }) => ({ id, label: name })),
    [restaurants]
  );

  if (!loaded) return <Loader />;

  return (
    <div>
      <Tabs tabs={tabs} onChange={changeRestaurant} activeId={activeId} />
      <Restaurant id={activeId} />
    </div>
  );
}

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  activeId: activeRestaurantIdSelector(state),
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
});

const mapDispatchToProps = {
  changeRestaurant,
  loadRestaurants,
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
