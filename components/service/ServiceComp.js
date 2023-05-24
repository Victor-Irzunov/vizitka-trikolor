import { useScreens } from '@/Constants/constants';
import { service } from '../../Constants/data/DataContent'
import { Typography, Badge, Tag } from 'antd'
import { useState, useContext } from 'react'
import { MyContext } from '@/contexts/MyContextProvider';
const { Paragraph, Text } = Typography
const regex = /[^,(]*(?:\([^)]*\))?[^,]*/g;

export const ServiceComp = () => {


	const screens = useScreens()
	const { state } = useContext(MyContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isForm, setIsForm] = useState(false)
	// const result = data[0].service.list.split('/').map(item => {
	// 	const trimmedItem = item.trim();
	// 	return trimmedItem.charAt(0).toUpperCase() + trimmedItem.slice(1);
	// });
	// const array = data.data.split('/')
	// 	.map((item) => item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
	// const showModal = (isForm) => {
	// 	setIsForm(isForm)
	// 	setIsModalOpen(true)
	// }

	function processServerData(data) {
		// Преобразуем полученные данные в объект JavaScript
		var parsedData = data

		// Рекурсивная функция для обработки объекта или массива
		function processObject(obj) {
			if (Array.isArray(obj)) {
				// Если это массив, обрабатываем каждый элемент
				return obj.map(processObject);
			} else if (typeof obj === 'object') {
				// Если это объект, обрабатываем каждое свойство
				var newObj = {};
				for (var key in obj) {
					newObj[key] = processObject(obj[key]);
				}
				return newObj;
			} else if (typeof obj === 'string') {
				// Если это строка, разбиваем ее на подстроки по разделителю "/"
				var substrings = obj.split('/');

				// Преобразуем каждую подстроку, чтобы первая буква стала заглавной
				var capitalizedSubstrings = substrings.map(function (substring) {
					return substring.trim().charAt(0).toUpperCase() + substring.trim().slice(1);
				});

				// Возвращаем массив преобразованных подстрок
				return capitalizedSubstrings;
			} else {
				// Возвращаем неизмененное значение для других типов данных
				return obj;
			}
		}

		// Обрабатываем данные, начиная с корневого объекта
		var processedData = processObject(parsedData);

		// Преобразуем обработанные данные обратно в строку JSON
		var result = processedData

		return result;
	}

	// var result = processServerData(service);
	// console.log(result);




	return (
		<section className='relative mt-20 sm:flex sm:justify-between sm:flex-wrap'>
			{
				service.map(el => {
					return (
						<div className='mb-10 sm:mb-32 sm:w-5/12 sm:mx-5'>
							<Badge.Ribbon
								text={el.badge}
								color="gold"
								key={el.id}

							>
								<div
									className='bg-white rounded-xl'

								>
									<div
										style={{ '--image-url-card': `url(/uploads/${el.img})` }}
										className={`w-full h-[200px] rounded-t-xl bg-[image:var(--image-url-card)] 
											  bg-cover bg-center`}
									/>
									<div className='px-2 pt-4 pb-5 text-center'>
										<h4 className='uppercase text-3xl font-semibold mb-3'>
											{el.h2}
										</h4>
										<p className='uppercase mb-2'>
											{el.description}
										</p>
										<p className='mb-2'>
											<Tag color="gold">{el.subscription}</Tag>
										</p>
										<p>
											{el.info}
										</p>
										<p>
											{el.info2}
										</p>
										<p className='uppercase mt-4 mb-2'>Стоимость:</p>
										<div className='flex justify-center'>
											<span className='font-semibold mx-1'>
												{el.price - (el.price / 100 * el.discount)} руб.
											</span>
											<span className='line-through font-light mx-1'>
												{el.price} руб.
											</span>
										</div>

										<ul className='mt-10'>
											<Paragraph
												ellipsis={
													{
														rows: 4,
														expandable: true,
														symbol: 'Подробнее',
													}
												}
											>
												{
													processServerData(el.list).map((item, idx) => {
														return (
															<li
																className={`mb-1 text-sm ${idx === 0 ? 'text-sm mb-4' : ''}`}
																key={idx}
															>
																{item}
															</li>
														)
													})
												}
											</Paragraph>
										</ul>

									</div>
								</div>
							</Badge.Ribbon>
						</div>
					)
				})
			}
		</section>
	)
}
