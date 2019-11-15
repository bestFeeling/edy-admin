import $$ from 'cmn-utils';

export async function getDetail(payload) {
  return $$.get(`/bank/${payload.id || 0}`)
}