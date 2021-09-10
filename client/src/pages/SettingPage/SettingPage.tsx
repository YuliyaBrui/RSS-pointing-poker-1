import React, { useState } from 'react';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Button from 'antd/lib/button/button';
import './SettingPage.scss';
import SessionInfo from '../../components/SettingPagePart/SessionInfo/SessionInfo';
import StartCancelButtons from '../../components/SettingPagePart/StartCancelButton/StartCancelButton';
import Member from '../../components/SettingPagePart/Member/Member';
import Issues from '../../components/SettingPagePart/Issues/Issue';
import CreateIssue from '../../components/SettingPagePart/Issues/CreateIssueButton';
import IssueForm from '../../components/SettingPagePart/Issues/IssueForm';

const SettingPage = (): JSX.Element => {
  const [issues, setIssues] = useState([<Issues />, <Issues />, <Issues />]);
  const [formVisible, setFormVisible] = useState(false);

  return (
    <div className="wrapper">
      <div className="main">
        <div className="main__panel">
          <SessionInfo />
          <StartCancelButtons />
        </div>
        <div className="main__panel">
          <h3>Members:</h3>
          <Member />
        </div>
        <div className="main__panel">
          <h3>Issues:</h3>
          <Row
            style={{ width: '100%' }}
            gutter={[16, 16]}
            justify="space-between"
          >
            {issues.map((issue) => (
              <Col span={8}>{issue}</Col>
            ))}
            <Col span={8}>
              <button
                className="main__button-invis"
                type="button"
                onClick={() => setFormVisible(true)}
              >
                <CreateIssue />
              </button>
            </Col>
          </Row>
        </div>
      </div>
      <IssueForm formVisible={formVisible} setFormVisible={setFormVisible} />
    </div>
  );
};

export default SettingPage;
