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

enum SortType {
  ALPHABETICALLY = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

interface Options {
  goods: string[];
  sortBy: SortType;
  isReversed: boolean;
}

const getGoods = ({ goods, sortBy, isReversed }: Options) => {
  let visibleGoods = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SortType.ALPHABETICALLY:
        visibleGoods = visibleGoods.toSorted();
        break;
      case SortType.LENGTH:
        visibleGoods = visibleGoods.toSorted((a, b) => a.length - b.length);
        break;
      default:
        return null;
    }
  }

  if (isReversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const canReset = sortBy || isReversed;

  const visibleGoods =
    getGoods({ goods: goodsFromServer, sortBy, isReversed }) || [];

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.ALPHABETICALLY,
          })}
          onClick={() => setSortBy(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.LENGTH,
          })}
          onClick={() => setSortBy(SortType.LENGTH)}
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

        {canReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
