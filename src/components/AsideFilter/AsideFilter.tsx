import classNames from 'classnames'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { createSearchParams, Link, Navigate, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

import { Category } from 'src/types/category.type'
import Button from '../Button'
import Input from '../Input'
import InputNumber from '../InputNumber'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUnderfinedField } from 'src/types/utils.type'
import RatingStarts from 'src/pages/RatingStarts'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUnderfinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceShema = schema.pick(['price_min', 'price_max'])
const AsideFilter = ({ queryConfig, categories }: Props) => {
  const { t } = useTranslation('home')
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { price_min: '', price_max: '' },
    resolver: yupResolver(priceShema),
    shouldFocusError: false
  })

  const navigate = useNavigate()
  console.log(errors)
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link to={path.home} className={classNames('flex items-center font-bold', { 'text-orange': !category })}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-3 h-6 w-6 '
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        {t('aside filter.all categories')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {' '}
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative flex px-2 ', { 'font-semibold text-orange': isActive })}
              >
                {isActive && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='orange'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='absolute top-1 left-[-10px] h-2 w-2'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-3 h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        {t('aside filter.filter search')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        {t('aside filter.price range')}
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                    classNameError='hidden'
                    placeholder={t('aside filter.price range from')}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  ></InputNumber>
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder={t('aside filter.price range to')}
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  ></InputNumber>
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
            {t('aside filter.button apply')}
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='text-sm'>{t('aside filter.rating')}</div>
      <RatingStarts queryConfig={queryConfig}></RatingStarts>

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button
        className='w-full bg-orange p-2 text-sm uppercase text-white'
        onClick={() => {
          handleRemoveAll()
        }}
      >
        {t('aside filter.button delete all')}
      </Button>
    </div>
  )
}

export default AsideFilter
