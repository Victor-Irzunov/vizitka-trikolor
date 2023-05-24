import { Form, Button, Input, Checkbox, message } from 'antd'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useContext } from 'react'
import { MyContext } from '@/contexts/MyContextProvider'


export const FormRegister = ({handleCancel}) => {
	const { updateState } = useContext(MyContext)
	
	const onFinish = async (values) => {
		console.log('values:', values)
		
		await axios.post('/api/register',
			{ isAdmin: values.isAdmin, email: values.email, password: values.password },
		)
			.then(response => {
				if (response.status === 200) {
					message.success('Вы зарегистрированы!')
					localStorage.setItem('token', response.data.token)
					updateState(jwt_decode(response.data.token))
					form.resetFields()
					router.push('/')
					handleCancel()
				}
			})
			.catch(error => {
				if (error.response.status === 401) {
					console.log(error.response.data.message);
					message.success(error.response.data.message)
				} else {
					console.log('Ошибка при регистрации:', error.message);
				}
			});
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}
	return (
		<>
			<Form
				name="create"
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
					label="Почта"
					name="email"
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
					tooltip="минимум 4 символа"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите пароль!',
						},
					]}
				>
					<Input.Password placeholder="мин. 4 символа" />
				</Form.Item>
				<Form.Item
					name="password2"
					label="Повторите пароль"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Пожалуйста повторите пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>



				<Form.Item
					label=""
					name="isAdmin"
					valuePropName="checked"
				>
					<Checkbox >Админстратор</Checkbox>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Регистрация
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
