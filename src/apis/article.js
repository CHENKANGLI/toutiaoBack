import axios from '../utils/myaxios'
// 获取文章列表
export const getPostlist = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 获取栏目列表
export const getCatelist = (params) => {
  return axios({
    url: '/category',
    params
  })
}
// 发布文章
export const postPublish = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
// 编辑文章
export const editArticle = (data) => {
  return axios({
    method: 'post',
    url: '/post_update/:id',
    data
  })
}
// 文件上传
export const uploadFile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
// 获取文章详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
