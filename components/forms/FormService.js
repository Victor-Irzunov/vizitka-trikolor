import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/router'

const { TextArea } = Input

const FormService = ({handleCancel}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const router = useRouter()

  useEffect(() => {
    axios.get('/api/service-data')
      .then(response => {
        console.log('response:', response)
        if (response.data) {
          setData(response.data[0])
        } else {
          message.warning('Данных нет')
        }
      })
  }, [])

  const onFinish = async (values) => {

    console.log('values:', values)
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('tel1', values.tel1 || '');
      formData.append('rezhim1', values.rezhim1 || '');
      formData.append('tel2', values.tel2 || '');
      formData.append('rezhim2', values.rezhim2 || '-');
      formData.append('h1', values.h1 || '');
      formData.append('h2', values.h2 || '');
      formData.append('h3', values.h3 || '');
      formData.append('h4', values.h4 || '');
      formData.append('h5', values.h5 || '');
      formData.append('h6', values.h6 || '');
      formData.append('h1_2', values.h1_2 || '');
      formData.append('content', values.content || '');
      formData.append('list', values.list || '');
      formData.append('p', values.p || '');
      formData.append('data', values.data || '');
      formData.append('contact', values.contact || '');
      formData.append('email', values.email || '');
      if (values.img) {
        formData.append('img', values.img[0].originFileObj);
      }
      formData.append('alt', 'фоновое изображение ремонт печей');
      formData.append('content', values.content || '');

      const response = await axios.post('/api/service', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data) {
        message.success(response.data.message);
        form.resetFields()
        router.push('/')
        handleCancel()
      }
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('Failed to save data.');
    } finally {
      setLoading(false);
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  if (Object.keys(data).length) {
    return (
      <Form
        form={form}
        name='data'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{
          span: 24,
        }}
        // wrapperCol={{
        // 	span: 18,
        // }}
        initialValues={
          {
            tel1: data?.tel1,
            rezhim1: data?.rezhim1,
            tel2: data?.tel2,
            // rezhim2: data?.rezhim2,
            h1_2: data?.h1_2,
            h1: data?.h1,
            h2: data?.h2,
            h3: data?.h3,
            h4: data?.h4,
            h5: data?.h5,
            h6: data?.h6,
            p: data?.p,
            list: data?.list,
            data: data?.data,
            contact: data?.contact,
            email: data?.email,
            content: data?.content,
          }
        }
      >
        <Form.Item
          name="img"
          label="Загрузите изображение"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        // rules={[{ required: true, message: 'Please upload an image' }]}
        >
          <Upload
            name="img"
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>


        <Form.Item
          name="tel1"
          label="Телефон 1"
          tooltip='Пример: +375 29 000 00 00'
        >
          <Input placeholder='+375 29 000 00 00' />
        </Form.Item>

        <Form.Item
          name="rezhim1"
          label="Режим работы 1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tel2"
          label="Телефон 2"
          tooltip='Пример: +375 29 000 00 00'
        >
          <Input placeholder='+375 29 000 00 00' />
        </Form.Item>

        {/* <Form.Item
          name="rezhim2"
          label="Режим работы 2"
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          name="h1_2"
          label="Заголовок"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="h1"
          label="Главный заголовок"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="h2"
          label="Заголовок"
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>

        <Form.Item
          name="h3"
          label="Заголовок"
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>

        <Form.Item
          name="h4"
          label="Заголовок"
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>

        <Form.Item
          name="list"
          label="Список"
          tooltip='Перенос на следующую строку "/"'
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>


        <Form.Item
          name="h5"
          label="Заголовок"
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>
        <Form.Item
          name="h6"
          label="Заголовок"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="p"
          label=""
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>

        <Form.Item
          name="data"
          label="Реквизиты"
          tooltip='Перенос на следующую строку "/"'
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>


        <Form.Item
          name="contact"
          label=""
          tooltip='Пример: 375 00 0 00 00 00'
        >
          <Input placeholder='375 29 0 00 00 00' />
        </Form.Item>
        <Form.Item
          name="email"
          label=""
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Уникальный контент"
          tooltip='Для поисковых роботов с ключами по тексту. Перенос на следующую строку "/"'
        >
          <TextArea
            autoSize allowClear showCount
          />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default FormService
