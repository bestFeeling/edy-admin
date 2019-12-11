import $$ from 'cmn-utils';

export async function rsas(payload) {
  return $$.get('/common/rsa', payload);
}