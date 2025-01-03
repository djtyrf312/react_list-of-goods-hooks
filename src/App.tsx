import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum ESortType {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'by length',
  DEFAULT = '',
}

interface IOptions {
  sortBy: ESortType;
  isReversed: boolean;
}

const getGoods = (goods: string[], { sortBy, isReversed }: IOptions) => {
  let visibleGoods = [...goods];

  if (isReversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  if (sortBy) {
    switch (sortBy) {
      case ESortType.ALPHABETICALLY:
        visibleGoods = visibleGoods.toSorted();
        if (isReversed) {
          visibleGoods = visibleGoods.toReversed();
        }

        break;
      case ESortType.LENGTH:
        if (isReversed) {
          visibleGoods = visibleGoods.toSorted((a, b) => b.length - a.length);
        } else {
          visibleGoods = visibleGoods.toSorted((a, b) => a.length - b.length);
        }

        break;
      default:
        return null;
    }
  }

  return visibleGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState<ESortType>(ESortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const canReset = sortBy || isReversed;

  const visibleGoods = getGoods(goodsFromServer, { sortBy, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== ESortType.ALPHABETICALLY,
          })}
          onClick={() => setSortBy(ESortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== ESortType.LENGTH,
          })}
          onClick={() => setSortBy(ESortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {canReset ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(ESortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods &&
          visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
      </ul>
    </div>
  );
};
