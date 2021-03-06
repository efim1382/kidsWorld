import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { filterUserPhoto } from 'helpers/filters';
import classNames from 'classnames';
import styles from './style.css';

const ChatLayout = ({
  children, chats, className, onFilterChange,
}) => <div className={styles.chatLayout}>
  <div className={styles.sidebar}>
    <div className={styles.search}>
      <Icon name="search" className={styles.icon} />
      <input className={styles.field} type="text" placeholder="Поиск" onKeyUp={onFilterChange} />
    </div>

    <div className={styles.list}>
      {!_.isEmpty(chats) && chats.map(chat => <Link
        key={chat.idChat}
        to={`/profile/chat/${chat.idChat}`}

        className={
          (window.location.pathname.includes(`/profile/chat/${chat.idChat}`))
          ? classNames(styles.item, '_selected')
          : styles.item
        }
      >
        <div className={styles.image} style={{ '--image': filterUserPhoto(chat.photo) }} />

        <div className={styles.section}>
          <h4 className={styles.title}>{ chat.name }</h4>
          {chat.lastMessage && <p className={styles.text}>{ chat.lastMessage }</p>}
        </div>
      </Link>)}

      {_.isEmpty(chats) && <p className={styles.emptyMessage}>У вас еще нет чатов</p>}
    </div>
  </div>

  <div className={classNames(styles.content, className)}>{ children }</div>
</div>;

ChatLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onFilterChange: PropTypes.func,

  chats: PropTypes.arrayOf(PropTypes.shape({
    idChat: PropTypes.number,
    name: PropTypes.string,
    message: PropTypes.string,
    photo: PropTypes.string,
  })),
};

export default ChatLayout;
