import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.post('/admin/login', payload);
}