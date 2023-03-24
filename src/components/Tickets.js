import React from "react";
import Lottie from '@amelix/react-lottie'
import { successOptions } from "@/utils";
import { Card } from "antd";
import { Modal } from "antd";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
} from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";


function TicketsComponent ({ user_id, setTickets }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const [success, setSuccess] = useState(false)

  const ticketService = new TicketService()
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (title && content) {
      const new_ticket = await ticketService.addTicket(title, content, user_id)
      console.log('Ticket that we got back: ', new_ticket)
      setTickets((prev) => prev.concat([new_ticket]))
    }
    setConfirmLoading(false);
    setSuccess(true)
    
    setTimeout(() => {
      setTitle('')
      setContent('')
      setOpen(false);
      setSuccess(false)
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <> 
      <Row style={{ marginLeft: "100" }}>
        <Card
          title="Ticket id:"
          bordered={false}
          style={{
            width: 200,
            height: 150,
            margin: 20,
            marginLeft: 80,
          }}
        >
          <p>Ticket date</p>
          <p>Ticket description</p>
        </Card>
        <br></br>
        <Card
          title="Ticket id:"
          bordered={false}
          style={{
            width: 200,
            height: 150,
            margin: 20,
          }}
        >
          <p>Ticket date</p>
          <p>Ticket description</p>
        </Card>
        <Card
          title="Ticket id:"
          bordered={false}
          style={{
            width: 200,
            height: 150,
            margin: 20,
          }}
        >
          <p>Ticket date</p>
          <p>Ticket description</p>
        </Card>
      </Row>
      <br></br>
      <Button type="primary" onClick={showModal}>
        Add ticket
      </Button>
      <Modal
        title="Ticket form"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      {
        success ? 
        <div>
        <Lottie 
	        options={successOptions}
          height={300}
          width={300}
          />
      </div> : 
        <Form layout="vertical" >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter a ticket title",
                  },
                ]}
                >
                <Input placeholder="Please eneter a ticket title" onChange={(e) => setTitle(e.target.value)}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}></Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter ticket description",
                  },
                ]}
                >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter ticket description" onChange={(e) => setContent(e.target.value)}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      }
      </Modal>
    </>
  );
};
export default TicketsComponent;
