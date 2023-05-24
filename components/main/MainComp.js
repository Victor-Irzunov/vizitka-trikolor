import {
	ImportOutlined,
	FormOutlined,
} from '@ant-design/icons'
import { useState, useContext } from 'react'
import ModalComponent from '../modalLoginRegistrat/ModalComponent'
import { MyContext } from '@/contexts/MyContextProvider'
import { useScreens } from '@/Constants/constants'
import {data} from '../../Constants/data/DataContent'
import { ServiceComp } from '../service/ServiceComp'

export const MainComp = () => {
	const screens = useScreens()
	const { state } = useContext(MyContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isForm, setIsForm] = useState(false)



	return (
		<>
			<section className="relative pb-7 pt-20">
				<div className='container mx-auto'>
					<div className=''>
						<h2 className='text-white uppercase font-light text-sm mb-3'>
							{data[0].h2}
						</h2>
						<h1 className='text-white text-3xl font-semibold uppercase'>
						{data[0].h1}
						</h1>
						<h3 className='text-white mt-4 uppercase'>
						{data[0].h3}
						</h3>
						<h4 className='text-yellow-400 font-light mt-10'>
						{data[0].h4}
						</h4>
						<p className='text-gray-200 font-light mt-6 uppercase'>
						{data[0].p}
						</p>
						<p className='text-white font-light mt-6 text-sm'>
						{data[0].info}
						</p>
					</div>

					<ServiceComp/>
					
					<div className="flex text-white text-lg justify-end mt-32">
						{
							state.isAdmin ?
								<FormOutlined
									className='ml-2'
									onClick={() => {
										showModal(true)
									}}
								/>
								:
								<ImportOutlined
									className='ml-2'
									onClick={() => {
										showModal(false)
									}}
								/>
						}
					</div>
				</div>
			</section>
			<ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isForm={isForm} />
		</>
	)
}


