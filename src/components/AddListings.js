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
  Checkbox
} from "antd";
import { useState } from "react";
import { suffixSelector } from "@/utils";
import { emptyListing } from "@/utils";
const { RangePicker } = DatePicker;
const { TextArea } = Input;


function AddListingComponent() {

  const [listing, setListing] = useState(emptyListing)

  const handleChange = (e, field, nestedField) => {
    const { value } = e.target;
    setListing((prevListing) => {
      if (nestedField) {
        return {
          ...prevListing,
          [field]: { ...prevListing[field], [nestedField]: value },
        };
      } else {
        return { ...prevListing, [field]: value };
      }
    });
  };
  

  return (
    <div>
      <Form
        labelCol={{span: 5}}
        wrapperCol={{span: 10}}
        layout="horizontal"
        style={{maxWidth: 3000}}
      >
        <Form.Item label="Property title">
          <Input 
            value={listing.title}
            onChange={ (e) => handleChange(e, 'title')}
          />
        </Form.Item>
        <Form.Item label="Address (first line)" name="first_line">
          <Input 
            value={listing.address.first_line}
            onChange={ (e) => handleChange(e, 'address', 'first_line')}
          />
        </Form.Item>
        <Form.Item label="Address (second line)" name="second_line">
          <Input 
            value={listing.address.second_line}
            onChange={ (e) => handleChange(e, 'address', 'second_line')}
          />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input 
            value={listing.address.city}
            onChange={ (e) => handleChange(e, 'address', 'city')}
          />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input 
            value={listing.address.country}
            onChange={ (e) => handleChange(e, 'address', 'country')}
          />
        </Form.Item>
        <Form.Item label="Postcode" name="postcode">
          <Input 
            value={listing.address.postcode}
            onChange={ (e) => handleChange(e, 'address', 'postcode')}
          />
        </Form.Item>
        <Form.Item label="Monthly rent">
          <InputNumber
            addonBefore={suffixSelector}
            style={{
              width: "100%",
            }}
            step={50}
            value={listing.monthly_price}
            onChange={(value) => setListing(prevListing => ({
              ...prevListing, monthly_price: value
            }))}
          />
        </Form.Item>
        <Form.Item label="Deposit">
          <InputNumber
            addonBefore={suffixSelector}
            style={{
              width: "100%",
            }}
            step={50}
            value={listing.deposit}
            onChange={(value) => setListing(prevListing => ({
              ...prevListing, deposit: value
            }))}
          />
        </Form.Item>
        <Form.Item label="Contract duration(Months)">
          <InputNumber
           value={listing.contract_length}
           onChange={(value) => setListing(prevListing => ({
            ...prevListing, contract_length: value
          }))}
          />
        </Form.Item>
          <Form.Item label="Bathrooms">
            <InputNumber 
              value={listing.key_features.bathrooms}
              min={1}
              onChange={(value) => setListing(prevListing => ({
                ...prevListing, key_features: {...prevListing.key_features, bathrooms: value }
              }))}
            />
          </Form.Item>
          <Form.Item label="Beds">
            <InputNumber 
              value={listing.key_features.beds}
              min={1}
              onChange={(value) => setListing(prevListing => ({
                ...prevListing, key_features: {...prevListing.key_features, beds: value }
              }))}
            />
        </Form.Item>
        <Form.Item label="Property description">
          <TextArea rows={6} 
            value={listing.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </Form.Item>
        <Form.Item label="Key Features">
          <Row>
            <Col span={10}>
              <Checkbox
                style={{
                  lineHeight: '32px',
                }}
                value={listing.key_features.pets_allowed}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, pets_allowed: e.target.checked }
                }))}
              >
                Pets allowed
              </Checkbox>
            </Col>
            <Col span={10}>
              <Checkbox
                value={listing.key_features.smoking_allowed}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, smoking_allowed: e.target.checked }
                }))}
                style={{
                  lineHeight: '32px',
                }}
              >
                Smoking allowed
              </Checkbox>
            </Col>
            <Col span={10}>
              <Checkbox
                value={listing.key_features.station_nearby}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, station_nearby: e.target.checked }
                }))}
                style={{
                  lineHeight: '32px',
                }}
              >
                Station nearby
              </Checkbox>
            </Col>
            <Col span={10}>
              <Checkbox
                value={listing.key_features.gym_nearby}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, gym_nearby: e.target.checked }
                }))}
                style={{
                  lineHeight: '32px',
                }}
              >
                Gym nearby
              </Checkbox>
            </Col> 
          </Row>
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
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item>
          <Button type='primary'  htmlType="submit" >Create listing</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default () => <AddListingComponent />;
