import { Form, Button, Input, message } from 'antd'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useContext } from 'react'
import { MyContext } from '@/contexts/MyContextProvider'

export const FormLogin = ({handleCancel}) => {
	const { updateState } = useContext(MyContext)
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		console.log('values:', values)

		await axios.post('/api/login',
			{ email: values.email, password: values.password }
		)
			.then(response => {
				if (response.status === 200) {
					message.success('Вы вошли!')
					localStorage.setItem('token', response.data.token)
					updateState(jwt_decode(response.data.token))
					form.resetFields()
					router.push('/')
					handleCancel()
				}
			})
			.catch(error => {
				if (error.response && error.response.status === 401) {
					console.log(error.response.data.message);
					message.error(error.response.data.message);
				} else {
					console.log('Ошибка:', error.message);
				}
			});
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}
	return (
		<>
			<Form
				name="login"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="почта"
					name="email"
					form={form}
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите почту!',
						},
						{
							type: 'email',
							message: 'Введите корректный email!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Пароль"
					name="password"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите пароль!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
