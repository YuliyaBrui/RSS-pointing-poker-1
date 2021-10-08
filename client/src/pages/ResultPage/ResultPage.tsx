/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Col from 'antd/lib/grid/col';
import axios from 'axios';
import Button from 'antd/lib/button';
import { useSelector } from 'react-redux';
import Space from 'antd/lib/space';
import Spin from 'antd/lib/spin';
import Issue from '../../components/Issues/Issue';
import { IIssue } from '../../redux/types/issues';
import styles from './ResultPage.module.scss';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { RootState } from '../../redux';
import { SERVER_URL } from '../../socket';

interface TStatistics extends Object {
  [point: number]: number[];
}

const ResultPage = (): JSX.Element => {
  const [sessionName, setSessionName] = useState('');
  const [gameResults, setGameResults] = useState<TStatistics>({});

  // const { gameID } = sessionStorage;
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
    console.log(issues)
  const savedResults: any = [];
  for (let i = 0; i < issues.length; i += 1) {
    savedResults.push(issues[i]);
    savedResults.push(gameResults[i]);
  }
  console.log(gameResults);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
    axios
      .get(`${SERVER_URL}/result/${gameID}`)
      .then((res) => setGameResults(res.data));
  }, []);

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (): void => {
    const ws = XLSX.utils.json_to_sheet(savedResults);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `results${fileExtension}`);
  };

  return sessionName.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.result_wrapper}>
        <div className={styles.header_wrapper}>
          <h2 className={styles.result_title}>{sessionName}</h2>
          <Button
            type="primary"
            className={styles.save_button}
            onClick={(e) => exportToCSV()}
          >
            Save results
          </Button>
        </div>
        <Col style={{ width: '100%' }}>
          {issues &&
            issues.map((issue: IIssue, index) => (
              <div className={styles.issues_results}>
                <Issue
                  title={issue.title}
                  priority={issue.priority}
                  link={issue.link}
                  id={issue.id}
                  key={issue.id}
                />
                {Object.keys(gameResults).length > 1 && (
                  <div className={styles.issue_votes}>
                    {Object.entries(gameResults[index]).map(([key, value]) => (
                      <div className={styles.card_wrapper}>
                        {key !== '0' ? (
                          <GameCard cardValue={+key} id={+key} />
                        ) : (
                          <CoffeeGameCard />
                        )}
                        <div className={styles.value}>{`${value}%`}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </Col>
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default ResultPage;
