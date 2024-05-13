import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { Button, Checkbox, Form, Input, InputNumber, Switch, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createProduct } from '../../features/product/productSlice'; // Import your Redux Toolkit product slice

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductForm: React.FC = () => {
  const [visible, setVisible] = useState(false); // State to control visibility of the form
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(createProduct(values));
    setVisible(false); // Close the form after submission
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)} style={{ position: 'absolute', bottom: 20, right: 20 }}>
        Add Product
      </Button>
      <Modal
        title="Add Product"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input product description!' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input product price!' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select product category!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Availability" name="availability" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Rentable" name="rentable" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Photos" name="photos" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
