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
import UploadWidget from "../UploadWidget";
import { catchError } from "../../Utils/errorCatch";
import { FloatButton } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";


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
    rentable: false,  // Add rentable field
    photos: [],
    deliveryFees: 0,
    _id: ''
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
        rentable: false,  // Add rentable field
        photos: [],
        deliveryFees: 0,
        _id: ''
      });
      setVisible(false);
    } catch (error) {
      message.error({ content: `Failed to create product: ${catchError(error)}`, key: "creating" });
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("product creation cancelled");
    form.resetFields();

    setVisible(false);

    setProductForm({
      name: "",
      description: "",
      price: 0,
      category: "",
      availability: false,
      rentable: false,  // Add rentable field
      photos: [],
      deliveryFees: 0,
      _id: ''
    });
    
  };

  const handleUploadSuccess = (url: string ,  id:string) => {
    console.log("cloudinary url returned", url);
    const photo = { url:url , cloudinaryId:id}
    setProductForm((prevProductForm) => ({
      ...prevProductForm,
      photos: [...prevProductForm.photos,photo ]
    }));
  };
  
  return (
    <>
      <FloatButton icon={<FaPlus />} type="primary" style={{ right: 24 }} onClick={() => setVisible(true)} />
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
          <Form.Item
            label="Rentable"
            name="rentable"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Photos" name="photos">
            <UploadWidget
              customElement={            <MdAddPhotoAlternate />
            }
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
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
