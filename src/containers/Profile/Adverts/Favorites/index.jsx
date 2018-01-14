import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterAdvertImage } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { CardAdvert } from 'components';
import styles from './style.css';

class Favorites extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })).isRequired,

    userId: PropTypes.string.isRequired,
    getFavoritesAdverts: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { getFavoritesAdverts, userId } = this.props;
    getFavoritesAdverts({ userId });
  }

  render() {
    const { adverts, pushURL } = this.props;

    return <div className={styles.favorites}>
      {adverts.length > 0 && <div className={styles.list}>
        {adverts.map(advert => <CardAdvert
          key={advert.id}
          title={advert.title}
          image={filterAdvertImage(advert.mainImage)}
          className={styles.advert}

          actions={[
            {
              icon: 'open_in_new',
              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },
          ]}
        />)}
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getFavoritesAdverts.data.data', []),
    userId: parseInt(localStorage.getItem('id'), 10) || '',
  }),

  {
    getFavoritesAdverts: advertsApi.actions.getFavoritesAdverts.sync,
    pushURL: push,
  },
)(Favorites);