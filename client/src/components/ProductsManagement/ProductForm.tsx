import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  Modal,
  Popconfirm,
  message,
  PopconfirmProps,
} from "antd";
import { createProduct, Product } from "../../features/product/productSlice";
import { useAppDispatch } from "../../store/hooks";
import { PlusOutlined } from "@ant-design/icons";
import UploadWidget from "../UploadWidget";
import { catchError } from "../../Utils/errorCatch";

const { TextArea } = Input;

const ProductForm: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const [productForm, setProductForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    availability: false,
    photos: [],
    deliveryFees: 0,
    _id:''

  });
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("Updated product:", productForm);
  }, [productForm]);

  const handleChange = (changedValues: any) => {
    setProductForm((prevProductForm) => ({
      ...prevProductForm,
      ...changedValues,
    }));
  };

  const confirm: PopconfirmProps["onConfirm"] = async (e) => {
    console.log(e);
    try {
      message.loading({ content: "Creating product...", key: "creating" });
      setSubmitted(true);
      const response = await dispatch(createProduct(productForm)).unwrap();
      message.success({ content: `Product created successfully id: ${response._id}`, key: "creating" });
      form.resetFields();
      setProductForm({
        name: "",
        description: "",
        price: 0,
        category: "",
        availability: false,
        photos: [],
        deliveryFees: 0,
        _id:''
      });
      setVisible(false);
    } catch (error) {
      message.error({ content: `Failed to create product: ${catchError(error)}`, key: "creating" });
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("product creation cancelled");
  };

 

  const handleUploadSuccess = (url: string) => {
    console.log("cloudinary url returned", url);
    setProductForm((prevProductForm) => ({
      ...prevProductForm,
      photos: [...prevProductForm.photos, url],
    }));
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
          style={{ maxWidth: 600 }}
          onValuesChange={handleChange}
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
          <Form.Item
            label="Availability"
            name="availability"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Photos" name="photos">
            <UploadWidget
              productForm={productForm}
              setProductForm={setProductForm}
              onUploadSuccess={handleUploadSuccess}
            />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title="Add product"
              description="Confirm product creation?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" htmlType="submit" danger>
                Create product
              </Button>{" "}
            </Popconfirm>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
