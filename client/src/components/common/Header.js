import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { auth } from 'modules/actions/user';
import { useDispatch } from 'react-redux';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import { HeadbarData } from './HeadbarData';
import { IconContext } from 'react-icons';
import 'styles/header/header.css';
import Profile from 'assests/Profile.png';

const Header = props => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const onSidebarHandler = () => {
    setSidebar(!sidebar);
  };
  const [sign, setSign] = useState(true);
  const onClick = () => {
    setSign(prev => !prev);
  };
  const [userName, setUserName] = useState('');
  const user = useSelector(state => state.user);

  const onClickLogout = () => {
    axios.get('/api/user/logout').then(response => {
      if (response.data.success) {
        localStorage.removeItem('key');
        localStorage.clear();
        props.history.push('/');
      } else {
        alert('로그아웃 실패');
      }
    });
  };

  const getName = () => {
    dispatch(auth()).then(response => {
      if (response.payload.userData != null) {
        setUserName(response.payload.userData.name);
      }
    });
  };

  useEffect(() => {
    getName();
    console.log('안녕하세요. 프론트엔드 개발자가 되고 싶은 홍진혁입니다.');
    console.log('https://github.com/ghdwlsgur/raise');
    console.log(
      '기타 이슈사항을 이곳에 남겨주시면 감사하겠습니다. 좋은 하루 되세요 !!',
    );
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#000', size: '25px' }}>
        <div className="HeaderBox">
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <MdIcons.MdFormatListBulleted onClick={onSidebarHandler} />
            </Link>
            {user.userData && !user.userData.isAuth ? (
              <nav className="userView">
                <Link to="/login" onClick={onClick} className="loginbar">
                  로그인
                </Link>
                <Link to="/register" onClick={onClick} className="registbar">
                  회원가입
                </Link>
              </nav>
            ) : (
              <>
                <nav className="userView">
                  <Link to="/mypage" className="profileBox">
                    <img src={Profile} className="profile" />
                    <input
                      type="text"
                      className="userName"
                      value={userName + '님 환영합니다.'}
                      readOnly
                    />
                  </Link>
                  <button onClick={onClickLogout} className="logoutbar">
                    로그아웃
                  </button>
                </nav>
              </>
            )}
          </div>
        </div>
        <div>
          <p className="RaiseDescription">
            <Link to="/" className="Raise">
              Raise
            </Link>
            웹개발자, 여기로 모이다.
            <SiIcons.SiRstudio className="logo" size="18px" />
          </p>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={onSidebarHandler} />
              </Link>
            </li>
            {HeadbarData.map((item, index) => {
              return (
                <li key={index} className={item.Name}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default withRouter(Header);
