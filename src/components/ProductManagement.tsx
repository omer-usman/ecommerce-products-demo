import React, { useState } from 'react';
import { Form, Input, Button, Card, Modal, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, deleteProduct, selectProductsByUser } from '../redux/productSlice';
import { RootState } from '../redux/store';
import { v4 as uuidv4 } from 'uuid';
import { logout, selectLoggedInUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './ProductManagement.css'; // Import the CSS file

const ProductManagement: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const products = useSelector((state: RootState) => selectProductsByUser(state, loggedInUser!));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const productData = { ...values, id: editingProduct ? editingProduct.id : uuidv4(), userId: loggedInUser!, image: imageUrl };
      if (editingProduct) {
        dispatch(editProduct(productData));
        message.success('Product updated successfully');
      } else {
        dispatch(addProduct(productData));
        message.success('Product added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
      setImageUrl(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
    setImageUrl(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setImageUrl(product.image);
    showModal();
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      onOk: () => {
        dispatch(deleteProduct(id));
        message.success('Product deleted successfully');
      },
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    message.success('Logged out successfully');
    navigate('/signin');
  };

  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false; // Prevent upload
  };

  return (
    <div className="product-management-container">
      <div className="button-container">
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
        <Button type="default" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="card-container">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            extra={
              <div>
                <Button type="link" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button type="link" danger onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </div>
            }
            className="card"
          >
            <p>Quantity: {product.quantity}</p>
            <p>Price: {product.price}</p>
            <p>Expiry Date: {product.expiryDate}</p>
            {product.image && <img src={product.image} alt={product.name} />}
          </Card>
        ))}
      </div>
      <Modal title={editingProduct ? 'Edit Product' : 'Add Product'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" className="modal-form">
          <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]} className="modal-form-item">
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]} className="modal-form-item">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]} className="modal-form-item">
            <Input />
          </Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true, message: 'Please input the expiry date!' }]} className="modal-form-item">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Product Image" className="modal-form-item">
            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} className="upload-button">Upload Image</Button>
            </Upload>
            {imageUrl && <img src={imageUrl} alt="Product" style={{ width: '100%', marginTop: 10 }} />}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;