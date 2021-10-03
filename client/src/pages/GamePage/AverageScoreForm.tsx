import Button from 'antd/lib/button/button';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { socket } from '../../socket';
import styles from './GamePage.module.scss';

type averageForm = {
  alertResultGame: boolean;
  resultFormVisib: (a: boolean) => void;
};

const AverageScoreForm = ({
  alertResultGame,
  resultFormVisib,
}: averageForm): JSX.Element => {
  const [averagePoints, setAveragePoints] = useState({
    quantity: '',
    average: '',
    coffee: '',
  });

/*  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
*/
const { gameID } = sessionStorage;
  const nextIssue = (): void => {
    socket.emit('NEXT_ISSUE', gameID);
  };

  useEffect(() => {
    socket.emit('GET_AVERAGE_RESULT', gameID);
    socket.on('GET_AVERAGE_RESULT', (data) => {
      console.log(data, 'AVERAGE');
      setAveragePoints(data);
    });
  }, []);
  return (
    <div className={styles.info_wrapper}>
      <div className={styles.game_info}>
        <h3>Information about the last vote</h3>
        <div className={styles.stat}>
          <h5>
            Total votes:
            {averagePoints.quantity}
          </h5>
          <h5>
            Average rating:
            {averagePoints.average}
          </h5>
          <h5>
            Want a pause:
            {averagePoints.coffee}
          </h5>
        </div>
        <Button
          type="primary"
          onClick={() => {
            resultFormVisib(false);
            nextIssue();
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default AverageScoreForm;
