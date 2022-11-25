import Cookies from 'js-cookie'

const TokenKey = 'sessionid'
const CsrfTokenKey = 'csrftoken'

export function getToken(): string | undefined{
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  Cookies.remove(TokenKey)
}
