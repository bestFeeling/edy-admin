import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.post('/admin/login', payload);
}


export async function rsas(payload) {
  return $$.get('/common/rsa', payload);
}