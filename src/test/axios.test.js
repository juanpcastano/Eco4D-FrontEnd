import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Eco4DApi } from '../api/Eco4DApi';

const mock = new MockAdapter(axios);

test('debería obtener datos correctamente', async () => {
  mock.onGet('/endpoint').reply(200, { data: 'result' });
  const resultado = await Eco4DApi();
  expect(resultado.data).toBe('result');
});
