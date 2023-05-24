import React from 'react'
import { Modal } from 'antd'
import FormService from '../forms/FormService'

export const ModalUniversal = ({ isModalOpen, title = '', handleCancel }) => {

	return (
		<Modal
			title={title}
			open={isModalOpen}
			onCancel={handleCancel}
			centered
			footer={null}
		>
			<FormService />


		</Modal>
	)
}
