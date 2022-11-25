import fetch from '@/utils/fetch'

export function addSource(data: any) {
  return fetch({
    url: 'source/create',
    method: 'POST',
    data
  })
}

export function updateSource(data: any) {
  return fetch({
    url: 'source/update',
    method: 'POST',
    data
  })
}

export function deleteSource(data: any) {
  return fetch({
    url: 'source/delete',
    method: 'POST',
    data
  })
}

export function sourceList() {
  return fetch({
    url: 'source/list',
    method: 'get'
  })
}

export function tablesBySource(sourceId: string) {
  return fetch({
    url: `source/tables/${sourceId}`,
    method: 'get'
  })
}

export function saveTableBySource(data: any) {
  return fetch({
    url: 'source/tables/save',
    method: 'POST',
    data
  })
}

export function linkedTablesBySouce(sourceId: string) {
  return fetch({
    url: `source/tables/${sourceId}/linked`,
    method: 'get'
  })
}
