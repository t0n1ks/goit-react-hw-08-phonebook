const navigationStyles = {
  nav: {
    marginBottom:'50px', 
    backgroundColor: 'rgba(51, 51, 51, 0.9)', // Прозорий чорний фон
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)', // Ефект розмиття фону
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    gap: '1rem',
  },
  li: {
    fontSize: '1.2rem',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    transition: 'color 0.2s, background-color 0.2s 0.2s', // Анімація затримки для кольору тексту та фону
    position: 'relative',
    display: 'inline-block',
    padding: '0.2rem 0.5rem', // Додано запас для анімації фону
  },
  activeLink: {
    borderBottom: '2px solid #FF5733',
  },
  linkHover: {
    // Ефект при наведенні
    color: '#FF5733',
    backgroundColor: 'rgba(255, 87, 51, 0.2)', // Прозорий оранжевий фон при наведенні
  },
};

export default navigationStyles;
