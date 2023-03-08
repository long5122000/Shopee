import http from 'src/utils/http'
import { Category } from '../types/category.type'
import { SuccessResponse } from '../types/utils.type'
const URL = 'categories'
const categoryApi = {
  getCategoryApi() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
export default categoryApi
