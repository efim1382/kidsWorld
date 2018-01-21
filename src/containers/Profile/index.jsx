import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  Header,
  Form,
  Files,
  UserProfile,
  Navigation,
  Modal,
} from 'components';

import { api as userApi } from 'containers/User';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
    }),

    currentUser: PropTypes.func.isRequired,
    changePhoto: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  state = {
    modalShown: false,
  };

  componentWillMount() {
    this.loadData();
  }

  showModal = () => {
    this.setState({
      modalShown: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalShown: false,
    });
  };

  handleSubmit = (data) => {
    const { changePhoto, user } = this.props;

    const body = new FormData();
    body.append('id', user.id);
    body.append('photo', data.photo[0]);

    this.closeModal();

    changePhoto({}, { body }).then(() => {
      this.loadData();
    });
  };

  handleFilesChange = () => {
    // Не успевает почему то попадать данные формы в data
    // Поэтому ставим setTimeout на 0
    setTimeout(() => {
      this.uploadForm.submit();
    }, 0);
  };

  loadData = () => {
    const token = localStorage.getItem('token');

    this.props.currentUser({}, {
      body: JSON.stringify({ token }),
    });
  };

  render() {
    const { children, user } = this.props;

    return <div className={baseStyles.page}>
      <Header />

      <div className={classNames(baseStyles.content, styles.profile)}>
        {!_.isEmpty(user) && <UserProfile
          name={`${user.firstName} ${user.lastName}`}
          phone={`${user.phone}`}
          email={`${user.email}`}
          address={`${user.address}`}
          photo={`${user.photo}`}
          className={styles.content}
          editablePhoto
          handlePhotoClick={this.showModal}
        >
          <Navigation
            items={[
              {
                name: 'Объявления',
                link: '/profile/adverts',
              },

              {
                name: 'Избранное',
                link: '/profile/favorites',
              },

              {
                name: 'Отзывы',
                link: '/profile/reviews',
              },

              {
                name: 'Настройки',
                link: '/profile/settings',
              },
            ]}
          />
          {
            // Переделать только для Settings
            React.cloneElement(children, { user, updateProfile: this.loadData })
          }
        </UserProfile>}

        <Modal
          show={this.state.modalShown}
          title="Загрузка новой фотографии"
          className={styles.modal}
          hancleClose={this.closeModal}
        >
          <p>Загрузите свою настоящую фотографию.</p>
          <p>Вы можете загрузить фотографию только в форматах JPG, GIF или PNG.</p>

          <Form
            model="changePhoto"
            getRef={(node) => { this.uploadForm = node; }}
            className={styles.photoForm}
            onSubmit={this.handleSubmit}
          >
            <Files
              model=".photo"
              onChange={this.handleFilesChange}
            />
          </Form>
        </Modal>
      </div>
    </div>;
  }
}

export default connect(
  state => ({
    user: _.get(state, 'users.currentUser.data.user', {}),
  }),

  {
    currentUser: userApi.actions.currentUser.sync,
    changePhoto: userApi.actions.changePhoto.sync,
  },
)(Profile);
