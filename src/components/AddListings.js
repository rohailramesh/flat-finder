import React from "react";
import { DashboardFilled, PlusOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
} from "antd";
import { useState } from "react";
import { suffixSelector } from "@/utils";
const { RangePicker } = DatePicker;
const { TextArea } = Input;


function AddListingComponent() {
  return (
    <div>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
        style={{
          maxWidth: 3000,
        }}
      >
        <Form.Item label="Property title">
          <Input />
        </Form.Item>
        <Form.Item label="Address (first line)" name="first_line">
          <Input />
        </Form.Item>
        <Form.Item label="Address (second line)" name="second_line">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item label="Postcode" name="postcode">
          <Input />
        </Form.Item>
        <Form.Item label="Monthly rent">
          <InputNumber
            addonAfter={suffixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Deposit">
          <InputNumber
            addonAfter={suffixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Contract duration(Months)">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Property description">
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item label="Listing pictures" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button>Create listing</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default () => <AddListingComponent />;
