import './main.css';
import {useState} from 'react';
import {useTransition, animated} from 'react-spring';

const App = () => {
  const [items, setItems] = useState([]);
  const transition = useTransition(items, {
    from: {x: -100, y: 500, opacity: 0, width: 10, height: 10},
    enter: item => async (next) => {
      await next({y: item.y, opacity: 1, delay: item.delay});
      await next({x: 0, width: 100, height: 100});
    },
    leave: item => async (next) => {
      await next({x: 100, width: 10, height: 10, delay: item.delay});
      await next({y: 500, opacity: 0});
    },
  });

  return (
    <div className="app">
      <button onClick={() => {
        setItems(v => v.length ? [] : [
          {y: -100, delay: 0},
          {y: 0, delay: 200},
          {y: 100, delay: 400},
        ])
      }}>
        {items.length ? 'Unmount' : 'Mount'}
      </button>

      <div className="container">
        {transition((style, item) =>
          item ? <animated.div style={style} className="item" /> : ''
        )}
      </div>
    </div>
  );
}

export default App;
