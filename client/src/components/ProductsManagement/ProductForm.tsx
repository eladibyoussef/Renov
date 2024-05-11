import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Switch, Upload, Modal } from "antd";
import { createProduct } from "../../features/product/productSlice";
import { useAppDispatch } from "../../store/hooks";
import { PlusOutlined } from "@ant-design/icons";
import UploadWidget from "../UploadWidget";

const { TextArea } = Input;

const ProductForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const productData = { ...values, photos: fileList.map((file) => file) };
    console.log(productData);
    console.log('values', values);
    

    dispatch(createProduct(productData));
    // setVisible(false);

    form.resetFields();
  };

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
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
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please select product category!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Availability"
            name="availability"
            valuePropName="checked"
          >
            <Switch defaultChecked onChange={onChange} />
          </Form.Item> */}

<Form.Item  label="Availability"
            name="availability" valuePropName="checked" initialValue={false}>
        <Switch />
      </Form.Item>

          <Form.Item
            label="Photos"
            name="photos"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              multiple
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          {/* <Form.Item
                      label="Photos"
                      name="photos"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                    <UploadWidget />

                    </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
