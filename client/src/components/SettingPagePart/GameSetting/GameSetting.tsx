import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Col from 'antd/lib/grid/col';
import Input from 'antd/lib/input/Input';
import Slider from 'antd/lib/slider';
import Switch from 'antd/lib/switch';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setShortScoreType } from '../../../redux/actions/setShortScoreType';
import styles from './GameSetting.module.scss';

const GameSetting = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <Form
      labelCol={{ span: 14 }}
      wrapperCol={{ span: 10 }}
      layout="horizontal"
      size="middle"
      style={{ width: '80%', display: 'flex', justifyContent: 'space-evenly' }}
    >
      <Col span={10}>
        <FormItem label="Scram master as player:" valuePropName="checked">
          <Switch />
        </FormItem>
        <FormItem label="Changing card in round end:" valuePropName="checked">
          <Switch />
        </FormItem>
        <FormItem label="Is timer needed:" valuePropName="checked">
          <Switch />
        </FormItem>
      </Col>
      <Col span={10} style={{ paddingRight: '20px' }}>
        <FormItem labelCol={{ span: 10 }} label="Score type:">
          <Input />
        </FormItem>
        <FormItem labelCol={{ span: 10 }} label="Score type (Short)">
          <Input
            defaultValue="ST"
            onChange={(e) => dispatch(setShortScoreType(e.target.value))}
          />
        </FormItem>
        <FormItem labelCol={{ span: 10 }} name="slider" label="Round time:">
          <Slider
            trackStyle={{ width: '200px' }}
            max={1000}
            marks={{
              0: '0sec',
              1000: '1000sec',
            }}
          />
        </FormItem>
      </Col>
    </Form>
  );
};

export default GameSetting;
