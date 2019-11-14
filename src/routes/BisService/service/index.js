import $$ from 'cmn-utils';

export async function getArea(payload) {
  return $$.get(`/directory/${payload.id || 0}`)
}