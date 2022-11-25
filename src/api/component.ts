import fetch from '@/utils/fetch'

export function createComponent(data: any) {
  return fetch({
    url: '/component/create',
    method: 'POST',
    data
  })
}

export function updateComponent(data: any) {
  return fetch({
    url: '/component/update',
    method: 'POST',
    data
  })
}

export function getComponentById(id: string) {
  return fetch({
    url: `/component/${id}`
  })
}

export function deleteComponent(data: any) {
  return fetch({
    url: `/component/delete`,
    method: 'POST',
    data
  })
}

export function componentList() {
  return fetch({
    url: `/component/list`
  })
}
