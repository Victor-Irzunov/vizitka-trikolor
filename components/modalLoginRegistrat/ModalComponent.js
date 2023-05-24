import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { FormLogin } from '../forms/FormLogin'
import { FormRegister } from '../forms/FormRegister'
import FormService from '../forms/FormService'

const ModalComponent = ({ isModalOpen, setIsModalOpen, isForm }) => {
	const [isAccount, setIsAccount] = useState(false)

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	return (
		<Modal
			open={isModalOpen}
			title={<p className='text-2xl font-bold'>{isAccount ? "Регистрация" : "Вход"}</p>}
			centered
			footer={null}
			// onOk={handleOk}
			onCancel={handleCancel}
		>
			{
				!isAccount && !isForm &&
 				<>
					<p className='font-extralight mb-3'>Для доступа в Ваш личный кабинет введите e-mail.</p>
					<FormLogin handleCancel={handleCancel} />
					<span>Нет аккаунта?</span>
					<Button type='link' onClick={() => {
						setIsAccount(true)
						handleCancel()
						setTimeout(() => { setIsModalOpen(true) }, 0.5)
					}}>Зарегистрироваться</Button>
				</>
			}
			{
				isAccount &&
				<>
					<p className='font-extralight mb-3'>Для доступа в Ваш личный кабинет введите e-mail.</p>
					<FormRegister handleCancel={handleCancel} />
					<span>Есть аккаунт?</span>
					<Button type='link' onClick={() => {
						setIsAccount(false)
						handleCancel()
						setTimeout(() => { setIsModalOpen(true) }, 0.7)
					}}>Вход</Button>
				</>
			}
			{
				isForm && !isAccount ?
					<FormService handleCancel={handleCancel} />
					:
					null
			}
		</Modal>
	)
}
export default ModalComponent