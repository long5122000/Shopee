import { useQuery } from '@tanstack/react-query'

import React, { useState } from 'react'
import { omitBy, isUndefined } from 'lodash'
import productApi from 'src/apis/product.api'
import AsideFilter from 'src/components/AsideFilter'
import Pagination from 'src/components/Paginate/Pagination'
import Product from 'src/components/Product '
import SortProductList from 'src/components/SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

const ProductList = () => {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategoryApi()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-12 md:col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []}></AsideFilter>
            </div>
            <div className='col-span-12 md:col-span-9'>
              <SortProductList
                queryConfig={queryConfig}
                pageSize={productsData?.data.data.pagination.page_size}
              ></SortProductList>
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3  lg:grid-cols-5'>
                {productsData.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product}></Product>
                  </div>
                ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={productsData?.data.data.pagination.page_size}
              ></Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
